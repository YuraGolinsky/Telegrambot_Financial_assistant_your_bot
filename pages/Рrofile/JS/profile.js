document.getElementById('editProfileBtn').addEventListener('click', function() {
    document.getElementById('profileModal').style.display = 'block';
});

document.querySelector('#profileModal .close').addEventListener('click', function() {
    document.getElementById('profileModal').style.display = 'none';
});

document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;
    const age = document.getElementById('age').value;
    const profileImage = document.getElementById('imageUpload').files[0];
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('age', age);
    if (profileImage) formData.append('profileImage', profileImage);
    
    fetch('/Monances-main/pages/Рrofile/save_profile.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Обновляем отображаемое изображение и данные профиля
            if (profileImage) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('displayProfileImage').src = e.target.result;
                };
                reader.readAsDataURL(profileImage);
            }
            document.getElementById('displayName').textContent = name;
            document.getElementById('displayBio').textContent = bio;
            document.getElementById('displayAge').textContent = `Age: ${age}`;
            document.getElementById('profileModal').style.display = 'none';
        } else {
            alert('Failed to save profile');
        }
    });
});
