package ma.commune.communeBackend.controller;

import jakarta.validation.Valid;
import ma.commune.communeBackend.exception.EmployeeFoundException;
import ma.commune.communeBackend.exception.EmployeeNotFoundException;
import ma.commune.communeBackend.model.Employee;
import ma.commune.communeBackend.repository.EmployeeRepo;
import ma.commune.communeBackend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "${webapp}")
public class EmployeeController{
    private UserRepo userRepo;
    private EmployeeRepo employeeRepo;
    @Autowired
    public EmployeeController(UserRepo userRepo, EmployeeRepo employeeRepo) {
        this.userRepo = userRepo;
        this.employeeRepo = employeeRepo;
    }


    @GetMapping("/employees")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Employee> getAllEmployees(){
        return employeeRepo.findAll().stream().peek(employee -> employee.setPassword("")).toList();
    }

    @PostMapping("/employees")
    @PreAuthorize("hasRole('ADMIN')")
    public Employee saveEmployee(@Valid @RequestBody Employee employee){
        if(userRepo.findByEmail(employee.getEmail()).isPresent())
            throw new EmployeeFoundException("the email "+employee.getEmail()+" already exists");
        employee.setId(null);
        Employee employee1 = employeeRepo.save(employee);
        employee1.setPassword("");
        return employee1;
    }
    @PutMapping("/employees/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String,Boolean>> deleteEmployeeById(@PathVariable long id){
        Employee employee= employeeRepo.findById(id).orElseThrow(()->new EmployeeNotFoundException("employee "+id+" not found"));
        employeeRepo.delete(employee);
        Map<String,Boolean> map=new HashMap<>();
        map.put("deleted",true);
        return  ResponseEntity.ok(map);
    }

    @GetMapping("/employees/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepo.findById(id).orElseThrow(()-> new EmployeeNotFoundException("employee "+id+" not found"));
        employee.setPassword("");
        return ResponseEntity.ok(employee);
    }

}
