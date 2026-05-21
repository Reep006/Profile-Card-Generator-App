const form = document.getElementById("profileForm");
const cardName = document.getElementById("cardName");
const cardBio = document.getElementById("cardBio");
const cardImage = document.getElementById("cardImage");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Get Input Values
  const name = document.getElementById("name").value.trim();
  const bio = document.getElementById("bio").value.trim();
  const image = document.getElementById("image").value.trim();
  // Validation
  if (!name || !bio || !image) {
    alert("All fields are required!");
    return;
  }
  // Button Loading State
  const button = document.querySelector("button");
  button.innerText = "Generating...";
  button.disabled = true;
  try {
    // Send Data To Backend
    const response = await fetch(
      "https://profile-card-generator-app.onrender.com/create-profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          bio,
          image,
        }),
      }
    );
    // Convert Response
    const data = await response.json();
    // Success Response
    if (data.success) {
      cardName.textContent = data.profile.fullName;
      cardBio.textContent = data.profile.description;
      cardImage.src = data.profile.profileImage;
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Server Error!");
  } finally {
    // Reset Button
    button.innerText = "Generate Profile";
    button.disabled = false;
  }
});