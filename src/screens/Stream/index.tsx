import { useEffect, useRef, useState } from 'react';

import { Dimensions } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { ResizeMode, Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';

import axios from 'axios';
import { toSlug } from 'helpers/slug';
import { ArrowLeft } from 'phosphor-react-native';

import { RootRouteProps } from 'routes';

import { LoadAnimation } from 'components/LoadAnimation';

import { useTheme } from 'styled-components/native';

import { api } from 'services/api';

import * as S from './styles';

export function Stream() {
  const [movie, setMovie] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const video = useRef<Video>(null);

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

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      try {
        const { data } = await api.post('/', {
          name: toSlug(params.title),
          tmdId: params.tmdId,
        });

        if (data.type === 'm3u8') {
          const movieLink = await axios({
            baseURL: data.url,
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

          setIsLoading(false);
          return setMovie(fileUri);
        }

        setMovie(data.url);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    }

    getData();
  }, [params.tmdId, params.title]);

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
          </S.Header>

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
        </>
      )}
    </S.Wrapper>
  );
}
