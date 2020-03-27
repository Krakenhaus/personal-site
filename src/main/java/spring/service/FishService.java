package spring.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import spring.model.Fish;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.Month;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class FishService {

    private static final String fishCSV = "data/fish.csv";

    @NonNull
    public List<Fish> getFishies()
    {
        List<Fish> fishies = new ArrayList<>();

        try {
            InputStream is = new ClassPathResource(fishCSV).getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));

            String line;
            while ((line = reader.readLine()) != null)
            {
                Fish fish = new Fish();
                String[] fields = line.split(",");
                fish.setIndex(fields[0]);
                fish.setName(fields[1]);
                fish.setNorthernMonths(getNorthernMonths(fields[6]));
                fish.setTime(fields[5]);
                fishies.add(fish);
            }
        } catch (IOException e) {
            // throw somethng
        }

        return fishies;
    }

    private List<Integer> getNorthernMonths(String input)
    {
        // input is like "November-December", "January", or "March-June|August-September"

        List<Integer> availableMonths = new ArrayList<>();

        if (input.equals("All"))
        {
            availableMonths.add(1);
            availableMonths.add(2);
            availableMonths.add(3);
            availableMonths.add(4);
            availableMonths.add(5);
            availableMonths.add(6);
            availableMonths.add(7);
            availableMonths.add(8);
            availableMonths.add(9);
            availableMonths.add(10);
            availableMonths.add(11);
            availableMonths.add(12);
            return availableMonths;
        }

        String[] ranges = input.split("\\|");
        Arrays.stream(ranges).forEach(range ->
        {
            try {
                String[] months = range.split("-");
                Month startM = Month.valueOf(months[0].toUpperCase());
                availableMonths.add(startM.getValue());
                if (months[1] != null) {
                    Month endM = Month.valueOf(months[1].toUpperCase());
                    Month nextM = startM;

                    do {
                        int nextInt = (nextM.getValue() + 1)%13;
                        nextInt = nextInt == 0 ? 1 : nextInt;
                        nextM = Month.of(nextInt);
                        availableMonths.add(nextM.getValue());
                    } while (!nextM.equals(endM));

                }
            }
            catch (Exception e)
            {
                // skip;
            }
        });

        return availableMonths;

    }
}
