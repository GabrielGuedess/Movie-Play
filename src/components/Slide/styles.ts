import { Dimensions } from 'react-native';

import styled, { css } from 'styled-components/native';

type ContainerProps = {
  size: 'normal' | 'small';
};

const modifiersContainer = {
  normal: () => css`
    width: ${Dimensions.get('window').width * 0.6}px;
  `,
  small: () => css`
    width: ${Dimensions.get('window').width * 0.55}px;
  `,
  xsmall: () => css`
    width: ${Dimensions.get('window').width * 0.4}px;
  `,
};

export const Container = styled.TouchableOpacity<ContainerProps>`
  ${({ size }) => css`
    border-radius: ${(Dimensions.get('window').width * 0.6) / 8}px;
    z-index: 10;

    ${modifiersContainer[size]}
  `}
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${(Dimensions.get('window').width * 0.6) / 8}px;
`;
