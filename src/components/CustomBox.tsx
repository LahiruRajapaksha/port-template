import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const TreeBox = styled(Box)({
  boxSizing: "border-box",
  padding: "10px",
});

export const EntryBox = styled(Box)({
  position: "relative",
  minHeight: "100px",
  display: "block",
  ":before": {
    content: "''",
    height: "100%",
    borderLeft: "2px solid #ccc",
    position: "absolute",
    left: "-20px",
  },
  ":first-child:after": {
    height: "10px",
    borderRadius: 0,
  },
  ":first-child:before": {
    width: "10px",
    height: "50%",
    top: "50%",
    marginTop: "1px",
    borderRadius: 0,
  },
  ":after": {
    content: "''",
    width: "20px",
    borderTop: "2px solid #ccc",
    position: "absolute",
    left: "-20px",
    top: "50%",
    marginTop: "1px",
  },
  ":last-child:before": {
    width: "10px",
    height: "50%",
    borderRadius: 0,
  },
  ":last-child:after": {
    // height: "10px",
    // width: "20px",
    borderTop: "none",
    borderBottom: "2px solid #ccc",
    borderRadius: 0,
    marginTop: "-1px",
  },
  ":only-child:after": {
    width: "10px",
    height: 0,
    marginTop: "1px",
    borderRadius: 0,
  },
  ":only-child:before": {
    display: "none",
  },
});

export const BranchBox = styled(Box)({
  padding: "0px 0 5px 20px",
  ":not(:first-child)": {
    marginnLeft: "170px",
  },
  ":not(:first-child):after": {
    content: "''",
    width: "20px",
    borderTop: "2px solid #ccc",
    position: "absolute",
    left: "150px",
    top: "50%",
    marginTop: "1px",
  },
});

export const TextFieldBox = styled(Box)({
  border: "2px solid #ccc",
  display: "block",
  minWidth: "10px",
  padding: "5px 10px",
  lineHeight: "20px",
  textAlign: "center",
  position: "absolute",
  left: "0px",
  top: "50%",
  marginTop: "-15px",
  diaplay: "inline-block",
  borderRadius: "5px",
});
