import { formatDistanceToNow } from "date-fns";
import { ru } from 'date-fns/locale';
import { renderHeaderComponent } from "./header-component.js";
import { posts } from "../index.js";
import { addLike, delLike, getUserPosts} from "../api.js";

export function renderUserPage({token, findLikesPost = posts}) {
  const app = document.querySelector('#app');
  app.innerHTML = '';
  app.innerHTML = '<div id="app"></div>';
  
  function renderPosts(post) {
    const likeIcon = post.isLiked ? "./assets/images/like-active.svg" : "./assets/images/like-not-active.svg";
    const likeMassiveUser = post.likes.length === 0 ? `0` : `${post.likes.length === 1 ? post.likes[0].name : `${post.likes[post.likes.length - 1].name} и еще ${post.likes.length - 1}`}`;

    const createDate = formatDistanceToNow(new Date(post.createdAt), { locale: ru });
    const htmlPosts = `
      <li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
          <img src="${post.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.id}" class="like-button">
          <img src=${likeIcon}>
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${likeMassiveUser}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}
      </p>
      <p class="post-date">
        ${createDate} назад
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
  
    findLikesPost.forEach((post) => {
      renderPosts(post);
    })
  }

  renderPage();

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  // отслеживание id лайка при клике на него для того, чтобы поставить/убрать лайк
  for (let userLike of document.querySelectorAll(".like-button")) {
    userLike.addEventListener("click", async function() {
        const userIdLike = userLike.dataset.postId;
        const id = document.querySelector(".post-header").dataset.userId;
        const arrayPosts = await getUserPosts({ id, token});
        const checkLiked = arrayPosts.find((item) => item.id === userIdLike);

        if (checkLiked.isLiked === true) {
          await delLike({userIdLike, token})
          findLikesPost = await getUserPosts({ id, token })
          await renderUserPage({ token, findLikesPost })
        }
        
        if (checkLiked.isLiked === false) {
          await addLike({userIdLike, token})
          findLikesPost = await getUserPosts({ id, token })
          await renderUserPage({ token, findLikesPost })
        }
    });
  }
}