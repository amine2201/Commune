package ma.commune.communeBackend.repository;

import ma.commune.communeBackend.model.Document;
import ma.commune.communeBackend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepo extends JpaRepository<Document,Long> {
}