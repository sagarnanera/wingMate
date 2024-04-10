// image editor using @toast-ui/react-image-editor

import React, { useState } from "react";
import PropTypes from "prop-types";

import ReactImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";

const ImageEditor = ({ imageUrl }) => {
  //   const [imageEditor, setImageEditor] = useState(null);

  //   const handleLoad = () => {
  //     const tuiImageEditor = new ImageEditor(
  //       document.querySelector("#tui-image-editor"),
  //       {
  //         includeUI: {
  //           loadImage: {
  //             path: imageUrl,
  //             name: "SampleImage",
  //           },
  //           theme: {
  //             "menu.normalIcon.path": "/static/media/icon-d.svg",
  //             "menu.activeIcon.path": "/static/media/icon-b.svg",
  //             "menu.disabledIcon.path": "/static/media/icon-a.svg",
  //             "menu.hoverIcon.path": "/static/media/icon-c.svg",
  //             "submenu.normalIcon.path": "/static/media/icon-d.svg",
  //             "submenu.activeIcon.path": "/static/media/icon-c.svg",
  //           },
  //           menu: ["shape", "filter"],
  //           initMenu: "filter",
  //           uiSize: {
  //             width: "100%",
  //             height: "100%",
  //           },
  //           menuBarPosition: "bottom",
  //         },
  //         cssMaxWidth: 700,
  //         cssMaxHeight: 500,
  //       }
  //     );

  //     setImageEditor(tuiImageEditor);
  //   };

  return (
    <ReactImageEditor
      includeUI={{
        loadImage: {
          path: imageUrl,
          name: "SampleImage",
        },
        theme: {
          "menu.normalIcon.path": "/static/media/icon-d.svg",
          "menu.activeIcon.path": "/static/media/icon-b.svg",
          "menu.disabledIcon.path": "/static/media/icon-a.svg",
          "menu.hoverIcon.path": "/static/media/icon-c.svg",
          "submenu.normalIcon.path": "/static/media/icon-d.svg",
          "submenu.activeIcon.path": "/static/media/icon-c.svg",
        },
        menu: ["shape", "filter", "crop"],
        initMenu: "filter",
        uiSize: {
          width: "100%",
          height: "100%",
        },
        menuBarPosition: "bottom",
      }}
      usageStatistics={false}
      selectionStyle={{
        cornerSize: 20,
        rotatingPointOffset: 70,
      }}
      cssMaxHeight={500}
      cssMaxWidth={700}
      onImageSave={(data) => {
        console.log(data);
      }}
      onCrop={(data) => {
        console.log(data);
      }}
      crop={(data) => {
        console.log(data);
      }}
    />
  );
};

// prop validation
ImageEditor.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default ImageEditor;
