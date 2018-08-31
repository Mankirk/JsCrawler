const apiUrl = "http://localhost:8081/domains";

// fetch(apiUrl, {
//   headers: {
//     "Content-type": "application/json"
//   }
// }).then(function(response) {
//   if (response.status !== 200) {
//     console.log("rror");
//   }
//
//   console.log(response.json().then);
// });

fetch(apiUrl, {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
})
  .then(function(response) {
    return response.json();
  })
  .then(function(res) {
    console.log(res);
  });
