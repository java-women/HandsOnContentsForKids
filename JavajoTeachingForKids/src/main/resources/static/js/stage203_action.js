$(function() {

    // 初期表示のときにはEditorを表示させない
    $('#modal-content, #modal-overlay').hide();

    // 動的にscriptを読み込み
    var script = document.createElement('script');
    script.setAttribute('src', 'js/stage203.js');
    document.getElementsByTagName('head')[0].appendChild(script);

    // stage203.jsをエディタに表示
    $.getScript('js/stage203.js', function(script, status) {
        $('#text-editor').val(script);
    });

    //「Editorを開く」ボタンが押されたとき
    $('#modal-open').click(function() {
        $('#modal-overlay, #modal-content').fadeIn();
    });

    //「閉じる」ボタンが押されたとき
    $('#modal-close').click(function() {
        $('#modal-content, #modal-overlay').fadeOut();
    });

    //「実行」ボタンが押されたとき
    $('#run').click(function() {
        $('script:last-child').remove(); // Editorを開いたときかも

        var jsText = $('#text-editor').val();
        // ここにeditorの内容を実行した処理を書く
//        $('head').append('<script>' + jsText + '</script>');  // こんなのとか？
//        eval(jsText);  // こんなのとか？？

        $('#modal-content, #modal-overlay').fadeOut();
    });
});
