import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import {
   useFonts,
   Comfortaa_600SemiBold as bold,
   Comfortaa_400Regular as Regular,
   Comfortaa_700Bold as Black,
} from '@expo-google-fonts/comfortaa';
import { GloriaHallelujah_400Regular as gloria } from '@expo-google-fonts/gloria-hallelujah';
import AppProvider from './src/hooks';
import { Routes } from './src/routes';

export default function App() {
   const [fonts] = useFonts({
      Regular,
      Black,
      bold,
      gloria,
   });

   if (!fonts) {
      return null;
   }

   return (
      <NavigationContainer>
         <AppProvider>
            <NativeBaseProvider>
               <View style={{ flex: 1 }}>
                  <Routes />
               </View>
            </NativeBaseProvider>
         </AppProvider>
      </NavigationContainer>
   );
}
