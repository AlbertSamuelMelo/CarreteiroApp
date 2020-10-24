import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateRegistry from "../CarreteiroApp/src/screens/CreateRegistry"

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CreateRegistry/>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Criar" component={HomeScreen} />
        <Tab.Screen name="Lista" component={SettingsScreen} />
        <Tab.Screen name="Perfil" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
