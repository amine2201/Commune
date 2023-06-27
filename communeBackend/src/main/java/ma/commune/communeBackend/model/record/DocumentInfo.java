package ma.commune.communeBackend.model.record;

import ma.commune.communeBackend.model.DocumentType;
import ma.commune.communeBackend.model.Status;

import java.util.List;

public record DocumentInfo(Long id,String name, DocumentType documentType, Long employeeId, List<Long> citoyenIds, List<Long> signeesIds, Status status) {

}
