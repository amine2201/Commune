package ma.commune.communeBackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "municipalities")
@Data @NoArgsConstructor
public class Municipality {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "adress")
    private String adress;

    @JoinColumn(name = "president_id")
    @OneToOne
    private Employee president;

    @OneToMany
    private List<Employee> employees;

}
