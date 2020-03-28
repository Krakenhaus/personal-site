package spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.model.Fish;
import spring.service.FishService;

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