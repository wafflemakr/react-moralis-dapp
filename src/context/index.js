import React, { useReducer, useEffect, createContext } from "react";
import { useMoralis } from "react-moralis";
import { Web3Reducer } from "./reducer";

const initialState = {
  loading: true,
  connected: false,
  account: null,
  networkId: null,
};

export const Web3Context = createContext(initialState);

export const Web3Provider = ({ children }) => {
  const [state, dispatch] = useReducer(Web3Reducer, initialState);

  const {
    authenticate,
    isAuthenticated,
    user,
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
      await authenticate();

      const networkId = await web3.givenProvider.networkVersion;
      dispatch({
        type: "SET_NETWORK_ID",
        payload: networkId,
      });
      window.web3 = web3;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch({
        type: "SET_ACCOUNT",
        payload: user.attributes.ethAddress,
      });
    }
  }, [isAuthenticated, user]);

  return (
    <Web3Context.Provider
      value={{
        ...state,
        connect,
        logout,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
