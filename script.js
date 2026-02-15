// Bank Database with Eligibility Criteria
const bankDatabase = [
    {
        name: "State Bank of India (SBI)",
        logo: "🏦",
        interestRateMin: 8.5,
        interestRateMax: 10.5,
        maxLoanAmount: 15000000,
        collateralRequired: false,
        collateralLoanAmount: 750000,
        minIncome: 200000,
        minAcademicScore: 50,
        coursesOffered: ["undergraduate", "postgraduate", "phd", "diploma", "professional"],
        destinations: ["india", "abroad"],
        processingFee: "₹10,000 or 1% of loan amount",
        website: "https://sbi.co.in",
        phone: "1800-1234"
    },
    {
        name: "HDFC Bank",
        logo: "🏛️",
        interestRateMin: 9.0,
        interestRateMax: 11.5,
        maxLoanAmount: 20000000,
        collateralRequired: false,
        collateralLoanAmount: 750000,
        minIncome: 300000,
        minAcademicScore: 55,
        coursesOffered: ["undergraduate", "postgraduate", "phd", "professional"],
        destinations: ["india", "abroad"],
        processingFee: "₹15,000 or 1.5% of loan amount",
        website: "https://hdfcbank.com",
        phone: "1800-2222"
    },
    {
        name: "ICICI Bank",
        logo: "🏢",
        interestRateMin: 9.5,
        interestRateMax: 12.0,
        maxLoanAmount: 20000000,
        collateralRequired: false,
        collateralLoanAmount: 500000,
        minIncome: 250000,
        minAcademicScore: 55,
        coursesOffered: ["undergraduate", "postgraduate", "phd", "professional"],
        destinations: ["india", "abroad"],
        processingFee: "₹12,000 or 1.25% of loan amount",
        website: "https://icicibank.com",
        phone: "1800-3333"
    },
    {
        name: "Punjab National Bank (PNB)",
        logo: "🏦",
        interestRateMin: 8.75,
        interestRateMax: 10.75,
        maxLoanAmount: 10000000,
        collateralRequired: false,
        collateralLoanAmount: 750000,
        minIncome: 180000,
        minAcademicScore: 50,
        coursesOffered: ["undergraduate", "postgraduate", "phd", "diploma", "professional"],
        destinations: ["india", "abroad"],
        processingFee: "₹8,000 or 0.75% of loan amount",
        website: "https://pnbindia.in",
        phone: "1800-4444"
    },
    {
        name: "Bank of Baroda",
        logo: "🏦",
        interestRateMin: 8.85,
        interestRateMax: 11.0,
        maxLoanAmount: 12000000,
        collateralRequired: false,
        collateralLoanAmount: 750000,
        minIncome: 200000,
        minAcademicScore: 50,
        coursesOffered: ["undergraduate", "postgraduate", "phd", "diploma", "professional"],
        destinations: ["india", "abroad"],
        processingFee: "₹9,000 or 0.85% of loan amount",
        website: "https://bankofbaroda.in",
        phone: "1800-5555"
    },
    {
        name: "Axis Bank",
        logo: "🏛️",
        interestRateMin: 9.25,
        interestRateMax: 11.75,
        maxLoanAmount: 15000000,
        collateralRequired: false,
        collateralLoanAmount: 400000,
        minIncome: 300000,
        minAcademicScore: 60,
        coursesOffered: ["undergraduate", "postgraduate", "phd", "professional"],
        destinations: ["india", "abroad"],
        processingFee: "₹15,000 or 1.5% of loan amount",
        website: "https://axisbank.com",
        phone: "1800-6666"
    },
    {
        name: "Canara Bank",
        logo: "🏦",
        interestRateMin: 8.50,
        interestRateMax: 10.25,
        maxLoanAmount: 10000000,
        collateralRequired: false,
        collateralLoanAmount: 750000,
        minIncome: 180000,
        minAcademicScore: 50,
        coursesOffered: ["undergraduate", "postgraduate", "phd", "diploma", "professional"],
        destinations: ["india", "abroad"],
        processingFee: "₹8,000 or 0.75% of loan amount",
        website: "https://canarabank.com",
        phone: "1800-7777"
    },
    {
        name: "Union Bank of India",
        logo: "🏦",
        interestRateMin: 8.65,
        interestRateMax: 10.50,
        maxLoanAmount: 12000000,
        collateralRequired: false,
        collateralLoanAmount: 750000,
        minIncome: 200000,
        minAcademicScore: 50,
        coursesOffered: ["undergraduate", "postgraduate", "phd", "diploma", "professional"],
        destinations: ["india", "abroad"],
        processingFee: "₹9,000 or 0.85% of loan amount",
        website: "https://unionbankofindia.co.in",
        phone: "1800-8888"
    }
];

