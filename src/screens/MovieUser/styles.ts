import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';

import styled, { css } from 'styled-components/native';

export const Container = styled(LinearGradient)`
  flex: 1;
`;

export const WrapperContent = styled(SafeAreaView)`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primarySemiBold};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.text};
    text-align: center;
    margin-top: ${RFValue(20)}px;
  `}
`;
