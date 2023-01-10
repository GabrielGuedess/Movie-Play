import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import { LinearGradient } from 'expo-linear-gradient';

import { rgba } from 'polished';

import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    position: relative;
    background: ${theme.colors.background};
  `}
`;

export const Header = styled.View`
  position: absolute;
  width: 100%;
  top: ${getStatusBarHeight() + RFValue(30)}px;
  left: 0;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${RFValue(24)}px;
  z-index: 10;
`;

export const WrapperBackButton = styled(RectButton)`
  ${({ theme }) => css`
    background: ${rgba(theme.colors.text, 0.2)};
    padding: 6px;
    border-radius: 5px;
  `}
`;

export const WrapperBackLike = styled(RectButton)`
  ${({ theme }) => css`
    position: relative;
    min-width: 36px;
    min-height: 36px;
    background: ${rgba(theme.colors.text, 0.3)};
    padding: 6px;
    border-radius: 5px;
  `}
`;

export const WrapperButton = styled.View`
  position: absolute;
  width: 100%;
  justify-content: center;
  align-items: center;
  bottom: ${RFValue(30)}px;
`;

export const ButtonTrailer = styled(RectButton)`
  ${({ theme }) => css`
    width: ${RFValue(53)}px;
    height: ${RFValue(53)}px;
    border-radius: ${RFValue(26.5)}px;
    background: ${theme.colors.main};
    justify-content: center;
    align-items: center;
    z-index: 20;
  `}
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Blur = styled(LinearGradient)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
`;

export const BlurTop = styled(LinearGradient)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 40%;
`;

export const Info = styled.View`
  width: 100%;
  align-items: center;
  padding: 0 ${RFValue(24)}px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primarySemiBold};
    font-size: ${RFValue(22)}px;
    color: ${theme.colors.text};
  `}
`;

export const Details = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(12)}px;
    color: ${theme.colors.textDetail};
  `}
`;

export const WrapperStars = styled.Text`
  margin-top: ${RFValue(24)}px;
  flex-direction: row;
`;

export const WrapperPlot = styled.View`
  width: 100%;
  margin-top: ${RFValue(24)}px;
`;

export const TitleSecondary = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(24)}px;
    color: ${theme.colors.text};
    margin-bottom: ${RFValue(8)}px;
  `}
`;

export const Plot = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.textDetail};
    text-align: justify;
  `}
`;

export const TitleSlider = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(24)}px;
    color: ${theme.colors.text};
    margin-bottom: ${RFValue(26)}px;
    margin-left: ${RFValue(24)}px;
  `}
`;

export const SlideWrapper = styled.View`
  width: 100%;
  margin-top: ${RFValue(36)}px;
`;

export const VideoModal = styled.View`
  ${({ theme }) => css`
    flex: 1;
    justify-content: center;
    background: ${theme.colors.background};
  `}
`;
