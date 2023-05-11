import { RFValue } from 'react-native-responsive-fontsize';

import { rgba } from 'polished';

import styled, { css } from 'styled-components/native';

type TextProps = {
  disabled: boolean;
};

export const Container = styled.TouchableOpacity`
  width: 100%;
  position: relative;
  flex-direction: row;
  align-items: center;
  padding: 0 ${RFValue(6)}px;
  border-radius: ${RFValue(6)}px;
  background: rgba(118, 118, 128, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Text = styled.Text<TextProps>`
  ${({ theme, disabled }) => css`
    flex: 1;
    font-family: ${theme.fonts.primaryMedium};
    font-size: ${RFValue(14)}px;
    text-align: center;
    color: ${disabled
      ? rgba(theme.colors.textDetail, 0.5)
      : theme.colors.textDetail};
    padding: ${RFValue(11)}px ${RFValue(12)}px;
  `}
`;

export const WrapperIcon = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(13)}px;
`;
