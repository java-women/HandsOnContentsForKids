$(function() {

    // 初期表示のときにはEditorを表示させない
    $('#modal-content, #modal-overlay').hide();

    //「Editorを開く」ボタンが押されたとき
    $('#modal-open').click(function() {
        var jsText = window.sessionStorage.getItem(['javascript']);

        if (jsText == '' || jsText = null) {
            jsText = 'var bear = new Sprite(32, 32);\n'
                     + '\n'
                     + '// どの画像のキャラクターを使うか指定\n'
                     + "bear.image = core.assets['chara1.png'];\n"
                     + '\n'
                     + '// キャラクターの初期位置\n'
                     + 'bear.x = 0;\n'
                     + 'bear.y = 0;\n'
                     + '\n'
                     + '// キャラクターのイベント\n'
                     + "bear.on('enterframe', function() {\n"
                     + '\n'
                     + '    // 歩く処理\n'
                     + '    bear.x += 10;\n'
                     + '    if (bear.x > core.width) bear.x = 0;\n'
                     + '});\n'
                     + '\n'
                     + '// 最初に指定した画像から0→1→0→2という順番で表示\n'
                     + 'bear.frame = [0, 1, 0, 2];\n'
                     + '\n'
                     + '// キャラクターを画面に設定\n'
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
