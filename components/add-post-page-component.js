import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick, user }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
          <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">
                Добавить пост
                </h3>
              <div class="form-inputs">
    
                  
                  
              <div class="upload-image-container"></div>
              <label> 
              
            Опишите фотографию:
            
              <textarea type="textarea" id="password-input" class="input-description" rows="4" ></textarea>
              </label>
                  
                  <div class="form-error"></div>
                  
                  <button class="button" id="add-button">Добавить</button>
              </div>
            

               
              </div>
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
