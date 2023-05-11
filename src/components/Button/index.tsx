import { useEffect } from 'react';

import { Animated, Easing, TouchableOpacityProps } from 'react-native';

import { CircleNotch } from 'phosphor-react-native';

import { useTheme } from 'styled-components/native';

import * as S from './styles';

type ButtonComponentProps = {
  title: string;
  disabled?: boolean;
  isLoading?: boolean;
} & TouchableOpacityProps;

export function Button({
  title,
  disabled = false,
  isLoading = false,
  ...props
}: ButtonComponentProps) {
  const { colors } = useTheme();

  const spinValue = new Animated.Value(0);

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 600,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  useEffect(() => {
    spin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <S.Container disabled={disabled} activeOpacity={0.8} {...props}>
      {isLoading ? (
        <S.WrapperIcon>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <CircleNotch size={22} color={colors.textDetail} />
          </Animated.View>
        </S.WrapperIcon>
      ) : (
        <S.Text disabled={disabled}>{title}</S.Text>
      )}
    </S.Container>
  );
}
