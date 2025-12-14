// screens/OnboardingScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  FlatList,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }: { navigation: any }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const onboardingSlides = [
    {
      id: '1',
      title: 'Welcome to PhysioPro',
      subtitle: 'Your Personal Physiotherapy Assistant',
      description: 'Transform your recovery journey with personalized exercise plans and professional guidance.',
      icon: 'fitness',
      color: '#667eea',
      image: '🏃‍♂️',
    },
    {
      id: '2',
      title: 'Track Your Progress',
      subtitle: 'Monitor Recovery in Real-Time',
      description: 'Visual progress tracking, exercise completion rates, and detailed recovery analytics.',
      icon: 'stats-chart',
      color: '#38B000',
      image: '📈',
    },
    {
      id: '3',
      title: 'Video Guides',
      subtitle: 'Professional Exercise Demonstrations',
      description: 'Step-by-step video instructions from certified physiotherapists.Live Posture Correction using AI.',
      icon: 'videocam',
      color: '#FF6B6B',
      image: '🎬',
    },
    {
      id: '4',
      title: 'Personalized Plans',
      subtitle: 'Tailored to Your Needs',
      description: 'Custom exercise routines based on your condition, progress, and therapist recommendations.',
      icon: 'medical',
      color: '#FFD93D',
      image: '🎯',
    },
  ];

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace('/(auth)');
    }
  };

  const skipToEnd = () => {
    slidesRef.current.scrollToIndex({ index: onboardingSlides.length - 1 });
  };

  const Paginator = () => {
    return (
      <View style={styles.paginator}>
        {onboardingSlides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 24, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[
                styles.dot,
                { 
                  width: dotWidth,
                  opacity,
                  backgroundColor: onboardingSlides[i].color,
                }
              ]}
              key={i.toString()}
            />
          );
        })}
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        {/* Skip Button (only show on first slide) */}
        {currentIndex === 0 && (
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={skipToEnd}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

        {/* Emoji/Illustration */}
        <View style={[styles.imageContainer, { backgroundColor: item.color + '20' }]}>
          <Text style={styles.emoji}>{item.image}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
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
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={scrollTo}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[onboardingSlides[currentIndex].color, onboardingSlides[currentIndex].color + 'CC']}
            style={styles.nextButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === onboardingSlides.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
            <Ionicons 
              name={currentIndex === onboardingSlides.length - 1 ? "checkmark" : "arrow-forward"} 
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
        colors={['#f8f9fa', '#fff', '#f8f9fa']}
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
          By continuing, you agree to our{' '}
          <Text style={styles.linkText}>Terms</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundGradient: {
    position: 'absolute',
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
    position: 'absolute',
    top: 60,
    right: 30,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  emoji: {
    fontSize: 80,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 20,
    color: '#667eea',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  paginator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
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
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: '#667eea',
    fontWeight: '600',
  },
});

export default OnboardingScreen;