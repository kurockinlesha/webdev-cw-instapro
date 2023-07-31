import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
        <div class="header-container"></div>
          <h3 class="form-title">Добавить пост</h3>
          <div class="form-inputs">
            <div class="upload-image-container">
              <div class="upload=image">
                        <label class="file-upload-label secondary-button">
                            <input id="url-add" type="file" class="file-upload-input" style="display:none">
                            Выберите фото
                        </label>
              </div>
            </div>
              <label>
                Опишите фотографию:
                <textarea id="description-photo" class="input textarea" rows="4"></textarea>
              </label>
              <button class="button" id="add-button">Добавить</button>
          </div>
      </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    document.getElementById("add-button").addEventListener("click", () => {
      const descriptionPhotoAdd = document.querySelector('#description-photo');
      onAddPostClick({
        description: descriptionPhotoAdd.value,
        imageUrl: imageUrl,
      });
    });

    let imageUrl = "";

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }
  };
  render();
}
