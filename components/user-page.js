import { formatDistanceToNow } from "date-fns";
import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { addLike, delLike, getUserPosts} from "../api.js";

export async function renderUserPage({token}) {
  const app = document.querySelector('#app');
  app.innerHTML = '';
  app.innerHTML = '<div id="app"></div>';

  const userPosts = await posts;
  
  function renderPosts(userPosts) {
    const createDate = formatDistanceToNow(new Date(userPosts.createdAt));
    const htmlPosts = `
      <li class="post">
      <div class="post-header" data-user-id="${userPosts.user.id}">
          <img src="${userPosts.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${userPosts.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${userPosts.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${userPosts.id}" class="like-button">
          <img src="./assets/images/like-active.svg">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${userPosts.likes.length}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${userPosts.user.name}</span>
        ${userPosts.description}
      </p>
      <p class="post-date">
        ${createDate}
      </p>
    </li>
  `
  document.querySelector('#app').insertAdjacentHTML('beforeend', htmlPosts);
  }

  function renderContainer() {
    const html = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        <!-- посты постятся из JS-->
      </ul>
      </div>
    </div>
  `;
  
  document.querySelector('#app').insertAdjacentHTML('afterbegin', html);
  }

  function renderPage() {
    renderContainer();
  
    Array.from(userPosts).forEach((post) => {
        renderPosts(post);
    })
  }

  renderPage();

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userLike of document.querySelectorAll(".like-button")) {
    userLike.addEventListener("click", async function() {
        const userIdLike = userLike.dataset.postId;
        const id = userPosts.user.id;
        const arrayPosts = await getUserPosts({ id });
        const checkLiked = arrayPosts.find((item) => item.id === userIdLike);
        if (checkLiked.isLiked === true) {
          await delLike({userIdLike, token}); 
          await renderUserPage({ token })
        }
        if (checkLiked.isLiked === false) {
          await addLike({userIdLike, token})
          await renderUserPage({ token })
        }
    });
  }
}