package ma.commune.communeBackend.repository;

import ma.commune.communeBackend.model.Citizen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CitizenRepo extends JpaRepository<Citizen,Long> {
    Optional<Citizen> findByCin(String cin);
}
