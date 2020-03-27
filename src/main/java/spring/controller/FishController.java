package spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.model.Fish;
import spring.service.FishService;

import java.util.List;

@RestController
public class FishController {

    @Autowired
    private FishService fishService;

    @RequestMapping("/fish")
    public List<Fish> getFish() {
        return fishService.getFishies();
    }
//
//    @RequestMapping(value = "/entity", method = RequestMethod.POST)
//    public GenericEntity addEntity(GenericEntity entity) {
//        entityList.add(entity);
//        return entity;
//    }
//
//    @RequestMapping("/entity/findby/{id}")
//    public GenericEntity findById(@PathVariable Long id) {
//        return entityList.stream().
//                filter(entity -> entity.getId().equals(id)).
//                findFirst().get();
//    }
}