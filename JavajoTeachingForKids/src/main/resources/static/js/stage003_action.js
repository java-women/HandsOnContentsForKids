$(function() {
    $(window).load(function() {
        loadStage('notMove');
    });

    $('.color-picker').change(function() {
        var color = $(this).val();
        $('#enchant-stage > div').css('background-color', "#" + color);
    });

    $('.select-move').change(function() {
        var selectVal = $('.select-move').val();
        loadStage(selectVal);
        $('#enchant-stage').css('height', '0');
        $('#enchant-stage > div').css('transform', 'scale(1.875)');
    });
});
