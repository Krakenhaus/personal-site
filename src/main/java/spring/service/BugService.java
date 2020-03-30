package spring.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import spring.model.Bug;
import spring.util.DateUtil;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class BugService implements CreatureService<Bug> {

    private static final String bugCSV = "data/bugs.csv";

    @NonNull
    public List<Bug> getCreatures()
    {
        List<Bug> bugs = new ArrayList<>();

        try {
            InputStream is = new ClassPathResource(bugCSV).getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(is));

            reader.readLine(); // Skip first line; it's the header
            String line;
            while ((line = reader.readLine()) != null)
            {
                Bug bug = new Bug();
                String[] fields = line.split(",");
                bug.setIndex(fields[0]);
                bug.setName(fields[1]);
                bug.setLocation(fields[2]);
                bug.setPrice(fields[3]);
                bug.setTime(fields[4]);
                bug.setNorthernMonths(DateUtil.getMonths(fields[5]));
                bug.setSouthernMonths(DateUtil.getMonths(fields[6]));

                bugs.add(bug);
            }
        } catch (IOException e) {
            // throw somethng
        }

        return bugs;
    }
}
