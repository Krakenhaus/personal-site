package spring.pokemon.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Price was already inserted for that card during that month/year.")
public class DuplicatePriceException extends RuntimeException {
}