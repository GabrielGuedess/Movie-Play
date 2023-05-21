import React from 'react';

import { TextInputProps } from 'react-native';

import { MagnifyingGlass } from 'phosphor-react-native';

import { useTheme } from 'styled-components';

import Mic from 'assets/svg/mic.svg';

import * as S from './styles';

type SearchProps = {
  startVoice: boolean;
  handleStartVoice: () => void;
  handleStopVoice: () => void;
} & TextInputProps;

export function Search({
  startVoice = false,
  handleStartVoice,
  handleStopVoice,
  ...props
}: SearchProps) {
  const { colors } = useTheme();

  return (
    <S.Container>
      <S.IconSearchWrapper>
        <MagnifyingGlass size={24} color={colors.text} weight="bold" />
      </S.IconSearchWrapper>

      <S.Search {...props} />

      <S.IconMicWrapper
        onPress={startVoice ? handleStopVoice : handleStartVoice}
      >
        <Mic
          width={24}
          height={24}
          color={startVoice ? colors.main : colors.border}
        />
      </S.IconMicWrapper>
    </S.Container>
  );
}
