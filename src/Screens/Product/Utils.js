export const getInformationByLanguage = (information = [], language = 'EN') => {
  const value = information.find((item) => item.languageCode === language);
  if (value) {
    return value;
  }
  return null;
};
export const getSimilarProducts = (categories, data) => {
  const similarProducts = [];
  categories.forEach((category) => {
    category.products.forEach((product) => {
      const isExist = isExistInData(data, product.id);
      if (isExist) {
        similarProducts.push(product);
      }
    });
  });
  return similarProducts;
};

const isExistInData = (data, idProduct) => {
  let exist = false;
  data.forEach((item) => {
    if (item.id === idProduct) {
      exist = true;
    }
  });
  return exist;
};