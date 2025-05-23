import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import Feather from '@expo/vector-icons/Feather';


export default function CrudLayout() {
    const colorScheme = useColorScheme();

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
                        display: 'none'
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
                },
            }}>
       
            <Tabs.Screen
                name="addContact"
                options={{
                    title: 'Add contact',
                    tabBarIcon: ({ color }) => <Feather name="phone" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
