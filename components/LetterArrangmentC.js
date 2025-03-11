import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Line } from "react-native-svg";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const LetterArrangementC = ({ letters, onLetterSelect }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [dragging, setDragging] = useState(false); // Track dragging state
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

  const findLetterIndex = (x, y) => {
    return positions.findIndex((pos) => {
      const dx = x - pos.x;
      const dy = y - pos.y;
      return Math.sqrt(dx * dx + dy * dy) < 20;
    });
  };

  const handleGestureStateChange = (event) => {
    const { x, y, state } = event.nativeEvent;

    if (state === State.BEGAN) {
      const index = findLetterIndex(x, y);
      if (index !== -1) {
        setSelectedLetters([letters[index]]); // Start with only this letter so no double input
        onLetterSelect(letters[index]);
        setDragging(true);
      }
    } else if (state === State.END) {
      setDragging(false);
    }
  };

  const handleGesture = (event) => {
    if (!dragging) return;

    const { x, y } = event.nativeEvent;
    const index = findLetterIndex(x, y);

    if (index !== -1 && !selectedLetters.includes(letters[index])) {
      setSelectedLetters((prev) => [...prev, letters[index]]);
      onLetterSelect(letters[index]);
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGesture}
      onHandlerStateChange={handleGestureStateChange}
    >
      <View style={styles.container}>
      <Svg height="300" width="300">
      {selectedLetters.map((_, index) => {
        if (index < selectedLetters.length - 1) {
          const currentIndex = letters.indexOf(selectedLetters[index]);
          const nextIndex = letters.indexOf(selectedLetters[index + 1]);

          // Prevent accessing undefined positions
          if (currentIndex === -1 || nextIndex === -1) return null;
          if (!positions[currentIndex] || !positions[nextIndex]) return null;

          return (
            <Line
              key={index}
              x1={positions[currentIndex].x}
              y1={positions[currentIndex].y}
              x2={positions[nextIndex].x}
              y2={positions[nextIndex].y}
              stroke="white"
              strokeWidth="2"
            />
          );
        }
        return null;
      })}
    </Svg>
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
    color: "#333",
    fontWeight: "bold",
  },
});

export default LetterArrangementC;
