const loadAllButtons = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const buttonData = data.data;
  // console.log(buttonData);

  const buttonContainer = document.getElementById(
    "button-container"
  );
  buttonContainer.classList = `flex justify-center flex-col sm:flex-row items-center gap-5 mb-14`;

  buttonData.forEach((category) => {
    // console.log(category);
    const addButton = document.createElement("button");
    addButton.classList = `px-5 py-2 text-center justify-center bg-slate-300 rounded-lg hover:bg-[#FF1F3D] hover:text-white font-medium text-lg`;
    addButton.id = `${category.category_id}`;
    addButton.innerText = `${category.category}`;
    // addButton.setAttribute("onClick", "displaytab(this.id)");
  
    buttonContainer.appendChild(addButton);
  });
};
loadAllButtons()

// const displayPhones = (phones, isShowAll) => {
//   //Step 1
//   const phoneContainer = document.getElementById("phone-container");
//   phones.forEach((phone) => {
//     // console.log(phone);
//     //Step 2
//     const phoneCard = document.createElement("div");

//     phoneCard.classList = `card-compact p-4 bg-gray-100 shadow-xl`;
//     // Step 3
//     phoneCard.innerHTML = `
//         <figure>
//                   <div class="card-actions justify-center">
//                   <img
//                   src="${phone.image}"
//                   alt="Phones" 
//                 />
//                   </div>
                
//                 </figure>
//                 <div class="card-body">
//                   <h2 class="card-title justify-center">${phone.phone_name}</h2>
//                   <p class="card-actions justify-center">If a dog chews shoes whose shoes does he choose?</p>
//                   <div class="card-actions justify-center">
//                     <button class="btn btn-primary" onclick="handleShowDetail('${phone.slug}')" >Show Details</button>
//                   </div>
//                 </div>
//         `;

//     //step 4
//     phoneContainer.appendChild(phoneCard);
//   });
// };
