import React, { useState, useEffect, useRef } from "react";
import { View, Text, Animated, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // ✅ Correct import
import Svg, { Circle } from "react-native-svg";

const BreathTimer = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const [isBreathing, setIsBreathing] = useState(false);
  const [duration, setDuration] = useState(4000); // Default: 4s inhale/exhale
  const [timeLeft, setTimeLeft] = useState(0);

  const startBreathing = () => {
    setIsBreathing(true);
    setTimeLeft((duration / 1000) * 6); // Total session time (6 cycles)

    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.5, duration, useNativeDriver: true }), // Inhale
        Animated.timing(scale, { toValue: 1, duration, useNativeDriver: true }), // Exhale
      ])
    ).start();
  };

  useEffect(() => {
    let timer;
    if (isBreathing && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else {
      clearInterval(timer);
      if (timeLeft === 0) setIsBreathing(false);
    }
    return () => clearInterval(timer);
  }, [isBreathing, timeLeft]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breathe In... Breathe Out...</Text>

      <Picker
        selectedValue={duration}
        style={styles.picker}
        onValueChange={(itemValue) => setDuration(itemValue)}
        enabled={!isBreathing}
      >
        <Picker.Item label="4 seconds per cycle" value={4000} />
        <Picker.Item label="6 seconds per cycle" value={6000} />
        <Picker.Item label="8 seconds per cycle" value={8000} />
      </Picker>

      {isBreathing && <Text style={styles.timerText}>Time Left: {timeLeft}s</Text>}

      <Animated.View style={[styles.circleContainer, { transform: [{ scale }] }]}>
        <Svg height="150" width="150">
          <Circle cx="75" cy="75" r="60" fill="#6a79c4" />
        </Svg>
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={startBreathing} disabled={isBreathing}>
        <Text style={styles.buttonText}>{isBreathing ? "Breathing..." : "Start"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cfe2f3",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 250,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  circleContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6a79c4",
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BreathTimer;
