import { ScrollView } from 'react-native';

import { useTheme } from 'styled-components/native';

import * as S from './styles';

export const MovieUser = () => {
  const { colors } = useTheme();

  return (
    <S.Container
      colors={[colors.backgroundGradient, colors.background, colors.background]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <S.WrapperContent>
          <S.Title>Em Desenvolvimento</S.Title>
        </S.WrapperContent>
      </ScrollView>
    </S.Container>
  );
};
