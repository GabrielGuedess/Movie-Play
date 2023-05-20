export type SerieApiDTO = {
  serie: {
    name: string;
    tmdbId: number;
    createdAt: Date;
    updatedAt: Date;
    season: {
      seasonNumber: number;
      episode: {
        name: string;
        url: string;
        type: string;
        episodeNumber: number;
      };
    };
  };
};
