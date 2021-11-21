import React from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import Header from "../components/Header";
import tw from "tailwind-rn";
import ChatList from "../components/ChatList";

const ChatScreen = () => {
  return (
    <SafeAreaView
      style={[tw("flex-1"), { marginTop: StatusBar.currentHeight }]}
    >
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
