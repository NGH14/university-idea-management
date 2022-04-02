import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import moment from "moment";
import PropTypes from "prop-types";
import * as React from "react";
import { useContext, useState } from "react";
import { BiUserPin } from "react-icons/bi";
import { RiContactsBook2Line } from "react-icons/ri";
import { VscKey } from "react-icons/vsc";

import { UserContext } from "../../context/AppContext";
import UpdatePasswordForm from "../UpdatePasswordForm";

const tabItems = [
  { text: "About", component: <AboutTab /> },
  { text: "Setting", component: <PasswordTab /> },
];

const tabUserItems = [
  {
    text: "General information",
    describe: "",
    component: <GeneralList />,
    icon: <BiUserPin />,
  },
  {
    text: "Contact information",
    describe: "",
    component: <ContactList />,
    icon: <RiContactsBook2Line />,
  },
];

function GeneralList() {
  const { state, setState } = useContext(UserContext);

  const GeneralListItems = [
    {
      text: "Full Name:",
      describe: state?.dataUser?.full_name,
    },
    {
      text: "Date of Birth:",
      describe: state?.dataUser?.date_of_birth
        ? moment(state?.dataUser?.date_of_birth).format("DD/MM/YYYY")
        : "None",
    },
    {
      text: "Department:",
      describe: state?.dataUser?.department,
    },
    {
      text: "Role:",
      describe: state?.dataUser?.role,
    },
    {
      text: "Gender:",
      describe: state?.dataUser?.gender,
    },
  ];

  return (
    <List
      sx={{
        flex: "1 1 100%",
        fontSize: 18,
        maxWidth: "100%",
        bgcolor: "background.paper",
      }}
    >
      {GeneralListItems.map((_value, _index) => {
        const { text, describe } = _value;
        console.log(text);

        return (
          <>
            <ListItem
              alignItems="flex-start"
              sx={{ flexWrap: "wrap", gap: 1, flex: "1 1 auto" }}
            >
              <ListItemText
                disableTypography
                sx={{ fontWeight: "700", maxWidth: "200px" }}
              >
                {text}
              </ListItemText>
              <ListItemText
                style={
                  text.toLowerCase() !== "full name:"
                    ? { textTransform: "capitalize" }
                    : {}
                }
                disableTypography
                primary={describe ?? "None"}
                sx={{ flex: "1 1 auto" }}
              />
            </ListItem>
          </>
        );
      })}
    </List>
  );
}

function ContactList() {
  const { state, setState } = useContext(UserContext);

  const ContactListItems = [
    {
      text: "Phone Number:",
      describe: state.dataUser.phone_number,
    },
    {
      text: "Email:",
      describe: state.dataUser.email,
    },
  ];
  return (
    <List
      sx={{
        flex: "1",
        maxWidth: "100%",
        bgcolor: "background.paper",
        fontSize: 18,
      }}
    >
      {ContactListItems.map((_value, _index) => {
        const { text, describe } = _value;
        return (
          <>
            <ListItem
              alignItems="flex-start"
              sx={{ flexWrap: "wrap", gap: 1, flex: "1 1 auto" }}
            >
              <ListItemText
                disableTypography
                sx={{ fontWeight: "700", maxWidth: "250px" }}
              >
                {text}
              </ListItemText>
              <ListItemText
                disableTypography
                primary={describe ?? "None"}
                sx={{ flex: "1 1 auto" }}
              />
            </ListItem>
          </>
        );
      })}
    </List>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ display: "inline-block", width: "100%" }} sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function PasswordTab() {
  const [visibleModal, setvisibleModal] = useState(false);

  const onClose = React.useCallback(() => {
    setvisibleModal(false);
  });
  const onOpen = () => {
    setvisibleModal(true);
  };

  function PasswordModal() {
    return (
      <>
        <Modal
          open={visibleModal}
          onClose={() => onClose()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
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
              maxHeight: "100%",
              " @media (max-width: 1000px)": {
                display: "flex",
                alignItems: "center",

                width: "100%",
                height: "100%",
              },
            }}
          >
            <UpdatePasswordForm onClose={onClose} />
          </Box>
        </Modal>
      </>
    );
  }

  return (
    <>
      <PasswordModal></PasswordModal>
      <Card
        style={{
          display: "inline-block",
          width: "100%",
          borderRadius: "5px",
          fontFamily: "Poppins",
        }}
        sx={{ p: 3 }}
        fullWidth
      >
        <CardHeader
          sx={{
            flexWrap: "wrap-reverse",
            gap: "15px",
            alignItems: "center",
          }}
          action={
            <Button
              variant="contained"
              aria-label="settings"
              sx={{
                fontSize: 18,
                fontWidth: 700,
                borderRadius: "5px",
                color: "#1976D2",
                p: 0,
                fontFamily: "Poppins",
              }}
              fullWidth
              onClick={onOpen}
            >
              Change your password
            </Button>
          }
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <VscKey />
              <p
                style={{
                  fontWeight: "600",
                  fontFamily: "Poppins",
                }}
              >
                Password
              </p>
            </div>
          }
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: 16, fontFamily: "Poppins" }}
          >
            You should change your password every three months and after create
            account to avoid security issues.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

function AboutTab() {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",

          gap: 1,
        }}
      >
        {tabUserItems.map((_value, _index) => {
          const { text, component, icon } = _value;
          return (
            <Card
              style={{
                borderRadius: "5px",
                fontFamily: "Poppins",
              }}
              sx={{ p: 3, mb: 2 }}
              fullWidth
            >
              <CardHeader
                sx={{ flexWrap: "wrap-reverse", gap: "10px" }}
                title={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {icon && icon}
                    <p
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        fontFamily: "Poppins",
                      }}
                    >
                      {text && text}
                    </p>
                  </div>
                }
              />
              <CardContent>{component && component}</CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function TabProfile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderTop: 2, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="usertab">
          {tabItems.map((value, index) => {
            const { text } = value;
            return (
              <Tab
                label={text}
                {...a11yProps(index)}
                sx={{ textTransform: "none" }}
              />
            );
          })}
        </Tabs>
      </Box>
      {tabItems.map((_value, index) => {
        const { text, component } = _value;
        return (
          <TabPanel value={value} index={index}>
            {component}
          </TabPanel>
        );
      })}
    </Box>
  );
}

export default React.memo(TabProfile);
