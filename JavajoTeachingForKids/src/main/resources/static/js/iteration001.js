enchant();

var core;
var charaNumber;

const MIN_CHARA = 0;
var maxChara = 15;
const MAX_ID = 'end-i';

const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 320;
const MAP_WIDTH = 16;
const MAP_HEIGHT = 16;
const CHARA_WIDTH = 24;
const CHARA_HEIGHT = 24;
const CHARA_IMG = 'findbugs.png';
const MAP_IMG = 'map1.png';
const MAX_TIME = 10;

/**
 * enchant.jsの描画
 */
window.onload = function() {

    // 初期設定
    core = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);
    core.scale = SCALE;
    core.preload(MAP_IMG, CHARA_IMG);
    core.preload('start.png', 'gameover.png', 'clear.png');
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

    // 背景の表示
    show.background(scene);

    // キャラクターの表示
    show.character(scene);

    // タイマーの表示
    show.timer(scene);

    // スコアの表示
    show.score(scene);

    return scene;
}

/**
 * 表示
 */
var show = {

    // 背景
    background: function(scene) {
        var map = new Map(MAP_WIDTH, MAP_HEIGHT);
        map.image = core.assets[MAP_IMG];

        var baseMap = [];
        for (var i = 0; i < SCREEN_HEIGHT / MAP_HEIGHT; i++) {
            baseMap[i] = [];
            for (var n = 0; n < SCREEN_WIDTH / MAP_HEIGHT; n++) {
                baseMap[i][n] = 100;
            }
        }
        map.loadData(baseMap);
        scene.addChild(map);
    },

    // キャラクター
    character: function(scene) {
        // forの数だけ表示
        for (var m = MIN_CHARA; m < parseInt(maxChara); m++) {
            var chara = new Chara();
            chara.moveTo(Math.random() * (SCREEN_WIDTH - chara.width), Math.random() * (SCREEN_HEIGHT - chara.height));
            scene.addChild(chara);
        }
    },

    // タイマー
    timer: function(scene) {
        scene.addChild(new Timer());
    },

    // スコア
    score: function(scene) {
        scene.addChild(new Score());
    }
};

/**
 * Editボタン押した時
 */
function editData() {
    try {
        checkPositiveNumber(MAX_ID);
        getIntValue(MAX_ID, 0, 1000);
        maxChara = document.getElementById(MAX_ID).value;
        core.replaceScene(createStartScene());

    } catch(e) {
        alert("うまく動かなかった。\r\nやり直してね。");
    }
}

/**
 * キャラクタークラス
 */
var Chara = Class.create(Sprite, {

    // 初期化
    initialize: function() {
        Sprite.call(this, CHARA_WIDTH, CHARA_HEIGHT);
        this.image = core.assets[CHARA_IMG];

        // キャラクターの向きを設定
    	var angle = Math.random() * 360;
    	this.rotation = angle;

        this.vx = 4;
        this.vy = 4;

        this.update = this.move;
    },

    // 移動
    move: function() {
    	//向いている方向に移動
    	var radian = (this.rotation - 90) * Math.PI / 180;
        this.x += Math.cos(radian) * this.vx;
        this.y += Math.sin(radian) * this.vy;
    },

    // 方向転換
    changeDirection: function() {

        //画面からはみ出ないようにする
        var left = 0;
        var right = SCREEN_WIDTH - this.width;
        var top = 0;
        var bottom = SCREEN_HEIGHT - this.height;

        if (this.x < left){
            this.rotation = this.rotation * (-1);
            this.x = left;
        } else if (this.x > right) {
            this.rotation = this.rotation * (-1);
            this.x = right;
        }

        if (this.y < top) {
            this.rotation = (this.rotation + 180) * (-1);
            this.y = top;
        } else if (this.y > bottom) {
            this.rotation = (this.rotation + 180) * (-1);
            this.y = bottom;
        }
    },

    // タッチイベント
    ontouchstart: function(){
        // キャラクターを消す
        this.parentNode.removeChild(this);
        charaNumber--;
    },

    // 更新処理
    onenterframe: function(){
        this.update();
        this.changeDirection();
    }
});

/**
 * タイマークラス
 */
var Timer = Class.create(Label, {

    // 初期化
    initialize: function() {
        Label.call(this);

        core.frame = 0;
        this.moveTo(5, 5);
        this.color = 'white';
        this.font = "15px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
        this.text = 'Timer:';
    },

    // カウントダウン
    countdown: function() {
        var time = MAX_TIME - Math.floor(core.frame/core.fps);
        this.text = 'Timer:' + time;

        // ゲームオーバー
        if (time == 0) {
            core.replaceScene(createGameoverScene());
        }
    },

    // 更新処理
    onenterframe: function(){
        this.countdown();
    }
});

/**
 * スコアクラス
 */
var Score = Class.create(Label, {

    // 初期化
    initialize: function() {
        Label.call(this);

        charaNumber = maxChara - MIN_CHARA;
        this.moveTo(5, SCREEN_HEIGHT - 20);
        this.color = 'white';
        this.font = "15px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
        this.text = 'あと ' + charaNumber + ' 匹！';
    },

    // カウント
    charaCount: function() {
        this.text = 'あと ' + charaNumber + ' 匹！';

        // ゲームクリア
        if (charaNumber == 0) {
            core.replaceScene(createGameclearScene());
        }
    },

    // 更新処理
    onenterframe: function(){
        this.charaCount();
    }
});
