export const selectCategoriesMap = (state) =>
  state.categories.categories.reduce((acc, category) => {
    const { title, items } = category; // loops object by object
    //adding data using a hashtable
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
