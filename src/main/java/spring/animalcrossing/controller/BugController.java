package spring.animalcrossing.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.animalcrossing.model.Bug;
import spring.animalcrossing.service.BugService;

import java.util.List;

@RestController
public class BugController extends ApiController {

    @Autowired
    private BugService bugService;

    @RequestMapping("/bugs")
    public List<Bug> getBugs() {
        return bugService.getCreatures();
    }
}