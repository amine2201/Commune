package ma.commune.communeBackend.controller;

import jakarta.validation.Valid;
import ma.commune.communeBackend.exception.CitizenNotFoundException;
import ma.commune.communeBackend.model.Citoyen;
import ma.commune.communeBackend.repository.CitizenRepo;
import ma.commune.communeBackend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/v1/citizens")
public class CitizenController {
    private CitizenRepo citizenRepo;
    private UserRepo userRepo;
    @Autowired
    public CitizenController(CitizenRepo citizenRepo,UserRepo userRepo) {
        this.citizenRepo = citizenRepo;
        this.userRepo=userRepo;
    }



    @GetMapping("/citizens/{id}")
    public ResponseEntity<Citoyen> getCitizenById(@PathVariable Long id) {
        Citoyen citoyen = citizenRepo.findById(id).orElseThrow(()-> new CitizenNotFoundException("citizen "+id+" not found"));
        citoyen.setPassword("");
        return ResponseEntity.ok(citoyen);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Citoyen> updateById(@PathVariable long id, @Valid @RequestBody Citoyen citoyenUpdated){
        Citoyen citoyen = citizenRepo.findById(id).orElseThrow(()->new CitizenNotFoundException("citizen "+id+" not found"));
        citoyen.setEmail(citoyenUpdated.getEmail());
        citoyen.setPassword(citoyenUpdated.getPassword());
        citizenRepo.save(citoyen);
        citoyen.setPassword("");
        return ResponseEntity.ok(citoyen);
    }




}
