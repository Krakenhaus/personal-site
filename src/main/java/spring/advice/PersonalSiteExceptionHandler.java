package spring.advice;

import com.okta.sdk.resource.ResourceException;
import net.sf.json.JSONArray;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.server.ResponseStatusException;
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

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Object> handleBadRequest(HttpServletRequest request, ResponseStatusException ex) {
        return ResponseEntity
                .status(ex.getStatus()).body(ex.getMessage());
    }

    @ExceptionHandler(ResourceException.class)
    public ResponseEntity<Object> handleOktaError(HttpServletRequest request, ResourceException ex) {
        List<FieldError> fieldErrors = new ArrayList<>();
        ex.getCauses().forEach(errorCause -> {
            FieldError customFieldError = new FieldError("okta", FieldError.FieldErrorType.INVALID, errorCause.getSummary());
            fieldErrors.add(customFieldError);
        });

        JSONArray jsonArray = JSONArray.fromObject(fieldErrors);
        return ResponseEntity
                .status(ex.getStatus())
                .body(jsonArray);
    }

    // Catch-all
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleUnknown(HttpServletRequest request, Exception ex) {
        return ResponseEntity
                .status(500).build();
    }
}
