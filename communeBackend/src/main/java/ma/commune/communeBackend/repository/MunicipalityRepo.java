package ma.commune.communeBackend.repository;

import ma.commune.communeBackend.model.Employee;
import ma.commune.communeBackend.model.Municipality;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MunicipalityRepo extends JpaRepository<Municipality,Long> {
    Optional<Employee> findByPresident(Employee president);
}
