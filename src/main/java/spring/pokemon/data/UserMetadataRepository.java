package spring.pokemon.data;

import org.springframework.data.repository.CrudRepository;
import spring.pokemon.data.entities.UserMetadata;

import java.util.Optional;
import java.util.UUID;

public interface UserMetadataRepository extends CrudRepository<UserMetadata, UUID> {
    Optional<UserMetadata> findById(UUID userId);
}
