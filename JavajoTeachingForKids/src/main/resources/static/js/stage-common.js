const SCALE = 1.9;
const WIDTH = 320;
const HEIGHT = 320;
const GRID = 16;
const FPS = 15;
var core;

/**
 * タイトルシーン
 */
function createStartScene() {
    var scene = new Scene();
    scene.backgroundColor = '#3cb371';
    var startImage = new Sprite(236, 48);
    startImage.image = core.assets['start.png'];
    startImage.x = 42;
    startImage.y = 136;
    scene.addChild(startImage);

    startImage.addEventListener(Event.TOUCH_START, function(e) {
        core.replaceScene(createGameScene());
    });

    return scene;
};

/**
 * ゲームクリアシーン
 */
function createGameclearScene() {
    var scene = new Scene();
    scene.backgroundColor = '#303030';

    var gameclearImage = new Sprite(265, 48);
    gameclearImage.image = core.assets['clear.png'];
    gameclearImage.x = 30;
    gameclearImage.y = 112;
    scene.addChild(gameclearImage);

    var retryButton = new Button("もう一度遊ぶ", "light");
    retryButton.moveTo(110,230);
    scene.addChild(retryButton);
    retryButton.ontouchstart = function(){
        core.replaceScene(createStartScene());
    }

    return scene;
};

/**
 * ゲームオーバーシーン
 */
function createGameoverScene() {
    var scene = new Scene();
    scene.backgroundColor = '#303030';

    var gameoverImage = new Sprite(189, 97);
    gameoverImage.image = core.assets['gameover.png'];
    gameoverImage.x = 65;
    gameoverImage.y = 112;
    scene.addChild(gameoverImage);

    var retryButton = new Button("もう一度遊ぶ", "light");
    retryButton.moveTo(110,230);
    scene.addChild(retryButton);
    retryButton.ontouchstart = function(){
        core.replaceScene(createStartScene());
    }

    return scene;
};

/**
 * int型の値を取得
 */
function getIntValue(id, min, max) {
    var value = document.getElementById(id).value;
    if (!isFinite(value)) {
        throw "Invalid data";
    }
    if (value < min || max < value) {
        throw "Invalid data";
    }
    return parseInt(value);
}

/**
 * 正の数かどうかのcheck
 */
function checkPositiveNumber(id) {
    var value = document.getElementById(id).value;
    if (!isFinite(value)) {
        throw "Invalid data";
    } else if (value < 0) {
        throw "Minus data"
    }
}

/**
 * Toggleボタン切り替え
 */
function toggle_button() {
    if (document.getElementById('editor').getAttribute('class') == 'collapse') {
        document.getElementById('toggle-btn').innerHTML  = '<span class="glyphicon glyphicon-minus" data-toggle="collapse" data-target="#editor"></span> エディタをとじる';
    } else {
        document.getElementById('toggle-btn').innerHTML  = '<span class="glyphicon glyphicon-plus" data-toggle="collapse" data-target="#editor"></span> エディタをひらく';
    }
}

/* マス目の描画 */
function drawGrid() {
    var surface = new Surface(WIDTH, HEIGHT);
    surface.context.strokeStyle = "#808080";
    surface.context.beginPath();
    for(i = 1; i <= WIDTH / GRID; i++){
        surface.context.setLineDash([3]);
        surface.context.moveTo(i * GRID, 0);
        surface.context.lineTo(i * GRID, HEIGHT);
        surface.context.stroke();
        surface.context.moveTo(0, i * GRID);
        surface.context.lineTo(WIDTH, i * GRID);
        surface.context.stroke();
    }
    var grid = new Sprite(WIDTH,HEIGHT);
    grid.image=surface;

    return grid;
}
