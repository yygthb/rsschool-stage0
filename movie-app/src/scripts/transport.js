import api from './api';

const getQueryString = (obj) => {
  return Object.keys(obj).reduce((str, item) => {
    return (str += `&${item}=${obj[item]}`);
  }, '');
};

const fetchApi = async (params = {}, route = api.popular) => {
  const queryParams = { language: 'en', ...params };
  const queryString = getQueryString(queryParams);

  const url = api.url + route + `?api_key=${api.key}` + queryString;

  try {
    const res = await fetch(url);
    return res;
  } catch (error) {
    console.log('fetchApi ERROR: ', error);
    return {
      ok: false,
      errorMsg: 'something gone wrong',
    };
  }
};

export const getPopularMovies = async () => {
  return fetchApi({}, api.route.popular);
};

export const getMoviesByTitle = async (title) => {
  const params = { query: title };
  return fetchApi(params, api.route.title);
};

export const getMovieById = async (id) => {
  return fetchApi({}, api.route.movie + id);
};

export const getMovieGenres = async () => {
  return fetchApi({}, api.route.genres);
};
