import React, { useRef, useEffect } from "react";
import "./helpers/Globals";
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import audio from "../audio/cubes-no-1.ogg";
import cueSet1 from "./cueSet1.js";

const P5Sketch = () => {
    const sketchRef = useRef();

    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.boxNumber = 4;
        
        p.cubes = {};

        p.cueSet1Completed = [];

        p.preload = () => {
            p.song = p.loadSound(audio);
        };

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight, p.WEBGL);
            p.colorMode(p.HSB);
            

            let hue = 0;
            for (let z = 1; z <= 5; z++) {
                for (let y = 1; y <= 5; y++) {
                    for (let x = 1; x <= 5; x++) {
                        const key = x + ',' + y + ',' + z;
                        const material = Math.random() < 0.5 ? 'emissiveMaterial' : 'ambientMaterial';
                        p.cubes[key] = {
                            x: x,
                            y: y,
                            z: z,
                            hue: hue,
                            show: false,
                            material: material
                        }
                        
                        hue = hue > 356 ? 0 : hue + 3;

                    }
                }
            }

            for (let i = 0; i < cueSet1.length; i++) {
                let vars = {
                    'currentCue': (i + 1),
                    'duration': cueSet1[i].duration,
                    'midi': cueSet1[i].midi,
                    'durationTicks': cueSet1[i].durationTicks,
                }
                p.song.addCue(cueSet1[i].time, p.executeCueSet1, vars);
            }
        };

        p.draw = () => {
            let locX = p.mouseX - p.height / 2;
            let locY = p.mouseY - p.width / 2;
            let boxDistance = p.sin(p.radians(p.frameCount)) * 20 + 40;
            let boxSize = p.sin(p.radians(p.frameCount)) * 10 + 30;

            p.background(0);
            p.ambientLight(60, 60, 60);
            p.pointLight(255, 255, 255, locX, locY, 100);
            p.rotateZ(p.frameCount * 0.01);
            p.rotateX(p.frameCount * 0.01);
            p.rotateY(p.frameCount * 0.01);

            for (const [key, cube] of Object.entries(p.cubes)) {
                const opacity = cube.show ? 1 : 0.5;  
    
                p[cube.material](cube.hue, 100, 100, opacity);
                if(cube.show){
                    p.stroke(0);
                }
                else {
                    p.noStroke();
                }
                p.push();
                p.translate(cube.x * boxDistance, cube.y * boxDistance, cube.z * boxDistance);
                p.box(boxSize, boxSize, boxSize);
                p.pop();
            
            }
        };


        p.noteMapper = {
            40 : {
                key1: '2,1,1',
                key2: '2,1,5',
                key3: '2,1,1',
                key4: '2,5,1',
                key5: '1,2,1',
                key6: '5,2,1',
            },
            41 : {
                key1: '3,1,1',
                key2: '3,1,5',
                key3: '3,1,1',
                key4: '3,5,1',
                key5: '1,3,1',
                key6: '5,3,1',
            },
            42 : {
                key1: '4,1,1',
                key2: '4,1,5',
                key3: '4,1,1',
                key4: '4,5,1',
                key5: '1,4,1',
                key6: '5,4,1',
            },
            43 : {
                key1: '5,1,1',
                key2: '5,1,5',
                key3: '5,1,1',
                key4: '5,5,1',
                key5: '1,5,1',
                key6: '5,5,1',
            },
            44 : {
                key1: '1,2,1',
                key2: '1,2,5',
                key3: '1,1,2',
                key4: '1,5,2',
                key5: '1,1,2',
                key6: '5,1,2',
            },
            47 : {
                key1: '2,2,1',
                key2: '2,2,5',
                key3: '2,1,2',
                key4: '2,5,2',
                key5: '1,2,2',
                key6: '5,2,2',
            },
            48 : {
                key1: '3,2,1',
                key2: '3,2,5',
                key3: '3,1,2',
                key4: '3,5,2',
                key5: '1,3,2',
                key6: '5,3,2',
            },
            49 : {
                key1: '4,2,1',
                key2: '4,2,5',
                key3: '4,1,2',
                key4: '4,5,2',
                key5: '1,4,2',
                key6: '5,4,2',
            },
            50 : {
                key1: '5,2,1',
                key2: '5,2,5',
                key3: '5,1,2',
                key4: '5,5,2',
                key5: '1,5,2',
                key6: '5,5,2',
            },
            51 : {
                key1: '1,3,1',
                key2: '1,3,5',
                key3: '1,1,3',
                key4: '1,5,3',
                key5: '1,1,3',
                key6: '5,1,3',
            },
            52 : {
                key1: '2,3,1',
                key2: '2,3,5',
                key3: '2,1,3',
                key4: '2,5,3',
                key5: '1,2,3',
                key6: '5,2,3',
            },
            54 : {
                key1: '3,3,1',
                key2: '3,3,5',
                key3: '3,1,3',
                key4: '3,5,3',
                key5: '1,3,3',
                key6: '5,3,3',
            },
            55 : {
                key1: '4,3,1',
                key2: '4,3,5',
                key3: '4,1,3',
                key4: '4,5,3',
                key5: '1,4,3',
                key6: '5,4,3',
            },
            56 : {
                key1: '5,3,1',
                key2: '5,3,5',
                key3: '5,1,3',
                key4: '5,5,3',
                key5: '1,5,3',
                key6: '5,5,3',
            },
            57 : {
                key1: '1,4,1',
                key2: '1,4,5',
                key3: '1,1,4',
                key4: '1,5,4',
                key5: '1,1,4',
                key6: '5,1,4',
            },
            59 : {
                key1: '2,4,1',
                key2: '2,4,5',
                key3: '2,1,4',
                key4: '2,5,4',
                key5: '1,2,4',
                key6: '5,2,4',
            },
            60 : {
                key1: '3,4,1',
                key2: '3,4,5',
                key3: '3,1,4',
                key4: '3,5,4',
                key5: '1,3,4',
                key6: '5,3,4',
            },
            61 : {
                key1: '4,4,1',
                key2: '4,4,5',
                key3: '4,1,4',
                key4: '4,4,4',
                key5: '1,2,4',
                key6: '5,4,4',
            },
            62 : {
                key1: '5,4,1',
                key2: '5,4,5',
                key3: '5,1,4',
                key4: '5,5,4',
                key5: '1,5,4',
                key6: '5,5,4',
            },
            63 : {
                key1: '1,5,1',
                key2: '1,5,5',
                key3: '1,1,5',
                key4: '1,5,5',
                key5: '1,1,5',
                key6: '5,1,5',
            },
            64 : {
                key1: '2,5,1',
                key2: '2,5,5',
                key3: '2,1,5',
                key4: '2,5,5',
                key5: '1,2,5',
                key6: '5,2,5',
            },
            66 : {
                key1: '3,5,1',
                key2: '3,5,5',
                key3: '3,1,5',
                key4: '3,5,5',
                key5: '1,3,5',
                key6: '5,3,5',
            },
            67 : {
                key1: '4,5,1',
                key2: '4,5,5',
                key3: '4,1,5',
                key4: '4,5,5',
                key5: '1,4,5',
                key6: '5,4,5',
            },
        };

        p.executeCueSet1 = (vars) => {
            const currentCue = vars.currentCue;
            if (!p.cueSet1Completed.includes(currentCue)) {
               p.cueSet1Completed.push(currentCue);
               if(vars.currentCue > 72 && vars.currentCue <= 144){
                 console.log(vars);
                }
               p.resetShow();
               const cubeKey1 = p.noteMapper[vars.midi].key1;
               const cubeKey2 = p.noteMapper[vars.midi].key2;
               const cubeKey3 = p.noteMapper[vars.midi].key3;
               const cubeKey4 = p.noteMapper[vars.midi].key4;
               const cubeKey5 = p.noteMapper[vars.midi].key5;
               const cubeKey6 = p.noteMapper[vars.midi].key6;
               p.cubes[cubeKey1].show = true;
               p.cubes[cubeKey2].show = true;
               p.cubes[cubeKey3].show = true;
               p.cubes[cubeKey4].show = true;
               p.cubes[cubeKey5].show = true;
               p.cubes[cubeKey6].show = true;
            }
        };


        p.resetShow = () => {
            for (const [key, cube] of Object.entries(p.cubes)) {
                p.cubes[key].show = false;
            }
        };

        p.mousePressed = () => {
            if (p.song.isPlaying()) {
                p.song.pause();
            } else {
                if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                    p.reset();
                }
                //document.getElementById("play-icon").classList.add("fade-out");
                p.canvas.addClass("fade-in");
                p.song.play();
            }
        };

        p.creditsLogged = false;

        p.logCredits = () => {
            if (
                !p.creditsLogged &&
                parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)
            ) {
                p.creditsLogged = true;
                console.log(
                "Music: http://labcat.nz/",
                "\n",
                "Animation: https://github.com/LABCAT/cubes-no-1"
                );
            }
        };

        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.redraw();
        }

        if (window.attachEvent) {
            window.attachEvent(
                'onresize',
                function () {
                    p.updateCanvasDimensions();
                }
            );
        }
        else if (window.addEventListener) {
            window.addEventListener(
                'resize',
                function () {
                    p.updateCanvasDimensions();
                },
                true
            );
        }
        else {
            //The browser does not support Javascript event binding
        }
    };

    useEffect(() => {
        new p5(Sketch, sketchRef.current);
    }, []);

    return (
        <div ref={sketchRef}>
        </div>
    );
};

export default P5Sketch;
