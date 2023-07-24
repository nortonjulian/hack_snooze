"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  storyList = storyList.stories;
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
async function submitNewStory(evt){
  evt.preventDefault()

  const title = $("#title").val()
  const author = $("#author").val()
  const url = $("#url").val()
  const username = currentUser.username
  const storyData = {title, url, author, username}

  const story = await StoryList.addStory(username, storyData)

  const $story = generateStoryMarkup(story)

  $allStoriesList.prepend($story)
}
$submitForm.on("submit", submitNewStory)






function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        <small class="star" id="${story.storyId}">add favorite</small>
      </li>
    `);
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
}

function removeStory(story) {
  storyList = storyList.filter((s) => s.storyId !== story.storyId);

  $(`#${story.storyId}`).remove();

  StoryList.removeStory(currentUser, story)
}
