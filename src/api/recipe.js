import appApi from './appApi';

const RECIPE = Object.freeze({
  CREATE: '/api/recipe/create',
  DETAIL: '/api/recipe/detail/ID',
  GET: '/api/recipe/recent',
  DELETE_RECIPE_BY_ID: '/api/recipe/ID',
});

const createRecipeApi = async data => {
  //name, linkVideo, step
  return appApi.post(RECIPE.CREATE, data);
};

const getDetail = ({id}) => {
  return appApi.get(RECIPE.DETAIL.replace('ID', id));
};

const deleteRecipeByID = id => {
  return appApi.delete(RECIPE.DELETE_RECIPE_BY_ID.replace('ID', id));
};

const getRecipe = () => {
  return appApi.get(RECIPE.GET);
};
export {RECIPE, createRecipeApi, deleteRecipeByID, getDetail, getRecipe};
