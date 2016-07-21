enchant();

var core;
const CHARA_IMG = 'chara1.png';
const NOT_MOVE = 'notMove';
const AUTO = 'auto';
const MANUAL = 'manual';
const BEAR = 'bear';
const WHITE_BEAR = 'whiteBear';
const GIRL_BEAR = 'girlBear';
const DEFAULT_COORDINATE = 0;
const NO_ACTION = 'noAction';
const JUMP = 'jump';


/**
 * enchant.jsの描画
 */
window.onload = function() {

    // 初期設定
    init.core();

    // ゲーム本体の描画
    core.onload = function() {
        init.scene();
    };

    core.start();
}

/**
 * 初期設定
 */
var init = {

    core: function() {
        core = new Core(320, 320);
        core.scale = SCALE;
        core.preload(CHARA_IMG);
        core.fps = 8;

        const defaultColor = document.getElementById('color-picker').value;
        core.rootScene.backgroundColor = "#" + defaultColor;
    },

    scene: function() {
        core.replaceScene(createGameScene(NOT_MOVE, BEAR, DEFAULT_COORDINATE, DEFAULT_COORDINATE, NO_ACTION));
    }
};

/**
 * ゲーム画面
 */
var createGameScene = function(selectMove, selectBear, xCoordinate, yCoordinate, spaceKeyAction) {
    var scene = new Scene();
    var bear = new Sprite(32, 32);
    bear.image = core.assets[CHARA_IMG];
    bear.x = xCoordinate * 14;
    bear.y = yCoordinate * 14;

    // キャラクターのイベント
    bear.on('enterframe', function() {

        // 画面からのキャラクターの動き変更
        switch(selectMove) {
            case NOT_MOVE:
                break;
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

    scene.addChild(bear);

    // スペースボタン押下時のイベント
    core.keybind(' '.charCodeAt(0), 'space');
    core.on('spacebuttondown', function() {

        switch(spaceKeyAction) {
            case NO_ACTION:
                break;
            case JUMP:
                bear.tl
                    .moveBy(0, -30, 2.5, enchant.Easing.CUBIC_EASEOUT)
                    .moveBy(0, 30, 2.5, enchant.Easing.CUBIC_EASEIN);
                break;
            default:
                break;
        }
    });

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
