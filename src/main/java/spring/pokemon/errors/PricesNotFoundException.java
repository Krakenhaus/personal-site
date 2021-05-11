package spring.pokemon.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "No prices found for that card.")
public class PricesNotFoundException extends RuntimeException {
}
