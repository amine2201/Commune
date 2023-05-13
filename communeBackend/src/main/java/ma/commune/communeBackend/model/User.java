package ma.commune.communeBackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data @NoArgsConstructor
@Inheritance(strategy=InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    @Size(min= 5, max = 50,message = "email length should be between 8 and 30")
    @Email(message = "email invalid")
    private String email;

    @Column(name = "password")
    @Size(min = 8,max=30, message = "password length should be between 8 and 30")
    private String password;

    @Column(name = "role")
    private Role role;

}
