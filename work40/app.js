const createLink = document.getElementById('create-link');
const oldLink = document.getElementById('old-link');
const createSection = document.getElementById('create-section');
const oldSection = document.getElementById('old-section');
const createBtn = document.getElementById('create-btn');
const quoteDisplay = document.getElementById('quote-display');
const actionBtns = document.getElementById('action-btns');
const saveBtn = document.querySelector('.save-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const oldQuotesList = document.getElementById('old-quotes-list');

let currentQuote = null;

function showSection(section) {
    createSection.classList.remove('active');
    oldSection.classList.remove('active');
    if (section === 'create') {
        createSection.classList.add('active');
    } else if (section === 'old') {
        oldSection.classList.add('active');
        loadOldQuotes();
    }
}

createLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('create');
});

oldLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('old');
});

createBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();
        currentQuote = data;
        quoteDisplay.innerHTML = `
                    <p><strong>Quote:</strong> ${data.quote}</p>
                    <p><strong>Author:</strong> ${data.author}</p>
                `;
        actionBtns.style.display = 'flex';
    } catch (error) {
        quoteDisplay.innerHTML = '<p>Error fetching quote. Please try again.</p>';
    }
});

cancelBtn.addEventListener('click', () => {
    quoteDisplay.innerHTML = '';
    actionBtns.style.display = 'none';
    currentQuote = null;
});

saveBtn.addEventListener('click', () => {
    if (currentQuote) {
        let savedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
        savedQuotes.push(currentQuote);
        localStorage.setItem('quotes', JSON.stringify(savedQuotes));
        quoteDisplay.innerHTML = '<p>Quote saved successfully!</p>';
        actionBtns.style.display = 'none';
        currentQuote = null;
    }
});

function loadOldQuotes() {
    oldQuotesList.innerHTML = '';
    let savedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    savedQuotes.forEach((quote, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
                    <div>
                        <p><strong>Quote:</strong> ${quote.quote}</p>
                        <p><strong>Author:</strong> ${quote.author}</p>
                    </div>
                    <button class="delete-btn" data-index="${index}">🗑️</button>
                `;
        oldQuotesList.appendChild(li);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            let savedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
            savedQuotes.splice(index, 1);
            localStorage.setItem('quotes', JSON.stringify(savedQuotes));
            loadOldQuotes();
        });
    });
}


showSection('create');