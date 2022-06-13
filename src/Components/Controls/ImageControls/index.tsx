import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ChangeEvent, useRef } from "react";
import isNil from "lodash/isNil";
import { useCanvasRef } from "../../../Hooks/useCanvas";
import { fabric } from "fabric";

const ImageControls = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useCanvasRef();

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!isNil(files) && files?.length > 0) {
      const reader = new FileReader();
      reader.onload = (f) => {
        const data = f.target?.result;
        console.log(data);
        fabric.Image.fromURL(data as string, (img) => {
          var oImg = img.set({
            left: 100,
            top: 100,
            angle: 0,
            width: 100,
            height: 100,
          });
          canvasRef.current?.add(oImg).renderAll();
          var a = canvasRef.current?.setActiveObject(oImg);
        });
      };
      reader.readAsDataURL(files[0]);
      // canvasRef.current?.add(
      //   new fabric.Image(text, {
      //     fontSize,
      //     fill: fontColor,
      //     selectable: true,
      //     left: 100,
      //     top: 100,
      //   })
      // );
    }
  };

  return (
    <div>
      <Button
        icon={<UploadOutlined />}
        onClick={() => fileInputRef.current?.click()}
      >
        Click to Upload
      </Button>
      <input
        type="file"
        accept=".png, .jpg, .jpeg, .svg"
        ref={fileInputRef}
        onChange={handleSelectFile}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageControls;
