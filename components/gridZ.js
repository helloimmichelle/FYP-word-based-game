import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const ZenGrid = ({ wordsToFind = [], foundWords = [] }) => {
  return (
    <View style={styles.gridContainer}>
      {wordsToFind.map((word, index) => (
        <View key={index} style={styles.wordBox}>
          <Text style={styles.wordText}>
            {foundWords.includes(word) ? word : "_".repeat(word.length)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: screenWidth * 0.9, // Use 90% of screen width
  },
  wordBox: {
    backgroundColor: "#CFE4FE",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: (screenWidth * 0.9) / 3 - 10, // 3 boxes per row with spacing
    alignItems: "center",
    justifyContent: "center",
  },
  wordText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ZenGrid;