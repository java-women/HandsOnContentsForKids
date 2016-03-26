enchant();

var core;

/**
 * enchant.jsの描画
 */
window.onload = function() {

    // 初期設定
    core = new Core(320, 320);
    core.preload('chara1.png');
    core.preload('start.png', 'gameover.png', 'clear.png');
    core.fps = 15;

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

    // ここに処理書く

    return scene;
}
