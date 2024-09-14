<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profile Setup - Money Manager Pro</title>
  <link rel="stylesheet" href="/Monances-main/pages/Dashboard/styles/global.css">
  <link rel="stylesheet" href="/Monances-main/pages/Dashboard/styles/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="/Monances-main/pages/Рrofile/styles/Form.css">
  <link rel="stylesheet" href="/Monances-main/pages/Рrofile/styles/validatePassword.css">
  <link rel="stylesheet" href="/Monances-main/pages/Рrofile/styles/Modal2.css">

</head>
<body>
  <div class="container">
    <!-- Sidebar -->
    <aside>
      <div class="top">
        <div class="logo">
          <img src="/Monances-main/pages/Рrofile/img/Financial services.png" alt="Logo">
          <h3>Finance Manager</h3>
        </div>
      </div>
      
      <div class="sidebar">
        <a href="/Monances-main/pages/Dashboard/dashboard.php">
          <span class="icon">📊</span>
          <span>Dashboard</span>
        </a>
        <a href="/Monances-main/pages/Accumulations/accumulations.php">
          <span class="icon">💰</span>
          <span>Accumulations</span>
        </a>
        <a href="/Monances-main/pages/Profile/profile.php">
          <span class="icon">👤</span>
          <span>Profile Setup</span>
        </a>
        <a href="https://t.me/Yura_Golinsky">
          <span class="icon">📞</span>
          <span>Contact</span>
        </a>
        <a href="/Monances-main/index.php">
          <span class="icon">🚪</span>
          <span>Exit</span>
        </a>
      </div>
    </aside>

    <div class="profile-card">
      <h2>Profile</h2>
      <img src="/Monances-main/pages/Рrofile/img/profile.png" id="displayProfileImage" alt="Profile Image">
      <h3 id="displayName">Your Name</h3>
      <p id="displayBio">Your bio goes here.</p>
      <p id="displayAge">Age: </p>
      <select id="profileSelect">
        <option value="">Select Profile</option>
        <!-- Options will be added dynamically -->
      </select>
      <button id="editProfileBtn">Edit Profile</button>
      <button id="changePasswordBtn">Change Password</button>
    </div>

    <!-- Profile Modal -->
    <div id="profileModal" class="modal">
      <div class="modal-content">
        <span class="close" id="closeProfileModal">&times;</span>
        <form id="profileForm">
          <img src="/Monances-main/pages/Рrofile/img/profile.png" id="profileImage" alt="Profile Image">
          <input type="file" id="imageUpload" accept="image/*">
          <input type="text" id="name" placeholder="Name" required>
          <textarea id="bio" placeholder="Bio"></textarea>
          <input type="number" id="age" placeholder="Age">
          <input type="hidden" id="password" name="password" value="">
          <button type="submit">Save</button>
        </form>
      </div>
    </div>

    <!-- Change Password Modal -->
    <div id="passwordModal" class="modal">
      <div class="modal-content">
        <span class="close" id="closePasswordModal">&times;</span>
        <form id="passwordForm">
          <input type="text" id="username" placeholder="Username" required>
          <input type="password" id="currentPassword" placeholder="Current Password" required>
          <input type="password" id="newPassword" placeholder="New Password" required>
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  </div>
  
  <script src="/Monances-main/pages/Рrofile/JS/change_password.js"></script>
  <script src="/Monances-main/pages/Рrofile/JS/profile.js"></script>
  <script src="/Monances-main/pages/Рrofile/JS/Profilefile.js"></script>

</body>
</html>
