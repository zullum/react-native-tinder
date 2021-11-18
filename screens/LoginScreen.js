import React, { useLayoutEffect } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import ImageBackground from "react-native/Libraries/Image/ImageBackground";
import tw from "tailwind-rn";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={tw("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tw("flex-1")}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          style={[
            tw("absolute bottom-40 bg-white p-4 rounded-2xl"),
            { marginHorizontal: "25%" },
          ]}
        >
          <Text style={tw("font-bold text-center")} onPress={signInWithGoogle}>
            Sign in & get swipping
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
