const apiKey = "377aa308bb014e84a97d392693b29107";

if (!apiKey) {
  throw new Error("API Key not found");
}

export const searchRecipes = async (searchTerm: string, page: number) => {
  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

  const queryParams = {
    apiKey,
    query: searchTerm,
    number: "10",
    offset: (page * 10).toString(),
  };
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url.toString());
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch recipes");
  }
};

export const getRecipeSummary = async (recipeId: string) => {
  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/summary`
  );
  const params = {
    apiKey: apiKey,
  };
  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url.toString());
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch recipe summary");
  }
};

export const getFavouriteRecipesByIDs = async (ids: string[]) => {
  const url = new URL("https://api.spoonacular.com/recipes/informationBulk");
  const params = {
    apiKey: apiKey,
    ids: ids.join(","),
  };
  url.search = new URLSearchParams(params).toString();

  try {
    const searchResponse = await fetch(url.toString());
    const json = await searchResponse.json();
    return { results: json };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch favorite recipes");
  }
};
