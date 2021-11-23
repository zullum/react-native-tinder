import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import tw from "tailwind-rn";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw("flex-1")}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw("flex-1 items-center pt-5 bg-white relative")}>
          <Image
            style={tw("h-20 w-full")}
            resizeMode="contain"
            source={{ uri: "https://links.papareact.com/2pf" }}
          />
          <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
            Welcome {user.displayName}
          </Text>

          <Text style={tw("text-center p-4 font-bold text-red-400")}>
            Step 1. The Profile Pic
          </Text>

          <TextInput
            value={image}
            onChangeText={setImage}
            placeholder="Enter a Profile Pic URL"
            style={tw("text-center text-xl pb-2")}
          />

          <Text style={tw("text-center p-4 font-bold text-red-400")}>
            Step 2. The Occupation
          </Text>

          <TextInput
            value={job}
            onChangeText={setJob}
            placeholder="Enter you occupation"
            style={tw("text-center text-xl pb-2")}
          />

          <Text style={tw("text-center p-4 font-bold text-red-400")}>
            Step 3. The Age
          </Text>

          <TextInput
            value={age}
            onChangeText={setAge}
            placeholder="Enter your age"
            style={tw("text-center text-xl pb-2")}
            maxLength={2}
            keyboardType="numeric"
          />

          <TouchableOpacity
            onPress={updateUserProfile}
            disabled={incompleteForm}
            style={[
              tw("w-64 p-3 rounded-xl mt-10"),
              incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
            ]}
          >
            <Text style={tw("text-center text-white text-xl")}>
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ModalScreen;
