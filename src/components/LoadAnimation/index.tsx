import LottieView from 'lottie-react-native';

import loadingMovie from 'assets/movie.json';

import * as S from './styles';

export function LoadAnimation() {
  return (
    <S.Container>
      <LottieView
        source={loadingMovie}
        autoPlay
        style={{ height: 200 }}
        resizeMode="contain"
        loop
      />
    </S.Container>
  );
}
