package javajo.controller;

import javajo.entity.MapEntity;
import javajo.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by Eriko on 2016/02/04.
 */
@Controller
public class GameController {

    /** GameServiceをDI. */
    @Autowired
    private GameService mGameService;

    /**
     * 初期画面表示.
     *
     * @return テンプレートHTML
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String viewIndex() {
        return "index";
    }

    /**
     * コンテンツ表示.
     * @return テンプレートHTML
     */
    @RequestMapping(value = "stage-{content}", method = RequestMethod.GET)
    public String viewContent(@PathVariable String content) {
        return content;
    }

    /**
     * マップ保存.
     * @param mapEntity MapEntity
     */
    @ResponseBody
    @RequestMapping(value = "/applied002/save", method = RequestMethod.POST)
    public void stage201Save(final MapEntity mapEntity) {
        this.mGameService.saveMap(mapEntity);
    }

    /**
     * Chat.
     * @return テンプレートHTML
     */
    @RequestMapping(value = "/chat", method = RequestMethod.GET)
    public String chat() {
        return "chat";
    }

}
