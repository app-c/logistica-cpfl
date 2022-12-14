import React, { useCallback, useState } from 'react';
import { Text, Box, Input, HStack, ScrollView } from 'native-base';
import Fire from '@react-native-firebase/firestore';
import { Feather } from '@expo/vector-icons';
import { Alert, FlatList, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import { format } from 'date-fns';
import { colecao } from '../../colecao';
import { IReqEpi, IReqFerramenta } from '../../dtos';
import { SearchInput } from '../../components/SearchInput';
import { Cards } from '../../components/cards';
import { CircleSelect } from '../../components/CirlceSelect';
import { Lista } from '../../components/Lista';
import { useAuth } from '../../hooks/AuthContext';
import { ModalDetails } from '../../components/Modal/Details';
import { Header } from '../../components/Header';

export function Home() {
   const { user, updateUser } = useAuth();
   const [search, setSearch] = React.useState('');
   const [dataEpi, setDataEpi] = React.useState<IReqEpi[]>([]);
   const [select, setSelect] = React.useState('pendente');
   const [type, setType] = React.useState('EPI');

   const [showModalDetails, setShowModalDetails] = useState(false);
   const [propsItemEpi, setPropsItemEpi] = useState<IReqEpi>();
   const [propsItemFerr, setPropsItemFerr] = useState<IReqFerramenta>();

   //* * BUSCA NO BANCO */

   React.useEffect(() => {
      const lod = Fire()
         .collection(colecao.soli)
         .onSnapshot(data => {
            const dt = data.docs.map(h => {
               return {
                  ...h.data(),
                  Idb: h.id,
               } as IReqEpi;
            });

            const fil = dt.filter(p => p.user_info.city === user.city);

            setDataEpi(fil);
         });

      return () => lod();
   }, [user.city]);

   //* * .................................................................... */

   const filEpi = dataEpi.filter(h => {
      if (select === h.situacao && h.material_info.ft === 'EPI') {
         return h;
      }
   });

   const filFe = dataEpi.filter(h => {
      if (
         h.whoFor === 'PESSOAL' &&
         select === h.situacao &&
         h.material_info.ft !== 'EPI'
      ) {
         return h;
      }
   });

   const filFer = dataEpi.filter(h => {
      if (h.whoFor === 'VEICULO' && h.situacao === select) {
         return h;
      }
   });

   const lista =
      search.length > 0
         ? filEpi.filter(h => {
              return h.user_info.nome.includes(search);
           })
         : filEpi;

   const ferramenta =
      search.length > 0
         ? filFe.filter(h => {
              return h.user_info.nome.includes(search);
           })
         : filFe;

   const ferramental =
      search.length > 0
         ? filFer.filter(h => h.user_info.nome.includes(search))
         : filFer;

   const sendPush = useCallback(async (token: string) => {
      const message = {
         to: token,
         sound: 'default',
         title: 'SEU PEDIDO EST?? PRONTO',
         body: `Favor vim retirar seu item`,
      };
      await fetch('https://exp.host/--/api/v2/push/send', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(message),
      });
   }, []);

   const handleSubmit = React.useCallback(
      async (situacao: string, id: string, token: string) => {
         if (situacao === 'separado') {
            Fire().collection(colecao.soli).doc(id).update({
               situacao: 'entregue',
               data: new Date().getTime(),
            });
         }

         console.log(situacao);

         if (situacao === 'pendente') {
            Fire()
               .collection(colecao.soli)
               .doc(id)
               .update({
                  situacao: 'separado',
                  data: format(new Date(), 'dd/mm/yy'),
               });

            console.log('token: ', token);

            sendPush(token);
         }
      },
      [sendPush],
   );

   const handleSubmitFerramenta = React.useCallback(
      async (situacao: string, id: string, token: string) => {
         if (situacao === 'separado') {
            Fire()
               .collection(colecao.soli)
               .doc(id)
               .update({
                  situacao: 'entregue',
                  data: format(new Date(), 'dd/mm/yy'),
               });
         }

         if (situacao === 'pendente') {
            Fire()
               .collection(colecao.soli)
               .doc(id)
               .update({
                  situacao: 'separado',
                  data: format(new Date(), 'dd/mm/yy'),
               });

            const message = {
               to: token,
               sound: 'default',
               title: 'SEU PEDIDO EST?? PRONTO',
               body: `Favor vim retirar seu item`,
            };
            await fetch('https://exp.host/--/api/v2/push/send', {
               method: 'POST',
               headers: {
                  Accept: 'application/json',
                  'Accept-encoding': 'gzip, deflate',
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(message),
            });
         }
      },
      [],
   );

   const handleSubmitFerramental = React.useCallback(
      async (situacao: string, id: string, token: string) => {
         if (situacao === 'separado') {
            Fire().collection(colecao.soli).doc(id).update({
               situacao: 'entregue',
               data: new Date().getTime(),
            });
         }

         if (situacao === 'pendente') {
            Fire()
               .collection(colecao.soli)
               .doc(id)
               .update({
                  situacao: 'separado',
                  data: format(new Date(), 'dd/MM/yy'),
               });

            const message = {
               to: token,
               sound: 'default',
               title: 'SEU PEDIDO EST?? PRONTO',
               body: `Favor vim retirar seu item`,
            };
            await fetch('https://exp.host/--/api/v2/push/send', {
               method: 'POST',
               headers: {
                  Accept: 'application/json',
                  'Accept-encoding': 'gzip, deflate',
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(message),
            });
         }
      },
      [],
   );

   const updateToken = React.useCallback(async () => {
      const { status: existingStatus } =
         await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
         const { status } = await Notifications.requestPermissionsAsync();
         finalStatus = status;
      }
      if (finalStatus !== 'granted') {
         Alert.alert('Failed to get push token for push notification!');
         return;
      }
      const token = (
         await Notifications.getExpoPushTokenAsync({
            experienceId: '@app-c/reqalmoxerife',
         })
      ).data;

      if (Platform.OS === 'android') {
         Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
         });
      }

      Fire().collection(colecao.ALMOXERIFE).doc(user.id).update({
         token,
      });
   }, [user]);

   React.useEffect(() => {
      updateToken();
   }, [updateToken]);

   // useFocusEffect(
   //    useCallback(() => {
   //       updateToken();
   //    }, []),
   // );

   const handleShowModalDetails = React.useCallback((data: IReqEpi) => {
      setShowModalDetails(true);
      setPropsItemEpi(data);
   }, []);

   const handleShowModalDetailsFerramenta = React.useCallback(
      (data: IReqFerramenta) => {
         setShowModalDetails(true);
         setPropsItemFerr(data);
      },
      [],
   );

   console.log(lista);

   return (
      <Box flex="1">
         <Header text={`Ol?? ${user.nome}`} />
         {propsItemEpi && (
            <ModalDetails
               situacao={propsItemEpi.situacao}
               closeModal={() => setShowModalDetails(false)}
               data={propsItemEpi.data}
               lf={propsItemEpi.material_info.ft}
               item={propsItemEpi.material_info.descricao}
               nome={propsItemEpi.user_info.nome}
               ged={propsItemEpi.material_info.ged}
               showModal={showModalDetails}
               image={propsItemEpi.image}
               tipo={propsItemEpi.whoFor}
               quantidade={propsItemEpi.quantidade}
            />
         )}

         {propsItemFerr && (
            <ModalDetails
               situacao={propsItemFerr.situacao}
               closeModal={() => setShowModalDetails(false)}
               data={propsItemFerr.data}
               lf={propsItemFerr.material_info.ft}
               item={propsItemFerr.material_info.descricao}
               nome={propsItemFerr.user_info.nome}
               ged={propsItemFerr.material_info.ged}
               showModal={showModalDetails}
               image={propsItemFerr.image}
               tipo={propsItemFerr.whoFor}
               quantidade={propsItemFerr.quantidade}
               car={propsItemFerr.veiculo}
               placa={propsItemFerr.placa}
            />
         )}

         <Box mt="-6" p="10">
            <SearchInput
               text="PESQUISAR POR NOME"
               onChangeText={h => setSearch(h)}
            />
            <HStack justifyContent="space-between" mt="3">
               <CircleSelect
                  pres={() => setSelect('pendente')}
                  selected={select === 'pendente'}
                  text="pendente"
               />
               <CircleSelect
                  pres={() => setSelect('separado')}
                  selected={select === 'separado'}
                  text="separado"
               />
               <CircleSelect
                  pres={() => setSelect('entregue')}
                  selected={select === 'entregue'}
                  text="entregue"
               />
            </HStack>
         </Box>

         <HStack mt="-1">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
               <Cards
                  pres={() => setType('EPI')}
                  title="EPI"
                  presIn={type === 'EPI'}
               />
               <Cards
                  pres={() => setType('FERRAMENTA')}
                  title="FERRAMENTA"
                  presIn={type === 'FERRAMENTA'}
               />
               <Cards
                  pres={() => setType('FERRAMENTAL')}
                  title="FERRAMENTAL"
                  presIn={type === 'FERRAMENTAL'}
               />
            </ScrollView>
         </HStack>

         {type === 'EPI' && (
            <FlatList
               contentContainerStyle={{ paddingBottom: 200 }}
               data={lista}
               keyExtractor={h => String(h.data)}
               renderItem={({ item: h }) => (
                  <Box>
                     <Lista
                        nome={h.user_info.nome}
                        data={h.data}
                        item={h.material_info.descricao}
                        description={h.description}
                        situacao={h.situacao}
                        pres={() =>
                           handleSubmit(h.situacao, h.Idb, h.user_info.token)
                        }
                        showDetails={() => handleShowModalDetails(h)}
                     />
                  </Box>
               )}
            />
         )}

         {type === 'FERRAMENTA' && (
            <FlatList
               contentContainerStyle={{ paddingBottom: 200 }}
               data={ferramenta}
               keyExtractor={h => String(h.id)}
               renderItem={({ item: h }) => (
                  <Box>
                     <Lista
                        nome={h.user_info.nome}
                        data={h.data}
                        item={h.material_info.descricao}
                        description={h.description}
                        situacao={h.situacao}
                        pres={() =>
                           handleSubmitFerramenta(
                              h.situacao,
                              h.Idb,
                              h.user_info.token,
                           )
                        }
                        showDetails={() => handleShowModalDetailsFerramenta(h)}
                     />
                  </Box>
               )}
            />
         )}

         {type === 'FERRAMENTAL' && (
            <FlatList
               contentContainerStyle={{ paddingBottom: 200 }}
               data={ferramental}
               keyExtractor={h => h.id}
               renderItem={({ item: h }) => (
                  <Box>
                     <Lista
                        nome={h.user_info.nome}
                        data={h.data}
                        item={h.material_info.descricao}
                        description={h.description}
                        situacao={h.situacao}
                        pres={() =>
                           handleSubmitFerramental(
                              h.situacao,
                              h.Idb,
                              h.user_info.token,
                           )
                        }
                        showDetails={() => handleShowModalDetailsFerramenta(h)}
                     />
                  </Box>
               )}
            />
         )}
      </Box>
   );
}
