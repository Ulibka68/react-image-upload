/** @jsx jsx */
import React, {useEffect} from "react";
import styled from "@emotion/styled";
import {jsx, css} from "@emotion/react";

/*
<label>Image File:</label><br/>
<input type="file" id="imageLoader" name="imageLoader"/>
<canvas id="imageCanvas"></canvas>

var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');


function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

 But if you really want to change the size of your image, then simply use the third and fourth params of
 drawImage: ctx.drawImage(img, x, y, width, height). – Kaiido Sep 3 '18 at 4:47
*/

const baseCSS = css`
    width: 300px;
    height: 200px;
    border: 4px solid red;
    padding: 4px;
`;

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
function Canvas(props: any) {
    const canvasRef = React.useRef(null);

    function draw(ctx: CanvasRenderingContext2D, frameCount: number) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;
        const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
        let frameCount = 0;
        let animationFrameId: number;

        function resizeCanvas() {
            let {width, height} = canvas.getBoundingClientRect();
            width -= 16;
            height -= 16;
            console.log(width, height);

            if (canvas.width !== width || canvas.height !== height) {
                const {devicePixelRatio: ratio = 1} = window;
                console.log(ratio);
                // const context = canvas.getContext("2d");
                canvas.width = width * ratio;
                canvas.height = height * ratio;
                context!.scale(ratio, ratio);
                return true;
            }

            return false;
        }

        //Our draw came here
        const render = () => {
            frameCount++;
            draw(context, frameCount);
            animationFrameId = window.requestAnimationFrame(render);
        };
        resizeCanvas();
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    return <canvas ref={canvasRef} {...props} />;
}

export function ImageUpload() {
    return (
        <div>
            <Canvas
                css={css`
                    ${baseCSS};
                `}
            />
            <br />
            <label>Image File:</label>
            <br />
            <input type="file" id="imageLoader" name="imageLoader" />
        </div>
    );
}
