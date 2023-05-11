import { useCallback, useMemo, useRef, useState } from 'react';

import { ScrollView } from 'react-native';

import { useRoute } from '@react-navigation/native';

import BottomSheet from '@gorhom/bottom-sheet';
import { ArrowLeft, ArrowRight } from 'phosphor-react-native';
import { useQuery } from 'react-query';

import { RootRouteProps } from 'routes';

import { LoadAnimation } from 'components/LoadAnimation';

import { useTheme } from 'styled-components/native';

import { tmdb } from 'services/api';

import { EpisodesDTO } from 'dtos/EpisodesDTO';

import * as S from './styles';

type FetchEpisodes = {
  id: number;
  season: number;
};

const fetchEpisodes = async ({ id, season }: FetchEpisodes) => {
  const { data } = await tmdb.get<EpisodesDTO>(
    `/tv/${id}/season/${season}?api_key=0b8d03de32e4889351d128d59380611b&language=pt-BR`,
  );

  return data;
};

export const SerieSeason = () => {
  const { params } = useRoute<RootRouteProps<'SerieSeason'>>();

  const [selectedSeason, setSelectedSeason] = useState(params.season);
  const [selectedEpisode, setSelectedEpisode] = useState(0);

  const { colors } = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['3%', '60%'], []);

  const handleSheetChanges = useCallback(() => ({}), []);

  const handleClosePress = () => bottomSheetRef.current!.snapToIndex(0);

  const handleOpenPress = ({ index }: { index: number }) => {
    setSelectedEpisode(index);
    bottomSheetRef.current!.expand();
  };

  const { data, isLoading, isFetching } = useQuery<EpisodesDTO>(
    ['episodes', selectedSeason],
    () => fetchEpisodes({ id: params.id, season: selectedSeason }),
  );

  return (
    <S.Container
      colors={[colors.backgroundGradient, colors.background, colors.background]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <S.WrapperContent>
          <S.Header>
            {selectedSeason !== 1 && (
              <S.WrapperButton
                style={{ left: 0 }}
                onPress={() => {
                  handleClosePress();
                  setSelectedSeason(state => state - 1);
                }}
              >
                <ArrowLeft size={24} color={colors.text} />
              </S.WrapperButton>
            )}

            <S.Center>
              <S.TitleSeason>Temporada {selectedSeason}</S.TitleSeason>
            </S.Center>

            {selectedSeason !== params.seasons && (
              <S.WrapperButton
                style={{ right: 0 }}
                onPress={() => {
                  handleClosePress();
                  setSelectedSeason(state => state + 1);
                }}
              >
                <ArrowRight size={24} color={colors.text} />
              </S.WrapperButton>
            )}
          </S.Header>

          <S.WrapperEpisodes>
            <S.Title>Episódios</S.Title>

            {isLoading || isFetching ? (
              <LoadAnimation />
            ) : (
              data!.episodes
                .flat()
                .sort((a, b) => (a.episode_number > b.episode_number ? 1 : -1))
                .map((episode, index) => (
                  <S.WrapperEpisodeInfo
                    key={episode.id}
                    activeOpacity={0.7}
                    onLongPress={() => handleOpenPress({ index })}
                  >
                    <S.Image
                      style={{ aspectRatio: '16/9' }}
                      source={{
                        uri: `https://www.themoviedb.org/t/p/original${episode.still_path}`,
                      }}
                    />

                    <S.Name>{episode.name}</S.Name>
                  </S.WrapperEpisodeInfo>
                ))
            )}
          </S.WrapperEpisodes>
        </S.WrapperContent>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: colors.background }}
        handleStyle={{ backgroundColor: colors.backgroundGradient }}
        handleIndicatorStyle={{ backgroundColor: colors.textDetail }}
      >
        {isLoading || isFetching ? (
          <LoadAnimation />
        ) : (
          <>
            <S.TitleSeason>Episode {selectedEpisode + 1}</S.TitleSeason>
            <S.Image
              style={{ aspectRatio: '16/9' }}
              source={{
                uri: `https://www.themoviedb.org/t/p/original${
                  data!.episodes[selectedEpisode].still_path
                }`,
              }}
            />
          </>
        )}
      </BottomSheet>
    </S.Container>
  );
};
