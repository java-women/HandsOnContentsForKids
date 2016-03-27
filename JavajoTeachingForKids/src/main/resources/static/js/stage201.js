enchant();

/* 初期値 */
const WIDTH = 320;
const HEIGHT = 320;
const GRID = 16;

// 初期マップ作成
var mapData = new Array();
for (var i = 0; i < (HEIGHT / GRID); i++){
    mapData[i] = new Array();
    for(var j = 0; j < (WIDTH / GRID); j++) {
        mapData[i][j] = -1;
    }
}

/* マス目の描画 */
function drawGrid() {
    var surface = new Surface(WIDTH, HEIGHT);
    surface.context.strokeStyle = "#808080";
    surface.context.beginPath();
    for(i = 1; i <= WIDTH / GRID; i++){
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

window.onload = function() {

    core = new Core(320, 320);
    core.scale = 1.5;
    core.fps = 15;
    core.preload("chara0.png", "map0.png");
    core.preload("start.png", "gameover.png", "clear.png");

    core.onload = function() {
        core.replaceScene(createGameScene());
    };

    core.start();
};

/**
 * ゲームシーン
 */
function createGameScene() {
    var scene = new Scene();

    /* フレームリセット */
    core.frame = 0;

    var map = new Map(16, 16);
    map.image = core.assets["map0.png"];
    map.loadData(mapData);

    // タッチイベント定義
    scene.addEventListener("touchend", function(e) {
        // 選んだマップ
        id = document.getElementById("mapSelected").children[0].getAttribute("data-id");
        if (id == null) {
            alert("マップを選んでね");
        } else {
            mapData[Math.floor(e.y / 16)][Math.floor(e.x / 16)] = id;
            core.replaceScene(createGameScene());
        }
    });

    var stage = new Group();
    stage.addChild(map);
    // エディタで枠線の表示にチェックされていた場合のみ表示
    if(document.getElementById("gridCheckBox").checked) {
        stage.addChild(drawGrid());
    }
    scene.addChild(stage);

    return scene;
}
