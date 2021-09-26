package spring.pokemon.service;

import com.okta.sdk.client.Client;
import com.okta.sdk.resource.user.User;
import com.okta.sdk.resource.user.UserBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spring.pokemon.data.UserMetadataRepository;
import spring.pokemon.data.entities.UserMetadata;
import spring.pokemon.errors.InternalException;
import spring.pokemon.errors.OktaClientException;
import spring.pokemon.model.UserRequest;

import java.util.Collections;
import java.util.UUID;

@Slf4j
@Service
public class UserService {
    @Autowired
    UserMetadataRepository userMetadataRepository;

    @Autowired
    Client oktaClientSdk;

//    public UserMetadata getUser(UUID userId) {
//        Optional<UserMetadata> userMetadataOptional;
//
//        try {
//            userMetadataOptional = userMetadataRepository.findById(userId);
//        } catch (Exception ex) {
//            log.error("Sql call failed", ex);
//            throw new InternalException();
//        }
//
//        if (userMetadataOptional.isEmpty()) {
//            throw new UserNotFoundException();
//        }
//
//        return userMetadataOptional.get();
//    }

    public User createUser(UserRequest userRequest) {
        UUID userId = UUID.randomUUID();
        User user;

        try {
            user = UserBuilder.instance()
                    .setEmail(userRequest.getEmail())
                    .setFirstName(userRequest.getFirstName())
                    .setLastName(userRequest.getLastName())
                    .setPassword(userRequest.getPassword().toCharArray())
                    .setProfileProperties(Collections.singletonMap("userId", userId))
                    .buildAndCreate(oktaClientSdk);
        } catch (Exception ex) {
            log.error("Could not create new okta user, rip", ex);
            throw ex;
        }

        if (user == null) {
            log.error("Okta user came back as null, rip");
            throw new OktaClientException();
        }

        UserMetadata userMetadata = UserMetadata.builder()
            .userId(userId)
            .nickname(userRequest.getFirstName())
            .build();

        /*
            For the love of god rip the fk constraints out after you're done interviewing (too risky right now)
            We don't want a bifurcated system of record when it comes to userIds
        */
        try {
            userMetadataRepository.save(userMetadata);
        } catch (Exception ex) {
            log.error("Sql call failed", ex);
            throw new InternalException();
        }

        return user;
    }
}
