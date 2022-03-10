import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { Input, Radio } from "@mui/icons-material";
import CreateUserForm from "../../../components/CreateUserForm";
const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  overflow: "auto",
  maxHeight: "100%",
  " @media (max-width: 600px)": {
    width: "100%",
  },
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
        <CreateUserForm onClose={() => onClose()} />
      </Box>
    </Modal>
  );
};
export default React.memo(ModalCreateUser);
