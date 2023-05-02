import React, { useState } from "react";
import { useParams } from "react-router-dom";




const RecipeInfo = () => {
    const [item, setItem] = useState();
    const {MealId} = useParams();
    var vId = "";
    if (MealId != "") {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`)
            .then(response => response.json())
            .then(data => {
                setItem(data.meals[0]);
            })
    }
    if(item){
        const url = item.strYoutube;
        const str = url.split("=");
        vId = str[str.length-1];
    }

    let count = 1;
    let ingredients = [];
    const getIngredients = () => {
        for (let i in item) {
            let ingredient = "";
            let measure = "";
            if (i.startsWith("strIngredient") && item[i]) {
                ingredient = item[i];
                measure = item['strMeasure' + count]
                count++;
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
    }
    getIngredients();

    return (
        <>
            {
                (!item) ? "" : (<>
                    <div className="content">
                        <img src={item.strMealThumb} alt="" />
                        <div className="inner-content">
                            <h1>{item.strMeal}</h1>
                            <h2>{item.strArea} Style</h2>
                            <h3>Category: {item.strCategory}</h3>
                        </div>
                    </div>
                    <div className="det-and-ingre">
                        <div className="ingredients">
                            <h2>Ingredients</h2>
                            {
                                ingredients.map(e => {
                                    return (<h4>{e}</h4>)
                                })
                            }
                        </div>
                        <div className="instructions">
                            <h2>Instructions</h2>
                            <h4>{item.strInstructions}</h4>
                        </div>
                    </div>
                    <div className="video">
                        <iframe src={`https://www.youtube.com/embed/${vId}`}></iframe>
                    </div>
                    
                </>)
            }
        </>
    )
}
export default RecipeInfo;