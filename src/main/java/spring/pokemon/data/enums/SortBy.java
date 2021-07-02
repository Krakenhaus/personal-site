package spring.pokemon.data.enums;

public enum SortBy {
    marketPrice("skuPrice.marketPrice"),
    lowestPrice("skuPrice.lowestListingPrice");

    public final String sortSql;

    SortBy(String sortSql) {
        this.sortSql = sortSql;
    }
}
