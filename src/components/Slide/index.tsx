import React from 'react';

import * as S from './styles';

export type SlideProps = {
  image: string;
};

export function Slide({ image }: SlideProps) {
  return (
    <S.Container activeOpacity={0.8}>
      <S.Image source={{ uri: image }} />
    </S.Container>
  );
}
