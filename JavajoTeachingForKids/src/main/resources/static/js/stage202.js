enchant();

/* 初期値 */
var END_TIME=130;
var SCROLL_START=64;
var gameStatus=0; //1:GOAL 2:LOST

var inputEnemySpeed=10;

window.onload = function(){
    core = new Core(320, 320);
    core.fps = 15;
    core.preload("chara1.png", "map0.png","chara2.png");
    core.preload("start.png", "gameover.png", "clear.png");
    core.onload = function(){
        core.replaceScene(createStartScene());
    };
    core.start();
};

/**
 * パラメータ編集
 */
function editData(){
    try {
        inputEnemySpeed = getIntValue("enemy-speed", 1);
        core.replaceScene(createStartScene());
    } catch(e) {
        alert("うまく動かなかった。\r\nやり直してね。");
    }
}

function createGameScene(){
    //初期化処理
    gameStatus=0;
    //マップを設定
    var scene = new Scene();
    var map = new Map(16, 16);
    map.image = core.assets["map0.png"];
    map.loadData(
        [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    );
    scene.addChild(map);

    //操作キャラクターを設定
    var bear = new Sprite(32, 32);
    bear.image = core.assets["chara1.png"];
    bear.x = 0;
    bear.y = 100;
    bear.frame = 0;
    scene.addChild(bear);

    bear.addEventListener("enterframe", function(){
        //くまの画像変更
        this.frame = this.age % 2 + 6;

        //ゲームステータスにより画面切り替え
        if(gameStatus==1){
            core.replaceScene(createGameclearScene());
        } else if(gameStatus==2){
            core.replaceScene(createGameoverScene());
        }
        //操作キャラクターの進むスピードを指定
        if(gameStatus==0){
            this.x+=4;
        }

        //↑キー押下で上移動
        if(core.input.up){
            this.y -= 32;
            if(this.y<20){
                this.y=20;
            }
        }
        //↓キー押下で下移動
        if(core.input.down){
            this.y += 32;
            if(this.y>220){
                this.y=220;
            }
        }
    });

    //敵キャラクター1を設定
    var pig1 = new Sprite(32, 32);
    pig1.image = core.assets["chara2.png"];
    pig1.x = 100;
    pig1.y = 100;
    pig1.frame = 0;
    scene.addChild(pig1);
    if(gameStatus==0){
        pig1.addEventListener("enterframe", function(){
            //フレーム
            this.frame = this.age % 2 + 6;
            //動きを設定
            if(this.age%24<12 ){
                this.y += inputEnemySpeed;
            } else {
                this.y -= inputEnemySpeed;
            }
            //当たり判定
            for (var i=1;i<2;i++){
                if(this.intersect(bear)){
                    gameStatus=2
                }
            }
        });
    }

    //MAPの動きを設定
    map.addEventListener("enterframe", function(){
        //ゴール判定
        if(gameStatus==0){
            if(this.age>=END_TIME){
                gameStatus=1;
            } else if(bear.x>SCROLL_START){
                //スクロール
                bear.x-=4;
                map.x-=3;
                pig1.x-=3;
            }
        }
    });
    return scene;
};

