import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Line } from "react-native-svg";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const LetterArrangementZ = ({ letters, onLetterSelect, targetWord }) => {
  const [selectedLetters, setSelectedLetters] = useState([]); // Track selected letters
  const radius = 100;
  const centerX = 150;
  const centerY = 150;

  // Reset selected letters when new letters are set (new level)
  useEffect(() => {
    setSelectedLetters([]);
  }, [letters]);

  // Position letters in a circular arrangement
  const positions = letters.map((_, index) => {
    const angle = (index / letters.length) * (2 * Math.PI);
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  const handleGesture = (event) => {
    const { x, y } = event.nativeEvent;

    positions.forEach((pos, index) => {
      const dx = x - pos.x;
      const dy = y - pos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only add letter if it's not already selected
      if (distance < 20 && !selectedLetters.includes(letters[index])) {
        setSelectedLetters((prev) => [...prev, letters[index]]);
        onLetterSelect(letters[index]);
      }
    });
  };

  const handleGestureStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      // Check if selected word matches targetWord
      const formedWord = selectedLetters.join("");
      // if (formedWord === targetWord) {
      //   alert("Level cleared!");
      // } else {
      //   alert("Try again!");
      // }
      setSelectedLetters([]); // Reset selection after attempt
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGesture}
      onHandlerStateChange={handleGestureStateChange}
    >
      <View style={styles.container}>
        <Svg height="300" width="300">
          {/* Draw lines between selected letters */}
          {selectedLetters.map((_, index) => {
            if (index < selectedLetters.length - 1) {
              const currentPos = positions[letters.indexOf(selectedLetters[index])];
              const nextPos = positions[letters.indexOf(selectedLetters[index + 1])];

              return (
                <Line
                  key={index}
                  x1={currentPos.x}
                  y1={currentPos.y}
                  x2={nextPos.x}
                  y2={nextPos.y}
                  stroke="blue"
                  strokeWidth="2"
                />
              );
            }
            return null;
          })}
        </Svg>

        {/* Display letters in a circle */}
        {positions.map((pos, index) => (
          <View
            key={index}
            style={[
              styles.letterContainer,
              { top: pos.y - 20, left: pos.x - 20 },
            ]}
          >
            <Text style={styles.letter}>{letters[index]}</Text>
          </View>
        ))}
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 300,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  letterContainer: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C6E3C8",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  letter: {
    fontSize: 24,
    color: "#1E1E1E",
    fontWeight: "bold",
  },
});

export default LetterArrangementZ;
