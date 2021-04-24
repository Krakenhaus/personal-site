package spring.animalcrossing.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import spring.animalcrossing.model.Fish;
import spring.animalcrossing.util.DateUtil;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class FishService implements CreatureService<Fish> {

    private static final String fishCSV = "data/fish.csv";

    @NonNull
    public List<Fish> getCreatures()
    {
        List<Fish> fishies = new ArrayList<>();

        try {
            InputStream is = new ClassPathResource(fishCSV).getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));

            reader.readLine(); // Skip first line; it's the header
            String line;
            while ((line = reader.readLine()) != null)
            {
                Fish fish = new Fish();
                String[] fields = line.split(",");
                fish.setIndex(fields[0]);
                fish.setName(fields[1]);
                fish.setLocation(fields[2]);
                fish.setSize(fields[3]);
                fish.setPrice(fields[4]);
                fish.setTime(fields[5]);
                fish.setNorthernMonths(DateUtil.getMonths(fields[6]));
                fish.setSouthernMonths(DateUtil.getMonths(fields[7]));
                fishies.add(fish);
            }
        } catch (IOException e) {
            // throw somethng
        }

        return fishies;
    }
}
