import { RenderTree } from "../components/RecursiveTree/RecursiveTree";

export enum TreeViewReducerActionTypes {
  ADD_TREE_NODE = "ADD_TREE_NODE",
  DELETE_TREE_NODE = "DELETE_TREE_NODE",
  SET_SELECTED_NODE_ID = "SET_SELECTED_NODE_ID",
  UPDATE_TREE_NODE_NAME = "UPDATE_TREE_NODE_NAME",
  INITIALIZE_TREE_DATA = "INITIALIZE_TREE_DATA",
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
    }
  | {
      type: TreeViewReducerActionTypes.INITIALIZE_TREE_DATA;
      payload: RenderTree[];
    };
