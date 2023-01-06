import React, { useEffect, useState } from 'react';

import { useWindowDimensions } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { MovieDTO } from 'dtos/MovieDTO';
import Carousel from 'react-native-snap-carousel-v4';
import { api } from 'services/api';

import { FilterBox } from 'components/FilterBox';
import { Search } from 'components/Search';
import { Slide } from 'components/Slide';

import { filterMock } from './mock';

import * as S from './styles';

export type DataProps = {
  page: number;
  results: MovieDTO[];
};

export function Home() {
  const [popular, setPopular] = useState<DataProps>({} as DataProps);
  const [topRated, setTopRated] = useState<DataProps>({} as DataProps);

  const { width } = useWindowDimensions();

  const slideWidth = width * 0.6;

  useEffect(() => {
    async function getData() {
      const popular = await api.get<DataProps>(
        '/popular?api_key=0b8d03de32e4889351d128d59380611b&language=pt-BR&page=1',
      );

      const topRated = await api.get<DataProps>(
        '/top_rated?api_key=0b8d03de32e4889351d128d59380611b&language=pt-BR&page=1',
      );

      setPopular(popular.data);
      setTopRated(topRated.data);
    }

    getData();
  }, []);

  return (
    <S.Container>
      <StatusBar backgroundColor="transparent" style="light" />

      <S.Header>
        <S.HeaderInfo>
          <S.HeaderTitle>Hello Gabriel!</S.HeaderTitle>
          <S.HeaderDescription>Check for latest addition.</S.HeaderDescription>
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
        <S.SearchWrapper>
          <Search />
        </S.SearchWrapper>

        <S.FilterWrapper>
          <S.FilterTitle>Filters</S.FilterTitle>

          <S.FilterCards>
            {filterMock.map(item => (
              <FilterBox key={item} title={item} />
            ))}
          </S.FilterCards>
        </S.FilterWrapper>

        <S.SlideWrapper>
          <S.TitleSlider>Filmes Populares</S.TitleSlider>

          <Carousel
            vertical={false}
            data={popular.results}
            renderItem={({ item }) => (
              <Slide
                image={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`}
              />
            )}
            sliderWidth={width}
            itemWidth={slideWidth}
          />
        </S.SlideWrapper>

        <S.SlideWrapper>
          <S.TitleSlider>Top Rated</S.TitleSlider>

          <Carousel
            vertical={false}
            data={topRated.results}
            renderItem={({ item }) => (
              <Slide
                image={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`}
              />
            )}
            sliderWidth={width}
            itemWidth={slideWidth}
          />
        </S.SlideWrapper>
      </S.Content>
    </S.Container>
  );
}
