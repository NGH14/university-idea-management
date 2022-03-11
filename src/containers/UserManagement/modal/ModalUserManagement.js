import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { Input, Radio } from "@mui/icons-material";
import CreateUserForm from "../../../components/CreateUserForm";
import EditUserForm from "../../../components/EditUserForm";
const style = {
  position: "relative",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1000px",
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
const ModalUserManagement = (props) => {
  const { visible, onClose, onCreate, onUpdate, statusEdit, initialValue } = props;
  return (
    <Modal
      open={visible}
      onClose={() => onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {
          statusEdit ? <EditUserForm onClose={() => onClose()} onUpdate={onUpdate} initialValue={initialValue}/> :
              <CreateUserForm onClose={() => onClose()} onCreate={onCreate}/>
        }

      </Box>
    </Modal>
  );
};
export default React.memo(ModalUserManagement);
