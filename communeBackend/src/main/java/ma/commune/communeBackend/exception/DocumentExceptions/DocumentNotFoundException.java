package ma.commune.communeBackend.exception.DocumentExceptions;

public class DocumentNotFoundException extends RuntimeException{
    public DocumentNotFoundException(String message) {
        super(message);
    }
}
