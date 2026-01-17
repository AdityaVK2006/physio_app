import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Platform,
} from "react-native";
import * as Linking from 'expo-linking';
import GymLogic from "../components/GymLogic";

export default function Trainer() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const exerciseParam = params?.exercise;
  const webViewRef = useRef<any>(null);
  const [stats, setStats] = useState({
    counter: 0,
    feedback: "Align Body",
    angle: 0,
  });
  const [exerciseName, setExerciseName] = useState<string>("curl");

  useEffect(() => {
    if (exerciseParam) {
      try {
        const ex = JSON.parse(exerciseParam as string);
        if (ex?.name)
          setExerciseName(
            ex.name.toLowerCase().includes("squat")
              ? "squat"
              : ex.name.toLowerCase().includes("curl")
                ? "curl"
                : "lift",
          );
      } catch (e) {}
    }
  }, [exerciseParam]);

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "SPEAK") Speech.speak(data.text);
      if (data.type === "STATS")
        setStats({
          counter: data.counter,
          feedback: data.feedback,
          angle: data.angle,
        });
    } catch (err) {}
  };

  const switchExercise = (name: string) => {
    const script = `var event = new MessageEvent("message", { data: JSON.stringify({ type: 'SET_EXERCISE', name: '${name}' }) }); document.dispatchEvent(event); true;`;
    if (webViewRef.current && webViewRef.current.injectJavaScript)
      webViewRef.current.injectJavaScript(script);
    setExerciseName(name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Trainer</Text>

        {/* Open hosted Trainer HTML in device browser (native workaround for getUserMedia) */}
        <View style={{ width: 140, alignItems: 'flex-end' }}>
          <Button
            title={Platform.OS === 'web' ? 'Open Trainer (Web)' : 'Open in Browser'}
            onPress={() => {
              // Replace this URL with the public URL where you host `GymTrainerHTML` (e.g. GitHub Pages, S3, or a tunnel URL)
              const GYM_TRAINER_URL = 'https://adityavk2006.github.io/GymLogic/';
              Linking.openURL(GYM_TRAINER_URL);
            }}
          />
        </View>
      </View>

      <View style={styles.webviewContainer}>
        <GymLogic ref={webViewRef} onMessage={handleWebViewMessage} />
        <View style={styles.overlay} pointerEvents="none">
          <Text style={styles.counter}>Reps: {stats.counter}</Text>
          <Text style={styles.feedback}>{stats.feedback}</Text>
        </View>
      </View>

      <View style={styles.controls}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  backBtn: { padding: 8 },
  backText: { color: "#fff" },
  title: { color: "#fff", fontSize: 18, fontWeight: "700" },
  webviewContainer: { flex: 1 },
  overlay: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 8,
    alignItems: "flex-end",
  },
  counter: { color: "#fff", fontSize: 18, fontWeight: "700" },
  feedback: { color: "#fff", fontSize: 12 },
  controls: {
    height: 84,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#111",
  },
  controlBtn: {
    backgroundColor: "#44B8F3",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  controlText: { color: "#fff", fontWeight: "700" },
});
