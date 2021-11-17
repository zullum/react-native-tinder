import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({
  // Iniatial state of the context
});

const config = {
  androidClientId:
    "906402734024-rsi7qgr7j9plrtrb7vn52ko9ktmpo0f1.apps.googleusercontent.com",
  iosClientId:
    "906402734024-lva8522919qvjf21ce8i60bchfjeanht.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in ...
          setUser(user);
        } else {
          // Not logged in ...
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signInWithGoogle = async () => {
    setLoading(true);

    await Google.logInAsync(config)
      .then(async (logInResult) => {
        // console.log(logInResult);
        if (logInResult.type === "success") {
          // ... login
          console.log(logInResult);
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          await signInWithCredential(auth, credential);
        }
        return Promise.reject();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
