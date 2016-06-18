enchant();;

/* プレイヤの初期位置 */
var locationX = 6;
var locationY = 10;

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
            [0, 4,  4,  4,  4,  4,  4,  4,  4,  0,  0,  0,  0,  0, 19,  0,  0,  0,  0,  0],
            [0, 4, 25,  5,  5,  5,  5,  5,  4,  0,  0, 18, 18,  0,  0,  0,  0,  0,  0,  0],
            [0, 4,  5,  5,  5,  5,  5,  5,  4,  0,  0, 18, 18,  0,  0,  0,  0,  0,  0,  0],
            [0, 4,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0,  0,  0,  0,  0, 19,  0,  0],
            [0, 4, 15, 15, 15, 15, 15, 15,  4,  0,  0,  0,  0,  0,  0, 18, 18,  0,  0,  0],
            [0, 4,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0,  0,  0, 18, 18,  0,  0,  0],
            [0, 4,  5,  5,  5,  5,  5,  5,  4,  0,  0,  0,  0, 19,  0,  0,  0,  0,  0,  0],
            [0, 4,  5,  5,  4,  4,  4,  4,  4,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
            [0, 0,  2,  2,  0,  0,  0,  0,  0,  0,  0,  4,  4,  4,  4,  4,  4,  4,  4,  0],
            [0, 0,  2,  2,  0,  0,  0,  0,  0,  0,  0,  4,  5,  5,  5,  5,  5, 14,  4,  0],
            [0, 0,  2,  2,  0,  0,  0,  0,  0,  0,  0,  4,  5,  5,  5,  5,  5,  5,  4,  0],
            [0, 0,  2,  2,  0,  0,  0,  0,  0,  0,  0,  4,  5,  5,  5,  5,  5,  5,  4,  0],
            [0, 0,  2,  2,  0,  0,  0,  0,  0,  0, 26,  4, 15, 15,  4,  4,  4,  4,  4,  0],
            [0, 0,  2,  2,  0,  0,  0,  0,  0,  0, 26,  4,  5,  5,  4,  0,  0,  0,  0,  0],
            [0, 0,  2,  2,  0,  0, 18, 18,  0,  0, 26,  4,  5,  5,  4,  0,  0,  0,  0,  0],
            [0, 0,  2,  2,  0,  0, 18, 18,  0,  0,  0,  4,  5,  5,  4,  0,  0,  0,  0,  0],
            [0,19,  2,  2,  0,  0,  0,  0,  0,  0,  0, 24,  2,  2,  0,  0,  0, 18, 18,  0],
            [0, 0,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  0,  0,  0, 18, 18,  0],
            [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
        ]
    );
    map.collisionData = [
        [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0, 1,  1,  1,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0],
        [0, 1,  1,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0, 1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0, 1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0],
        [0, 1, 10, 10, 10, 10, 10, 10,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0, 1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0, 1,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0],
        [0, 1,  0,  0,  1,  1,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  0],
        [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0],
        [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0],
        [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,  0],
        [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1, 10, 10,  1,  1,  1,  1,  1,  0],
        [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  0,  0,  1,  0,  0,  0,  0,  0],
        [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  0,  0,  1,  0,  0,  0,  0,  0],
        [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  1,  0,  0,  0,  0,  0],
        [0, 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0],
        [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
    ];

    var time = 30;
    var timer = new Label('Timer：30');
    timer.x = 0;
    timer.y = 0;

    /* プレイヤー */
    var player = new Sprite(32, 32);
    player.x = (locationX - 1) * 16 - 8
    player.y = (locationY - 1) * 16 - 16;
    var image = new Surface(96, 128);
    image.draw(core.assets['chara0.png'], 0, 0, 96, 128, 0, 0, 96, 128);
    player.image = image;
    player.isMoving = false;
    player.direction = 0;
    player.walk = 1;

    /* プレイヤー動作 */
    player.addEventListener('enterframe', function() {
        this.frame = this.direction * 3 + this.walk;
        if (this.isMoving) {
            this.moveBy(this.vx, this.vy);

            if (!(scene.frame % 3)) {
                this.walk++;
                this.walk %= 3;
            }
            if ((this.vx && (this.x - 8) % 16 == 0) || (this.vy && this.y % 16 == 0)) {
                this.isMoving = false;
                this.walk = 1;
            }
        } else {
            this.vx = this.vy = 0;
            if (core.input.left) {
                this.direction = 1;
                this.vx = -4;
            } else if (core.input.right) {
                this.direction = 2;
                this.vx = 4;
            } else if (core.input.up) {
                this.direction = 3;
                this.vy = -4;
            } else if (core.input.down) {
                this.direction = 0;
                this.vy = 4;
            }
            if (this.vx || this.vy) {
                var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 16;
                var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 16;

                if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
                    this.isMoving = true;
                    arguments.callee.call(this);
                }

                /* 下り階段にたどり着いたらクリア */
                if (map.checkTile(x, y) == 14) {
                   core.replaceScene(createGameclearScene());
                }
            }
        }
    });

    /* シーン更新イベントリスナを登録 */
    scene.onenterframe = function() {
        /* 初期位置の判定 */
        if (core.frame == 0 && map.hitTest(player.x + 8, player.y + 16)) {
            alert("動けないよ(´Д｀。)");
            core.replaceScene(createGameoverScene());
        }

        /* タイマ計算 */
        time = 30 - Math.floor(core.frame / core.fps);
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
        locationX = getIntValue("location-x", 1, 20);
        locationY = getIntValue("location-y", 1, 20);
        core.replaceScene(createStartScene());
    } catch(e) {
        alert("うまく動かなかった。\r\nやり直してね。");
    }
}
