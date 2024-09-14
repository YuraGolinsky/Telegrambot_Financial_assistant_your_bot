document.addEventListener('DOMContentLoaded', () => {
    const creatorFilter = document.getElementById('creatorFilter');
    const cardContainer = document.getElementById('cardContainer');
  
    // Fetch data from JSON file
    fetch('/Monances-main/pages/Accumulations/accumulations.json')
      .then(response => response.json())
      .then(data => {
        const creators = new Set();
        
        // Collect unique creators
        data.forEach(item => {
          if (item.creator) {
            creators.add(item.creator);
          }
        });
  
        // Populate combobox with unique creators
        creators.forEach(creator => {
          const option = document.createElement('option');
          option.value = creator;
          option.textContent = creator;
          creatorFilter.appendChild(option);
        });
  
        // Display cards based on selected creator
        creatorFilter.addEventListener('change', (e) => {
          const selectedCreator = e.target.value;
          const filteredData = selectedCreator ? 
            data.filter(item => item.creator === selectedCreator) :
            [];
          displayCards(filteredData);
        });
      })
      .catch(error => console.error('Error loading JSON data:', error));
  
    // Function to display cards
    function displayCards(data) {
      cardContainer.innerHTML = ''; // Clear existing cards
      if (data.length === 0) {
        cardContainer.innerHTML = '<p>No cards available for this creator.</p>';
      } else {
        data.forEach(item => {
          const card = document.createElement('div');
          card.className = 'card';
  
          const img = document.createElement('img');
          img.src = item.photo;
          card.appendChild(img);
  
          const title = document.createElement('h3');
          title.textContent = item.title;
          card.appendChild(title);
  
          const goal = document.createElement('p');
          goal.textContent = `Goal: ${item.goal} ${item.currency}`;
          card.appendChild(goal);
  
          const saved = document.createElement('p');
          saved.textContent = `Saved: ${item.saved} ${item.currency}`;
          card.appendChild(saved);
  
          const date = document.createElement('p');
          date.textContent = `Date: ${item.date || 'N/A'}`;
          card.appendChild(date);
  
          const creator = document.createElement('p');
          creator.textContent = `Creator: ${item.creator}`;
          card.appendChild(creator);
  
          cardContainer.appendChild(card);
        });
      }
    }
});
