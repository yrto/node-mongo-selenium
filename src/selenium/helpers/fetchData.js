import { By, Key, until } from "selenium-webdriver";
import { nonConcurrentMapOfWebElements } from "./nonConcurrent.js";
import { downloadFile } from "./downloadFile.js";

export const fetchListOfProductLinks = async (
  driver,
  searchText,
  arrayLength
) => {
  let linkList = [];
  try {
    await driver.get("https://www.magazineluiza.com.br/");
    const searchBar = await driver.findElement(By.id("inpHeaderSearch"));
    await searchBar.sendKeys(searchText, Key.RETURN);
    await driver.wait(
      until.elementLocated(By.className("product-image")),
      5000
    );
    const webElementArray = await driver.findElements({
      className: "product-li",
    });
    webElementArray.slice(0, arrayLength).map(async (element) => {
      const link = await element.getAttribute("href");
      linkList.push(link);
    });
    await driver.sleep(2500);
    console.log(linkList);
    return linkList;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleComment = async (comment) => {
  try {
    const author = await comment
      .findElement(By.className("product-review__text-box"))
      .findElement(By.className("product-review__text-content"))
      .getText();
    const body = await comment
      .findElement(By.className("product-review__post"))
      .findElement(By.className("product-review__text-content"))
      .getText();
    const commentData = {
      author: author !== "None" ? author : "Anônimo",
      body: body ? body : "Sem comentário",
    };
    return commentData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleProductInfo = async (driver, url) => {
  try {
    await driver.get(url);
    await driver.wait(
      until.elementLocated(By.className("header__title")),
      5000
    );
    let productData = await driver
      .findElement(By.className("header-product"))
      .getAttribute("data-product");
    productData = await JSON.parse(productData);
    const productCode = productData.id_product;
    const productTitle = productData.fullTitle;
    const productPrice = productData.priceTemplate.trim();
    const productImageUrl = await driver
      .findElement({
        className: "showcase-product__big-img",
      })
      .getAttribute("src");
    await downloadFile(
      productImageUrl,
      productCode,
      "./src/selenium/downloads"
    );
    const productCommentsWebElements = await driver.findElements({
      className: "wrapper-review__comment-text",
    });
    const productComments = await nonConcurrentMapOfWebElements(
      productCommentsWebElements.slice(0, 3),
      fetchSingleComment
    );
    const productInfo = {
      id: productCode,
      name: productTitle,
      price: productPrice,
      imageUrl: productImageUrl,
      comments: productComments,
    };
    return productInfo;
  } catch (error) {
    console.log(error);
  }
};
