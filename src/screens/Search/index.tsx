import { useEffect, useState } from 'react';

import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';

import { Carousel } from 'react-native-snap-carousel-v4';

import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';
import { useNavigation } from '@react-navigation/native';

import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

import { DataMovieProps, DataSerieProps } from 'screens/Home';

import { LoadAnimation } from 'components/LoadAnimation';
import { Search as SearchComponent } from 'components/Search';
import { SearchItem } from 'components/SearchItem';

import { useTheme } from 'styled-components/native';

import { tmdb } from 'services/api';

import * as S from './styles';

const fetchMoviesSearch = async ({ pageParam = 1, query = '' }) => {
  const { data } = await tmdb.get<DataMovieProps>(
    `/search/movie?api_key=0b8d03de32e4889351d128d59380611b&language=pt-BR&include_adult=true&query=${query}&page=${pageParam}`,
  );

  return data;
};

const fetchSeriesSearch = async ({ pageParam = 1, query = '' }) => {
  const { data } = await tmdb.get<DataSerieProps>(
    `/search/tv?api_key=0b8d03de32e4889351d128d59380611b&language=pt-BR&include_adult=true&query=${query}&page=${pageParam}`,
  );

  return data;
};

type SearchSchemaProps = {
  search: string | null;
};

export const Search = () => {
  const [start, setStart] = useState(false);

  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();

  const { control, handleSubmit, getValues, setValue } =
    useForm<SearchSchemaProps>({
      defaultValues: {
        search: null,
      },
    });

  const moviesSearch = useQuery<DataMovieProps>(
    'moviesSearch',
    () =>
      fetchMoviesSearch({
        query: encodeURI(getValues('search')?.trim() ?? ''),
      }),
    {
      enabled: getValues('search') !== null,
    },
  );

  const seriesSearch = useQuery<DataSerieProps>(
    'seriesSearch',
    () =>
      fetchSeriesSearch({
        query: encodeURI(getValues('search')?.trim() ?? ''),
      }),
    {
      enabled: getValues('search') !== null,
    },
  );

  const reFetchAllData = () => {
    moviesSearch.refetch();
    seriesSearch.refetch();
  };

  const speechResultsHandler = (e: SpeechResultsEvent) => {
    setValue('search', e.value![0] ?? '');
  };

  const startRecording = async () => {
    setStart(true);

    await Voice.start('pt-BR');
  };

  const stopRecording = async () => {
    await Voice.stop();

    setStart(false);
  };

  useEffect(() => {
    Voice.onSpeechResults = speechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <S.Container
        colors={[
          colors.backgroundGradient,
          colors.background,
          colors.background,
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <S.WrapperSearch>
            <Controller
              control={control}
              name="search"
              render={({ field: { onChange, value } }) => (
                <SearchComponent
                  onChangeText={onChange}
                  value={value ?? ''}
                  startVoice={start}
                  handleStartVoice={startRecording}
                  handleStopVoice={stopRecording}
                  onSubmitEditing={handleSubmit(reFetchAllData)}
                  onBlur={handleSubmit(reFetchAllData)}
                  returnKeyType="done"
                />
              )}
            />
          </S.WrapperSearch>

          <S.SlideWrapper>
            {moviesSearch.isLoading || moviesSearch.isFetching ? (
              <S.WrapperLoading>
                <LoadAnimation />
              </S.WrapperLoading>
            ) : (
              moviesSearch.data?.results &&
              moviesSearch.data?.results.length > 0 && (
                <>
                  <S.TitleSlider>Filmes</S.TitleSlider>

                  <Carousel
                    vertical={false}
                    data={moviesSearch.data!.results}
                    activeSlideOffset={10}
                    activeSlideAlignment="start"
                    renderItem={({ item }) => (
                      <SearchItem
                        image={`https://www.themoviedb.org/t/p/original/${item.poster_path}`}
                        onPress={() => navigate('Movie', item)}
                      />
                    )}
                    sliderWidth={width}
                    itemWidth={width * 0.35}
                  />
                </>
              )
            )}
          </S.SlideWrapper>

          <S.SlideWrapper>
            {seriesSearch.isLoading || seriesSearch.isFetching ? (
              <S.WrapperLoading>
                <LoadAnimation />
              </S.WrapperLoading>
            ) : (
              seriesSearch.data?.results &&
              seriesSearch.data?.results.length > 0 && (
                <>
                  <S.TitleSlider>Séries</S.TitleSlider>

                  <Carousel
                    vertical={false}
                    data={seriesSearch.data!.results}
                    activeSlideOffset={10}
                    activeSlideAlignment="start"
                    renderItem={({ item }) => (
                      <SearchItem
                        image={`https://www.themoviedb.org/t/p/original/${item.poster_path}`}
                        onPress={() => navigate('Serie', item)}
                      />
                    )}
                    sliderWidth={width}
                    itemWidth={width * 0.35}
                  />
                </>
              )
            )}
          </S.SlideWrapper>
        </ScrollView>
      </S.Container>
    </TouchableWithoutFeedback>
  );
};
