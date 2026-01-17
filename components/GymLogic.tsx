import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { GymTrainerHTML } from "../app/GymLogic";

type Props = {
  onMessage?: (event: any) => void;
  webViewRef?: any;
  style?: any;
};

const GymLogic = React.forwardRef(function GymLogic(props: Props, ref: any) {
  const { onMessage, style } = props;

  if (Platform.OS === "web") {
    return (
      <WebView
        ref={ref}
        originWhitelist={["*"]}
        source={{ html: GymTrainerHTML }}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        onMessage={onMessage}
        style={[styles.webview, style]}
      />
    );
  }

  return (
    <View style={[styles.nativeContainer, style]}>
      <Text style={styles.info}>
        GymLogic requires a browser WebView with camera access. Open the Trainer
        in Expo Web for full features.
      </Text>
      <TouchableOpacity
        style={styles.openWebBtn}
        onPress={() => {
          /* no-op: user should open web */
        }}
      >
        <Text style={styles.openWebText}>
          Open Trainer in Web (recommended)
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  webview: { flex: 1, backgroundColor: "transparent" },
  nativeContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  info: { color: "#fff", textAlign: "center", marginBottom: 12 },
  openWebBtn: { padding: 12, backgroundColor: "#44B8F3", borderRadius: 8 },
  openWebText: { color: "#fff", fontWeight: "700" },
});

export default GymLogic;
