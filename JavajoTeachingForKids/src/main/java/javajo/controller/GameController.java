package javajo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Eriko on 2016/02/04.
 */
@Controller
public class GameController {

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
     *
     * @return テンプレートHTML
     */
    @RequestMapping(value = "stage-{content}", method = RequestMethod.GET)
    public String viewContent(@PathVariable String content) {
        return content;
    }

    /**
     * Chat.
     *
     * @return テンプレートHTML
     */
    @RequestMapping(value = "/chat", method = RequestMethod.GET)
    public String chat() {
        return "chat";
    }

}
