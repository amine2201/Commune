package ma.commune.communeBackend.controller;

import ma.commune.communeBackend.model.*;
import ma.commune.communeBackend.repository.CitizenRepo;
import ma.commune.communeBackend.repository.DocumentRepo;
import ma.commune.communeBackend.repository.EmployeeRepo;
import ma.commune.communeBackend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class RootUserCreationRunner implements ApplicationRunner {

    private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CitizenRepo citizenRepo;
    private final EmployeeRepo employeeRepo;
    private final DocumentRepo documentRepo;

    @Autowired
    public RootUserCreationRunner(UserRepo userRepository, PasswordEncoder passwordEncoder, EmployeeRepo employeeRepo, CitizenRepo citizenRepo, DocumentRepo documentRepo) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.employeeRepo = employeeRepo;
        this.citizenRepo = citizenRepo;
        this.documentRepo = documentRepo;
    }

    @Override
    public void run(ApplicationArguments args) {
        User rootUser = new User();
        rootUser.setEmail("root@commune.ma");
        rootUser.setPassword(passwordEncoder.encode("password"));
        rootUser.setRole(Role.ADMIN);
        userRepository.save(rootUser);

        Employee president= new Employee();
        president.setEmail("president@commune.ma");
        president.setPassword(passwordEncoder.encode("password"));
        president.setFirstName("Amine");
        president.setLastName("Naji");
        president.setRole(Role.PRESIDENT);
        employeeRepo.save(president);

        List<String> employeeNames = Arrays.asList("Mohamed", "Fatima");
        List<String> employeeLNames = Arrays.asList("Naji", "Haddad");

        // Create 4 Citizen users
        for (int i = 2; i <= 5; i++) {
            Citizen citizen = new Citizen();
            citizen.setEmail("citoyen" + i + "@commune.ma");
            citizen.setPassword(passwordEncoder.encode("123456789"));
            citizen.setRole(Role.CITOYEN);
            // Create a unique CIN following the pattern [A-Z][A-Z][0-9]{5}
            String cin = "AB" + String.format("5432%d", i);
            citizen.setCin(cin);
            citizenRepo.save(citizen);
        }

        // Create 2 Employee users
        for (int i = 1; i <= 2; i++) {
            Employee employee = new Employee();
            employee.setEmail("employe" + i + "@commune.ma");
            employee.setPassword(passwordEncoder.encode("123456789"));
            employee.setRole(Role.EMPLOYEE);
            String firstName = employeeNames.get(i - 1);
            String lastName = employeeLNames.get(i - 1);
            employee.setFirstName(firstName);
            employee.setLastName(lastName);
            employeeRepo.save(employee);
        }


        List<Citizen> citizens = citizenRepo.findAll();

        // Create 4 Documents
        for (int i = 3; i <= 6; i++) {
            Document document = new Document();
            document.setName("contrat" + i+".pdf");
            String filePath = System.getProperty("user.dir")+"/documents/" + "contrat" + i+".pdf";
            document.setPath(filePath);
            document.setCitizens(i%2==1?citizens.subList(0, i-2):List.of(citizens.get(i-3)));
            document.setSignees(i%2==1?citizens.subList(0, i-2):List.of(citizens.get(i-3)));
//            document.setSignees(null);
            document.setStatus(Status.PENDING); // set status as NEW or as needed
            document.setDocumentType(i%2==1?DocumentType.LEGALISATION:DocumentType.CERTIFICATION); // set document type as needed
            // set employee if needed
            // document.setEmployee(employee);
            documentRepo.save(document);
        }

    }

}

