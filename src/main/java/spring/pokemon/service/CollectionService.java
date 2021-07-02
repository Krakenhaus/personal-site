package spring.pokemon.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import spring.pokemon.data.CardCollectionRepository;
import spring.pokemon.data.ProductDetailsRepository;
import spring.pokemon.data.entities.CardCollection;
import spring.pokemon.data.enums.CardType;
import spring.pokemon.data.enums.SortBy;
import spring.pokemon.errors.InternalException;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
public class CollectionService {
    @Autowired
    CardCollectionRepository cardCollectionRepository;

    @Autowired
    ProductDetailsRepository productDetailsRepository;

    @Autowired
    ProductService productService;
    public void updateCardInCollection(CardCollection cardCollection) {
        try {
            // Add the sku price to the tcg cache before adding to collection to maintain referential integrity
            CardCollection existing = cardCollectionRepository.findByUserIdAndProductId(cardCollection.getUserId(), cardCollection.getProductId());
            if (cardCollection.getSkuId() != null) {
                if(existing == null || existing.getSkuId() == null || !existing.getSkuId().equals(cardCollection.getSkuId())) {
                    productService.getSkuPrices(cardCollection.getSkuId().toString());
                }
            }

            if (!CollectionUtils.isEmpty(cardCollection.getCardFolders())) {
                cardCollection.getCardFolders().forEach(cardFolder -> {cardFolder.setUserId(cardCollection.getUserId());});
            }

            if (existing != null) {
                BeanUtils.copyProperties(cardCollection, existing, getNullPropertyNames(cardCollection));
            } else {
                existing = cardCollection;
            }
            cardCollectionRepository.save(existing);
        } catch (Exception ex) {
            log.error("Sql call failed", ex);
            throw new InternalException();
        }
    }
    public void addCardToCollection(CardCollection cardCollection) {
        try {
            // Add the product to the tcg cache before adding to collection to maintain referential integrity
            if (productDetailsRepository.findById(cardCollection.getProductId()).isEmpty()) {
                productService.getProductDetails(cardCollection.getProductId().toString(), true);
            }

            cardCollectionRepository.save(cardCollection);
        } catch (Exception ex) {
            log.error("Sql call failed", ex);
            throw new InternalException();
        }
    }

    public BigDecimal getTotalMarketPrice(UUID userId, CardType cardType, String folderId) {

        if (!StringUtils.isEmpty(folderId) && cardType != null) {
            return cardCollectionRepository.sumSkuPriceMarketPriceByUserIdAndProductDetailsCardTypeAndCardFoldersFolderId(userId, UUID.fromString(folderId), cardType.name());
        } else if (!StringUtils.isEmpty(folderId)) {
            return cardCollectionRepository.sumSkuPriceMarketPriceByUserIdAndCardFoldersFolderId(userId, UUID.fromString(folderId));
        }else if (cardType != null) {
            return cardCollectionRepository.sumSkuPriceMarketPriceByUserIdAndProductDetailsCardType(userId, cardType.name());
        } else {
            return cardCollectionRepository.sumSkuPriceMarketPriceByUserId(userId);
        }
    }

    public Page<CardCollection> getCollection(UUID userId, CardType cardType, String folderId, SortBy sortBy, String order, Integer pageSize, Integer pageIndex) {
        // Example for joined column sort: Sort.by("productDetails.cardType").ascending()
        Sort dataSort =  Sort.by("displayOrder").ascending();
        if (sortBy != null && order != null) {
            if (order.equals("desc")) {
                // https://github.com/spring-projects/spring-data-jpa/issues/1280
                dataSort = Sort.by(new Sort.Order(Sort.Direction.DESC, sortBy.sortSql).nullsFirst()).descending();
            } else {
                // https://github.com/spring-projects/spring-data-jpa/issues/1280
                dataSort = Sort.by(new Sort.Order(Sort.Direction.ASC, sortBy.sortSql).nullsLast()).ascending();
            }
        }

        try {
            if (!StringUtils.isEmpty(folderId) && cardType != null) {
                return cardCollectionRepository.findByUserIdAndProductDetailsCardTypeAndCardFoldersFolderId(userId, cardType.name(), UUID.fromString(folderId), PageRequest.of(pageIndex, pageSize, dataSort));
            } else if (!StringUtils.isEmpty(folderId)) {
                return cardCollectionRepository.findByUserIdAndCardFoldersFolderId(userId, UUID.fromString(folderId), PageRequest.of(pageIndex, pageSize, dataSort));
            }else if (cardType != null) {
                return cardCollectionRepository.findByUserIdAndProductDetailsCardType(userId, cardType.name(), PageRequest.of(pageIndex, pageSize, dataSort));
            } else {
                return cardCollectionRepository.findByUserId(userId, PageRequest.of(pageIndex, pageSize, dataSort));
            }
        } catch (Exception ex) {
            log.error("Sql call failed", ex);
            throw new InternalException();
        }
    }

    public void deleteCollectionProduct(UUID userId, Integer productId) {
        try {
            cardCollectionRepository.deleteByUserIdAndProductId(userId, productId);
        } catch (Exception ex) {
            log.error("Sql call failed", ex);
            throw new InternalException();
        }
    }

    private String[] getNullPropertyNames (Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();
        Set<String> emptyNames = new HashSet<String>();
        for(java.beans.PropertyDescriptor pd : pds) {
            //check if value of this property is null then add it to the collection
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }
}
