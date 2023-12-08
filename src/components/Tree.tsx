/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";
import AddRemoveButton from "./AddRemoveButton";
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

type CustomTreeProps = {
  treeData: RenderTree[];
  dispatch: React.Dispatch<TreeViewReducerActions>;
  selectedNodeId: string;
  handleAddButtonClick: () => void;
  selectedNodeRef: React.MutableRefObject<string>;
};

const CustomTree = (props: CustomTreeProps) => {
  const {
    treeData,
    selectedNodeId,
    dispatch,
    handleAddButtonClick,
    selectedNodeRef,
  } = props;
  const [selNodeId, setSelNodeId] = useState<string>("");
  console.log("selectedNodeRef.current", selectedNodeRef.current);

  const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
    selectedNodeRef.current = nodeId;
    setSelNodeId(nodeId);
    // dispatch({
    //   type: TreeViewReducerActionTypes.SET_SELECTED_NODE_ID,
    //   payload: nodeId,
    // });
  };

  const deleteNode = (nodeData: RenderTree[]): RenderTree[] => {
    return nodeData.filter((node) => {
      if (node.id === selectedNodeRef.current) {
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
    selectedNodeRef.current = "";
  };

  const TreeNode = ({ node }: { node: RenderTree }) => {
    return (
      <Box display="flex" width={1} pl={1} pb={1} alignItems="center">
        <Box>
          <TextField defaultValue={node.name} />
        </Box>
        {(selNodeId === node.id ||
          (node.isButtonsVisible && selectedNodeRef.current === "")) && (
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
    );
  };
  const renderTree = (nodes: RenderTree[]) =>
    nodes.map((node) => {
      return (
        <TreeItem
          key={node.id}
          nodeId={node.id}
          label={<TreeNode node={node} />}
        >
          {Array.isArray(node.children) ? renderTree(node.children) : null}
        </TreeItem>
      );
    });

  return (
    <Box>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeSelect={handleSelect}
      >
        {renderTree(treeData)}
      </TreeView>
    </Box>
  );
};

export default CustomTree;
