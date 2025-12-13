// screens/DashboardScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
  // Stats Data
  const stats = [
    { 
      label: 'Today\'s Exercises', 
      value: '5', 
      icon: 'fitness',
      progress: 60,
      color: ['#667eea', '#764ba2']
    },
    { 
      label: 'Completed', 
      value: '3', 
      icon: 'checkmark-circle',
      progress: 100,
      color: ['#38B000', '#4CAF50']
    },
    { 
      label: 'Streak', 
      value: '7 days', 
      icon: 'flame',
      progress: 70,
      color: ['#FF6B6B', '#FF8E53']
    },
    { 
      label: 'Calories Burned', 
      value: '420', 
      icon: 'flash',
      progress: 40,
      color: ['#FFD93D', '#FF6B6B']
    },
  ];

  // Today's Schedule
  const todaysSchedule = [
    {
      id: 1,
      time: '09:00 AM',
      title: 'Morning Stretching Session',
      type: 'Exercise',
      therapist: 'Dr. Sarah Chen',
      duration: '30 mins',
      status: 'upcoming',
      room: 'Therapy Room A',
    },
    {
      id: 2,
      time: '11:30 AM',
      title: 'Knee Rehabilitation',
      type: 'Therapy',
      therapist: 'Dr. Michael Rodriguez',
      duration: '45 mins',
      status: 'upcoming',
      room: 'Room 3',
    },
    {
      id: 3,
      time: '02:00 PM',
      title: 'Progress Assessment',
      type: 'Consultation',
      therapist: 'Dr. Sarah Chen',
      duration: '60 mins',
      status: 'upcoming',
      room: 'Assessment Room',
    },
    {
      id: 4,
      time: '04:30 PM',
      title: 'Posture Correction',
      type: 'Therapy',
      therapist: 'Dr. James Wilson',
      duration: '40 mins',
      status: 'completed',
      room: 'Room 2',
    },
  ];

  // Recent Exercises
  const recentExercises = [
    { 
      name: 'Knee Flexion Stretch', 
      duration: '10 mins', 
      category: 'Knee',
      completed: true,
      icon: 'body',
      color: '#667eea',
    },
    { 
      name: 'Shoulder Rotation', 
      duration: '15 mins', 
      category: 'Shoulder',
      completed: false,
      icon: 'body',
      color: '#FF6B6B',
    },
    { 
      name: 'Neck Mobility Exercise', 
      duration: '8 mins', 
      category: 'Neck',
      completed: true,
      icon: 'body',
      color: '#38B000',
    },
  ];

  // Upcoming Sessions
  const upcomingSessions = [
    {
      day: 'Tomorrow',
      time: '10:00 AM',
      title: 'Full Body Assessment',
      therapist: 'Dr. Sarah Chen',
    },
    {
      day: 'Wed, 15 Nov',
      time: '03:30 PM',
      title: 'Strength Training',
      therapist: 'Dr. Michael Rodriguez',
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#38B000';
      case 'upcoming': return '#667eea';
      case 'cancelled': return '#FF6B6B';
      default: return '#666';
    }
  };

  const getStatusBgColor = (status) => {
    switch(status) {
      case 'completed': return 'rgba(56, 176, 0, 0.1)';
      case 'upcoming': return 'rgba(102, 126, 234, 0.1)';
      case 'cancelled': return 'rgba(255, 107, 107, 0.1)';
      default: return 'rgba(102, 102, 102, 0.1)';
    }
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#667eea']}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.userName}>Alex Johnson</Text>
            <Text style={styles.userInfo}>Knee Rehabilitation Program • Week 3</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <LinearGradient
              colors={['#fff', '#f0f0f0']}
              style={styles.profileGradient}
            >
              <Ionicons name="person" size={24} color="#667eea" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <LinearGradient
              key={index}
              colors={stat.color}
              style={styles.statCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.statHeader}>
                <View style={styles.statIconContainer}>
                  <Ionicons name={stat.icon} size={20} color="#fff" />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
              <Text style={styles.statLabel}>{stat.label}</Text>
              
              {/* Progress Bar */}
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${stat.progress}%` }
                  ]} 
                />
              </View>
            </LinearGradient>
          ))}
        </View>

        {/* Today's Schedule Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Today's Schedule</Text>
              <Text style={styles.sectionSubtitle}>Your therapy sessions for today</Text>
            </View>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {todaysSchedule.map((session) => (
            <TouchableOpacity 
              key={session.id}
              style={styles.scheduleCard}
              activeOpacity={0.9}
            >
              <View style={styles.scheduleTime}>
                <Text style={styles.scheduleTimeText}>{session.time}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusBgColor(session.status) }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(session.status) }
                  ]}>
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.scheduleDetails}>
                <Text style={styles.scheduleTitle}>{session.title}</Text>
                
                <View style={styles.scheduleMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="person" size={14} color="#666" />
                    <Text style={styles.metaText}>{session.therapist}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="time" size={14} color="#666" />
                    <Text style={styles.metaText}>{session.duration}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="business" size={14} color="#666" />
                    <Text style={styles.metaText}>{session.room}</Text>
                  </View>
                </View>

                <View style={styles.typeBadge}>
                  <Text style={styles.typeText}>{session.type}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Exercises Section */}
        {/* <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Recent Exercises</Text>
              <Text style={styles.sectionSubtitle}>Continue where you left off</Text>
            </View>
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('Exercises')}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {recentExercises.map((exercise, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.exerciseCard}
              activeOpacity={0.9}
            >
              <View style={styles.exerciseHeader}>
                <View style={[styles.exerciseIcon, { backgroundColor: exercise.color + '20' }]}>
                  <Ionicons name={exercise.icon} size={24} color={exercise.color} />
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View style={styles.exerciseMeta}>
                    <Text style={styles.exerciseCategory}>{exercise.category}</Text>
                    <Text style={styles.exerciseDuration}>• {exercise.duration}</Text>
                  </View>
                </View>
                <View style={[
                  styles.completionBadge,
                  { backgroundColor: exercise.completed ? '#38B00020' : '#FF6B6B20' }
                ]}>
                  <Ionicons 
                    name={exercise.completed ? "checkmark-circle" : "time"} 
                    size={20} 
                    color={exercise.completed ? '#38B000' : '#FF6B6B'} 
                  />
                  <Text style={[
                    styles.completionText,
                    { color: exercise.completed ? '#38B000' : '#FF6B6B' }
                  ]}>
                    {exercise.completed ? 'Completed' : 'Pending'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View> */}

        {/* Upcoming Sessions */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
              <Text style={styles.sectionSubtitle}>Next appointments</Text>
            </View>
          </View>

          {upcomingSessions.map((session, index) => (
            <View key={index} style={styles.upcomingCard}>
              <View style={styles.upcomingTime}>
                <Text style={styles.upcomingDay}>{session.day}</Text>
                <Text style={styles.upcomingTimeText}>{session.time}</Text>
              </View>
              <View style={styles.upcomingDetails}>
                <Text style={styles.upcomingTitle}>{session.title}</Text>
                <View style={styles.upcomingTherapist}>
                  <Ionicons name="person" size={14} color="#667eea" />
                  <Text style={styles.upcomingTherapistText}>{session.therapist}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.reminderButton}>
                <Ionicons name="notifications" size={20} color="#667eea" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Quick Stats Bottom Bar */}
        <View style={styles.quickStatsBar}>
          <View style={styles.quickStatItem}>
            <Ionicons name="trophy" size={24} color="#FFD93D" />
            <Text style={styles.quickStatText}>Current Streak</Text>
            <Text style={styles.quickStatValue}>7 days</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.quickStatItem}>
            <Ionicons name="calendar" size={24} color="#667eea" />
            <Text style={styles.quickStatText}>Sessions This Week</Text>
            <Text style={styles.quickStatValue}>4/5</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.quickStatItem}>
            <Ionicons name="star" size={24} color="#FF6B6B" />
            <Text style={styles.quickStatText}>Achievements</Text>
            <Text style={styles.quickStatValue}>12</Text>
          </View>
        </View>
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  profileGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  sectionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  viewAllButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 10,
  },
  viewAllText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
  },
  scheduleCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  scheduleTime: {
    width: 80,
    marginRight: 15,
  },
  scheduleTimeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scheduleDetails: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  scheduleMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
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
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '500',
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseCategory: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
    marginRight: 10,
  },
  exerciseDuration: {
    fontSize: 14,
    color: '#666',
  },
  completionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: 10,
  },
  completionText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 5,
  },
  upcomingCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  upcomingTime: {
    width: 100,
    marginRight: 15,
  },
  upcomingDay: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
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
    fontSize: 14,
    color: '#667eea',
    marginLeft: 5,
  },
  reminderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickStatsBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  quickStatItem: {
    alignItems: 'center',
  },
  quickStatText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
  },
});

export default DashboardScreen;