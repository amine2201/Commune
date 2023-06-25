package ma.commune.communeBackend.controller;

import lombok.RequiredArgsConstructor;
import ma.commune.communeBackend.exception.CitizenNotFoundException;
import ma.commune.communeBackend.model.*;
import ma.commune.communeBackend.repository.CitizenRepo;
import ma.commune.communeBackend.repository.DocumentRepo;
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
    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file
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
}
