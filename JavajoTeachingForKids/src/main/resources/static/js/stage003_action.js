$(function() {

    // 色の入力値が変わった時
    $('#color-picker').change(function() {
        var color = $(this).val();
        $('#enchant-stage > div').css('background-color', "#" + color);
    });

    // セレクトボックスが変更された時
    $('#select-move, #select-bear').change(function() {
        var selectMove = $('#select-move').val();
        var selectBear = $('#select-bear').val();

        core.replaceScene(createGameScene(selectMove, selectBear));
    });
});
