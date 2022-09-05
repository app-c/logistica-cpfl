import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '../pages/SignIn';

const { Navigator, Screen } = createNativeStackNavigator();

export function App() {
   return (
      <Navigator
         screenOptions={{
            headerShown: false,
         }}
      >
         <Screen name="signIn" component={SignIn} />
      </Navigator>
   );
}
