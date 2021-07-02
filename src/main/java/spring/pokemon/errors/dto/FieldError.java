package spring.pokemon.errors.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FieldError {
    public enum FieldErrorType {
        INVALID, UNKNOWN
    }

    String fieldName;
    FieldErrorType errorType;
    String description;
}
