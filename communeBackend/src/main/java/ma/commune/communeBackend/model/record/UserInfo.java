package ma.commune.communeBackend.model.record;

import ma.commune.communeBackend.model.Role;

public record UserInfo(Long id, String email, Role role) {
}
