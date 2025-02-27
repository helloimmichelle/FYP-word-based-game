import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

//add custom background image
const backgroundImage = require("../assets/title-screen-bg.jpg"); 

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.appNameButton}>
          <Text style={styles.buttonText}>app name</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>logo</Text>
        </View>

        <TouchableOpacity 
          style={styles.playButton} 
          onPress={() => navigation.navigate("Game")}
        >
          <Text style={styles.buttonText}>play</Text>
        </TouchableOpacity>

        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.buttonText}>sound</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.buttonText}>shop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // ensures image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appNameButton: {
    backgroundColor: "#6a79c4",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#6a79c4",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  playButton: {
    backgroundColor: "#6a79c4",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomButtons: {
    flexDirection: "row",
    gap: 20,
  },
  smallButton: {
    backgroundColor: "#6a79c4",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
