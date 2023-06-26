package ma.commune.communeBackend.config;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.commune.communeBackend.model.Citizen;
import ma.commune.communeBackend.model.Role;
import ma.commune.communeBackend.repository.CitizenRepo;
import ma.commune.communeBackend.repository.UserRepo;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final CitizenRepo citizenRepo;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(@Valid @RequestBody Citizen citizen) {
        citizen.setPassword(passwordEncoder.encode(citizen.getPassword()));
        var savedCitizen= citizenRepo.save(citizen);
        var jwtToken = jwtService.generateToken(savedCitizen);
        return AuthenticationResponse.builder()
                .token(jwtToken).role(savedCitizen.getRole())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepo.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken).role(user.getRole())
                .build();
    }
}
