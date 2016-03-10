enchant();

var i = 1;

function loadStage(selectVal) {
    var core = new Core(320, 320);
    core.preload('chara1.png');
    core.fps = 8;

    var defaultColor = document.getElementsByClassName('color-picker')[0].value;
    core.rootScene.backgroundColor = "#" + defaultColor;

    core.onload = function() {
        var bear = new Sprite(32, 32);
        bear.image = core.assets['chara1.png'];
        bear.x = 0;
        bear.y = 0;

        bear.on('enterframe', function() {
            if (selectVal === 'auto') {
                bearMove.auto(this, core);
            } else if (selectVal === 'manual') {
                bearMove.manual(this, core);
            }
        });

        core.rootScene.addChild(bear);

//        bear.frame = 0;
        bear.frame = [0, 1, 0, 2];
//        bear.frame = [5, 6, 5, 7];
//        bear.frame = [10, 11, 10, 12];
    };

    core.start();
    i++;
}

var bearMove = {
    auto: function(bear, core) {
        bear.x += 10/i;
        if (bear.x > core.width) bear.x = 0;
    },
    manual: function(bear, core) {
        if (core.input.left) bear.x -= 10/i;
        if (core.input.right) bear.x += 10/i;
        if (core.input.up) bear.y -= 10/i;
        if (core.input.down) bear.y += 10/i;
    }
};
