document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("workoutForm");
  console.log("testing");
  const suggestedWorkoutsContainer = document.getElementById(
    "suggestedWorkoutsList"
  );

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("testing");
    const goals = document
      .getElementById("goals")
      .value.toLowerCase()
      .replace(/\s+/g, "");
    console.log(goals);
    const workoutType = document
      .getElementById("workout-type")
      .value.toLowerCase()
      .replace(/\s+/g, "");
    console.log(workoutType);
    const suggestedWorkouts = getSuggestedWorkouts(goals, workoutType);

    displaySuggestedWorkouts(suggestedWorkouts);
  });

  function getSuggestedWorkouts(goals, workoutType) {
    // Paths updated to reflect the location of images
    const suggestedWorkouts = {
      "gain strength-strength-training": [
        {
          name: "PPL (Push/Pull/Legs)",
          image: "images/ppl.png",
          repRange: "3-4 reps",
        },
        {
          name: "Arnold Split",
          image: "images/arnold.webp",
          repRange: "3-4 reps",
        },
        {
          name: "Hybrid Split (PPL x Arnold)",
          image: "images/hybrid.jpg",
          repRange: "3-4 reps",
        },
      ],
      "gain strength-bodybuilding": [
        {
          name: "PPL (Push/Pull/Legs)",
          image: "images/ppl.png",
          repRange: "til failure",
        },
        {
          name: "Arnold Split",
          image: "images/arnold.webp",
          repRange: "til failure",
        },
        {
          name: "Hybrid Split (PPL x Arnold)",
          image: "images/hybrid.jpg",
          repRange: "til failure",
        },
      ],
      "gain strength-aerobic": [
        { name: "Bro Split", image: "images/bro.jpg", repRange: "10-12 reps" },
        {
          name: "Upper/Lower Split",
          image: "images/UL.jpg",
          repRange: "10-12 reps",
        },
        {
          name: "PPL (Push/Pull/Legs)",
          image: "images/ppl.png",
          repRange: "10-12 reps",
        },
      ],
      "gain strength-calisthenics": [
        {
          name: "Calisthenics Split",
          image: "images/calisthenics.jpg",
          repRange: "high reps of body weight",
        },
      ],
      "tone-strength-training": [
        {
          name: "PPL (Push/Pull/Legs)",
          image: "images/ppl.png",
          repRange: "8-10 reps",
        },
        {
          name: "Arnold Split",
          image: "images/arnold.webp",
          repRange: "8-10 reps",
        },
        {
          name: "Hybrid Split (PPL x Arnold)",
          image: "images/hybrid.jpg",
          repRange: "8-10 reps",
        },
      ],
      "tone-body-building": [
        {
          name: "PPL (Push/Pull/Legs)",
          image: "images/ppl.png",
          repRange: "til failure",
        },
        {
          name: "Arnold Split",
          image: "images/arnold.webp",
          repRange: "til failure",
        },
        {
          name: "Hybrid Split (PPL x Arnold)",
          image: "images/hybrid.jpg",
          repRange: "til failure",
        },
      ],
      "tone-aerobic": [
        {
          name: "Full Body Split",
          image: "images/fullbody.jpg",
          repRange: "10-12 reps",
        },
        { name: "Bro Split", image: "images/bro.jpg", repRange: "10-12 reps" },
        {
          name: "Upper/Lower Split",
          image: "images/UL.jpg",
          repRange: "10-12 reps",
        },
      ],
      "tone-calisthenics": [
        {
          name: "Calisthenics Split",
          image: "images/calisthenics.jpg",
          repRange: "high reps of body weight",
        },
      ],
      "lose weight-strength-training": [
        {
          name: "PPL (Push/Pull/Legs)",
          image: "images/ppl.png",
          repRange: "6-8 reps",
        },
        {
          name: "Hybrid Split (PPL x Arnold)",
          image: "images/hybrid.jpg",
          repRange: "6-8 reps",
        },
        {
          name: "Upper/Lower Split",
          image: "images/UL.jpg",
          repRange: "6-8 reps",
        },
      ],
      "lose weight-bodybuilding": [
        {
          name: "PPL (Push/Pull/Legs)",
          image: "images/ppl.png",
          repRange: "til failure",
        },
        {
          name: "Arnold Split",
          image: "images/arnold.webp",
          repRange: "til failure",
        },
        {
          name: "Hybrid Split (PPL x Arnold)",
          image: "images/hybrid.jpg",
          repRange: "til failure",
        },
      ],
      "lose weight-aerobic": [
        {
          name: "Full Body Split",
          image: "images/fullbody.jpg",
          repRange: "10-12 reps",
        },
        { name: "Bro Split", image: "images/bro.jpg", repRange: "10-12 reps" },
      ],
      "lose weight-calisthenics": [
        {
          name: "Calisthenics Split",
          image: "images/calisthenics.jpg",
          repRange: "high reps of body weight",
        },
      ],
    };

    const workoutKey = goals + "-" + workoutType;
    return suggestedWorkouts[workoutKey] || [];
  }

  function displaySuggestedWorkouts(workouts) {
    suggestedWorkoutsContainer.innerHTML = "";

    workouts.forEach((workout) => {
      const workoutItem = document.createElement("li");
      workoutItem.className = "list-group-item";

      const workoutCard = document.createElement("div");
      workoutCard.className = "card mb-3";

      const workoutImage = document.createElement("img");
      workoutImage.src = workout.image;
      workoutImage.alt = workout.name;
      workoutImage.className = "card-img-top";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const workoutName = document.createElement("h5");
      workoutName.className = "card-title";
      workoutName.textContent = workout.name;

      const repRange = document.createElement("p");
      repRange.className = "card-text";
      repRange.textContent = "Rep Range: " + workout.repRange;

      cardBody.appendChild(workoutName);
      cardBody.appendChild(repRange);

      workoutCard.appendChild(workoutImage);
      workoutCard.appendChild(cardBody);

      workoutItem.appendChild(workoutCard);
      suggestedWorkoutsContainer.appendChild(workoutItem);
    });
  }
});
