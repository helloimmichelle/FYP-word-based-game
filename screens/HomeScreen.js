import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
import { Audio } from "expo-av";

const backgroundImage = require("../assets/title-screen-bg.jpg"); // Add custom background image
const logoImage = require("../assets/logo.jpg");

const HomeScreen = ({ navigation }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let isMounted = true; // Track if component is still mounted

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/11pm-acnl.mp3"),
        { isLooping: true }
      );

      if (isMounted) {
        setSound(sound);
        await sound.playAsync(); // Auto-play when loaded
      }
    };

    loadSound();

    return () => {
      isMounted = false;
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const toggleSound = async () => { //Toggle sound playing 
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <Image source={logoImage} style={styles.logo} />
      <View style={styles.container}>
        {/* Selection Buttons */}
        <TouchableOpacity style={styles.playButton} onPress={() => navigation.navigate("Mode")}>
          <Text style={styles.buttonText}>play</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.breatheButton} onPress={() => navigation.navigate("Timer")}>
          <Text style={styles.buttonText}>breathe</Text>
        </TouchableOpacity>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          {/* Sound Toggle */}
          <TouchableOpacity style={styles.smallButton} onPress={toggleSound}>
            <Text style={styles.buttonText}>{isPlaying ? "mute" : "sound"}</Text>
          </TouchableOpacity>

          {/* Shop */}
          <TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate("Shop")}>
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
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    flex: 1,
    width: null,
    height: 100,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingTop: 100,
  },
  playButton: {
    backgroundColor: "#7086C1",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginBottom: 20,
  },
  breatheButton: {
    backgroundColor: "#7086C1",
    paddingVertical: 12,
    paddingHorizontal: 38,
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
    backgroundColor: "#7086C1",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
