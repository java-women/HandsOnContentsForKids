$(function(){
    $("#map-dropdown-menu > li >a").click(function(){
        $("#map-selected").html($(this).html());
    });

    /* 枠線の表示切替 */
    $("#grid-checkbox").change(function() {
        core.replaceScene(createGameScene());
    });

    /* マップ配列を表示 */
    $("#view").click(function() {
        // 表示初期化
        $("#map-data-view").html("");

        // TODO 表示の整形は課題
        $.each(mapData, function(i, rowValue) {
            $("#map-data-view").append("[")
            $.each(rowValue, function(j, colValue) {
                $("#map-data-view").append(colValue);
                if (j != rowValue.length - 1) {
                    $("#map-data-view").append(",");
                }
            });
            $("#map-data-view").append("]").append("<br>");
        });
    });

    /* 保存処理 */
    $("#save").click(function() {
        $.ajax({
            type: 'POST',
            url: "applied002/save",
            data: {
                "mapData": JSON.stringify(mapData),
                "collisionData": JSON.stringify(collisionData)
            },
            success:function(data){
                alert("保存しました！");

                // マップをPNGでダウンロード
                var canvas = $("canvas")[0];
                var base64 = canvas.toDataURL();
                var a = document.createElement('a');
                a.download = "map.png";
                a.href = base64;
                var evt = document.createEvent('MouseEvent');
                evt.initEvent("click", true, false);
                a.dispatchEvent( evt );
            },
            error:function(data,dataType){
                alert("保存に失敗しました。");
            }
        });
    });
});
