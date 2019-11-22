let pjs = new PointJS('2d', 667, 375);
// pjs.system.initFullPage();

let vector = pjs.vector;
let log = pjs.system.log;
let game = pjs.game;
let point = vector.point;
let size = vector.size;
let camera = pjs.camera;
let brush = pjs.brush;
let OOP = pjs.OOP;

let height =  game.getWH().h;
let width = game.getWH().w;

let touch = pjs.touchControl;
touch.initTouchControl();

let bg1 = game.newImageObject({
    x: 0, y: 0,
    file: 'images/bg.png',
    h: height,
    onload: function () {
        bg2.x = bg1.x + bg1.w;
    }
});

let bg2 = game.newImageObject({
    x: 0, y: 0,
    file: 'images/bg.png',
    h: height
});

let gr1 = game.newImageObject({
    x: 0, y: 0,
    file: 'images/border-bottom.png',
    w: width,
    onload: function () {
        gr2.y = gr1.y = height - gr1.h;
        gr2.x = gr1.x + gr1.w;
    }
});

let gr2 = game.newImageObject({
    x: 0, y: 0,
    file: 'images/border-bottom.png',
    w: width
});

let user = game.newAnimationObject({
    x: width / 3, y: 0,
    h: 66, w: 42,
    delay: 4,
    animation: pjs.tiles.newAnimation('images/run.png', 21, 33, 8)
});

function bgRepeat(s){
    bg1.move(point(-s / 2, 0));
    bg2.move(point(-s / 2, 0));
    gr1.move(point(-s, 0));
    gr2.move(point(-s, 0));

    if(bg1.x + bg1.w < 0){
        bg1.x = bg2.x + bg2.w
    }

    if(bg2.x + bg2.w < 0){
        bg2.x = bg1.x + bg1.w
    }

    if(gr1.x + gr1.w < 0){
        gr1.x = gr2.x + gr2.w
    }

    if(gr2.x + gr2.w < 0){
        gr2.x = gr1.x + gr1.w
    }
}

game.newLoop('game', function () {
    game.fill('#d9d9d9');

    bg1.draw();
    bg2.draw();
    gr1.draw();
    gr2.draw();

    user.y = gr1.y - user.h

    user.draw();
    bgRepeat(5)
});

game.startLoop('game');