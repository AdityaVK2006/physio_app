import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import React, { useRef, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import GymLogic from "../components/GymLogic";

const ExerciseDetail = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const exercise = params.exercise
    ? JSON.parse(params.exercise as string)
    : null;
  const successPlayer = useAudioPlayer(
    "https://www.soundjay.com/buttons/sounds/button-09.mp3",
  );
  const webViewRef = useRef<any>(null);
  const [stats, setStats] = useState({
    counter: 0,
    feedback: "Align Body",
    angle: 0,
  });

  if (!exercise) {
    return (
      <View style={styles.errorContainer}>
        <Text>Exercise not found</Text>
      </View>
    );
  }

  const handleComplete = () => {
    successPlayer.play();
    // In a real app, we would update the backend/state here
  };

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "SPEAK") {
        Speech.speak(data.text);
      }
      if (data.type === "STATS") {
        setStats({
          counter: data.counter,
          feedback: data.feedback,
          angle: data.angle,
        });
      }
    } catch (err) {}
  };

  const switchExercise = (name: string) => {
    const script = `var event = new MessageEvent("message", { data: JSON.stringify({ type: 'SET_EXERCISE', name: '${name}' }) }); document.dispatchEvent(event); true;`;
    if (webViewRef.current && webViewRef.current.injectJavaScript) {
      webViewRef.current.injectJavaScript(script);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{exercise.name}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.videoContainer}>
          <View style={{ flex: 1 }}>
            <GymLogic
              ref={webViewRef}
              onMessage={handleWebViewMessage}
              style={styles.video}
            />
            <View style={styles.trainerOverlay} pointerEvents="none">
              <Text style={styles.overlayText}>REPS: {stats.counter}</Text>
              <Text style={styles.overlaySmall}>{stats.feedback}</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={20} color="#44B8F3" />
              <Text style={styles.metaLabel}>Duration</Text>
              <Text style={styles.metaValue}>{exercise.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="barbell-outline" size={20} color="#44B8F3" />
              <Text style={styles.metaLabel}>Difficulty</Text>
              <Text style={styles.metaValue}>{exercise.difficulty}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="flame-outline" size={20} color="#44B8F3" />
              <Text style={styles.metaLabel}>Calories</Text>
              <Text style={styles.metaValue}>{exercise.calories}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {exercise.instructions?.map(
              (instruction: string, index: number) => (
                <View key={index} style={styles.instructionItem}>
                  <View style={styles.instructionNumber}>
                    <Text style={styles.instructionNumberText}>
                      {index + 1}
                    </Text>
                  </View>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ),
            )}
          </View>

          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
          >
            <LinearGradient
              colors={["#44B8F3", "#2A9FD9"]}
              style={styles.completeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="#fff"
              />
              <Text style={styles.completeText}>Mark as Completed</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.trainerControls}>
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={() => switchExercise("curl")}
            >
              <Text style={styles.controlText}>Curls</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={() => switchExercise("squat")}
            >
              <Text style={styles.controlText}>Squats</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlBtn}
              onPress={() => switchExercise("lift")}
            >
              <Text style={styles.controlText}>Lifts</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#333" },
  scrollContent: { paddingBottom: 40 },
  videoContainer: { width: "100%", height: 250, backgroundColor: "#000" },
  video: { width: "100%", height: "100%" },
  content: { padding: 25 },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  metaItem: { alignItems: "center", flex: 1 },
  metaLabel: { fontSize: 12, color: "#666", marginTop: 5 },
  metaValue: { fontSize: 16, fontWeight: "600", color: "#333", marginTop: 2 },
  section: { marginBottom: 30 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#44B8F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    marginTop: 2,
  },
  instructionNumberText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  instructionText: { fontSize: 15, color: "#444", lineHeight: 22, flex: 1 },
  completeButton: { borderRadius: 15, overflow: "hidden", marginTop: 10 },
  completeGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
  },
  completeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 10,
  },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  trainerOverlay: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 8,
    alignItems: "flex-end",
  },
  overlayText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  overlaySmall: { color: "#fff", fontSize: 12 },
  trainerControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  controlBtn: {
    backgroundColor: "#44B8F3",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  controlText: { color: "#fff", fontWeight: "700" },
});

export default ExerciseDetail;
