package spring.pokemon.data;

import org.springframework.data.repository.CrudRepository;
import spring.pokemon.data.entities.CardFolder;
import spring.pokemon.data.entities.ids.CardFolderId;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

public interface CardFolderRepository extends CrudRepository<CardFolder, CardFolderId> {
    List<CardFolder> findByUserId(UUID userId);

    @Transactional
    void deleteByUserIdAndFolderId(UUID userId, UUID folderId);
}
