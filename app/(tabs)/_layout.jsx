import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen 
                name='Dashboard' 
                options={{
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="home" size={24} color={color} />
                }}
            />
            <Tabs.Screen 
                name='Exercises' 
                options={{
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="dumbbell" size={24} color={color} />
                }}
            />
            <Tabs.Screen 
                name='Reports' 
                options={{
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="chart-box" size={24} color={color} />
                }}
            />
            <Tabs.Screen 
                name='Profile' 
                options={{
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="account" size={24} color={color} />
                }}
            />
        </Tabs>
    )
}