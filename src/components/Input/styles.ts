import { RFValue } from 'react-native-responsive-fontsize';

import { rgba } from 'polished';

import styled, { css } from 'styled-components/native';

type ContainerProps = {
  isInvalid: boolean;
};

type InputProps = {
  disabled: boolean;
};

export const Container = styled.View<ContainerProps>`
  ${({ theme, isInvalid }) => css`
    width: 100%;
    position: relative;
    flex-direction: row;
    align-items: center;
    padding: 0 ${RFValue(6)}px;
    border-radius: ${RFValue(6)}px;
    background: rgba(118, 118, 128, 0.12);
    border: 1px solid
      ${isInvalid ? theme.colors.error : 'rgba(255, 255, 255, 0.2)'};
  `}
`;

export const IconSearchWrapper = styled.View`
  margin-left: ${RFValue(12)}px;
`;

export const Input = styled.TextInput<InputProps>`
  ${({ theme, disabled }) => css`
    flex: 1;
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(14)}px;
    color: ${disabled
      ? rgba(theme.colors.textDetail, 0.5)
      : theme.colors.textDetail};
    padding: ${RFValue(11)}px ${RFValue(12)}px;
  `}
`;

export const Error = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.primaryLight};
    font-size: ${RFValue(10)}px;
    color: ${theme.colors.error};
    margin-top: ${RFValue(5)}px;
  `}
`;
