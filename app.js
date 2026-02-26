// --- 1. MATRICEA DE DATE COMPLETĂ (BAZA DE DATE LOCALĂ) ---
const itineraryData = [
    { 
        id: "z1-1", day: "Ziua 1", time: "09:15", title: "Aterizare & Check-in", 
        desc: "Aterizare Orly. Metrou M14 la Saint-Lazare, transfer L13 la Les Agnettes.",
        fullDetails: "Logistica: Căutăm indicatoarele M14 imediat după bagaje. Navigo se validează la intrare. Cazare la 11:30, pauză 30 min pentru refresh." 
    },
    { 
        id: "z1-2", day: "Ziua 1", time: "13:15", title: "Galeries Lafayette & Opéra", 
        desc: "Admirarea cupolei și poze pe acoperiș. Arhitectura exterioară a Operei.",
        fullDetails: "Accesul pe acoperiș este gratuit. Prindem cadre haussmanniene de sus, apoi mergem spre Opera Garnier." 
    },
    { 
        id: "z1-3", day: "Ziua 1", time: "15:30", title: "Piramida Louvre", 
        desc: "Plimbare elegantă pe Avenue de l'Opéra și ședință foto la Piramidă.",
        fullDetails: "Mergem pe jos 15 min. La Piramidă căutăm unghiul perfect folosind treptele din curtea interioară." 
    },
    { 
        id: "z1-4", day: "Ziua 1", time: "17:00", title: "Jardin des Tuileries", 
        desc: "Pauză de cafea/macarons. Plimbare până în Place de la Concorde.",
        fullDetails: "Luăm ceva dulce și ne așezăm pe scaunele verzi lângă fântâni. O primă pauză chic." 
    },
    { 
        id: "z1-5", day: "Ziua 1", time: "18:30", title: "Pont Alexandre III", 
        desc: "Apusul pe cel mai elegant pod. Fotografii cu Turnul Eiffel iluminat.",
        fullDetails: "Sincronizare cu apusul. Trebuie să fim pe pod când se aprind primele lumini ale turnului." 
    },
    { 
        id: "z1-6", day: "Ziua 1", time: "20:00", title: "Cina Invalides", 
        desc: "Cină la un bistro local. Întoarcere cu Linia 13 la Les Agnettes.",
        fullDetails: "După cină, stația Invalides -> Linia 13 spre nord (Les Courtilles). Traseu direct." 
    },
    { 
        id: "z2-1", day: "Ziua 2", time: "09:30", title: "Trocadéro", 
        desc: "Ședință foto matinală pe esplanadă. Coborâre la baza turnului.",
        fullDetails: "Ne trezim devreme pentru a avea esplanada liberă. Lumina dimineții este ideală." 
    },
    { 
        id: "z2-2", day: "Ziua 2", time: "12:00", title: "La Galerie Dior", 
        desc: "30 Avenue Montaigne. Istoria casei de modă și scara iconică.",
        fullDetails: "Bilete reduse de student. Punct cheie: scara masivă cu miniaturi aranjate cromatic." 
    },
    { 
        id: "z2-3", day: "Ziua 2", time: "14:30", title: "Prânz Champs-Élysées", 
        desc: "Braserie chic pentru refacerea energiei.",
        fullDetails: "Oprim la o braserie pe străduțele adiacente pentru un vibe autentic, nu turistic." 
    },
    { 
        id: "z2-4", day: "Ziua 2", time: "16:00", title: "Sacré-Cœur & Montmartre", 
        desc: "Zidul Iubirii, Place du Tertre. Apusul pe treptele basilicii.",
        fullDetails: "Folosim liftul la stația Abbesses. Ne pierdem prin Place du Tertre și încheiem ziua pe iarbă la Sacré-Cœur." 
    },
    { 
        id: "z2-5", day: "Ziua 2", time: "20:00", title: "Cina Montmartre", 
        desc: "Cină romantică la lumina lumânărilor. Întoarcere L12 -> L13.",
        fullDetails: "Bistro mic lângă La Maison Rose. Retragerea se face via Saint-Lazare." 
    },
    { 
        id: "z3-1", day: "Ziua 3", time: "09:00", title: "Interior Louvre", 
        desc: "Acces gratuit rezervat. Capodoperele și Apartamentele lui Napoleon.",
        fullDetails: "Aripa Richelieu pentru apartamentele regale (candelabre, catifea), apoi Mona Lisa." 
    },
    { 
        id: "z3-2", day: "Ziua 3", time: "13:30", title: "Cartierul Latin", 
        desc: "Traversare Pont des Arts. Prânz tradițional pe malul stâng.",
        fullDetails: "Meniu tradițional: supă de ceapă sau quiche într-o atmosferă boemă." 
    },
    { 
        id: "z3-3", day: "Ziua 3", time: "15:00", title: "Notre Dame & Librărie", 
        desc: "Admirarea catedralei și vizită la Shakespeare and Co.",
        fullDetails: "Catedrala după reconstrucție și răsfoit cărți vintage în decorul iconic de film." 
    },
    { 
        id: "z3-4", day: "Ziua 3", time: "16:30", title: "Le Marais", 
        desc: "Shopping boutique & vintage. Relaxare în Place des Vosges.",
        fullDetails: "Zona supremă de shopping. Final de zi în cea mai veche piață din Paris." 
    },
    { 
        id: "z3-5", day: "Ziua 3", time: "19:30", title: "Croazieră Sena", 
        desc: "Barcă la apus pentru a vedea Turnul Eiffel sclipind.",
        fullDetails: "Alegem Vedettes du Pont Neuf. Final memorabil pentru excursia noastră." 
    }
];

