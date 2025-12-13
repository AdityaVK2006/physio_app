// screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Switch,
  TextInput,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Aditya Katepallewar',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    age: '35',
    weight: '75 kg',
    height: '175 cm',
    condition: 'Knee Rehabilitation',
    therapist: 'Dr. Sarah Chen',
    membership: 'Premium',
    memberSince: '2023',
    nextAppointment: 'Tomorrow, 10:00 AM',
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    reminders: true,
    darkMode: false,
    progressTracking: true,
    emailUpdates: false,
  });

  const achievements = [
    { icon: 'trophy', title: '30-Day Streak', count: 1 },
    { icon: 'star', title: 'Perfect Sessions', count: 12 },
    { icon: 'checkmark-circle', title: 'Exercises Completed', count: 45 },
    { icon: 'flame', title: 'Calories Burned', count: '5.2k' },
  ];

  const menuItems = [
    { icon: 'settings', title: 'App Settings', description: 'Customize your app experience' },
    { icon: 'shield-checkmark', title: 'Privacy & Security', description: 'Manage your data and security' },
    { icon: 'document-text', title: 'Medical Records', description: 'View and manage medical history' },
    { icon: 'calendar', title: 'Appointment History', description: 'Past and upcoming sessions' },
    { icon: 'card', title: 'Billing & Subscription', description: 'Manage your membership' },
    { icon: 'help-circle', title: 'Help & Support', description: 'Get help and contact support' },
  ];

  const handlePreferenceToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    // Add logout logic here
    navigation.navigate('Auth');
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
        {/* Header Section */}
        <View style={styles.header}>
          {/* <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity> */}
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons 
              name={isEditing ? "checkmark" : "create"} 
              size={22} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.profileGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Avatar Section */}
            <View style={styles.avatarSection}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>AJ</Text>
                </View>
                <TouchableOpacity style={styles.cameraButton}>
                  <Ionicons name="camera" size={20} color="#667eea" />
                </TouchableOpacity>
              </View>
              
              {isEditing ? (
                <TextInput
                  style={styles.nameInput}
                  value={userData.name}
                  onChangeText={(text) => setUserData({...userData, name: text})}
                  placeholder="Enter your name"
                />
              ) : (
                <Text style={styles.userName}>{userData.name}</Text>
              )}
              
              <Text style={styles.userEmail}>{userData.email}</Text>
              
              <View style={styles.membershipBadge}>
                <Ionicons name="diamond" size={16} color="#FFD700" />
                <Text style={styles.membershipText}>{userData.membership} Member</Text>
              </View>
            </View>

            {/* Quick Stats */}
            <View style={styles.quickStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>Week 3</Text>
                <Text style={styles.statLabel}>Program</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>85%</Text>
                <Text style={styles.statLabel}>Recovery</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>7</Text>
                <Text style={styles.statLabel}>Days</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Personal Information */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-circle" size={24} color="#667eea" />
            <Text style={styles.sectionTitle}>Personal Information</Text>
          </View>

          <View style={styles.infoGrid}>
            {[
              { label: 'Age', value: userData.age, icon: 'calendar', editable: true },
              { label: 'Weight', value: userData.weight, icon: 'scale', editable: true },
              { label: 'Height', value: userData.height, icon: 'resize', editable: true },
              { label: 'Phone', value: userData.phone, icon: 'call', editable: true },
              { label: 'Condition', value: userData.condition, icon: 'medical', editable: false },
              { label: 'Therapist', value: userData.therapist, icon: 'person', editable: false },
            ].map((item, index) => (
              <View key={index} style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name={item.icon} size={18} color="#667eea" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>{item.label}</Text>
                  {isEditing && item.editable ? (
                    <TextInput
                      style={styles.infoValueInput}
                      value={item.value}
                      onChangeText={(text) => setUserData({...userData, [item.label.toLowerCase()]: text})}
                    />
                  ) : (
                    <Text style={styles.infoValue}>{item.value}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="trophy" size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>Achievements</Text>
          </View>

          <View style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Ionicons name={achievement.icon} size={24} color="#667eea" />
                </View>
                <Text style={styles.achievementCount}>{achievement.count}</Text>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Preferences */}
        {/* <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings" size={24} color="#667eea" />
            <Text style={styles.sectionTitle}>Preferences</Text>
          </View>

          {[
            { key: 'notifications', label: 'Push Notifications', description: 'Receive exercise reminders and updates', icon: 'notifications' },
            { key: 'reminders', label: 'Daily Reminders', description: 'Get daily exercise reminders', icon: 'alarm' },
            { key: 'progressTracking', label: 'Progress Tracking', description: 'Auto-track your recovery progress', icon: 'trending-up' },
            { key: 'emailUpdates', label: 'Email Updates', description: 'Receive weekly progress reports', icon: 'mail' },
            { key: 'darkMode', label: 'Dark Mode', description: 'Switch to dark theme', icon: 'moon' },
          ].map((pref, index) => (
            <View key={index} style={styles.preferenceItem}>
              <View style={styles.preferenceLeft}>
                <View style={[styles.preferenceIcon, { backgroundColor: `${preferences[pref.key] ? '#667eea20' : '#f0f0f0'}` }]}>
                  <Ionicons 
                    name={pref.icon} 
                    size={20} 
                    color={preferences[pref.key] ? '#667eea' : '#666'} 
                  />
                </View>
                <View style={styles.preferenceInfo}>
                  <Text style={styles.preferenceLabel}>{pref.label}</Text>
                  <Text style={styles.preferenceDescription}>{pref.description}</Text>
                </View>
              </View>
              <Switch
                value={preferences[pref.key]}
                onValueChange={() => handlePreferenceToggle(pref.key)}
                trackColor={{ false: '#ddd', true: '#667eea' }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </View> */}

        {/* Menu Items */}
        {/* <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="menu" size={24} color="#667eea" />
            <Text style={styles.sectionTitle}>More Options</Text>
          </View>

          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon} size={22} color="#667eea" />
                </View>
                <View style={styles.menuInfo}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDescription}>{item.description}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View> */}

        {/* Account Details */}
        {/* <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="card" size={24} color="#667eea" />
            <Text style={styles.sectionTitle}>Account Details</Text>
          </View>

          <View style={styles.accountDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Member Since</Text>
              <Text style={styles.detailValue}>{userData.memberSince}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Next Appointment</Text>
              <Text style={styles.detailValue}>{userData.nextAppointment}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Account Type</Text>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            </View>
          </View>
        </View> */}

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53']}
            style={styles.logoutGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="log-out" size={24} color="#fff" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Version Info */}
        {/* <View style={styles.versionContainer}>
          <Text style={styles.versionText}>PhysioPro v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2024 All rights reserved</Text>
        </View> */}
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
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    marginHorizontal: 25,
    marginBottom: 25,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 15,
  },
  profileGradient: {
    padding: 30,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#667eea',
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  nameInput: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    width: '80%',
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  membershipText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 5,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
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
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    marginHorizontal: 25,
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
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginLeft: 12,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  infoValueInput: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  achievementCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  achievementTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  preferenceIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  preferenceInfo: {
    flex: 1,
  },
  preferenceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  preferenceDescription: {
    fontSize: 12,
    color: '#666',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  menuDescription: {
    fontSize: 12,
    color: '#666',
  },
  accountDetails: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  premiumBadge: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  premiumText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
  logoutButton: {
    marginHorizontal: 25,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 5,
  },
  copyrightText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default ProfileScreen;