import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import LetterArrangementC from "../components/LetterArrangmentC";
import ClassicGrid from "../components/gridC";

const levels = [
  { word: "SHINE", wordsToFind: ["SHINE", "HEN", "SHE"] }, // level 1
  { word: "PLANT", wordsToFind: ["PLANT", "ANT", "TAN"] }, // level 2
  { word: "DREAM", wordsToFind: ["DREAM", "ARM", "MAD", "MARE"] }, // level 3
  { word: "PEACE", wordsToFind: ["PEACE", "PEA", "ACE", "APE"] }, // level 4
  { word: "CLOUD", wordsToFind: ["CLOUD", "CUD", "OLD", "COD"] },
  { word: "FRUIT", wordsToFind: ["FIT", "RUT", "TUI"] },
  { word: "SMILE", wordsToFind: ["SMILE", "MILE", "SIM", "LIE", "MIL"] },
  { word: "TABLE", wordsToFind: ["BAT", "TAB", "ALE"] },
  { word: "DRINK", wordsToFind: ["INK", "RID", "KIN"] },
  { word: "STONE", wordsToFind: ["TON", "ONE", "SET"] },
];

const ClassicMode = () => {
  const [level, setLevel] = useState(0);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState("");
  const [shuffleLetters, setShuffleLetters] = useState([]);
  

  useEffect(() => {
    setShuffleLetters(shuffleArray(levels[level].word.split("")));
  }, [level]);

  const handleLetterSelect = (letter) => {
    setSelectedLetters((prev) => prev + letter);
  };

  const handleWordSubmit = () => {
    if (levels[level].wordsToFind.includes(selectedLetters) && !foundWords.includes(selectedLetters)) {
      setFoundWords([...foundWords, selectedLetters]);
      setSelectedLetters("");

      if (foundWords.length + 1 === levels[level].wordsToFind.length) {
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

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleShuffle = () => {
    setShuffleLetters(shuffleArray(shuffleLetters));
  };

  return (
    <View style={styles.container}>

      {/* Top Menu */}
    <View style={styles.topMenu}>
      <TouchableOpacity>
        <Text style={styles.icon}></Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.icon}></Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.coinsButton}>
        <Text style={styles.coinsText}>$ coins</Text>
      </TouchableOpacity>
    </View>

      <Text style={styles.levelText}>Level {level + 1}</Text>
      
      {/* Word Grid */}
      <ClassicGrid wordGrid={foundWords} />

      {/* Formed Word Display */}
      <View style={styles.formedWordBox}>
        <Text style={styles.formedWordText}>{selectedLetters}</Text>
      </View>

       {/* Circular Letter Arrangement */}
      <LetterArrangementC letters={shuffleLetters} onLetterSelect={handleLetterSelect} />

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.smallButton} onPress={handleShuffle}>
          <Text style={styles.buttonText}>Shuffle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton} onPress={handleWordSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton} onPress={() => setSelectedLetters("")}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#cfe2f3",
  },
  topMenu: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  coinsButton: {
    backgroundColor: "#6a79c4",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  coinsText: {
    color: "white",
    fontWeight: "bold",
  },
  levelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
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