import React from 'react';

import { Container, Title, List } from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/Background';
import Appointment from '../../components/Appointment';

const data = [1, 2, 3, 4, 5]; //listagem de agendamentos

export default function Dashboard() {
    return (
        <Background>
            <Container>
                <Title>Agendamentos</Title>
                <List 
                 data={data}
                 keyExtractor={item => String(item)}
                 renderItem={({ item }) => (
                    <Appointment 
                     data={item}
                    />
                 )}
                />
            </Container>
        </Background>
    );
}

Dashboard.navigationOptions = {
    tabBarLabel: 'Agendamentos',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="event" size={20} color={tintColor} />
    )
};