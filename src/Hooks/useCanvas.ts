import { createRef } from "react";

export const canvasRef = createRef<fabric.Canvas>();
export const useCanvasRef = () => canvasRef;
