package ma.commune.communeBackend.Testing;

import lombok.RequiredArgsConstructor;
import ma.commune.communeBackend.config.AuthenticationRequest;
import ma.commune.communeBackend.config.AuthenticationResponse;
import ma.commune.communeBackend.config.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class TestController {
    private final AuthenticationService service;

    @GetMapping()
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello from secured endpoint");
    }

    @PostMapping()
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        System.out.println(request);
        return ResponseEntity.ok(service.authenticate(request));
    }


}
