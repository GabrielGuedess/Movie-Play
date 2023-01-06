import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: ${RFValue(72)}px;
  align-items: center;
  margin-right: 10px;
`;

export const BoxWrapper = styled(RectButton)`
  ${({ theme }) => css`
    width: ${RFValue(52)}px;
    height: ${RFValue(52)}px;
    background: ${theme.colors.box};
    border-radius: ${RFValue(16)}px;
    justify-content: center;
    align-items: center;
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(12)}px;
    color: ${theme.colors.textDetail};
    text-transform: capitalize;
    margin-top: 5px;
  `}
`;
