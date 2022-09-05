import React from 'react';
import { Text, Box, Center } from 'native-base';
import { TouchableOpacity } from 'react-native';
import theme from '../../global/styles/theme';

interface Props {
   active: boolean;
   text: string;
   select: () => void;
}

export function Fiter({ active, text, select }: Props) {
   return (
      <Center
         backgroundColor={
            active ? theme.colors.blue.tom : theme.colors.blue.transparente
         }
         borderRadius={10}
         p="1"
         w="100"
         // h="50"
      >
         <TouchableOpacity onPress={select}>
            <Text textAlign="center" color={active ? 'dark.900' : 'dark.600'}>
               {text}
            </Text>
         </TouchableOpacity>
      </Center>
   );
}