// --- 2. GESTIONARE STATE (LOCAL STORAGE) ---
let completedItems = JSON.parse(localStorage.getItem('paris2026_progress')) || [];
let outfits = JSON.parse(localStorage.getItem('paris2026_outfits')) || {};

// --- 3. FUNCȚII SMART & INTERACTIVE ---

// Actualizare bară progres
function updateProgress() {
    const total = itineraryData.length;
    const progressBar = document.getElementById('app-progress');
    const avatar = document.getElementById('avatar-girls');
    const markersContainer = document.getElementById('progress-markers');

    if (!markersContainer) return;
    markersContainer.innerHTML = '';

    let lastCompletedIndex = -1;

    // Generăm stegulețele dinamic
    itineraryData.forEach((item, index) => {
        const isDone = completedItems.includes(item.id);
        const positionPercent = (index / (total - 1)) * 100;
        
        if (isDone) lastCompletedIndex = index;

        const flag = document.createElement('div');
        flag.className = `progress-flag ${isDone ? 'active' : ''}`;
        flag.style.left = `${positionPercent}%`;
        
        // Luăm doar primul cuvânt din titlu pentru a nu aglomera bara (ex: "Louvre")
        const shortTitle = item.title.split(' ')[0];
        
        flag.innerHTML = `
            <span class="flag-label">${shortTitle}</span>
            <div class="flag-pole"></div>
        `;
        markersContainer.appendChild(flag);
    });

    // Mișcăm fetele la ULTIMA locație bifată
    if (avatar) {
        if (lastCompletedIndex === -1) {
            avatar.style.left = "0%"; // Începutul drumului
        } else {
            const finalPos = (lastCompletedIndex / (total - 1)) * 100;
            avatar.style.left = `${finalPos}%`;
        }
    }

    // Bara colorată arată tot progresul general (procentual)
    const percentage = total > 0 ? (completedItems.length / total) * 100 : 0;
    if (progressBar) progressBar.style.width = `${percentage}%`;
}
// Bifează locație & Confetti
window.toggleComplete = function(id) {
    const itemData = itineraryData.find(i => i.id === id);
    const day = itemData.day;

    if (completedItems.includes(id)) {
        completedItems = completedItems.filter(itemId => itemId !== id);
    } else {
        completedItems.push(id);
        const dayItems = itineraryData.filter(i => i.day === day).map(i => i.id);
        const isDayComplete = dayItems.every(itemId => completedItems.includes(itemId));
        if (isDayComplete) triggerConfetti();
    }
    
    localStorage.setItem('paris2026_progress', JSON.stringify(completedItems));
    renderApp();
};

function triggerConfetti() {
    confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#E8C6C5', '#FAF6F0']
    });
}

// Salvare Outfit
window.saveOutfit = function(event, id) {
    outfits[id] = event.target.value;
    localStorage.setItem('paris2026_outfits', JSON.stringify(outfits));
};


window.toggleDetails = function(id) {
    document.getElementById(`panel-${id}`).classList.toggle('active');
};

window.handleImageUpload = function(event, id) {
    const files = event.target.files;
    const grid = document.getElementById(`grid-${id}`);
    if (files.length > 10) {
        alert("Maxim 10 fotografii per locație!");
        event.target.value = ''; 
        return;
    }
    grid.innerHTML = ''; 
    Array.from(files).forEach(file => {
        const imgUrl = URL.createObjectURL(file);
        const imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        imgElement.className = 'grid-image';
        grid.appendChild(imgElement);
    });
};

