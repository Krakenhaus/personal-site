package spring.model;

import java.util.List;

public class Fish {
    private String index;
    private String name;
    private List<Integer> northernMonths;

    public String getIndex() {
        return index;
    }

    public void setIndex(String index) {
        this.index = index;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getNorthernMonths() {
        return northernMonths;
    }

    public void setNorthernMonths(List<Integer> northernMonths) {
        this.northernMonths = northernMonths;
    }
}
