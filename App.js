import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateRegistry from "./src/screens/CreateRegistry";
import Profile from "./src/screens/Profile"
import List from "./src/screens/List"
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CreateRegistry/>
    </View>
  );
}

function ListScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <List/>
    </View>
  );
}

function ProfileScreen(){
  return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Profile/>
  </View>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Criar" component={HomeScreen} />
        <Tab.Screen name="Lista" component={ListScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
