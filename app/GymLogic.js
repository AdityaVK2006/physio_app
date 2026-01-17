import React from "react";
import { WebView } from "react-native-webview";

export const GymTrainerHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <script src="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js" crossorigin="anonymous"></script>
  <style>
    body { margin: 0; background-color: black; overflow: hidden; }
    #video { position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; object-fit: cover; transform: scaleX(-1); }
    #canvas { position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; transform: scaleX(-1); }
  </style>
</head>
<body>
  <video id="video" autoplay playsinline muted></video>
  <canvas id="canvas"></canvas>

<script>
// --- STATE VARIABLES ---
let poseLandmarker = undefined;
let lastVideoTime = -1;
let state = {
  counter: 0,
  stage: null,
  currentExercise: 'curl', 
  side: 'left',
  readyPositionConfirmed: false,
  consecutiveGoodReps: 0,
  lastFeedbackTime: 0,
  
  // Debounce Counters (Frame Counting)
  elbowDriftFrames: 0,
  shrugFrames: 0,
  leanFrames: 0,
  kneeInwardFrames: 0,
  leanForwardFrames: 0,
  liftTooHighFrames: 0
};

const ERROR_FRAME_THRESHOLD = 8;
const FEEDBACK_COOLDOWN = 2500; 

// --- COMMUNICATION BRIDGE ---
function speak(text, priority = false) {
  const now = Date.now();
  if (priority || (now - state.lastFeedbackTime > FEEDBACK_COOLDOWN)) {
    state.lastFeedbackTime = now;
    if(window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'SPEAK', text: text }));
    }
  }
}

function sendStatsToApp(feedbackText, angle) {
  if(window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'STATS',
      counter: state.counter,
      stage: state.stage,
      feedback: feedbackText,
      exercise: state.currentExercise,
      angle: Math.floor(angle)
    }));
  }
}

// --- MATH HELPER ---
function calculateAngle(a, b, c) {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs(radians * 180.0 / Math.PI);
  if (angle > 180.0) angle = 360 - angle;
  return angle;
}

// --- EXERCISE LOGIC ---
function logicBicepCurl(landmarks) {
  let s_idx = state.side === 'left' ? 11 : 12;
  let e_idx = state.side === 'left' ? 13 : 14;
  let w_idx = state.side === 'left' ? 15 : 16;
  
  const shoulder = landmarks[s_idx];
  const elbow = landmarks[e_idx];
  const wrist = landmarks[w_idx];

  const angle = calculateAngle(shoulder, elbow, wrist);
  let feedback = "";

  // A. Ready Check
  if (!state.readyPositionConfirmed) {
    if (angle > 150) {
      state.readyPositionConfirmed = true;
      state.stage = "up";
      speak("Start curling", true);
    } else {
      feedback = "Extend arm fully";
    }
    return { angle, feedback };
  }

  // B. Form Check: Elbow Drift
  if (Math.abs(elbow.x - shoulder.x) > 0.20) state.elbowDriftFrames++;
  else state.elbowDriftFrames = 0;

  if (state.elbowDriftFrames >= ERROR_FRAME_THRESHOLD) {
    feedback = "⚠ ELBOW OUT";
    speak("Keep elbow tucked");
  }

  // C. Rep Counting
  if (angle > 160) state.stage = "down";
  if (angle < 35 && state.stage === "down") {
    state.stage = "up";
    state.counter++;
    state.consecutiveGoodReps++;
    feedback = "✓ GOOD REP";
    speak(state.counter.toString(), true);
    if (state.consecutiveGoodReps % 5 === 0) speak("Great work!");
  }
  return { angle, feedback };
}

function logicSquats(landmarks) {
  const hip = landmarks[23];
  const knee = landmarks[25];
  const ankle = landmarks[27];
  const angle = calculateAngle(hip, knee, ankle);
  let feedback = "";

  if (!state.readyPositionConfirmed) {
    if (angle > 165) {
      state.readyPositionConfirmed = true;
      state.stage = "down";
      speak("Start squatting", true);
    } else {
      feedback = "Stand straight";
    }
    return { angle, feedback };
  }

  if (angle < 90) state.stage = "up";
  if (angle > 165 && state.stage === "up") {
    state.stage = "down";
    state.counter++;
    state.consecutiveGoodReps++;
    feedback = "✓ GOOD SQUAT";
    speak(state.counter.toString(), true);
  }
  return { angle, feedback };
}

function logicArmLift(landmarks) {
  const hip = landmarks[23];
  const shoulder = landmarks[11];
  const elbow = landmarks[13];
  const angle = calculateAngle(hip, shoulder, elbow);
  let feedback = "";

  if (!state.readyPositionConfirmed) {
      if (angle < 20) {
          state.readyPositionConfirmed = true;
          state.stage = "up";
          speak("Lift arms", true);
      } else {
          feedback = "Arms down";
      }
      return { angle, feedback };
  }

  if (angle > 80) state.stage = "down";
  if (angle < 20 && state.stage === "down") {
      state.stage = "up";
      state.counter++;
      feedback = "✓ GOOD LIFT";
      speak(state.counter.toString(), true);
  }
  return { angle, feedback };
}

// --- MAIN LOOP ---
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const drawingUtils = new DrawingUtils(ctx);

async function createPoseLandmarker() {
  const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm");
  poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numPoses: 1
  });
  
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 } })
    .then((stream) => {
      video.srcObject = stream;
      video.addEventListener('loadeddata', predictWebcam);
    });
}

async function predictWebcam() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  if (poseLandmarker && video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    const result = poseLandmarker.detectForVideo(video, performance.now());
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (result.landmarks && result.landmarks.length > 0) {
      const landmarks = result.landmarks[0];
      let res = { angle: 0, feedback: "" };
      
      if (state.currentExercise === 'curl') res = logicBicepCurl(landmarks);
      else if (state.currentExercise === 'squat') res = logicSquats(landmarks);
      else if (state.currentExercise === 'lift') res = logicArmLift(landmarks);

      sendStatsToApp(res.feedback, res.angle);
      drawingUtils.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
      drawingUtils.drawLandmarks(landmarks, { color: '#FF0000', lineWidth: 2 });
    }
  }
  requestAnimationFrame(predictWebcam);
}

// LISTEN FOR APP COMMANDS
document.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if(data.type === 'SET_EXERCISE') {
        state.currentExercise = data.name; 
        state.counter = 0;
        state.readyPositionConfirmed = false;
        speak("Switched to " + data.name, true);
    }
});

createPoseLandmarker();
</script>
</body>
</html>
`;

export default function GymLogic() {
  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html: GymTrainerHTML }}
      javaScriptEnabled
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction={false}
      style={{ flex: 1, backgroundColor: "transparent" }}
    />
  );
}
