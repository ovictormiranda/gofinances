import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { useAuth } from "../../hooks/auth";

import { SignInSocialButton } from "../../components/SignInSocialButton";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { googleSignIn, appleSignIn } = useAuth();
  const theme = useTheme();

  async function handleGoogleSignIn(){
    try {
      setIsLoading(true);
      return await googleSignIn();

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google.");
      setIsLoading(false);
    }
  }

  async function handleAppleSignIn(){
    try {
      setIsLoading(true);
      return await appleSignIn();

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple.");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>

        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />
          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples {'\n'}
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title= "Entrar com Google"
            svg={GoogleSvg}
            onPress={handleGoogleSignIn}
          />
          {
            Platform.OS === 'ios' &&
            <SignInSocialButton
              title= "Entrar com Apple"
              svg={AppleSvg}
              onPress={handleAppleSignIn}
            />
          }
        </FooterWrapper>

        { isLoading &&
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />}
      </Footer>
    </Container>
  );
}
