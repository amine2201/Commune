package ma.commune.communeBackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employees")
@Data @NoArgsConstructor
public class Employee extends User{
    @Column(name = "first_name")
    @NotBlank
    private String firstName;
    @Column(name = "last_name")
    @NotBlank
    private String lastName;

    @JoinColumn(name = "municipality_id")
    @ManyToOne
    private Municipality municipality;
}
