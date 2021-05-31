import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Web3Provider } from "./context";

const theme = extendTheme({
  config: {
    initialColorMode: localStorage.getItem("theme"),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <MoralisProvider
        appId={process.env.REACT_APP_MORALIS_ID}
        serverUrl={process.env.REACT_APP_MORALIS_URL}
      >
        <Web3Provider>
          <App />
        </Web3Provider>
      </MoralisProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
