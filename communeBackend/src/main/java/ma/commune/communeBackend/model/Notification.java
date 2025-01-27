package ma.commune.communeBackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "notifications")
@Data @NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private NotificationType type;
    private String message;
    @ManyToOne
    private Citizen citizen;
    @ManyToOne
    private Document document;
    public Notification(NotificationType type) {
        this.type = type;
        if(type.equals(NotificationType.DOCUMENT_REJECTED)){
            this.message = "Document rejeté";
        }
        else if(type.equals(NotificationType.DOCUMENT_APPROVED)){
            this.message = "Document validé";
        }
        else{
            this.message = "Document à signer";
        }
    }

    public void setType(NotificationType type) {
        this.type = type;
        if(type.equals(NotificationType.DOCUMENT_REJECTED)){
            this.message = "Document rejeté";
        }
        else if(type.equals(NotificationType.DOCUMENT_APPROVED)){
            this.message = "Document validé";
        }
        else{
            this.message = "Document à signer";
        }
    }
}
