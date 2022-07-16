import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";
//The actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};
const INITIAL_STATE = {
  currentUser: null,
};

//The actual functional component
//<App/> is the children in our case (any component that is wrapped inside the provider)
export const UserProvider = ({ children }) => {
  //Any component that is listening for current user should in turn update,
  //meaning that it should re render

  // const [currentUser, setCurrentUser] = useState(null);
  // userReducer , 1st arg: useReducer, 2nd arg: initial state
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };
  const value = { currentUser, setCurrentUser };
  //On every context that gets built for us, there is a dot provider and the provider is the component
  //that will wrap around any other components that need access to the values inside.(eg. childrem)

  //This provider is essentially allowing any of
  //its child components to access the values inside of its used state.

  // //We did that bec Firebase is actually listening to our current connection
  // // to the instance of user that signed in before
  // signOutUser();
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
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  //Passing the value prop to provider because we want to be able to call this setter
  //and get the value (currentUser) anywhere inside of the component tree that
  //is nested within this actual provider value.
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
