enchant();

// chengeイベント呼び出すごとに値が増えてしまう…
// （故に微調整でつかう）
var i = 1;

/**
 * enchant.jsの描画
 */
function loadStage(selectMove, selectBear) {

    // 初期設定
    var core = new Core(320, 320);
    core.preload('chara1.png');
    core.fps = 8;

    var defaultColor = document.getElementsByClassName('color-picker')[0].value;
    core.rootScene.backgroundColor = "#" + defaultColor;

    // ゲーム本体の描画
    core.onload = function() {
        var bear = new Sprite(32, 32);
        bear.image = core.assets['chara1.png'];
        bear.x = 0;
        bear.y = 0;

        // キャラクターのイベント
        bear.on('enterframe', function() {

            // 画面からのキャラクターの動き変更
            switch(selectMove) {
                case 'auto':
                    bearMove.auto(this, core);
                    break;
                case 'manual':
                    bearMove.manual(this, core);
                    break;
                default:
                    break;
            }
        });

        core.rootScene.addChild(bear);

        // 画面からのキャラクター変更
        switch(selectBear) {
            case 'notWalk':
                bear.frame = [0];
                break;
            case 'bear':
                bear.frame = [0, 1, 0, 2];
                break;
            case 'whiteBear':
                bear.frame = [5, 6, 5, 7];
                break;
            case 'girlBear':
                bear.frame = [10, 11, 10, 12];
                break;
            default:
                break;
        }
    };

    core.start();
    i++;
}

/**
 *  くまの動き
 */
var bearMove = {

    // 自動で動く
    auto: function(bear, core) {
        bear.x += 10/i;
        if (bear.x > core.width) bear.x = 0;
    },

    // 十字キーで動く
    manual: function(bear, core) {
        if (core.input.left) bear.x -= 10/i;
        if (core.input.right) bear.x += 10/i;
        if (core.input.up) bear.y -= 10/i;
        if (core.input.down) bear.y += 10/i;
    }
};
