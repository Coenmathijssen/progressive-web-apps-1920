// export function data (data) {
//   // Select container
//   const container = document.getElementsByClassName('beer-list')[0]

//   // Clear data
//   container.innerHTML = ''

//   // Render data
//   data.forEach((item, i) => {
//     container.insertAdjacentHTML('afterbegin', `
//     <a href="#${data[i].id}" class="beer">
//       <article>
//         <img src="${data[i].image}">
//         <h2 class="beer-title">${data[i].name}</h2>
//         <ul class="meta">
//           <li class="abv">${data[i].abv}</li>
//           <li class="created">${data[i].date}</li>
//         </ul>
//         <p class="beer-desc">${data[i].descShort}</p>
//       </article>
//     </a>`)
//   })
// }

// module.exports = { data }
