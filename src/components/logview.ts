/** @jsx jsx */
import React, {useEffect, useRef, useState} from "react";
import {css} from "@emotion/react";
import {console_image} from "./console-image";

const baseCSS = css`
    width: 500px;
    height: 200px;
    border: 4px solid red;
    padding: 4px;

    background-image: url("https://img.icons8.com/officel/344/duck.png");
    background-size: 30px 30px;
`;

const colorDefs = {
    Cache: {color: "mediumturquoise", bgColor: "#2274A5"},
    Channel: {color: "mediumvioletred", bgColor: "#2274A5"},
    Client: {color: "seagreen", bgColor: "#2274A5"},
    Component: {color: "mediumpurple", bgColor: "#2274A5"},
    Default: {color: "white", bgColor: "#2274A5"},
    Engine: {color: "dodgerblue", bgColor: "#2274A5"},
    Model: {color: "dodgerblue", bgColor: "#2274A5"},
    Processor: {color: "dodgerblue", bgColor: "#2274A5"},
    View: {color: "lightseagreen", bgColor: "#2274A5"},
};

const consoleStyles = {
    h1: "font: 2.5em/1 Arial; color: crimson;",
    h2: "font: 2em/1 Arial; color: orangered;",
    h3: "font: 1.5em/1 Arial; color: olivedrab;",
    bold: "font: bold 1.3em/1 Arial; color: midnightblue;",
    warn: "padding: 0 .5rem; background: crimson; font: 1.6em/1 Arial; color: white;",
};

const bgImageIcons = {
    утка: "https://img.icons8.com/officel/344/duck.png",
    аист: "https://img.icons8.com/officel/2x/flying-stork-with-bundle.png",
    попугай: "https://img.icons8.com/officel/344/parrot.png",
};

export class Logger {
    static enableLog = true;
    static debug(comment: string, color: keyof typeof colorDefs, obj: any = "") {
        Logger.enableLog &&
            console.log(
                "%c".concat(" ", color, " "),
                "color:" +
                    colorDefs[color].color +
                    ";background-color:" +
                    colorDefs[color].bgColor +
                    ";font: 1.5em/1 Arial;padding: 0.2em;border-radius: 0.3em;",
                obj,
            );
    }
    static imgLog(imgName: keyof typeof bgImageIcons, header: string, text: any, bgColor = "white") {
        Logger.enableLog &&
            console.log(
                "%c %c".concat(header),
                'background-image: url("' +
                    bgImageIcons[imgName] +
                    '");background-size: contain;font-size: 1px;padding:15px;background-color:' +
                    bgColor,
                "padding-left:0.5em;font: 2em/1 Arial; color: crimson;",
                "asdsad",
            );
    }

    static log(msg: string, style: keyof typeof consoleStyles, obj: any = "") {
        if (!style || !consoleStyles[style]) {
            style = "bold";
        }
        Logger.enableLog && console.log("%c" + msg, consoleStyles[style], obj);
    }
}
// Logger.debug("comment", colorDefs, "Cache");

/*
Используем плейсхолдеры

Для того, чтобы подставить данные в строку с сообщением, удобнее всего использовать плейсхолдеры.


%o — для объекта
%s — для строки
%d — для десятичного или целого числа
%c

 */

// console_image("https://i.imgur.com/WA5duA1.jpg");

function runtest() {
    // Logger.enableLog = false;
    Logger.debug("comment", "Cache", "asdasd");

    Logger.imgLog("утка", "LOG1", "asdasd", "lightgray");
    Logger.imgLog("аист", "LOG2", "asdasd", "lightgray");
    Logger.imgLog("попугай", "LOG3", "asdasd", "lightgray");

    Logger.log("Заголовок 1", "h1", "sdflkjg");
    Logger.log("Заголовок 2", "h2");
    Logger.log("Заголовок 3", "h3");
    Logger.log("Жирный текст", "bold");
    Logger.log("Ошибка", "warn");

    const styles = [
        "background: linear-gradient(#D33106, #571402)",
        "border: 1px solid #3E0E02",
        "color: white",
        "text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)",
        "box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset",
        "line-height: 40px",
        "text-align: center",
        "font-weight: bold",
    ].join(";");

    console.log("%c a spicy log message ?", styles);
}

runtest();
