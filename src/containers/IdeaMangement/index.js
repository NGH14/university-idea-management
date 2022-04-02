import { useEffect, useState } from "react";
import { AuthRequest, sleep } from "../../common/AppUse";
import { API_PATHS } from "../../common/env";
import { toast } from "react-toastify";
import IdeaSubView from "../../components/Submission/IdeaSubView";
import * as React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Pagination,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ModalIdea from "../../components/Idea/ModalIdea";
import _ from "lodash";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Collapse from "@mui/material/Collapse";
import CommentIdea from "../../components/Idea/CommentIdea";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const fakeData = [
  {
    name: "000",
    id: 1,
    comment: [
      {
        id: 1,
        user: { name: "Data Fake 01 _01" },
        content: "Data fake demo 01",
        modified_date: "2022-03-15T13:45:30",
      },
      {
        id: 1,
        user: { name: "Data Fake 01 _01" },
        content: "Data fake demo 01",
        modified_date: "2022-03-15T13:45:30",
      },
      {
        id: 2,
        user: { name: "Data Fake 01 _01" },
        content: "Data fake demo 01",
        modified_date: "2022-03-15T13:45:30",
      },
      {
        id: 2,
        user: { name: "Data Fake 01 _01" },
        content: "Data fake demo 01",
        modified_date: "2022-03-15T13:45:30",
      },
    ],
  },
  {
    name: "000",
    id: 2,
    comment: [
      {
        id: 1,
        user: { name: "Data Fake 01 _02" },
        content: "Data fake demo 02",
        modified_date: "2022-03-15T13:45:30",
      },
      {
        id: 1,
        user: { name: "Data Fake 01 _02" },
        content: "Data fake demo 02",
        modified_date: "2022-03-15T13:45:30",
      },
      {
        id: 2,
        user: { name: "Data Fake 01 _02" },
        content: "Data fake demo 02",
        modified_date: "2022-03-15T13:45:30",
      },
      {
        id: 2,
        user: { name: "Data Fake 01 _02" },
        content: "Data fake demo 02",
        modified_date: "2022-03-15T13:45:30",
      },
    ],
  },
];
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const ITEM_HEIGHT = 48;

const toastMessages = {
  WAIT: "Please wait...",
  SUC_COMMENT_ADDED: "Create comment successful !!",
  SUC_COMMENT_EDITED: "Update comment successful !!",
  SUC_COMMENT_DEL: "Delete comment successful !!",
  ERR_SERVER_ERROR: "Something went wrong, please try again !!",
};

