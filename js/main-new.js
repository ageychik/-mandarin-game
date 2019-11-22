let el = {
    bg: {
        position: {x: 'left', y: 'top'},
        originSize: {w: 768, h: 216},
        src: 'images/bg.png',
        onload: function () {
            bg2.x = bg1.x + bg1.w;
        }

    },
    border: {
        src: 'images/border-bottom.png',
        position: {x: 'left', y: 'bottom'},
        originSize: {w: 400, h: 32}
    }
};

function runner({w, h}) {
    let pjs = new PointJS('2d', w, h);
    let game = pjs.game;
    let touch = pjs.touchControl;
    let ratio;
    (function () {
        ratio = el.bg.originSize.h * 100 / h;
        touch.initTouchControl();
    })();




    let elMass = Object.keys(el).reduce(function (mass, i) {
        let j = 1;
        while (j--){
            let layer = {
                x: el[i].position.x === 'left' ? 0 : w - (el[i].originSize.w * 100 / ratio),
                y: el[i].position.y === 'top' ? 0 : h - (el[i].originSize.h * 100 / ratio),
                file: el[i].src,
                h: el[i].originSize.h * 100 / ratio
            };

            if(!j){

            }

            mass.push(game.newImageObject(layer));
        }



        return mass
    }, []);

    game.newLoop('game', function () {
        elMass.forEach(function (item) {
            createLoop(item);
        })
    });

    game.startLoop('game');

    function createLoop(img) {
        return img.draw();
    }
}
runner({w: 640, h: 480});