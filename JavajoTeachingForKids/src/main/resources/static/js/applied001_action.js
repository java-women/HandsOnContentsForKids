$(function() {

    // 色の入力値が変わった時
    $('#color-picker').change(function() {
        var color = $(this).val();
        $('#enchant-stage > div').css('background-color', "#" + color);
    });

    // 値が変更された時
    $('#select-move, #select-bear, #x-coordinate, #y-coordinate').change(function() {
        changeParam();
    });

    $('#x-coordinate, #y-coordinate').keyup(function() {
        changeParam();
    });
});

function changeParam() {
    var selectMove = $('#select-move').val();
    var selectBear = $('#select-bear').val();
    var xCoordinate = $('#x-coordinate').val();
    var yCoordinate = $('#y-coordinate').val();

    core.replaceScene(createGameScene(selectMove, selectBear, xCoordinate, yCoordinate));
}