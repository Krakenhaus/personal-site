package spring.pokemon.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import spring.pokemon.client.model.TCGToken;

import javax.annotation.PostConstruct;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
public class TokenManager {

    private static TCGPlayerClient client;

    @Autowired
    TCGPlayerClient tclient;

    @PostConstruct
    public void init() {
        // Pass bean to static field after bean is configured by spring
        TokenManager.client = tclient;
    }
    // Singleton Pattern
    private static final TokenManager instance = new TokenManager();
    private TokenManager() {}
    public static TokenManager getInstance() {
        return instance;
    }

    private volatile String token = null;
    private volatile Date refreshAt = Date.from(Instant.now());

    public String getToken() {
        if (tokenNeedsRefresh()) {
            syncUpdateToken();
        }

        return this.token;
    }

    private boolean tokenNeedsRefresh() {
        // Refresh one day early to avoid any funny business
        return (Date.from(Instant.now().plus(1, ChronoUnit.DAYS))).after(refreshAt);
    }

    // Synchronized so that only 1 thread can update it at a time
    private synchronized void syncUpdateToken() {
        // Prevent subsequent threads from updating the token again
        if(!tokenNeedsRefresh()) {
            return;
        }

        TCGToken tcgToken = client.generateNewToken();
        token = tcgToken.getAccessToken();
        refreshAt = tcgToken.getExpires();
    }
}
