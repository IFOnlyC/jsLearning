import 'core-js/stable';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';
import * as model from './model.js';

import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import bookmarksView from './view/bookmarksView.js';
import paginationView from './view/paginationView.js';
import addRecipeView from './view/addRecipeView.js';

// https://forkify-api.herokuapp.com/v2

// if (module.hot) {
//   module.hot.accept();
// }

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 0. results view to mark selected search result
    resultsView.update(model.getSearchResPagination());

    bookmarksView.update(model.state.bookmarks);

    // 1. Loading recipe data
    await model.loadRecipe(id);

    // 2. Render Recipe in HTML
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderErrorMsg();
  }
};

const controlSearchResults = async function () {
  try {
    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();

    // 2. Load search data
    await model.loadSearchResults(query);

    // 3. Render results
    resultsView.render(model.getSearchResPagination());

    // 4. Render initial pagination
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  // 1. Render new results
  resultsView.render(model.getSearchResPagination(goToPage));

  // 2. Render new pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings
  model.updateServings(newServings);
  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // update recipe view, bookmarks
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlLoadBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Render loading spinner
    addRecipeView.renderSpinner();

    // Upload new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render Recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change id in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2500);
    location.reload();
  } catch (error) {
    console.log(`FROM controller.js controlAddRecipe(): ${error} 💥💥💥`);
    addRecipeView.renderErrorMsg(error.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlLoadBookmarks);
  recipeView.addRecipeRenderHandler(controlRecipes);
  recipeView.addServingsUpdateHandler(controlServings);
  recipeView.addBookmarkHandler(controlAddBookmark);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addBtnHandler(controlPagination);
  addRecipeView.addUploadHandler(controlAddRecipe);
};
init();
