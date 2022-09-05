/* eslint-disable react/require-default-props */
import React from 'react';
import { Text, Box, VStack, HStack, Button, Center } from 'native-base';
import { TouchableOpacity } from 'react-native';
import theme from '../../global/styles/theme';
import { Line } from '../Line';
import { GlobalText } from '../GlobalText';

interface IProps {
   situacao: string;
   item: string;
   data: string;
   pres: () => void;
   description?: string;
   nome: string;
   showDetails?: () => void;
}

export function Lista({
   situacao,
   item,
   data,
   pres,
   description,
   nome,
   showDetails,
}: IProps) {
   const [color, setColor] = React.useState('red.500');

   const { colors } = theme;

   React.useEffect(() => {
      if (situacao === 'pendente') {
         setColor(colors.red.tom);
      }

      if (situacao === 'separado') {
         setColor(colors.yellow.tom);
      }

      if (situacao === 'entregue') {
         setColor(colors.green.tom);
      }
   }, [colors.green.tom, colors.red.tom, colors.yellow.tom, situacao]);

   return (
      <Box
         borderWidth={1}
         borderColor="dark.100"
         borderRadius={5}
         pl="5"
         pb="5"
         pr="5"
         pt="1"
         w="100%"
         mt="4"
         bg="dark.700"
      >
         <TouchableOpacity onPress={showDetails}>
            <Center mb="5">
               <GlobalText text={nome} font="Black" size={16} />
            </Center>
            <HStack justifyContent="space-between">
               <VStack space="2">
                  <GlobalText font="bold" text={`ITEM: ${item}`} />
                  <GlobalText font="bold" text={`DATA: ${data}`} />
                  <GlobalText font="bold" text={`SITUAÇÃO: ${situacao}`} />
                  {situacao !== 'entregue' && (
                     <Text>DESCRIÇÃO: {description}</Text>
                  )}
               </VStack>
            </HStack>
         </TouchableOpacity>
         {situacao !== 'entregue' && (
            <Button h="10" onPress={pres}>
               {situacao === 'pendente' ? 'SEPARAR ITEM' : 'ENTREGAR ITEM'}
            </Button>
         )}

         <Line color={color} />
      </Box>
   );
}
