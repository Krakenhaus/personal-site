package spring.pokemon.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import spring.pokemon.data.entities.CardCollection;
import spring.pokemon.data.entities.CardFolder;
import spring.pokemon.data.entities.UserMetadata;
import spring.pokemon.data.enums.CardType;
import spring.pokemon.data.enums.SortBy;
import spring.pokemon.errors.UserNotFoundException;
import spring.pokemon.service.CollectionService;
import spring.pokemon.service.FolderService;
import spring.pokemon.service.UserService;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pokemon")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    CollectionService collectionService;

    @Autowired
    FolderService folderService;

    @PostMapping("/users")
    public UserMetadata createUser(@RequestBody String nickname) {
        return userService.createUser(nickname);
    }

    @PostMapping(path = "/users/{userId}/collection", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addCardToCollection(@Valid @RequestBody CardCollection cardCollection) {

        collectionService.addCardToCollection(cardCollection);
    }

    @PutMapping("/users/{userId}/collection")
    public void updateCardInCollection(@RequestBody CardCollection cardCollection) {
        collectionService.updateCardInCollection(cardCollection);
    }

    @GetMapping("users/{userId}/collection")
    public Page<CardCollection> getUserCollection(@PathVariable String userId, @RequestParam String cardType, @RequestParam String folderId, @RequestParam String sortBy, @RequestParam String order, Integer pageSize, Integer pageIndex) {
        if (pageSize > 50) {
            pageSize = 50;
        }
        SortBy sortByEnum = SortBy.valueOf(sortBy);
        CardType cardTypeEnum = null;
        if (!StringUtils.isEmpty(cardType)) {
            cardTypeEnum = CardType.valueOf(cardType);
        }

        UUID userIdUUID = UUID.fromString(userId);
        return collectionService.getCollection(userIdUUID, cardTypeEnum, folderId, sortByEnum, order, pageSize, pageIndex);
    }

    @GetMapping("users/{userId}")
    public UserMetadata getUserCollection(@PathVariable String userId) {
        UUID userIdUUID;
        try {
            userIdUUID = UUID.fromString(userId);
        } catch (Exception ex) {
            throw new UserNotFoundException();
        }

        return userService.getUser(userIdUUID);
    }

    @GetMapping("users/{userId}/collection/marketPrice")
    public BigDecimal getUserCollectionMarketPrice(@PathVariable String userId, @RequestParam String cardType, @RequestParam String folderId) {
        UUID userIdUUID = UUID.fromString(userId);
        CardType cardTypeEnum = null;
        if (!StringUtils.isEmpty(cardType)) {
            cardTypeEnum = CardType.valueOf(cardType);
        }

        return collectionService.getTotalMarketPrice(userIdUUID, cardTypeEnum, folderId);
    }

    @DeleteMapping("users/{userId}/collection/products/{productId}")
    public void deleteCollectionProduct(@PathVariable String userId, @PathVariable Integer productId) {
        UUID userIdUUID = UUID.fromString(userId);
        collectionService.deleteCollectionProduct(userIdUUID, productId);
    }

    @PostMapping(path = "/users/{userId}/folders", consumes = MediaType.APPLICATION_JSON_VALUE)
    public CardFolder addCardFolder(@RequestBody CardFolder cardFolder) {
        return folderService.createFolder(cardFolder);
    }

    @GetMapping("users/{userId}/folders")
    public List<CardFolder> getFolders(@PathVariable String userId) {
        UUID userIdUUID = UUID.fromString(userId);
        return folderService.getFolders(userIdUUID);
    }
    
    @DeleteMapping("users/{userId}/folders/{folderId}")
    public void deleteFolder(@PathVariable String userId, @PathVariable String folderId) {
        UUID userIdUUID = UUID.fromString(userId);
        UUID folderIdUUID = UUID.fromString(folderId);
        folderService.deleteFolder(userIdUUID, folderIdUUID);
    }
}
