import { alpha, styled } from "@mui/material/styles";
import Input, { InputProps } from "@mui/material/Input";

const CustomInput = styled(Input)<InputProps>(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    border: "1px solid",
    borderColor: "#A2BCE0",
    width: "auto",
    fontSize: 16,
    padding: "10px 12px",
    height: 20,
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

type CustomTextFieldProps = InputProps & {
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
};

const CustomTextField = (props: CustomTextFieldProps) => {
  const { defaultValue, onChange, onClick } = props;
  return (
    <CustomInput
      {...props}
      defaultValue={defaultValue}
      onChange={onChange}
      onClick={onClick}
    />
  );
};

export default CustomTextField;
