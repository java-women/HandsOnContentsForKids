enchant();;

var score;
const MAX_TIME = 15;
var bear ;
var scene ;

window.onload = function() {

    core = new Core(320, 320);
    core.scale = SCALE;
    core.fps = 15;
    core.preload('chara1.png');
    core.preload("start.png", "gameover.png", "clear.png");

    core.rootScene.backgroundColor = '#3CB371';

    // ゲーム本体の描画
    core.onload = function() {

        core.replaceScene(createStartScene());
    };

    core.start();
};

//タイトルシーンカスタマイズ
function createStartScene(){

    var scene = new Scene();
    scene.backgroundColor = '#3cb371';
    var startImage = new Sprite(236, 48);
    startImage.image = core.assets['start.png'];
    startImage.x = 42;
    startImage.y = 136;
    scene.addChild(startImage);

    var subTitle = new Label('【あそびかた】');
    subTitle.textAlign = 'center';
    subTitle.y = 190;
    subTitle.font = '14px sans-serif';
    scene.addChild(subTitle);

    var line1 = new Label('マウスをつかってりんごをあつめよう！');
    line1.textAlign = 'center';
    line1.y = 210;
    line1.font = '14px sans-serif';
    scene.addChild(line1);

    startImage.addEventListener(Event.TOUCH_START, function(e) {
        core.replaceScene(createGameScene());
    });

    return scene;
}

/**
 * ゲームシーン
 */
function createGameScene() {
    // 初期値設定
    score = 0;
    document.getElementById('location-x').value=1;
    document.getElementById('location-y').value=1;


    /* キャラクター初期表示 */
    scene = new Scene();

    scene.addChild(drawGrid());

    bear = new Sprite(32, 32);
    bear.image = core.assets['chara1.png'];

    scene.addChild(bear);

    // りんご生成
    for (i = 0; i < 10; i++) {
        scene.addChild(new Fruits(15,bear));
    }

    // シーンにタッチ移動時イベントを登録
    var isTouch = false;
    var targetX = 0;
    var targetY = 0;

    // タッチ開始
    scene.addEventListener("touchstart", function(e) {
        isTouch = true;
    	// タッチした位置に移動
    	targetX = e.x - (bear.width/2);	// スプライト幅の半分の値を引くことで中央にする
    	targetY = e.y - (bear.height/2);	// スプライト高さの半分の値を引くことで中央にする
    });
    	// タッチ終了
    scene.addEventListener("touchend", function(e) { isTouch = false; });

    // タッチ移動
    scene.addEventListener("touchmove", function(e) {
        // タッチした位置に移動
    	targetX = e.x - (bear.width/2);	// スプライト幅の半分の値を引くことで中央にする
    	targetY = e.y - (bear.height/2);	// スプライト高さの半分の値を引くことで中央にする
    });

    scene.addEventListener("enterframe", function(e) {
        // タッチ中のみスプライトを動かす
    	if (isTouch) {
    	// 徐々にタッチした位置に近づける
    	var moveX = (targetX - bear.x)*0.25;
    	var moveY = (targetY - bear.y)*0.25;
    	//タッチした座標表示(小数点は四捨五入)
    	document.getElementById('location-x').value=Math.round((bear.x+8)/16+1);
        document.getElementById('location-y').value=Math.round((bear.y+16)/16+1);
        //移動
    	bear.moveBy(moveX, moveY);

    	}
    });

    // スコアとタイマー
    scene.addChild(new Score());
    scene.addChild(new Timer());

    return scene;
}

//フルーツクラス
Fruits = Class.create(Sprite,
{
    initialize: function(frame,bear) {
        Sprite.call(this, 16, 16);
        this.image = core.assets['icon0.png'];

        // ランダムな場所にフルーツを表示する
        this.x = Math.round(Math.random() * 19) * 16;
        this.y = Math.round(Math.random() * 19) * 16;
        this.frame = frame;

    },

    onenterframe: function(){

        if (this.within(bear)) {
            // 自分自身(フルーツ)を画面から消す
            scene.removeChild(this);
            score++;
        }
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

        this.moveTo(5, 300);
        this.color = 'white';
        this.font = "15px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
        this.text =  score + ' ポイント';
    },

    // カウント
    scoreCount: function() {
        this.text =  score + ' ポイント';

        // ゲームクリア
        if (score == 10) {
            core.replaceScene(createGameclearScene());
        }
    },

    // 更新処理
    onenterframe: function(){
        this.scoreCount();
    }
});


