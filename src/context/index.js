import React, { useReducer, useEffect, createContext, useState } from "react";
import { useMoralis } from "react-moralis";
import { Web3Reducer } from "./reducer";
import Login from "../components/Login";
import notify from "../utils/notify";

const initialState = {
  loading: true,
  connected: false,
  account: null,
  networkId: null,
};

export const Web3Context = createContext(initialState);

export const Web3Provider = ({ children }) => {
  const [state, dispatch] = useReducer(Web3Reducer, initialState);
  const [modal, setModal] = useState(false);

  const {
    login,
    hasAuthError,
    authError,
    authenticate,
    isAuthenticated,
    user,
    enableWeb3,
    isWeb3Enabled,
    web3,
    logout: moralisLogout,
  } = useMoralis();

  const logout = async () => {
    try {
      console.log("logging out...");
      moralisLogout();
      dispatch({
        type: "CLEAR_STATE",
        payload: initialState,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const connect = async () => {
    try {
      console.log("authenticating...");

      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        await authenticate();
        await enableWeb3();

        const networkId = await web3.givenProvider.networkVersion;
        dispatch({
          type: "SET_NETWORK_ID",
          payload: networkId,
        });
        window.web3 = web3;
      } else {
        console.log("MetaMask is not installed!");
        setModal(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (hasAuthError) {
      console.log(authError);
      notify("error", "Auth Error", authError.message);
    }
  }, [hasAuthError, authError]);

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log(isWeb3Enabled);
      console.log(isAuthenticated);
      console.log(user);
      dispatch({
        type: "SET_ACCOUNT",
        payload: user.attributes.ethAddress,
      });
    }
  }, [isAuthenticated, user, isWeb3Enabled]);

  return (
    <Web3Context.Provider
      value={{
        ...state,
        connect,
        logout,
      }}
    >
      {modal && <Login login={login} close={() => setModal(false)} />}
      {children}
    </Web3Context.Provider>
  );
};
