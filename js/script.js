var STCEKINOV = 7;

// cekin slika
var cekin = new Image();
cekin.src = '../img/dollar.gif';

function drawIt() {
    var x = 350;
    var y = 250;
    var dx = 2;
    var dy = 4;
    var WIDTH;
    var HEIGHT;
    var r = 10;
    var ctx;
    var paddlex;
    var paddleh;
    var paddlew;

    //tipke za premikanje ploščice
    var rightDown = false;
    var leftDown = false;

    //opeke
    var bricks;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;

    //timer
    var sekunde;
    var sekundeI;
    var minuteI;
    var izpisTimer;
    var start = true;

    //zajkljucek igre
    var GAMEOVER = false;
    var cekini = [];

    function init() {
        tocke = 0;
        zbrani = 0;
        $("#tocke").html(tocke);
        sekunde = 0;
        izpisTimer = "00:00";
        intTimer = setInterval(timer, 1000); // shrani v globalno spremenljivko
        ctx = $('#canvas')[0].getContext("2d");
        WIDTH = $("#canvas").width();
        HEIGHT = $("#canvas").height();
        return setInterval(draw, 10);
    }

    //timer
    function timer() {
        if (vPavzi) return; // ne štej časa med pavzo
        if (start == true) {
            sekunde++;

            sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
            minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
            izpisTimer = minuteI + ":" + sekundeI;

            $("#cas").html(izpisTimer);
        }
    }

    //nastavljanje leve in desne tipke
    function onKeyDown(evt) {
        if (evt.keyCode == 65)
            leftDown = true;
        else if (evt.keyCode == 68) rightDown = true;
    }

    function onKeyUp(evt) {
        if (evt.keyCode == 65)
            leftDown = false;
        else if (evt.keyCode == 68) rightDown = false;
    }
    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    function init_paddle() {
        paddlew = 100;
        paddleh = 10;
        paddlex = WIDTH / 2 - paddlew / 2;
    }

    function initbricks() { //inicializacija opek - polnjenje v tabelo
        NROWS = 5;
        NCOLS = 6;
        BRICKWIDTH = (WIDTH / NCOLS) - 5;
        BRICKHEIGHT = 22;
        PADDING = 5;
        bricks = new Array(NROWS);
        for (i = 0; i < NROWS; i++) {
            bricks[i] = new Array(NCOLS);
            for (j = 0; j < NCOLS; j++) {
                switch (i) {
                    case 0:
                        bricks[i][j] = 5;
                        break;
                    case 1:
                        bricks[i][j] = 4;
                        break;
                    case 2:
                        bricks[i][j] = 3;
                        break;
                    case 3:
                        bricks[i][j] = 2;
                        break;
                    case 4:
                        bricks[i][j] = 1;
                        break;
                }
            }
        }
    }


    function initCekini() {
        cekini = [];
        var cekinW = 30;
        var cekinH = 30;
        var margin = 20;
        for (var i = 0; i < STCEKINOV; i++) {
            cekini.push({
                x: margin + Math.random() * (WIDTH - 2 * margin - cekinW),
                y: PADDING + Math.random() * (NROWS * (BRICKHEIGHT + PADDING) - cekinH),
                w: cekinW,
                h: cekinH,
                aktiven: true
            });
        }
    }

    function circle(x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    function rect(x, y, w, h) {
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();

        ctx.shadowOffsetX = -2;
        ctx.shadowOffsetY = -2;
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }

    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }
    //END LIBRARY CODE
    var brickColors = ['#0a7a8a', '#0c647b', '#0d4f6e', '#0c3c5c', '#0b2e4a'];

    function draw() {
        if (vPavzi) return; // igra je na pavzi
        clear();
        // pearl ball: radial gradient to simulate pearlescent sheen
        var pearlGrad = ctx.createRadialGradient(x - 4, y - 4, 2, x, y, r);
        pearlGrad.addColorStop(0, 'rgba(255,255,255,0.95)');
        pearlGrad.addColorStop(0.4, 'rgba(248,248,255,0.95)');
        pearlGrad.addColorStop(0.7, 'rgba(234,238,242,0.95)');
        pearlGrad.addColorStop(1, 'rgba(200,200,205,0.9)');
        ctx.fillStyle = pearlGrad;
        circle(x, y, r);

        //premik ploščice levo in desno
        if (rightDown && !GAMEOVER) {
            if ((paddlex + paddlew) < WIDTH) {
                paddlex += 5;
            } else {
                paddlex = WIDTH - paddlew;
            }
        }
        else if (leftDown && !GAMEOVER) {
            if (paddlex > 0) {
                paddlex -= 5;
            } else {
                paddlex = 0;
            }
        }


        ctx.fillStyle = '#3ab8d4';
        rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

        // riši cekine (pred opekami, da jih opeke prekrijejo)
        for (var ci = 0; ci < cekini.length; ci++) {
            var c = cekini[ci];
            if (!c.aktiven) continue;
            if (cekin.complete) {
                ctx.drawImage(cekin, c.x, c.y, c.w, c.h);
            }
        }

        //riši opeke
        for (i = 0; i < NROWS; i++) {
            for (j = 0; j < NCOLS; j++) {
                if (bricks[i][j] > 0) {
                    ctx.shadowColor = brickColors[bricks[i][j] - 1];
                    ctx.fillStyle = brickColors[bricks[i][j] - 1];
                    rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT);
                }
            }
        }

        var hitBrick = false;
        for (var bi = 0; bi < NROWS && !hitBrick; bi++) {
            for (var bj = 0; bj < NCOLS && !hitBrick; bj++) {
                if (bricks[bi][bj] <= 0) continue;
                var bLeft = bj * (BRICKWIDTH + PADDING) + PADDING;
                var bRight = bLeft + BRICKWIDTH;
                var bTop = bi * (BRICKHEIGHT + PADDING) + PADDING;
                var bBottom = bTop + BRICKHEIGHT;
                if (x + r > bLeft && x - r < bRight && y + r > bTop && y - r < bBottom) {
                    var ovLeft = (x + r) - bLeft;
                    var ovRight = bRight - (x - r);
                    var ovTop = (y + r) - bTop;
                    var ovBottom = bBottom - (y - r);
                    var minOv = Math.min(ovLeft, ovRight, ovTop, ovBottom);
                    if (minOv === ovLeft) {
                        dx = -Math.abs(dx);
                        x = bLeft - r;
                    }
                    else if (minOv === ovRight) {
                        dx = Math.abs(dx);
                        x = bRight + r;
                    }
                    else if (minOv === ovTop) {
                        dy = -Math.abs(dy);
                        y = bTop - r;
                    }
                    else {
                        dy = Math.abs(dy);
                        y = bBottom + r;
                    }
                    bricks[bi][bj]--;
                    tocke += 1;
                    $("#tocke").html(tocke);
                    hitBrick = true;
                }
            }
        }

        // preveri trčenje žogice s cekini
        for (var ci = 0; ci < cekini.length; ci++) {
            var c = cekini[ci];
            if (!c.aktiven) continue;
            if (x + r > c.x && x - r < c.x + c.w &&
                y + r > c.y && y - r < c.y + c.h) {
                c.aktiven = false;
                zbrani++;
                if (zbrani === STCEKINOV) {
                    GAMEOVER = true;
                    clearInterval(intervalId);
                    clearInterval(intTimer);
                    dodajRezultat(tocke, izpisTimer);
                    prikaziLestvico();
                    winAlert(tocke, izpisTimer);
                }
            }
        }

        //odboj od leve in desne stene
        if (x + dx > WIDTH - r || x + dx < 0 + r)
            dx = -dx;//ce bi zogca zadela steno ji obrni x smer

        //odboj od zgornje stene
        if (y + dy < 0 + r)
            dy = -dy;//ce bi zogca zadela steno ji obrni y smer

        //odboj od spodnje stene
        else if (y + dy > HEIGHT - (r + paddleh)) {
            start = false;
            //preveri ali je zadel ploščico
            if (x > paddlex && x < paddlex + paddlew) {
                dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);//ce bolj na sredino ploščice zadene, manjši odboj, če bolj na rob, večji odboj
                dy = -dy; //obbrni y smer
                start = true;
            }

            //ustavi interval draw
            else if (y + dy > HEIGHT - r) {
                GAMEOVER = true;
                clearInterval(intervalId);
                clearInterval(intTimer);
                dodajRezultat(tocke, izpisTimer);
                prikaziLestvico();
                gameOverAlert(tocke, izpisTimer);
            }
        }
        x += dx;
        y += dy;
    }


    intervalId = init();
    initbricks();
    init_paddle();
    initCekini();


}

