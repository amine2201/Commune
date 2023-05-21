package ma.commune.communeBackend.repository;

import ma.commune.communeBackend.model.Citoyen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CitizenRepo extends JpaRepository<Citoyen,Long> {
    Optional<Citoyen> findByCin(String cin);
}
