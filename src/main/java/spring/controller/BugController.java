package spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.model.Bug;
import spring.service.BugService;

import java.util.List;

@RestController
public class BugController {

    @Autowired
    private BugService bugService;

    @RequestMapping("/bugs")
    public List<Bug> getBugs() {
        return bugService.getCreatures();
    }
}