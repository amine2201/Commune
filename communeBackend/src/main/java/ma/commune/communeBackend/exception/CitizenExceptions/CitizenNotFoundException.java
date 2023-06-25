package ma.commune.communeBackend.exception.CitizenExceptions;

public class CitizenNotFoundException extends RuntimeException{
    public CitizenNotFoundException(String message) {
        super(message);
    }
}
