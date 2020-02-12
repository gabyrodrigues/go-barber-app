import React, { useState, useMemo } from 'react';
import { DatePickerIOS } from 'react-native'; //disponivel apenas IOS
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {
    const [opened, setOpened] = useState(false); //se vai mostrar o input de data ou não (através do botão DateButton), ele já inicia fechado

    const dateFormatted = useMemo(
        () => format(date, "dd 'de' MMM 'de' yyyy",  { locale: pt }), 
        [date]
    ); //sempre que a data for alterada, ela vai retornar formatada (format())

    return (
        <Container>
            <DateButton onPress={() => setOpened(!opened)}>
                <Icon name="event" size={20} color="#fff" />
                <DateText>{dateFormatted}</DateText>
            </DateButton>

            {opened && (
                <Picker>
                    <DatePickerIOS 
                        date={date}
                        onDateChange={onChange}
                        minimumDate={new Date()} //não é possível selecionar uma data inferior à data atual
                        minuteInterval={60}
                        locale="pt"
                        mode="date"
                    />
                </Picker>
            )}
        </Container>
    );
}