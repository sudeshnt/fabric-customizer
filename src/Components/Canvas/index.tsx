import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useCanvasRef } from "../../Hooks/useCanvas";

const Canvas = () => {
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
    <canvas id="canvas" ref={canvasRef} width="300" height="1000"></canvas>
  );
};

export default Canvas;
