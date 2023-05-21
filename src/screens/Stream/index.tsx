import { useEffect, useRef, useState } from 'react';

import { Animated, Dimensions, Easing } from 'react-native';
import { ScrollView } from 'react-native';

import { CastButton } from 'react-native-google-cast';
import Toast from 'react-native-toast-message';

import { useNavigation, useRoute } from '@react-navigation/native';

import { ResizeMode, Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';

import axios from 'axios';
import { toSlug } from 'helpers/slug';
import { ArrowLeft, CircleNotch } from 'phosphor-react-native';

import { RootRouteProps } from 'routes';

import { LoadAnimation } from 'components/LoadAnimation';

import { useTheme } from 'styled-components/native';

import { api } from 'services/api';

import * as S from './styles';

export function Stream() {
  const [movie, setMovie] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const video = useRef<Video>(null);

  const spinValue = new Animated.Value(0);

  const { params } = useRoute<RootRouteProps<'Stream'>>();
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

        const { data } = await api.post('/movies', {
          name: toSlug(params.title),
          tmdbId: params.tmdbId,
        });

        if (data.type === 'm3u8') {
          const movieLink = await axios({
            baseURL: data.movie.url,
            headers: {
              accept: '*/*',
              Referer: 'https://playembeds.com',
            },
          });

          const fileUri =
            FileSystem.documentDirectory + `${encodeURI('movie')}.m3u8`;

          await FileSystem.writeAsStringAsync(fileUri, movieLink.data, {
            encoding: FileSystem.EncodingType.UTF8,
          });

          return setMovie(fileUri);
        }

        setMovie(data.movie.url);
      } catch (error) {
        Toast.show({
          text1: 'Filme',
          text2: 'Filme não encontrado!',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.tmdbId, params.title]);

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
                  uri: movie,
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
                    text1: 'Filme',
                    text2: 'Filme não encontrado!',
                    type: 'error',
                  });
                }}
                onReadyForDisplay={() => setIsVideoLoading(false)}
                posterSource={{
                  uri: `https://www.themoviedb.org/t/p/original${params.backdrop_path}`,
                }}
                onLoadStart={() => {
                  setIsVideoLoading(true);

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
