import { isEmpty } from "lodash";
import { fabric } from "fabric";

export const isBase64 = (value: string | ArrayBuffer) => {
  if (!value) return false;

  const base64regex =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  return base64regex.test(value as string);
};

interface AddCanvasImageOptions {
  src: string | ArrayBuffer;
  options: Partial<fabric.IImageOptions>;
  fabricCanvas: fabric.Canvas | null;
}

export const addFabricImage = async ({
  src,
  fabricCanvas,
  options,
}: AddCanvasImageOptions) => {
  if (isEmpty(options) || !fabricCanvas) return;

  fabric.Image.fromURL(src as string, (img) => {
    const imageObj = img.set({
      left: 100,
      top: 100,
    });
    imageObj.scaleToWidth(options.width ?? 100);
    imageObj.scaleToHeight(options.height ?? 100);
    fabricCanvas.add(imageObj);
    fabricCanvas.renderAll();
  });
};
