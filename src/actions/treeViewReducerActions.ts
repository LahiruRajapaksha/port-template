import { RenderTree } from "../components/Tree";

export enum TreeViewReducerActionTypes {
  ADD_TREE_NODE = "ADD_TREE_NODE",
  DELETE_TREE_NODE = "DELETE_TREE_NODE",
  SET_SELECTED_NODE_ID = "SET_SELECTED_NODE_ID",
  UPDATE_TREE_NODE_NAME = "UPDATE_TREE_NODE_NAME",
}

export type TreeViewReducerActions =
  | {
      type: TreeViewReducerActionTypes.ADD_TREE_NODE;
      payload: RenderTree[];
    }
  | {
      type: TreeViewReducerActionTypes.DELETE_TREE_NODE;
      payload: RenderTree[];
    }
  | {
      type: TreeViewReducerActionTypes.SET_SELECTED_NODE_ID;
      payload: string;
    }
  | {
      type: TreeViewReducerActionTypes.UPDATE_TREE_NODE_NAME;
      payload: RenderTree[];
    };
