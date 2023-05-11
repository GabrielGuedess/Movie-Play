import React, { useState } from 'react';

import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

export type SlideProps = {
  image: string;
  isGallery?: boolean;
  size?: 'normal' | 'small' | 'xsmall';
  content?: string;
  as?: React.ElementType;
} & TouchableOpacityProps;

export function Slide({
  image,
  isGallery = false,
  size = 'normal',
  ...props
}: SlideProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.Container
      fullWidth={isOpen}
      activeOpacity={0.8}
      size={size}
      style={{ aspectRatio: '3/4.5' }}
      onPress={() => isGallery && setIsOpen(!isOpen)}
      {...props}
    >
      <S.Image source={{ uri: image }} />
    </S.Container>
  );
}
