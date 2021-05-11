package spring.pokemon.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spring.pokemon.client.TCGPlayerClient;
import spring.pokemon.client.model.TCGProductDetail;
import spring.pokemon.client.model.TCGSkuPrice;
import spring.pokemon.data.ProductDetailsRepository;
import spring.pokemon.data.SkuDetailsRepository;
import spring.pokemon.data.SkuPricesRepository;
import spring.pokemon.data.entities.ProductDetails;
import spring.pokemon.data.entities.SkuDetails;
import spring.pokemon.data.entities.SkuPrice;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    ProductDetailsRepository productDetailsRepository;

    @Autowired
    SkuPricesRepository skuPricesRepository;

    @Autowired
    SkuDetailsRepository skuDetailsRepository;

    @Autowired
    TCGPlayerClient tcgPlayerClient;

    public final static long MILLIS_PER_WEEK = 7 * 24 * 60 * 60 * 1000L;

    public List<SkuPrice> getSkuPrices(String skuIds) {
        Set<Integer> skuIdsList = Arrays.stream(skuIds.split("\\s*,\\s*")).filter(item-> !StringUtils.isEmpty(item)).map(Integer::parseInt).collect(Collectors.toSet());

        // Get non-stale prices from h2 cache
        List<SkuPrice> cachedSkuPrices = skuPricesRepository.findAllById(skuIdsList);
        cachedSkuPrices = cachedSkuPrices.stream().filter(cachedSkuPrice -> {
            boolean stale = Math.abs(new Date().getTime() - cachedSkuPrice.getLastUpdateTime().getTime()) > MILLIS_PER_WEEK;
            return !stale;
        }).collect(Collectors.toList());

        Set<Integer> cachedSkuIds = cachedSkuPrices.stream().map(SkuPrice::getSkuId).collect(Collectors.toSet());
        System.out.println("Hit H2 cache for skuIds: " + cachedSkuIds);

        skuIdsList.removeAll(cachedSkuIds);
        List<SkuPrice> newSkuPrices = new ArrayList<>();
        if(!skuIdsList.isEmpty()){
            System.out.println("Calling TCGPlayer for skuIds: " + skuIdsList);
            List<TCGSkuPrice> tcgSkuPrices = tcgPlayerClient.getPricing(skuIdsList);

            newSkuPrices = tcgSkuPrices.stream().map(tcgSkuPrice -> SkuPrice.builder()
                    .skuId(tcgSkuPrice.getSkuId())
                    .lowestListingPrice(tcgSkuPrice.getLowestListingPrice())
                    .lowestShipping(tcgSkuPrice.getLowestShipping())
                    .lowPrice(tcgSkuPrice.getLowPrice())
                    .marketPrice(tcgSkuPrice.getMarketPrice())
                    .lastUpdateTime(new Date())
                    .build()).collect(Collectors.toList());

            newSkuPrices.forEach(skuPrice -> {
                skuPricesRepository.save(skuPrice);
                Optional<SkuDetails> skuDetailsOptional = skuDetailsRepository.findById(skuPrice.getSkuId());
                skuDetailsOptional.ifPresent(skuPrice::setSkuDetails);
            });
        }

        newSkuPrices.addAll(cachedSkuPrices);
        return newSkuPrices;
    }

    public List<ProductDetails> getProductDetails(String productIds, Boolean includeSkus) {

        Set<Integer> productIdsList = Arrays.stream(productIds.split("\\s*,\\s*")).filter(item-> !StringUtils.isEmpty(item)).map(Integer::parseInt).collect(Collectors.toSet());
        List<ProductDetails> cachedProductDetails = productDetailsRepository.findAllById(productIdsList);
        Set<Integer> cachedProductIds = cachedProductDetails.stream().map(ProductDetails::getProductId).collect(Collectors.toSet());
        System.out.println("Hit H2 cache for productIds: " + cachedProductIds);

        productIdsList.removeAll(cachedProductIds);
        List<ProductDetails> newProductDetails = new ArrayList<>();
        if (!productIdsList.isEmpty()) {
            System.out.println("Calling TCGPlayer for productIds: " + productIdsList);
            List<TCGProductDetail> tcgProductDetails = tcgPlayerClient.getProductDetails(productIdsList, includeSkus);

            newProductDetails = tcgProductDetails.stream().map(tcgProductDetail -> {
                ProductDetails productDetails = ProductDetails.builder()
                        .productId(tcgProductDetail.getProductId())
                        .name(tcgProductDetail.getName())
                        .groupId(tcgProductDetail.getGroupId())
                        .imageUrl(tcgProductDetail.getImageUrl())
                        .url(tcgProductDetail.getUrl())
                        .build();

                List<SkuDetails> skuDetails = tcgProductDetail.getSkus().stream().map(tcgSku -> SkuDetails.builder()
                        .skuId(tcgSku.getSkuId())
                        .productDetails(productDetails)
                        .conditionId(tcgSku.getConditionId())
                        .languageId(tcgSku.getLanguageId())
                        .printingId(tcgSku.getPrintingId())
                        .build()).collect(Collectors.toList());

                productDetails.setSkuDetails(skuDetails);
                return productDetails;
            }).collect(Collectors.toList());

            newProductDetails.forEach(productDetail -> {
                productDetailsRepository.save(productDetail);
            });
        }

        newProductDetails.addAll(cachedProductDetails);
        return newProductDetails;
    }
}
