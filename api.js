const personalKey = "alexey-kurochkin";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }
      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}

// Добавление поста в общую ленту
export function addPost({ description, imageUrl, token }) {
  return fetch(postsHost, {
  method: "POST",
  body: JSON.stringify({
    "description": description.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
    "imageUrl": imageUrl,
  }),
  headers: {
    Authorization: token,
  },
  })
  .then((response) => {
    if (response.status === 201) {
      return response.json();
    }
    if (response.status === 400) {
      throw new Error('Вы не ввели описание картинки или не загрузили фотографию')
    }
  })
  .catch((error) => {
    console.warn(error);
  });
}

// Получение постов конкретного пользователя
export function getUserPosts({ id , token}) {
  return fetch(postsHost + `/user-posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
  .then((response) => {
    if (response.status === 401) {
      throw new Error("Нет авторизации");
    }
    return response.json();
  })
  .then((data) => {
    return data.posts;
  })
  .catch((error) => {
    console.warn(error);
  });
}

// Возможность поставить лайк
export function addLike({ userIdLike, token}) {
  return fetch(`${postsHost}/${userIdLike}/like`, {
  method: "POST",
  body: JSON.stringify({
  }),
  headers: {
    Authorization: token,
  },
})
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    if (response.status === 400) {
      throw new Error('Что-то пошло не так')
    }
    if (response.status === 401) {
      throw new Error('Авторизируйтесь, чтобы поставить лайк')
    }
  })
  .catch((error) => {
    if (error.message = 'Авторизируйтесь, чтобы поставить лайк') {
      alert('Авторизируйтесь, чтобы поставить лайк')
    }
    console.warn(error);
  });

}

// Возможность удалить лайк
export function delLike({ userIdLike, token }) {
  return fetch(`${postsHost}/${userIdLike}/dislike`, {
  method: "POST",
  body: JSON.stringify({
  }),
  headers: {
    Authorization: token,
  },
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    if (response.status === 400) {
      throw new Error('Что-то пошло не так')
    }
  })
  .catch((error) => {
    console.warn(error);
  });
}
