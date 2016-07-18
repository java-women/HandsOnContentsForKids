$(function() {

    // 初期表示のときにはEditorを表示させない
    $('#modal-content, #modal-overlay').hide();

    //「Editorを開く」ボタンが押されたとき
    $('#modal-open').click(function() {
        var jsText = window.sessionStorage.getItem(['javascript']);

        if (jsText == '') {
            jsText = 'var bear = new Sprite(32, 32);\n'
                     + '\n'
                     + '// 使いたい画像の名前を指定\n'
                     + "bear.image = core.assets['chara1.png'];\n"
                     + '\n'
                     + '// キャラクターのさいしょの位置を指定\n'
                     + 'bear.x = 0;\n'
                     + 'bear.y = 0;\n'
                     + '\n'
                     + '// キャラクターを動かす命令\n'
                     + "bear.on('enterframe', function() {\n"
                     + '\n'
                     + '    // キャラクターが歩く命令\n'
                     + '    bear.x = bear.x + 10;\n'
                     + '    if (bear.x > core.width) {\n'
                     + '        bear.x = 0;\n'
                     + '    }\n'
                     + '});\n'
                     + '\n'
                     + '// キャラクターの動き方を指定\n'
                     + 'bear.frame = [0, 1, 0, 2];\n'
                     + '\n'
                     + '// キャラクターを画面についか\n'
                     + 'scene.addChild(bear);';
        }

        $('#text-editor').val(jsText);
        $('#modal-overlay, #modal-content').fadeIn();
    });

    //「閉じる」ボタンが押されたとき
    $('#modal-close').click(function() {
        $('#modal-content, #modal-overlay').fadeOut();
    });

    //「実行」ボタンが押されたとき
    $('#run').click(function() {
        core.replaceScene(createStartScene());
        $('#modal-content, #modal-overlay').fadeOut();
    });
});
