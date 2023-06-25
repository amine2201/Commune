package ma.commune.communeBackend.controller;

import lombok.RequiredArgsConstructor;
import ma.commune.communeBackend.exception.CitizenExceptions.CitizenNotFoundException;
import ma.commune.communeBackend.exception.DocumentExceptions.DocumentNotFoundException;
import ma.commune.communeBackend.model.*;
import ma.commune.communeBackend.model.record.DocumentInfo;
import ma.commune.communeBackend.repository.CitizenRepo;
import ma.commune.communeBackend.repository.DocumentRepo;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "${webapp}")
@RequiredArgsConstructor
public class DocumentController {
    private final CitizenRepo citizenRepo;
    private final DocumentRepo documentRepo;
    @PostMapping("/documents")
    @PreAuthorize("hasAnyRole('ADMIN','CITOYEN')")
    public String saveFile(@RequestParam("file") MultipartFile file
            , @RequestParam("DocumentType") DocumentType documentType, @RequestParam List<String> cins) {
        if (!file.isEmpty()) {
            try {
                List<Citizen> citizens=new ArrayList<>();
                for(String cin : cins){
                    citizens.add(citizenRepo.findByCin(cin).orElseThrow(()->new CitizenNotFoundException("citoyen "+cin+" pas trouve")));
                }
                String fileName = file.getOriginalFilename();
                String filePath = System.getProperty("user.dir")+"/documents/" + fileName;
                File dest = new File(filePath);
                file.transferTo(dest);
                Document document=new Document();
                document.setPath(filePath);
                document.setDocumentType(documentType);
                document.setCitizens(citizens);
                document.setStatus(Status.PENDING);
                documentRepo.save(document);
                return "File uploaded successfully";
            } catch (IOException e) {
                e.printStackTrace();
                return "File upload failed";
            }
        } else {
            return "No file selected";
        }
    }
    @GetMapping("/documents")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE','CITOYEN')")
    public List<DocumentInfo> getAllDocuments(){
        List<Document> documents=documentRepo.findAll();
        if(SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ROLE_CITOYEN"))){
            Citizen citizen=(Citizen)( SecurityContextHolder.getContext().getAuthentication().getPrincipal());
            documents.removeIf(document -> !document.getCitizens().contains(citizen));
        }
        return documents.stream().map(DocumentController::getDocumentInfo).toList();

    }
    @PostMapping("/documents/signer/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','CITOYEN')")
    public ResponseEntity<String> signDocument(@PathVariable("id") Long id){
        Document document=documentRepo.findById(id).orElseThrow(()->new DocumentNotFoundException("document "+id+" not found"));
        if(SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ROLE_CITOYEN"))){
            Citizen citizen=(Citizen)( SecurityContextHolder.getContext().getAuthentication().getPrincipal());
            if(!document.getCitizens().contains(citizen)){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("vous n'etes pas concerne par ce document");
            }
            else if(document.getSignees().contains(citizen)){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("vous avez deja signe ce document");
            }
            else{
                document.getSignees().add(citizen);
            }
        }
        documentRepo.save(document);
        return ResponseEntity.status(HttpStatus.OK).body("document"+id+" signe avec succes");
    }
    @PostMapping("/documents/valider/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    public ResponseEntity<String> validerDocument(@PathVariable("id") Long id, @RequestParam("status") Status status){
        Document document=documentRepo.findById(id).orElseThrow(()->new DocumentNotFoundException("document "+id+" non trouve"));
        if(SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ROLE_EMPLOYEE"))){
            if(document.getStatus().equals(Status.APPROVED)){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("ce document est deja valide");
            }
            else{
                document.setStatus(status);
            }
        }
        documentRepo.save(document);
        return ResponseEntity.status(HttpStatus.OK).body("document"+id+" status changee avec succes");
    }
    @GetMapping("/documents/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE','CITOYEN')")
    public Document getDocumentById(@PathVariable Long id) {
        return documentRepo.findById(id).orElseThrow(() -> new DocumentNotFoundException("document " + id + " non trouve"));
    }

    @PutMapping("/documents/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    public DocumentInfo updateDocument(@PathVariable Long id, @RequestBody Document document) {
        Document document1 = documentRepo.findById(id).orElseThrow(() -> new DocumentNotFoundException("document " + id + " non trouve"));
        document1.setDocumentType(document.getDocumentType());
        document1.setCitizens(document.getCitizens());
        document1.setStatus(document.getStatus());
        document1= documentRepo.save(document1);
        return getDocumentInfo(document);
    }

    private static DocumentInfo getDocumentInfo(Document document) {
        return new DocumentInfo(document.getId(), document.getDocumentType(),
                document.getEmployee() != null ? document.getEmployee().getId() : null,
                document.getCitizens().stream().map(Citizen::getId).toList()
                ,document.getSignees().stream().map(Citizen::getId).toList(),
                document.getStatus());
    }

    @DeleteMapping("/documents/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public String deleteDocument(@PathVariable Long id) {
        Document document = documentRepo.findById(id).orElseThrow(() -> new DocumentNotFoundException("document " + id + " non trouve"));
        documentRepo.delete(document);
        return "document " + id + " supprime avec succes";
    }
    @GetMapping("/download/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE','CITOYEN')")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws MalformedURLException {
        Document document =documentRepo.findById(id).orElseThrow(() -> new DocumentNotFoundException("document " + id + " non trouve"));
        Path fileLocation = Paths.get(document.getPath());
        Resource resource = new UrlResource(fileLocation.toUri());

        if(resource.exists() || resource.isReadable()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            throw new RuntimeException("Could not read the file!");
        }
    }
}
