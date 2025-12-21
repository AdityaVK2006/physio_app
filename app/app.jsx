import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Speech from 'expo-speech';

// IMPORT THE FILE YOU CREATED IN STEP 1
import {GymTrainerHTML} from './GymLogic'; 

export default function App() {
  const webViewRef = useRef(null);
  
  // App State
  const [stats, setStats] = useState({
    counter: 0,
    feedback: "Align Body",
    angle: 0
  });

  // 1. Receive Data from Logic
  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data.type === 'SPEAK') {
        Speech.speak(data.text);
      }
      if (data.type === 'STATS') {
        setStats({
          counter: data.counter,
          feedback: data.feedback,
          angle: data.angle
        });
      }
    } catch (err) { }
  };

  // 2. Send Data to Logic
  const switchExercise = (name) => {
    const script = `
      var event = new MessageEvent("message", { data: JSON.stringify({ type: 'SET_EXERCISE', name: '${name}' }) });
      document.dispatchEvent(event);
    `;
    webViewRef.current.injectJavaScript(script);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#111' }}>
      
      {/* HEADER: Score & Feedback */}
      <View style={styles.header}>
        <View style={styles.box}>
          <Text style={styles.label}>REPS</Text>
          <Text style={styles.bigText}>{stats.counter}</Text>
        </View>
        <View style={[styles.box, { flex: 2 }]}>
          <Text style={styles.label}>FEEDBACK</Text>
          <Text style={[styles.feedback, { color: stats.feedback.includes('GOOD') ? '#0f0' : 'orange' }]}>
            {stats.feedback}
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>ANGLE</Text>
          <Text style={styles.midText}>{stats.angle}°</Text>
        </View>
      </View>

      {/* BODY: The Hidden Logic */}
      <View style={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          source={{ html: GymTrainerHTML }}
          style={{ flex: 1, backgroundColor: 'transparent' }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          onMessage={handleWebViewMessage}
        />
      </View>

      {/* FOOTER: Controls */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={() => switchExercise('curl')}>
          <Text style={styles.btnText}>Curls</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => switchExercise('squat')}>
          <Text style={styles.btnText}>Squats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => switchExercise('lift')}>
          <Text style={styles.btnText}>Lifts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', height: 100, padding: 5, backgroundColor: '#222' },
  box: { flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#444', margin: 2, borderRadius: 8 },
  label: { color: '#888', fontSize: 10, fontWeight: 'bold' },
  bigText: { color: '#fff', fontSize: 40, fontWeight: 'bold' },
  midText: { color: '#fff', fontSize: 22 },
  feedback: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  footer: { flexDirection: 'row', height: 80, backgroundColor: '#222', alignItems: 'center', justifyContent: 'space-around' },
  btn: { backgroundColor: '#444', padding: 15, borderRadius: 10, width: 90, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});