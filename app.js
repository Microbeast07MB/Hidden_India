/**
 * Hidden India - Core Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global Datasets
  const places = [
    {
      id: 1,
      name: 'Khejarli',
      type: 'Heritage',
      distance: '28 km',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85',
      blurb: 'A quiet village where 363 Bishnoi people gave their lives to protect the khejri trees.',
      tags: ['Crafts', 'Heritage'],
      x: '30%',
      y: '37%'
    },
    {
      id: 2,
      name: 'Ranakpur Forest',
      type: 'Nature',
      distance: '41 km',
      image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85',
      blurb: 'A green corridor of leopard country, marble temples, and slow village roads.',
      tags: ['Nature', 'Wildlife'],
      x: '66%',
      y: '27%'
    },
    {
      id: 3,
      name: 'Pipliyanagar',
      type: 'Food',
      distance: '62 km',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
      blurb: 'Join a family kitchen for smoky bajra rotis and recipes passed down seven generations.',
      tags: ['Food', 'Local life'],
      x: '51%',
      y: '62%'
    }
  ];

  const gems = [
    {
      id: 101,
      name: 'Flamingo Watch Point',
      type: 'Nature',
      distance: '6 km',
      score: 91,
      x: '18%',
      y: '38%',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=900&q=85',
      tags: ['Bird Watching', 'Photography'],
      blurb: 'A peaceful bird watching spot with flamingos in season. Less crowded and perfect for nature lovers.',
      crowd: 'Low',
      bestTime: '6 AM – 9 AM',
      timeNeeded: '60 – 90 mins',
      budget: '₹0 – ₹100',
      location: 'Nerul Lake, Navi Mumbai'
    },
    {
      id: 102,
      name: 'Kharghar Hills',
      type: 'Nature',
      distance: '14 km',
      score: 89,
      x: '36%',
      y: '18%',
      image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85',
      tags: ['Hiking', 'Views'],
      blurb: 'A green escape above the city with quiet trails and wide-open views.',
      crowd: 'Low',
      bestTime: '5:30 AM – 8:30 AM',
      timeNeeded: '2 – 3 hrs',
      budget: '₹0',
      location: 'Kharghar, Navi Mumbai'
    },
    {
      id: 103,
      name: 'Belapur Fort',
      type: 'Heritage',
      distance: '12 km',
      score: 86,
      x: '58%',
      y: '26%',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85',
      tags: ['Heritage', 'History'],
      blurb: 'A compact historic fort where layers of the old port city meet the modern skyline.',
      crowd: 'Low',
      bestTime: '4 PM – 6:30 PM',
      timeNeeded: '1 – 2 hrs',
      budget: '₹0',
      location: 'CBD Belapur, Navi Mumbai'
    },
    {
      id: 104,
      name: 'Shirvane Waterfall',
      type: 'Adventure',
      distance: '22 km',
      score: 84,
      x: '61%',
      y: '70%',
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=900&q=85',
      tags: ['Waterfall', 'Adventure'],
      blurb: 'A cool monsoon trail ending at a tucked-away cascade.',
      crowd: 'Low',
      bestTime: 'Monsoon Morning',
      timeNeeded: '3 – 4 hrs',
      budget: '₹100 – ₹300',
      location: 'Shirvane, Navi Mumbai'
    }
  ];

  // State
  let savedIds = JSON.parse(localStorage.getItem('hi_saved') || '[]');
  let tripIds = JSON.parse(localStorage.getItem('hi_trip') || '[]');
  let activeFilter = 'All places';
  let searchQuery = '';

  // Toast Notification System
  let toastTimer;
  window.showToast = function(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    const msgEl = toast.querySelector('.toast-msg') || toast;
    msgEl.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> ${message}`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  };

  // State Persist Helpers
  function toggleSave(id, name) {
    if (savedIds.includes(id)) {
      savedIds = savedIds.filter(item => item !== id);
      showToast(`Removed ${name || 'item'} from saved places`);
    } else {
      savedIds.push(id);
      showToast(`Saved ${name || 'item'} to your collection`);
    }
    localStorage.setItem('hi_saved', JSON.stringify(savedIds));
    updateSavedCounters();
    updateCardStates();
  }

  function toggleTrip(id, name) {
    if (tripIds.includes(id)) {
      tripIds = tripIds.filter(item => item !== id);
      showToast(`Removed ${name || 'item'} from your trip`);
    } else {
      tripIds.push(id);
      showToast(`Added ${name || 'item'} to your trip`);
    }
    localStorage.setItem('hi_trip', JSON.stringify(tripIds));
    updateSavedCounters();
    updateCardStates();
  }

  function updateSavedCounters() {
    const savedCountEls = document.querySelectorAll('.saved-count');
    savedCountEls.forEach(el => {
      el.textContent = savedIds.length || '';
    });
    const tripCountEls = document.querySelectorAll('.trip-count');
    tripCountEls.forEach(el => {
      el.textContent = tripIds.length ? `${tripIds.length} place${tripIds.length > 1 ? 's' : ''} in your trip` : 'A trip made around you';
    });
  }

  function updateCardStates() {
    document.querySelectorAll('[data-id]').forEach(el => {
      const id = parseInt(el.getAttribute('data-id'), 10);
      const isSaved = savedIds.includes(id);
      const saveBtn = el.querySelector('.save-btn');
      if (saveBtn) {
        if (isSaved) {
          saveBtn.classList.add('saved');
          saveBtn.setAttribute('fill', 'currentColor');
        } else {
          saveBtn.classList.remove('saved');
          saveBtn.setAttribute('fill', 'none');
        }
      }
    });
  }

  // Index Page Dynamic Explorer Filtering
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderPlaces();
    });
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'All places';
      renderPlaces();
    });
  });

  function renderPlaces() {
    const container = document.getElementById('places-recommendations');
    if (!container) return;

    const filtered = places.filter(p => {
      const matchesFilter = activeFilter === 'All places' || p.tags.includes(activeFilter) || p.type === activeFilter;
      const matchesQuery = !searchQuery || p.name.toLowerCase().includes(searchQuery) || p.blurb.toLowerCase().includes(searchQuery);
      return matchesFilter && matchesQuery;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<p class="empty-state">No places match that search yet. Try a wider feeling.</p>`;
      return;
    }

    container.innerHTML = filtered.map(p => {
      const isSaved = savedIds.includes(p.id);
      return `
        <article class="place-card" data-id="${p.id}" onclick="openPlaceModal(${p.id})">
          <img src="${p.image}" alt="${p.name}">
          <div class="place-card-content">
            <div class="place-card-top">
              <span class="place-type">${p.type}</span>
              <button class="save-btn ${isSaved ? 'saved' : ''}" aria-label="Save ${p.name}" onclick="event.stopPropagation(); window.toggleSave(${p.id}, '${p.name}')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              </button>
            </div>
            <h4>${p.name}</h4>
            <p>${p.blurb}</p>
            <span class="distance-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${p.distance} away
            </span>
          </div>
        </article>
      `;
    }).join('');

    // Update Map Pins Visibility
    document.querySelectorAll('.map-pin[data-id]').forEach(pin => {
      const id = parseInt(pin.getAttribute('data-id'), 10);
      const exists = filtered.some(p => p.id === id);
      pin.style.display = exists ? 'block' : 'none';
    });
  }

  // Modals Controller
  window.openPlaceModal = function(id) {
    const item = places.find(p => p.id === id) || gems.find(g => g.id === id);
    if (!item) return;

    const modalBackdrop = document.getElementById('place-modal-backdrop');
    if (!modalBackdrop) return;

    const isTrip = tripIds.includes(item.id);

    modalBackdrop.querySelector('.modal-body').innerHTML = `
      <div class="place-modal">
        <button class="modal-close" onclick="closePlaceModal()" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <img src="${item.image}" alt="${item.name}">
        <div class="modal-content">
          <p class="eyebrow">${item.type} · ${item.distance} from you</p>
          <h2>${item.name}</h2>
          <p>${item.blurb}</p>
          <div class="modal-tags">
            ${item.tags ? item.tags.map(t => `<span>${t}</span>`).join('') : ''}
          </div>
          <button class="dark-button full" onclick="window.toggleTrip(${item.id}, '${item.name}'); closePlaceModal();">
            ${isTrip ? '✓ Added to your trip' : '+ Add to my trip'}
          </button>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('active');
  };

  window.closePlaceModal = function() {
    const modalBackdrop = document.getElementById('place-modal-backdrop');
    if (modalBackdrop) modalBackdrop.classList.remove('active');
  };

  window.openPrefsModal = function() {
    const prefsBackdrop = document.getElementById('prefs-modal-backdrop');
    if (prefsBackdrop) prefsBackdrop.classList.add('active');
  };

  window.closePrefsModal = function() {
    const prefsBackdrop = document.getElementById('prefs-modal-backdrop');
    if (prefsBackdrop) prefsBackdrop.classList.remove('active');
  };

  // Preference selection toggle
  document.querySelectorAll('.pref-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');
    });
  });

  // Discover Page Logic
  window.selectGem = function(id) {
    const gem = gems.find(g => g.id === id);
    if (!gem) return;

    // Update active pin marker
    document.querySelectorAll('.gem-marker').forEach(m => m.classList.remove('active'));
    const targetMarker = document.querySelector(`.gem-marker[data-id="${id}"]`);
    if (targetMarker) targetMarker.classList.add('active');

    // Update Selected Detail Rail Card
    const detailRail = document.getElementById('selected-gem-card');
    if (detailRail) {
      const isSaved = savedIds.includes(gem.id);
      const isTrip = tripIds.includes(gem.id);

      detailRail.innerHTML = `
        <div class="selected-image">
          <img src="${gem.image}" alt="${gem.name}">
          <span>✦ Top Pick</span>
          <button class="heart-btn" onclick="window.toggleSave(${gem.id}, '${gem.name}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
        <div class="selected-content">
          <div class="selected-title">
            <h2>${gem.name}</h2>
            <strong>${gem.score}/100<small>Hidden Score</small></strong>
          </div>
          <p><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${gem.location} · ${gem.distance} from you</p>
          <div class="tags">
            <span>${gem.type}</span>
            ${gem.tags.map(t => `<span>${t}</span>`).join('')}
          </div>
          <div class="why">
            <strong>✦ Why we recommend this?</strong>
            <p>${gem.blurb}</p>
          </div>
          <div class="facts">
            <span>♧<b>${gem.crowd}</b><small>Crowd Level</small></span>
            <span>☼<b>${gem.bestTime}</b><small>Best Time</small></span>
            <span>◷<b>${gem.timeNeeded}</b><small>Time Needed</small></span>
            <span>₹<b>${gem.budget}</b><small>Budget</small></span>
          </div>
          <div class="detail-actions">
            <button class="discover-button" onclick="showToast('Opening full guide for ${gem.name}')">Explore Details</button>
            <button class="add-button" onclick="window.toggleTrip(${gem.id}, '${gem.name}')">
              ${isTrip ? '✓ Added' : '+ Add to Trip'}
            </button>
          </div>
        </div>
      `;
    }
  };

  // Choice grid selectors (Radius, Time, Budget)
  document.querySelectorAll('.choice-grid button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parent = btn.closest('.choice-grid');
      parent.querySelectorAll('button').forEach(b => b.classList.remove('chosen'));
      btn.classList.add('chosen');
    });
  });

  // Global functions attached to window
  window.toggleSave = toggleSave;
  window.toggleTrip = toggleTrip;

  // Initialize
  updateSavedCounters();
  renderPlaces();
});
