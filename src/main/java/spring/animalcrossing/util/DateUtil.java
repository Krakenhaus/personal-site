package spring.animalcrossing.util;

import java.time.Month;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DateUtil {

    // input is like "November-December", "January", or "March-June|August-September"
    public static List<Integer> getMonths(String input)
    {
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
