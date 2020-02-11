import React, { useEffect, useState } from 'react';

import { Container, Title, List } from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import Background from '../../components/Background';
import Appointment from '../../components/Appointment';

export default function Dashboard() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        async function loadAppointments() {
            const response = await api.get('appointments'); //busca de agendamentos na api

            setAppointments(response.data);
        }

        loadAppointments();
    }, []);

    async function handleCancel(id) {
        const response = await api.delete(`appointments/${id}`);

        //busca o agendamento deletado (marcado como cancelado) e seta a propriedade canceled_at dentro dele pra sumir da listagen de agendamentos
        setAppointments(
            appointments.map(appointment =>
                //se o id for igual ao id do cancelamento, então ele
                //retorna todos os dados de dentro desse appointment
                //e também atualiza o canceled_at
                appointment.id === id
                ? {
                    ...appointment,
                    canceled_at: response.data.canceled_at
                }
                : appointment
            )
        )
    }

    return (
        <Background>
            <Container>
                <Title>Agendamentos</Title>
                <List 
                 data={appointments}
                 keyExtractor={item => String(item.id)}
                 renderItem={({ item }) => (
                    <Appointment 
                     onCancel={() => handleCancel(item.id)}
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