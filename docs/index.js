let details = document.querySelector(".details");
let close = details.querySelector(".close");
let views = details.querySelector(".views");
let badge = document.querySelector(".badge");
let imageGrid = document.querySelector(".image-grid");
let detailsTitle = details.querySelector("header h2");
let detailsAvatar = details.querySelector("header img");
let detailsDownloads = details.querySelector(".downloads");
let gotoUnsplash = details.querySelector(".goto-unsplash");
let detailsImage = details.querySelector(".image-large img");

let cart = [];

let images = [
  {
    downloads: 63,
    viewsCount: "5,621",
    photographer: "Yuriy Kraykivskyy",
    unsplashUri: "https://unsplash.com/photos/uiRbpAAYkUw",
    avatarUri:
      "https://images.unsplash.com/placeholder-avatars/extra-large.jpg?dpr=1&auto=format&fit=crop&w=64&h=64&q=60&crop=faces&bg=fff",
    imageUri:
      "https://images.unsplash.com/photo-1570459562459-c4cf47f225b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
  },
  {
    downloads: 27,
    viewsCount: "3,281",
    photographer: "Paolo Chiabrando",
    unsplashUri: "https://unsplash.com/photos/5mYye1vfr_A",
    avatarUri:
      "https://images.unsplash.com/profile-1568200294550-a272380fc671image?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    imageUri:
      "https://images.unsplash.com/photo-1570464231174-55467f404e31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
  },
  {
    downloads: 741,
    viewsCount: "265,587",
    photographer: "Tolga Ahmetler",
    unsplashUri: "https://unsplash.com/photos/pDUKndxw77A",
    avatarUri:
      "https://images.unsplash.com/profile-1570480548027-6d00204e91bfimage?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    imageUri:
      "https://images.unsplash.com/photo-1570478087849-27590fa8d3bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
  },
  {
    downloads: 704,
    viewsCount: "307,371",
    photographer: "Claudiu Hegedus",
    unsplashUri: "https://unsplash.com/photos/AolXfHNIdWA",
    avatarUri:
      "https://images.unsplash.com/profile-fb-1553278612-3a8781091df1.jpg?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    imageUri:
      "https://images.unsplash.com/photo-1570103465173-0f1fe55b55ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
  },
  {
    downloads: 41,
    viewsCount: "4,210",
    photographer: "Brad Pearson",
    unsplashUri: "https://unsplash.com/photos/qIeGdtHFExk",
    avatarUri:
      "https://images.unsplash.com/profile-fb-1564621196-ecec77bc4bd5.jpg?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    imageUri:
      "https://images.unsplash.com/photo-1565575742704-f1de5ae984ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
  },
  {
    downloads: 0,
    viewsCount: "0",
    photographer: "Mirkos Tsarouchidis",
    unsplashUri: "https://unsplash.com/photos/7J8PXjmhv5o",
    avatarUri:
      "https://images.unsplash.com/profile-1569601532688-b786f242b0f9image?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    imageUri:
      "https://images.unsplash.com/photo-1570526471056-2e9477ed41f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
  },
  {
    downloads: 52,
    viewsCount: "6,068",
    photographer: "aaron staes",
    unsplashUri: "https://unsplash.com/photos/1_c2-9v4CII",
    avatarUri:
      "https://images.unsplash.com/profile-1558688752489-0a363a4703e7?dpr=1&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff",
    imageUri:
      "https://images.unsplash.com/photo-1549817084-671645770f62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
  }
];

badge.innerHTML = cart.length;

createImageGrid(images);

function createImageGrid(images) {
  let imgs = [...images];
  imgs.map((image, idx) => imageGrid.appendChild(createImage(image, idx)));
}

