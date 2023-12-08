import {
  TreeViewReducerActionTypes,
  TreeViewReducerActions,
} from "../actions/treeViewReducerActions";
import { RenderTree } from "../components/RecursiveTree/RecursiveTree";

export type TreeViewState = {
  treeData: RenderTree[];
  selectedNodeId: string;
};

export const TreeViewInitState: TreeViewState = {
  treeData: [],
  selectedNodeId: "",
};

export const TreeViewReducer = (
  prevState: TreeViewState,
  action: TreeViewReducerActions
) => {
  switch (action.type) {
    case TreeViewReducerActionTypes.ADD_TREE_NODE:
      return {
        ...prevState,
        treeData: action.payload,
      };
    case TreeViewReducerActionTypes.DELETE_TREE_NODE:
      return {
        ...prevState,
        treeData: action.payload,
      };
    case TreeViewReducerActionTypes.SET_SELECTED_NODE_ID:
      return {
        ...prevState,
        selectedNodeId: action.payload,
      };
    case TreeViewReducerActionTypes.UPDATE_TREE_NODE_NAME:
      return {
        ...prevState,
        treeData: action.payload,
      };
    default:
      return prevState;
  }
};
