package spring.pokemon.scheduled;

import com.okta.sdk.client.Client;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ScheduledOktaTasks {
    @Autowired
    Client oktaClientSdk;

    // At 00:00:00am, on the 9th and 24th day, every month
    @Scheduled(cron = "0 0 0 9,24 * ?")
    public void keepOktaAliveTask() {
        // Okta token expires after 30 days *of no usage*, so keep it alive with busywork
        log.info("Exercising Okta API to avoid token invalidation.");
        oktaClientSdk.getUser("pi0xig+41h4z1qnnr024@sharklasers.com");
    }
}
