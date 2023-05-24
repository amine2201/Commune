package ma.commune.communeBackend.controller;

import jakarta.validation.Valid;
import ma.commune.communeBackend.exception.CitizenFoundException;
import ma.commune.communeBackend.exception.CitizenNotFoundException;
import ma.commune.communeBackend.model.Citizen;
import ma.commune.communeBackend.model.Role;
import ma.commune.communeBackend.model.User;
import ma.commune.communeBackend.model.record.CitizenInfo;
import ma.commune.communeBackend.repository.CitizenRepo;
import ma.commune.communeBackend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;


@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "${webapp}")
public class CitizenController {
    private CitizenRepo citizenRepo;
    private UserRepo userRepo;
    @Autowired
    public CitizenController(CitizenRepo citizenRepo,UserRepo userRepo) {
        this.citizenRepo = citizenRepo;
        this.userRepo=userRepo;
    }

    @GetMapping("/citizens")
    @PreAuthorize("hasRole('ADMIN')")
    public List<CitizenInfo> getAllCitizens(){
        return citizenRepo.findAll().stream().map(citizen -> new CitizenInfo(citizen.getId(),citizen.getEmail(),citizen.getCin())).toList();
    }

    @PostMapping("/citizens")
    @PreAuthorize("hasRole('ADMIN')")
    public CitizenInfo saveCitizen(@Valid @RequestBody Citizen citizen){
        if(userRepo.findByEmail(citizen.getEmail()).isPresent())
            throw new CitizenFoundException("the email "+ citizen.getEmail()+" already exists");
        if(citizenRepo.findByCin(citizen.getCin()).isPresent())
            throw new CitizenFoundException("the cin "+ citizen.getCin()+" already exists");
        citizen.setId(null);
        Citizen citizen1 = citizenRepo.save(citizen);
        return new CitizenInfo(citizen1.getId(),citizen1.getEmail(),citizen1.getCin());
    }
    @PutMapping("/citizens/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','CITOYEN')")
    public ResponseEntity<CitizenInfo> updateCitizenById(@PathVariable long id, @Valid @RequestBody Citizen citizenUpdated){
        Citizen citizen = citizenRepo.findById(id).orElseThrow(()->new CitizenNotFoundException("citizen "+id+" not found"));
        if(SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))){
            citizen.setEmail(citizenUpdated.getEmail());
            citizen.setCin(citizenUpdated.getCin());
        }
        else if(((User)SecurityContextHolder.getContext().getAuthentication()).getId()!=id)
            throw new CitizenNotFoundException("different Id");
        citizen.setPassword(citizenUpdated.getPassword());
        citizenRepo.save(citizen);
        return ResponseEntity.ok(new CitizenInfo(citizen.getId(),citizen.getEmail(),citizen.getCin()));
    }
    @DeleteMapping("/citizens/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String,Boolean>> deleteCitizenById(@PathVariable long id){
        Citizen citizen = citizenRepo.findById(id).orElseThrow(()->new CitizenNotFoundException("citizen "+id+" not found"));
        citizenRepo.delete(citizen);
        Map<String,Boolean> map=new HashMap<>();
        map.put("deleted",true);
        return  ResponseEntity.ok(map);
    }

    @GetMapping("/citizens/{id}")
    public ResponseEntity<CitizenInfo> getCitizenById(@PathVariable Long id) {
        Citizen citizen = citizenRepo.findById(id).orElseThrow(()-> new CitizenNotFoundException("citizen "+id+" not found"));
        return ResponseEntity.ok(new CitizenInfo(citizen.getId(), citizen.getEmail(), citizen.getCin()));
    }





}
