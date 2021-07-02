package spring.pokemon.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import spring.pokemon.client.TCGPlayerClient;
import spring.pokemon.client.model.TCGProductDetail;
import spring.pokemon.data.entities.FolderPriceHistory;
import spring.pokemon.data.entities.PriceHistory;
import spring.pokemon.data.entities.ProductDetails;
import spring.pokemon.data.entities.SkuPrice;
import spring.pokemon.model.SearchRequest;
import spring.pokemon.service.ProductService;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/pokemon")
public class ProductController {

    @Autowired
    TCGPlayerClient tcgPlayerClient;

    @Autowired
    ProductService productService;

    @PostMapping("/products/search")
    public List<TCGProductDetail> productSearch(@RequestBody SearchRequest searchRequest) {
        return productService.getSearch(searchRequest);
    }

    @GetMapping("products/{productIds}")
    public List<ProductDetails> getProductDetails(@PathVariable String productIds) {
        productIds = StringUtils.stripStart(productIds, ",");
        return productService.getProductDetails(productIds, true);
    }

    @GetMapping("products/pricing/skus/{skuIds}")
    public List<SkuPrice> getSkuPrices(@PathVariable String skuIds) {
        skuIds = StringUtils.stripStart(skuIds, ",");
        return productService.getSkuPrices(skuIds);
    }

    @GetMapping("products/pricing/skus/{skuId}/history")
    public List<PriceHistory> getSkuPriceHistory(@PathVariable Integer skuId) {
        return productService.getPriceHistory(skuId);
    }

    @GetMapping("products/pricing/folders/{folderId}/history")
    public List<FolderPriceHistory> getFolderPriceHistory(@PathVariable String folderId) {
        UUID folderIdUUID = UUID.fromString(folderId);
        return productService.getFolderPriceHistory(folderIdUUID);
    }
}
