$(function() {

    // 画面ロード時
    $(window).load(function() {
        loadStage('notMove', 'notWalk');
    });

    // 色の入力値が変わった時
    $('#color-picker').change(function() {
        var color = $(this).val();
        $('#enchant-stage > div').css('background-color', "#" + color);
    });

    // セレクトボックスが変更された時
    $('#select-move, #select-bear').change(function() {
        var selectMove = $('#select-move').val();
        var selectBear = $('#select-bear').val();

        loadStage(selectMove, selectBear);

        // これないとゲームをリロードさせたときにレイアウトずれる
        $('#enchant-stage').css('height', '0');
        $('#enchant-stage > div').css('transform', 'scale(1.875)');
    });
});
