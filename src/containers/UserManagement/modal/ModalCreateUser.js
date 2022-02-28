import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  Modal,
  RadioGroup,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Input, Radio } from "@mui/icons-material";
import LoginForm from "../../../components/LoginForm";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const ModalCreateUser = (props) => {
  const { visible, onClose } = props;
  return (
    <Modal
      open={visible}
      onClose={() => onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <LoginForm />
      </Box>
    </Modal>
  );
};
export default ModalCreateUser;
