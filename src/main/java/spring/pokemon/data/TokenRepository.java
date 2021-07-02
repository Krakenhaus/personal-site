package spring.pokemon.data;

import org.springframework.data.repository.CrudRepository;
import spring.pokemon.data.entities.Token;
import spring.pokemon.data.entities.UserMetadata;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TokenRepository extends CrudRepository<Token, String> {
}
