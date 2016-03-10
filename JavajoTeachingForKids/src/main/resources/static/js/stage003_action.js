$(function() {
    $(window).load(function() {
        loadStage('notMove', 'notWalk');
    });

    $('.color-picker').change(function() {
        var color = $(this).val();
        $('#enchant-stage > div').css('background-color', "#" + color);
    });

    $('.select-move, .select-bear').change(function() {
        var selectMove = $('.select-move').val();
        var selectBear = $('.select-bear').val();

        loadStage(selectMove, selectBear);

        $('#enchant-stage').css('height', '0');
        $('#enchant-stage > div').css('transform', 'scale(1.875)');
    });
});
