import { fabric } from "fabric";
import { createModel } from "@rematch/core";

interface InitialState {
  objects: Array<fabric.Object>;
}

const initialState: InitialState = {
  objects: [],
};

export const customize = createModel()({
  state: initialState,
  reducers: {
    placeCanvas: (state, payload: fabric.Canvas) => {
      console.log(payload);
      return {
        ...state,
        canvas: payload,
      };
    },
    addObject: (state, payload: fabric.Object) => {
      return {
        ...state,
        objects: [...state.objects, payload],
      };
    },
  },
  effects: (dispatch) => ({
    async incrementAsync(payload: number, state) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.customize.addItem(payload);
    },
  }),
});
