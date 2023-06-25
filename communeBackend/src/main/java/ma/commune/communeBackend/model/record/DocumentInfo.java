package ma.commune.communeBackend.model.record;

import ma.commune.communeBackend.model.DocumentType;
import ma.commune.communeBackend.model.Status;

import java.util.List;

public record DocumentInfo(Long id, DocumentType documentType, Long employeeId, List<Long> citizensId, List<Long> signeesId, Status status) {

}
