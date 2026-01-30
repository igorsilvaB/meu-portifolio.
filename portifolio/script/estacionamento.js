const PARKING_SPOTS = 50;
const PRICE_PER_HOUR = 10;

let currentUser = null;
let isAdminMode = false;
let parkingData = [];
let reservations = [];
let users = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', reservations: 3, active: true },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', reservations: 5, active: true },
  { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', reservations: 2, active: true },
  { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', reservations: 1, active: false }
];

function initParkingData() {
  parkingData = [];
  const sections = ['A', 'B', 'C', 'D', 'E'];
  
  for (let i = 0; i < PARKING_SPOTS; i++) {
    const section = sections[Math.floor(i / 10)];
    const number = String(i % 10 + 1).padStart(2, '0');
    const random = Math.random();
    
    parkingData.push({
      id: i + 1,
      number: `${section}-${number}`,
      status: random > 0.6 ? 'available' : random > 0.3 ? 'occupied' : 'reserved',
      user: random <= 0.3 && random > 0.15 ? 'Você' : null
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initParkingData();
  setupEventListeners();
});

function setupEventListeners() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  const userModeBtn = document.getElementById('user-mode');
  const adminModeBtn = document.getElementById('admin-mode');
  
  if (userModeBtn) {
    userModeBtn.addEventListener('click', () => {
      userModeBtn.classList.add('active');
      adminModeBtn.classList.remove('active');
      isAdminMode = false;
    });
  }

  if (adminModeBtn) {
    adminModeBtn.addEventListener('click', () => {
      adminModeBtn.classList.add('active');
      userModeBtn.classList.remove('active');
      isAdminMode = true;
    });
  }

  const reservationForm = document.getElementById('reservation-form');
  if (reservationForm) {
    reservationForm.addEventListener('submit', handleReservation);
  }

  const durationInput = document.getElementById('duration');
  if (durationInput) {
    durationInput.addEventListener('input', updateReservationPrice);
  }
}

function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Por favor, preencha todos os campos');
    return;
  }

  currentUser = {
    name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
    email: email
  };

  const loginScreen = document.getElementById('login-screen');
  loginScreen.classList.remove('active');

  if (isAdminMode) {
    showAdminDashboard();
  } else {
    showUserDashboard();
  }
}

function showUserDashboard() {
  const userDashboard = document.getElementById('user-dashboard');
  userDashboard.classList.add('active');
  
  document.getElementById('user-name').textContent = currentUser.name;
  
  renderParkingGrid('parking-grid');
  renderUserReservations();
}

function showAdminDashboard() {
  const adminDashboard = document.getElementById('admin-dashboard');
  adminDashboard.classList.add('active');
  
  renderParkingGrid('admin-parking-grid');
  updateAdminStats();
  renderReservationsTable();
  renderUsersTable();
}

function renderParkingGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  parkingData.forEach(spot => {
    const spotElement = document.createElement('div');
    spotElement.className = `parking-spot ${spot.status}`;
    spotElement.innerHTML = `
      <div class="spot-number">${spot.number}</div>
      <div class="spot-status">${getStatusLabel(spot.status)}</div>
    `;
    
    if (spot.status === 'available' && !isAdminMode) {
      spotElement.addEventListener('click', () => selectSpot(spot));
    }
    
    container.appendChild(spotElement);
  });
}

function getStatusLabel(status) {
  const labels = {
    available: 'Livre',
    occupied: 'Ocupada',
    reserved: 'Reservada'
  };
  return labels[status] || status;
}

function selectSpot(spot) {
  showReservationModal(spot);
}

function showReservationModal(spot = null) {
  const modal = document.getElementById('reservation-modal');
  const spotSelect = document.getElementById('spot-select');
  
  spotSelect.innerHTML = '<option value="">Escolha uma vaga disponível</option>';
  
  parkingData.filter(s => s.status === 'available').forEach(s => {
    const option = document.createElement('option');
    option.value = s.number;
    option.textContent = `Vaga ${s.number}`;
    if (spot && s.number === spot.number) {
      option.selected = true;
    }
    spotSelect.appendChild(option);
  });
  
  updateReservationPrice();
  modal.classList.add('active');
}

function closeReservationModal() {
  const modal = document.getElementById('reservation-modal');
  modal.classList.remove('active');
  document.getElementById('reservation-form').reset();
}

function updateReservationPrice() {
  const duration = parseInt(document.getElementById('duration').value) || 2;
  const price = duration * PRICE_PER_HOUR;
  document.getElementById('reservation-price').textContent = price.toFixed(2);
}

function handleReservation(e) {
  e.preventDefault();
  
  const spotNumber = document.getElementById('spot-select').value;
  const duration = parseInt(document.getElementById('duration').value);
  
  if (!spotNumber) {
    alert('Por favor, selecione uma vaga');
    return;
  }
  
  const spot = parkingData.find(s => s.number === spotNumber);
  if (spot) {
    spot.status = 'reserved';
    spot.user = 'Você';
    
    const reservation = {
      id: Date.now(),
      spot: spotNumber,
      duration: duration,
      price: duration * PRICE_PER_HOUR,
      time: new Date(),
      user: currentUser.name
    };
    
    reservations.push(reservation);
    
    closeReservationModal();
    renderParkingGrid('parking-grid');
    renderUserReservations();
    showConfirmationModal(reservation);
    
    if (isAdminMode) {
      updateAdminStats();
      renderReservationsTable();
    }
  }
}

