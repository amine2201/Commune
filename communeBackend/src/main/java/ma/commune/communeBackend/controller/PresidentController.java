package ma.commune.communeBackend.controller;

import lombok.RequiredArgsConstructor;
import ma.commune.communeBackend.model.Stats;
import ma.commune.communeBackend.model.Status;
import ma.commune.communeBackend.repository.EmployeeRepo;
import ma.commune.communeBackend.repository.CitizenRepo;
import ma.commune.communeBackend.repository.DocumentRepo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PresidentController {
    private final CitizenRepo citizenRepo;
    private final DocumentRepo documentRepo;
    private final EmployeeRepo employeeRepo;

    @GetMapping("/president/stats")
    public Stats getStats(){
        Stats stats=new Stats();
        stats.setCitizens(citizenRepo.findAll().size());
        stats.setDocuments(documentRepo.findAll().size());
        stats.setEmployees(employeeRepo.findAll().size());
        stats.setDocumentsAccepted(documentRepo.findAll().stream()
                .filter(document -> document.getStatus().equals(Status.APPROVED)).toList().size());
        return stats;
    }

}
