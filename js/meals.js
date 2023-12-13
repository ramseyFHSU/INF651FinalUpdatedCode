document.addEventListener("DOMContentLoaded", function () {
  // Fetching DOM elements
  const goalSelect = document.getElementById("goal"); // Ensure this ID matches your HTML element ID
  const weightInput = document.getElementById("weight");
  const heightFeetInput = document.getElementById("height-feet");
  const heightInchesInput = document.getElementById("height-inches");
  const dietSelect = document.getElementById("preferred-diet");
  const suggestedCaloriesInput = document.getElementById("suggested-calories");
  const suggestedProteinInput = document.getElementById("suggested-protein");
  const foodListContainer = document.getElementById("food-list");

  // Verify all elements were found
  if (
    !goalSelect ||
    !weightInput ||
    !heightFeetInput ||
    !heightInchesInput ||
    !dietSelect ||
    !suggestedCaloriesInput ||
    !suggestedProteinInput ||
    !foodListContainer
  ) {
    console.error("Some HTML elements could not be found by their IDs.");
    return; // Exit the function if elements are missing
  }

  // Adding event listeners to form elements
  [
    goalSelect,
    weightInput,
    heightFeetInput,
    heightInchesInput,
    dietSelect,
  ].forEach((element) => {
    element.addEventListener("change", updateSuggestions);
  });

  // Initial update of suggestions when the page loads
  updateSuggestions();

  // Function to update suggestions based on user input
  function updateSuggestions() {
    const goal = goalSelect.value;
    const weight = parseFloat(weightInput.value) || 0;
    const heightFeet = parseFloat(heightFeetInput.value) || 0;
    const heightInches = parseFloat(heightInchesInput.value) || 0;
    const diet = dietSelect.value;

    // Calculate suggested calories and protein
    const suggestedCalories = calculateCalories(
      goal,
      weight,
      heightFeet,
      heightInches,
      diet
    );
    const suggestedProtein = calculateProtein(weight, diet);

    // Display the calculated values in the corresponding input fields
    suggestedCaloriesInput.value = suggestedCalories.toFixed(2);
    suggestedProteinInput.value = suggestedProtein.toFixed(2);
    console.log(goal);
    console.log(weight);
    console.log(heightFeet);
    console.log(heightFeet);
    console.log(diet);
    // Update the food list based on goal and diet
    updateFoodList(goal, diet);
  }

  // Function to calculate suggested daily calories
  function calculateCalories(goal, weight, heightFeet, heightInches, diet) {
    const baseCalories = 2000;
    const heightInchesTotal = heightFeet * 12 + heightInches;
    const activityMultiplier = getMultiplierForGoal(goal);
    const dietMultiplier = getMultiplierForDiet(diet);

    return baseCalories * activityMultiplier * dietMultiplier;
  }

  // Function to calculate suggested daily protein intake
  function calculateProtein(weight, diet) {
    const proteinPerLb = 0.68;
    const dietMultiplier = getMultiplierForDiet(diet);

    return weight * proteinPerLb * dietMultiplier;
  }

  // Function to get activity multiplier based on goal
  function getMultiplierForGoal(goal) {
    switch (goal) {
      case "active":
        return 1.2;
      case "gain-weight":
        return 1.5;
      case "lose-weight":
        return 0.8;
      case "lose-weight-gain-muscle":
        return 1.2;
      default:
        return 1.0;
    }
  }

  // Function to get diet multiplier based on preferred diet
  function getMultiplierForDiet(diet) {
    switch (diet) {
      case "no-restrictions":
        return 1.0;
      case "vegan":
        return 0.8;
      case "low-carb":
        return 1.2;
      case "carnivore":
        return 1.5;
      default:
        return 1.0;
    }
  }

  // Function to update the food list based on goal and diet
  function updateFoodList(goal, diet) {
    const foods = {
      "gain-weight-muscle-no-restrictions": [
        { name: "Protein Shake", image: "images/shake.jpg" },
        { name: "Red Meats", image: "images/red.jpg" },
        { name: "Rice/Potatoes/Corn/Beans", image: "images/rice.jpg" },
        { name: "Salmon/Oily Fish", image: "images/salmon.jpg" },
        { name: "Whole Eggs", image: "images/egg.jpg" },
      ],
      "gain-weight-muscle-vegan": [
        { name: "Vegan Protein Shake", image: "images/shake.jpg" },
        { name: "Tofu", image: "images/tofu.jpg" },
        { name: "Nuts/Seeds", image: "images/nuts.jpg" },
        { name: "Peanut Butter", image: "images/peanutbutter.jpg" },
        { name: "Paneer", image: "images/paneer.jpg" },
      ],
      "gain-weight-muscle-low-carb": [
        { name: "Chickpea Pastas", image: "images/pasta.jpg" },
        { name: "Almond Butter", image: "images/almondbutter.jpg" },
        { name: "Shrimp/Tuna/Salmon/Lobster", image: "images/salmon.jpg" },
        { name: "Greek Yogurt", image: "images/yogurt.jpg" },
        { name: "Whole Eggs", image: "images/egg.jpg" },
        { name: "Chicken Breast", image: "images/chicken.jpg" },
      ],
      "gain-weight-muscle-carnivore": [
        { name: "Red Meats (70% lean/30% fat)", image: "images/red.jpg" },
        { name: "Chicken Breast", image: "images/chicken.jpg" },
        { name: "Turkey", image: "images/turkey.jpg" },
        { name: "Salmon/White Fish", image: "images/salmon.jpg" },
        { name: "Hard Cheeses", image: "images/cheese.jpg" },
      ],
      "lose-weight-no-restrictions": [
        { name: "Salmon/Turkey/Chicken Breast", image: "images/chicken.jpg" },
        { name: "Nuts", image: "images/nuts.jpg" },
        { name: "Whole Eggs", image: "images/egg.jpg" },
        { name: "Broccoli/Leafy Greens", image: "images/green.jpg" },
        { name: "Fruits", image: "images/fruit.jpg" },
      ],
      "lose-weight-vegan": [
        { name: "Nut Butters", image: "images/almondbutter.jpg" },
        { name: "Nuts", image: "images/nuts.jpg" },
        { name: "Whole Eggs", image: "images/egg.jpg" },
        { name: "Broccoli/Leafy Greens", image: "images/green.jpg" },
        { name: "Fruits", image: "images/fruit.jpg" },
      ],
      "lose-weight-low-carb": [
        { name: "Chicken Breast/Pork/Salmon", image: "images/chicken.jpg" },
        { name: "Leafy Greens", image: "images/green.jpg" },
        { name: "Whole Eggs", image: "images/egg.jpg" },
        { name: "Nuts and Seeds", image: "images/nuts.jpg" },
        { name: "Low Carb Fruits", image: "images/fruit.jpg" },
      ],
      "lose-weight-carnivore": [
        { name: "Chicken Breast", image: "images/chicken.jpg" },
        { name: "Turkey", image: "images/turkey.jpg" },
        { name: "Salmon/White Fish", image: "images/salmon.jpg" },
        { name: "Hard Cheeses", image: "images/cheese.jpg" },
      ],
      "lose-weight-build-muscle-no-restrictions": [
        {
          name: "Chicken Breast/Red Meats (90% lean/10% fat)/Turkey Breast/White Fish",
          image: "images/chicken.jpg",
        },
        { name: "Egg Whites", image: "images/eggwhites.png" },
        { name: "Rice", image: "images/rice.jpg" },
        { name: "Vegetables", image: "images/green.jpg" },
      ],
      "lose-weight-build-muscle-vegan": [
        { name: "Vegan Based Protein Shake", image: "images/shake.jpg" },
        { name: "Tofu", image: "images/tofu.jpg" },
        {
          name: "Almonds/Cashews/Peanuts/Hemp Seeds",
          image: "images/nuts.jpg",
        },
        { name: "Almond Butter", image: "images/almondbutter.jpg" },
      ],
      "lose-weight-build-muscle-low-carb": [
        { name: "Chicken Breast/Pork/Salmon", image: "images/chicken.jpg" },
        { name: "Leafy Greens", image: "images/green.jpg" },
        { name: "Egg Whites", image: "images/eggwhites.png" },
        { name: "Nuts and Seeds", image: "images/nuts.jpg" },
      ],
      "lose-weight-build-muscle-carnivore": [
        { name: "Red Meats (90% lean/10% fat)", image: "images/red.jpg" },
        { name: "Chicken Breast", image: "images/chicken.jpg" },
        { name: "Turkey", image: "images/turkey.jpg" },
        { name: "Salmon/White Fish", image: "images/salmon.jpg" },
        { name: "Hard Cheeses", image: "images/cheese.jpg" },
      ],
    };

    // Get the key for the current goal and diet combination
    const key = `${goal}-${diet}`;
    // Get the recommended foods based on the key or an empty array if not found
    const recommendedFoods = foods[key] || [];

    // Display the food list
    displayFoodList(recommendedFoods);
  }

  // Function to display the food list in the container
  function displayFoodList(foods) {
    // Clear the existing content in the food list container
    foodListContainer.innerHTML = "";

    // Iterate through each food and create list items with images
    foods.forEach((food) => {
      const listItem = document.createElement("li");
      listItem.textContent = food.name;

      const foodImage = document.createElement("img");
      foodImage.src = food.image;
      foodImage.alt = food.name;
      foodImage.className = "food-image";

      // Append the image to the list item
      listItem.appendChild(foodImage);
      // Append the list item to the food list container
      foodListContainer.appendChild(listItem);
    });
  }

  // Function to handle form submission
  window.handleFormSubmission = function (event) {
    // Prevent the default form submission
    event.preventDefault();
    // Update suggestions when the form is submitted
    updateSuggestions();
  };
});
