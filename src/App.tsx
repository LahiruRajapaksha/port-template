import { useRef, useState } from "react";
import "./App.css";
import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddButton from "./components/AddButton";
import Tree, { RenderTree } from "./components/TreeView";

function App() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [treeData, setTreeData] = useState<RenderTree[]>([]);
  const nodeIdRef = useRef<string>("");

  console.log("nodeIdRef: ", nodeIdRef);

  const updateNodeNameData = (
    nodeData: RenderTree[],
    newTextValue: string
  ): RenderTree[] => {
    return nodeData.map((node) => {
      if (node.id === nodeIdRef.current) {
        return {
          ...node,
          name: newTextValue,
        };
      } else if (node.children.length > 0) {
        return {
          ...node,
          children: updateNodeNameData(node.children, newTextValue),
        };
      }
      return node;
    });
  };

  const addNewNode = (
    nodeData: RenderTree[],
    newNode: RenderTree
  ): RenderTree[] => {
    return nodeData.map((node) => {
      if (node.id === nodeIdRef.current) {
        console.log("1");
        return {
          ...node,
          children: [...node.children, newNode],
        };
      } else if (node.children.length > 0) {
        console.log("2");
        return {
          ...node,
          children: addNewNode(node.children, newNode),
        };
      }
      console.log("3");
      return node;
    });
  };

  const handleAddButtonClick = () => {
    const id = Math.ceil(Math.random() * 1000).toString();
    if (nodeIdRef.current === "") {
      setTreeData((prev) => [
        ...prev,
        {
          id: id,
          name: `Element-${id}`,
          children: [],
          isButtonsVisible: true,
        },
      ]);
    } else {
      setTreeData((prev) => {
        return addNewNode(prev, {
          id: id,
          name: `Element-${id}`,
          children: [],
          isButtonsVisible: true,
        });
      });
    }
  };

  const deleteNode = (nodeData: RenderTree[]): RenderTree[] => {
    return nodeData.filter((node) => {
      if (node.id === nodeIdRef.current) {
        return false;
      } else if (node.children.length > 0) {
        node.children = deleteNode(node.children);
      }
      return true;
    });
  };

  const handleDeleteButtonClick = () => {
    setTreeData((prev) => deleteNode([...prev]));
    nodeIdRef.current = "";
  };
  // console.log("nodeIdRef: ", nodeIdRef.current);
  const handleTextFieldChange = (
    // e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    nodeId: string
  ) => {
    // const { value } = e.target;
    // console.log("Value: ", value);
    console.log("nodeId: ", nodeId);
    // const newTreeData = [...treeData];
    // const node = newTreeData.find((node) => node.id === selectedId);
    // if (node) {
    //   node.name = value;
    //   setTreeData(newTreeData);
    // }
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
            <Typography>Port Template</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" justifyContent="space-around">
              <Box mr="auto">
                <AddButton onClick={handleAddButtonClick} text="+" />
              </Box>
              <Box display="flex" justifyContent="space-between">
                <AddButton onClick={handleAddButtonClick} text="+" />
                <AddButton onClick={handleAddButtonClick} text="+" />
              </Box>
            </Box>
            <Box p={1}>
              {treeData.map((node) => (
                <Tree
                  key={node.id}
                  treeData={node}
                  handleTextFieldChange={handleTextFieldChange}
                  nodeIdRef={nodeIdRef}
                  handleDeleteButtonClick={handleDeleteButtonClick}
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
