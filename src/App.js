import React from 'react';
//com o app nesse arquivo, é possível acessar informações do redux
//para saber se o usuário está ou não logado, para saber qual rota será mostrada (login ou dashboard)
//no index.js não era possivel por causa do Provider

import { useSelector } from 'react-redux'; //para buscar a informação se o usuário está logado ou não

import createRouter from './routes';

export default function App() {
    const signed = useSelector(state => state.auth.signed);

    const Routes = createRouter(signed); //true ou false se o usuário estiver logado ou não

    return <Routes />;
}