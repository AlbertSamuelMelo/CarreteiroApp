import * as React from 'react';
import { View } from 'react-native';
import {  NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateRegistry from "./src/screens/CreateRegistry";
import Profile from "./src/screens/Profile"
import List from "./src/screens/List"
import Validate from "./src/screens/ValidateScreen"
import ScanQR from "./src/screens/ScanScreen"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CreateScreen() {
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

function ScanScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScanQR navigation={navigation} route={route}/>
    </View>
  );
}

function ScanNavigator() {
  return(
  <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="Scan QR">
      <Stack.Screen name="Scan QR" component={ScanScreen} />
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
        <Tab.Screen name="Criar" component={CreateScreen} />
        <Tab.Screen name="ScanQR" component={ScanNavigator} />
        <Tab.Screen name="Lista" component={ListNavigator} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
