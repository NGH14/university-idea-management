import "./style.css";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import UpdatePasswordForm from "../../components/UpdatePasswordForm";

export default function UpdatePassword() {
  let { token } = useParams();

  return (
    <div className="loginpage-wrapper">
      <UpdatePasswordForm></UpdatePasswordForm>
    </div>
  );
}
