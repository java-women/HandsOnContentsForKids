package javajo.controller;

import javajo.entity.MapEntity;
import javajo.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
     * Game Stage001.
     * @return テンプレートHTML
     */
    @RequestMapping(value = "/stage001", method = RequestMethod.GET)
    public String stage001() {
        return "stage001";
    }

    /**
     * Game Stage002.
     * @return テンプレートHTML
     */
    @RequestMapping(value = "/stage002", method = RequestMethod.GET)
    public String stage002() {
        return "stage002";
    }

    /**
     * Game Stage003.
     * @return テンプレートHTML
     */
    @RequestMapping(value = "/stage003", method = RequestMethod.GET)
    public String stage003() {
        return "stage003";
    }

    /**
     * Game Stage101.
     * @return テンプレートHTML
     */
    @RequestMapping(value = "/stage101", method = RequestMethod.GET)
    public String stage101() {
        return "stage101";
    }

    /**
     * Game Stage201.
     * @return テンプレートHTML
     */
    @RequestMapping(value = "/stage201", method = RequestMethod.GET)
    public String stage201() {
        return "stage201";
    }

    /**
     * Game Stage201(マップ保存).
     * @param mapEntity MapEntity
     */
    @ResponseBody
    @RequestMapping(value = "/stage201/save", method = RequestMethod.POST)
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

    /**
     * Game Stage102.
     * @return テンプレートHTML
     */
    @RequestMapping(value = "/stage102", method = RequestMethod.GET)
    public String stage102() {
        return "stage102";
    }

    /**
     * Game Stage103.
     * @return テンプレートHTML
     */
    @RequestMapping(value = "/stage103", method = RequestMethod.GET)
    public String stage103() {
        return "stage103";
    }

    /**
     * Game Stage203.
     * @return テンプレートHTML
     */
    @RequestMapping(value = "/stage203", method = RequestMethod.GET)
    public String stage203() {
        return "stage203";
    }

}
