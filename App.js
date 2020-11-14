import * as React from 'react';
import { View, Button, Clipboard } from 'react-native';
import {  NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateRegistry from "./src/screens/CreateRegistry";
import Profile from "./src/screens/Profile"
import List from "./src/screens/List"
import Validate from "./src/screens/ValidateScreen"

import * as Print from 'expo-print';
import * as Device from 'expo-device';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CreateRegistry/>
    </View>
  );
}

function ListScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <List navigation={navigation} route={route}/>
    </View>
  );
}

function ValidateScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Validate navigation={navigation} route={route}/>
    </View>
  )
}

function ListNavigator() {
  return(
  <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="Obras">
      <Stack.Screen name="Obras" component={ListScreen} />
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Validação" component={ValidateScreen} />

    </Stack.Navigator>
  </NavigationContainer>
  )
}

function ProfileScreen(){
  return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Profile/>
  </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Criar" component={HomeScreen} />
        <Tab.Screen name="Lista" component={ListNavigator} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
