import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    position: relative;
    flex: 1;
    background: ${theme.colors.background};
  `}
`;

export const Header = styled.View`
  margin-top: ${getStatusBarHeight() + RFValue(20)}px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${RFValue(24)}px;
  padding-bottom: ${RFValue(10)}px;
`;

export const HeaderInfo = styled.View``;

export const HeaderTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(24)}px;
    color: ${theme.colors.text};
  `}
`;

export const HeaderDescription = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.textDetail};
  `}
`;

export const PhotoWrapper = styled.View`
  ${({ theme }) => css`
    width: ${RFValue(52)}px;
    height: ${RFValue(52)}px;
    background: ${theme.colors.main};
    border-radius: ${RFValue(26)}px;
  `}
`;

export const Photo = styled.Image`
  width: ${RFValue(52)}px;
  height: ${RFValue(52)}px;
  border-radius: ${RFValue(26)}px;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 25 },
})`
  width: 100%;
`;

export const SearchWrapper = styled.View`
  margin-top: ${RFValue(36)}px;
  padding: 0 ${RFValue(24)}px;
`;

export const FilterWrapper = styled.View`
  width: 100%;
  margin-top: ${RFValue(36)}px;
`;

export const FilterTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(18)}px;
    color: ${theme.colors.text};
    margin-bottom: ${RFValue(16)}px;
    margin-left: ${RFValue(24)}px;
  `}
`;

export const FilterCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 14 },
})`
  width: 100%;
`;

export const SlideWrapper = styled.View`
  width: 100%;
  margin-top: ${RFValue(36)}px;
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
