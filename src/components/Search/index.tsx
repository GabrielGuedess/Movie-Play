import React from 'react';

import { MagnifyingGlass } from 'phosphor-react-native';

import { useTheme } from 'styled-components';

import Mic from 'assets/mic.svg';

import * as S from './styles';

export function Search() {
  const { colors } = useTheme();

  return (
    <S.Container>
      <S.IconSearchWrapper>
        <MagnifyingGlass size={24} color={colors.text} weight="bold" />
      </S.IconSearchWrapper>

      <S.Search />

      <S.IconMicWrapper>
        <Mic width={24} height={24} />
      </S.IconMicWrapper>
    </S.Container>
  );
}
