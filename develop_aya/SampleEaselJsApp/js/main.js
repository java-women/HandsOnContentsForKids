  var canvas, stage;
  var drawingCanvas;
  var oldPt;
  var oldMidPt;
  var title;
  var color;
  var stroke;
  var colors;
  var index;

  function init() {
    canvas = document.getElementById("myCanvas");
    index = 0;

    // ペンの色変更
    colors = ["red", "pink", "orange", "yellow", "lightgreen", "green", "blue", "purple", "glay"];

    stage = new createjs.Stage(canvas);
    stage.autoClear = false;
    stage.enableDOMEvents(true);
    createjs.Touch.enable(stage);
    createjs.Ticker.setFPS(24);
    drawingCanvas = new createjs.Shape();

    // 影（色, x距離, y距離, 太さ）
    // drawingCanvas.shadow = new createjs.Shadow("silver", 20, 20, 50);

    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);

    // 最初に表示される文字
    title = new createjs.Text("Click and Drag to draw", "36px Arial", "#777777");
    title.x = 280;
    title.y = 270;

    stage.addChild(title);
    stage.addChild(drawingCanvas);
    stage.update();
  }

  function handleMouseDown(event) {
    if (!event.primary) { return; }
    if (stage.contains(title)) {
      stage.clear();
      stage.removeChild(title);
    }

    // こっちcolorsで指定した色を順番に変更してくれる
    color = colors[(index++) % colors.length];
    // 一色を指定したい場合はこっち
    // color = "red";

    // 文字の太さ変更
    stroke = 8;

    oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
    oldMidPt = oldPt.clone();
    stage.addEventListener("stagemousemove", handleMouseMove);
  }

  function handleMouseMove(event) {
    if (!event.primary) { return; }
    var midPt = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);
    drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);
    oldPt.x = stage.mouseX;
    oldPt.y = stage.mouseY;
    oldMidPt.x = midPt.x;
    oldMidPt.y = midPt.y;
    stage.update();
  }

  function handleMouseUp(event) {
    if (!event.primary) { return; }
    stage.removeEventListener("stagemousemove", handleMouseMove);
  }
