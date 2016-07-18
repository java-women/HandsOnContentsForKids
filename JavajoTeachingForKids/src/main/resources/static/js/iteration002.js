var speedX = 1.0;
var speedY = 2.0;
var locX = 50;
var locY = 60;
var ite = 0;
var ite_max = 1;
var ctx;
var interval;
var canvas = null;



window.onload = function() {
    this.init();
};

function init(){
    ite = 0;
    canvas = null;
    ctx = null;
    locX = 50;
    locY = 60;

    this.canvas = document.getElementById('canvas0');
    this.ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,500,500);

    interval = setInterval(draw, 10);
}


function draw(){
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(8,8,12,.2)";
    ctx.globalCompositeOperation = "lighter";

    //位置を更新
    locX += speedX;
    locY += speedY;

    if(locX < 50 || locX > 450){
        speedX *= -1.0;
        ite++;
    }

    if(locY < 50 || locY > 350){
        speedY *= -1.0;
        ite++;
    }

    if(ite > ite_max){
        clearInterval(interval);
    }

    //更新した座標で円を描く

    ctx.beginPath();
    ctx.fillStyle = '#003366';
    ctx.arc(locX, locY, 2, 0, Math.PI*2.0, true);
    ctx.fill();

};

/**
 * パラメータ編集
 */
function editData(){
    //speedX = getIntValue("speedX");
    //speedy = getIntValue("speedY");
    speedX = 1.0;
    speedY = 2.0;
    try {
        ite_max = getIntValue("ite_max", 0, 999);
    } catch (e) {
        alert("うまく動かなかった。\r\n半角数字の1から999の数字を入力してね。");
    }

    clearInterval(interval);

    this.init();
}
