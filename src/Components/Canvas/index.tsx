import { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useCanvasRef } from "../../Hooks/useCanvas";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../Store";

const Canvas = () => {
  const dispatch = useDispatch<Dispatch>();
  const fabricCanvasRef = useCanvasRef();
  const canvasParentElementRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !canvasParentElementRef) return;

    fabric.Image.fromURL("tshirt.jpeg", (img) => {
      const canvas = new fabric.Canvas(canvasRef.current, {
        backgroundImage: img,
        height: 1000,
        width: 1000,
      });
      // @ts-ignore
      fabricCanvasRef.current = canvas;
    });
  }, []);

  return (
    // <div className="canvas-container" ref={canvasParentElementRef}>
    <canvas id="canvas" ref={canvasRef} width="300" height="1000"></canvas>
    // </div>
  );
};

export default Canvas;
