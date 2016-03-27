package javajo.service;

import javajo.entity.MapEntity;
import javajo.repository.MapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * サービスクラス.<br>
 * テンプレートHTMLを返す以外の処理(DB処理なと)を行う場合はServiceクラスで行う.
 * Created by Eriko on 2016/03/24.
 */
@Component
public class GameService {

    /** MapRepositoryをDI. */
    @Autowired
    private MapRepository mMapRepository;

    /**
     * Mapを保存する.
     * @param mapEntity MapEntity
     */
    @Transactional(readOnly = false)
    public void saveMap(final MapEntity mapEntity) {

        // TODO 衝突データを作成する

        this.mMapRepository.save(mapEntity);

        // TODO 確認用のため完成したら削除する
        this.mMapRepository.findAll().forEach(System.out::println);
    }

}
