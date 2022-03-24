import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { useEffect, useState } from "react";

import { AuthRequest } from "../../../common/AppUse";
import CreateForm from "../../../components/Tag/CreateForm";
import DetailForm from "../../../components/Tag/DetailForm";
import EditForm from "../../../components/Tag/EditForm";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1000px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  overflow: "auto",
  maxHeight: 380,
  " @media (max-width: 600px)": {
    width: "100%",
  },
};
const ModalTagManagement = (props) => {
  const { visible, onClose, onCreate, onUpdate, action, rowId } = props;
  const [initialValue, setInitialValue] = useState([]);
  useEffect(() => {
    if (action !== "create") {
      loadData();
    }
  }, [action]);
  const loadData = async () => {
    try {
      const res = await AuthRequest.get(`tag-management/tag/${rowId}`);
      if (res?.data?.succeeded) {
        setInitialValue(res?.data?.result);
      }
    } catch {}
  };
  const renderForm = () => {
    switch (action) {
      case "create":
        return <CreateForm onClose={() => onClose()} onCreate={onCreate} />;
      case "update":
        return (
          <EditForm
            onClose={() => onClose()}
            onUpdate={onUpdate}
            initialValue={initialValue}
          />
        );
      case "detail":
        return (
          <DetailForm onClose={() => onClose()} initialValue={initialValue} />
        );
    }
  };
  return (
    <Modal
      open={visible}
      onClose={() => onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{renderForm()}</Box>
    </Modal>
  );
};
export default React.memo(ModalTagManagement);
