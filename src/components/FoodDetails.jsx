import { useEffect, useState } from "react";
import styles from "./foodDetails.module.css";
export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  //const API_KEY = "f34ae375d2dd4558a7930aa827bd80e7";
  const API_KEY = "c98a30923c7b490d995da7462e56fa95";

  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    fetchFood();
  }, [foodId]);
  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img className={styles.recipeImage} src={food.image} alt="" />

        <div className={styles.recipeDetails}>
          <span>
            <strong>{food.readyInMinutes} Minutes</strong>
          </span>
          <strong>Serves {food.servings}</strong>
          <span>
            <strong>{food.vegetarian ? "Vegetarian" : "Non-Vegetarian"}</strong>
          </span>
        </div>
        <div>
          <span>
            <strong>${food.pricePerServing} Per Serving</strong>
          </span>
        </div>
        <h1>Instruction</h1>
        <div className={styles.recipeInstruction}>
          <ol>
            {isLoading ? (
              <p>Loading....</p>
            ) : (
              food.analyzedInstructions[0].steps.map((step) => (
                <li>{step.step}</li>
              ))
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
