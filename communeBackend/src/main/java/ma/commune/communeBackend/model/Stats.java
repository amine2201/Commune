package ma.commune.communeBackend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
public class Stats {
    private Integer employees;
    private Integer citizens;
    private Integer documents;
    private Integer documentsAccepted;
}
