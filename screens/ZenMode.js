import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircularLetterArrangement from "../components/LetterArrangementZ";
import WordGrid from "../components/gridZ"; 

const ZenMode = () => {
  const navigation = useNavigation();
  const [background, setBackground] = useState(null);
  const [level, setLevel] = useState(1); // Starts at Level 1
  const [letters, setLetters] = useState([]);
  const [baseWord, setBaseWord] = useState("");
  const [wordsToFind, setWordsToFind] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [currentSelection, setCurrentSelection] = useState("");

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
    fetchWord();
  }, [level]); // Fetch new words when level changes

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

  // Fetch a 5-letter word from Datamuse API
  const fetchWord = async () => {
    try {
      const response = await fetch("https://api.datamuse.com/words?sp=?????&max=100"); // Datamuse API Key
      const data = await response.json();

      const words = data
        .map((item) => item.word.toUpperCase()) // Convert the letters to uppercase
        .filter((word) => word.length === 5); // Keeps only 5 letter words

      if (words.length > 0) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setBaseWord(randomWord);
        setLetters(shuffleArray(randomWord.split("")));

        // Find possible words
        findPossibleWords(randomWord);
      } else {
        Alert.alert("Error", "No suitable words found.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch words.");
    }
  };

  // Find valid words that can be formed from letters
  const findPossibleWords = async (baseWord) => {
    try {
      const response = await fetch(`https://api.datamuse.com/words?sp=${baseWord.toLowerCase()}*&max=50`);
      const data = await response.json();

      const validWords = data
        .map((item) => item.word.toUpperCase()) // Ensure uppercase
        .filter((word) => canFormWord(word, baseWord) && word.length >= 3 && word.length <= 7);

      // Randomly select 3-7 words
      const wordsToFind = getRandomSubset(validWords, 3, 7);

      setWordsToFind(wordsToFind);
      setFoundWords([]);
      setCurrentSelection("");
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  // Check if a word can be formed from the base word
  const canFormWord = (word, baseWord) => {
    let baseLetters = baseWord.split("");
    for (let letter of word) {
      if (!baseLetters.includes(letter)) {
        return false;
      }
      baseLetters.splice(baseLetters.indexOf(letter), 1);
    }
    return true;
  };

  // Get a random subset of words (between min and max)
  const getRandomSubset = (words, min, max) => {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = shuffleArray(words);
    return shuffled.slice(0, count);
  };

  // Handle selecting a letter
  const handleLetterSelect = (letter) => {
    setCurrentSelection((prev) => prev + letter);
  };

  // Handle word submission (when user finishes selecting letters)
  const handleWordSubmit = () => {
    const selectedWord = currentSelection.toUpperCase(); // Ensure uppercase
    console.log("Selected Word:", selectedWord);
    console.log("Words to Find:", wordsToFind);
    console.log("Found Words:", foundWords);

    if (wordsToFind.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      console.log("Word is valid and not already found.");
      setFoundWords((prev) => [...prev, selectedWord]);
      setCurrentSelection("");

      // Check if all words are found
      if (foundWords.length + 1 === wordsToFind.length) {
        Alert.alert("Level cleared!");
        setLevel((prev) => prev + 1);
      }
    } else {
      console.log("Word is invalid or already found.");
      Alert.alert("Invalid Word", "The selected letters do not form a valid word.");
      setCurrentSelection("");
    }
  };

  // Reset foundWords
  const handleReset = () => {
    setFoundWords([]);
    setCurrentSelection("");
  };

  // Shuffle letters
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  

  return (
    <ImageBackground source={background} style={styles.background}>

    <View style={styles.container}>
      
      {/* Top Menu */}
      <View style={styles.topMenu}>
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
          <Text style={styles.coinsText}>$ coins</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.levelText}>Level {level}</Text>

      {/* Word Grid */}
      <WordGrid wordsToFind={wordsToFind} foundWords={foundWords} />

      {/* Formed Word Display */}
      <View style={styles.formedWordBox}>
        <Text style={styles.formedWordText}>{currentSelection}</Text>
      </View>

      {/* Circular Letter Arrangement */}
      <CircularLetterArrangement letters={letters} onLetterSelect={handleLetterSelect} />

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.smallButton} onPress={() => setLetters(shuffleArray(letters))}>
          <Text style={styles.buttonText}>Shuffle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton} onPress={handleWordSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
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
  },
  topMenu: {
      flexDirection: "row",
      width: "90%",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      marginTop: 70,
  },
  icon: {
    fontSize: 20,
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
  backButton: {
    position: "absolute",
    top: 5,
    left: 5,
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

export default ZenMode;