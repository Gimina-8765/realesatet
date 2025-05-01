import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
     domain="dev-dsdlaohggox2a7ig.us.auth0.com"
     clientId="VHHmEgRnFcrT1nzOcHFwZsp9zHiqO3DC"
     authorizationParams={{
      redirect_uri: "http://localhost:5173/"
     }}
     audience="http://localhost:8000"
     scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
