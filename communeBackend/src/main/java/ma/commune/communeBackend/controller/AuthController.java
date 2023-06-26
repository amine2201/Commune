package ma.commune.communeBackend.controller;

import ma.commune.communeBackend.config.AuthenticationRequest;
import ma.commune.communeBackend.config.AuthenticationResponse;
import ma.commune.communeBackend.config.AuthenticationService;
import ma.commune.communeBackend.config.RegisterRequest;
import ma.commune.communeBackend.model.Citizen;
import ma.commune.communeBackend.model.Role;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class AuthController {
    private final AuthenticationService service;

    public AuthController(AuthenticationService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest registerRequest){
        Citizen citizen=new Citizen();
        citizen.setPassword(registerRequest.getPassword());
        citizen.setEmail(registerRequest.getEmail());
        citizen.setCin(registerRequest.getCin());
        citizen.setRole(Role.CITOYEN);
        return ResponseEntity.ok(service.register(citizen));
    }


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
