import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AuthProvider } from "./hooks/useAuth";
import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      {/* HOC - Higher Order Component */}
      <AuthProvider>
        {/* Passes down the cool stuff to the children */}
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
