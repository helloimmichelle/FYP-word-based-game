import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import LetterArrangementC from "../components/LetterArrangmentC";
import ClassicGrid from "../components/gridC";

const levels = [
  { word: "QUIET", wordsToFind: ["QUIET", "QUE", "QUI"," QUIT", "QUITE"], minWordsToPass: 2 }, 
  { word: "CLOUD", wordsToFind: ["CLOUD", "CUD", "OLD", "COD", "COLD", "DOC"], minWordsToPass: 2 }, 
  { word: "SHINE", wordsToFind: ["SHINE", "HEN", "SHE","HENS", "HINES", "SHIN"], minWordsToPass: 3 }, 
  { word: "SMILE", wordsToFind: ["SMILE", "MILE", "LIME", "SLIM", "SIM", "LIE", "MIL", "ELM"], minWordsToPass: 4 }, 
  { word: "PEACE", wordsToFind: ["PEACE", "PEA", "ACE", "APE", "CAP", "PEE", "PAC", "CAPE", "PACE"], minWordsToPass: 5 }, 
  { word: "FLORA", wordsToFind: ["FLORA", "FOR", "FAR", "OAR", "OAF", "FAR", "LOAF", "FOAL", "ORAL"], minWordsToPass: 5}, 
  { word: "STARS", wordsToFind: ["STARS", "ART", "SAT", "RAT", "TAR", "SAR", "RATS", "TARS", "SASS"], minWordsToPass: 6 }, 
  { word: "PLANT", wordsToFind: ["PLANT", "ANT", "TAN","PAN", "LAP", "PANT", "PAT", "TAP", "PLAN", "PANT","ALT"], minWordsToPass: 6 }, 
  { word: "CLEAR", wordsToFind: ["CLEAR", "CAR", "EAR","ARC", "ARE", "ACE", "ERA", "REC", "CARE", "LACE", "RACE", "REAL", "ACRE"], minWordsToPass: 7 }, 
  { word: "DREAM", wordsToFind: ["DREAM", "DARE", "DAME", "READ", "MARE", "MADE", "DEAR", "MEAD", "RED", "RAM","DAM", "ARM", "ARE"], minWordsToPass: 7 }, 
];

const MAX_HINTS = 3; // Limit hints per level

const ClassicMode = () => {
  const [level, setLevel] = useState(0);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState("");
  const [shuffleLetters, setShuffleLetters] = useState([]);
  const [hintsLeft, setHintsLeft] = useState(MAX_HINTS);
  const [hintWord, setHintWord] = useState(null);

  useEffect(() => {
    setHintsLeft(MAX_HINTS); // Reset hints for new level
    setHintWord(null); // Clear hint when starting a new level
  }, [level]);

  useEffect(() => {
    setShuffleLetters(shuffleArray(levels[level].word.split("")));
  }, [level]);

  const handleLetterSelect = (letter) => {
    setSelectedLetters((prev) => prev + letter);
  };

  const handleWordSubmit = () => {
    const currentLevel = levels[level];
  
    if (currentLevel.wordsToFind.includes(selectedLetters) && !foundWords.includes(selectedLetters)) {
      const updatedFoundWords = [...foundWords, selectedLetters];
      setFoundWords(updatedFoundWords);
      setSelectedLetters("");
  
      // Check if enough words have been found to pass the level
      if (updatedFoundWords.length >= currentLevel.minWordsToPass) {
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

  const handleHint = () => {
    if (hintsLeft > 0) {
      const remainingWords = levels[level].wordsToFind.filter(word => !foundWords.includes(word));
      
      if (remainingWords.length > 0) {
        const hint = remainingWords[0]; // Pick the first unfound word
        setHintWord(hint[0] + " _".repeat(hint.length - 1)); // Show first letter only
        setHintsLeft(hintsLeft - 1);
      } else {
        Alert.alert("No hints available", "You've found all words!");
      }
    } else {
      Alert.alert("No hints left", "Try finding a word yourself!");
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

       {/* Hint Display */}
       {hintWord && (
        <View style={styles.hintBox}>
          <Text style={styles.hintText}>Hint: {hintWord}</Text>
        </View>
      )}

      {/* Hint Button */}
      <TouchableOpacity style={styles.hintButton} onPress={handleHint}>
        <Text style={styles.buttonText}>Hint ({hintsLeft})</Text>
      </TouchableOpacity>
      
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
  hintBox: { 
    backgroundColor: "#f4c542", 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 10 
  },
  hintText: { 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  hintButton: { 
    backgroundColor: "#6a79c4", 
    padding: 10, 
    borderRadius: 5 
  },

});

export default ClassicMode;