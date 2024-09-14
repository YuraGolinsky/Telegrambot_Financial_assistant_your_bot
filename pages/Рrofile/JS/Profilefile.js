document.addEventListener("DOMContentLoaded", () => {
    const profileSelect = document.getElementById("profileSelect");
    const profileModal = document.getElementById("profileModal");
    const passwordModal = document.getElementById("passwordModal");
    const editProfileBtn = document.getElementById("editProfileBtn");
    const changePasswordBtn = document.getElementById("changePasswordBtn");
    const closeProfileModal = document.getElementById("closeProfileModal");
    const closePasswordModal = document.getElementById("closePasswordModal");
  
    // Load profiles into the select box
    fetch("/Monances-main/pages/Рrofile/profile.json")
      .then(response => response.json())
      .then(data => {
        data.forEach(profile => {
          const option = document.createElement("option");
          option.value = profile.id;
          option.text = profile.name;
          profileSelect.add(option);
        });
      })
      .catch(error => console.error("Error loading profiles:", error));
  
    profileSelect.addEventListener("change", () => {
      const profileId = profileSelect.value;
      if (profileId) {
        // Prompt for password
        const password = prompt("Please enter the profile password:");
        fetch("/Monances-main/LoginRegistration.json")
          .then(response => response.json())
          .then(credentials => {
            if (credentials.Yura === password) { // Replace 'Yura' with dynamic username
              // Load profile data
              fetch("/Monances-main/pages/Рrofile/profile.json")
                .then(response => response.json())
                .then(data => {
                  const profile = data.find(p => p.id === profileId);
                  if (profile) {
                    document.getElementById("displayProfileImage").src = profile.image;
                    document.getElementById("displayName").textContent = profile.name;
                    document.getElementById("displayBio").textContent = profile.bio;
                    document.getElementById("displayAge").textContent = "Age: " + profile.age;
                  }
                })
                .catch(error => console.error("Error loading profile:", error));
            } else {
              alert("Incorrect password");
            }
          })
          .catch(error => console.error("Error loading credentials:", error));
      }
    });
  
    // Show profile modal
    editProfileBtn.addEventListener("click", () => {
      profileModal.style.display = "block";
    });
  
    // Show password modal
    changePasswordBtn.addEventListener("click", () => {
      passwordModal.style.display = "block";
    });
  
    // Close modals
    closeProfileModal.addEventListener("click", () => {
      profileModal.style.display = "none";
    });
    
    closePasswordModal.addEventListener("click", () => {
      passwordModal.style.display = "none";
    });
  });
  