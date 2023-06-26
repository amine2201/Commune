package ma.commune.communeBackend.repository;

import ma.commune.communeBackend.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NotificationRepo extends JpaRepository<Notification, Long> {
    Optional<Notification> findNotificationByCitizenId(Long citizenId);
    Long deleteNotificationByCitizenIdAndDocumentId(Long citizenId, Long documentId);
}
