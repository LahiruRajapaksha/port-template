import { Box, IconButton, Switch, Typography } from "@mui/material";
import React from "react";
import CustomTextField from "../TextField";
import AddRemoveButton from "../AddRemoveButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./RecursiveTree.css";
import {
  TreeViewReducerActionTypes,
  TreeViewReducerActions,
} from "../../actions/treeViewReducerActions";

export type RenderTree = {
  id: string;
  name: string;
  isButtonsVisible?: boolean;
  children: RenderTree[];
};

type RecursiveComponentProps = {
  data: RenderTree[];
  handleAddButtonClick: () => void;
  handleDeleteButtonClick: () => void;
  handleUpdateNode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedNodeId: string;
  dispatch: React.Dispatch<TreeViewReducerActions>;
};

const RecursiveComponent = (props: RecursiveComponentProps) => {
  const {
    data,
    selectedNodeId,
    handleAddButtonClick,
    handleDeleteButtonClick,
    handleUpdateNode,
    dispatch,
  } = props;
  const [checked, setChecked] = React.useState(false);
  const handleReadOnlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Box pl="20px" className="parentWrapper">
      {data.map((item) => (
        <Box key={item.id} className="parent">
          <Box display="flex" width={1} mb={1} alignItems="center">
            <Box width="50%">
              <CustomTextField
                onClick={() =>
                  dispatch({
                    type: TreeViewReducerActionTypes.SET_SELECTED_NODE_ID,
                    payload: item.id,
                  })
                }
                onChange={handleUpdateNode}
                disableUnderline
                defaultValue={item.name}
                readOnly={checked && selectedNodeId === item.id}
              />
            </Box>

            {(selectedNodeId === item.id ||
              (selectedNodeId == "" && item.isButtonsVisible)) && (
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
                    <Switch checked={checked} onChange={handleReadOnlyChange} />
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
                  variant="outlined"
                  onClick={handleAddButtonClick}
                  padding={2}
                  margin="3px"
                >
                  <AddIcon />
                </AddRemoveButton>
              </Box>
            )}
          </Box>
          {item.children && (
            <RecursiveComponent
              data={item.children}
              handleAddButtonClick={handleAddButtonClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
              selectedNodeId={selectedNodeId}
              handleUpdateNode={handleUpdateNode}
              dispatch={dispatch}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default RecursiveComponent;
