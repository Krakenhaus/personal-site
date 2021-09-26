package spring.pokemon.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spring.pokemon.data.CardFolderRepository;
import spring.pokemon.data.entities.CardFolder;
import spring.pokemon.errors.InternalException;

import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class FolderService {

    @Autowired
    CardFolderRepository cardFolderRepository;

    public List<CardFolder> getFolders(UUID userId) {
        try {
            return cardFolderRepository.findByUserId(userId);
        } catch (Exception ex) {
            log.error("Sql call failed", ex);
            throw new InternalException();
        }
    }

    public CardFolder createFolder(CardFolder cardFolder) {
        UUID cardFolderId = UUID.randomUUID();
        cardFolder.setFolderId(cardFolderId);
        try {
            cardFolderRepository.save(cardFolder);
            return cardFolder;
        } catch (Exception ex) {
            // TODO: Catch org.springframework.dao.DataIntegrityViolationException for missing user
            log.error("Sql call failed", ex);
            throw new InternalException();
        }
    }

    public void deleteFolder(UUID userId, UUID folderId) {
        try {
            cardFolderRepository.deleteByUserIdAndFolderId(userId, folderId);
        } catch (Exception ex) {
            log.error("Sql call failed", ex);
            throw new InternalException();
        }
    }
}
