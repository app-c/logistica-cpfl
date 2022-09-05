import React from 'react';
import { Text, Box } from 'native-base';

interface Props {
   color: string;
}

export function Line({ color }: Props) {
   return <Box mt="2" w="100%" h="2" bg={color} />;
}
