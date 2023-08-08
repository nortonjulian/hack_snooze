"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

function navSubmitStoryClick(evt) {
  console.log("navSubmitStory", evt);
  hidePageComponents();
  $allStoriesList.show()
  $submitForm.show();
}

$navSubmitStory.on("click", navSubmitStoryClick)

function navFavoritesClick(evt) {
  console.log("navFavoritesClick", evt);
  hidePageComponents();
  $allStoriesList.show()
  $submitForm.show();
}

$body.on("click", "#nav-favorites", navFavoritesClick)

function navMyStories(evt) {
  console.debug("navMyStories", evt);
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show();
}

$body.on("click", "#nav-my-stories", navMyStories);

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

function navProfileClick(evt) {
  console.debug("navProfileClick", evt);
  hidePageComponents();
  $userProfile.show();
}

$navUserProfile.on("click", navProfileClick);


function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// function showAddStoryForm() {
//   const addStoryForm = document.querySelector('#submitForm');
//   addStoryForm.style.display = "inline-block";
// }

// $navSubmitStory.on("click", showAddStoryForm)

// function handleFormSubmission(evt) {
//   evt.preventDefault();
//   submitNewStory(evt);
// }

// $("#submitForm").on("submit", handleFormSubmission)
