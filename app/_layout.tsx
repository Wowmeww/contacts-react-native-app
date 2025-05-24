import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export default function RootLayout() {
    
    return (
        <>
            <Stack initialRouteName='index' >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="signup" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{
                    headerShown: false,
                }} />
                <Stack.Screen
                    name="(crud)"
                    options={{
                        headerShown: false,
                        headerStyle: { backgroundColor: '#FFFFFF' },
                        headerTitleStyle: { color: '#000000' },
                    }}
                />
                <Stack.Screen name="+not-found" />
            </Stack >
            <StatusBar style="auto" />
        </>
    );
}
