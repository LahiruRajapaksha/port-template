import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

type AddButtonProps = ButtonProps & {
  variant?: string;
  padding?: number;
  margin?: string;
};
const AddRemoveButton = styled(Button)<AddButtonProps>((props) => ({
  variant: props.variant,
  padding: props.padding,
  margin: props.margin,
}));

export default AddRemoveButton;
