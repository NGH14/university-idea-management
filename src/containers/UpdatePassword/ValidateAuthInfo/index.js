import { useParams } from "react-router-dom";

import { URL_PATHS } from "../../../common/env";
import Login from "../../Login";

export default function ValidateAuthInfo() {
  let { token } = useParams();
  return <Login returnUrl={`${URL_PATHS.UPDATE_PWD}/${token}`}></Login>;
}
