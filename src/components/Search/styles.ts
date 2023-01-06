import { RFValue } from 'react-native-responsive-fontsize';

import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: ${RFValue(11)}px ${RFValue(6)}px;
  border-radius: ${RFValue(16)}px;
  background: rgba(118, 118, 128, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const IconSearchWrapper = styled.View`
  padding: 0 ${RFValue(16)}px; ;
`;

export const Search = styled.TextInput`
  ${({ theme }) => css`
    flex: 1;
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(14)}px;
    color: ${theme.colors.textDetail};
  `}
`;

export const IconMicWrapper = styled.View`
  ${({ theme }) => css`
    padding: 0 ${RFValue(16)}px;
    border-left-width: 1px;
    border-left-color: ${theme.colors.textDetail};
  `}
`;