function renderApp() {
    const container = document.getElementById('itinerary-container');
    if(!container) return;
    container.innerHTML = ''; 

    const days = [...new Set(itineraryData.map(item => item.day))];

    days.forEach(day => {
        const dayItems = itineraryData.filter(item => item.day === day);
        const daySection = document.createElement('div');
        daySection.className = 'day-section';
        daySection.innerHTML = `<h2 class="day-title">${day}</h2>`;

        dayItems.forEach(item => {
            const isDone = completedItems.includes(item.id);
            const savedOutfit = outfits[item.id] || '';
            
            let queryTarget = item.title;
            if(item.id === "z1-1") queryTarget = "Aeroport de Paris-Orly";
            if(item.id === "z1-2") queryTarget = "Galeries Lafayette Haussmann";
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryTarget + ' Paris')}`;
            
            const card = document.createElement('div');
            card.className = `card ${isDone ? 'completed' : ''}`;
            card.innerHTML = `
                <div class="card-content">
                    <span class="time-badge">${item.time}</span>
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-desc">${item.desc}</p>
                    <div style="margin-top:10px;">
                        <button class="toggle-btn" onclick="toggleDetails('${item.id}')">Detalii & Foto ▾</button>
                        <a href="${mapsUrl}" target="_blank" class="maps-btn">🗺️ Navigare</a>
                    </div>
                    <div class="details-panel" id="panel-${item.id}">
                        <p class="full-details-text">${item.fullDetails}</p>
                        <input type="text" class="outfit-input" placeholder="👗 Planifică ținuta aici..." value="${savedOutfit}" onchange="saveOutfit(event, '${item.id}')">
                        <div class="upload-section">
                            <label for="file-${item.id}" class="upload-btn">📷 Adaugă Amintiri (Max 10)</label>
                            <input type="file" id="file-${item.id}" class="hidden-file-input" multiple accept="image/*" onchange="handleImageUpload(event, '${item.id}')">
                        </div>
                        <div class="image-grid" id="grid-${item.id}"></div>
                    </div>
                </div>
                <div class="custom-checkbox" onclick="toggleComplete('${item.id}')"></div>
            `;
            daySection.appendChild(card);
        });
        container.appendChild(daySection);
    });
    updateProgress();
}

// --- 5. INITIALIZARE ---
async function fetchParisWeather() {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true');
        const data = await response.json();
        document.getElementById('weather-widget').innerHTML = `Meteo Paris acum: <b>${data.current_weather.temperature}°C</b> 🌤️`;
    } catch (e) {
        document.getElementById('weather-widget').innerHTML = `Paris, Orașul Luminilor ✨`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    fetchParisWeather();
});
// --- LOGICA PENTRU MODULUL DE BUGET ---

// Setăm bugetul inițial și încărcăm cheltuielile salvate
let initialBudget = 500;
let expenses = JSON.parse(localStorage.getItem('paris2026_expenses')) || [];

// Funcția apelată de butoanele din HTML
window.addExpense = function(itemName, cost) {
    // Adăugăm tranzacția în listă
    expenses.push({ name: itemName, amount: cost, id: Date.now() });
    
    // Salvăm în memoria locală
    localStorage.setItem('paris2026_expenses', JSON.stringify(expenses));
    
    // Actualizăm interfața vizuală
    renderBudget();
};
// Afișează sau ascunde formularul de introducere manuală
window.toggleExpenseForm = function() {
    const form = document.getElementById('expense-form');
    if (form) form.classList.toggle('hidden');
};

// Preia datele din formular, validează suma și o salvează
window.submitCustomExpense = function() {
    const category = document.getElementById('expense-category').value;
    const amountInput = document.getElementById('expense-amount');
    const amount = parseFloat(amountInput.value);

    // Validare: suma trebuie să fie un număr mai mare ca 0
    if (!amount || amount <= 0) {
        alert("Te rog introdu o sumă validă!");
        return;
    }

    // Refolosim funcția de salvare existentă
    addExpense(category, amount);
    
    // Resetăm câmpul de text și ascundem formularul pentru un flux curat
    amountInput.value = '';
    toggleExpenseForm(); 
};

// Funcția pentru deschiderea/închiderea panoului de buget
window.toggleBudget = function() {
    const modal = document.getElementById('budget-modal');
    if (modal) {
        modal.classList.toggle('hidden');
    }
};

// Funcția care redesenează balanța și lista
function renderBudget() {
    const amountEl = document.getElementById('budget-amount');
    const listEl = document.getElementById('expense-list');
    
    if (!amountEl || !listEl) return;

    // Calculăm totalul cheltuit
    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
    const remaining = initialBudget - totalSpent;

    // Actualizăm suma afișată
    amountEl.innerText = `${remaining} €`;
    
    // Alertă vizuală chic: dacă mai ai sub 50€, suma devine roz închis/roșie
    if (remaining < 50) {
        amountEl.style.color = '#d63031';
    } else {
        amountEl.style.color = 'var(--accent-gold)';
    }

    // Desenăm lista cu tranzacții (cele mai noi primele)
    listEl.innerHTML = '';
    expenses.slice().reverse().forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.name}</span> <strong>-${item.amount} €</strong>`;
        listEl.appendChild(li);
    });
}

// IMPORTANT: Trebuie să chemăm funcția de desenare și la încărcarea paginii
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
    fetchParisWeather();
    renderBudget(); // Afișăm bugetul salvat de la ultima vizită
});