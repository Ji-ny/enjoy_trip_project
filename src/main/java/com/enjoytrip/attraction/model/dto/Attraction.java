package com.enjoytrip.attraction.model.dto;

import java.io.Serializable;

public class Attraction implements Serializable {
    private String id;
    private String title;
    private String addr1;
    private double mapx;
    private double mapy;
    private String firstimage;

    public Attraction() {
    }

    public Attraction(String id, String title, String addr1, double mapx, double mapy, String firstimage) {
        this.id = id;
        this.title = title;
        this.addr1 = addr1;
        this.mapx = mapx;
        this.mapy = mapy;
        this.firstimage = firstimage;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAddr1() {
        return addr1;
    }

    public void setAddr1(String addr1) {
        this.addr1 = addr1;
    }

    public double getMapx() {
        return mapx;
    }

    public void setMapx(double mapx) {
        this.mapx = mapx;
    }

    public double getMapy() {
        return mapy;
    }

    public void setMapy(double mapy) {
        this.mapy = mapy;
    }

    public String getFirstimage() {
        return firstimage;
    }

    public void setFirstimage(String firstimage) {
        this.firstimage = firstimage;
    }
}
