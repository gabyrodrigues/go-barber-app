import React, { useRef, useState } from 'react'; //useRef ajuda na acessibilidade
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from './../../assets/logo.png';

import Background from './../../components/Background';
import { signUpRequest } from '../../store/modules/auth/actions';

import { Container, Form, FormInput, 
         SubmitButton, SignLink, SignLinkText 
        } from './styles';

export default function SignUp({ navigation }) {
    const dispatch = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loading = useSelector(state => state.auth.loading);

    function handleSubmit () {
        dispatch(signUpRequest(name, email, password));
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />

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
                        onSubmitEditing={() => passwordRef.current.focus() }
                        ref={emailRef}
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

                    <SubmitButton loading={loading} onPress={handleSubmit}>Criar conta</SubmitButton>
                </Form>

                <SignLink onPress={ () => navigation.navigate('SignIn') }>
                    <SignLinkText>Já tenho conta</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}