package spring.pokemon.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR, reason = "TCGPlayer threw an error, see logs")
public class TCGPlayerClientException extends RuntimeException {
}