// Form Submission Handler
document.getElementById('loanForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        loanAmount: parseFloat(document.getElementById('loanAmount').value),
        course: document.getElementById('course').value,
        destination: document.getElementById('destination').value,
        collateral: document.getElementById('collateral').value,
        coapplicantIncome: parseFloat(document.getElementById('coapplicant').value),
        academicScore: parseFloat(document.getElementById('academicScore').value)
    };

    // Find eligible banks
    const eligibleBanks = findEligibleBanks(formData);
    
    // Display results
    displayResults(eligibleBanks, formData);
    
    // Send email to student (AUTOMATIC)
    sendEmailToStudentAutomatic(formData, eligibleBanks);
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});

// Function to find eligible banks
function findEligibleBanks(formData) {
    const eligible = [];
    
    bankDatabase.forEach(bank => {
        let isEligible = true;
        let reasons = [];
        
        // Check loan amount
        if (formData.loanAmount > bank.maxLoanAmount) {
            isEligible = false;
            reasons.push(`Loan amount exceeds maximum limit of ₹${(bank.maxLoanAmount / 100000).toFixed(0)} lakhs`);
        }
        
        // Check collateral requirement
        if (formData.collateral === "no" && formData.loanAmount > bank.collateralLoanAmount) {
            isEligible = false;
            reasons.push(`Collateral required for loans above ₹${(bank.collateralLoanAmount / 100000).toFixed(0)} lakhs`);
        }
        
        // Check minimum income
        if (formData.coapplicantIncome < bank.minIncome) {
            isEligible = false;
            reasons.push(`Minimum co-applicant income requirement is ₹${(bank.minIncome / 100000).toFixed(0)} lakhs/year`);
        }
        
        // Check academic score
        if (formData.academicScore < bank.minAcademicScore) {
            isEligible = false;
            reasons.push(`Minimum academic score requirement is ${bank.minAcademicScore}%`);
        }
        
        // Check course availability
        if (!bank.coursesOffered.includes(formData.course)) {
            isEligible = false;
            reasons.push("Course not covered under this bank's education loan scheme");
        }
        
        // Check destination
        if (!bank.destinations.includes(formData.destination)) {
            isEligible = false;
            reasons.push("Study destination not covered");
        }
        
        if (isEligible) {
            eligible.push({
                ...bank,
                matchScore: calculateMatchScore(bank, formData)
            });
        }
    });
    
    // Sort by match score (lower interest rate = higher match score)
    eligible.sort((a, b) => b.matchScore - a.matchScore);
    
    return eligible;
}

// Calculate match score for sorting
function calculateMatchScore(bank, formData) {
    let score = 100;
    
    // Lower interest rate is better
    score -= (bank.interestRateMin * 2);
    
    // Higher loan capacity is better (if needed)
    if (formData.loanAmount > 1000000) {
        score += (bank.maxLoanAmount / 1000000);
    }
    
    // No collateral requirement is better for students without collateral
    if (formData.collateral === "no") {
        score += (bank.collateralLoanAmount / 100000);
    }
    
    return score;
}

