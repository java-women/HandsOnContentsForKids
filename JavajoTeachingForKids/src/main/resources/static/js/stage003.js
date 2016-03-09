enchant();

window.onload = function() {
    var core = new Core(320, 320);
    core.preload('chara1.png');
    core.fps = 10;

    var defaultColor = document.getElementsByClassName('color-picker')[0].value;
    core.rootScene.backgroundColor = "#" + defaultColor;

    core.onload = function() {
        var bear = new Sprite(32, 32);
        bear.image = core.assets['chara1.png'];
        bear.x = 0;
        bear.y = 0;

        bear.on('enterframe', function() {
//            bearMove.auto(this, core);
            bearMove.manual(this, core);
        });

        core.rootScene.addChild(bear);
//        bear.frame = 0;
        bear.frame = [0, 1, 0, 2];
//        bear.frame = [5, 6, 5, 7];
//        bear.frame = [10, 11, 10, 12];
    };

    core.start();
};

var bearMove = {
    auto: function(bear, core) {
        bear.x += 10;
        if (bear.x > core.width) bear.x = 0;
    },
    manual: function(bear, core) {
        if (core.input.left) bear.x -= 10;
        if (core.input.right) bear.x += 10;
        if (core.input.up) bear.y -= 10;
        if (core.input.down) bear.y += 10;
    }
};
