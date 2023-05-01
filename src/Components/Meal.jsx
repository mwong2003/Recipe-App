import React, { useEffect, useState } from 'react'
import MealItem from './MealItem';
import RecipeIndex from './RecipeIndex';

const Meal = () => {
  const [url, setUrl] = useState('https:/www.themealdb.com/api/json/v1/1/search.php?f=a');
  const [item, setItem] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.meals);
        setItem(data.meals);
        setShow(true);
      })
  }, [url])

  const setIndex = () => {
    setUrl('https:/www.themealdb.com/api/json/v1/1/search.php?f=${alpha}')
  }

  return (
    <>
    <div className="main">
        <div className='heading'>
            <h1>Search Your Food Recipe</h1>
        </div>
        <div className='searchBox'>
            <input type="search" className='search-bar' />
        </div>
        <div className="container">
            {
              show ? <MealItem data={item}/>:"Not Found"
            }
        </div>
        <div className="indexContainer">
            <RecipeIndex alphaIndex={alpha => setIndex(alpha)}/>
        </div>
    </div>
    </>
    
  )
}
export default Meal;