package ma.commune.communeBackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "citoyens",uniqueConstraints = @UniqueConstraint(columnNames = {"cin"}))
@Data @NoArgsConstructor
public class Citoyen extends User{
    @Column(name = "cin")
    @NotBlank(message = "no cin was provided")
    private String cin;
}
