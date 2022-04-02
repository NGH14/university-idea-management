import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import { Button, InputBase } from "@mui/material";
import { Divider, Grid } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import * as React from "react";
import _ from "lodash";
import { useState } from "react";
import { AuthRequest } from "../../../common/AppUse";
import { API_PATHS } from "../../../common/env";
import { toast } from "react-toastify";
const fakeData = [
  {
    ideaId: 1,
    title: "sadsa",
    user: { name: "Data Fake 01" },
    content: "Data fake demo 01",
    createAt: "2022-03-15T13:45:30",
  },
  {
    ideaId: 1,
    title: "sadsa",
    user: { name: "Data Fake 02" },
    content: "Data fake demo 02",
    createAt: "2022-03-15T13:45:30",
  },
  {
    ideaId: 2,
    title: "sadsa",
    user: { name: "Data Fake 01 _ 01" },
    content: "Data fake demo 01",
    createAt: "2022-03-15T13:45:30",
  },
  {
    ideaId: 2,
    title: "sadsa",
    user: { name: "Data Fake 02 _ 02" },
    content: "Data fake demo 02",
    createAt: "2022-03-15T13:45:30",
  },
];
function CommentIdea({ data, ideaId }) {
  const [dataComment, setDataComment] = useState(data?.comment);

  const [totalComment, setTotalComment] = useState(data?.totalComment);

  // fix param show more
  // ref 80 condition display button show more
  const onShowMoreComment = async () => {
    //API show more comment
    await AuthRequest.get(`${API_PATHS.ADMIN.MANAGE_COMMENT}`, {
      ideaId,
      totalComment,
    })
      .then((res) => setDataComment([...dataComment, res?.data?.result]))
      .catch(() => {});
  };

  const onCreateComment = async (value) => {
    // api create Comment
    const newValue = { ...value, ideaId };
    await AuthRequest.post(`${API_PATHS.ADMIN.MANAGE_COMMENT}`, newValue)
      .then((res) => onShowMoreComment())
      .catch(() => {});
  };

  const renderContent = () => {
    const comments = _.map(dataComment, (item) => {
      return (
        <Paper style={{ padding: 15, boxShadow: "none" }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <div
                style={{ borderRadius: 15, padding: 10, background: "#F0F2F5" }}
              >
                <p
                  style={{
                    margin: 0,
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: 18,
                    color: "black",
                  }}
                >
                  {item?.user?.name}
                </p>
                <p style={{ textAlign: "left" }}>{item?.content}</p>
              </div>
              <p
                style={{
                  textAlign: "left",
                  color: "gray",
                  marginTop: 8,
                  marginLeft: 15,
                }}
              >
                Commented {moment(item.createAt, "YYYYMMDD").fromNow()}
              </p>
            </Grid>
          </Grid>
        </Paper>
      );
    });

    const buttonMore = (
      <div
        style={{ textAlign: "center", marginTop: 15, marginBottom: 15 }}
        onClick={() => {
          onShowMoreComment();
        }}
      >
        <Button variant={"outlined  "}>View More ...</Button>
      </div>
    );

    return (
      <div>
        {comments}
        {_.size(dataComment) !== totalComment && buttonMore}
      </div>
    );
  };
  return (
    <>
      <div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            background: "#F0F2F5",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Comment idea ..."
            onClick={() => {
              console.log(123);
            }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            sx={{ p: "10px" }}
            aria-label="directions"
            onClick={() => {
              onCreateComment();
            }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </div>
      <div style={{ paddingRight: 15, paddingLeft: 15, marginTop: 15 }}>
        <strong>Comment (4)</strong>
      </div>
      {renderContent()}
    </>
  );
}
export default CommentIdea;
