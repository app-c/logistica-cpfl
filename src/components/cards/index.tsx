import React from 'react';
import { Text, Box, Center } from 'native-base';
import { Dimensions, TouchableOpacity } from 'react-native';
import theme from '../../global/styles/theme';

interface Props {
   title: string;
   pres: () => void;
   presIn: boolean;
}

export function Cards({ title, pres, presIn }: Props) {
   const w = Dimensions.get('window').width;
   return (
      <TouchableOpacity onPress={pres}>
         <Box
            alignItems="center"
            justifyContent="center"
            size="40"
            h={w * 0.14}
            borderRadius="10"
            bg={theme.colors.green.tom}
            opacity={presIn ? 1 : 0.4}
            ml="10"
         >
            <Center>
               <Text textAlign="center" fontSize="16" color="dark.900">
                  {title}
               </Text>
            </Center>
         </Box>
      </TouchableOpacity>
   );
}
