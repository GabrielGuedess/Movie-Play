import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type SearchItemProps = {
  image: string;
} & TouchableOpacityProps;

export const SearchItem = ({ image, ...props }: SearchItemProps) => (
  <S.Container {...props}>
    <S.Image source={{ uri: image }} style={{ aspectRatio: '3/4.5' }} />
  </S.Container>
);
