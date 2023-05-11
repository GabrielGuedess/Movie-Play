import React, { useEffect, useState } from 'react';

import { useWindowDimensions, StyleSheet } from 'react-native';

import Lightbox from 'react-native-lightbox-v2';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Carousel } from 'react-native-snap-carousel-v4';

import { useNavigation, useRoute } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

import LottieView from 'lottie-react-native';
import { ArrowLeft, Heart, Play, Star } from 'phosphor-react-native';
import { rgba } from 'polished';

import { RootRouteProps } from 'routes';

import { LoadAnimation } from 'components/LoadAnimation';
import { Slide } from 'components/Slide';

import { useTheme } from 'styled-components';

import { tmdb } from 'services/api';

import { CastDTO } from 'dtos/CastDTO';
import { GalleryDTO } from 'dtos/GalleryDTO';
import { MovieDetailsDTO } from 'dtos/MovieDetailsDTO';

import LikeAnimation from 'assets/lottie/like.json';

import * as S from './styles';

type GalleryResponse = {
  backdrops: GalleryDTO[];
};

export function Movie() {
  const [details, setDetails] = useState<MovieDetailsDTO>(
    {} as MovieDetailsDTO,
  );
  const [cast, setCast] = useState<CastDTO>({} as CastDTO);
  const [gallery, setGallery] = useState<string[]>([]);
  const [like, setLike] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { navigate, goBack } = useNavigation();
  const { params } = useRoute<RootRouteProps<'Movie'>>();

  const voteAverage = Math.round(details.vote_average);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 420],
        [420, 200],
        Extrapolate.CLAMP,
      ),
    };
  });

  const slideWidth = width * 0.6;

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      const detailsPromise = tmdb.get<MovieDetailsDTO>(
        `/movie/${params.id}?api_key=0b8d03de32e4889351d128d59380611b&language=pt-BR`,
      );

      const castPromise = tmdb.get<CastDTO>(
        `/movie/${params.id}/credits?api_key=0b8d03de32e4889351d128d59380611b`,
      );

      const galleryPromise = tmdb.get<GalleryResponse>(
        `/movie/${params.id}/images?api_key=0b8d03de32e4889351d128d59380611b`,
      );

      const [details, cast, gallery] = await Promise.all([
        detailsPromise,
        castPromise,
        galleryPromise,
      ]);

      const galleryPaths = gallery.data.backdrops
        .map(item => item.file_path)
        .slice(0, 10);

      setDetails(details.data);
      setGallery(galleryPaths);
      setCast(cast.data);

      setIsLoading(false);
    }

    getData();
  }, [params.id, params.title]);

  return (
    <S.Container>
      <StatusBar backgroundColor="transparent" style="light" />

      {isLoading ? (
        <LoadAnimation />
      ) : (
        <>
          <S.Header>
            <S.WrapperBackButton onPress={() => goBack()}>
              <ArrowLeft size={24} color={colors.text} />
            </S.WrapperBackButton>

            <S.WrapperBackLike onPress={() => setLike(!like)}>
              {like ? (
                <LottieView
                  autoPlay
                  loop={false}
                  style={{
                    height: 60,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: [{ translateX: -27 }, { translateY: -27 }],
                  }}
                  source={LikeAnimation}
                />
              ) : (
                <Heart size={24} color={colors.text} weight="fill" />
              )}
            </S.WrapperBackLike>
          </S.Header>

          <Animated.View style={[styles.imageWrapper, headerStyleAnimation]}>
            <S.Image
              source={{
                uri: `https://www.themoviedb.org/t/p/original${details.backdrop_path}`,
              }}
            />

            <S.BlurTop colors={[colors.background, 'transparent']} />

            <S.Blur
              colors={[
                'transparent',
                rgba(colors.background, 0.6),
                rgba(colors.background, 0.9),
                colors.background,
              ]}
            />

            <S.WrapperButton>
              <S.ButtonTrailer
                onPress={() =>
                  navigate('Stream', {
                    title: params.title,
                    backdrop_path: details.backdrop_path,
                    tmdId: params.id,
                  })
                }
              >
                <Play size={24} color={colors.text} weight="fill" />
              </S.ButtonTrailer>
            </S.WrapperButton>
          </Animated.View>

          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 25 }}
            scrollEventThrottle={16}
            style={styles.content}
            onScroll={scrollHandler}
          >
            <S.Info>
              <S.Title>{params.title}</S.Title>
              <S.Details>
                {new Date(params.release_date).getFullYear()} |{' '}
                {details?.genres
                  .map(item => item.name)
                  .slice(0, 3)
                  .join(', ')}{' '}
                | {details.vote_average.toFixed(1)}
              </S.Details>

              <S.WrapperStars>
                <Star
                  weight="fill"
                  size={24}
                  color={voteAverage >= 2 ? colors.starHighlight : colors.star}
                />
                <Star
                  weight="fill"
                  size={24}
                  color={voteAverage >= 4 ? colors.starHighlight : colors.star}
                />
                <Star
                  weight="fill"
                  size={24}
                  color={voteAverage >= 6 ? colors.starHighlight : colors.star}
                />
                <Star
                  weight="fill"
                  size={24}
                  color={voteAverage >= 8 ? colors.starHighlight : colors.star}
                />
                <Star
                  weight="fill"
                  size={24}
                  color={voteAverage == 10 ? colors.starHighlight : colors.star}
                />
              </S.WrapperStars>

              <S.WrapperPlot>
                <S.TitleSecondary>Sinopse</S.TitleSecondary>

                <S.Plot>{details.overview}</S.Plot>
              </S.WrapperPlot>
            </S.Info>

            <S.SlideWrapper>
              <S.TitleSlider>Elenco</S.TitleSlider>

              <Carousel
                vertical={false}
                data={cast.cast}
                activeSlideOffset={10}
                activeSlideAlignment="start"
                containerCustomStyle={{ marginHorizontal: 24 }}
                renderItem={({ item }) => (
                  <>
                    <Slide
                      size="xsmall"
                      image={`https://www.themoviedb.org/t/p/original/${item.profile_path}`}
                      as={Lightbox}
                      isGallery
                    />
                    <S.DetailsCast>{item.name}</S.DetailsCast>
                  </>
                )}
                sliderWidth={width}
                itemWidth={width * 0.4}
              />
            </S.SlideWrapper>

            <S.SlideWrapper>
              <S.TitleSlider>Galeria</S.TitleSlider>

              <Carousel
                vertical={false}
                data={gallery}
                renderItem={({ item }) => (
                  <Slide
                    image={`https://www.themoviedb.org/t/p/original/${item}`}
                    as={Lightbox}
                    isGallery
                  />
                )}
                sliderWidth={width}
                itemWidth={slideWidth}
              />
            </S.SlideWrapper>
          </Animated.ScrollView>
        </>
      )}
    </S.Container>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 420,
  },
  content: {
    width: '100%',
  },
});
