/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from 'react';
import { Alert, Platform } from 'react-native';
import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';

import { format } from 'date-fns';
import { IUser, IReqEpi, IReqFerramenta } from '../dtos';
import { colecao } from '../colecao';

export interface User {
   id: string;
   nome: string;
   adm: boolean;
   padrinhQuantity: number;
}

interface SignInCred {
   email: string;
   senha: string;
}

interface AuthContexData {
   user: IUser | null;
   loading: boolean;
   signIn(credential: SignInCred): Promise<void>;
   signOut(): void;
   updateUser(user: IUser): Promise<void>;
}

const User_Collection = '@Req:almoxerife';

export const AuthContext = createContext<AuthContexData>({} as AuthContexData);

export const AuthProvider: React.FC = ({ children }) => {
   const { USER, REQEPI, REQFERRAMENTA, ALMOXERIFE } = colecao;

   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState<IUser | null>(null);

   const LoadingUser = useCallback(async () => {
      setLoading(true);

      const storeUser = await AsyncStorage.getItem(User_Collection);

      if (storeUser) {
         const userData = JSON.parse(storeUser) as IUser;
         setUser(userData);
      }

      setLoading(false);
   }, []);

   useEffect(() => {
      LoadingUser();
   }, [LoadingUser]);

   const signIn = useCallback(
      async ({ email, senha }) => {
         await Auth()
            .signInWithEmailAndPassword(email, senha)
            .then(au => {
               Firestore()
                  .collection(ALMOXERIFE)
                  .doc(au.user.uid)
                  .get()
                  .then(async profile => {
                     const { nome, token, matricula, city } =
                        profile.data() as IUser;

                     if (profile.exists) {
                        const userData = {
                           email: au.user.email,
                           id: au.user.uid,
                           nome,
                           matricula,
                           token,
                           city,
                        };
                        await AsyncStorage.setItem(
                           User_Collection,
                           JSON.stringify(userData),
                        );
                        setUser(userData);
                     }
                  })
                  .catch(err => {
                     const { code } = err;
                     Alert.alert(
                        'Login',
                        'Não foi possível carregar os dados do usuário',
                     );
                  });
            })
            .catch(h => console.log(h.code));
      },
      [ALMOXERIFE],
   );

   //* ORDERS.................................................................

   //* .......................................................................

   useEffect(() => {
      setLoading(true);
   }, []);

   const signOut = useCallback(async () => {
      await AsyncStorage.removeItem(User_Collection);

      setUser(null);
   }, []);

   const updateUser = useCallback(async (user: IUser) => {
      await AsyncStorage.setItem(User_Collection, JSON.stringify(user));

      setUser(user);
   }, []);

   return (
      <AuthContext.Provider
         value={{
            user,
            loading,
            signIn,
            signOut,
            updateUser,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export function useAuth(): AuthContexData {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error('useAuth must be used with ..');
   }

   return context;
}
