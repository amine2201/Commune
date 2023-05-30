package ma.commune.communeBackend.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Document {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "path")
    private String path;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private DocumentType documentType;

    @JoinColumn(name = "employee")
    @ManyToOne
    @Nullable
    private Employee employee;

    @Column(name = "citoyens")
    @OneToMany
    private List<Citizen> citizens;

    @Column(name = "signed")
    @Enumerated(EnumType.STRING)
    private Status status;
}
