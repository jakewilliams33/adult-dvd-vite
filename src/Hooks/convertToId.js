// function to get release id for url etc to save entering it in on the cms for every new release

export const convertToId = (inputText) => {
  return inputText
    .replace(/[^A-Za-z0-9\s]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();
};
