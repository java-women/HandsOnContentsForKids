$(function() {

    // 色の入力値が変わった時
    $('#color-picker').change(function() {
        var color = $(this).val();
        $('#enchant-stage > div').css('background-color', "#" + color);
    });

    // 値が変更された時
    $('#select-move, #select-bear, #x-coordinate, #y-coordinate, #spaceKey, #iterate').change(function() {
        changeParam();
    });

    $('#x-coordinate, #y-coordinate, #iterate').keyup(function() {
        changeParam();
    });
});

function changeParam() {
    try {
        var selectMove = $('#select-move').val();
        var selectBear = $('#select-bear').val();
        var xCoordinate = $('#x-coordinate').val();
        var yCoordinate = $('#y-coordinate').val();
        var spaceKeyAction = $('#spaceKey').val();
        var iterate = $('#iterate').val();

        if (xCoordinate != '' && yCoordinate != '' && iterate != '') {
            getIntValue('x-coordinate', 1, 20);
            getIntValue('y-coordinate', 1, 20);
            getIntValue('iterate', 0, 400);
        }
        core.replaceScene(createGameScene(selectMove, selectBear, xCoordinate, yCoordinate, spaceKeyAction, iterate));

    } catch(e) {
        alert("うまく動かなかった。\r\n数が大きすぎだよ！");
    }
}