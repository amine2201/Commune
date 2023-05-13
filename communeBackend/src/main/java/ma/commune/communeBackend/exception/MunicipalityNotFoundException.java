package ma.commune.communeBackend.exception;

public class MunicipalityNotFoundException extends RuntimeException{
    public MunicipalityNotFoundException(String message) {
        super(message);
    }
}
