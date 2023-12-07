import { useState, useReducer } from "react";
import "./App.css";
import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import { TreeViewInitState, TreeViewReducer } from "./reducers/TreeViewReducer";
import AddRemoveButton from "./components/AddRemoveButton";
import CustomTree, { RenderTree } from "./components/Tree";
import { TreeViewReducerActionTypes } from "./actions/treeViewReducerActions";

function App() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [state, dispatch] = useReducer(TreeViewReducer, TreeViewInitState);
  const { treeData, selectedNodeId } = state;

  const addNewNode = (
    nodeData: RenderTree[],
    newNode: RenderTree
  ): RenderTree[] => {
    return nodeData.map((node) => {
      console.log("updatedNodes");
      if (node.id === selectedNodeId) {
        return {
          ...node,
          children: [...node.children, newNode],
          isButtonsVisible: false,
        };
      } else if (node.children.length > 0) {
        return {
          ...node,
          children: addNewNode(node.children, newNode),
        };
      }
      return node;
    });
  };

  const handleAddButtonClick = () => {
    const id = Math.ceil(Math.random() * 1000).toString();
    const newNode: RenderTree = {
      id: id,
      name: `Node ${id}`,
      children: [],
      isButtonsVisible: true,
    };

    const updateNodesRecursive = (nodes: RenderTree[]): RenderTree[] => {
      return nodes.map((node) => ({
        ...node,
        isButtonsVisible: false,
        children: updateNodesRecursive(node.children),
      }));
    };

    const updatedNodes = updateNodesRecursive(treeData);

    dispatch({
      type: TreeViewReducerActionTypes.ADD_TREE_NODE,
      payload:
        selectedNodeId === ""
          ? [...updatedNodes, newNode]
          : addNewNode(updatedNodes, newNode),
    });
    dispatch({
      type: TreeViewReducerActionTypes.SET_SELECTED_NODE_ID,
      payload: "",
    });
  };

  const deleteNode = (nodeData: RenderTree[]): RenderTree[] => {
    return nodeData.filter((node) => {
      if (node.id === selectedNodeId) {
        return false;
      } else if (node.children.length > 0) {
        node.children = deleteNode(node.children);
      }
      return true;
    });
  };

  const handleDeleteButtonClick = () => {
    dispatch({
      type: TreeViewReducerActionTypes.DELETE_TREE_NODE,
      payload: deleteNode([...treeData]),
    });
    dispatch({
      type: TreeViewReducerActionTypes.SET_SELECTED_NODE_ID,
      payload: "",
    });
  };

  // const updateNodeNameData = (
  //   nodeData: RenderTree[],
  //   nodeId: string,
  //   newTextValue: string
  // ): RenderTree[] => {
  //   return nodeData.map((node) => {
  //     if (node.id === nodeId) {
  //       return {
  //         ...node,
  //         name: newTextValue,
  //       };
  //     } else if (node.children.length > 0) {
  //       return {
  //         ...node,
  //         children: updateNodeNameData(node.children, nodeId, newTextValue),
  //       };
  //     }
  //     return node;
  //   });
  // };

  return (
    <Box width={1} display="flex" justifyContent="center" height={1} p={1}>
      <Box
        width="70%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Accordion
          expanded={expanded}
          onChange={() => setExpanded((prev) => !prev)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">Port Template</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" justifyContent="space-around">
              <Box mr="auto" display="flex">
                <AddRemoveButton
                  variant="outlined"
                  onClick={handleAddButtonClick}
                  padding={2}
                  margin="3px"
                >
                  +
                </AddRemoveButton>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <AddRemoveButton
                  variant="outlined"
                  onClick={() => null}
                  padding={2}
                  margin="3px"
                >
                  Back
                </AddRemoveButton>
                <AddRemoveButton
                  variant="contained"
                  onClick={() => null}
                  padding={2}
                  margin="3px"
                >
                  Save
                </AddRemoveButton>
              </Box>
            </Box>
            <Box p={1}>
              <CustomTree
                treeData={treeData}
                dispatch={dispatch}
                selectedNodeId={selectedNodeId}
                handleDeleteButtonClick={handleDeleteButtonClick}
                handleAddButtonClick={handleAddButtonClick}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export default App;
