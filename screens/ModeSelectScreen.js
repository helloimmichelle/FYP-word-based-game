import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ModeSelectScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Help Button */}
      <TouchableOpacity style={styles.helpButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="help-circle" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.heading}>select a mode:</Text>

      {/* Classic Mode Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ClassicMode")}>
        <Text style={styles.buttonText}>classic mode</Text>
        <Text style={styles.description}>solve puzzles in each level and progress in difficulty</Text>
      </TouchableOpacity>

      {/* Zen Mode Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ZenMode")}>
        <Text style={styles.buttonText}>zen mode</Text>
        <Text style={styles.description}>no pressure here{"\n"}play endlessly for the vibes</Text>
      </TouchableOpacity>

      {/* Instructions Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>How to Play</Text>
            <Text style={styles.modalText}>
              - Swipe to connect letters and form words.{"\n"}
              - In Classic Mode, solve words to progress through levels.{"\n"}
              - In Zen Mode, play freely with no time limits.{"\n"}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CBE2F5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#7086C1",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
  helpButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: "#7086C1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ModeSelectScreen;
