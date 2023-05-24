package ma.commune.communeBackend.controller;

import jakarta.validation.Valid;
import ma.commune.communeBackend.exception.MunicipalityFoundException;
import ma.commune.communeBackend.exception.MunicipalityNotFoundException;
import ma.commune.communeBackend.model.Municipality;
import ma.commune.communeBackend.repository.MunicipalityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/municipality")
@CrossOrigin(origins = "${webapp}")
public class MunicipalityController{
    private final MunicipalityRepo municipalityRepo;
    @Autowired
    public MunicipalityController(MunicipalityRepo municipalityRepo) {
        this.municipalityRepo = municipalityRepo;
    }

    @GetMapping("/municipalities/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Municipality> getMunicipalityById(@PathVariable Long id) {
        Municipality municipality = municipalityRepo.findById(id).orElseThrow(()->new MunicipalityNotFoundException("municipality "+id+" not found"));
        return ResponseEntity.ok(municipality);
    }

    @GetMapping("/municipalities")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Municipality> getAllMunicipalities(){
        return municipalityRepo.findAll();
    }

    @PostMapping("/municipalities")
    @PreAuthorize("hasRole('ADMIN')")
    public Municipality saveMunicipality(@Valid @RequestBody Municipality municipality){
        if(municipalityRepo.findByPresident(municipality.getPresident()).isPresent())
            throw new MunicipalityFoundException("the president "+ municipality.getPresident()+" already assigned");
        municipality.setId(null);
        return municipalityRepo.save(municipality);
    }
    @PutMapping("/municipalities/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Municipality> updateMunicipalityById(@PathVariable long id, @Valid @RequestBody Municipality municipality){
        Municipality municipality1 = municipalityRepo.findById(id).orElseThrow(()->new MunicipalityNotFoundException("municipality "+id+" not found"));
        municipality1.setName(municipality.getName());
        municipality1.setAdress(municipality.getAdress());
        municipality1.setPresident(municipality1.getPresident());
        municipalityRepo.save(municipality1);
        return ResponseEntity.ok(municipality1);
    }
    @DeleteMapping("/municipalities/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String,Boolean>> deleteMunicipalityById(@PathVariable long id){
        Municipality municipality = municipalityRepo.findById(id).orElseThrow(()->new MunicipalityNotFoundException("municipality "+id+" not found"));
        municipalityRepo.delete(municipality);
        Map<String,Boolean> map=new HashMap<>();
        map.put("deleted",true);
        return  ResponseEntity.ok(map);
    }

}
