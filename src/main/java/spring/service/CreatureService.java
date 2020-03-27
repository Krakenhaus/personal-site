package spring.service;

import java.util.List;

public interface CreatureService<T> {
    List<T> getCreatures();
}
