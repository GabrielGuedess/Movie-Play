import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';

import styled, { css } from 'styled-components/native';

export const Container = styled(LinearGradient)`
  position: relative;
  height: 100%;
`;

export const WrapperContent = styled(SafeAreaView)`
  gap: ${RFValue(32)}px;
  padding: ${RFValue(24)}px;
`;

export const WrapperUserPhoto = styled.View`
  width: 100%;
  align-items: center;
`;

export const WrapperPhoto = styled.View`
  position: relative;
`;

export const UserPhotoBorder = styled.View`
  width: ${RFValue(150)}px;
  height: ${RFValue(150)}px;
  border-radius: ${RFValue(150)}px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
`;

export const UserPhoto = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ButtonPhoto = styled(RectButton)`
  position: absolute;
  bottom: -${RFValue(5)}px;
  right: -${RFValue(5)}px;
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;
  border-radius: ${RFValue(50)}px;
  background: rgba(118, 118, 128, 0.4);
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.textDetail};
    margin-bottom: ${RFValue(10)}px;
  `}
`;

export const WrapperInputs = styled.View`
  width: 100%;
  gap: ${RFValue(16)}px;
`;
