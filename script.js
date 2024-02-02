document.addEventListener("DOMContentLoaded", function () {
  const dataContainer = document.getElementById("data");
  const paginationContainer = document.getElementById("pagination");
  const url =
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";

  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  function displayData(data, page) {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedData = data.slice(startIndex, endIndex);
    dataContainer.innerHTML = "";
    paginatedData.forEach((item) => {
      const listItem = document.createElement("div");
      listItem.textContent = item.id + ": " + item.name; // Change 'title' to 'name'
      dataContainer.appendChild(listItem);
    });
  }

  function renderPagination(data) {
    const totalPages = Math.ceil(data.length / 10);
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = i;
      link.addEventListener("click", function (event) {
        event.preventDefault();
        displayData(data, i);
      });
      listItem.appendChild(link);
      paginationContainer.appendChild(listItem);
    }
  }

  fetchData(url)
    .then((data) => {
      renderPagination(data);
      displayData(data, 1);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
