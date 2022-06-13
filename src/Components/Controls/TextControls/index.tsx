import React, { useState } from "react";
import { Input, Slider, Button, Form } from "antd";
import { TextControlsContainer } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "../../../Store";
import { fabric } from "fabric";
import { useCanvasRef } from "../../../Hooks/useCanvas";

const defaultText = "";
const defaultFontColor = "#000000";
const defaultFontSize = 11;

const TextControls = () => {
  const dispatch = useDispatch<Dispatch>();
  const canvasRef = useCanvasRef();
  const [text, setText] = useState(defaultText);
  const [fontSize, setFontSize] = useState(defaultFontSize);
  const [fontColor, setFontColor] = useState(defaultFontColor);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onChangeFontSize = (value: number) => {
    setFontSize(value);
  };

  const onChangeFontColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontColor(e.target.value);
  };

  const onAddText = () => {
    // dispatch.customize.addObject(new fabric.Text("asd", {}));
    if (!text) return;

    canvasRef.current?.add(
      new fabric.Text(text, {
        fontSize,
        fill: fontColor,
        selectable: true,
        left: 100,
        top: 100,
      })
    );
    clearInputs();
    // canvasRef.current?.renderAll();
  };

  const clearInputs = () => {
    setText(defaultText);
    setFontSize(defaultFontSize);
    setFontColor(defaultFontColor);
  };

  return (
    <TextControlsContainer>
      <Form layout="vertical">
        <Form.Item label="Text">
          <Input value={text} onChange={onChangeText} />
        </Form.Item>
        <Form.Item label="Font Size">
          <Slider
            min={10}
            max={100}
            onChange={onChangeFontSize}
            value={fontSize}
          />
        </Form.Item>
        <Form.Item label="Font Color">
          <input
            title="Select"
            type="color"
            value={fontColor}
            onChange={onChangeFontColor}
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={onAddText}>Add Text</Button>
        </Form.Item>
      </Form>
    </TextControlsContainer>
  );
};

export default TextControls;
