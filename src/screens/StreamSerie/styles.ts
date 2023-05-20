import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import { Video } from 'expo-av';

import { rgba } from 'polished';

import styled, { css } from 'styled-components/native';

export const Wrapper = styled.View`
  ${({ theme }) => css`
    flex: 1;
    justify-content: center;
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

export const VideoStream = styled(Video)`
  width: 100%;
`;
