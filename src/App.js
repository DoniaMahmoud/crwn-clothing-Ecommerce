import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* To render children , we need to tell the parent where to render the children components using Outlet*/}
        {/* If you pass index , it's actually equivalent to saying index is equal to true.
        So match this slash when it's empty as the base component. */}
        <Route index element={<Home />} />
        {/* This path is relative to the path of parent  */}
        {/* To match it , it has to match parent path first */}
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
