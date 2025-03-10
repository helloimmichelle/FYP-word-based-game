import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LetterArrangementC from "../components/LetterArrangmentC";
import ClassicGrid from "../components/gridC";

// 10 Levels with increasing words to find
const levels = [
  { word: "QUIET", wordsToFind: ["QUIET", "QUE", "TIE", "QUI","QUIT", "QUITE"], minWordsToPass: 3 }, 
  { word: "CLOUD", wordsToFind: ["CLOUD", "CUD", ,"LOUD", "OLD", "COD", "COLD", "DOC"], minWordsToPass: 3 }, 
  { word: "SHINE", wordsToFind: ["SHINE", "HEN", "HIS", "SHE","HENS", "HINES", "SHIN", "SIN"], minWordsToPass: 4 }, 
  { word: "SMILE", wordsToFind: ["SMILE", "SLIME", "MILES", "MILE", "LIME", "SLIM", "SIM", "LIE", "MIL", "ELM"], minWordsToPass: 4 }, 
  { word: "PEACE", wordsToFind: ["PEACE", "PEA", "ACE", "APE", "CAP", "PEE", "PAC", "CAPE", "PACE"], minWordsToPass: 5 }, 
  { word: "FLORA", wordsToFind: ["FLORA", "FOR", "FAR", "OAR", "OAF", "FAR", "LOAF", "FOAL", "ORAL"], minWordsToPass: 5}, 
  { word: "STARS", wordsToFind: ["STARS", "STAR", "ART", "ARTS", "SAT", "RAT", "RATS", "TAR", "SAR", "RATS", "TARS", "SASS"], minWordsToPass: 6 }, 
  { word: "PLANT", wordsToFind: ["PLANT", "ANT", "TAN","PAN", "LAP", "PAL", "PANT", "PAT", "TAP", "PLAN", "PANT","ALT"], minWordsToPass: 6 }, 
  { word: "CLEAR", wordsToFind: ["CLEAR", "CAR", "EAR","ARC", "ARE", "ACE", "ALE", "EARL", "ERA", "REC", "CARE", "LACE", "RACE", "REAL", "ACRE"], minWordsToPass: 7 }, 
  { word: "DREAM", wordsToFind: ["DREAM", "DARE", "DAME", "READ", "MARE", "MADE", "DEAR", "MEAD", "RED", "RAM","DAM", "MAD", "ARM", "ARE"], minWordsToPass: 8 }, 
];

const MAX_HINTS = 3; // Limit hints per level

const ClassicMode = () => {
  const navigation = useNavigation();
  const [background, setBackground] = useState(null);
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(0);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState("");
  const [shuffleLetters, setShuffleLetters] = useState([]);
  const [hintsLeft, setHintsLeft] = useState(MAX_HINTS);
  const [hintWord, setHintWord] = useState(null);
  
  useEffect(() => {
    const loadBackground = async () => {
      try {
        const selectedBg = await AsyncStorage.getItem("selectedBackground");
        if (selectedBg) {
          console.log("Applying background:", selectedBg); // Debugging log
          setBackground(getBackgroundImage(selectedBg));
        }
      } catch (error) {
        console.log("Error loading background:", error);
      }
    };
    loadBackground();
  }, []);

  useEffect(() => {
    // Load coins from storage when the game starts
    const loadCoins = async () => {
      const savedCoins = await AsyncStorage.getItem("coins");
      if (savedCoins !== null) {
        setCoins(parseInt(savedCoins));
      }
    };
    loadCoins();
  }, []);

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

  const getBackgroundImage = (bgId) => {
    switch (bgId) {
      case "bg1":
        return require("../assets/bg-1.jpg");
      case "bg2":
         return require("../assets/bg-2.jpg");
      case "bg3":
         return require("../assets/bg-3.jpg");
      default:
        return require("../assets/title-screen-bg.jpg"); // Add a default background
    }
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
      Alert.alert("invalid word", "try again");
      setSelectedLetters("");
    }
  };

  const handleLevelComplete = () => {
    if (level < levels.length - 1) {
      const newCoins = coins + 10;
      setCoins(newCoins);
      AsyncStorage.setItem("coins", newCoins.toString()); // Save coins
      Alert.alert("all words found", "next level unlocked", [
        {
          text: "go",
          onPress: () => {
            setCoins(coins + 10); // Increase coins
            setLevel(level + 1); // Increase level
            setFoundWords([]);
            setSelectedLetters("");
          },
        },
      ]);
    } else {
      Alert.alert(
        "all levels complete",
        "how would you like to be more at ease?",
        [
          { text: "play again", onPress: () => restartGame() },
          { text: "homescreen", onPress: () => navigateTo("HomeScreen") },
          { text: "select mode", onPress: () => navigateTo("ModeSelect") },
          { text: "breathe", onPress: () => navigateTo("BreatheTimer") },
        ]
      );
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
        Alert.alert("no hints available", "you've found all words");
      }
    } else {
      Alert.alert("no hints left", "try finding a word yourself");
    }
  };

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleShuffle = () => {
    setShuffleLetters(shuffleArray(shuffleLetters));
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      
    <View style={styles.container}>

    {/* Top Menu */}
    <View style={styles.topMenu}>
       {/* Back Button */}
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.icon}></Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.icon}></Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.coinsButton}>
        <Text style={styles.coinsText}>🪙{coins} coins</Text>
      </TouchableOpacity>
    </View>

      <Text style={styles.levelText}>level {level + 1}</Text>
      
      {/* Word Grid */}
      <ClassicGrid wordGrid={foundWords} />

      {/* Formed Word Display */}
      <View style={styles.formedWordBox}>
        <Text style={styles.formedWordText}>{selectedLetters}</Text>
      </View>

       {/* Circular Letter Arrangement */}
      <LetterArrangementC letters={shuffleLetters} onLetterSelect={handleLetterSelect} />

       {/* Hint Display */}
       {hintWord && (
        <View style={styles.hintBox}>
          <Text style={styles.hintText}>hint: {hintWord}</Text>
        </View>
      )}

      {/* Hint Button */}
      <TouchableOpacity style={styles.hintButton} onPress={handleHint}>
        <Text style={styles.buttonText}>hint ({hintsLeft})</Text>
      </TouchableOpacity>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.smallButton} onPress={handleShuffle}>
          <Text style={styles.buttonText}>shuffle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton} onPress={handleWordSubmit}>
          <Text style={styles.buttonText}>submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton} onPress={() => setSelectedLetters("")}>
          <Text style={styles.buttonText}>reset</Text>
        </TouchableOpacity>

        
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { 
    flex: 1, 
    resizeMode: "cover" 
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    // backgroundColor: "#cfe2f3",
  },
  topMenu: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 70,
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
    backgroundColor: "#e8bcf0", 
    padding: 10, 
    borderRadius: 15, 
    marginBottom: 10 
  },
  hintText: { 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  hintButton: { 
    backgroundColor: "#6a79c4", 
    padding: 10, 
    borderRadius: 10 
  },

});

export default ClassicMode;