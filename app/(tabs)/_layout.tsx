import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
    
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {
                        backgroundColor: '#007BFF',
                    },
                }),
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: '#FFFFFF90',
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#007BFF',
                    shadowColor: 'transparent',
                    elevation: 0,
                    borderBottomWidth: 0,
                },
                headerTitleStyle: {
                    color: '#fff',
                }
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Contacts',
                    tabBarIcon: ({ color }) => <Feather name="phone" size={24} color={color} />,
                }}
            />

            <Tabs.Screen
                name="favorite"
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({ color }) => <MaterialIcons name="favorite-border" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="logout"
                options={{
                    title: 'Logout',
                    tabBarIcon: ({ color }) => <AntDesign name="logout" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
