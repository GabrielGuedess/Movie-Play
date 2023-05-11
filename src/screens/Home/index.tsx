import { useWindowDimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel-v4';

import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import { useInfiniteQuery } from 'react-query';

import { FilterBox } from 'components/FilterBox';
import { LoadAnimation } from 'components/LoadAnimation';
import { Slide } from 'components/Slide';

import { useTheme } from 'styled-components/native';

import { tmdb } from 'services/api';

import { MovieDTO } from 'dtos/MovieDTO';
import { SerieDTO } from 'dtos/SerieDTO';

import { filterMock } from './mock';

import * as S from './styles';

export type DataMovieProps = {
  page: number;
  results: MovieDTO[];
};

export type DataSerieProps = {
  page: number;
  results: SerieDTO[];
};

const fetchMoviesLatest = async ({ pageParam = 1 }) => {
  const { data } = await tmdb.get<DataMovieProps>(
    `/movie/upcoming?api_key=0b8d03de32e4889351d128d59380611b&language=pt-BR&page=${pageParam}`,
  );

  return data;
};

const fetchMoviesPopular = async ({ pageParam = 1 }) => {
  const { data } = await tmdb.get<DataMovieProps>(
    `/movie/popular?api_key=0b8d03de32e4889351d128d59380611b&language=pt-BR&page=${pageParam}`,
  );

  return data;
};

const fetchMoviesTopRated = async ({ pageParam = 1 }) => {
  const { data } = await tmdb.get<DataMovieProps>(
    `/movie/top_rated?api_key=0b8d03de32e4889351d128d59380611b&language=pt-BR&page=${pageParam}`,
  );

  return data;
};

const fetchSeriesTopRated = async ({ pageParam = 1 }) => {
  const { data } = await tmdb.get<DataSerieProps>(
    `/tv/top_rated?api_key=0b8d03de32e4889351d128d59380611b&language=pt-BR&page=${pageParam}`,
  );

  return data;
};

export function Home() {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  const moviesLatest = useInfiniteQuery<DataMovieProps>(
    'moviesLatest',
    fetchMoviesLatest,
    {
      getNextPageParam: (_, allPages) => allPages.length + 1,
    },
  );

  const moviesPopular = useInfiniteQuery<DataMovieProps>(
    'moviesPopular',
    fetchMoviesPopular,
    {
      getNextPageParam: (_, allPages) => allPages.length + 1,
    },
  );

  const moviesTopRated = useInfiniteQuery<DataMovieProps>(
    'moviesTopRated',
    fetchMoviesTopRated,
    {
      getNextPageParam: (_, allPages) => allPages.length + 1,
    },
  );

  const seriesTopRated = useInfiniteQuery<DataSerieProps>(
    'seriesTopRated',
    fetchSeriesTopRated,
    {
      getNextPageParam: (_, allPages) => allPages.length + 1,
    },
  );

  const slideWidth = width * 0.6;

  const loadMoreLatest = () => {
    if (moviesLatest.hasNextPage) {
      moviesLatest.fetchNextPage();
    }
  };

  const loadMorePopular = () => {
    if (moviesPopular.hasNextPage) {
      moviesPopular.fetchNextPage();
    }
  };

  const loadMoreTopRated = () => {
    if (moviesTopRated.hasNextPage) {
      moviesTopRated.fetchNextPage();
    }
  };

  const loadMoreSeriesTopRated = () => {
    if (seriesTopRated.hasNextPage) {
      seriesTopRated.fetchNextPage();
    }
  };

  return (
    <S.Container
      colors={[colors.backgroundGradient, colors.background, colors.background]}
    >
      <StatusBar backgroundColor="transparent" style="light" />

      <S.Header>
        <S.HeaderInfo>
          <S.HeaderTitle>Olá Gabriel!</S.HeaderTitle>
          <S.HeaderDescription>
            Verifique as últimas adições.
          </S.HeaderDescription>
        </S.HeaderInfo>

        <S.PhotoWrapper>
          <S.Photo
            source={{
              uri: 'https://avatars.githubusercontent.com/u/64827875?v=4',
            }}
          />
        </S.PhotoWrapper>
      </S.Header>

      <S.Content>
        <S.FilterWrapper>
          <S.FilterTitle>Filtros</S.FilterTitle>

          <S.FilterCards>
            {filterMock.map(item => (
              <FilterBox key={item} title={item} />
            ))}
          </S.FilterCards>
        </S.FilterWrapper>

        <S.SlideWrapper>
          <S.TitleSlider>Lançamentos</S.TitleSlider>

          {moviesLatest.isLoading ? (
            <S.WrapperLoading>
              <LoadAnimation />
            </S.WrapperLoading>
          ) : (
            <Carousel
              vertical={false}
              data={moviesLatest.data!.pages.map(page => page.results).flat()}
              renderItem={({ item }) => (
                <Slide
                  image={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`}
                  onPress={() => navigate('Movie', item)}
                />
              )}
              sliderWidth={width}
              itemWidth={slideWidth}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              onEndReached={loadMoreLatest}
              onEndReachedThreshold={0.3}
              ListFooterComponent={
                moviesLatest.isFetching && <LoadAnimation size="small" />
              }
            />
          )}
        </S.SlideWrapper>

        <S.SlideWrapper>
          <S.TitleSlider>Filmes Populares</S.TitleSlider>

          {moviesPopular.isLoading ? (
            <S.WrapperLoading>
              <LoadAnimation />
            </S.WrapperLoading>
          ) : (
            <Carousel
              vertical={false}
              data={moviesPopular.data!.pages.map(page => page.results).flat()}
              renderItem={({ item }) => (
                <Slide
                  image={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`}
                  onPress={() => navigate('Movie', item)}
                />
              )}
              sliderWidth={width}
              itemWidth={slideWidth}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              onEndReached={loadMorePopular}
              onEndReachedThreshold={0.3}
              ListFooterComponent={
                moviesPopular.isFetching && <LoadAnimation size="small" />
              }
            />
          )}
        </S.SlideWrapper>

        <S.SlideWrapper>
          <S.TitleSlider>Melhores Filmes</S.TitleSlider>

          {moviesTopRated.isLoading ? (
            <S.WrapperLoading>
              <LoadAnimation />
            </S.WrapperLoading>
          ) : (
            <Carousel
              vertical={false}
              data={moviesTopRated.data!.pages.map(page => page.results).flat()}
              renderItem={({ item }) => (
                <Slide
                  image={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`}
                  onPress={() => navigate('Movie', item)}
                />
              )}
              sliderWidth={width}
              itemWidth={slideWidth}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              onEndReached={loadMoreTopRated}
              onEndReachedThreshold={0.3}
              ListFooterComponent={
                moviesTopRated.isFetching && <LoadAnimation size="small" />
              }
            />
          )}
        </S.SlideWrapper>

        <S.SlideWrapper>
          <S.TitleSlider>Melhores Séries</S.TitleSlider>

          {seriesTopRated.isLoading ? (
            <S.WrapperLoading>
              <LoadAnimation />
            </S.WrapperLoading>
          ) : (
            <Carousel
              vertical={false}
              data={seriesTopRated.data!.pages.map(page => page.results).flat()}
              renderItem={({ item }) => (
                <Slide
                  image={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`}
                  onPress={() => navigate('Serie', item)}
                />
              )}
              sliderWidth={width}
              itemWidth={slideWidth}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              onEndReached={loadMoreSeriesTopRated}
              onEndReachedThreshold={0.3}
              ListFooterComponent={
                seriesTopRated.isFetching && <LoadAnimation size="small" />
              }
            />
          )}
        </S.SlideWrapper>
      </S.Content>
    </S.Container>
  );
}
