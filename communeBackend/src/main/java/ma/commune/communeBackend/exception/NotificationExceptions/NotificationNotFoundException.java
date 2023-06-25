package ma.commune.communeBackend.exception.NotificationExceptions;

public class NotificationNotFoundException extends RuntimeException{
    public NotificationNotFoundException(String message) {
        super(message);
    }
}
