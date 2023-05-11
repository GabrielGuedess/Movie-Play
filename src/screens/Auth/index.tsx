import React from 'react';

import { StatusBar } from 'expo-status-bar';

import Logo from 'assets/svg/logo.svg';

import * as S from './styles';

export function Auth() {
  return (
    <>
      <S.Container>
        <StatusBar backgroundColor="transparent" style="light" />

        <S.ImageBackground source={require('../../assets/img/cinema.jpg')} />

        <S.WrapperContent>
          <S.WrapperLogo>
            <Logo width={163} height={57} />
          </S.WrapperLogo>
        </S.WrapperContent>
      </S.Container>
    </>
  );
}