// Display results
function displayResults(banks, formData) {
    const resultsSection = document.getElementById('results');
    const resultsContainer = document.getElementById('resultsContainer');
    
    if (banks.length === 0) {
        resultsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <h3 style="color: #dc3545; margin-bottom: 1rem;">😔 No Matching Banks Found</h3>
                <p style="font-size: 1.1rem; color: #666;">Based on your current criteria, no banks match all requirements.</p>
                <p style="margin-top: 1rem; color: #666;">Consider:</p>
                <ul style="list-style: none; margin-top: 1rem; color: #555;">
                    <li>✓ Arranging collateral if your loan amount is high</li>
                    <li>✓ Including a co-applicant with higher income</li>
                    <li>✓ Applying for a lower loan amount</li>
                    <li>✓ Considering government scholarship schemes</li>
                </ul>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = banks.map(bank => `
            <div class="bank-card">
                <h3>${bank.logo} ${bank.name}</h3>
                <div class="bank-details">
                    <div class="detail-row">
                        <span class="detail-label">Interest Rate:</span>
                        <span class="detail-value interest-rate">${bank.interestRateMin}% - ${bank.interestRateMax}%</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Max Loan Amount:</span>
                        <span class="detail-value">₹${(bank.maxLoanAmount / 100000).toFixed(0)} Lakhs</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Collateral Free Upto:</span>
                        <span class="detail-value">₹${(bank.collateralLoanAmount / 100000).toFixed(0)} Lakhs</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Processing Fee:</span>
                        <span class="detail-value">${bank.processingFee}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Min. Academic Score:</span>
                        <span class="detail-value">${bank.minAcademicScore}%</span>
                    </div>
                </div>
                <a href="${bank.website}" target="_blank" class="contact-btn">Visit Bank Website →</a>
                <p style="text-align: center; margin-top: 1rem; color: #666; font-size: 0.9rem;">
                    📞 Customer Care: ${bank.phone}
                </p>
            </div>
        `).join('');
    }
    
    resultsSection.style.display = 'block';
}

// Function to send automatic email using EmailJS
function sendEmailToStudentAutomatic(formData, eligibleBanks) {
    // Create HTML email content
    const emailHTML = createEmailHTML(formData, eligibleBanks);
    
    // EmailJS configuration (You need to setup EmailJS account)
    // Visit: https://www.emailjs.com/
    // 1. Create free account
    // 2. Add email service (Gmail recommended)
    // 3. Create email template
    // 4. Get your PUBLIC KEY, SERVICE ID, and TEMPLATE ID
    
    const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // Replace with your key
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';         // Replace with your service ID
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';       // Replace with your template ID
    
    // If EmailJS is not configured, show manual email option
    if (EMAILJS_PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') {
        showManualEmailOption(formData, eligibleBanks);
        return;
    }
    
    // Initialize EmailJS (only if configured)
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Prepare template parameters
    const templateParams = {
        to_email: formData.email,
        to_name: formData.name,
        student_name: formData.name,
        loan_amount: `₹${(formData.loanAmount / 100000).toFixed(2)} Lakhs`,
        course: getCourseLabel(formData.course),
        destination: formData.destination === 'india' ? 'Within India' : 'Abroad',
        collateral: formData.collateral === 'yes' ? 'Yes' : 'No',
        income: `₹${(formData.coapplicantIncome / 100000).toFixed(2)} Lakhs/year`,
        academic_score: `${formData.academicScore}%`,
        banks_count: eligibleBanks.length,
        banks_list: emailHTML
    };
    
    // Send email via EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            showSuccessNotification(formData.email);
            console.log('Email sent successfully!', response.status, response.text);
        }, function(error) {
            console.log('Email sending failed...', error);
            showManualEmailOption(formData, eligibleBanks);
        });
}

