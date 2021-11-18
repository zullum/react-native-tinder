import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swipper from "react-native-deck-swiper";

const DUMMY_DATA = [
  {
    firstName: "Bill",
    lastName: "Gates",
    job: "Software Engineer",
    photoURL:
      "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f4ebe0c87612dab4f12a597%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D292%26cropX2%3D3684%26cropY1%3D592%26cropY2%3D3987",
    age: 32,
    id: 32,
  },
  {
    firstName: "Jennifer",
    lastName: "Lopez",
    job: "Singer",
    photoURL:
      "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgwMTgyMjU4NjIyMTQ1ODgw/gettyimages-469873772.jpg",
    age: 52,
    id: 52,
  },
  {
    firstName: "Elon",
    lastName: "Musk",
    job: "Software Developer",
    photoURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKrKw_UPVhOfsKrnl09lOsJULSYTKoN4UZ-Q&usqp=CAU",
    age: 45,
    id: 45,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swipeRef = useRef(null);

  return (
    <SafeAreaView
      style={[tw("flex-1"), { marginTop: StatusBar.currentHeight }]}
    >
      {/* Header */}
      <View style={tw("flex-row items-center justify-between px-5")}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={[tw("w-10 h-10 rounded-full")]}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image style={[tw("w-14 h-14")]} source={require("../logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>

      {/* End of Header */}

      {/* Cards */}
      <View style={[tw("flex-1 -mt-6")]}>
        <Swipper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          onSwipedLeft={() => {
            console.log("Swipe PASS");
          }}
          onSwipedRight={() => {
            console.log("Swipe MATCH");
          }}
          backgroundColor={"#4fd0e9"}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4ded30",
                },
              },
            },
          }}
          renderCard={(card) => (
            <View
              key={card.id}
              style={[tw("relative bg-white h-3/4 rounded-xl")]}
            >
              <Image
                style={[tw("absolute top-0 h-full w-full rounded-xl")]}
                source={{ uri: card.photoURL }}
              />
              <View
                style={[
                  tw(
                    "absolute bottom-0 flex-row justify-between items-center px-6 py-2 rounded-b-xl bg-white w-full h-20"
                  ),
                  styles.cardShadow,
                ]}
              >
                <View>
                  <Text style={tw("text-xl font-bold")}>
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* End of Cards */}

      <View style={tw("flex flex-row justify-evenly pb-5")}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-red-200"
          )}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-green-200"
          )}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
