"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $favoritedStories = $("#favorited-stories");
const $ownStories = $("#my-stories");

const $storiesLists = $(".stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $submitForm = $("#submit-form");

const $navSubmitStory = $("#nav-submit-story");
const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");

const $userProfile = $("#user-profile");

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

// function handleFavorite(evt){
//   const favId = evt.target.id
//   const favorStory = storyList.find( s => s.storyId === favId)
//   const $star = $(evt.target)

//   if (currentUser.isFavorite(favorStory)) {
//     console.log("if true")
//     currentUser.removeFavorite(favorStory);
//     $star.text('add favorite');
//   } else {
//     console.log("if false")
//     currentUser.addFavorite(favorStory)
//     $star.text('⭐️');
//   }
// }

// $body.on("click", ".star", handleFavorite)


function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $submitForm
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) {
    updateUIOnUserLogin();
  }
}

// $body.on("click", ".remove-story", async function(evt) {
//   const $story = $(evt.target).closest("li");
//   const storyId = $story.attr("id");
//   const story = storyList.find((s) => s.storyId === storyId);

//   if (story) {
//     await deleteStory(story)
//   }
// });

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);
