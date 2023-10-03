import appApi from './appApi';

const RECIPE = Object.freeze({
  CREATE: '/api/recipe/create',
  EDIT_RECIPE: '/api/recipe/ID',
  DETAIL: '/api/recipe/detail/ID',
  GET: '/api/recipe/recent',
  DELETE_RECIPE_BY_ID: '/api/recipe/ID',
  GET_RECIPE_CURRENT_USER: '/api/recipe/get-recipe-current-user',
});

const createRecipeApi = async data => {
  //name, linkVideo, step
  return appApi.post(RECIPE.CREATE, data);
};

const editRecipeByIdApi = async ({id, data}) => {
  //name, linkVideo, step,.....
  return appApi.put(RECIPE.EDIT_RECIPE.replace('ID', id), data);
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

export {
  RECIPE,
  createRecipeApi,
  deleteRecipeByID,
  editRecipeByIdApi,
  getDetail,
  getRecipe,
};
