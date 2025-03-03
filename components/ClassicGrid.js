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
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 20,
  },
  gridWord: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    textAlign: "center",
    borderRadius: 5,
    width: 80,
    textTransform: "uppercase",
  },
});

export default ClassicGrid;
