$(function() {

    // 初期表示のときにはEditorを表示させない
    $('#modal-content, #modal-overlay').hide();

    //「Editorを開く」ボタンが押されたとき
    $('#modal-open').click(function() {
        var jsText = window.sessionStorage.getItem(['javascript']);
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
