import React from "react";
import ImageUploader from "react-images-upload";

// type obj<T> = {T};

type tProps = {
    withIcon: boolean;
    imgExtension: string[];
    maxFileSize: number;
};

export const UploadImage: React.FC<tProps> = (props) => {
    const [pictures, setPictures] = React.useState<string[]>([]);

    function onChange(files: File[], picturesInp: string[]) {
        setPictures([...pictures, ...picturesInp]);
    }
    return (
        <ImageUploader
            {...props}
            withIcon={true}
            onChange={onChange}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
        />
    );
};
