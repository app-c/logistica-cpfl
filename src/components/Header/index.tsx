import React from 'react';
import { Box, Center, HStack, Image } from 'native-base';
import { Dimensions, Text, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import theme from '../../global/styles/theme';
import logo from '../../assets/logo.png';
import { useAuth } from '../../hooks/AuthContext';

interface Props {
   text: string;
}

export function Header({ text }: Props) {
   const { signOut } = useAuth();
   const wi = Dimensions.get('window').width;
   return (
      <Box py={wi * 0.015} pb="3" bg={theme.colors.blue.tom}>
         <Center />
         <HStack justifyContent="space-between" alignItems="center" px="8">
            <Image
               alt="image"
               size={wi * 0.15}
               w={wi * 0.2}
               mt="1"
               source={logo}
            />
            <Text
               style={{
                  color: '#fff',
                  fontFamily: 'bold',
                  fontSize: 18,
                  textAlign: 'center',
               }}
            >
               {text}
            </Text>

            <TouchableOpacity onPress={signOut}>
               <Center>
                  <FontAwesome5
                     name="power-off"
                     size={25}
                     color={theme.colors.orange.tom}
                  />
                  <Text style={{ color: '#fff', fontFamily: 'bold' }}>
                     SAIR
                  </Text>
               </Center>
            </TouchableOpacity>
         </HStack>
      </Box>
   );
}
