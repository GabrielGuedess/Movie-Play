import React from 'react';

import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

export type SlideProps = {
  image: string;
} & TouchableOpacityProps;

export function Slide({ image, ...props }: SlideProps) {
  return (
    <S.Container activeOpacity={0.8} {...props}>
      <S.Image source={{ uri: image }} />
    </S.Container>
  );
}
