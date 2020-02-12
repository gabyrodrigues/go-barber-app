import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../../components/Background';
import DateInput from '../../../components/DateInput';

import { Container, HourList, Hour, Title } from './styles';

import api from '../../../services/api'; //a api é necessária para buscar os horários disponíveis para aquela data

export default function SelectDateTime({ navigation }) {
    const [date, setDate] = useState(new Date()); //pega a data atual para mostrar dentro do DateInput

    const [hours, setHours] = useState([]);

    const provider = navigation.getParam('provider'); //pega os dados do provider enviados pelo parametro na seleção de provider

    useEffect(() =>  {
        async function loadAvailable() {
            //retorna todos os horários daquele prestador naquela data (os disponíveis terão uma flag a mais (available))
            const response = await api.get(`providers/${provider.id}/available`, {
                params: {
                    date: date.getTime()
                }
            }); 

            setHours(response.data);
        }

        loadAvailable();
    }, [date, provider.id]); //como o date é a dependencia, toda vez que a data for alterada, o useEffect() é executado
    
    function handleSelectHour(time) {
        navigation.navigate('Confirm', { //aqui ele envia os dados como parametro para a proxima tela (confirmação)
            provider,
            time
        });
    }

    return (
        <Background>
            <Container>
                <DateInput date={date} onChange={setDate} />

                <HourList 
                 data={hours}
                 keyExtractor={item => item.time}
                 renderItem={({ item }) => (
                     <Hour onPress={() => handleSelectHour(item.value)} enabled={item.available}>
                         <Title>{item.time}</Title>
                     </Hour>
                 )}
                />
            </Container>
        </Background>
    );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
    title: 'Selecione o horário',
    headerLeft: () => (
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <Icon name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>
    )
});