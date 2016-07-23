enchant();

var core;
const CHARA_IMG = 'chara1.png';
const MAP_IMG = 'map0.png';

const NOT_MOVE = 'notMove';
const AUTO = 'auto';
const MANUAL = 'manual';
const BEAR = 'bear';
const WHITE_BEAR = 'whiteBear';
const GIRL_BEAR = 'girlBear';
const DEFAULT_COORDINATE = 1;
const NO_ACTION = 'noAction';
const JUMP = 'jump';
const ROTATE = 'rotate';
const DEFAULT_ITERATE = 0;

const ITERATE_ITEM = 18;
const TRANSPARENT_ITEM = 48;


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
        core.preload(CHARA_IMG, MAP_IMG);
        core.fps = 8;

        const defaultColor = document.getElementById('color-picker').value;
        core.rootScene.backgroundColor = "#" + defaultColor;
    },

    scene: function() {
        core.replaceScene(createGameScene(NOT_MOVE, BEAR, DEFAULT_COORDINATE, DEFAULT_COORDINATE, NO_ACTION, DEFAULT_ITERATE));
    }
};

/**
 * ゲーム画面
 */
var createGameScene = function(selectMove, selectBear, xCoordinate, yCoordinate, spaceKeyAction, iterate) {
    if (xCoordinate > 0) {
        xCoordinate--;
    }
    if (yCoordinate > 0) {
        yCoordinate--;
    }

    var scene = new Scene();
    var bear = new Sprite(32, 32);
    bear.image = core.assets[CHARA_IMG];
    bear.x = xCoordinate * 14;
    bear.y = yCoordinate * 14;

    // Mapの設定
    sceneConf.setMap(scene, iterate);

    // くまの設定
    sceneConf.setCharacter(scene, bear, selectMove, selectBear);

    // スペースキーの設定
    sceneConf.setSpaceKey(spaceKeyAction, bear);

    return scene;
}

/**
 * sceneの設定
 */
var sceneConf = {

    // マップの設定
    setMap: function(scene, iterate) {
        var map = new Map(16, 16);
        map.image = core.assets[MAP_IMG];

        var baseMap = [];
        for (var i = 0; i < 20; i++) {
            baseMap[i] = [];

            for (var n = 0; n < 20; n++) {
                baseMap[i][n] = TRANSPARENT_ITEM;
            }
        }

        // 適当にばらまく
        for (var item = 0; item < iterate; item++) {
            // Maximum call stack size exceededになってしまうので300を境に処理を変える
            if (item <= 300) {
                mapItem.setRandom(baseMap);
            } else {
                mapItem.setSearch(baseMap, item - 300);
            }
        }

        map.loadData(baseMap);
        scene.addChild(map);
    },

    // キャラクターの設定
    setCharacter: function(scene, bear, selectMove, selectBear) {

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
    },

    // スペースキーの設定
    setSpaceKey: function(spaceKeyAction, bear) {
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
                case ROTATE:
                    bear.tl.rotateBy(360, 3);
                    break;
                default:
                    break;
            }
        });
    }
};

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
        if (bear.y > core.height - bear.height + 20) bear.y = 0;
        if (bear.y < -20) bear.y = core.height - bear.height;
    }
};

/**
 * 花を置く
 */
var mapItem = {

    // 指定された場所に値があったら違う場所に置く（300以下）
    setRandom: function(baseMap) {
        var randomI = Math.floor(Math.random() * 19);
        var randomN = Math.floor(Math.random() * 19);

        if (baseMap[randomI][randomN] != ITERATE_ITEM) {
            baseMap[randomI][randomN] = ITERATE_ITEM;
        } else {
            this.setRandom(baseMap);
        }
    },

    // ITERATE_ITEMじゃないところを探して置く（300以上）
    setSearch: function(baseMap, val) {
        for (var i = 0; i < 20; i++) {
            for (var n = 0; n < 20; n++) {
                if (baseMap[i][n] != ITERATE_ITEM && val != 0) {
                    baseMap[i][n] = ITERATE_ITEM;
                    val--;
                }
            }
        }
    }
};
