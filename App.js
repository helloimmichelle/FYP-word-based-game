import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "title" }}
            />
            <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{ title: "play" }}
            />
        </Stack.Navigator>
        </NavigationContainer>
    </GestureHandlerRootView>
  );
}
