import "../../containers/UserManagement/style.css";
import { dataDemo_ideas } from "../../containers/SubmissionManagement/FakeData/Ideas";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BiPencil } from "react-icons/bi";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import _ from "lodash";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthRequest } from "../../common/AppUse";
import { DEV_CONFIGS, STORAGE_VARS, URL_PATHS } from "../../common/env";
import DetailSubmissionForm from "./DetailSubmissionForm";
import ModalSubmissionIdea from "./Modal/ModalSubmissionIdea";
import IdeaSubView from "./IdeaSubView";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
const toastMessages = {
  ERR_SERVER_ERROR: "Something went wrong, please try again !!",
  ERR_IDEAS_NOT_FOUND: "Ideas not found !!",
};

function DetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValue, setInitialValue] = useState([]);
  const [status, setStatus] = useState({
    visibleModal: false,
    action: "update",
    loading: false,
  });
  const [data, setData] = useState({
    subData: [],
    ideaData: [],
  });

  useEffect(() => {
    if (DEV_CONFIGS.IS_DEV) {
      let ideas = dataDemo_ideas.find((_) => _.submission_id === id);
      if (!ideas) {
        toast.error(toastMessages.ERR_IDEAS_NOT_FOUND);
        setStatus({ ...status, loading: false });
        navigate(-1);
        return;
      }
      setInitialValue(ideas);
      return;
    }

    loadData();
  }, []);

  const loadData = async () => {
    const globalApi = "https://localhost:7024/api";

    await axios
      .all([
        axios.get(`${globalApi}/submission-management/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
          },
        }),
        // axios.get(`${globalApi}/idea-management?page=1&page_size=5`, {submissionId: id} {
        // 	headers: {
        // 		Authorization: `Bearer ${localStorage.getItem(STORAGE_VARS.JWT)}`,
        // 	}
        // }
      ])
      .then(
        axios.spread(function (resSub, resIdea) {
          if (resSub?.data?.succeeded) {
            const value = resSub?.data?.result;
            const newValue = {
              ...value,
              initial_date_v: moment(value?.initial_date).format("DD/MM/YYYY"),
              final_date_v: moment(value?.final_date).format("DD/MM/YYYY"),
            };
            setData({ ...data, subData: newValue });
            setStatus({ ...status, loading: false, visibleModal: false });
          }
        })
      );
  };

  const onCloseModal = () => {
    setStatus({ ...status, visibleModal: false });
  };
  const onOpenModal = (action) => {
    setStatus({ ...status, visibleModal: true, action: action });
  };
  const onUpdateSubmission = async (value) => {
    setStatus({
      ...status,
      loading: true,
    });
    try {
      const res = await AuthRequest.put(
        `submission-management/${value?.id}`,
        value
      );
      if (res?.data?.succeeded) {
        setStatus({
          ...status,
          visibleModal: false,
        });
        await loadData();
      }
    } catch {}
  };
  const onUpdateIdea = async (value) => {
    setStatus({
      ...status,
      loading: true,
    });
    try {
      const res = await AuthRequest.put(
        `submission-management/${value?.id}`,
        value
      );
      if (res?.data?.succeeded) {
        setStatus({
          ...status,
          visibleModal: false,
        });
        await loadData();
      }
    } catch {}
  };

  const renderModal = () => {
    return (
      <ModalSubmissionIdea
        visible={status.visibleModal}
        action={status.action}
        onClose={onCloseModal}
        initialValue={data.subData}
        onUpdate={onUpdateSubmission}
      />
    );
  };
  const renderTop = () => {
    return (
      <div style={{ textAlign: "right" }}>
        <Button
          size={"small"}
          variant="contained"
          style={{ backgroundColor: "#9e9e9e", marginRight: 15 }}
          endIcon={<ArrowBackIcon />}
          onClick={() => navigate(`${URL_PATHS.MANAGE_SUB}`)}
        >
          Back
        </Button>
        <Button
          size={"small"}
          variant="contained"
          style={{ backgroundColor: "#4caf50", marginRight: 15 }}
          endIcon={<BiPencil />}
          onClick={() => onOpenModal("update")}
        >
          Edit Submission
        </Button>
      </div>
    );
  };
  const renderDetailSubmissionForm = () => {
    return (
      <fieldset
        style={{ border: "2px solid gray", padding: 12, borderRadius: 8 }}
      >
        <legend style={{ fontWeight: "bold", padding: 8, fontSize: 22 }}>
          Information Submission
        </legend>
        <DetailSubmissionForm initialValue={data.subData} />
      </fieldset>
    );
  };
  const renderIdeaView = () => {
    return (
      <fieldset
        style={{
          border: "1px solid gray",
          padding: 12,
          marginTop: 30,
          borderRight: "none",
          borderLeft: "none",
          borderBottom: "none",
        }}
      >
        <legend
          style={{
            fontWeight: "bold",
            padding: 8,
            fontSize: 22,
            display: "flex",
          }}
        >
          List Idea{" "}
        </legend>
        <IdeaSubView
          ideaData={data.ideaData}
          loadData={loadData}
          subData={data?.subData}
        />
      </fieldset>
    );
  };
  if (_.isEmpty(data.subData) || status.loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      {renderTop()}
      {renderDetailSubmissionForm()}
      {renderIdeaView()}
      {status.visibleModal && renderModal()}
    </div>
  );
}
export default DetailView;
