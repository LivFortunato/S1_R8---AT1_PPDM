import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DriversScreen from './screens/DriversScreen';
import DriverDetailScreen from './screens/DriverDetailScreen';
import HomeScreen from './screens/HomeScreen';
import { colors } from './styles/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DriversStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '800' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Drivers"
        component={DriversScreen}
        options={{ title: 'Pilotos', headerBackTitle: 'Voltar' }}
      />
      <Stack.Screen
        name="DriverDetail"
        component={DriverDetailScreen}
        options={({ route }) => ({ title: route.params?.driver?.name_acronym || 'Detalhes' })}
      />
    </Stack.Navigator>
  );
}

export default function Navigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          initialRouteName="Início"
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.white,
            headerTitleStyle: { fontWeight: '800' },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarStyle: { paddingBottom: 8, height: 60 },
          }}
        >
          <Tab.Screen
            name="Início"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>🏁</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Pilotos"
            component={DriversStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>🏎️</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
