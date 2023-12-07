import { useState, useReducer } from "react";
import "./App.css";
import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Tree, { RenderTree } from "./components/TreeView";
import { TreeViewInitState, TreeViewReducer } from "./reducers/TreeViewReducer";
import AddRemoveButton from "./components/AddRemoveButton";

function App() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [state, dispatch] = useReducer(TreeViewReducer, TreeViewInitState);
  const { treeData, selectedNodeId } = state;
  const [selectedId, setSelectedId] = useState<string>("");
  const addNewNode = (
    nodeData: RenderTree[],
    newNode: RenderTree
  ): RenderTree[] => {
    return nodeData.map((node) => {
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
      name: "",
      children: [],
      isButtonsVisible: true,
      isSelected: false,
    };

    const updateNodesRecursive = (nodes: RenderTree[]): RenderTree[] => {
      return nodes.map((node) => ({
        ...node,
        isButtonsVisible: false,
        isSelected: false,
        children: updateNodesRecursive(node.children),
      }));
    };

    const updatedNodes = updateNodesRecursive(treeData);

    dispatch({
      type: "ADD_TREE_NODE",
      payload:
        selectedNodeId === ""
          ? [...updatedNodes, newNode]
          : addNewNode(updatedNodes, newNode),
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
      type: "DELETE_TREE_NODE",
      payload: deleteNode([...treeData]),
    });
    dispatch({
      type: "SET_SELECTED_NODE_ID",
      payload: "",
    });
  };

  const updateNodeNameData = (
    nodeData: RenderTree[],
    nodeId: string,
    newTextValue: string
  ): RenderTree[] => {
    return nodeData.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          name: newTextValue,
        };
      } else if (node.children.length > 0) {
        return {
          ...node,
          children: updateNodeNameData(node.children, nodeId, newTextValue),
        };
      }
      return node;
    });
  };

  const handleTextFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    nodeId: string
  ) => {
    console.log("handleTextFieldChange");
    dispatch({
      type: "SET_SELECTED_NODE_ID",
      payload: nodeId,
    });
    dispatch({
      type: "UPDATE_TREE_NODE_NAME",
      payload: updateNodeNameData([...treeData], nodeId, e.target.value),
    });
  };

  const handleIsNodeSelected = (nodeId: string) => {
    if (nodeId === selectedNodeId) {
      return true;
    }
  };

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
                <AddRemoveButton
                  variant="outlined"
                  onClick={handleDeleteButtonClick}
                  padding={2}
                  margin="3px"
                >
                  -
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
              {treeData.map((node) => (
                <Tree
                  key={node.id}
                  treeData={node}
                  handleTextFieldChange={handleTextFieldChange}
                  handleDeleteButtonClick={handleDeleteButtonClick}
                  dispatch={dispatch}
                  handleAddButtonClick={handleAddButtonClick}
                  isSelected={selectedId}
                  setSelectedId={setSelectedId}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export default App;
