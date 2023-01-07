import { Dimensions, TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  width: ${Dimensions.get('window').width * 0.6}px;
  height: 310px;
  border-radius: ${(Dimensions.get('window').width * 0.6) / 8}px;
  z-index: 10;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${(Dimensions.get('window').width * 0.6) / 8}px;
`;
