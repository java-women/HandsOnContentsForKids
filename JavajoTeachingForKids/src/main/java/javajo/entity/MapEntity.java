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
    private Long mId;

    /** Mapデータ. */
    @Column(name = "map_data", length = 2000)
    private String mMapData;

    /** 衝突データ */
    @Column(name = "collision_data", length = 2000)
    private String mCollisionData;

    /**
     * コンストラクタ.
     */
    public MapEntity() {
    }

    /**
     * Gets map data.
     *
     * @return the map data
     */
    public String getMapData() {
        return mMapData;
    }

    /**
     * Sets map data.
     *
     * @param mapData the map data
     */
    public void setMapData(final String mapData) {
        this.mMapData = mapData;
    }

    /**
     * Gets collision data.
     *
     * @return the collision data
     */
    public String getCollisionData() {
        return mCollisionData;
    }

    /**
     * Sets collision data.
     *
     * @param collisionData the collision data
     */
    public void setCollisionData(String collisionData) {
        mCollisionData = collisionData;
    }

    @Override
    public String toString() {
        return "MapEntity{" +
                "mId=" + mId +
                ", mMapData='" + mMapData + '\'' +
                ", mCollisionData='" + mCollisionData + '\'' +
                '}';
    }

}
