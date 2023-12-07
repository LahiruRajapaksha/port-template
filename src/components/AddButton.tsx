import Button from "@mui/material/Button";
import { Box } from "@mui/material";

type AddButtonProps = {
  onClick?: () => void;
  text: string;
};

const AddButton = (props: AddButtonProps) => {
  const { onClick, text } = props;
  return (
    <Box p={1}>
      <Button variant="outlined" onClick={onClick}>
        {text}
      </Button>
    </Box>
  );
};

export default AddButton;
