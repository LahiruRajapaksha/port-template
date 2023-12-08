import { useState } from "react";
import { AccordionDetails, Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  BranchBox,
  EntryBox,
  TextFieldBox,
  TreeBox,
} from "../components/CustomBox";

export default function Fields() {
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
            <Typography variant="h5">Fields</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TreeBox>
            <BranchBox>
              <EntryBox>
                <TextFieldBox>Husband</TextFieldBox>
                <BranchBox>
                  <EntryBox>
                    <TextFieldBox>Father</TextFieldBox>
                    <BranchBox>
                      <EntryBox>
                        <TextFieldBox>Grandfather</TextFieldBox>
                      </EntryBox>
                      <EntryBox>
                        <TextFieldBox>Grandmother</TextFieldBox>
                      </EntryBox>
                    </BranchBox>
                  </EntryBox>
                  <EntryBox>
                    <TextFieldBox>Mother</TextFieldBox>
                    <BranchBox>
                      <EntryBox>
                        <TextFieldBox>Grandfather</TextFieldBox>
                      </EntryBox>
                      <EntryBox>
                        <TextFieldBox>Grandmother</TextFieldBox>
                      </EntryBox>
                    </BranchBox>
                  </EntryBox>
                </BranchBox>
              </EntryBox>
            </BranchBox>
          </TreeBox>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
