package ma.commune.communeBackend.controller;

import ma.commune.communeBackend.exception.MunicipalityNotFoundException;
import ma.commune.communeBackend.model.Employee;
import ma.commune.communeBackend.model.Municipality;
import ma.commune.communeBackend.repository.EmployeeRepo;
import ma.commune.communeBackend.repository.MunicipalityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/municipalit")
public class MunicipalityController{
    private MunicipalityRepo municipalityRepo;
    @Autowired
    public MunicipalityController(MunicipalityRepo municipalityRepo) {
        this.municipalityRepo = municipalityRepo;
    }

    @GetMapping("/municipalities/{id}")
    public ResponseEntity<Municipality> getMunicipalityById(@PathVariable Long id) {
        Municipality municipality= municipalityRepo.findById(id).orElseThrow(()->new MunicipalityNotFoundException("municipality "+id+" not found"));
        return ResponseEntity.ok(municipality);
    }

    @GetMapping("/municipalities")
    public List<Municipality> getAllMunicipalities(){
        return municipalityRepo.findAll();
    }
}
