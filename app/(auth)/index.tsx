// screens/AuthScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  '(tabs)/index': undefined;
};

const AuthScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const formScale = useRef(new Animated.Value(0.95)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.7)),
        useNativeDriver: true,
      }),
      Animated.timing(formScale, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(logoAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleAuth = () => {
    // Add your authentication logic here
    navigation.navigate('(tabs)/index');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Add transition animation
    Animated.spring(formScale, {
      toValue: 1.02,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(formScale, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }).start();
    });
  };

  const logoTransform = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <LinearGradient
      colors={['#44B8F3', '#2A9FD9', '#44B8F3']}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Floating Particles Background */}
          <View style={styles.floatingParticles}>
            {[...Array(15)].map((_, i) => (
              <Animatable.View
                key={i}
                animation="pulse"
                iterationCount="infinite"
                duration={2000 + Math.random() * 2000}
                delay={i * 200}
                style={[
                  styles.particle,
                  {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: 4 + Math.random() * 8,
                    height: 4 + Math.random() * 8,
                  },
                ]}
              />
            ))}
          </View>

          {/* Animated Logo Container */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: logoTransform },
                  { rotate: logoAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['-10deg', '0deg']
                    })
                  }
                ]
              }
            ]}
          >
            <View style={styles.logoCircle}>
              <Ionicons name="fitness" size={60} color="#fff" />
            </View>
            <Animatable.Text 
              animation="fadeIn" 
              delay={400}
              style={styles.title}
            >
              Physio<Text style={styles.titleAccent}>Pro</Text>
            </Animatable.Text>
            <Animatable.Text 
              animation="fadeIn" 
              delay={600}
              style={styles.subtitle}
            >
              Transform Your Recovery Journey
            </Animatable.Text>
          </Animated.View>

          {/* Animated Form Container */}
          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: formScale }
                ]
              }
            ]}
          >
            {/* Form Header */}
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </Text>
              <Text style={styles.formSubtitle}>
                {isLogin 
                  ? 'Sign in to continue your recovery journey' 
                  : 'Start your physiotherapy journey with us'
                }
              </Text>
            </View>

            {/* Form Inputs */}
            {!isLogin && (
              <Animatable.View 
                animation="fadeInRight" 
                duration={500}
                style={styles.inputContainer}
              >
                <View style={styles.inputWrapper}>
                  <Ionicons name="person" size={20} color="#44B8F3" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#999"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                  {fullName.length > 0 && (
                    <Animatable.View animation="bounceIn" duration={300}>
                      <Ionicons name="checkmark-circle" size={20} color="#38B000" />
                    </Animatable.View>
                  )}
                </View>
              </Animatable.View>
            )}

            <Animatable.View 
              animation="fadeInRight" 
              duration={500}
              delay={isLogin ? 0 : 100}
              style={styles.inputContainer}
            >
              <View style={styles.inputWrapper}>
                <Ionicons name="mail" size={20} color="#44B8F3" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {email.length > 0 && (
                  <Animatable.View animation="bounceIn" duration={300}>
                    <Ionicons name="checkmark-circle" size={20} color="#38B000" />
                  </Animatable.View>
                )}
              </View>
            </Animatable.View>

            <Animatable.View 
              animation="fadeInRight" 
              duration={500}
              delay={isLogin ? 100 : 200}
              style={styles.inputContainer}
            >
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed" size={20} color="#44B8F3" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="#44B8F3" 
                  />
                </TouchableOpacity>
              </View>
              {password.length > 0 && (
                <View style={styles.passwordStrength}>
                  <View style={[
                    styles.strengthBar,
                    { 
                      width: `${Math.min(password.length * 10, 100)}%`,
                      backgroundColor: password.length < 6 ? '#FF6B6B' : 
                                     password.length < 8 ? '#FFD93D' : '#38B000'
                    }
                  ]} />
                </View>
              )}
            </Animatable.View>

            {!isLogin && (
              <Animatable.View 
                animation="fadeInRight" 
                duration={500}
                delay={300}
                style={styles.inputContainer}
              >
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed" size={20} color="#44B8F3" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#999"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons 
                      name={showConfirmPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#44B8F3" 
                    />
                  </TouchableOpacity>
                </View>
              </Animatable.View>
            )}

            {/* Forgot Password */}
            {isLogin && (
              <TouchableOpacity 
                style={styles.forgotPassword}
                onPress={() => {/* Navigate to forgot password */}}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            {/* Auth Button */}
            <Animatable.View 
              animation="pulse" 
              iterationCount="infinite" 
              duration={2000}
              style={styles.buttonContainer}
            >
              <TouchableOpacity 
                style={styles.authButton}
                // onPress={handleAuth} will implement later
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#44B8F3', '#2A9FD9', '#44B8F3']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  <Ionicons 
                    name={isLogin ? "log-in" : "person-add"} 
                    size={24} 
                    color="white" 
                    style={styles.buttonIcon}
                  />
                  <Link href="/(tabs)/Dashboard" style={styles.authButtonText}>
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </Link>
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or continue with</Text>
              <View style={styles.divider} />
            </View>

            {/* Social Login Buttons */}
            {/* <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={24} color="#4267B2" />
              </TouchableOpacity>
            </View> */}

            {/* Switch Form */}
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </Text>
              <TouchableOpacity onPress={toggleForm}>
                <Text style={styles.switchLink}>
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Terms and Privacy */}
            {!isLogin && (
              <Animatable.View animation="fadeInUp" duration={500} style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By signing up, you agree to our{' '}
                  <Text style={styles.termsLink}>Terms</Text> and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </Animatable.View>
            )}
          </Animated.View>

          {/* Bottom Wave Decoration */}
          <View style={styles.waveContainer}>
            <Image
              source={{ uri: 'https://www.transparenttextures.com/patterns/wavecut.png' }}
              style={styles.wavePattern}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 30,
  },
  floatingParticles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    zIndex: 1,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  titleAccent: {
    color: '#FFD700',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 30,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 15,
    zIndex: 2,
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  formHeader: {
    marginBottom: 30,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  formSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  passwordStrength: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  strengthBar: {
    height: '100%',
    borderRadius: 2,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: '#44B8F3',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: 25,
  },
  authButton: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#44B8F3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  buttonIcon: {
    marginRight: 10,
  },
  authButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    color: '#666',
    fontSize: 14,
    marginHorizontal: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  socialButton: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchText: {
    color: '#666',
    fontSize: 14,
  },
  switchLink: {
    color: '#44B8F3',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5,
  },
  termsContainer: {
    marginTop: 15,
  },
  termsText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#44B8F3',
    fontWeight: '600',
  },
  waveContainer: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    right: 0,
    height: 150,
    zIndex: 0,
  },
  wavePattern: {
    width: '100%',
    height: '100%',
    opacity: 0.1,
    resizeMode: 'cover',
  },
});

export default AuthScreen;