import { fabric } from "fabric";
import { createModel } from "@rematch/core";

interface RootState {
  selectedObject: fabric.Object | null;
}

const initialState: RootState = {
  selectedObject: null,
};

export const customize = createModel()({
  state: initialState,
  reducers: {
    setSelectedObject: (state, payload: fabric.Object | null) => {
      return {
        ...state,
        selectedObject: payload,
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
