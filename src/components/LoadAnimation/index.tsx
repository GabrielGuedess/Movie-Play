import LottieView from 'lottie-react-native';

import loadingMovie from 'assets/lottie/loading.json';

import * as S from './styles';

type LoadAnimationProps = {
  size?: 'normal' | 'small';
};

export function LoadAnimation({ size = 'normal' }: LoadAnimationProps) {
  return (
    <S.Container>
      <LottieView
        source={loadingMovie}
        autoPlay
        style={{ height: size === 'normal' ? 200 : 60 }}
        resizeMode="contain"
        loop
      />
    </S.Container>
  );
}
