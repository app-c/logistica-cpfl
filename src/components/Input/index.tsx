/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
   Text,
   Box,
   Stack,
   FormControl,
   Input as In,
   IInputProps,
   WarningOutlineIcon,
} from 'native-base';

interface Props extends IInputProps {
   title: string;
   erroMessage: string;
   error: boolean;
   label: string;
   text: string;
}

export function Input({
   title,
   erroMessage,
   error,
   label,
   text,
   ...rest
}: Props) {
   return (
      <Box w="100%">
         <FormControl isInvalid={error}>
            <FormControl.Label
               _text={{
                  color: error ? 'amber.800' : 'blue.900',
               }}
            >
               {label}
            </FormControl.Label>
            <In variant="underlined" placeholder={title} {...rest} />
            <FormControl.ErrorMessage
               leftIcon={<WarningOutlineIcon size="xs" />}
            >
               {erroMessage}
            </FormControl.ErrorMessage>
         </FormControl>
      </Box>
   );
}
