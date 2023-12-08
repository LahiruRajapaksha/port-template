import { Box, IconButton, Switch, Typography } from "@mui/material";
import React from "react";
import CustomTextField from "./TextField";
import AddRemoveButton from "./AddRemoveButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  TreeViewReducerActionTypes,
  TreeViewReducerActions,
} from "../actions/treeViewReducerActions";

export type RenderTree = {
  id: string;
  name: string;
  isButtonsVisible: boolean;
  children: RenderTree[];
};

type RecursiveComponentProps = {
  data: RenderTree[];
  dispatch: React.Dispatch<TreeViewReducerActions>;
  handleAddButtonClick: () => void;
  level?: number;
  setselectedNodeId: React.Dispatch<React.SetStateAction<string>>;
  selectedNodeId: string;
};

const RecursiveComponent = (props: RecursiveComponentProps) => {
  const {
    data,
    level = 0,
    selectedNodeId,
    handleAddButtonClick,
    setselectedNodeId,
    dispatch,
  } = props;

  const deleteNode = (
    nodeData: RenderTree[],
    selectedNode: string
  ): RenderTree[] => {
    return nodeData.filter((node) => {
      if (node.id === selectedNode) {
        return false;
      } else if (node.children.length > 0) {
        node.children = deleteNode(node.children, selectedNode);
      }
      return true;
    });
  };

  const handleDeleteButtonClick = () => {
    dispatch({
      type: TreeViewReducerActionTypes.DELETE_TREE_NODE,
      payload: deleteNode([...data], selectedNodeId),
    });
    setselectedNodeId("");
  };

  return (
    <Box ml={`${level * 20}px`}>
      {data.map((item) => (
        <Box key={item.id}>
          <Box display="flex" width={1} pl={1} pb={1} alignItems="center">
            <Box>
              <CustomTextField onClick={() => setselectedNodeId(item.id)} />
            </Box>

            {(selectedNodeId === item.id ||
              (item.isButtonsVisible && selectedNodeId === "")) && (
              <Box display="flex" ml="auto" alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  bgcolor="#e0e0e0"
                  p={1}
                  borderRadius={1}
                  height="30px"
                >
                  <Box display="flex" alignItems="center">
                    <Typography>Read Only</Typography>
                    <Switch />
                  </Box>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={handleDeleteButtonClick}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <AddRemoveButton
                  variant="contained"
                  onClick={handleAddButtonClick}
                  padding={2}
                  margin="3px"
                >
                  +
                </AddRemoveButton>
              </Box>
            )}
          </Box>
          {item.children && (
            <RecursiveComponent
              data={item.children}
              level={level + 1}
              handleAddButtonClick={handleAddButtonClick}
              setselectedNodeId={setselectedNodeId}
              selectedNodeId={selectedNodeId}
              dispatch={dispatch}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default RecursiveComponent;
