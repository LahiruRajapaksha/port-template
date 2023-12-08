import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import AddRemoveButton from "../components/AddRemoveButton";

export default function Documents() {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Box
      width="70%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      m={1}
    >
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded((prev) => !prev)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" justifyContent="space-between" width={1}>
            <Typography variant="h5">Documents</Typography>
            <Box display="flex" justifyContent="flex-end" mr={1}>
              <AddRemoveButton onClick={() => null} padding={2} margin="3px">
                <AddIcon />
              </AddRemoveButton>
            </Box>
          </Box>
        </AccordionSummary>
      </Accordion>
    </Box>
  );
}
