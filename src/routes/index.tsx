import React from 'react';
import { useAuth } from '../hooks/AuthContext';
import { App } from './App';
import { AuthApp } from './AuthApp';

export function Routes() {
   const { user } = useAuth();

   return user ? <AuthApp /> : <App />;
}