function createImage(data, key) {
  let name = element("p");
  let item = element("li");
  let image = element("img");
  let avatar = element("img");
  let favouriteBtn = element("button");
  let bottomContainer = element("div");
  let avatarNameWrapper = element("div");

  let {
    imageUri,
    avatarUri,
    viewsCount,
    downloads,
    photographer,
    unsplashUri
  } = data;

  image.src = imageUri;
  avatar.src = avatarUri;
  name.textContent = photographer;

  bottomContainer.className = "bottom-container";
  avatarNameWrapper.className = "avatar-name--wrapper";

  avatarNameWrapper.appendChild(avatar);
  avatarNameWrapper.appendChild(name);

  favouriteBtn.appendChild(createFavouriteSvg());

  bottomContainer.appendChild(avatarNameWrapper);
  bottomContainer.appendChild(favouriteBtn);

  item.appendChild(image);
  item.appendChild(bottomContainer);

  favouriteBtn.onclick = () => {
    let index;
    let cartItem;

    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];
      if (item.id === key) {
        index = i;
        cartItem = item;
        break;
      }
    }

    if (cartItem) {
      cart.splice(index, 1);
      favouriteBtn.classList.remove("favourite");
    } else {
      let cartHero = new SharedElement({ from: image, to: image });
      cartHero.points({
        from: image.getBoundingClientRect(),
        to: badge.getBoundingClientRect()
      });

      cart.push({ ...data, id: key });
      cartHero.init({ duration: 500 }).play();
      favouriteBtn.classList.add("favourite");
    }

    badge.innerHTML = cart.length;
  };

  image.onclick = () => {
    detailsImage.src = imageUri;
    detailsAvatar.src = avatarUri;
    views.textContent = viewsCount;
    gotoUnsplash.href = unsplashUri;
    detailsTitle.textContent = photographer;
    detailsDownloads.textContent = downloads;

    let sharedProps = {
      duration: 400,
      withOverlay: true
    };

    let sourceImageStyle = getComputedStyle(image);
    let destImageStyle = getComputedStyle(detailsImage);

    let sourceAvatarStyle = getComputedStyle(avatar);
    let destAvatarStyle = getComputedStyle(detailsAvatar);

    let sourceTitleStyle = getComputedStyle(name);
    let destTitleStyle = getComputedStyle(detailsTitle);

    details.classList.add("show");

    let heroTitle = new SharedElement({ from: name, to: detailsTitle });
    let heroImage = new SharedElement({ from: image, to: detailsImage });
    let heroAvatar = new SharedElement({ from: avatar, to: detailsAvatar });

    heroImage.fadeOut(item);

    heroImage.css({
      borderRadius: [sourceImageStyle.borderRadius, destImageStyle.borderRadius]
    });

    heroTitle.css({
      whiteSpace: ["nowrap", "nowrap"],
      fontSize: [sourceTitleStyle.fontSize, destTitleStyle.fontSize],
      fontWeight: [sourceTitleStyle.fontWeight, destTitleStyle.fontWeight]
    });

    heroAvatar.css({
      borderRadius: [
        sourceAvatarStyle.borderRadius,
        destAvatarStyle.borderRadius
      ]
    });

    heroImage.init(sharedProps).play(() => details.classList.add("reveal"));
    heroAvatar.init(sharedProps).play();
    heroTitle.init(sharedProps).play();

    close.onclick = () => {
      details.classList.remove("show", "reveal");
      heroImage.reverse(() => heroImage.fadeIn(item));
      heroAvatar.reverse();
      heroTitle.reverse();
    };
  };

  return item;
}

function element(type) {
  return document.createElement(type);
}

function createFavouriteSvg() {
  let xmlns = "http://www.w3.org/2000/svg";
  let svg = document.createElementNS(xmlns, "svg");
  let path = document.createElementNS(xmlns, "path");
  let title = document.createElementNS(xmlns, "title");

  svg.setAttributeNS(null, "role", "img");
  svg.setAttributeNS(null, "width", "48px");
  svg.setAttributeNS(null, "viewBox", "0 0 24 24");
  svg.setAttributeNS(null, "viewBox", "0 0 24 24");
  svg.setAttributeNS(null, "aria-labelledby", "favouriteIconTitle");
  svg.setAttributeNS(null, "stroke", "#000");
  svg.setAttributeNS(null, "stroke-width", "1");
  svg.setAttributeNS(null, "stroke-linecap", "square");
  svg.setAttributeNS(null, "stroke-linejoin", "miter");
  svg.setAttributeNS(null, "fill", "none");
  svg.setAttributeNS(null, "color", "#000");

  title.setAttributeNS(null, "id", "favouriteIconTitle");
  path.setAttributeNS(
    null,
    "d",
    "M12,21 L10.55,19.7051771 C5.4,15.1242507 2,12.1029973 2,8.39509537 C2,5.37384196 4.42,3 7.5,3 C9.24,3 10.91,3.79455041 12,5.05013624 C13.09,3.79455041 14.76,3 16.5,3 C19.58,3 22,5.37384196 22,8.39509537 C22,12.1029973 18.6,15.1242507 13.45,19.7149864 L12,21 Z"
  );

  title.innerHTML = "Favourite";

  svg.appendChild(title);
  svg.appendChild(path);

  return svg;
}
