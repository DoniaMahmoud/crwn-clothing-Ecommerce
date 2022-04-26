import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, //returns a listener
} from "firebase/auth";
//doc is used to get document instance
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT5Jw8YI30zkGemWJHjnU2rXEpDySvN9k",
  authDomain: "crwn-clothing-db-f4d67.firebaseapp.com",
  projectId: "crwn-clothing-db-f4d67",
  storageBucket: "crwn-clothing-db-f4d67.appspot.com",
  messagingSenderId: "430385264292",
  appId: "1:430385264292:web:f4a06ca730af7babe95831",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

//EMail/Paswword authentication does not need a provider
//They come by default with firebase

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// allows us to upload these categories from that shop data up into
// the respective collections up in Firestore.
//async bec we are adding to external resource (firebase)
//We want to make sure that all of our objects that we're trying to add
//to the collection are successfully added.
// And to do that, we need to use a batch.
//collectionKey is the categories
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  //loops over object of category
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  //begin firing it
  await batch.commit();
  console.log("done");
};

//read and get data fromm firestore
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  //gives me an object that i can get snapshot from
  const q = query(collectionRef);

  //fetch document snapshots asynchronously
  const querySnapshot = await getDocs(q);

  // gives an array of all individual docs inside
  //creating the structure of objects below
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data(); // loops object by object
    //adding data using a hashtable
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

/*
{
  hats:{
    title:'hats',
    items: [
      {},
      {},
    ]
  },
   snaeaker:{
    title:'sneaker',
    items: [
      {},
      {},
    ]
  }
}
*/
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  //DATA
  const userSnapshot = await getDoc(userDocRef);

  // if user data does not exist
  // create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  // if user data exists
  // return user data
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
//auth is what informs the firebase which user to find
export const signOutUser = async () => await signOut(auth);

//onAuthStateChanged to work => takes 2 params
//1) auth
//2) is callback that you want to call every time this auth state changes.
export const onAuthStateChangedListener = (callback) =>
  // create a listener for me using this callback, next value is the callback
  onAuthStateChanged(auth, callback);
