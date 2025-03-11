import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ClassicGrid = ({ wordGrid }) => {
  return (
    <View style={styles.wordGrid}>
      {wordGrid.map((word, index) => (
        <Text key={index} style={styles.gridWord}>
          {word}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wordGrid: {
    flexDirection: "row", // Arrange words in a row
    flexWrap: "wrap", // Allow wrapping if needed
    justifyContent: "center",
    marginVertical: 10,
  },
  gridWord: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#CFE4FE",
    paddingVertical: 5,
    paddingHorizontal: 10, // Dynamic padding for different word lengths
    margin: 4,
    textAlign: "center",
    borderRadius: 5,
    textTransform: "uppercase",
    alignSelf: "flex-start", // Make each word fit its content
  },
});

export default ClassicGrid;
