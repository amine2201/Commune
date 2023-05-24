package ma.commune.communeBackend.controller;

import ma.commune.communeBackend.model.Role;
import ma.commune.communeBackend.model.User;
import ma.commune.communeBackend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class RootUserCreationRunner implements ApplicationRunner {

    private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public RootUserCreationRunner(UserRepo userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        User rootUser = new User();
        rootUser.setEmail("root@commune.ma");
        rootUser.setPassword(passwordEncoder.encode("password"));
        rootUser.setRole(Role.ADMIN);

        userRepository.save(rootUser);
    }
}

