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
  padding: 0 ${RFValue(24)}px;
`;

export const Header = styled.View`
  height: 40px;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(40)}px;
`;

export const WrapperButton = styled(RectButton)`
  position: absolute;
  background: rgba(118, 118, 128, 0.2);
  padding: 6px;
  border-radius: 5px;
`;

export const Center = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const TitleSeason = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primarySemiBold};
    font-size: ${RFValue(16)}px;
    color: ${theme.colors.text};
    text-align: center;
  `}
`;

export const WrapperEpisodes = styled.View`
  margin-top: ${RFValue(32)}px;
  gap: ${RFValue(24)}px;
  padding-bottom: ${RFValue(48)}px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(16)}px;
    color: ${theme.colors.text};
  `}
`;

export const WrapperEpisodeInfo = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  gap: ${RFValue(10)}px;
`;

export const Image = styled.Image`
  width: 45%;
  border-radius: 5px;
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryLight};
    font-size: ${RFValue(12)}px;
    color: ${theme.colors.text};
    flex: 1;
    flex-wrap: wrap;
  `}
`;
