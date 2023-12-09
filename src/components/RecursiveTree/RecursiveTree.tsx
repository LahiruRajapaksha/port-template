import { Box, IconButton, Switch, Typography } from "@mui/material";
import React from "react";
import CustomTextField from "../TextField";
import AddRemoveButton from "../AddRemoveButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import "./RecursiveTree.css";

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
    handleDeleteButtonClick,
    handleUpdateNode,
    setselectedNodeId,
  } = props;

  return (
    <Box pl="20px" className="parentWrapper">
      {data.map((item) => (
        <Box key={item.id} className="parent">
          <Box display="flex" width={1} mb={1} alignItems="center">
            <Box width="50%">
              <CustomTextField
                onClick={() => setselectedNodeId(item.id)}
                onChange={handleUpdateNode}
                disableUnderline
                defaultValue={item.name}
              />
            </Box>

            {selectedNodeId === item.id && (
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
              level={level + 1}
              handleAddButtonClick={handleAddButtonClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
              setselectedNodeId={setselectedNodeId}
              selectedNodeId={selectedNodeId}
              handleUpdateNode={handleUpdateNode}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default RecursiveComponent;
