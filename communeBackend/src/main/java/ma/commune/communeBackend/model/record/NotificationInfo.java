package ma.commune.communeBackend.model.record;

import ma.commune.communeBackend.model.NotificationType;

public record NotificationInfo(String id, NotificationType notificationType, String message, String citizenID) {
}
