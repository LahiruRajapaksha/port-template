import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddButton from "./AddButton";
import { useState } from "react";

export type RenderTree = {
  id: string;
  name: string;
  children: RenderTree[];
  isButtonsVisible: boolean;
};

type TreeProps = {
  treeData: RenderTree;
  handleTextFieldChange: (
    // e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    nodeId: string
  ) => void;
  nodeIdRef: React.MutableRefObject<string>;
  handleDeleteButtonClick: () => void;
};

const Tree = (props: TreeProps) => {
  const {
    treeData,
    nodeIdRef,
    handleTextFieldChange,
    handleDeleteButtonClick,
  } = props;
  // const [textValue, setTextValue] = useState<string>(treeData.name);
  console.log("treeData: ", treeData);

  // handleTextFieldChange(e, treeData.id)
  const TreeItem = ({ name }: { name: string }) => {
    return (
      <Box display="flex" width={1} p={1}>
        <Box>
          <TextField
            onFocus={() => (nodeIdRef.current = treeData.id)}
            // value={textValue}
            onChange={() => handleTextFieldChange(treeData.id)}
          />
        </Box>
        <Box display="flex" ml="auto">
          <AddButton text="-" onClick={handleDeleteButtonClick} />
          <AddButton text="+" onClick={() => null} />
        </Box>
      </Box>
    );
  };
  return (
    <>
      {treeData.id && <TreeItem name={treeData.name} />}
      {Array.isArray(treeData.children) && treeData.children.length > 0 && (
        <Box ml={2}>
          {treeData.children.map((node: RenderTree) => (
            <Tree
              key={node.id}
              treeData={node}
              handleTextFieldChange={handleTextFieldChange}
              nodeIdRef={nodeIdRef}
              handleDeleteButtonClick={handleDeleteButtonClick}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default Tree;
