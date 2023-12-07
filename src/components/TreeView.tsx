import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";
import AddRemoveButton from "./AddRemoveButton";

export type RenderTree = {
  id: string;
  name: string;
  children: RenderTree[];
  isButtonsVisible: boolean;
  isSelected?: boolean;
};

type TreeProps = {
  treeData: RenderTree;
  handleTextFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    nodeId: string
  ) => void;
  handleDeleteButtonClick: () => void;
  dispatch: React.Dispatch<any>;
  handleAddButtonClick: () => void;
  isSelected: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
};

const Tree = (props: TreeProps) => {
  const {
    treeData,
    handleTextFieldChange,
    handleDeleteButtonClick,
    handleAddButtonClick,
    dispatch,
    isSelected,
    setSelectedId,
  } = props;

  const TreeItem = () => {
    return (
      <Box
        display="flex"
        width={1}
        pl={1}
        pb={1}
        borderLeft={1}
        alignItems="center"
      >
        <Box>
          <TextField
            defaultValue={treeData.name}
            onBlur={(e) => handleTextFieldChange(e, treeData.id)}
            // onFocus={() => {
            //   console.log("onFocus");
            //   setSelectedId(treeData.id);
            // }}
          />
        </Box>
        {treeData.isButtonsVisible && !isSelected && (
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

  return (
    <>
      {treeData.id && <TreeItem />}
      {Array.isArray(treeData.children) && treeData.children.length > 0 && (
        <Box ml={1}>
          {treeData.children.map((node: RenderTree) => (
            <Tree
              key={node.id}
              treeData={node}
              handleTextFieldChange={handleTextFieldChange}
              handleDeleteButtonClick={handleDeleteButtonClick}
              dispatch={dispatch}
              handleAddButtonClick={handleAddButtonClick}
              setSelectedId={setSelectedId}
              isSelected={isSelected}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default Tree;
