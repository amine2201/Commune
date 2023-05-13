package ma.commune.communeBackend.controller;

import jakarta.validation.Valid;
import ma.commune.communeBackend.exception.CitizenNotFoundException;
import ma.commune.communeBackend.model.Citizen;
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





    @PutMapping("/{id}")
    public ResponseEntity<Citizen> updateById(@PathVariable long id, @Valid @RequestBody Citizen citizenUpdated){
        Citizen citizen= citizenRepo.findById(id).orElseThrow(()->new CitizenNotFoundException("citizen "+id+" not found"));
        citizen.setEmail(citizenUpdated.getEmail());
        citizen.setPassword(citizenUpdated.getPassword());
        citizenRepo.save(citizen);
        citizen.setPassword("");
        return ResponseEntity.ok(citizen);
    }




}
