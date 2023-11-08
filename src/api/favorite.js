import appApi from './appApi';

const FAVORITE_ENDPOINTS = Object.freeze({
  ADD_FAVORITE: '/api/favorite/ID',
  LIST_FAVORITE: '/api/favorite/list',
});

const addFavorite = ({id}) => {
  return appApi.post(FAVORITE_ENDPOINTS.ADD_FAVORITE.replace('ID', id));
};

const unFavorite = ({id}) => {
  return appApi.delete(FAVORITE_ENDPOINTS.ADD_FAVORITE.replace('ID', id));
};

export {FAVORITE_ENDPOINTS, addFavorite, unFavorite};
