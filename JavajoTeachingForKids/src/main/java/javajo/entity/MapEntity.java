package javajo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Mapテーブル用Entityクラス.<br>
 * Created by Eriko on 2016/03/24.
 */
@Entity
@Table(name = "map")
public class MapEntity {

    /** ID(自動採番). */
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    /** Mapデータ. */
    @Column(name = "map_data", length = 2000)
    private String mapData;

    /** 衝突データ. */
    @Column(name = "collision_data", length = 2000)
    private String collisionData;

    /** 名前. */
    @Column(name = "map_name", unique = true)
    private String mapName;

    /**
     * コンストラクタ.
     */
    public MapEntity() {
    }

    /**
     * Gets id.
     *
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets id.
     *
     * @param id the id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gets map data.
     *
     * @return the map data
     */
    public String getMapData() {
        return mapData;
    }

    /**
     * Sets map data.
     *
     * @param mapData the map data
     */
    public void setMapData(final String mapData) {
        this.mapData = mapData;
    }

    /**
     * Gets collision data.
     *
     * @return the collision data
     */
    public String getCollisionData() {
        return collisionData;
    }

    /**
     * Sets collision data.
     *
     * @param collisionData the collision data
     */
    public void setCollisionData(final String collisionData) {
        this.collisionData = collisionData;
    }

    /**
     * Gets map name.
     *
     * @return the map name
     */
    public String getMapName() {
        return mapName;
    }

    /**
     * Sets map name.
     *
     * @param mapName the map name
     */
    public void setMapName(final String mapName) {
        this.mapName = mapName;
    }

    @Override
    public String toString() {
        return "MapEntity{"
                + "id=" + id
                + ", mapData='" + mapData + '\''
                + ", collisionData='" + collisionData + '\''
                + ", mapName='" + mapName + '\''
                + '}';
    }

}
