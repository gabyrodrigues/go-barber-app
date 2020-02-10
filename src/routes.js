import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

export default (isSigned = false) => 
    createAppContainer(
        createSwitchNavigator(
            { //troca de telas sem efeitos visuais
                Sign: createSwitchNavigator({
                    SignIn,
                    SignUp
                }),
                App: createBottomTabNavigator({
                    Dashboard,
                    Profile
                }, {
                    tabBarOptions: {
                        keyboardHidesTabBar: true,
                        activeTintColor: '#fff',
                        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
                        style: {
                            backgroundColor: '#8d41a8'
                        }
                    }
                })
            }, 
            {
                initialRouteName: isSigned ? 'App' : 'Sign'
                //se ele tiver logado, ele renderiza o agrupamento de rotas de App, se não ele renderiza primeiramente o agrupamento Sign
            }
        )
    );
