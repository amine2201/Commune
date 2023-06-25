package ma.commune.communeBackend.controller;

import lombok.RequiredArgsConstructor;
import ma.commune.communeBackend.exception.CitizenExceptions.CitizenNotFoundException;
import ma.commune.communeBackend.exception.DocumentExceptions.DocumentNotFoundException;
import ma.commune.communeBackend.model.*;
import ma.commune.communeBackend.repository.CitizenRepo;
import ma.commune.communeBackend.repository.DocumentRepo;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
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
    public List<Document> getAllDocuments(){
        List<Document> documents=documentRepo.findAll();
        if(SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ROLE_CITOYEN"))){
            Citizen citizen=(Citizen)( SecurityContextHolder.getContext().getAuthentication().getPrincipal());
            documents.removeIf(document -> !document.getCitizens().contains(citizen));
        }
        return documents;

    }
    @PostMapping("/documents/signer")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE','CITOYEN')")
    public String signDocument(@RequestParam("id") Long id){
        Document document=documentRepo.findById(id).orElseThrow(()->new DocumentNotFoundException("document "+id+" not found"));
        if(SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ROLE_CITOYEN"))){
            Citizen citizen=(Citizen)( SecurityContextHolder.getContext().getAuthentication().getPrincipal());
            if(!document.getCitizens().contains(citizen)){
                return "you are not allowed to sign this document";
            }
        }
        documentRepo.save(document);
        return "document "+id+" signed successfully";
    }
    @GetMapping("/documents/{id}")
    public Document getDocumentById(@PathVariable Long id) {
        return documentRepo.findById(id).orElseThrow(() -> new DocumentNotFoundException("document " + id + " not found"));
    }

    @PutMapping("/documents/{id}")
    public Document updateDocument(@PathVariable Long id, @RequestBody Document document) {
        Document document1 = documentRepo.findById(id).orElseThrow(() -> new DocumentNotFoundException("document " + id + " not found"));
        document1.setDocumentType(document.getDocumentType());
        document1.setCitizens(document.getCitizens());
        document1.setStatus(document.getStatus());
        return documentRepo.save(document1);
    }
    @DeleteMapping("/documents/{id}")
    public String deleteDocument(@PathVariable Long id) {
        Document document = documentRepo.findById(id).orElseThrow(() -> new DocumentNotFoundException("document " + id + " not found"));
        documentRepo.delete(document);
        return "document " + id + " deleted successfully";
    }
}
