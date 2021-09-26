package spring.pokemon.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import spring.pokemon.client.model.TCGProductDetail;
import spring.pokemon.data.entities.PriceHistory;
import spring.pokemon.data.entities.ProductDetails;
import spring.pokemon.data.entities.SkuPrice;
import spring.pokemon.model.SearchRequest;
import spring.pokemon.service.ProductService;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/pokemon")
public class ProductController {

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

    @GetMapping("products/pricing/folders/{folderId}/history/date/{atDate}")
    public List<BigDecimal> getFolderPriceHistory(@PathVariable String folderId, @PathVariable String atDate) {
        UUID folderIdUUID = UUID.fromString(folderId);

        try {
            SimpleDateFormat format = new SimpleDateFormat("MM-dd-yyy");
            Date date = format.parse(atDate);
            return productService.getFolderPriceHistory(folderIdUUID, date);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid date, it must follow the pattern MM-dd-yyyy.");
        }
    }
}
