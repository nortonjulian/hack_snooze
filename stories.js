"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;
let oldStoryList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  oldStoryList = await StoryList.getStories();
  // storyList = await StoryList.getStories();
  storyList = oldStoryList.stories;
  $storiesLoadingMsg.remove();

  putStoriesOnPage();

  updateFavoritesTab()
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
async function submitNewStory(evt) {
  evt.preventDefault();

  const title = $("#titlE").val();
  const author = $("#authoR").val();
  const url = $("#urL").val();

  // Validate the URL
  if (!isValidURL(url)) {
    console.error("Invalid URL");
    // You can show an error message to the user indicating that the URL is invalid
    return;
  }

  const username = currentUser.username;
  const storyData = { title, url, author, username };

  // Use the current instance of StoryList (oldStoryList) to add the story
  const story = await oldStoryList.addStory(username, storyData);

  const $story = generateStoryMarkup(story);

  $allStoriesList.prepend($story);
}

function isValidURL(url) {
  return url.startsWith("http://") || url.startsWith("https://");
}



// $submitForm.on("submit", submitNewStory)

// console.debug("generateStoryMarkup", story);
function generateStoryMarkup(story) {
  const hostName = story.getHostName();
  const $story = $(`
    <li id="${story.storyId}">
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
      <small class="star" id="${story.storyId}">add favorite</small>
      ${currentUser && currentUser.username === story.username ? '<span class="remove-story">remove</span>' : ''}
    </li>
  `);

  return $story;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList) {
    const $story = generateStoryMarkup(story);

    // Check if the story is a favorite for the logged-in user
    const isFavorite = currentUser ? currentUser.favorites.some((favStory) => favStory.storyId === story.storyId) : false;

    // Add/remove favorite class based on the favorite status
    if (isFavorite) {
      $story.addClass("favorite");
    } else {
      $story.removeClass("favorite");
    }

    $allStoriesList.append($story);
  }

  $allStoriesList.show();

  // Update the favorites tab in the navbar
  updateFavoritesTab();
}

function updateFavoritesTab() {
  $favoriteStories.empty();

  if (currentUser) {
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoriteStories.append($story);
    }
  }
}

// Event listener for marking stories as favorites
$body.on("click", ".star", async function(evt) {
  const favId = evt.target.id;
  const favorStory = storyList.find((s) => s.storyId === favId);
  const $star = $(evt.target);

  if (currentUser.isFavorite(favorStory)) {
    await currentUser.removeFavorite(favorStory);
    $star.text('add favorite');
  } else {
    await currentUser.addFavorite(favorStory);
    $star.text('⭐️');
  }

  // Update the favorites tab in the navbar after marking as favorite
  updateFavoritesTab();
});

async function deleteStory(evt) {
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);

  await putUserStoriesOnPage();
}

$ownStories.on("click", ".trash-can", deleteStory);
