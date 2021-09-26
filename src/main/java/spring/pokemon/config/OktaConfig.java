package spring.pokemon.config;

import com.okta.sdk.authc.credentials.TokenClientCredentials;
import com.okta.sdk.client.Client;
import com.okta.sdk.client.Clients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OktaConfig {

    @Value("${okta.oauth2.orgUrl}")
    private String orgUrl;

    @Value("${okta.oauth2.api.token}")
    private String apiToken;

    @Bean
    protected Client oktaClientSdk() {
        return Clients.builder()
                .setOrgUrl(orgUrl)
                .setClientCredentials(new TokenClientCredentials(apiToken))
                .build();
    }
}
