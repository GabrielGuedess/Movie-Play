import { RFValue } from 'react-native-responsive-fontsize';

import { LinearGradient } from 'expo-linear-gradient';

import styled, { css } from 'styled-components/native';

export const Container = styled(LinearGradient)`
  position: relative;
  height: 100%;
  padding: 0 ${RFValue(24)}px;
`;

export const WrapperSearch = styled.View`
  margin-top: ${RFValue(60)}px;
`;

export const SlideWrapper = styled.View`
  width: 100%;
  margin-top: ${RFValue(20)}px;
`;

export const WrapperLoading = styled.View`
  min-height: ${RFValue(220)}px;
  justify-content: center;
  align-items: center;
`;

export const TitleSlider = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(16)}px;
    color: ${theme.colors.text};
    margin-bottom: ${RFValue(10)}px;
  `}
`;
