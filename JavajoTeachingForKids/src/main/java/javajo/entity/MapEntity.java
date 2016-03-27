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

    @Override
    public String toString() {
        return "MapEntity [id=" + mId + ", mapData=" + mMapData + "]";
    }
}
