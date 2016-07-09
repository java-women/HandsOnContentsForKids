enchant();;

window.onload = function() {

    core = new Core(320, 320);
    core.scale = SCALE;
    core.fps = 15;
    core.preload('chara1.png');
    core.preload("start.png", "gameover.png", "clear.png");

    core.rootScene.backgroundColor = '#3CB371';

    // ゲーム本体の描画
    core.onload = function() {
        document.getElementById('location-x').value=0;
        document.getElementById('location-y').value=0;
        core.replaceScene(createGameScene());
    };

    core.start();
};

/**
 * ゲームシーン
 */
function createGameScene() {


    /* キャラクター初期表示 */
    var scene = new Scene();
    var bear = new Sprite(32, 32);
    bear.image = core.assets['chara1.png'];

    scene.addChild(bear);

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

    	//タッチした座標表示(小数点は四捨五入)
        document.getElementById('location-x').value=Math.round(targetX);
        document.getElementById('location-y').value=Math.round(targetY);
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
    	bear.moveBy(moveX, moveY);
    	}
    });

    return scene;
}
