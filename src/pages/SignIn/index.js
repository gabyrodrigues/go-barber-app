import React, { useRef, useState } from 'react'; //ref é para a acessibilidade
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from './../../assets/logo.png';

import Background from './../../components/Background';
import { signInRequest } from '../../store/modules/auth/actions';

import { Container, Form, FormInput, 
         SubmitButton, SignLink, SignLinkText 
        } from './styles';

export default function SignIn({ navigation }) {
    const dispatch = useDispatch();
    const passwordRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loading = useSelector(state => state.auth.loading);

    function handleSubmit() {
        dispatch(signInRequest(email, password));
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput 
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu email"
                        returnKeyType="next" //quando abre o teclado a tecla de enviar muda pro icone/texto de next
                        onSubmitEditing={() => passwordRef.current.focus() }
                        value={email}
                        onChangeText={setEmail}
                    />

                    <FormInput 
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua senha secreta"
                        autoCapitalize="none"
                        ref={passwordRef}
                        returnKeyType="send" //quando clicar no botão de "enter" ele envia (já que ele é o último input)
                        onSubmitEditing={handleSubmit}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <SubmitButton loading={loading} onPress={handleSubmit}>Acessar</SubmitButton>
                </Form>

                <SignLink onPress={ () => navigation.navigate('SignUp') }>
                    <SignLinkText>Criar conta gratuita</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}