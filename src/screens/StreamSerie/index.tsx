import { useEffect, useRef, useState } from 'react';

import { Animated, Dimensions, Easing, ScrollView } from 'react-native';

import { CastButton } from 'react-native-google-cast';
import Toast from 'react-native-toast-message';

import { useNavigation, useRoute } from '@react-navigation/native';

import { ResizeMode, Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';

import { ArrowLeft, CircleNotch } from 'phosphor-react-native';

import { RootRouteProps } from 'routes';

import { LoadAnimation } from 'components/LoadAnimation';

import { useTheme } from 'styled-components/native';

import { api } from 'services/api';

import { SerieApiDTO } from 'dtos/SerieApiDTO';
import { StreamSerieDTO } from 'dtos/StreamSerieDTO';

import * as S from './styles';

type RequestProps = Omit<StreamSerieDTO, 'backdrop_path'>;

export function StreamSerie() {
  const [serie, setSerie] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const video = useRef<Video>(null);

  const spinValue = new Animated.Value(0);

  const { params } = useRoute<RootRouteProps<'StreamSerie'>>();
  const { goBack } = useNavigation();
  const { colors } = useTheme();

  function setOrientation() {
    if (Dimensions.get('window').height > Dimensions.get('window').width) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

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
  }, [isLoading, isVideoLoading]);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const { data } = await api.post<
          SerieApiDTO,
          { data: SerieApiDTO },
          RequestProps
        >('/series', {
          name: params.name,
          tmdbId: params.tmdbId,
          episodeNumber: params.episodeNumber,
          seasonNumber: params.seasonNumber,
        });

        setSerie(data.serie.season.episode.url);
      } catch (error) {
        Toast.show({
          text1: 'Série',
          text2: 'Série não encontrado!',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [params.episodeNumber, params.name, params.tmdbId, params.seasonNumber]);

  return (
    <S.Wrapper>
      <StatusBar backgroundColor="transparent" style="light" />

      {isLoading ? (
        <LoadAnimation />
      ) : (
        <>
          <S.Header>
            <S.WrapperBackButton onPress={() => goBack()}>
              <ArrowLeft size={24} color={colors.text} />
            </S.WrapperBackButton>

            <S.ChromeCast>
              <CastButton
                style={{ width: 24, height: 24, tintColor: 'white' }}
              />
            </S.ChromeCast>
          </S.Header>

          <ScrollView
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            showsVerticalScrollIndicator={false}
          >
            <S.VideoWrapper>
              {isVideoLoading && (
                <>
                  <S.WrapperIcon>
                    <Animated.View style={{ transform: [{ rotate }] }}>
                      <CircleNotch size={40} color={colors.error} />
                    </Animated.View>
                  </S.WrapperIcon>
                </>
              )}

              <S.VideoStream
                ref={video}
                source={{
                  uri: serie,
                }}
                usePoster
                isLooping
                shouldPlay
                useNativeControls
                style={{ aspectRatio: '16/9' }}
                resizeMode={ResizeMode.CONTAIN}
                onFullscreenUpdate={setOrientation}
                onError={() => {
                  setIsVideoLoading(false);

                  Toast.show({
                    text1: 'Série',
                    text2: 'Série não encontrado!',
                    type: 'error',
                  });
                }}
                onReadyForDisplay={() => setIsVideoLoading(false)}
                posterSource={{
                  uri: `https://www.themoviedb.org/t/p/original${params.backdrop_path}`,
                }}
                onLoadStart={() => {
                  video?.current?.presentFullscreenPlayer().then(() => {
                    ScreenOrientation.lockAsync(
                      ScreenOrientation.OrientationLock.LANDSCAPE,
                    );
                  });
                }}
              />
            </S.VideoWrapper>

            {isVideoLoading && (
              <S.LoadingMessage>Carregando Player</S.LoadingMessage>
            )}
          </ScrollView>
        </>
      )}
    </S.Wrapper>
  );
}
