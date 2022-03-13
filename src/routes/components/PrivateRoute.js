import { useContext, useEffect } from "react"
import { UserContext } from "../../context/AppContext"
import { useNavigate } from "react-router-dom"
import { URL_PATHS } from "../../common/env"

export default function PrivateRoute({ children }) {
  const navigate = useNavigate()
  const { state, setState } = useContext(UserContext)

  useEffect(() => {
    if (state?.isLogin) {
      navigate(URL_PATHS.HOME)
    }
  }, [])
  return children
}
