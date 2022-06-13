import { Button, Form, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ChangeEvent, useRef, useState } from "react";
import isNil from "lodash/isNil";
import { useCanvasRef } from "../../../Hooks/useCanvas";
import { fabric } from "fabric";

const defaultImageWidth = 100;
const defaultImageHeight = 100;

const ImageControls = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useCanvasRef();
  const [image, setImage] = useState<string | ArrayBuffer | null>();
  const [imageWidth, setImageWidth] = useState(defaultImageWidth);
  const [imageHeight, setImageHeight] = useState(defaultImageHeight);

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!isNil(files) && files?.length > 0) {
      const reader = new FileReader();
      reader.onload = (f) => {
        const data = f.target?.result;
        setImage(data);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const onAddImage = () => {
    if (!image) return;

    fabric.Image.fromURL(image as string, (img) => {
      const imageObj = img.set({
        left: 100,
        top: 100,
      });
      imageObj.scaleToWidth(imageWidth || defaultImageWidth);
      imageObj.scaleToHeight(imageHeight || defaultImageWidth);
      console.log(imageObj);

      canvasRef.current?.add(imageObj).renderAll();
    });
  };

  const onDimensionsChanged = (
    type: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (type === "width") {
      setImageWidth(parseInt(e.target.value));
      return;
    }
    setImageHeight(parseInt(e.target.value));
  };
  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Image">
          <Button
            icon={<UploadOutlined />}
            onClick={() => fileInputRef.current?.click()}
          >
            Select Image
          </Button>
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .svg"
            ref={fileInputRef}
            onChange={handleSelectFile}
            style={{ display: "none" }}
          />
        </Form.Item>
        {image && (
          <Form.Item>
            <img src={image as string} width="100" height="100" />
          </Form.Item>
        )}
        <Form.Item label="Image Width & Height">
          <span>
            <Input
              type="number"
              value={imageWidth}
              onChange={(e) => onDimensionsChanged("width", e)}
              style={{ width: 100 }}
            />
            <Input
              type="number"
              value={imageHeight}
              onChange={(e) => onDimensionsChanged("height", e)}
              style={{ width: 100 }}
            />
          </span>
        </Form.Item>
        <Form.Item>
          <Button onClick={onAddImage}>Add Image</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ImageControls;
