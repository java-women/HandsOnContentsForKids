enchant();

/**
 * enchant.jsの描画
 */
window.onload = function() {

    // 初期設定
    core = new Core(320, 320);
    core.scale = SCALE;
    core.preload('chara0.png', 'chara1.png', 'chara2.png', 'chara3.png', 'chara4.png', 'chara5.png', 'chara6.png', 'chara7.png',
                 'map0.png', 'map1.png', 'map2.png',
                 'icon0.png', 'icon1.png',
                 'start.png', 'gameover.png', 'clear.png');
    core.fps = 10;

    // ゲーム本体の描画
    core.onload = function() {
        core.replaceScene(createStartScene());
    };

    core.start();
}

/**
 * ゲーム画面
 */
function createGameScene() {
    var scene = new Scene();

    var jsText = $('#text-editor').val();
    window.sessionStorage.setItem(['javascript'],[jsText]);
    eval(jsText);

    return scene;
}
