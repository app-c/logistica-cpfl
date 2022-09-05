/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Text, Box, Input, IInputProps } from 'native-base';
import { Feather } from '@expo/vector-icons';

interface Props extends IInputProps {
   text: string;
}

export function SearchInput({ text, ...rest }: Props) {
   return (
      <Box>
         <Input
            fontSize={16}
            placeholder={text}
            borderColor="dark.200"
            borderWidth={2}
            leftElement={
               <Feather name="search" size={20} style={{ marginLeft: 20 }} />
            }
            {...rest}
         />
      </Box>
   );
}
