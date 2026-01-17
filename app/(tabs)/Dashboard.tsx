// screens/DashboardScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  RefreshControl,
  Modal,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useAudioPlayer } from 'expo-audio';
import { ExerciseVideoPlayer } from '../../components/ExerciseVideoPlayer';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [greeting, setGreeting] = useState('Good Morning');
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const successPlayer = useAudioPlayer('https://www.soundjay.com/buttons/sounds/button-09.mp3');

  // Stats Cards Data
  const statsData = [
    {
      id: 1,
      title: 'Active Exercises',
      value: '5',
      subtitle: 'Today\'s plan',
      icon: 'fitness',
      color: '#44B8F3',
      trend: '+2',
      trendColor: '#38B000',
    },
    {
      id: 2,
      title: 'Completion Rate',
      value: '85%',
      subtitle: 'This week',
      icon: 'checkmark-circle',
      color: '#38B000',
      trend: '↑ 12%',
      trendColor: '#38B000',
    },
    {
      id: 3,
      title: 'Current Streak',
      value: '7 days',
      subtitle: 'Keep going!',
      icon: 'flame',
      color: '#FF6B6B',
      trend: '🔥',
      trendColor: '#FF6B6B',
    },
    {
      id: 4,
      title: 'Calories Burned',
      value: '420',
      subtitle: 'Today',
      icon: 'flame',
      color: '#FFD93D',
      trend: '+45',
      trendColor: '#FF6B6B',
    },
  ];

  // Today's Exercises with Video Guides
  const todaysExercises = [
    {
      id: 1,
      name: 'Knee Flexion Stretch',
      duration: '10 mins',
      difficulty: 'Beginner',
      category: 'Knee',
      sets: '3 sets × 10 reps',
      calories: '45',
      completed: true,
      color: '#44B8F3',
      diff: 'green',
      videoUrl: 'https://www.youtube.com/watch?v=mi2fZ-NgSrk',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop',
      instructions: [
        'Sit on a chair with back straight',
        'Slowly bend your knee as far as possible',
        'Hold for 5 seconds',
        'Return to starting position',
      ],
      therapist: 'Dr. Sarah Chen',
    },
    {
      id: 2,
      name: 'Shoulder Rotation',
      duration: '15 mins',
      difficulty: 'Intermediate',
      category: 'Shoulder',
      sets: '3 sets × 15 reps',
      calories: '60',
      completed: false,
      color: '#44B8F3',
      diff: 'orange',
      videoUrl: 'https://www.youtube.com/watch?v=XIdXFzE4hDk',
      thumbnail: 'https://plus.unsplash.com/premium_photo-1661265933107-85a5feec7ef1?w=800&auto=format&fit=crop',
      instructions: [
        'Stand with feet shoulder-width apart',
        'Rotate shoulders forward in circular motion',
        'Repeat in reverse direction',
        'Keep movements slow and controlled',
      ],
      therapist: 'Dr. Michael R.',
    },
    {
      id: 3,
      name: 'Back Extension',
      duration: '12 mins',
      difficulty: 'Advanced',
      category: 'Back',
      sets: '4 sets × 12 reps',
      calories: '75',
      completed: false,
      diff: 'red',
      color: '#44B8F3',
      videoUrl: 'https://www.youtube.com/watch?v=H74vVbX60pM',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop',
      instructions: [
        'Lie on your stomach',
        'Place hands behind your head',
        'Lift chest off the ground',
        'Hold for 3 seconds',
      ],
      therapist: 'Dr. Sarah Chen',
    },
    {
      id: 4,
      name: 'Neck Mobility Exercise',
      duration: '8 mins',
      difficulty: 'Beginner',
      category: 'Neck',
      sets: '2 sets × 10 reps',
      calories: '30',
      completed: true,
      diff: 'green',
      color: '#44B8F3',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-stretching-exercises-43506-large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w-800&auto=format&fit=crop',
      instructions: [
        'Sit or stand with good posture',
        'Slowly tilt head toward each shoulder',
        'Hold for 10 seconds on each side',
        'Return to center position',
      ],
      therapist: 'Dr. James Wilson',
    },
  ];

  

  // Quick Actions
  const quickActions = [
    {
      id: 1,
      title: 'Start Exercise',
      icon: 'play-circle',
      color: '#44B8F3',
      screen: 'Exercises',
    },
    {
      id: 2,
      title: 'Log Progress',
      icon: 'add-circle',
      color: '#38B000',
      screen: 'Progress',
    },
    {
      id: 3,
      title: 'Video Library',
      icon: 'videocam',
      color: '#FF6B6B',
      screen: 'Videos',
    },
    {
      id: 4,
      title: 'Schedule',
      icon: 'calendar',
      color: '#FFD93D',
      screen: 'Schedule',
    },
  ];

  // Progress Overview
  const progressData = [
    { label: 'Mobility', value: 85, color: '#44B8F3' },
    { label: 'Strength', value: 72, color: '#38B000' },
    { label: 'Pain Level', value: 25, color: '#FF6B6B' },
    { label: 'Flexibility', value: 68, color: '#FFD93D' },
  ];

  // Recent Activity
  const recentActivity = [
    {
      id: 1,
      title: 'Completed Knee Flexion',
      time: '2 hours ago',
      icon: 'checkmark-circle',
      color: '#38B000',
    },
    {
      id: 2,
      title: 'Progress Report Generated',
      time: 'Yesterday',
      icon: 'document-text',
      color: '#44B8F3',
    },
    {
      id: 3,
      title: 'Therapist Notes Added',
      time: '2 days ago',
      icon: 'clipboard',
      color: '#FF6B6B',
    },
  ];

  // Upcoming Exercises
  const upcomingExercises = [
    {
      id: 1,
      day: 'Tomorrow',
      time: '10:00 AM',
      title: 'Full Body Stretching',
      therapist: 'Dr. Sarah Chen',
    },
    {
      id: 2,
      day: 'Thursday',
      time: '3:30 PM',
      title: 'Strength Training',
      therapist: 'Dr. Michael R.',
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const openVideoGuide = (exercise: any) => {
    setSelectedExercise(exercise);
    setShowVideoModal(true);
  };

  const startExercise = (exercise: any) => {
    // Navigate to exercise detail screen
    navigation.navigate('ExerciseDetail', { exercise: JSON.stringify(exercise) });
  };

  const toggleExerciseComplete = (exerciseId: any) => {
    // Toggle completion status
    console.log('Toggle exercise:', exerciseId);
    successPlayer.play();
  };

  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [180, 100],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Animated Header */}
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        <LinearGradient
          colors={['#44B8F3', '#2A9FD9']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
            <View style={styles.userInfo}>
              <Text style={styles.greeting}>{greeting},</Text>
              <Text style={styles.userName}>Aditya</Text>
              <Text style={styles.userStatus}>Knee Rehabilitation • Week 3</Text>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>AJ</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Stats Overview */}
          <View style={styles.statsOverview}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Today's Exercises</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2/5</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Progress</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#44B8F3"
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Stats Cards */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <TouchableOpacity>
              <Text style={styles.sectionAction}>View Details</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.statsScroll}
            contentContainerStyle={styles.statsScrollContent}
          >
            {statsData.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <View style={styles.statCardHeader}>
                  <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                    <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                  </View>
                  <Text style={[styles.trendText, { color: stat.trendColor }]}>
                    {stat.trend}
                  </Text>
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statCardTitle}>{stat.title}</Text>
                <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Today's Exercises */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Exercises</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Exercises')}>
              <Text style={styles.sectionAction}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.exercisesCard}>
            {todaysExercises.map((exercise) => (
              <View key={exercise.id} style={styles.exerciseItem}>
                {/* Video Thumbnail */}
                <TouchableOpacity
                  style={styles.videoThumbnail}
                  onPress={() => openVideoGuide(exercise)}
                  activeOpacity={0.8}
                >
                  <Image
                    source={{ uri: exercise.thumbnail }}
                    style={styles.thumbnailImage}
                  />
                  <View style={styles.playButtonOverlay}>
                    <LinearGradient
                      colors={['rgba(68, 184, 243, 0.8)', 'rgba(42, 159, 217, 0.8)']}
                      style={styles.playButton}
                    >
                      <Ionicons name="play" size={24} color="#fff" />
                    </LinearGradient>
                  </View>
                  <View style={styles.videoDuration}>
                    <Text style={styles.durationText}>{exercise.duration}</Text>
                  </View>
                </TouchableOpacity>

                {/* Exercise Details */}
                <View style={styles.exerciseDetails}>
                  <View style={styles.exerciseHeader}>
                    <View>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <View style={styles.exerciseMeta}>
                        <View style={styles.metaItem}>
                          <Ionicons name="barbell" size={12} color="#666" />
                          <Text style={[styles.metaText, {color: exercise.diff}]}>{exercise.difficulty}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Ionicons name="repeat" size={12} color="#666" />
                          <Text style={styles.metaText}>{exercise.sets}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Ionicons name="flame" size={12} color="#666" />
                          <Text style={styles.metaText}>{exercise.calories} cal</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => toggleExerciseComplete(exercise.id)}
                      style={styles.completeButton}
                    >
                      <Ionicons
                        name={exercise.completed ? "checkmark-circle" : "ellipse-outline"}
                        size={24}
                        color={exercise.completed ? '#38B000' : '#ddd'}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.exerciseFooter}>
                    <View style={[styles.categoryTag, { backgroundColor: exercise.color + '20' }]}>
                      <Text style={[styles.categoryText, { color: exercise.color }]}>
                        {exercise.category}
                      </Text>
                    </View>

                    <View style={styles.exerciseActions}>
                      <TouchableOpacity
                        style={styles.startExerciseButton}
                        onPress={() => startExercise(exercise)}
                      >
                        <LinearGradient
                          colors={[exercise.color, exercise.color + 'CC']}
                          style={styles.startButtonGradient}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                        >
                          <Ionicons name="play" size={14} color="#fff" />
                          <Text style={styles.startButtonText}>Start</Text>
                        </LinearGradient>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.videoGuideButton}
                        onPress={() => openVideoGuide(exercise)}
                      >
                        <Ionicons name="videocam" size={16} color={exercise.color} />
                        <Text style={[styles.videoGuideText, { color: exercise.color }]}>
                          Guide
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Progress Overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recovery Progress</Text>
            <TouchableOpacity>
              <Text style={styles.sectionAction}>View Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Overall Recovery</Text>
              <Text style={styles.progressPercent}>78%</Text>
            </View>
            <Text style={styles.progressSubtitle}>Excellent progress this week!</Text>

            <View style={styles.progressBars}>
              {progressData.map((item, index) => (
                <View key={index} style={styles.progressItem}>
                  <View style={styles.progressLabelRow}>
                    <Text style={styles.progressLabel}>{item.label}</Text>
                    <Text style={styles.progressValue}>{item.value}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${item.value}%`,
                          backgroundColor: item.color
                        }
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.sectionAction}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activityCard}>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: activity.color + '20' }]}>
                  <Ionicons name={activity.icon} size={18} color={activity.color} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <TouchableOpacity style={styles.activityButton}>
                  <Ionicons name="chevron-forward" size={16} color="#999" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Exercises */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Exercises</Text>
            <TouchableOpacity>
              <Text style={styles.sectionAction}>View Calendar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.upcomingCard}>
            {upcomingExercises.map((exercise) => (
              <View key={exercise.id} style={styles.upcomingItem}>
                <View style={styles.upcomingTime}>
                  <Text style={styles.upcomingDay}>{exercise.day}</Text>
                  <Text style={styles.upcomingTimeText}>{exercise.time}</Text>
                </View>
                <View style={styles.upcomingDetails}>
                  <Text style={styles.upcomingTitle}>{exercise.title}</Text>
                  <View style={styles.upcomingTherapist}>
                    <Ionicons name="person" size={12} color="#44B8F3" />
                    <Text style={styles.upcomingTherapistText}>{exercise.therapist}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.reminderButton}>
                  <Ionicons name="notifications" size={18} color="#44B8F3" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Stats Footer */}
        <View style={styles.footerStats}>
          <View style={styles.footerStatItem}>
            <Ionicons name="trophy" size={20} color="#FFD93D" />
            <Text style={styles.footerStatText}>12 Achievements</Text>
          </View>
          <View style={styles.footerStatDivider} />
          <View style={styles.footerStatItem}>
            <Ionicons name="flame" size={20} color="#FF6B6B" />
            <Text style={styles.footerStatText}>2.1k Calories</Text>
          </View>
          <View style={styles.footerStatDivider} />
          <View style={styles.footerStatItem}>
            <Ionicons name="time" size={20} color="#44B8F3" />
            <Text style={styles.footerStatText}>24h Total</Text>
          </View>
        </View>
      </Animated.ScrollView>

      {/* Video Guide Modal */}
      <Modal
        visible={showVideoModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowVideoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <LinearGradient
              colors={['#44B8F3', '#2A9FD9']}
              style={styles.modalHeader}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.modalHeaderContent}>
                <Text style={styles.modalTitle} numberOfLines={1}>
                  {selectedExercise?.name}
                </Text>
                <TouchableOpacity
                  style={styles.modalClose}
                  onPress={() => setShowVideoModal(false)}
                >
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {/* Video Player */}
            {selectedExercise && (
              <View style={styles.videoContainer}>
                <ExerciseVideoPlayer
                  videoUrl={selectedExercise.videoUrl}
                  style={styles.videoPlayer}
                />
              </View>
            )}

            {/* Exercise Details */}
            {selectedExercise && (
              <ScrollView style={styles.exerciseDetailsModal}>
                <View style={styles.exerciseStats}>
                  <View style={styles.statItemModal}>
                    <Ionicons name="time" size={20} color="#44B8F3" />
                    <Text style={styles.statLabelModal}>Duration</Text>
                    <Text style={styles.statValueModal}>{selectedExercise.duration}</Text>
                  </View>
                  <View style={styles.statItemModal}>
                    <Ionicons name="barbell" size={20} color="#44B8F3" />
                    <Text style={styles.statLabelModal}>Difficulty</Text>
                    <Text style={styles.statValueModal}>{selectedExercise.difficulty}</Text>
                  </View>
                  <View style={styles.statItemModal}>
                    <Ionicons name="flame" size={20} color="#44B8F3" />
                    <Text style={styles.statLabelModal}>Calories</Text>
                    <Text style={styles.statValueModal}>{selectedExercise.calories}</Text>
                  </View>
                </View>

                <View style={styles.instructionsSection}>
                  <Text style={styles.instructionsTitle}>Instructions</Text>
                  {selectedExercise.instructions.map((instruction, index) => (
                    <View key={index} style={styles.instructionItem}>
                      <View style={styles.instructionNumber}>
                        <Text style={styles.instructionNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.instructionText}>{instruction}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.therapistInfo}>
                  <View style={styles.therapistHeader}>
                    <Ionicons name="person" size={20} color="#44B8F3" />
                    <Text style={styles.therapistTitle}>Therapist</Text>
                  </View>
                  <Text style={styles.therapistName}>{selectedExercise.therapist}</Text>
                </View>

                <TouchableOpacity
                  style={styles.startNowButton}
                  onPress={() => {
                    setShowVideoModal(false);
                    startExercise(selectedExercise);
                  }}
                >
                  <LinearGradient
                    colors={[selectedExercise?.color || '#44B8F3', selectedExercise?.color + 'CC' || '#2A9FD9']}
                    style={styles.startNowGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="play" size={20} color="#fff" />
                    <Text style={styles.startNowText}>Start Exercise Now</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    overflow: 'hidden',
  },
  headerGradient: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 60,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  userStatus: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  profileButton: {
    marginLeft: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#44B8F3',
  },
  statsOverview: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 15,
    marginBottom: -25,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  sectionAction: {
    fontSize: 14,
    color: '#44B8F3',
    fontWeight: '600',
  },
  statsScroll: {
    marginLeft: 25,
  },
  statsScrollContent: {
    paddingRight: 25,
  },
  statCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  statCardTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  exercisesCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  exerciseItem: {
    marginBottom: 20,
  },
  videoThumbnail: {
    height: 160,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  videoDuration: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  durationText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    flex: 1,
    marginRight: 10,
  },
  exerciseMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  completeButton: {
    padding: 5,
  },
  exerciseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  exerciseActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startExerciseButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 10,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  videoGuideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
  },
  videoGuideText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  actionCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  progressPercent: {
    fontSize: 32,
    fontWeight: '700',
    color: '#44B8F3',
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
  },
  progressBars: {
    marginTop: 10,
  },
  progressItem: {
    marginBottom: 20,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  activityButton: {
    padding: 8,
  },
  upcomingCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  upcomingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  upcomingTime: {
    width: 80,
    marginRight: 15,
  },
  upcomingDay: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  upcomingTimeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  upcomingDetails: {
    flex: 1,
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  upcomingTherapist: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upcomingTherapistText: {
    fontSize: 12,
    color: '#44B8F3',
    marginLeft: 5,
  },
  reminderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(68, 184, 243, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  footerStats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 25,
    marginBottom: 30,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  footerStatItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerStatText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  footerStatDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#f0f0f0',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  modalHeader: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 25,
  },
  modalHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    height: 250,
    backgroundColor: '#000',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  exerciseDetailsModal: {
    flex: 1,
    padding: 25,
  },
  exerciseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statItemModal: {
    alignItems: 'center',
  },
  statLabelModal: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  statValueModal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  instructionsSection: {
    marginBottom: 30,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  instructionNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#44B8F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  instructionNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  instructionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    flex: 1,
  },
  therapistInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  therapistHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  therapistTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  therapistName: {
    fontSize: 14,
    color: '#666',
  },
  startNowButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  startNowGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  startNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
});

export default DashboardScreen;