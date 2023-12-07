export const TreeViewInitState = {
  treeData: [],
  selectedNodeId: "",
};

export const TreeViewReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_TREE_NODE":
      return {
        ...prevState,
        treeData: action.payload,
      };
    case "DELETE_TREE_NODE":
      return {
        ...prevState,
        treeData: action.payload,
      };
    case "SET_SELECTED_NODE_ID":
      return {
        ...prevState,
        selectedNodeId: action.payload,
      };
    case "UPDATE_TREE_NODE_NAME":
      return {
        ...prevState,
        treeData: action.payload,
      };
    default:
      return prevState;
  }
};
