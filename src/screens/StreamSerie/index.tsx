import { useEffect, useRef, useState } from 'react';

import { Dimensions } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { ResizeMode, Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';

import { ArrowLeft } from 'phosphor-react-native';

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

  const video = useRef<Video>(null);

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
        console.error(error);
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
          </S.Header>

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
