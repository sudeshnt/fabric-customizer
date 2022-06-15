import React, { useEffect, useState } from "react";
import { Input, Slider, Button, Form } from "antd";
import { TextControlsContainer } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store";
import { fabric } from "fabric";
import { useCanvasRef } from "../../../Hooks/useCanvas";
import { ObjectType } from "..";

const defaultText = "";
const defaultFontColor = "#000000";
const defaultFontSize = 11;

const TextControls = () => {
  const canvasRef = useCanvasRef();
  const selectedObject = useSelector(
    (state: RootState) => state.customize.selectedObject
  );
  const textObject =
    selectedObject && selectedObject.data?.type === ObjectType.Text
      ? (selectedObject as fabric.Text)
      : null;

  const [text, setText] = useState(defaultText);
  const [fontSize, setFontSize] = useState(defaultFontSize);
  const [fontColor, setFontColor] = useState(defaultFontColor);

  useEffect(() => {
    if (textObject) {
      setText(textObject.get("text") ?? defaultText);
      setFontSize(textObject.get("fontSize") ?? defaultFontSize);
      setFontColor((textObject.get("fill") as string) ?? defaultFontColor);
    } else {
      clearInputs();
    }
  }, [textObject]);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onChangeFontSize = (value: number) => {
    setFontSize(value);
  };

  const onChangeFontColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontColor(e.target.value);
  };

  const onSubmit = () => {
    // dispatch.customize.addObject(new fabric.Text("asd", {}));
    if (!text) return;

    if (textObject) {
      textObject.set("text", text);
      textObject.set("fontSize", fontSize);
      textObject.set("fill", fontColor);
      canvasRef.current?.renderAll();
    } else {
      canvasRef.current?.add(
        new fabric.Text(text, {
          fontSize,
          fill: fontColor,
          selectable: true,
          left: 100,
          top: 100,
        })
      );
    }
    canvasRef.current?.renderAll();
    clearInputs();
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
        <Form.Item label={`Font Size: ${fontSize}`}>
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
          <Button onClick={onSubmit}>
            {selectedObject ? "Update Text" : "Add Text"}
          </Button>
        </Form.Item>
      </Form>
    </TextControlsContainer>
  );
};

export default TextControls;
