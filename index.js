import express from "express";
import axios from "axios";

const port = 4000;
const app = express();
const API_URL = "http://www.thecocktaildb.com/api/json/v1/1/random.php";

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}`);
    const result = response.data.drinks[0];

    const drink = {
      name: result.strDrink,
      imgSrc: result.strDrinkThumb,
      type: `${result.strAlcoholic} ${result.strCategory}`,
      glassType: result.strGlass,
      recipe: result.strInstructions,
      ingredients: [],
    };

    let i = 1;
    while (result[`strIngredient${i}`] !== null) {
      let ingr = "";
      result[`strMeasure${i}`] !== null
        ? (ingr = result[`strMeasure${i}`] + " ")
        : "";
      ingr += result[`strIngredient${i}`];
      drink.ingredients[i - 1] = ingr;
      i++;
    }

    res.render("index.ejs", { drink });
  } catch (error) {
    console.log(error);
  }
});

// Listen on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
