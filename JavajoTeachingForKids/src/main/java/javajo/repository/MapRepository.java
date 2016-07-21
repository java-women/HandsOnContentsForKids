package javajo.repository;

import javajo.entity.MapEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * MapテーブルにアクセスするRepositoryインタフェース.<br>
 * Created by Eriko on 2016/03/24.
 */
@Repository
public interface MapRepository extends JpaRepository<MapEntity, Long> {

    MapEntity findByMapName(String mapName);

}
