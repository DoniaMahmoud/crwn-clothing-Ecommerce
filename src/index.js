import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/user.contexts";
import { ProductsProvider } from "./contexts/products.context";
import { CartProvider } from "./contexts/cart.context";
import App from "./App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* So then this way, the products are able to reach up into the user provider and get the value, 
    whereas the user provider can't necessarily go into its children  in order to fetch that data. */}
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            {/* Any component inside can access the context
           value inside of the provider itself. */}
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
