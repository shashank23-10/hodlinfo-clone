document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/tickers');
        const tickers = await response.json();

        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = ''; // Clear any existing rows

        tickers.forEach((ticker, index) => {
            const row = document.createElement('tr');

            // Calculate savings and difference (dummy values for now)
            const difference = ((Math.random() - 0.5) * 10).toFixed(2); // Random value for demo
            const savings = (difference > 0) ? `₹ ${(Math.random() * 100000).toFixed(0)}` : `₹ ${(Math.random() * 100000).toFixed(0)}`;

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${ticker.name}</td>
                <td>₹ ${ticker.last}</td>
                <td>₹ ${ticker.buy} / ₹ ${ticker.sell}</td>
                <td class="${difference > 0 ? 'positive' : 'negative'}">${difference} %</td>
                <td class="${difference > 0 ? 'positive' : 'negative'}">${savings}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching tickers:', error);
    }
});
