import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
//useDispatch responsável por atualizar as informações de cadastro //useSelector busca os dados já preenchidos 

import { Container, Title, Form,
         FormInput, Separator, SubmitButton    
        } from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/Background';
import { updateProfileRequest } from '../../store/modules/user/actions';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    const emailRef = useRef();
    const oldPasswordRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    }, [profile]); /*sempre que a variável profile for atualizada (dados alterados), 
    a função useEffect é executada (campos de senha são despeenchhidos) */

    function handleSubmit() {
        dispatch(updateProfileRequest({
            name,
            email,
            oldPassword,
            password,
            confirmPassword
        }))
    }

    return(
        <Background>
            <Container>
                <Title>Meu perfil</Title>
                <Form>
                    <FormInput
                     icon="person-outline"
                     autoCorrect={false}
                     autoCapitalize="none"
                     placeholder="Digite seu nome"
                     returnKeyType="next" //quando abre o teclado a tecla de enviar muda pro icone/texto de next
                     onSubmitEditing={() => emailRef.current.focus() }
                     value={name}
                     onChangeText={setName}
                    />

                    <FormInput 
                     icon="mail-outline"
                     keyboardType="email-address"
                     autoCorrect={false}
                     autoCapitalize="none"
                     placeholder="Digite seu email"
                     returnKeyType="next" //quando abre o teclado a tecla de enviar muda pro icone/texto de next
                     onSubmitEditing={() => oldPasswordRef.current.focus() }
                     ref={emailRef}
                     value={email}
                     onChangeText={setEmail}
                    />

                    <Separator />

                    <FormInput 
                     icon="lock-outline"
                     secureTextEntry
                     placeholder="Sua senha atual"
                     autoCapitalize="none"
                     ref={oldPasswordRef}
                     returnKeyType="next"
                     onSubmitEditing={() => passwordRef.current.focus() }
                     value={oldPassword}
                     onChangeText={setOldPassword}
                    />

                    <FormInput 
                     icon="lock-outline"
                     secureTextEntry
                     placeholder="Sua nova senha"
                     autoCapitalize="none"
                     ref={passwordRef}
                     returnKeyType="next"
                     onSubmitEditing={() => confirmPasswordRef.current.focus() }
                     value={password}
                     onChangeText={setPassword}
                    />

                    <FormInput 
                     icon="lock-outline"
                     secureTextEntry
                     placeholder="Confirmação de senha"
                     autoCapitalize="none"
                     ref={confirmPasswordRef}
                     returnKeyType="send" //quando clicar no botão de "enter" ele envia (já que ele é o último input)
                     onSubmitEditing={handleSubmit}
                     value={confirmPassword}
                     onChangeText={setConfirmPassword}
                    />

                    <SubmitButton onPress={handleSubmit}>Atualizar perfil</SubmitButton>
                </Form>
            </Container>
        </Background>
    );
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu Perfil',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="person" size={20} color={tintColor} />
    )
};