var intervalId = null;
var intTimer = null;
var vPavzi = false;
var zbrani = 0;



// nariše začetno stanje brez zagona igre
function predogled() {
    var canvas = $('#canvas')[0];
    var pctx = canvas.getContext("2d");
    var W = $("#canvas").width();
    var H = $("#canvas").height();
    var NROWS = 5, NCOLS = 6;
    var BRICKWIDTH = (W / NCOLS) - 5;
    var BRICKHEIGHT = 22;
    var PADDING = 5;
    var brickColors = ['#0a7a8a', '#0c647b', '#0d4f6e', '#0c3c5c', '#0b2e4a'];

    pctx.clearRect(0, 0, W, H);

    // opeke - nariši dvakrat za senco na obeh straneh
    for (var i = 0; i < NROWS; i++) {
        for (var j = 0; j < NCOLS; j++) {
            var bx = (j * (BRICKWIDTH + PADDING)) + PADDING;
            var by = (i * (BRICKHEIGHT + PADDING)) + PADDING;
            pctx.fillStyle = brickColors[NROWS - i - 1];
            pctx.shadowColor = brickColors[NROWS - i - 1];

            pctx.shadowBlur = 5;
            pctx.shadowOffsetX = 2;
            pctx.shadowOffsetY = 2;
            pctx.fillRect(bx, by, BRICKWIDTH, BRICKHEIGHT);

            pctx.shadowOffsetX = -2;
            pctx.shadowOffsetY = -2;
            pctx.fillRect(bx, by, BRICKWIDTH, BRICKHEIGHT);
        }
    }

    // ploščica
    var paddlew = 100, paddleh = 10;
    pctx.fillStyle = '#3ab8d4';
    pctx.fillRect(W / 2 - paddlew / 2, H - paddleh, paddlew, paddleh);

    // žogica (biser)
    var px = W / 2, py = H / 2, r = 10;
    var grad = pctx.createRadialGradient(px - 4, py - 4, 2, px, py, r);
    grad.addColorStop(0, 'rgba(255,255,255,0.95)');
    grad.addColorStop(0.4, 'rgba(248,248,255,0.95)');
    grad.addColorStop(0.7, 'rgba(234,238,242,0.95)');
    grad.addColorStop(1, 'rgba(200,200,205,0.9)');
    pctx.beginPath();
    pctx.fillStyle = grad;
    pctx.arc(px, py, r, 0, Math.PI * 2, true);
    pctx.fill();
    pctx.closePath();
}

