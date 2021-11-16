import React, { createContext, useContext } from "react";
import { View, Text } from "react-native";

const AuthContext = createContext({
  // Iniatial state of the context
});

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: "Sanel" }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
