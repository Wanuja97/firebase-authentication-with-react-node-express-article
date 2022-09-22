import { GoogleAuthProvider, getAuth, signInWithPopup,signOut  } from "firebase/auth";
import "./App.css";
import {useState} from 'react';
import Tasks from "./components/Tasks";
function App() {

  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth();

  const [authorizedUser,setAuthorizedUser] = useState(false || sessionStorage.getItem("accessToken"));

  function signInwithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        // After user is signed in, set the state to true
        const user = result.user;
        if(user){
          user.getIdToken().then((tkn)=>{
            // set access token in session storage
            sessionStorage.setItem("accessToken", tkn);
            setAuthorizedUser(true);
          })
        }
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  function logoutUser(){
    signOut(auth).then(() => {      
      // clear session storage
      sessionStorage.clear();
      setAuthorizedUser(false);
      // window.location.replace("/");
      alert('Logged Out Successfully');
    }).catch((error) => {
      // An error happened.
      alert(error);
    });
  }
  return (
    <div className="App">
     {authorizedUser ? (
        <>
          <p>Authorized user</p>
          <h1>Tasks</h1>
          <Tasks token={sessionStorage.getItem("accessToken")}/>
          <button onClick={logoutUser}>Logout Button</button>
        </>
      ): (
        <>
      <button onClick={signInwithGoogle}>SignWithGoogle</button>
        </>
      )}
    </div>
  );
}

export default App;
