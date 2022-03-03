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
import CreateUserForm from "../../../components/CreateUserForm";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
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
        <CreateUserForm />
      </Box>
    </Modal>
  );
};
export default ModalCreateUser;
