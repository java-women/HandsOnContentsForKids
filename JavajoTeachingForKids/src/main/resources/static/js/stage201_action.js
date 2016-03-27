$(function(){
    $("#map-dropdown-menu>li>a").click(function(){
        $("#mapSelected").html($(this).html());
    });

    /* 枠線の表示切替 */
    $("#gridCheckBox").change(function() {
        core.replaceScene(createGameScene());
    });

    /* マップ配列を表示 */
    $("#view").click(function() {
        // 表示初期化
        $("#mapDataView").html("");

        // TODO 表示の整形は課題
        $.each(mapData, function(i, rowValue) {
            $("#mapDataView").append("[")
            $.each(rowValue, function(j, colValue) {
                $("#mapDataView").append(colValue);
                if (j != rowValue.length - 1) {
                    $("#mapDataView").append(",");
                }
            });
            $("#mapDataView").append("]").append("<br>");
        });
    });

    /* 保存処理 */
    $("#save").click(function() {
        $.ajax({
            type: 'POST',
            url: "stage201/save",
            data: {
                "mapData": JSON.stringify(mapData)
            },
            success:function(data){
                alert("保存しました！");
            },
            error:function(data,dataType){
                alert("保存に失敗しました。");
            }
        });
    });
});
