package spring.pokemon.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "The TCG id in the path does not match the id in the request body.")
public class IdMismatchException extends RuntimeException {
}