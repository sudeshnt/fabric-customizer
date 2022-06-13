import { Models } from "@rematch/core";
import { customize } from "./model";

import { init, RematchDispatch, RematchRootState } from "@rematch/core";

export interface RootModel extends Models<RootModel> {
  customize: typeof customize;
}
export const models: RootModel = { customize };
export const store = init({
  models,
});
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
