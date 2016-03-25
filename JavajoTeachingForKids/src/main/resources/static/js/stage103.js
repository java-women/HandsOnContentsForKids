enchant();

var core;
var charaNumber;

const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 320;
const CHARA_IMG = 'debug.png';
const MAP_IMG = 'map1.png';
const MAP_SIZE = 20;
const MAX_TIME = 5;
const MAX_CHARA = 5;

/**
 * enchant.jsの描画
 */
window.onload = function() {

    // 初期設定
    core = new Core(320, 320);
    core.preload(MAP_IMG, CHARA_IMG);
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
var createGameScene = function() {
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
        var map = new Map(16, 16);
        map.image = core.assets[MAP_IMG];

        var baseMap = [];
        for (var i = 0; i < MAP_SIZE; i++) {
            baseMap[i] = [];
            for (var n = 0; n < MAP_SIZE; n++) {
                baseMap[i][n] = 100;
            }
        }
        map.loadData(baseMap);
        scene.addChild(map);
    },

    // キャラクター
    character: function(scene) {
        // forの数だけ表示
        for (var m = 0; m < MAX_CHARA; m++) {
            var chara = new Chara();
            chara.moveTo(Math.random() * (SCREEN_WIDTH - chara.width), Math.random() * (SCREEN_HEIGHT - chara.height));
            scene.addChild(chara);
        }
    },

    // タイマー
    timer: function(scene) {
        var timer = new Timer();
        scene.addChild(timer);
    },

    // スコア
    score: function(scene) {
        var score = new Score();
        scene.addChild(score);
    }
};

/**
 * キャラクタークラス
 */
var Chara = Class.create(Sprite, {

    // 初期化
    initialize: function() {
        Sprite.call(this, 24, 24);
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

    // カウントダウンしていって、0秒になったらゲームオーバー
    countdown: function() {
        var time = MAX_TIME - Math.floor(core.frame/core.fps);
        this.text = 'Timer:' + time;

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

        charaNumber = MAX_CHARA;
        this.moveTo(5, SCREEN_HEIGHT - 20);
        this.color = 'white';
        this.font = "15px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
        this.text = 'あと ' + charaNumber + ' 匹！';
    },

    // カウント
    charaCount: function(val) {
        this.text = 'あと ' + charaNumber + ' 匹！';
    },

    // 更新処理
    onenterframe: function(){
        this.charaCount();
    }
});
