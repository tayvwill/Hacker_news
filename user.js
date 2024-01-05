async function login(evt) {
  console.debug("login", evt);
  evt.preventDefault();

  const username = $("#login-username").val();
  const password = $("#login-password").val();

  currentUser = await username.login(username, password);

  $loginForm.trigger("reset");

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
}
  $loginForm.on("submit", login);

async function signup(evt) {
  console.debug("signup", evt);
  evt.preventDefault();

  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();

  currentUser = await username.signup(username, password, name);

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();

  $signupForm.trigger("reset");
}

$signupForm.on("submit", signup);

function logout(evt) {
  console.debug("logout", evt);
  localStorage.clear();
  location.reload();
}
$navlogOut.on("click", logout);

async function checkForRememberedUser() {
  console.debug("checkForRememberedUser");
  const token = localStorage.getItem("username");
  if( !token || !username) return false;

  currentUser = await user.loginViaStoredCredentials(token, username);
}

function saveUserCredentialsInLocalStorage () {
  console.debug("saveUserCredentialsInLocalStorage");
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

async function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");

  putStoriesOnPage();
  $allStoriesList.show();

  updateNavOnLogin();
  generateUserProfile();
  $storiesContainer.show();
}

function generateUserProfile() {
  console.debug("generateUserProfile");

  $("#profile-name").text(currentUser.name);
  $("#profile-username").text(currentUser.username);
  $("#profile-account-date").text(currentUser.createdAt.slice(0,10));
}