import React from 'react';
import { Text, Box, Input, HStack, ScrollView } from 'native-base';
import Fire from '@react-native-firebase/firestore';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { colecao } from '../../colecao';
import { IReqEpi } from '../../dtos';
import { SearchInput } from '../../components/SearchInput';
import { Cards } from '../../components/cards';
import { CircleSelect } from '../../components/CirlceSelect';
import { Lista } from '../../components/Lista';

interface PropsType {
   types: 'EPI' | 'FERRAMENTA' | 'FERRAMENTAL';
}

export function Search() {
   const [search, setSearch] = React.useState('');
   const [dataEpi, setDataEpi] = React.useState<IReqEpi[]>([]);
   const [dataFer, setDataFer] = React.useState<IReqEpi[]>([]);
   const [select, setSelect] = React.useState('pendente');
   const [type, setType] = React.useState('EPI');

   React.useEffect(() => {
      const lod = Fire()
         .collection(colecao.REQEPI)
         .onSnapshot(data => {
            const dt = data.docs.map(h => h.data() as IReqEpi);

            setDataEpi(dt);
         });

      return () => lod();
   }, []);

   React.useEffect(() => {
      const lod = Fire()
         .collection(colecao.REQFERRAMENTA)
         .onSnapshot(data => {
            const dt = data.docs.map(h => h.data() as IReqEpi);

            setDataFer(dt);
         });

      return () => lod();
   }, []);

   const filEpi = dataEpi.filter(h => select === h.situacao);

   const filFe = dataFer.filter(h => {
      if (h.tipo_item === 'PESSOAL' && select === h.situacao) {
         return h;
      }
   });
   const filFer = dataEpi.filter(h => {
      if (h.tipo_item === 'CAMINHÃO' && h.situacao === select) {
         return h;
      }
   });

   const lista =
      search.length > 0
         ? filEpi.filter(h => {
              return h.nome.includes(search);
           })
         : filEpi;

   const ferramenta =
      search.length > 0
         ? filFe.filter(h => {
              return h.nome.includes(search);
           })
         : filFe;

   const ferramental =
      search.length > 0 ? filFer.filter(h => h.nome.includes(search)) : filFer;

   console.log(filFe);

   return (
      <Box flex="1">
         <Box p="10">
            <SearchInput
               text="PESQUISAR POR NOME"
               onChangeText={h => setSearch(h)}
            />
            <HStack justifyContent="space-between" mt="5">
               <CircleSelect
                  pres={() => setSelect('pendente')}
                  selected={select === 'pendente'}
                  text="pendente"
               />
               <CircleSelect
                  pres={() => setSelect('em separacao')}
                  selected={select === 'em separacao'}
                  text="separado"
               />
               <CircleSelect
                  pres={() => setSelect('entregue')}
                  selected={select === 'entregue'}
                  text="entregue"
               />
            </HStack>
         </Box>

         <HStack mt="1">
            <ScrollView horizontal>
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
                        nome={h.nome}
                        data={h.dataFormatada}
                        item={h.item}
                        description={h.descricao}
                        situacao={h.situacao}
                        pres={() => {}}
                     />
                  </Box>
               )}
            />
         )}

         {type === 'FERRAMENTA' && (
            <FlatList
               contentContainerStyle={{ paddingBottom: 200 }}
               data={ferramenta}
               keyExtractor={h => String(h.data)}
               renderItem={({ item: h }) => (
                  <Box>
                     <Lista
                        nome={h.nome}
                        data={h.dataFormatada}
                        item={h.item}
                        description={h.descricao}
                        situacao={h.situacao}
                        pres={() => {}}
                     />
                  </Box>
               )}
            />
         )}

         {type === 'FERRAMENTAL' && (
            <FlatList
               contentContainerStyle={{ paddingBottom: 200 }}
               data={ferramental}
               keyExtractor={h => String(h.data)}
               renderItem={({ item: h }) => (
                  <Box>
                     <Lista
                        nome={h.nome}
                        data={h.dataFormatada}
                        item={h.item}
                        description={h.descricao}
                        situacao={h.situacao}
                        pres={() => {}}
                     />
                  </Box>
               )}
            />
         )}
      </Box>
   );
}
