// screens/OnboardingScreen.js
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Image } from "expo-image";
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }: { navigation: any }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<any> | null>(null);
  const [selectedPainRegions, setSelectedPainRegions] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<any>(null);

  const onboardingSlides = [
    {
      id: "1",
      title: "Welcome to PhysioPro",
      subtitle: "Your Personal Physiotherapy Assistant",
      description:
        "Transform your recovery journey with personalized exercise plans and professional guidance.",
      icon: "fitness",
      color: "#44B8F3",
      image: "🏃‍♂️",
    },
    {
      id: "2",
      title: "Track Your Progress",
      subtitle: "Monitor Recovery in Real-Time",
      description:
        "Visual progress tracking, exercise completion rates, and detailed recovery analytics.",
      icon: "stats-chart",
      color: "#38B000",
      image: "📈",
    },
    {
      id: "3",
      title: "Video Guides",
      subtitle: "Professional Exercise Demonstrations",
      description:
        "Step-by-step video instructions from certified physiotherapists.Live Posture Correction using AI.",
      icon: "videocam",
      color: "#FF6B6B",
      image: "🎬",
    },
    {
      id: "4",
      title: "Personalized Plans",
      subtitle: "Tailored to Your Needs",
      description:
        "Custom exercise routines based on your condition, progress, and therapist recommendations.",
      icon: "medical",
      color: "#FFD93D",
      image: "🎯",
    },
    {
      id: "5",
      title: "Pain Region Selection",
      subtitle: "Tell Us Where It Hurts",
      description:
        "Select the areas where you experience pain or discomfort. You can select multiple regions.",
      icon: "body",
      color: "#FF6B6B",
      image: "🩺",
      type: "painRegion",
    },
    {
      id: "6",
      title: "Medical Report",
      subtitle: "Upload Your Report",
      description:
        "Upload your medical report or diagnostic file to help us create a personalized treatment plan.",
      icon: "document-attach",
      color: "#8a2be2",
      image: "📄",
      type: "fileUpload",
    },
  ];

  // Update the painRegions array with online images:
  const painRegions = [
    {
      id: "neck",
      label: "Neck",
      icon: "body",
      image: "https://therunningadvisor.com/wp-content/uploads/2024/02/treating-neck-pain-from-running-1708422005.jpg",
    },
    {
      id: "shoulder",
      label: "Shoulder",
      icon: "body",
      image: "https://www.healthgoesfemale.com/wp-content/uploads/2021/01/Untitled.png",
    },
    {
      id: "upperBack",
      label: "Upper Back",
      icon: "body",
      image: "https://www.fyzical.com/mechanicsburg/newsmedia/img/14741/gerd_back_pain_between_shoulder_blades.jpeg",
    },
    {
      id: "lowerBack",
      label: "Lower Back",
      icon: "body",
      image: "https://spinavita.co.uk/wp-content/uploads/lower-acute-pain.jpg",
    },
    {
      id: "elbow",
      label: "Elbow",
      icon: "body",
      image: "https://sa1s3optim.patientpop.com/assets/images/provider/photos/2333816.jpg",
    },
    {
      id: "wrist",
      label: "Wrist",
      icon: "body",
      image: "https://sa1s3optim.patientpop.com/assets/images/provider/photos/2547573.jpg",
    },
    {
      id: "hip",
      label: "Hip",
      icon: "body",
      image: "https://www.lrcc.com.au/wp-content/uploads/2023/07/Lower-back-and-hip-pain-on-one-side.jpg",
    },
    {
      id: "knee",
      label: "Knee",
      icon: "body",
      image: "https://painclinic.com.sg/wp-content/uploads/2014/07/knee-pain.jpg",
    },
    {
      id: "ankle",
      label: "Ankle",
      icon: "body",
      image: "https://medpoint.ie/wp-content/uploads/Ankle-Pain-Causes-Symptoms-and-Effective-Treatment-Options.jpg",
    },
    {
      id: "foot",
      label: "Foot",
      icon: "body",
      image: "https://ankleandfootcenters.com/wp-content/uploads/2023/07/Pain-on-Top-of-Foot.png",
    },
  ];

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    const currentSlide = onboardingSlides[currentIndex];

    // Validate pain region selection slide
    if (currentSlide?.type === "painRegion") {
      if (selectedPainRegions.length === 0) {
        Alert.alert(
          "Selection Required",
          "Please select at least one pain region to continue."
        );
        return;
      }
    }

    // Validate file upload slide
    if (currentSlide?.type === "fileUpload") {
      if (!uploadedFile) {
        Alert.alert(
          "File Required",
          "Please upload your medical report to continue."
        );
        return;
      }
    }

    if (currentIndex < onboardingSlides.length - 1) {
      if (slidesRef.current) {
        slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
      }
    } else {
      // Save onboarding data before proceeding
      console.log("Pain Regions:", selectedPainRegions);
      console.log("Uploaded File:", uploadedFile);
      router.replace("/(auth)");
    }
  };

  const togglePainRegion = (regionId: string) => {
    setSelectedPainRegions((prev) =>
      prev.includes(regionId)
        ? prev.filter((id) => id !== regionId)
        : [...prev, regionId]
    );
  };

  const pickDocument = async () => {
    try {
      // @ts-ignore - expo-document-picker needs to be installed: npm install expo-document-picker
      const DocumentPicker = require("expo-document-picker");
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "image/*",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setUploadedFile(result.assets[0]);
      }
    } catch (error: any) {
      Alert.alert(
        "Document Picker Not Available",
        "Please install expo-document-picker:\n\nnpm install expo-document-picker"
      );
      console.error("Document picker error:", error);
    }
  };

  const skipToEnd = () => {
    if (slidesRef.current) {
      slidesRef.current.scrollToIndex({ index: onboardingSlides.length - 1 });
    }
  };

  const Paginator = () => {
    return (
      <View style={styles.paginator}>
        {onboardingSlides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 24, 8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                  backgroundColor: onboardingSlides[i].color,
                },
              ]}
              key={i.toString()}
            />
          );
        })}
      </View>
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    // Pain Region Selection Slide
    if (item.type === "painRegion") {
      return (
        <View style={styles.slide}>
          <ScrollView
            style={styles.scrollableSlide}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollableContent}
          >
            {/* Header */}
            <View style={styles.inputSlideHeader}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.color + "20" },
                ]}
              >
                <Ionicons name={item.icon} size={32} color={item.color} />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            {/* Pain Region Options */}
            <View style={styles.painRegionsContainer}>
              {painRegions.map((region) => {
                const isSelected = selectedPainRegions.includes(region.id);
                return (
                  <TouchableOpacity
                    key={region.id}
                    style={[
                      styles.painRegionCard,
                      isSelected && {
                        backgroundColor: item.color + "20",
                        borderColor: item.color,
                        borderWidth: 2,
                      },
                    ]}
                    onPress={() => togglePainRegion(region.id)}
                    activeOpacity={0.7}
                  >
                    {/* Add Image Container */}
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: region.image }}
                        style={styles.painRegionImage}
                        resizeMode="contain"
                      />
                    </View>

                    <View
                      style={[
                        styles.painRegionIcon,
                        isSelected && { backgroundColor: item.color },
                      ]}
                    >
                      <Ionicons
                        name={
                          isSelected ? "checkmark-circle" : "ellipse-outline"
                        }
                        size={24}
                        color={isSelected ? "#fff" : item.color}
                      />
                    </View>
                    <Text
                      style={[
                        styles.painRegionLabel,
                        isSelected && { color: item.color, fontWeight: "600" },
                      ]}
                    >
                      {region.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {selectedPainRegions.length > 0 && (
              <View style={styles.selectionSummary}>
                <Text style={styles.selectionSummaryText}>
                  {selectedPainRegions.length} region
                  {selectedPainRegions.length > 1 ? "s" : ""} selected
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      );
    }

    // File Upload Slide
    if (item.type === "fileUpload") {
      return (
        <View style={styles.slide}>
          <ScrollView
            style={styles.scrollableSlide}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollableContent}
          >
            {/* Header */}
            <View style={styles.inputSlideHeader}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.color + "20" },
                ]}
              >
                <Ionicons name={item.icon} size={32} color={item.color} />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            {/* File Upload Area */}
            <View style={styles.fileUploadContainer}>
              {uploadedFile ? (
                <View style={styles.uploadedFileCard}>
                  <View
                    style={[
                      styles.fileIconContainer,
                      { backgroundColor: item.color + "20" },
                    ]}
                  >
                    <Ionicons name="document" size={40} color={item.color} />
                  </View>
                  <View style={styles.fileInfo}>
                    <Text style={styles.fileName} numberOfLines={1}>
                      {uploadedFile.name}
                    </Text>
                    <Text style={styles.fileSize}>
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeFileButton}
                    onPress={() => setUploadedFile(null)}
                  >
                    <Ionicons name="close-circle" size={24} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.uploadButton, { borderColor: item.color }]}
                  onPress={pickDocument}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={[item.color + "20", item.color + "10"]}
                    style={styles.uploadButtonGradient}
                  >
                    <Ionicons
                      name="cloud-upload"
                      size={48}
                      color={item.color}
                    />
                    <Text
                      style={[styles.uploadButtonText, { color: item.color }]}
                    >
                      Tap to Upload Report
                    </Text>
                    <Text style={styles.uploadButtonSubtext}>
                      PDF, Images, or Word Documents
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>

            {/* Accepted File Types */}
            <View style={styles.fileTypesInfo}>
              <Text style={styles.fileTypesTitle}>Accepted Formats:</Text>
              <View style={styles.fileTypesList}>
                <View style={styles.fileTypeItem}>
                  <Ionicons name="document-text" size={16} color="#666" />
                  <Text style={styles.fileTypeText}>PDF</Text>
                </View>
                <View style={styles.fileTypeItem}>
                  <Ionicons name="image" size={16} color="#666" />
                  <Text style={styles.fileTypeText}>Images</Text>
                </View>
                <View style={styles.fileTypeItem}>
                  <Ionicons name="document" size={16} color="#666" />
                  <Text style={styles.fileTypeText}>Word</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }

    // Regular Slide
    return (
      <View style={styles.slide}>
        {/* Skip Button (only show on first slide) */}
        {currentIndex === 0 && (
          <TouchableOpacity style={styles.skipButton} onPress={skipToEnd}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

        {/* Emoji/Illustration */}
        <View
          style={[
            styles.imageContainer,
            { backgroundColor: item.color + "20" },
          ]}
        >
          <Text style={styles.emoji}>{item.image}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: item.color + "20" },
            ]}
          >
            <Ionicons name={item.icon} size={32} color={item.color} />
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>

          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const NextButton = () => {
    const buttonScale = scrollX.interpolate({
      inputRange: [0, width * (onboardingSlides.length - 1)],
      outputRange: [1, 1.1],
      extrapolate: "clamp",
    });

    return (
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={scrollTo}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[
              onboardingSlides[currentIndex].color,
              onboardingSlides[currentIndex].color + "CC",
            ]}
            style={styles.nextButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === onboardingSlides.length - 1
                ? "Get Started"
                : "Continue"}
            </Text>
            <Ionicons
              name={
                currentIndex === onboardingSlides.length - 1
                  ? "checkmark"
                  : "arrow-forward"
              }
              size={20}
              color="#fff"
              style={styles.nextButtonIcon}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Background Gradient */}
      <LinearGradient
        colors={["#f8f9fa", "#fff", "#f8f9fa"]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Slides */}
      <FlatList
        data={onboardingSlides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      {/* Paginator */}
      <Paginator />

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <NextButton />
      </View>

      {/* Bottom Links */}
      <View style={styles.bottomLinks}>
        <Text style={styles.bottomText}>
          By continuing, you agree to our{" "}
          <Text style={styles.linkText}>Terms</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  slide: {
    width: width,
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 30,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  painRegionImage: {
    width: 200,
    height: 200,
  },
  emoji: {
    fontSize: 80,
  },
  content: {
    alignItems: "center",
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 20,
    color: "#44B8F3",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  paginator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  nextButton: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#44B8F3",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  nextButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  nextButtonIcon: {
    marginLeft: 10,
  },
  bottomLinks: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  bottomText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 18,
  },
  linkText: {
    color: "#44B8F3",
    fontWeight: "600",
  },
  scrollableSlide: {
    flex: 1,
  },
  scrollableContent: {
    paddingBottom: 20,
  },
  inputSlideHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  painRegionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  painRegionCard: {
    width: (width - 80) / 2,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  painRegionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  painRegionLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  selectionSummary: {
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    alignItems: "center",
  },
  selectionSummaryText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  fileUploadContainer: {
    marginBottom: 30,
  },
  uploadButton: {
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    overflow: "hidden",
    marginHorizontal: 20,
  },
  uploadButtonGradient: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 15,
  },
  uploadButtonSubtext: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  uploadedFileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  fileIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  fileSize: {
    fontSize: 12,
    color: "#666",
  },
  removeFileButton: {
    padding: 5,
  },
  fileTypesInfo: {
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
  },
  fileTypesTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  fileTypesList: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  fileTypeItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  fileTypeText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
});

export default OnboardingScreen;
