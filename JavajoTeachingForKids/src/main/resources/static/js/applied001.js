enchant();

var core;
const CHARA_IMG = 'chara1.png';
const AUTO = 'auto';
const MANUAL = 'manual';
const BEAR = 'bear';
const WHITE_BEAR = 'whiteBear';
const GIRL_BEAR = 'girlBear';

/**
 * enchant.jsの描画
 */
window.onload = function() {

    // 初期設定
    core = new Core(320, 320);
    core.scale = SCALE;
    core.preload(CHARA_IMG);
    core.fps = 8;

    const defaultColor = document.getElementById('color-picker').value;
    core.rootScene.backgroundColor = "#" + defaultColor;

    // ゲーム本体の描画
    core.onload = function() {
        core.replaceScene(createGameScene());
    };

    core.start();
}

/**
 * ゲーム画面
 */
var createGameScene = function(selectMove, selectBear) {
    var scene = new Scene();
    var bear = new Sprite(32, 32);
    bear.image = core.assets[CHARA_IMG];
    bear.x = 0;
    bear.y = 0;

    // キャラクターのイベント
    bear.on('enterframe', function() {

        // 画面からのキャラクターの動き変更
        switch(selectMove) {
            case AUTO:
                bearMove.auto(this);
                break;
            case MANUAL:
                bearMove.manual(this);
                break;
            default:
                break;
        }
    });

    scene.addChild(bear);

    // 画面からのキャラクター変更
    switch(selectBear) {
        case BEAR:
            bear.frame = [0, 1, 0, 2];
            break;
        case WHITE_BEAR:
            bear.frame = [5, 6, 5, 7];
            break;
        case GIRL_BEAR:
            bear.frame = [10, 11, 10, 12];
            break;
        default:
            break;
    }

    return scene;
}

/**
 *  くまの動き
 */
var bearMove = {

    // 自動で動く
    auto: function(bear) {
        bear.x += 10;
        if (bear.x > core.width) bear.x = 0;
    },

    // 十字キーで動く
    manual: function(bear) {
        if (core.input.left) bear.x -= 10;
        if (core.input.right) bear.x += 10;
        if (core.input.up) bear.y -= 10;
        if (core.input.down) bear.y += 10;

        // フレームアウトの処理
        if (bear.x > core.width - bear.width) bear.x = 0;
        if (bear.x < 0) bear.x = core.width - bear.width;
        if (bear.y > core.height - bear.height) bear.y = 0;
        if (bear.y < 0) bear.y = core.height - bear.height;
    }
};
