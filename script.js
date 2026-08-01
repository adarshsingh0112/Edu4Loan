/* ==========================================================================
   Edu4Loan Frontend Controller (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    const bankDatabase = [
        {
            name: 'State Bank of India (SBI)',
            scheme: 'SBI Scholar Loan',
            minRate: 8.15,
            maxRate: 9.50,
            maxAmount: 15000000,
            zeroCollateralCap: 750000,
            processingFee: 'Nil for Premier Institutes',
            officialUrl: 'https://sbi.co.in/web/student-platform/education-loans'
        },
        {
            name: 'HDFC Credila',
            scheme: 'HDFC Global Student Loan',
            minRate: 9.25,
            maxRate: 11.50,
            maxAmount: 20000000,
            zeroCollateralCap: 5000000,
            processingFee: '1.0% of loan amount',
            officialUrl: 'https://www.hdfccredila.com'
        },
        {
            name: 'ICICI Bank',
            scheme: 'ICICI iBox Overseas Loan',
            minRate: 9.50,
            maxRate: 12.00,
            maxAmount: 20000000,
            zeroCollateralCap: 5000000,
            processingFee: '₹15,000 or 1.25%',
            officialUrl: 'https://www.icicibank.com'
        },
        {
            name: 'Punjab National Bank (PNB)',
            scheme: 'PNB Saraswati & Udaan',
            minRate: 8.75,
            maxRate: 10.50,
            maxAmount: 10000000,
            zeroCollateralCap: 750000,
            processingFee: '1% (Refundable on sanction)',
            officialUrl: 'https://www.pnbindia.in'
        },
        {
            name: 'Bank of Baroda',
            scheme: 'Baroda Scholar Scheme',
            minRate: 8.85,
            maxRate: 10.75,
            maxAmount: 15000000,
            zeroCollateralCap: 750000,
            processingFee: 'Nil for Premier Institutes',
            officialUrl: 'https://www.bankofbaroda.in'
        }
    ];

    const loanForm = document.getElementById('loanForm');
    const resultsSection = document.getElementById('results');
    const resultsContainer = document.getElementById('resultsContainer');

    if (loanForm) {
        loanForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const reqAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
            const collateral = document.getElementById('collateral').value;

            // Render Recommended Bank Cards with Left Accent Border
            if (resultsContainer && resultsSection) {
                resultsContainer.innerHTML = '';

                bankDatabase.forEach(bank => {
                    const card = document.createElement('div');
                    card.className = 'bank-card';

                    card.innerHTML = `
                        <div>
                            <h3>🏦 ${bank.name}</h3>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px;">${bank.scheme}</p>
                            <div class="rate">${bank.minRate}% - ${bank.maxRate}% p.a.</div>
                            <div class="bank-meta">
                                <p><strong>Max Limit:</strong> ₹${(bank.maxAmount / 100000).toFixed(1)} Lakhs</p>
                                <p><strong>Zero Collateral Cap:</strong> Up to ₹${(bank.zeroCollateralCap / 100000).toFixed(1)} Lakhs</p>
                                <p><strong>Processing Fee:</strong> ${bank.processingFee}</p>
                            </div>
                        </div>
                        <a href="${bank.officialUrl}" target="_blank" class="cta-button" style="text-align: center; margin-top: 16px;">Apply Now ↗</a>
                    `;

                    resultsContainer.appendChild(card);
                });

                resultsSection.style.display = 'block';
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

});
