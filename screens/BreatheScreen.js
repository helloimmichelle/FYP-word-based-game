import React, { useState, useEffect, useRef } from "react";
import { View, Text, Animated, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker"; //
import Svg, { Circle } from "react-native-svg";

const BreathTimer = () => {
  const navigation = useNavigation();
  const scale = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [duration, setDuration] = useState(4000); // Default 4s inhale/exhale
  const [timeLeft, setTimeLeft] = useState(0);

  const startBreathing = () => {
    setIsBreathing(true);
    setTimeLeft((duration / 1000) * 6); // Total session time (6 cycles)

    animationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.5, duration, useNativeDriver: true }), // Inhale
        Animated.timing(scale, { toValue: 1, duration, useNativeDriver: true }), // Exhale
      ])
    );
    animationRef.current.start();
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setTimeLeft(0);
    animationRef.current?.stop();
  };

  useEffect(() => {
    let timer;
    if (isBreathing && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else {
      clearInterval(timer);
      if (timeLeft === 0) {
        setIsBreathing(false);
        animationRef.current?.stop();
      }
    }
    return () => clearInterval(timer);
  }, [isBreathing, timeLeft]);

  return (
    <View style={styles.container}>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Top Text */}
      <Text style={styles.title}>breathe in... breathe out...</Text>

      {/* Animated Circle */}
      <Animated.View style={[styles.circleContainer, { transform: [{ scale }] }]}>
        <Svg height="150" width="150">
          <Circle cx="75" cy="75" r="60" fill="#e8bcf0" />
        </Svg>
      </Animated.View>

      {/* Time Left Text (appears when timer starts) */}
      {isBreathing && <Text style={styles.timerText}>time left: {timeLeft}s</Text>}

      {/* Buttons */}
      {!isBreathing ? (
        <TouchableOpacity style={styles.startButton} onPress={startBreathing}>
          <Text style={styles.buttonText}>start</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.endButton} onPress={stopBreathing}>
          <Text style={styles.buttonText}>end session</Text>
        </TouchableOpacity>
      )}

      {/* Scroll Picker */}
      <Picker
        selectedValue={duration}
        style={styles.picker}
        onValueChange={(itemValue) => setDuration(itemValue)}
        enabled={!isBreathing}
      >
        <Picker.Item label="4 secs per cycle" value={4000} color="#e8bcf0" />
        <Picker.Item label="6 secs per cycle" value={6000} color="#e8bcf0" />
        <Picker.Item label="8 secs per cycle" value={8000} color="#e8bcf0" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#cfe2f3",
  },
  picker: {
    height: 30,
    width: 250,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop:10,
    marginBottom: 10,
    color: "#cfe2f3",
  },
  circleContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    marginTop: 70,
  },
  startButton: {
    backgroundColor: "#6a79c4",
    padding: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  endButton: {
    backgroundColor: "#d21f3c",
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BreathTimer;
