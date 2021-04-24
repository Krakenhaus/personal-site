package spring.pokemon.client;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import spring.pokemon.client.model.TCGProductDetail;
import spring.pokemon.client.model.TCGProductDetails;
import spring.pokemon.client.model.TCGSkuPrice;
import spring.pokemon.client.model.TCGSkuPricingResponse;
import spring.pokemon.errors.CardNotFoundException;
import spring.pokemon.errors.TCGPlayerClientException;
import spring.pokemon.model.SearchRequest;


import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.util.List;
import java.util.Set;

@Component
public class TCGPlayerClient {

    @Autowired
    HttpClient client;

    public List<TCGProductDetail> getProductDetails(Set<Integer> productIds, boolean includeSkus) {
        String commaSeparatedProductIds = StringUtils.join(productIds, ",");
        return getProductDetails(commaSeparatedProductIds, includeSkus);
    }

    public List<TCGProductDetail> getProductDetails(String productIds, boolean includeSkus) {
        HttpRequest request = HttpRequest.newBuilder(
                URI.create("https://api.tcgplayer.com/catalog/products/" + productIds + "?getExtendedFields=false&includeSkus=" + includeSkus))
                .header("User-Agent", "Greg's Personal Site Card Tracker")
                .header("Accept", "application/json")
                .header("Authorization", "")
                .build();

        try {
            var response = client.send(request, new JsonBodyHandler<>(TCGProductDetails.class));
            TCGProductDetails productDetailsResponse = response.body().get();

            List<String> errors = productDetailsResponse.getErrors();
            if (!errors.isEmpty()) {
                System.out.println(errors);
                throw new TCGPlayerClientException();
            }
            return productDetailsResponse.getResults();
        } catch (IOException | InterruptedException ex) {
            System.out.println(ex.getLocalizedMessage());
            throw new CardNotFoundException();
        }
    }

    public Set<Integer> productSearch(SearchRequest searchRequest) {
        String requestData = "{\n" +
                "            \"sort\": \"name\",\n" +
                "                \"limit\": 10,\n" +
                "                \"offset\": 0,\n" +
                "                \"filters\": [\n" +
                "            { \"name\": \"ProductName\", \"values\": [ \"" + searchRequest.getProductName() + "\" ] },\n" +
                "            { \"name\": \"SetName\", \"values\": [ \"" + searchRequest.getSetName() + "\" ] }\n" +
                "    ]\n" +
                "        }";

        HttpRequest request = HttpRequest.newBuilder(
                URI.create("https://api.tcgplayer.com/catalog/categories/3/search"))
                .header("User-Agent", "Greg's Personal Site Card Tracker")
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .header("Authorization", "")
                .POST(HttpRequest.BodyPublishers.ofString(requestData))
                .build();

        try {
            var response = client.send(request, new JsonBodyHandler<>(TCGSkuPricingResponse.SearchResponse.class));
            TCGSkuPricingResponse.SearchResponse searchResponse = response.body().get();

            List<String> errors = searchResponse.getErrors();
            if (!errors.isEmpty()) {
                System.out.println(errors);
                throw new TCGPlayerClientException();
            }
            return searchResponse.getResults();
        } catch (IOException | InterruptedException ex) {
            System.out.println(ex.getLocalizedMessage());
            throw new CardNotFoundException();
        }
    }

    public List<TCGSkuPrice> getPricing(Set<Integer> skuIds) {
        // Convert list of skuIds to csv
        String commaSeparatedSkus = StringUtils.join(skuIds, ",");

        HttpRequest request = HttpRequest.newBuilder(
            URI.create("https://api.tcgplayer.com/pricing/sku/" + commaSeparatedSkus))
                .header("User-Agent", "Greg's Personal Site Card Tracker")
                .header("Accept", "application/json")
                .header("Authorization", "")
                .build();

        try {
            var response = client.send(request, new JsonBodyHandler<>(TCGSkuPricingResponse.class));
            TCGSkuPricingResponse pricingResponse = response.body().get();

            List<String> errors = pricingResponse.getErrors();
            if (!errors.isEmpty()) {
                System.out.println(errors);
                throw new TCGPlayerClientException();
            }
            return pricingResponse.getResults();
        } catch (IOException | InterruptedException ex) {
            System.out.println(ex.getLocalizedMessage());
            throw new CardNotFoundException();
        }
    }
}
