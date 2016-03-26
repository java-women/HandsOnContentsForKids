$(function() {
    // 初期表示のときにはEditorを表示させない
    $('#modal-content, #modal-overlay').hide();

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
        var jsText = $('#text-editor').val();
        eval(jsText);
    });
});
