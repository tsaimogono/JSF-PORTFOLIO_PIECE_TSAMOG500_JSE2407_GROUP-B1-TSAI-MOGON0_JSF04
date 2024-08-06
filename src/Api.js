import axios from 'axios';

/**
 * Asynchronous function to fetch data for products.
 * @async
 * @function DataProducts
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of product objects.
 * @throws {Error} Throws an error if the data fetching fails.
 * @example
 * DataProducts().then(products => console.log(products));
 */
export async function DataProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

/**
 * Asynchronous function to fetch product categories.
 * @async
 * @function getCategories
 * @returns {Promise<Object>} A promise that resolves to an object containing an array of category names.
 * @throws {Error} Throws an error if the data fetching fails.
 * @example
 * getCategories().then(categories => console.log(categories));
 */
export async function getCategories() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    return { response: response.data };
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
}
