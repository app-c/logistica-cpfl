import React from 'react';
import {
   Text,
   Box,
   Center,
   Image,
   Stack,
   FormControl,
   VStack,
   Button,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/AuthContext';

export function SignIn() {
   const { navigate } = useNavigation();
   const { signIn } = useAuth();

   const [email, setEmail] = React.useState('');
   const [senha, setSenha] = React.useState('');
   const [erroMail, setErroMail] = React.useState(false);
   const [messageErr, setMessageErr] = React.useState('');

   const [errSenha, setErrSenha] = React.useState(false);
   const [messageErrSenha, setMessageErrSenha] = React.useState('');

   const handleSubmit = React.useCallback(() => {
      if (email === '') {
         setErroMail(true);
         setMessageErr('Digite um email');
         return;
      }

      if (senha === '') {
         setErrSenha(true);
         setMessageErrSenha('Digite uma senha');
         return;
      }

      if (senha.length < 6) {
         setErrSenha(true);
         setMessageErrSenha('Senha no mínimo 6 digitos');
         return;
      }

      signIn({
         email,
         senha,
      }).catch(err => {
         console.log(err.code);
         if (err.code === 'auth/user-not-found') {
            setErroMail(true);
            setMessageErr('Usuário não encontrado');
         }

         if (err.code === 'auth/invalid-email') {
            setErroMail(true);
            setMessageErr('Email invalido');
         }

         if (err.code === 'auth/wrong-password') {
            setErrSenha(true);
            setMessageErrSenha('Senha inválida');
         }
      });
   }, [email, senha, signIn]);

   return (
      <Box flex="1">
         <Box alignItems="center" justifyContent="center" h="40%">
            <Center>
               <Image w="40%" h="30%" bg="red.900" alt="image" />
            </Center>
         </Box>

         <Center>
            <Text>SignIn</Text>
            <Box p="10" w="100%">
               <VStack space={2}>
                  <Input
                     keyboardType="email-address"
                     autoCapitalize="none"
                     error={erroMail}
                     title="digite seu email"
                     erroMessage={messageErr}
                     label="E-mail"
                     onChangeText={h => setEmail(h)}
                  />
                  <Input
                     onChangeText={h => setSenha(h)}
                     title="digite sua senha"
                     erroMessage={messageErrSenha}
                     error={errSenha}
                  />
               </VStack>
            </Box>

            <Button onPress={handleSubmit} w="80%" size="lg">
               Entrar
            </Button>
         </Center>
      </Box>
   );
}
