document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/Monances-main/pages/Рrofile/change_password.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if (xhr.status === 200) {
        alert(xhr.responseText);
      } else {
        alert('An error occurred. Please try again.');
      }
    };
    xhr.send(`Username=${username}&CurrentPassword=${currentPassword}&NewPassword=${newPassword}`);
  });

  document.getElementById('closePasswordModal').onclick = function() {
    document.getElementById('passwordModal').style.display = 'none';
  };