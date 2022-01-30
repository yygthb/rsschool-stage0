export default {
  omdb: {
    url: 'https://www.omdbapi.com',
    key: '2046aa38',
    query: {
      title: 's',
    },
  },
  tmdb: {
    url: 'https://api.themoviedb.org/3',
    key: 'd8b86d06da871cd459c43cc4589bd3a5',
    route: {
      title: '/search/movie',
      popular: '/movie/popular',
      genres: '/genre/movie/list',
      posterOriginal: 'https://image.tmdb.org/t/p/original',
      posterSmall: 'https://image.tmdb.org/t/p/w500',
    },
  },
};
