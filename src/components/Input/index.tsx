import { TextInputProps } from 'react-native';
import { View } from 'react-native';

import { useTheme } from 'styled-components/native';

import * as S from './styles';

type InputProps = {
  icon?: React.ReactNode;
  disabled?: boolean;
  isInvalid?: boolean;
  messageError?: string;
} & TextInputProps;

export function Input({
  icon,
  messageError,
  disabled = false,
  isInvalid = false,
  ...props
}: InputProps) {
  const { colors } = useTheme();

  return (
    <View>
      <S.Container isInvalid={isInvalid}>
        {!!icon && <S.IconSearchWrapper>{icon}</S.IconSearchWrapper>}

        <S.Input
          selectionColor="rgba(118, 118, 128, 0.4)"
          disabled={disabled}
          editable={!disabled}
          selectTextOnFocus={!disabled}
          placeholderTextColor={colors.textDetail}
          {...props}
        />
      </S.Container>

      {!!messageError && <S.Error>{messageError}</S.Error>}
    </View>
  );
}
