let sortValue = 1000;

const loadAllButton = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const buttonData = data.data;
  // console.log(buttonData);

  const allButtonContainer = document.getElementById(
    "button-container"
  );
  allButtonContainer.classList = `flex justify-center flex-col sm:flex-row items-center gap-5 mb-14`;

  buttonData.forEach((button) => {
    const buttonContainer = document.createElement("button");
    buttonContainer.classList = `px-5 py-2 bg-slate-300 rounded-lg hover:bg-[#FF1F3D] hover:text-white font-medium text-lg`;
    buttonContainer.id = `${button.category_id}`;
    buttonContainer.innerText = `${button.category}`;
    buttonContainer.setAttribute("onClick", "displayVideos(this.id)");
    
    allButtonContainer.appendChild(buttonContainer);
  });
};


// id
const categoriesId = async (Id, isSort = false) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${Id}`
  );
  const data = await res.json();
  const categoryId = data.data;

  console.log(categoryId);
  // sorting section
  if (isSort) {
    categoryId.sort((first, second) => {
      const firstView = parseInt(first.others.views.replace(/[^\d.]/g, ""));
      const secondView = parseInt(second.others.views.replace(/[^\d.]/g, ""));
      return secondView - firstView;
    });
  }

  const categoriesCardContainer = document.getElementById(
    "category-card-container"
  );
  categoriesCardContainer.classList = `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center`;
  categoriesCardContainer.innerHTML = "";

  if (categoryId.length < 1) {
    categoriesCardContainer.innerHTML = `
         <div class="container mx-auto mr-20">
         <img src="./images/Icon.png" class="mr-50 mx-auto mt-5" alt="">
         <h3 class="text-5xl justify-center text-center">Sorry, There is no content here</h3>
        </div>
    `;
  }

  categoryId.forEach((id) => {
    const divCardContainer = document.createElement("div");
    divCardContainer.innerHTML = `
    <div class="w-[350px] h-[185px] rounded-lg" style="background-image: url('${
      id.thumbnail
    }'); background-size: cover; background-position: center; position: relative;">
    <p class="text-white text-xs p-2 rounded-lg text-center absolute bottom-[2%] right-[2%] bg-gray-800">${convertSecondsToHours(
      id.others.posted_date
    )}</p>
    </div>
            
                <div class="flex items-start gap-4 mt-5 mb-2">
                <img src="${
                  id.authors[0].profile_picture
                }" class="w-2/12 h-[50px] rounded-full" alt="">
                
                <div>
                <h4 class="font-bold mb-2">${id.title}</h4>
                <span class="flex items-center gap-2 text-sm mb-2">
                <p>${id.authors[0].profile_name}</p>
                <p>${
                  id.authors[0]?.verified === true
                    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <g clip-path="url(#clip0_11_215)">
                <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF" />
                <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE" />
            </g>
            <defs>
                <clipPath id="clip0_11_215">
                    <rect width="20" height="20" fill="white" />
                </clipPath>
            </defs>
                </svg>`
                    : ""
                }
                </p>
                
                </span>
                <p class="text-sm">${id.others.views} views</p>
                </div>
                </div>
                
    `;
    categoriesCardContainer.appendChild(divCardContainer);
  });
};
// converting second to minute
function convertSecondsToHours(seconds) {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  return `${hours} hrs ${minutes} min ago`;
}

const displayVideos = (id) => {
  sortValue = id;
  categoriesId(id);
};

// sorting
const sortingButtonHandler = () => {
  categoriesId(sortValue, true);
};

loadAllButton();
categoriesId(sortValue);
