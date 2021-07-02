package spring.pokemon.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spring.pokemon.data.UserMetadataRepository;
import spring.pokemon.data.entities.UserMetadata;
import spring.pokemon.errors.InternalException;
import spring.pokemon.errors.UserNotFoundException;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class UserService {
    @Autowired
    UserMetadataRepository userMetadataRepository;

    public UserMetadata getUser(UUID userId) {
        Optional<UserMetadata> userMetadataOptional;

        try {
            userMetadataOptional = userMetadataRepository.findById(userId);
        } catch (Exception ex) {
            log.error("Sql call failed", ex);
            throw new InternalException();
        }

        if (userMetadataOptional.isEmpty()) {
            throw new UserNotFoundException();
        }

        return userMetadataOptional.get();
    }

    public UserMetadata createUser(String nickname) {
        UUID userId = UUID.randomUUID();
        UserMetadata userMetadata = UserMetadata.builder()
                .userId(userId)
                .nickname(nickname)
                .build();

        try {
            userMetadataRepository.save(userMetadata);
        } catch (Exception ex) {
            log.error("Sql call failed", ex);
            throw new InternalException();
        }

        return UserMetadata.builder().userId(userId).nickname(nickname).build();
    }
}
