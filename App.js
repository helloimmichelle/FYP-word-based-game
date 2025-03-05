import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/HomeScreen';
import ClassicMode from './screens/ClassicMode';
import ZenMode from './screens/ZenMode';
import ModeSelectScreen from  './screens/ModeSelectScreen';


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
            name="Mode"
            component={ModeSelectScreen}
            options={{ title: "game mode" }}
            />
              <Stack.Screen
            name="ClassicMode"
            component={ClassicMode}
            options={{ title: "play" }}
            />
            <Stack.Screen
            name="ZenMode"
            component={ZenMode}
            options={{ title: "play" }}
            />
        </Stack.Navigator>
        </NavigationContainer>
    </GestureHandlerRootView>
  );
}
