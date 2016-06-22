enchant();;

/* 進行方向 */
var DOWN=0;
var UP=1;
var RIGHT=2;
var LEFT=3;

/* 曲がる方向初期設定 */
var inputRotateDir=RIGHT;

window.onload = function() {

    core = new Core(320, 320);
    core.scale = SCALE;
    core.fps = 15;
    core.preload('chara0.png', 'map0.png');
    core.preload("start.png", "gameover.png", "clear.png");

    core.onload = function() {
        core.replaceScene(createStartScene());
    };

    core.start();
};

/**
 * ゲームシーン
 */
function createGameScene() {
    var scene = new Scene();

    /* 背景 */
    scene.backgroundColor = '#3cb371';

    /* フレームリセット */
    core.frame = 0;

    var map = new Map(16, 16);
    map.image = core.assets['map0.png'];
    map.loadData(
        [
            [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  0,  0],
            [0, 0,  3,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  3,  0,  0],
            [0, 0,  3,  14,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  3,  0,  0],
            [0, 0,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  5,  5,  3,  0,  0],
            [0, 0,  3,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  3,  5,  5,  3,  0,  0],
            [0, 0,  3,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  3,  5,  5,  3,  0,  0],
            [0, 0,  3,  5,  5,  3,  3,  3,  3,  3,  3,  5,  5,  5,  3,  5,  5,  3,  0,  0],
            [0, 0,  3,  5,  5,  5,  5,  5,  5,  5,  3,  5,  5,  5,  3,  5,  5,  3,  0,  0],
            [0, 0,  3,  5,  5,  5,  5,  5,  5,  5,  3,  5,  5,  5,  3,  5,  5,  3,  0,  0],
            [0, 0,  3,  5,  5,  3,  5,  5,  5,  5,  3,  5,  5,  5,  3,  5,  5,  3,  0,  0],
            [0, 0,  3,  5,  5,  3,  5,  5,  5,  5,  3,  5,  5,  5,  3,  5,  5,  3,  0,  0],
            [0, 0,  3,  5,  5,  3,  5,  5,  5,  5,  3,  5,  5,  5,  3,  5,  5,  3,  0,  0],
            [0, 0,  3,  5,  5,  4,  4,  4,  5,  5,  4,  4,  4,  4,  4,  5,  5,  3,  0,  0],
            [0, 0,  3,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  3,  0,  0],
            [0, 0,  3,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  3,  0,  0],
            [0, 0,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  4,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
        ]
    );
    map.collisionData = [
            [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0],
            [0, 0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0],
            [0, 0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0],
            [0, 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  1,  0,  0],
            [0, 0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  1,  0,  0],
            [0, 0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  1,  0,  0],
            [0, 0,  1,  0,  0,  1,  1,  1,  1,  1,  1,  0,  0,  0,  1,  0,  0,  1,  0,  0],
            [0, 0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  0,  1,  0,  0],
            [0, 0,  1,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  0,  1,  0,  0],
            [0, 0,  1,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  0,  1,  0,  0],
            [0, 0,  1,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  0,  1,  0,  0],
            [0, 0,  1,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  0,  1,  0,  0],
            [0, 0,  1,  0,  0,  1,  1,  1,  0,  0,  1,  1,  1,  1,  1,  0,  0,  1,  0,  0],
            [0, 0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0],
            [0, 0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0],
            [0, 0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
    ];

    /* タイマー */
    var time = 90;
    var timer = new Label('Timer：90');
    timer.x = 0;
    timer.y = 0;

    /* プレイヤー */
    var player = new Sprite(32, 32);
    /* 初期位置 */
    player.x = 96;
    player.y = 160;
    var image = new Surface(96, 128);
    image.draw(core.assets['chara0.png'], 0, 0, 96, 128, 0, 0, 96, 128);
    player.image = image;
    player.direction = direction;
    var dir_image=0;
    player.walk = 1;
    var direction=DOWN;

    /* プレイヤー移動 */
    var SPEED=1;
    var playerMoveX;
    var playerMoveY;
    var playerWidth;
    var playerHeight;

    /* プレイヤー動作 */
    player.addEventListener('enterframe', function() {
        //プレイヤー移動
        playerMoveX = 0;
        playerMoveY = 0;
        playerWidth=16;
        playerHeight=30;
        if(direction==DOWN){
            playerMoveY += SPEED;
            dir_image=0;
        } else if(direction==UP){
            playerMoveY -= SPEED;
            dir_image=3;
        } else if(direction==RIGHT){
            playerMoveX += SPEED;
            dir_image=2;
        } else if(direction==LEFT){
            playerMoveX -= SPEED;
            dir_image=1;
        }

        //プレイヤー描画
        this.frame = dir_image * 3 + this.walk;
        if (!(scene.frame % 3)) {
            this.walk++;
            this.walk %= 3;
        }

        //プレイヤー方向転換
        if(map.hitTest(this.x+playerWidth+playerMoveX,this.y+playerHeight+playerMoveY)){
            if(inputRotateDir==RIGHT){
                direction = rotateRight(direction);
            } else {
                direction = rotateLeft(direction);
            }
        } else{
            this.moveBy(playerMoveX,playerMoveY);
        }

        /* 出口にたどり着いたらクリア */
        if (map.checkTile(this.x+playerWidth, this.y+playerHeight) == 14) {
           core.replaceScene(createGameclearScene());
        }
    });


    /* シーン更新イベントリスナを登録 */
    scene.onenterframe = function() {
        /* タイマ計算 */
        time = 90 - Math.floor(core.frame / core.fps);
        timer.text = "Timer : " + time;
        if (time <= 0) {
            core.replaceScene(createGameoverScene());
        }
    }

    var stage = new Group();
    stage.addChild(map);
    stage.addChild(player);
    scene.addChild(stage);
    scene.addChild(timer);

    return scene;
}

/**
 * パラメータ編集
 */
function editData(){
    try {
        inputRotateDir = getIntValue("rotate-dir");
        core.replaceScene(createStartScene());
    } catch(e) {
        alert("うまく動かなかった。\r\nやり直してね。");
    }
}

/**
 * 方向転換
 */
function rotateRight(direction){
    switch(direction){
        case DOWN:
            return LEFT;
        case UP:
            return RIGHT;
        case RIGHT:
            return DOWN;
        case LEFT:
            return UP;
    }
}
function rotateLeft(direction){
    switch(direction){
        case DOWN:
            return RIGHT;
        case UP:
            return LEFT;
        case RIGHT:
            return UP;
        case LEFT:
            return DOWN;
    }
}
