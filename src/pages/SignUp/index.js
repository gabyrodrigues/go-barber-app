import React, { useRef } from 'react'; //useRef ajuda na acessibilidade
import { Image } from 'react-native';

import logo from './../../assets/logo.png';

import Background from './../../components/Background';

import { Container, Form, FormInput, 
         SubmitButton, SignLink, SignLinkText 
        } from './styles';

export default function SignUp({ navigation }) {
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit () {

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
                        placeholder="Nome completo"
                        returnKeyType="next" //quando abre o teclado a tecla de enviar muda pro icone/texto de next
                        onSubmitEditing ={() => emailRef.current.focus()}
                    />

                    <FormInput 
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu email"
                        ref={emailRef}
                        returnKeyType="next" 
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />

                    <FormInput 
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua senha secreta"
                        ref={passwordRef}
                        returnKeyType="send" //quando confirma no teclado já envia (sem precisar clicar no botão)
                        onSubmitEditing={handleSubmit}
                    />

                    <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
                </Form>

                <SignLink onPress={ () => navigation.navigate('SignIn') }>
                    <SignLinkText>Já tenho conta</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}