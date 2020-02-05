import React, { useRef } from 'react'; //ref é para a acessibilidade
import { Image } from 'react-native';

import logo from './../../assets/logo.png';

import Background from './../../components/Background';

import { Container, Form, FormInput, 
         SubmitButton, SignLink, SignLinkText 
        } from './styles';

export default function SignIn({ navigation }) {
    const passwordRef = useRef();

    function handleSubmit() {

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
                    />

                    <FormInput 
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua senha secreta"
                        ref={passwordRef}
                        returnKeyType="send" //quando clicar no botão de "enter" ele envia (já que ele é o último input)
                        onSubmitEditing={handleSubmit}
                    />

                    <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
                </Form>

                <SignLink onPress={ () => navigation.navigate('SignUp') }>
                    <SignLinkText>Criar conta gratuita</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}