// Create HTML content for email
function createEmailHTML(formData, eligibleBanks) {
    let banksHTML = '';
    
    if (eligibleBanks.length > 0) {
        banksHTML = eligibleBanks.map((bank, index) => `
            <div style="background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #667eea;">
                <h3 style="color: #667eea; margin: 0 0 10px 0;">${index + 1}. ${bank.name}</h3>
                <p><strong>Interest Rate:</strong> ${bank.interestRateMin}% - ${bank.interestRateMax}%</p>
                <p><strong>Max Loan:</strong> ₹${(bank.maxLoanAmount / 100000).toFixed(0)} Lakhs</p>
                <p><strong>Collateral Free:</strong> ₹${(bank.collateralLoanAmount / 100000).toFixed(0)} Lakhs</p>
                <p><strong>Processing Fee:</strong> ${bank.processingFee}</p>
                <p><strong>Website:</strong> <a href="${bank.website}">${bank.website}</a></p>
                <p><strong>Phone:</strong> ${bank.phone}</p>
            </div>
        `).join('');
    } else {
        banksHTML = '<p style="color: #dc3545;">No banks matched your criteria. Please adjust your requirements.</p>';
    }
    
    return banksHTML;
}

// Helper function to get course label
function getCourseLabel(courseValue) {
    const courseLabels = {
        'undergraduate': 'Undergraduate (UG)',
        'postgraduate': 'Postgraduate (PG)',
        'phd': 'PhD/Doctorate',
        'diploma': 'Diploma/Certificate',
        'professional': 'Professional Courses'
    };
    return courseLabels[courseValue] || courseValue;
}

// Show manual email option (fallback)
function showManualEmailOption(formData, eligibleBanks) {
    let banksList = '';
    
    if (eligibleBanks.length > 0) {
        banksList = eligibleBanks.map((bank, index) => `
${index + 1}. ${bank.name}
   Interest Rate: ${bank.interestRateMin}% - ${bank.interestRateMax}%
   Max Loan Amount: ₹${(bank.maxLoanAmount / 100000).toFixed(0)} Lakhs
   Collateral Free Upto: ₹${(bank.collateralLoanAmount / 100000).toFixed(0)} Lakhs
   Processing Fee: ${bank.processingFee}
   Website: ${bank.website}
   Phone: ${bank.phone}
`).join('\n\n');
    } else {
        banksList = 'No banks matched your criteria.';
    }

    const emailSubject = `Your Education Loan Results - ${eligibleBanks.length} Banks Found`;
    const emailBody = `Dear ${formData.name},

Your personalized loan comparison results:

LOAN REQUIREMENTS:
- Course: ${getCourseLabel(formData.course)}
- Study: ${formData.destination === 'india' ? 'India' : 'Abroad'}
- Amount: ₹${(formData.loanAmount / 100000).toFixed(2)} Lakhs
- Collateral: ${formData.collateral === 'yes' ? 'Yes' : 'No'}
- Income: ₹${(formData.coapplicantIncome / 100000).toFixed(2)} Lakhs/year
- Score: ${formData.academicScore}%

MATCHING BANKS:
${banksList}

Best wishes!
Team CodeBunnies - INNOVIT 2026`;

    const mailtoLink = `mailto:${formData.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    showEmailNotification(formData.email, mailtoLink);
}

// Show email notification
function showEmailNotification(email, mailtoLink) {
    const notification = document.createElement('div');
    notification.className = 'email-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">📧</span>
            <div class="notification-text">
                <strong>Email Ready!</strong>
                <p>Click below to send results to: <strong>${email}</strong></p>
            </div>
            <div class="notification-buttons">
                <button onclick="window.open('${mailtoLink}')" class="send-email-btn">
                    📨 Send Email
                </button>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" class="close-notification-btn">
                    ✕ Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 30000);
}

// Show success notification after email is sent
function showSuccessNotification(email) {
    const notification = document.createElement('div');
    notification.className = 'email-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✅</span>
            <div class="notification-text">
                <strong>Email Sent Successfully!</strong>
                <p>Loan comparison results have been sent to: <strong>${email}</strong></p>
                <p style="font-size: 0.85rem; margin-top: 0.5rem; color: #666;">Please check your inbox (and spam folder)</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="close-notification-btn" style="margin-top: 10px;">
                ✕ Close
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 10000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
document.getElementById('phone').addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
});

// Show welcome message on page load
window.addEventListener('load', () => {
    console.log('Education Loan Comparison Platform Loaded Successfully!');
    console.log('Team CodeBunnies - INNOVIT 2026');
    console.log('Email functionality: Active');
});