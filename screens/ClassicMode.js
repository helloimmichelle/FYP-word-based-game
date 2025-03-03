import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import LetterArrangementC from "../components/LetterArrangmentC";
import ClassicGrid from "../components/ClassicGrid";

const levels = [
  { word: "BLIND", wordsToFind: ["BIN", "LID", "BID"] },
  { word: "PLANT", wordsToFind: ["PAN", "ANT", "TAN"] },
  { word: "GRAPE", wordsToFind: ["RAP", "GAP", "APE"] },
  { word: "SHINE", wordsToFind: ["HEN", "SIN", "SHE"] },
  { word: "CLOUD", wordsToFind: ["CUD", "OLD", "COD"] },
  { word: "FRUIT", wordsToFind: ["FIT", "RUT", "TUI"] },
  { word: "SMILE", wordsToFind: ["SIM", "LIE", "MIL"] },
  { word: "TABLE", wordsToFind: ["BAT", "TAB", "ALE"] },
  { word: "DRINK", wordsToFind: ["INK", "RID", "KIN"] },
  { word: "STONE", wordsToFind: ["TON", "ONE", "SET"] },
];

const ClassicMode = () => {
  const [level, setLevel] = useState(0);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState("");

  const currentLevel = levels[level];
  const shuffledLetters = shuffleArray(currentLevel.word.split(""));

  const handleLetterSelect = (letter) => {
    setSelectedLetters((prev) => prev + letter);
  };

  const handleSubmitWord = () => {
    if (currentLevel.wordsToFind.includes(selectedLetters) && !foundWords.includes(selectedLetters)) {
      setFoundWords([...foundWords, selectedLetters]);
      setSelectedLetters("");

      if (foundWords.length + 1 === currentLevel.wordsToFind.length) {
        handleLevelComplete();
      }
    } else {
      Alert.alert("Invalid Word", "Try again.");
      setSelectedLetters("");
    }
  };

  const handleLevelComplete = () => {
    if (level < levels.length - 1) {
      Alert.alert("Well done!", "Next level unlocked.", [
        {
          text: "OK",
          onPress: () => {
            setLevel(level + 1);
            setFoundWords([]);
            setSelectedLetters("");
          },
        },
      ]);
    } else {
      Alert.alert("Congratulations!", "You've completed all levels!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>Level {level + 1}</Text>
      <ClassicGrid wordGrid={foundWords} />
      <View style={styles.formedWordBox}>
        <Text style={styles.formedWordText}>{selectedLetters}</Text>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.smallButton} onPress={handleSubmitWord}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <LetterArrangementC letters={shuffledLetters} onLetterSelect={handleLetterSelect} />
    </View>
  );
};

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#cfe2f3",
  },
  levelText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  formedWordBox: {
    backgroundColor: "#6a79c4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  formedWordText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomButtons: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  smallButton: {
    backgroundColor: "#6a79c4",
    width: 80,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ClassicMode;
