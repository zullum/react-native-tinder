import React from "react";
import { View, Text, Button } from "react-native";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  // console.log(user);
  return (
    <View>
      <Text>{loading ? "Loading ..." : "I am LoginScreen"}</Text>
      <Button onPress={signInWithGoogle} title="Login" />
    </View>
  );
};

export default LoginScreen;
