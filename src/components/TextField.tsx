import { alpha, styled } from "@mui/material/styles";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import Box from "@mui/material/Box";

const BootstrapInput = styled(InputBase)<InputBaseProps>(({ theme }) => ({
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

type CustomTextFieldProps = {
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
};

const CustomTextField = (props: CustomTextFieldProps) => {
  const { defaultValue, onChange, onClick } = props;
  return (
    <Box
      component="form"
      noValidate
      sx={{
        display: "grid",
        gridTemplateColumns: { sm: "1fr 1fr" },
        gap: 2,
      }}
    >
      <BootstrapInput
        defaultValue={defaultValue}
        onChange={onChange}
        onClick={onClick}
      />
    </Box>
  );
};

export default CustomTextField;
