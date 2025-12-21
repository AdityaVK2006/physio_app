import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ExerciseVideoPlayer } from '../components/ExerciseVideoPlayer';
import { useAudioPlayer } from 'expo-audio';

const ExerciseDetail = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const exercise = params.exercise ? JSON.parse(params.exercise as string) : null;
    const successPlayer = useAudioPlayer('https://www.soundjay.com/buttons/sounds/button-09.mp3');

    if (!exercise) {
        return (
            <View style={styles.errorContainer}>
                <Text>Exercise not found</Text>
            </View>
        );
    }

    const handleComplete = () => {
        successPlayer.play();
        // In a real app, we would update the backend/state here
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{exercise.name}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.videoContainer}>
                    <ExerciseVideoPlayer videoUrl={exercise.videoUrl} style={styles.video} />
                </View>

                <View style={styles.content}>
                    <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                            <Ionicons name="time-outline" size={20} color="#44B8F3" />
                            <Text style={styles.metaLabel}>Duration</Text>
                            <Text style={styles.metaValue}>{exercise.duration}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Ionicons name="barbell-outline" size={20} color="#44B8F3" />
                            <Text style={styles.metaLabel}>Difficulty</Text>
                            <Text style={styles.metaValue}>{exercise.difficulty}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Ionicons name="flame-outline" size={20} color="#44B8F3" />
                            <Text style={styles.metaLabel}>Calories</Text>
                            <Text style={styles.metaValue}>{exercise.calories}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Instructions</Text>
                        {exercise.instructions?.map((instruction: string, index: number) => (
                            <View key={index} style={styles.instructionItem}>
                                <View style={styles.instructionNumber}>
                                    <Text style={styles.instructionNumberText}>{index + 1}</Text>
                                </View>
                                <Text style={styles.instructionText}>{instruction}</Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
                        <LinearGradient
                            colors={['#44B8F3', '#2A9FD9']}
                            style={styles.completeGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
                            <Text style={styles.completeText}>Mark as Completed</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: { marginRight: 15 },
    headerTitle: { fontSize: 20, fontWeight: '700', color: '#333' },
    scrollContent: { paddingBottom: 40 },
    videoContainer: { width: '100%', height: 250, backgroundColor: '#000' },
    video: { width: '100%', height: '100%' },
    content: { padding: 25 },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    metaItem: { alignItems: 'center', flex: 1 },
    metaLabel: { fontSize: 12, color: '#666', marginTop: 5 },
    metaValue: { fontSize: 16, fontWeight: '600', color: '#333', marginTop: 2 },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 20 },
    instructionItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15 },
    instructionNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#44B8F3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginTop: 2,
    },
    instructionNumberText: { color: '#fff', fontSize: 12, fontWeight: '600' },
    instructionText: { fontSize: 15, color: '#444', lineHeight: 22, flex: 1 },
    completeButton: { borderRadius: 15, overflow: 'hidden', marginTop: 10 },
    completeGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
    },
    completeText: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 10 },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ExerciseDetail;
