$(function() {

    // 色の入力値が変わった時
    $('#color-picker').change(function() {
        var color = $(this).val();
        $('#enchant-stage > div').css('background-color', "#" + color);
    });

    // 値が変更された時
    $('#select-move, #select-bear, #x-coordinate, #y-coordinate, #spaceKey, #iterate').change(function() {
        setInit('x-coordinate', '1');
        setInit('y-coordinate', '1');
        setInit('iterate', '0');

        changeParam();
    });

    $('#x-coordinate, #y-coordinate, #iterate').keyup(function() {
        changeParam();
    });
});

/*
 * createGameSceneにセットする
 */
function changeParam() {
    var selectMove = $('#select-move').val();
    var selectBear = $('#select-bear').val();
    var xCoordinate = $('#x-coordinate').val();
    var yCoordinate = $('#y-coordinate').val();
    var spaceKeyAction = $('#spaceKey').val();
    var iterate = $('#iterate').val();

    try {
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

/*
 * 空の時、初期値をセット
 */
function setInit(id, initVal) {
    var idVal = $('#' + id).val();
    if (!idVal) {
        $('#' + id).val(initVal);
    }
}