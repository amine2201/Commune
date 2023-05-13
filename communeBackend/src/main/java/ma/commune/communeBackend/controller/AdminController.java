package ma.commune.communeBackend.controller;

import jakarta.validation.Valid;
import ma.commune.communeBackend.exception.*;
import ma.commune.communeBackend.model.Citizen;
import ma.commune.communeBackend.model.Employee;
import ma.commune.communeBackend.model.Municipality;
import ma.commune.communeBackend.repository.CitizenRepo;
import ma.commune.communeBackend.repository.EmployeeRepo;
import ma.commune.communeBackend.repository.MunicipalityRepo;
import ma.commune.communeBackend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admins")
public class AdminController {
    private UserRepo userRepo;
    private CitizenRepo citizenRepo;
    private EmployeeRepo employeeRepo;
    private MunicipalityRepo municipalityRepo;

    @Autowired
    public AdminController(UserRepo userRepo, CitizenRepo citizenRepo, EmployeeRepo employeeRepo,MunicipalityRepo municipalityRepo) {
        this.userRepo = userRepo;
        this.citizenRepo = citizenRepo;
        this.employeeRepo = employeeRepo;
        this.municipalityRepo=municipalityRepo;
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeRepo.findAll().stream().peek(employee -> employee.setPassword("")).toList();
    }

    @PostMapping("/employees")
    public Employee saveEmployee(@Valid @RequestBody Employee employee){
        if(userRepo.findByEmail(employee.getEmail()).isPresent())
            throw new EmployeeFoundException("the email "+employee.getEmail()+" already exists");
        employee.setId(null);
        Employee employee1 = employeeRepo.save(employee);
        employee1.setPassword("");
        return employee1;
    }
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployeeById(@PathVariable long id, @Valid @RequestBody Employee employeeUpdated){
        Employee employee= employeeRepo.findById(id).orElseThrow(()->new EmployeeNotFoundException("employee "+id+" not found"));
        employee.setEmail(employeeUpdated.getEmail());
        employee.setPassword(employeeUpdated.getPassword());
        employee.setRole(employeeUpdated.getRole());
        employee.setFirstName(employeeUpdated.getFirstName());
        employee.setLastName(employeeUpdated.getLastName());
        employee.setMunicipality(employee.getMunicipality());
        employeeRepo.save(employee);
        employee.setPassword("");
        return ResponseEntity.ok(employee);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployeeById(@PathVariable long id){
        Employee employee= employeeRepo.findById(id).orElseThrow(()->new EmployeeNotFoundException("employee "+id+" not found"));
        employeeRepo.delete(employee);
        Map<String,Boolean> map=new HashMap<>();
        map.put("deleted",true);
        return  ResponseEntity.ok(map);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepo.findById(id).orElseThrow(()-> new EmployeeNotFoundException("employee "+id+" not found"));
        employee.setPassword("");
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/citizens")
    public List<Citizen> getAllCitizens(){
        return citizenRepo.findAll().stream().peek(citizen -> citizen.setPassword("")).toList();
    }

    @PostMapping("/citizens")
    public Citizen saveCitizen(@Valid @RequestBody Citizen citizen){
        if(userRepo.findByEmail(citizen.getEmail()).isPresent())
            throw new CitizenFoundException("the email "+citizen.getEmail()+" already exists");
        if(citizenRepo.findByCin(citizen.getCin()).isPresent())
            throw new CitizenFoundException("the cin "+citizen.getCin()+" already exists");
        citizen.setId(null);
        Citizen citizen1 = citizenRepo.save(citizen);
        citizen1.setPassword("");
        return citizen1;
    }
    @PutMapping("/citizens/{id}")
    public ResponseEntity<Citizen> updateCitizenById(@PathVariable long id, @Valid @RequestBody Citizen citizenUpdated){
        Citizen citizen= citizenRepo.findById(id).orElseThrow(()->new CitizenNotFoundException("citizen "+id+" not found"));
        citizen.setEmail(citizenUpdated.getEmail());
        citizen.setPassword(citizenUpdated.getPassword());
        citizen.setCin(citizenUpdated.getCin());
        citizenRepo.save(citizen);
        citizen.setPassword("");
        return ResponseEntity.ok(citizen);
    }
    @DeleteMapping("/citizens/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteCitizenById(@PathVariable long id){
        Citizen citizen= citizenRepo.findById(id).orElseThrow(()->new CitizenNotFoundException("citizen "+id+" not found"));
        citizenRepo.delete(citizen);
        Map<String,Boolean> map=new HashMap<>();
        map.put("deleted",true);
        return  ResponseEntity.ok(map);
    }
    @GetMapping("/citizens/{id}")
    public ResponseEntity<Citizen> getCitizenById(@PathVariable Long id) {
        Citizen citizen = citizenRepo.findById(id).orElseThrow(()-> new CitizenNotFoundException("citizen "+id+" not found"));
        citizen.setPassword("");
        return ResponseEntity.ok(citizen);
    }



    @PostMapping("/municipalities")
    public Municipality saveMunicipality(@Valid @RequestBody Municipality municipality){
        if(municipalityRepo.findByPresident(municipality.getPresident()).isPresent())
            throw new MunicipalityFoundException("the president "+municipality.getPresident()+" already assigned");
        municipality.setId(null);
        return municipalityRepo.save(municipality);
    }
    @PutMapping("/municipalities/{id}")
    public ResponseEntity<Municipality> updateMunicipalityById(@PathVariable long id, @Valid @RequestBody Municipality municipality){
        Municipality municipality1= municipalityRepo.findById(id).orElseThrow(()->new MunicipalityNotFoundException("municipality "+id+" not found"));
        municipality1.setName(municipality.getName());
        municipality1.setAdress(municipality.getAdress());
        municipality1.setPresident(municipality1.getPresident());
        municipalityRepo.save(municipality1);
        return ResponseEntity.ok(municipality1);
    }
    @DeleteMapping("/municipalities/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteMunicipalityById(@PathVariable long id){
        Municipality municipality= municipalityRepo.findById(id).orElseThrow(()->new MunicipalityNotFoundException("municipality "+id+" not found"));
        municipalityRepo.delete(municipality);
        Map<String,Boolean> map=new HashMap<>();
        map.put("deleted",true);
        return  ResponseEntity.ok(map);
    }



}
