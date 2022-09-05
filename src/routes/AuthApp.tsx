import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather, FontAwesome5 } from '@expo/vector-icons';
import { Home } from '../pages/Home';
import theme from '../global/styles/theme';
import { Search } from '../pages/Search';

const { colors } = theme;

const { Navigator, Screen } = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigation() {
   return (
      <Tab.Navigator
         screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.orange.tom,
            tabBarStyle: {
               paddingBottom: 4,
               paddingTop: 4,
               height: 60,
               backgroundColor: colors.blue.tom,
            },
            tabBarLabelStyle: {
               fontSize: 14,
               textAlign: 'center',
               width: 100,
            },
         }}
      >
         <Tab.Screen
            name="home"
            component={Home}
            options={{
               tabBarIcon: ({ color, size }) => (
                  <Entypo name="home" size={size} color={color} />
               ),
            }}
         />

         <Tab.Screen
            name="search"
            component={Search}
            options={{
               tabBarIcon: ({ color, size }) => (
                  <Feather name="search" size={size} color={color} />
               ),
            }}
         />
      </Tab.Navigator>
   );
}

export function AuthApp() {
   return (
      <Navigator
         screenOptions={{
            headerShown: false,
         }}
      >
         <Screen name="home" component={TabNavigation} />
      </Navigator>
   );
}
