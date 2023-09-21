import appApi from './appApi';

const CHAT = Object.freeze({
  ADD_NEW_MESSAGE: '/api/chat/add_new_message',
  GET_CHAT_WITH_ID: '/api/chat/get_chat_with_userId/ID',
});

const addNewMessageApi = async data => {
  //idUserReceive, content, images
  return appApi.post(CHAT.ADD_NEW_MESSAGE, data);
};

const getChatApi = id => {
  return appApi.get(CHAT.GET_CHAT_WITH_ID.replace('ID', id));
};

// const deleteRecipeByID = id => {
//   return appApi.delete(RECIPE.DELETE_RECIPE_BY_ID.replace('ID', id));
// };

// const getRecipe = () => {
//   return appApi.get(RECIPE.GET);
// };
export {CHAT, addNewMessageApi, getChatApi};
