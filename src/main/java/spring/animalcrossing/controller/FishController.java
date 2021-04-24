package spring.animalcrossing.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.animalcrossing.model.Fish;
import spring.animalcrossing.service.FishService;

import java.util.List;

@RestController
public class FishController extends ApiController {

    @Autowired
    private FishService fishService;

    @RequestMapping("/fish")
    public List<Fish> getFish() {
        return fishService.getCreatures();
    }
}