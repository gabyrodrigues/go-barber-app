import React, { useMemo } from 'react';

import { DatePickerAndroid } from 'react-native'; //disponivel apenas android
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {

    const dateFormatted = useMemo(
        () => format(date, "dd 'de' MMM 'de' yyyy",  { locale: pt }), 
        [date] //sempre que a data for alterada, ela vai retornar formatada (format())
    ); 

    async function handleOpenPicker() {
        const { action, year, month, day } = await DatePickerAndroid.open({
            mode: 'spinner',
            date,
        });

        if(action === DatePickerAndroid.dateSetAction) { //quando o usuário selecionar uma data
            const selectedDate = new Date(year, month, day); //ele cria um novo objeto de data com a data selecionada

            onChange(selectedDate);
        }
    }

    return (
        <Container>
            <DateButton onPress={handleOpenPicker}>
                <Icon name="event" size={20} color="#fff" />
                <DateText>{dateFormatted}</DateText>
            </DateButton>
        </Container>
    );
}