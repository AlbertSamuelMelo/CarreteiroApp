import * as React from 'react';
import { View, useState } from 'react-native';
import {  NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CreateRegistry from "./src/screens/CreateRegistry";
import Profile from "./src/screens/Profile"
import List from "./src/screens/List"
import Validate from "./src/screens/ValidateScreen"
import ScanQR from "./src/screens/ScanScreen"
import ValidateQR from "./src/screens/ValidateScan"
import RegisterConfiguration from "./src/screens/RegisterConfiguration"
import UserConfiguration from "./src/screens/UsersConfiguration"
import Login from"./src/screens/Login"

import LoggedService from "./src/services/LoggedService"

import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Network from 'expo-network';
import * as ScreenOrientation from 'expo-screen-orientation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

async function changeScreenOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
}

function CreateScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CreateRegistry navigation={navigation} route={route}/>
    </View>
  );
}

function ConfigureCreateRegistry({ navigation, route }){
  return(
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <RegisterConfiguration navigation={navigation} route={route}/>
  </View>
  )
}

function CreateNavigator(){
  return(
    <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="Criar Registro">
      <Stack.Screen name="Criar Registro" component={CreateScreen} />
      <Stack.Screen name="Configurar Registro" component={ConfigureCreateRegistry} />
    </Stack.Navigator>
  </NavigationContainer>
  )
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

function ValidateQRScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ValidateQR navigation={navigation} route={route}/>
    </View>
  );
}

function ScanNavigator() {
  return(
  <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="Scan QR">
      <Stack.Screen name="Scan QR" component={ScanScreen} />
      <Stack.Screen name="Validar QrCode" component={ValidateQRScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

function ProfileScreen({ navigation, route }){
  return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Profile navigation={navigation} route={route}/>
  </View>
  )
}

function ConfigureProfile({ navigation, route }){
  return(
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <UserConfiguration navigation={navigation} route={route}/>
  </View>
  )
}

function ProfileNavigator(){
  return(
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Perfil">
        <Stack.Screen name="Perfil" component={ProfileScreen} />
        <Stack.Screen name="Configurar Usuarios" component={ConfigureProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function LoginScreen({ navigation, route }){
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Login navigation={navigation} route={route}/>
    </View>
  )
}

function LoggedScreens(){
  return(
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Criar') {
              iconName = focused
                ? 'ios-add-circle'
                : 'ios-add-circle-outline';
            } else if (route.name === 'ScanQR') {
              iconName = focused ? 'ios-barcode' : 'ios-barcode';
            } else if (route.name === 'Lista') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } 
            else if (route.name === 'Perfil') {
              iconName = focused ? 'ios-person' : 'ios-person';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#115B73',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Criar" component={CreateNavigator} />
        <Tab.Screen name="ScanQR" component={ScanNavigator} />
        <Tab.Screen name="Lista" component={ListNavigator} />
        <Tab.Screen name="Perfil" component={ProfileNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  changeScreenOrientation()
  LoggedService.createLogged()

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={LoginScreen}  />
        <Stack.Screen name="Criar" component={LoggedScreens} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    //LoggedScreens()
  );
}
