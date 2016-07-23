package javajo.controller;

import javajo.entity.MapEntity;
import javajo.repository.MapRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 * Created by Eriko on 2016/07/21.
 */
@RestController
@RequestMapping(value = "/applied002")
public class MapController {

    private final Logger log = LoggerFactory.getLogger(MapController.class);

    @Autowired
    private MapRepository mapRepository;

    @RequestMapping(value = "/checkDuplicate", method = RequestMethod.GET)
    public ResponseEntity<MapEntity> checkDuplicate(@RequestParam final String mapName) {
        log.info("REST request to get Map : {}", mapName);
        MapEntity mapEntity = mapRepository.findByMapName(mapName);
        return Optional.ofNullable(mapEntity)
                .map(result -> new ResponseEntity<>(result, HttpStatus.CONFLICT))
                .orElse(new ResponseEntity<>(HttpStatus.OK));
    }

    /**
     * マップ保存.
     * @param mapEntity MapEntity
     */
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void create(final MapEntity mapEntity) {
        log.info("REST request to save Map : {}", mapEntity);
        this.mapRepository.save(mapEntity);
    }

    /**
     * マップ更新.
     * @param mapEntity MapEntity
     */
    @RequestMapping(value = "/save", method = RequestMethod.PUT)
    public void update(final MapEntity mapEntity) {
        log.info("REST request to update Map : {}", mapEntity);
        MapEntity entity = this.mapRepository.findOne(mapEntity.getId());
        entity.setMapData(mapEntity.getMapData());
        entity.setCollisionData(mapEntity.getCollisionData());
        entity.setMapName(mapEntity.getMapName());
        this.mapRepository.save(entity);
    }

}
