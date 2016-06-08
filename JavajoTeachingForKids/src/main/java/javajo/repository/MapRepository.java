package javajo.repository;

import javajo.entity.MapEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * MapテーブルにアクセスするRepositoryインタフェース.<br>
 * Created by Eriko on 2016/03/24.
 */
public interface MapRepository extends JpaRepository<MapEntity, Long> {
}
