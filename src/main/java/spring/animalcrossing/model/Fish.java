package spring.animalcrossing.model;

import java.util.List;

public class Fish {
    private String index;
    private String name;
    private List<Integer> northernMonths;
    private List<Integer> southernMonths;
    private String time;
    private String price;
    private String size;
    private String location;

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

    public String getTime()
    {
        return time;
    }

    public void setTime(String time)
    {
        this.time = time;
    }

    public List<Integer> getSouthernMonths() {
        return southernMonths;
    }

    public void setSouthernMonths(List<Integer> southernMonths) {
        this.southernMonths = southernMonths;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
