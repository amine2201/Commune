package ma.commune.communeBackend.controller;

import jakarta.validation.Valid;
import ma.commune.communeBackend.exception.EmployeeNotFoundException;
import ma.commune.communeBackend.model.Employee;
import ma.commune.communeBackend.repository.EmployeeRepo;
import ma.commune.communeBackend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController{
    private UserRepo userRepo;
    private EmployeeRepo employeeRepo;
    @Autowired
    public EmployeeController(UserRepo userRepo, EmployeeRepo employeeRepo) {
        this.userRepo = userRepo;
        this.employeeRepo = employeeRepo;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateById(@PathVariable long id, @Valid @RequestBody String password){
        Employee employee=employeeRepo.findById(id).orElseThrow(()->new EmployeeNotFoundException("employee "+id+" not found"));
        employee.setPassword(password);
        employeeRepo.save(employee);
        employee.setPassword("");
        return ResponseEntity.ok(employee);
    }

}
