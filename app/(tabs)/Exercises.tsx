// screens/ExercisesScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ExercisesScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([1, 3]);

  const categories = [
    { id: 'all', name: 'All', icon: 'apps', count: 24 },
    { id: 'knee', name: 'Knee', icon: 'body', count: 8, color: '#44B8F3' },
    { id: 'shoulder', name: 'Shoulder', icon: 'body', count: 6, color: '#FF6B6B' },
    { id: 'back', name: 'Back', icon: 'body', count: 5, color: '#38B000' },
    { id: 'neck', name: 'Neck', icon: 'body', count: 3, color: '#FFD93D' },
    { id: 'wrist', name: 'Wrist', icon: 'body', count: 2, color: '#3BA8E0' },
  ];

  const exercises = [
    {
      id: 1,
      name: 'Knee Flexion Stretch',
      category: 'Knee',
      duration: '10 mins',
      difficulty: 'Beginner',
      calories: '45',
      sets: '3 sets × 10 reps',
      description: 'Improve knee flexibility and range of motion',
      completed: true,
      favorite: true,
      color: '#44B8F3',
      videoUrl: 'https://www.youtube.com/watch?v=mi2fZ-NgSrk',
      instructions: [
        'Sit on a chair with back straight',
        'Slowly bend your knee as far as possible',
        'Hold for 5 seconds',
        'Return to starting position',
      ],
    },
    {
      id: 2,
      name: 'Shoulder Rotation',
      category: 'Shoulder',
      duration: '15 mins',
      difficulty: 'Intermediate',
      calories: '60',
      sets: '3 sets × 15 reps',
      description: 'Enhance shoulder mobility and strength',
      completed: false,
      favorite: false,
      color: '#FF6B6B',
      videoUrl: 'https://www.youtube.com/watch?v=XIdXFzE4hDk',
      instructions: [
        'Stand with feet shoulder-width apart',
        'Rotate shoulders forward in circular motion',
        'Repeat in reverse direction',
        'Keep movements slow and controlled',
      ],
    },
    {
      id: 3,
      name: 'Back Extension',
      category: 'Back',
      duration: '12 mins',
      difficulty: 'Advanced',
      calories: '75',
      sets: '4 sets × 12 reps',
      description: 'Strengthen back muscles and improve posture',
      completed: true,
      favorite: true,
      color: '#38B000',
      videoUrl: 'https://www.youtube.com/watch?v=H74vVbX60pM',
      instructions: [
        'Lie on your stomach',
        'Place hands behind your head',
        'Lift chest off the ground',
        'Hold for 3 seconds',
      ],
    },
    {
      id: 4,
      name: 'Neck Mobility Exercise',
      category: 'Neck',
      duration: '8 mins',
      difficulty: 'Beginner',
      calories: '30',
      sets: '2 sets × 10 reps',
      description: 'Relieve neck tension and stiffness',
      completed: false,
      favorite: false,
      color: '#FFD93D',
      videoUrl: 'https://www.youtube.com/watch?v=18m7LTe_Tnk',
      instructions: [
        'Sit or stand with good posture',
        'Slowly tilt head toward each shoulder',
        'Hold for 10 seconds on each side',
        'Return to center position',
      ],
    },
    {
      id: 5,
      name: 'Wrist Flexor Stretch',
      category: 'Wrist',
      duration: '6 mins',
      difficulty: 'Beginner',
      calories: '25',
      sets: '3 sets × 8 reps',
      description: 'Improve wrist flexibility and reduce strain',
      completed: true,
      favorite: false,
      color: '#3BA8E0',
      videoUrl: '',
      instructions: [
        'Extend arm with palm facing up',
        'Gently pull fingers back with other hand',
        'Hold for 15 seconds',
        'Repeat on other side',
      ],
    },
    {
      id: 6,
      name: 'Quadriceps Stretch',
      category: 'Knee',
      duration: '7 mins',
      difficulty: 'Beginner',
      calories: '35',
      sets: '3 sets × 10 reps',
      description: 'Stretch quadriceps muscles for knee support',
      completed: false,
      favorite: false,
      color: '#44B8F3',
      videoUrl: '',
      instructions: [
        'Stand holding onto a chair',
        'Bend knee and bring heel toward buttock',
        'Hold ankle with hand',
        'Keep knees together',
      ],
    },
  ];

  const filteredExercises = selectedCategory === 'All'
    ? exercises.filter(ex =>
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : exercises.filter(ex =>
      ex.category === selectedCategory &&
      (ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const toggleFavorite = (exerciseId) => {
    if (favorites.includes(exerciseId)) {
      setFavorites(favorites.filter(id => id !== exerciseId));
    } else {
      setFavorites([...favorites, exerciseId]);
    }
  };

  const startExercise = (exercise) => {
    navigation.navigate('ExerciseDetail', { exercise: JSON.stringify(exercise) });
  };

  return (
    <LinearGradient
      colors={['#44B8F3', '#2A9FD9', '#44B8F3']}
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
            <Text style={styles.title}>Exercises</Text>
            <Text style={styles.subtitle}>Your personalized therapy exercises</Text>
          </View>
          <TouchableOpacity
            style={styles.statsButton}
            onPress={() => navigation.navigate('Progress')}
          >
            <Ionicons name="stats-chart" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search exercises..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Text style={styles.sectionCount}>{exercises.length} exercises</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.name && styles.categoryCardActive
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <LinearGradient
                  colors={selectedCategory === category.name
                    ? category.id === 'all' ? ['#44B8F3', '#2A9FD9'] : [category.color, category.color + 'CC']
                    : ['rgba(24, 23, 23, 0.1)', 'rgba(26, 19, 19, 0.05)']
                  }
                  style={styles.categoryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={[
                    styles.categoryIcon,
                    { backgroundColor: selectedCategory === category.name ? '#fff' : 'rgba(255, 255, 255, 0.1)' }
                  ]}>
                    <Ionicons
                      name={category.icon}
                      size={24}
                      color={selectedCategory === category.name ? category.id === 'all' ? '#44B8F3' : category.color : '#fff'}
                    />
                  </View>
                  <Text style={[
                    styles.categoryName,
                    { color: selectedCategory === category.name ? '#fff' : 'rgba(255, 255, 255, 0.8)' }
                  ]}>
                    {category.name}
                  </Text>
                  <View style={[
                    styles.categoryCount,
                    { backgroundColor: selectedCategory === category.name ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)' }
                  ]}>
                    <Text style={[
                      styles.countText,
                      { color: selectedCategory === category.name ? '#fff' : 'rgba(255, 255, 255, 0.8)' }
                    ]}>
                      {category.count}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Exercises List */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'All' ? 'All Exercises' : selectedCategory + ' Exercises'}
            </Text>
            <Text style={styles.sectionCount}>{filteredExercises.length} found</Text>
          </View>

          {filteredExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              activeOpacity={0.9}
              onPress={() => startExercise(exercise)}
            >
              <View style={styles.exerciseHeader}>
                <View style={[styles.exerciseIcon, { backgroundColor: exercise.color + '20' }]}>
                  <Ionicons name="fitness" size={24} color={exercise.color} />
                </View>

                <View style={styles.exerciseInfo}>
                  <View style={styles.exerciseTitleRow}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleFavorite(exercise.id);
                      }}
                    >
                      <Ionicons
                        name={favorites.includes(exercise.id) ? "heart" : "heart-outline"}
                        size={22}
                        color={favorites.includes(exercise.id) ? '#FF6B6B' : '#999'}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.exerciseDescription}>{exercise.description}</Text>

                  <View style={styles.exerciseMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="time" size={14} color="#666" />
                      <Text style={styles.metaText}>{exercise.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="barbell" size={14} color="#666" />
                      <Text style={styles.metaText}>{exercise.difficulty}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="flame" size={14} color="#666" />
                      <Text style={styles.metaText}>{exercise.calories} cal</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="repeat" size={14} color="#666" />
                      <Text style={styles.metaText}>{exercise.sets}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.exerciseFooter}>
                <View style={[
                  styles.categoryTag,
                  { backgroundColor: exercise.color + '20' }
                ]}>
                  <Text style={[styles.categoryText, { color: exercise.color }]}>
                    {exercise.category}
                  </Text>
                </View>

                <View style={styles.actionButtons}>
                  {exercise.completed ? (
                    <View style={[styles.completedBadge, { backgroundColor: '#38B00020' }]}>
                      <Ionicons name="checkmark-circle" size={16} color="#38B000" />
                      <Text style={[styles.completedText, { color: '#38B000' }]}>
                        Completed
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.startButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        startExercise(exercise);
                      }}
                    >
                      <LinearGradient
                        colors={[exercise.color, exercise.color + 'CC']}
                        style={styles.startGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Ionicons name="play" size={16} color="#fff" />
                        <Text style={styles.startButtonText}>Start</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Exercise */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Exercise</Text>
            <Ionicons name="star" size={20} color="#FFD700" />
          </View>

          <View style={styles.featuredCard}>
            <LinearGradient
              colors={['#44B8F3', '#2A9FD9']}
              style={styles.featuredGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.featuredContent}>
                <View>
                  <View style={styles.featuredBadge}>
                    <Text style={styles.featuredBadgeText}>RECOMMENDED</Text>
                  </View>
                  <Text style={styles.featuredTitle}>Full Body Mobility Routine</Text>
                  <Text style={styles.featuredDescription}>
                    Comprehensive routine for overall flexibility and joint health
                  </Text>
                </View>

                <TouchableOpacity style={styles.featuredButton}>
                  <Ionicons name="play-circle" size={28} color="#fff" />
                  <Text style={styles.featuredButtonText}>Start Routine</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Ionicons name="checkmark-done" size={24} color="#38B000" />
            <View style={styles.statContent}>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="time" size={24} color="#44B8F3" />
            <View style={styles.statContent}>
              <Text style={styles.statValue}>4h 20m</Text>
              <Text style={styles.statLabel}>Total Time</Text>
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="flame" size={24} color="#FF6B6B" />
            <View style={styles.statContent}>
              <Text style={styles.statValue}>2.1k</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  sectionCount: {
    fontSize: 14,
    color: '#44B8F3',
    fontWeight: '600',
  },
  categoriesScroll: {
    marginHorizontal: -5,
  },
  categoryCard: {
    width: 100,
    marginHorizontal: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  categoryCardActive: {
    transform: [{ scale: 1.05 }],
  },
  categoryGradient: {
    padding: 15,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryCount: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  exerciseHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  exerciseIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  exerciseMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
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
  exerciseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
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
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    marginRight: 10,
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  startButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 10,
  },
  startGradient: {
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
  detailsButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  featuredCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  featuredGradient: {
    padding: 25,
  },
  featuredContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  featuredBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
    maxWidth: 200,
  },
  featuredButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
  },
  featuredButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    marginHorizontal: 25,
    marginBottom: 30,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statContent: {
    marginLeft: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
  },
});

export default ExercisesScreen;