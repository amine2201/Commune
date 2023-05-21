package ma.commune.communeBackend.controller;

import ma.commune.communeBackend.model.User;
import ma.commune.communeBackend.repository.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;


    public UserController(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepo.findAll().stream().peek(user -> user.setPassword("")).toList();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        Optional<User> userOptional = userRepo.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword("");
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long id){
        if (userRepo.existsById(id)) {
            userRepo.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/users")
    public ResponseEntity<User> saveUser(@RequestBody User user){
        // Set any necessary properties or perform validations before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepo.save(user);
        savedUser.setPassword("");
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Long id, @RequestBody User updatedUser){
        Optional<User> userOptional = userRepo.findById(id);
        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            existingUser.setEmail(updatedUser.getEmail());
            User savedUser = userRepo.save(existingUser);
            savedUser.setPassword("");
            return ResponseEntity.ok(savedUser);
        }
        return ResponseEntity.notFound().build();
    }

}