function showConfirmationModal(reservation) {
  const modal = document.getElementById('confirmation-modal');
  const endTime = new Date(reservation.time.getTime() + reservation.duration * 60 * 60 * 1000);
  
  document.getElementById('confirmed-spot').textContent = reservation.spot;
  document.getElementById('confirmed-duration').textContent = reservation.duration;
  document.getElementById('confirmed-price').textContent = reservation.price.toFixed(2);
  document.getElementById('confirmed-time').textContent = endTime.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  modal.classList.add('active');
}

function closeConfirmationModal() {
  const modal = document.getElementById('confirmation-modal');
  modal.classList.remove('active');
}

function renderUserReservations() {
  const container = document.getElementById('user-reservations');
  if (!container) return;
  
  const userReservations = reservations.filter(r => r.user === currentUser.name);
  
  if (userReservations.length === 0) {
    container.innerHTML = '<p class="empty-state">Você não tem reservas ativas</p>';
    return;
  }
  
  container.innerHTML = userReservations.map(r => `
    <div class="reservation-card">
      <div class="reservation-header">
        <div class="reservation-spot">Vaga ${r.spot}</div>
        <div class="reservation-time">${r.duration}h</div>
      </div>
      <div class="reservation-details">
        Valor: R$ ${r.price.toFixed(2)} • Início: ${r.time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  `).join('');
}

function updateAdminStats() {
  const total = parkingData.length;
  const available = parkingData.filter(s => s.status === 'available').length;
  const occupied = parkingData.filter(s => s.status === 'occupied').length;
  const reserved = parkingData.filter(s => s.status === 'reserved').length;
  
  document.getElementById('total-spots').textContent = total;
  document.getElementById('available-spots').textContent = available;
  document.getElementById('occupied-spots').textContent = occupied + reserved;
  document.getElementById('active-users').textContent = users.filter(u => u.active).length;
}

function renderReservationsTable() {
  const tbody = document.getElementById('reservations-table');
  if (!tbody) return;
  
  if (reservations.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #666;">Nenhuma reserva ativa</td></tr>';
    return;
  }
  
  tbody.innerHTML = reservations.map(r => `
    <tr>
      <td>${r.user}</td>
      <td>${r.spot}</td>
      <td>${r.time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
      <td><span class="status-badge active">Ativa</span></td>
      <td>
        <div class="table-actions">
          <button class="btn-action" onclick="viewReservation(${r.id})">Ver</button>
          <button class="btn-action danger" onclick="cancelReservation(${r.id})">Cancelar</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderUsersTable() {
  const tbody = document.getElementById('users-table');
  if (!tbody) return;
  
  tbody.innerHTML = users.map(u => `
    <tr>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.reservations}</td>
      <td><span class="status-badge ${u.active ? 'active' : 'inactive'}">${u.active ? 'Ativo' : 'Inativo'}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn-action" onclick="viewUser(${u.id})">Ver</button>
          <button class="btn-action" onclick="editUser(${u.id})">Editar</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function showAdminSection(section) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  
  document.getElementById(`admin-${section}`).classList.add('active');
  event.target.closest('.sidebar-item').classList.add('active');
}

function viewReservation(id) {
  const reservation = reservations.find(r => r.id === id);
  if (reservation) {
    alert(`Reserva:\nVaga: ${reservation.spot}\nUsuário: ${reservation.user}\nDuração: ${reservation.duration}h\nValor: R$ ${reservation.price.toFixed(2)}`);
  }
}

function cancelReservation(id) {
  if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
      const spot = parkingData.find(s => s.number === reservation.spot);
      if (spot) {
        spot.status = 'available';
        spot.user = null;
      }
      
      reservations = reservations.filter(r => r.id !== id);
      
      renderReservationsTable();
      updateAdminStats();
      renderParkingGrid('admin-parking-grid');
    }
  }
}

function viewUser(id) {
  const user = users.find(u => u.id === id);
  if (user) {
    alert(`Usuário:\nNome: ${user.name}\nEmail: ${user.email}\nReservas: ${user.reservations}\nStatus: ${user.active ? 'Ativo' : 'Inativo'}`);
  }
}

function editUser(id) {
  alert('Funcionalidade de edição em desenvolvimento');
}

function logout() {
  if (confirm('Deseja realmente sair?')) {
    currentUser = null;
    isAdminMode = false;
    
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('login-screen').classList.add('active');
    
    document.getElementById('login-form').reset();
  }
}

window.showReservationModal = showReservationModal;
window.closeReservationModal = closeReservationModal;
window.closeConfirmationModal = closeConfirmationModal;
window.showAdminSection = showAdminSection;
window.viewReservation = viewReservation;
window.cancelReservation = cancelReservation;
window.viewUser = viewUser;
window.editUser = editUser;
window.logout = logout;