function IdeaManagement() {
  const [status, setStatus] = useState({
    visibleModal: false,
    action: "update",
    loading: false,
  });
  const [expanded, setExpanded] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
  });
  const open = Boolean(anchorEl);
  const [data, setData] = useState([]);
  useEffect(() => {
    loadData();
  }, [pagination]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExpandClick = (id) => {
    let newExpanded = [...expanded];
    newExpanded[id] = !newExpanded[id];
    setExpanded(newExpanded);
  };
  const onDelete = (id) => {
    toast
      .promise(
        AuthRequest.delete(`${API_PATHS.ADMIN.MANAGE_USER}/${id}`)
          .then(() => sleep(700))
          .catch(),
        {
          pending: toastMessages.WAIT,
          success: toastMessages.SUC_IDEA_DEL,
          error: toastMessages.ERR_SERVER_ERROR,
        }
      )
      .then(() => {
        loadData();
      });
  };

  const onUpdate = (value) => {
    toast
      .promise(
        AuthRequest.put(`${API_PATHS.ADMIN.MANAGE_USER}/${value?.id}`, value)
          .then(() => sleep(700))
          .catch(),
        {
          pending: toastMessages.WAIT,
          success: toastMessages.SUC_IDEA_EDITED,
          error: toastMessages.ERR_SERVER_ERROR,
        }
      )
      .then(() => {
        if (value?.exitFile && value?.file && !_.isEmpty(value?.file)) {
          // delete file API
        }
        setStatus({ ...status, visibleModal: false });
        loadData();
      });
  };

  const onCreate = (value) => {
    toast
      .promise(
        AuthRequest.post(API_PATHS.ADMIN.MANAGE_IDEA, value)
          .then(() => sleep(700))
          .catch(),
        {
          pending: toastMessages.WAIT,
          success: toastMessages.SUC_IDEA_ADDED,
          error: toastMessages.ERR_SERVER_ERROR,
        }
      )
      .then(() => {
        setStatus({ ...status, visibleModal: false });
        loadData();
      });
  };
  const loadData = async () => {
    await AuthRequest.get(API_PATHS.ADMIN.MANAGE_COMMENT, {
      params: {
        page: pagination.page + 1,
        page_size: 5,
      },
    })
      .then((res) => {
        setData(res?.data?.result?.rows);
      })
      .catch(() =>
        toast.error(toastMessages.ERR_SERVER_ERROR, {
          style: { width: "auto" },
        })
      );
  };
  const actionButtonIdea = [
    <Button
      startIcon={<EditIcon />}
      style={{ backgroundColor: "#4caf50" }}
      variant={"contained"}
    >
      Update Idea
    </Button>,
    <Button
      startIcon={<DeleteIcon />}
      style={{ backgroundColor: "#ba000d" }}
      variant={"contained"}
    >
      Delete Idea
    </Button>,
  ];

  const onCloseModal = () => {
    setStatus({ ...status, visibleModal: false });
  };
  const onOpenModal = (action, id) => {
    setStatus({ ...status, visibleModal: true, action: action });
  };
  const renderActionIdea = (id) => {
    return (
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {actionButtonIdea.map((option, index) => (
            <MenuItem
              key={option}
              selected={option === "Pyxis"}
              onClick={() => {
                handleClose();
                index === 0 ? onOpenModal("update", id) : onDelete(id);
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };
  const renderTop = () => {
    return (
      <div style={{ width: "100%", textAlign: "right", marginBottom: 15 }}>
        <Button
          size={"small"}
          variant="contained"
          endIcon={<AddIcon />}
          onClick={() => onOpenModal("create")}
        >
          Create Idea
        </Button>
      </div>
    );
  };
  const renderModal = () => {
    return (
      <ModalIdea
        visible={status.visibleModal}
        action={status.action}
        onClose={onCloseModal}
        onUpdate={onUpdate}
        onCreate={onCreate}
      />
    );
  };

  const renderCardHeader = (item) => {
    return (
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "gray" }} aria-label="recipe">
            P
          </Avatar>
        }
        action={renderActionIdea(item.id)}
        title="People Private"
        subheader={
          item?.createTime
            ? moment(item?.createTime).format("LLL")
            : "September 14, 2016"
        }
      />
    );
  };

  const renderCardContent = (item) => {
    return (
      <CardContent>
        <div style={{ display: "flex" }}>
          <h3 style={{ marginRight: 10, fontWeight: "bold" }}>
            {/*{item?.title}*/} Title:{" "}
          </h3>
          <label>Title Idea</label>
        </div>
        <br></br>
        <div>
          <h3 style={{ fontWeight: "bold" }}>Content</h3>
          <Typography variant="body2" color="text.secondary">
            {/*{item?.content}*/}
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </div>
      </CardContent>
    );
  };

  const renderActionButton = (item) => {
    return (
      <CardActions disableSpacing style={{ paddingRight: 15, paddingLeft: 15 }}>
        <Button
          aria-label="add to favorites"
          startIcon={<ThumbUpIcon />}
          color={"inherit"}
          variant="contained"
          size={"small"}
        >
          Like (0)
        </Button>
        <Button
          aria-label="add to favorites"
          style={{ marginRight: 20, marginLeft: 20 }}
          startIcon={<ThumbDownIcon />}
          color={"inherit"}
          variant="contained"
          size={"small"}
        >
          Dislike (0)
        </Button>
        <ExpandMore
          expand={expanded[item.id]}
          onClick={() => handleExpandClick(item.id)}
          aria-expanded={expanded[item.id]}
          aria-label="show more"
        >
          <Tooltip title={"Show comment"}>
            <ExpandMoreIcon />
          </Tooltip>
        </ExpandMore>
      </CardActions>
    );
  };

  const renderListFile = (item) => {
    if (item?.file || !_.isEmpty(item?.file)) {
      return (
        <Card style={{ marginLeft: 15, marginRight: 15 }}>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <a href={""}>demo.doc</a>
        </Card>
      );
    } else {
      return <div></div>;
    }
  };

  const renderComment = (item) => {
    return (
      <Collapse in={expanded[item.id]} timeout="auto" unmountOnExit>
        <CommentIdea data={item} ideaId={item.id} />
      </Collapse>
    );
  };

  const renderContentIdea = () => {
    const result = _.map(fakeData, (item, index) => {
      return (
        <Card
          style={
            index === 0
              ? { border: "1px solid #90a4ae" }
              : { border: "1px solid #90a4ae", marginTop: 30 }
          }
        >
          {renderCardHeader(item)}
          {renderCardContent(item)}
          {renderListFile(item)}
          {renderActionButton(item)}
          {renderComment(item)}
        </Card>
      );
    });
    if (status.loading) {
      return (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      );
    }
    return result;
  };

  const onChangePage = async (page) => {
    setPagination({ ...pagination, page });
  };

  const renderFooter = () => {
    return (
      <div style={{ marginTop: 15, float: "right" }}>
        <Pagination
          count={10}
          onChange={(value) =>
            onChangePage(_.toNumber(_.get(value.target, "innerText")))
          }
          // rowsPerPage={(value)=>console.log(value, 1)}
          // onRowsPerPageChange={(value)=>console.log(value, 2)}
        />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <>
        {renderTop()}
        {renderContentIdea()}
        {renderFooter()}
        {status.visibleModal && renderModal()}
      </>
    );
  };

  return (
    <>
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
        {renderContent()}
      </fieldset>
      {status.visibleModal && renderModal()}
    </>
  );
}
export default IdeaManagement;
