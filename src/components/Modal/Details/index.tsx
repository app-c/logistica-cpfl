/* eslint-disable react/require-default-props */
import React from 'react';
import { Text, Box, HStack, Center, VStack, Image } from 'native-base';
import { Dimensions, Modal, TouchableOpacity } from 'react-native';
import theme from '../../../global/styles/theme';

interface IProps {
   nome: string;
   item: string;
   ged: string;
   lf: string;
   data: string;
   situacao: string;
   placa?: string;
   quantidade: string;
   image: string;
   car?: string;
   tipo: string;

   showModal: boolean;
   closeModal: () => void;
}

export function ModalDetails({
   nome,
   item,
   ged,
   lf,
   data,
   showModal,
   closeModal,
   situacao,
   placa,
   quantidade,
   image,
   car,
   tipo,
}: IProps) {
   const { colors } = theme;
   const [color, setColor] = React.useState('');

   React.useEffect(() => {
      if (situacao === 'pendente') {
         setColor(colors.red.tranparente);
      }

      if (situacao === 'em separacao') {
         setColor(colors.yellow.tranparente);
      }

      if (situacao === 'entregue') {
         setColor(colors.green.tranparente);
      }
   }, [
      colors.green.tranparente,
      colors.red.tranparente,
      colors.yellow.tranparente,
      situacao,
   ]);

   const w = Dimensions.get('window').width;

   console.log(image);

   return (
      <Modal visible={showModal}>
         <Box bg="dark.700" flex="1">
            <Box p="5" bg="dark.800">
               <VStack space="5">
                  <HStack alignItems="center" space={4}>
                     <Text fontSize={16}>Nome: </Text>
                     <Text>{nome}</Text>
                  </HStack>

                  <HStack w={w * 0.8} alignItems="center" space={6}>
                     <Text fontSize={16}>Item: </Text>
                     <Text>{item}</Text>
                  </HStack>

                  <HStack alignItems="center" space={6}>
                     <Text fontSize={16}>GED: </Text>
                     <Text>{ged}</Text>
                  </HStack>

                  <HStack alignItems="center" space={9}>
                     <Text fontSize={16}>LF: </Text>
                     <Text>{lf}</Text>
                  </HStack>

                  <HStack alignItems="center" space={4}>
                     <Text fontSize={16}>DATA: </Text>
                     <Text>{data}</Text>
                  </HStack>

                  <HStack alignItems="center" space={4}>
                     <Text fontSize={18}>SITUAÇÃO: </Text>
                     <Text>{situacao}</Text>
                  </HStack>

                  <HStack alignItems="center" space={4}>
                     <Text fontSize={18}>TIPO: </Text>
                     <Text>{tipo}</Text>
                  </HStack>

                  <HStack alignItems="center" space={4}>
                     <Text fontSize={18}>QUANTIDADE: </Text>
                     <Text>{quantidade}</Text>
                  </HStack>

                  <HStack alignItems="center" space={4}>
                     <Text fontSize={18}>PLACA: </Text>
                     <Text>{placa}</Text>
                  </HStack>

                  <HStack alignItems="center" space={4}>
                     <Text fontSize={18}>VEÍCULO: </Text>
                     <Text>{placa}</Text>
                  </HStack>

                  <Box>
                     <Image
                        source={{ uri: image || '' }}
                        size={200}
                        resizeMode="contain"
                        alt="IMAGE"
                     />
                  </Box>
               </VStack>
            </Box>

            <Center mt="1">
               <TouchableOpacity onPress={closeModal}>
                  <Center borderRadius="5" p="2" w="100" bg="danger.500">
                     <Text>FECHAR</Text>
                  </Center>
               </TouchableOpacity>
            </Center>
         </Box>
      </Modal>
   );
}
