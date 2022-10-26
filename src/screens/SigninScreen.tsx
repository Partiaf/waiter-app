import LoadingBox from "@/components/LoadingBox";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ISigninScreenProps { }

export const SigninScreen: React.FunctionComponent<ISigninScreenProps> = (
  props
) => {
  const [code, setCode] = useState("");
  const [store, setStore] = useState("");
  const [enter, setEnter] = useState(false);
  const [loading, setLoading] = useState(false)

  const sendRequest = async () => {
    setLoading(true)
    axios.post("https://partiaf-api-recache.herokuapp.com/api/v2/signin-waiter", { code }).then((response) => {
      localStorage.setItem("storeInfo", JSON.stringify(response.data));
      setLoading(false)
      setEnter(true)

    });
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (enter) {
      navigate("/home");
    }
  }, [enter])
  return (
    <div className="background login">
      {/* <img className='home-ground' src="./img/ground-partiaf.svg" alt="" /> */}
      {loading ? <LoadingBox /> : (
        <div className="home-container">
          <img
            className="logo"
            src="./logo-partiaf-secondary.svg"
            alt=""
          />
          <p className="cap">Bienvenido, preparate para atender a los clientes</p>
          {/* <p className="login-copy">Staff</p> */}
          {/* <img className='user-img' src="./img/user-avatar-filled.svg" alt="" /> */}
          <form action="" autoComplete="off">
            <div className="input-form">
            <i className='bx bx-lock-alt'></i>
              <input
                className="input-login"
                type="number"
                placeholder="Codigo de ingreso"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </form>
          <div className="home-buttons">
            <button className="btn-principal" onClick={() => sendRequest()}>
              ENTRAR
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
