/** @jsx jsx */
import React, {useEffect, useRef, useState} from "react";
import styled from "@emotion/styled";
import {jsx, css, SerializedStyles} from "@emotion/react";

const baseCSS = css`
    width: 500px;
    height: 200px;
    border: 4px solid red;
    padding: 4px;
`;

export function ImageUploadUrlNoCanvas() {
    const [imgSrc, setimgSrc] = useState<string>("");

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        // if (imgSrc) URL.revokeObjectURL(imgSrc);

        if (!evt.currentTarget.files?.length) {
            setimgSrc("");
            return;
        }

        const fl: File = evt.currentTarget.files![0];
        // console.log(fl);
        setimgSrc(URL.createObjectURL(fl));
    };

    return (
        <div>
            <label>Image File:</label>
            <br />
            <input type="file" id="imageLoader" name="imageLoader" onChange={handleChange} />
            <br />
            {imgSrc && (
                <img
                    css={css`
                        ${baseCSS};
                        background-color: lightblue;
                        object-fit: contain;
                    `}
                    src={imgSrc}
                    onLoad={() => {
                        URL.revokeObjectURL(imgSrc!);
                    }}
                />
            )}
        </div>
    );
}
