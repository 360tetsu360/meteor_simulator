var winwidth = window.innerWidth;
var winheight = window.innerHeight;
var meteors = [];

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
}

var next_gen = 0;

function draw() {
    background(0);

    if (next_gen < 0) {
        create_meteor();
        next_gen += 150 * Math.random();
    }

    next_gen -= 1;

    for (let i = meteors.length - 1; i >= 0; i--) {
        var live_flag = false;
        for (let j = meteors[i].trajectory.length - 1; j >= 0; j--) {
            if (j == 0) {
                meteors[i].trajectory[j].x += meteors[i].dx;
                meteors[i].trajectory[j].y += meteors[i].dy;
                meteors[i].trajectory[j].life += 1;
            } else {
                if (meteors[i].trajectory[j - 1].life != 0) {
                    if (meteors[i].trajectory[0].life < meteors[i].life) {
                        meteors[i].trajectory[j].x = meteors[i].trajectory[j - 1].x
                        meteors[i].trajectory[j].y = meteors[i].trajectory[j - 1].y
                        meteors[i].trajectory[j].life += 1;
                        meteors[i].trajectory[j].intensity = meteors[i].intensity * Math.sin((meteors[i].trajectory[j].life / meteors[i].life) * Math.PI);
                    } else {
                        meteors[i].trajectory[j].intensity *= 0.9;
                    }
                } else {

                    continue
                }
            }

            if (meteors[i].trajectory[0].life < meteors[i].life || meteors[i].trajectory[j].intensity > 10) {
                live_flag = true;
                let intensity = meteors[i].trajectory[j].intensity;
                let c = color(intensity, intensity * 2, intensity);

                fill(c);

                noStroke();
                let size = meteors[i].size * Math.sin((meteors[i].trajectory[j].life / meteors[i].life) * Math.PI);
                circle(meteors[i].trajectory[j].x, meteors[i].trajectory[j].y, size);
            }
        }
        if (!live_flag) {
            meteors.splice(i, 1);
        }
    }
}

function create_meteor() {
    let size = 2.5;
    let speed = 3 + 3 * Math.random();
    let theta = 2 * Math.PI * Math.random();
    let life = speed * 10;
    let intensity = 125 + Math.random() * 125;
    let x = (Math.random() - 0.5) * winwidth;
    let y = (Math.random() - 0.5) * winheight;

    meteors.push({
        size: size,
        dx: speed * Math.cos(theta),
        dy: speed * Math.sin(theta),
        life: life,
        intensity: intensity,
        trajectory: []
    });
    for (let i = 0; i < 100; i++) {
        meteors[meteors.length - 1].trajectory.push({
            x: x,
            y: y,
            life: 0,
            intensity: 0
        });
    }
}

function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    winwidth = window.innerWidth;
    winheight = window.innerHeight;
}