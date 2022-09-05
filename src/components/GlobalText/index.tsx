/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {
   color?: string;
   font: string;
   size: number;
   text: string;
}

export function GlobalText({ color, font, size, text, ...rest }: Props) {
   return (
      <Text
         style={{
            color,
            fontFamily: font,
            fontSize: size,
            ...rest,
         }}
      >
         {text}
      </Text>
   );
}
