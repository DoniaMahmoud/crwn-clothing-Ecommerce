import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.action";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //Takes callback
    //When user signs in or signs out this means auth is changed so everytime the callback will run
    //permanently open listener.
    //we have to tell it to stop listening whenever this component un mounts.
    // this method returns a func that unsubscribe i.e. stops listening
    // The moment that this listener mounts, it will check the auth state automatically
    // whe we initialize the listener
    //user is null when user signout
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      //if user signs in we'll store the object else will store null
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);
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
