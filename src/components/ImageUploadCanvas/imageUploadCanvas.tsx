/** @jsx jsx */
import React, {useEffect, useRef, useState} from "react";
import styled from "@emotion/styled";
import {jsx, css, SerializedStyles} from "@emotion/react";

type tDrawFunc = (ctx: CanvasRenderingContext2D, frameCount?: number, imgRef?: string) => void;

const useCanvas = (draw: tDrawFunc, useAnimation = true, imgRef = "") => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas: HTMLCanvasElement = canvasRef.current!;
        const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
        let frameCount = 0;
        let animationFrameId: number;

        function resizeCanvas() {
            let {width, height} = canvas.getBoundingClientRect();
            width -= 16;
            height -= 16;
            // console.log(width, height);

            if (canvas.width !== width || canvas.height !== height) {
                const {devicePixelRatio: ratio = 1} = window;
                // console.log(ratio);
                // const context = canvas.getContext("2d");
                canvas.width = width * ratio;
                canvas.height = height * ratio;
                context!.scale(ratio, ratio);
                return true;
            }

            return false;
        }

        const render = () => {
            frameCount++;
            draw(context, frameCount, imgRef);
            useAnimation && (animationFrameId = window.requestAnimationFrame(render));
        };

        // saves the entire state of the canvas by pushing the current state onto a stack.
        context.save();
        resizeCanvas();
        render();
        context.restore();

        return () => {
            useAnimation && window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    return canvasRef;
};

function draw(ctx: CanvasRenderingContext2D, frameCount?: number) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount! * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
}

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
const Canvas: React.FC<{draw: tDrawFunc; css: SerializedStyles}> = ({draw, css, ...rest}) => {
    const canvasRef = useCanvas(draw, true);
    return (
        <canvas ref={canvasRef} css={css} {...rest}>
            Ваш браузер устарел
        </canvas>
    );
};

const CanvasImg: React.FC<{draw: tDrawFunc; css: SerializedStyles; imgRef: string}> = ({
    draw,
    css,
    imgRef,
    ...rest
}) => {
    const canvasRef = useCanvas(draw, false, imgRef);
    return (
        <canvas ref={canvasRef} css={css} {...rest}>
            Ваш браузер устарел
        </canvas>
    );
};

const baseCSS = css`
    width: 500px;
    height: 200px;
    border: 4px solid red;
    padding: 4px;
`;

export function ImageUpload() {
    const [imgSrc, setimgSrc] = useState<string>("");

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        const fl: File = evt.currentTarget.files![0];
        // console.log(fl);

        const reader = new FileReader();
        reader.onload = function (event) {
            setimgSrc(event.target!.result as string);
            // console.log(imgSrc);
        };
        reader.readAsDataURL(fl);
    };

    return (
        <div>
            <Canvas
                css={css`
                    ${baseCSS};
                `}
                draw={draw}
            />
            <br />
            <label>Image File:</label>
            <br />
            <input type="file" id="imageLoader" name="imageLoader" onChange={handleChange} />
            <br />
            {imgSrc && (
                <CanvasImg
                    css={css`
                        ${baseCSS};
                    `}
                    draw={drawImage}
                    imgRef={imgSrc}
                />
            )}
        </div>
    );
}

function drawImage(ctx: CanvasRenderingContext2D, fn?: number, imgRef?: string) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";

    const img = new Image();
    img.src = imgRef!;
    console.log("drawImage");
    img.onload = function () {
        // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        console.log(img.width, img.height);
        let dw = ctx.canvas.width - 16;
        let dh = (dw * img.height) / img.width;
        if (dh > ctx.canvas.height - 16) {
            dh = ctx.canvas.height - 16;
            dw = (dh * img.width) / img.height;
        }
        console.log(dw, dh);
        ctx.drawImage(img, 0, 0, img.width, img.height, 4, 4, dw, dh);
        // ctx.drawImage(img, 0, 0);
    };
}

/*

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
