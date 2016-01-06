enchant();

window.onload = function(){

    var core = new Core(320, 320);
    core.preload("avatarBg1.png", "avatarBg2.png", "avatarBg3.png", "monster/bigmonster1.gif");
    core.fps = 15;
    core.rootScene.backgroundColor = "gray";

    core.onload = function(){
        /* 背景:砂漠 */
        var bg = new AvatarBG(0);
        core.rootScene.addChild(bg);

        /*
         * キー割り当て
         *
         * [space]キー：b
          */
        core.keybind(' '.charCodeAt(0), 'b');

        /*
         * アバター
         *
         * 以下のアバターエディタで性別・武器・服などを組み合わせて生成されたコードをAvatarのコンストラクタに設定する.
         * http://9leap.net/games/1383/
         * Chromeだと動かなかった.
         */
        var avatar = new Avatar("2:6:1:2009:21013:22480");
        avatar.moveTo(30, 100);
        avatar.action = "run";
        avatar.life = 10;
        core.rootScene.addChild(avatar);

        /* エネミー */
        var enemy = new AvatarMonster(core.assets["monster/bigmonster1.gif"]);
        enemy.moveTo(210, 80);
        enemy.action = "walk";
        enemy.life = 10000;
        core.rootScene.addChild(enemy);

        /* アバター動作 */
        avatar.addEventListener('enterframe', function() {
            /* 左右のみ移動可 */
            if (core.input.left) this.x -= 5;
            if (core.input.right) this.x += 5;

            if (this.x <= 0) this.x = 0;
            if (this.x > 260) this.x = 260;

            /** 攻撃 */
            if (core.input.b) {
                avatar.action = "attack";
                if (this.intersect(enemy) && enemy.life > 0) {
                    enemy.life -= 1;
                }
            }

            if (avatar.life <= 0) avatar.action = "dead";

            avatarLifeBar.width = avatar.life * 20;

            if (avatar.life == 0) {
                core.end();}
        });

        /* エネミー動作 */
        enemy.addEventListener('enterframe', function() {
            /** 攻撃 */
            if (core.frame % 100 == 0) {
                enemy.action = "attack";
                if (this.intersect(avatar) && avatar.life > 0) {
                    avatar.action = "damage";
                     avatar.life -= 2;
                }
            }

            if (enemy.life <= 0) enemy.action = "dead";

            enemyLifeBar.width = enemy.life * 0.02;
        });

        /* 操作説明 */
        var label = new Label();
        label.x = 10;
        label.y = 220;
        label.text = '移動： ←→<br>攻撃：スペース';
        core.rootScene.addChild(label);

        /* アバターライフゲージ */
        var avatarLife = new Label();
        avatarLife.x = 10;
        avatarLife.y = 180;
        avatarLife.text = 'Your Life';
        core.rootScene.addChild(avatarLife);

        var avatarLifeBar = new Entity();
        avatarLifeBar.width = 200;
        avatarLifeBar.height = 10;
        avatarLifeBar.backgroundColor = '#00ff00';
        avatarLifeBar.x = 80;
        avatarLifeBar.y = 180;
        core.rootScene.addChild(avatarLifeBar);

        /* エネミーライフゲージ */
        var enemyLife = new Label();
        enemyLife.x = 10;
        enemyLife.y = 200;
        enemyLife.text = 'Enemy Life';
        core.rootScene.addChild(enemyLife);

        var enemyLifeBar = new Entity();
        enemyLifeBar.width = 200;
        enemyLifeBar.height = 10;
        enemyLifeBar.backgroundColor = '#ff0000';
        enemyLifeBar.x = 80;
        enemyLifeBar.y = 200;
        core.rootScene.addChild(enemyLifeBar);
    };

    core.start();
};
