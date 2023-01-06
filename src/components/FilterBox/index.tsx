import React from 'react';

import { Star, Globe, FilmSlate } from 'phosphor-react-native';

import { useTheme } from 'styled-components';

import Dash from 'assets/dash.svg';

import * as S from './styles';

export type FilterBoxProps = {
  title: 'Tops' | 'Language' | 'Watched' | 'Genre' | string;
};

export function FilterBox({ title }: FilterBoxProps) {
  const { colors } = useTheme();

  function getIcon() {
    switch (title) {
      case 'Tops':
        return <Star size={24} color={colors.text} weight="fill" />;
      case 'Language':
        return <Globe size={24} color={colors.text} />;
      case 'Watched':
        return <FilmSlate size={24} color={colors.text} />;
      case 'Genre':
        return <Dash width={24} height={24} fill={colors.text} />;
      default:
        return <Star size={24} color={colors.text} weight="fill" />;
    }
  }

  return (
    <S.Container>
      <S.BoxWrapper>{getIcon()}</S.BoxWrapper>

      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
