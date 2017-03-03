/**
 * Created by cg on 16-5-17.
 */

window.onload = function () {
    setSize();
    drawGalaxy();
    showHello();
};
window.onresize = function (){
    clearAll();
    drawGalaxy();
}

function drawGalaxy() {
    var divWidth = document.getElementById('div_cover').offsetWidth;
    var divHeight = document.getElementById('div_cover').offsetHeight;
    canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');
    var w = canvas.width = divWidth,
        h = canvas.height = divHeight,
        hue = 217,
        maxStars = 600,
        maxStarsgal = 2200;
    stars = [],
        count = 0;

    canvas2 = document.createElement('canvas'),
        ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width/2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.055, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 60%, 30%)');
    gradient2.addColorStop(0.15, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }
        if (min > max) {
            var hold = max;
            max = min;
            min = hold;
        }
        return Math.floor(Math.random() * (max - min) + min + 1);
    }

    var Star = function() {
        this.orbitRadius = random(w / 1.2 - 50);
        this.radius = random(100, this.orbitRadius) / 10;
        this.orbitX = w / 2 - 100;
        this.orbitY = h / 3;
        // this.orbitX = 100;
        // this.orbitY = 100;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 1000000;
        this.alpha = random(2, 10) / 5;
        count++;
        stars[count] = this;
    };

    Star.prototype.draw = function() {
        var x = Math.sin(this.timePassed) * this.orbitRadius * 2 + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius * 1.5 + this.orbitY,
            twinkle = random(10);
        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    };
    for (var i = 0; i < maxStars; i++) {
        new Star();
    }
    var Stargal = function() {
        this.orbitRadius = random(w / 2 - 50);
        this.radius = random(100, this.orbitRadius) / 10;
        this.orbitX = w / 2 + 20;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStarsgal);
        this.speed = random(this.orbitRadius) / 200000;
        this.alpha = random(2, 10) / 10;
        count++;
        stars[count] = this;
    };

    Stargal.prototype.draw = function() {
        var x = Math.sin(this.timePassed) * this.orbitRadius/1.2 + this.orbitX,
            y = Math.cos(this.timePassed + 0.8) * this.orbitRadius/2.3 + this.orbitY,
            twinkle = random(10);
        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    };

    for (var n = 0; n < maxStarsgal; n++){
        new Stargal();
    }

    function drawAnimation() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = 'hsla(' + hue + ', 64%, 9%, 0.8)';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        for (var i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
        }
        window.requestAnimationFrame(drawAnimation);
    }
    drawAnimation();
}

function clearAll() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    stars = [];
    count = 0;
}

function choiceShow() {
    var presentTime = new Date().getHours();
    var showText;
    if(presentTime >= 5 && presentTime <10){
        showText = "Доброе утро , 早上好";
    }else if(presentTime >= 10 && presentTime < 13){
        showText = "Добрый день , 中午好";
    }else if(presentTime >= 13 && presentTime < 19){
        showText = "Добрый день , 下午好";
    }else if(presentTime >= 19 && presentTime < 24){
        showText = "добрый вечер , 晚上好"
    }else{
        showText = " Привет , 你好"
    }
    return showText;
}

function showHello() {
    var showHelloDiv = document.getElementById("div_showHello");
    var maxWidths = window.innerWidth;
    showHelloDiv.style.color = "#d3d5c8";
    showHelloDiv.innerText = choiceShow();
}

function setSize() {
    var maxWidth = window.innerWidth,maxHeight = window.innerHeight;
    document.getElementById('div_cover').style.height = maxHeight + 'px';
    document.getElementById('div_hobby').style.height = maxHeight + 240 + 'px';
    document.getElementById('div_linkOther').style.height = maxHeight/1.5 + 'px';
}

