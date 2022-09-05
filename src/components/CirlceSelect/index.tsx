import React from 'react';
import { Text, Box, Circle, Center, HStack } from 'native-base';
import { Dimensions, TouchableOpacity } from 'react-native';
import theme from '../../global/styles/theme';

const w = Dimensions.get('window').width;

interface Props {
   text: string;
   selected: boolean;
   pres: () => void;
}

export function CircleSelect({ text, selected, pres }: Props) {
   return (
      <TouchableOpacity onPress={pres}>
         <HStack>
            <Center
               borderRadius={w * 0.03}
               w={w * 0.06}
               h={w * 0.06}
               bg="dark.800"
               borderColor={theme.colors.blue.tom}
               borderWidth={3}
            >
               <Box
                  bg={selected ? theme.colors.yellow.tom : 'dark.800'}
                  borderRadius={w * 0.015}
                  w={w * 0.03}
                  h={w * 0.03}
               />
            </Center>

            <Text ml="2">{text}</Text>
         </HStack>
      </TouchableOpacity>
   );
}
