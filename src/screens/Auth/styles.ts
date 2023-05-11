import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const WrapperContent = styled(SafeAreaView)`
  align-items: center;
  margin-top: ${RFPercentage(10)}px;
`;

export const WrapperLogo = styled.View`
  gap: ${RFValue(10)}px;
`;

export const SubTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryLight};
    font-size: ${RFValue(12)}px;
    color: ${theme.colors.textDetail};
  `}
`;

export const ImageBackground = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;
