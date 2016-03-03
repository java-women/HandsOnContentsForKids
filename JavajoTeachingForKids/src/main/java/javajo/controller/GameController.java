package javajo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Eriko on 2016/02/04.
 */
@Controller
public class GameController {

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
}
