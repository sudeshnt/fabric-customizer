import { useEffect, useRef } from "react";
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
        selection: false,
        width: canvasParentElementRef.current?.clientWidth,
        height: canvasParentElementRef.current?.clientHeight,
        renderOnAddRemove: false,
        enableRetinaScaling: false,
        skipOffscreen: true,
      });

      // on click an object in the canvas
      canvas.on("mouse:down", (options) => {
        if (options.target) {
          dispatch.customize.setSelectedObject(options.target);
          return;
        }
        dispatch.customize.setSelectedObject(null);
      });

      // canvas.add(
      //   new fabric.Text("text 2", {
      //     left: 100,
      //     top: 100,
      //     fill: "#FF0000",
      //     fontSize: 25,
      //     data: {
      //       type: ObjectType.Text,
      //     },
      //   })
      // );
      // canvas.renderAll();
      // fabric.Image.fromURL("tshirt.jpeg" as string, (img) => {
      //   const imageObj = img.set({
      //     left: 150,
      //     top: 150,
      //     data: {
      //       type: ObjectType.Image,
      //     },
      //   });
      //   imageObj.scaleToWidth(75);
      //   imageObj.scaleToHeight(75);

      //   canvas.add(imageObj);
      //   canvas.renderAll();
      // });

      // @ts-ignore
      fabricCanvasRef.current = canvas;
    });
  }, []);

  return (
    <div ref={canvasParentElementRef} className="canvas-parent">
      <canvas id="canvas" ref={canvasRef} width="300" height="1000"></canvas>
    </div>
  );
};

export default Canvas;
