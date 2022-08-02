const url = "/v1/products";
const formDOM = document.querySelector("#form");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productImage = document.querySelector("#product-image");
const container = document.querySelector("#container");
const error = document.querySelector(".error");
let imageValue;
productImage.addEventListener("change", async (e) => {
  const imageFile = e.target.files[0];
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const {
      data: { image },
    } = await axios.post(`${url}/upload`, formData);
    imageValue = image;
    console.log(imageValue);
  } catch (error) {
    imageValue = null;
    showError("No image selected");
  }
});

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const name = productName.value;
    const price = productPrice.value;
    const image = imageValue;
    const { data } = await axios.post(url, { name, price, image });
    console.log(data);
    fetchProducts();
  } catch (error) {
    console.log(error);
    console.log(" / / / / / // / / ");
    const msg = (error.response.data.msg);
    imageValue = null;
    showError(msg);
  }
});

async function fetchProducts() {
  const {
    data: { Amount, Products },
  } = await axios.get(url);
  const newProducts = Products.map((element) => {
    const { name, price, image } = element;
    return `<article class="product-container"  >
            <img class="product_image" src=${image} alt=${name}>
            <p>${name}</p>
            <div>${price}</div>
        </article>`;
  });
  container.innerHTML = newProducts.join("");
}

fetchProducts();

const showError = (msg) => {
  // mostrar error si nuetros try fallan
  error.innerText = msg;

  setTimeout(() => {
  error.innerText = "";
  }, 3000);
};