$(document).ready(function () {
    predogled();
    prikaziLestvico();
});

$("#pavza").on("click", function () {
    if (!intervalId) return; // igra ne teče
    vPavzi = !vPavzi;
    $(this).text(vPavzi ? 'Nadaljuj' : 'Pavza');
});

$("#start").on("click", function () {
    clearInterval(intervalId);
    clearInterval(intTimer);
    vPavzi = false;
    $("#pavza").text('Pavza');
    drawIt();
});

$("#reset").on("click", function () {
    clearInterval(intervalId);
    clearInterval(intTimer);
    zbrani = 0;
    predogled();
    prikaziLestvico();
});

//kljuc
var LEADERBOARD_KEY = 'morje_lestvica';

//vrne 
function loadLeaderboardTimes() {
    var saved = localStorage.getItem(LEADERBOARD_KEY);
    if (saved == null) {
        return [];  // Ni rezultatov
    }
    return JSON.parse(saved);
}

// JSON.stringify naredi iz polja objektov string,
function saveLeaderboardTimes(times) {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(times));
}


function dodajRezultat(tocke, cas) {
    var rezultati = loadLeaderboardTimes();

    // Dodaj rezultat
    rezultati.push({ tocke: tocke, cas: cas });

    // Urejanje z izbiranjem
    for (var i = 0; i < rezultati.length; i++) {
        if (i == rezultati.length - 1)
            break;
        var ocenaMax = rezultati[i + 1].tocke;
        var k = i + 1;
        for (var j = i + 1; j < rezultati.length; j++) {
            if (ocenaMax < rezultati[j].tocke) {
                ocenaMax = rezultati[j].tocke;
                k = j;
            }
        }
        if (rezultati[k].tocke > rezultati[i].tocke) {
            var d = rezultati[k];
            rezultati[k] = rezultati[i];
            rezultati[i] = d;
        }
    }

    // samo top 10
    rezultati = rezultati.slice(0, 10);

    saveLeaderboardTimes(rezultati);
}

// Prikaži lestvico v HTML class: #lestvica-seznam
function prikaziLestvico() {
    var rezultati = loadLeaderboardTimes();
    var seznam = $('#lestvica-seznam');
    seznam.empty();

    if (rezultati.length === 0) {
        seznam.append('<li>Še ni rezultatov.</li>');
        return;
    }

    for (var i = 0; i < rezultati.length; i++) {
        seznam.append(
            '<li>' + rezultati[i].tocke + ' točk &mdash; ' + rezultati[i].cas + '</li>'
        );
    }
}