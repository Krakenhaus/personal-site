package spring.advice;

import net.sf.json.JSONArray;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import spring.pokemon.errors.dto.FieldError;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class PersonalSiteExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<FieldError> fieldErrors = new ArrayList<>();
        ex.getBindingResult().getFieldErrors().forEach(fieldError -> {
            String field = fieldError.getField();
            FieldError customFieldError = new FieldError(field, FieldError.FieldErrorType.INVALID, fieldError.getDefaultMessage());
            fieldErrors.add(customFieldError);
        });

        JSONArray jsonArray = JSONArray.fromObject(fieldErrors);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(jsonArray);
    }

    // Catch-all
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleUnknown(HttpServletRequest request, Exception ex) {
        return ResponseEntity
                .status(500).build();
    }
}
