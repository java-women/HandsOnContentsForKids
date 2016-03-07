enchant();

window.onload = function(){
    var game = new Core(320, 320);
    game.fps = 15;
    game.preload("chara1.png", "map0.png","chara2.png");
    game.onload = function(){
        //設定値
        var END_TIME=400;
        var GAME_STATUS=0; //1:GOAL 2:LOST
        //マップを設定
        var map = new Map(16, 16);
        map.image = game.assets["map0.png"];
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
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
        );
        game.rootScene.addChild(map);

        //操作キャラクターを設定
        var bear = new Sprite(32, 32);
        bear.image = game.assets["chara1.png"];
        bear.x = 0;
        bear.y = 100;
        bear.frame = 0;
        game.rootScene.addChild(bear);

        bear.addEventListener("enterframe", function(){
            //操作キャラクターの進むスピードを指定
            if(GAME_STATUS==0){
                bear.x+=1;
            }

            //↑キー押下で上移動
            if(game.input.up){
                this.y -= 32;
            }
            //↓キー押下で下移動
            if(game.input.down){
                this.y += 32;
            }
            //フレーム
            if(GAME_STATUS==1){
                this.frame = 5;
            } else if(GAME_STATUS==2){
                this.frame = 8;
            } else {
                this.frame = this.age % 2 + 6;
            }
        });

        //敵キャラクター1を設定
        var pig1 = new Sprite(32, 32);
        pig1.image = game.assets["chara2.png"];
        pig1.x = 150;
        pig1.y = 100;
        pig1.frame = 0;
        game.rootScene.addChild(pig1);
        if(GAME_STATUS==0){
            pig1.addEventListener("enterframe", function(){
                //フレーム
                this.frame = this.age % 2 + 6;
                //動きを設定
                if(this.age%24<12 ){
                    this.y += 2;
                } else {
                    this.y -= 2;
                }
                //当たり判定
                for (var i=1;i<2;i++){
                    if(pig1.intersect(bear)){
                        GAME_STATUS=2
                    }
                }
            });
        }

        //敵キャラクター2を設定
        var pig2 = new Sprite(32, 32);
        pig2.image = game.assets["chara2.png"];
        pig2.x = 300;
        pig2.y = 80;
        pig2.frame = 0;
        game.rootScene.addChild(pig2);
        if(GAME_STATUS==0){
            pig2.addEventListener("enterframe", function(){
                //フレーム
                this.frame = this.age % 2 + 6;
                //動きを設定
                if(this.age%12<6 ){
                    this.y += 4;
                } else {
                    this.y -= 4;
                }
                //当たり判定
                for (var i=1;i<2;i++){
                    if(pig2.intersect(bear)){
                        GAME_STATUS=2
                    }
                }
            });
        }

        //MAPの動きを設定
        map.addEventListener("enterframe", function(){
            //ゴール判定
            if(GAME_STATUS==0){
                if(this.age==END_TIME){
                    GAME_STATUS=1;
                    bear.x-=1;
                } else if(bear.x>64){
                    //スクロール
                    bear.x-=1;
                    map.x-=1;
                    pig1.x-=1;
                }
            }
        });
    };
  game.start();
};