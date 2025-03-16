document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const loanBalanceEl = document.querySelector("#loan-balance span");
    const salaryEl = document.querySelector("#salary span");
    const expensesEl = document.querySelector("#expenses span");
    const savingsEl = document.querySelector("#savings span");
    const careerSelect = document.getElementById("career-select");
    
    let turnCounter = 0;
    
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ Light Mode";
    }

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            themeToggle.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("dark-mode", "disabled");
            themeToggle.textContent = "🌙 Dark Mode";
        }
    });

    const careers = {
        "Software Engineer": 5000,
        "Doctor": 8000,
        "Teacher": 3000,
        "Freelancer": 4500,
        "Entrepreneur": 6000
    };

    for (let job in careers) {
        let option = document.createElement("option");
        option.value = careers[job];
        option.textContent = job;
        careerSelect.appendChild(option);
    }

    careerSelect.addEventListener("change", function () {
        let newSalary = careerSelect.value;
        salaryEl.textContent = `$${newSalary}`;
    });

    window.makePayment = function () {
        let loanBalance = parseInt(loanBalanceEl.textContent.replace("$", ""));
        let salary = parseInt(salaryEl.textContent.replace("$", ""));
        let expenses = parseInt(expensesEl.textContent.replace("$", ""));
        let savings = parseInt(savingsEl.textContent.replace("$", ""));

    if (savings >= 1500) {
        let remainingSalary = salary - expenses;
        if (remainingSalary > 0) {
            loanBalance -= remainingSalary;
            if (loanBalance < 0) loanBalance = 0;

            loanBalanceEl.textContent = `$${loanBalance}`;
            alert(`✅ Payment of $${remainingSalary} made! Loan Balance: $${loanBalance}`);

            if (loanBalance === 0) {
                alert("🎉 Congratulations! You've fully paid off your loan. The game will restart.");
                location.reload();
            }
        } else {
            alert("❌ Not enough income to make a loan payment this month!");
        }
        triggerRandomEvent();
    } else {
        alert("❌ You need at least $1500 in savings to make a loan payment.");
    }
};

    window.investMoney = function () {
        let savings = parseInt(savingsEl.textContent.replace("$", ""));
        const investmentAmount = 500;

        if (savings >= 1000) {
            savings -= investmentAmount;
            let returnRate = Math.random() * (0.15 - 0.05) + 0.05;
            let earnings = Math.floor(investmentAmount * returnRate);
            savings += earnings;

            savingsEl.textContent = `$${savings}`;
            alert(`📈 Investment Success! You earned $${earnings}. New Savings: $${savings}`);
        } else {
            alert("❌ You need at least $1000 in savings to invest.");
        }
        triggerRandomEvent();
    };

    window.earnSideHustle = function () {
        let earnings = Math.floor(Math.random() * (800 - 200) + 200);
        let savings = parseInt(savingsEl.textContent.replace("$", ""));
        savings += earnings;

        savingsEl.textContent = `$${savings}`;
        alert(`💼 Side Hustle Success! You earned $${earnings}. New Savings: $${savings}`);
        triggerRandomEvent();
    };

    window.getAdvice = function () {
        const adviceList = [
            "💡 Always pay more than the minimum on your loan!",
            "📉 Avoid unnecessary expenses to save more.",
            "💰 Consider side hustles to boost your income.",
            "🛑 Don't invest all your savings at once. Diversify!",
            "🔄 Automate savings & investments to stay on track.",
            "💰 Prioritize paying off high-interest loans first.",
            "📈 Invest in index funds for long-term financial growth.",
            "🚑 Keep an emergency fund with at least 3-6 months of expenses.",
            "📉 Avoid lifestyle inflation – increase savings as income grows.",
            "💼 Consider side hustles to increase income streams.",
            "📊 Stick to a budget and track your spending habits.",
            "💬 Always negotiate salaries and job offers to maximize earnings.",
            "📏 Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings/investments.",
            "💳 Limit credit card usage and always pay the full balance monthly.",
            "⏳ Start investing early to take advantage of compound interest."
        ];
        let randomAdvice = adviceList[Math.floor(Math.random() * adviceList.length)];
        alert(randomAdvice);
    };

    function triggerRandomEvent() {
        turnCounter++;
        if (turnCounter % 3 === 0) {
            const events = [
                { msg: "🎉 Unexpected Bonus! (+$1000)", effect: () => adjustSavings(1000) },
                { msg: "🚗 Car Breakdown! (-$800)", effect: () => adjustSavings(-800) },
                { msg: "📉 Market Crash! (-10%)", effect: () => adjustSavingsPercentage(-10) },
                { msg: "💵 Tax Refund! (+$1200)", effect: () => adjustSavings(1200) },
                { msg: "🔓 Hacked! (-$600)", effect: () => adjustSavings(-600) },
                { msg: "🏥 Medical Emergency! (-$1500)", effect: () => adjustSavings(-1500) },
                { msg: "💡 New Business Idea! (Invest $2000 for a future return)", effect: () => offerBusinessInvestment() }
            ];

            let randomEvent = events[Math.floor(Math.random() * events.length)];
            alert(randomEvent.msg);
            randomEvent.effect();
        }
        triggerCareerGrowth();
    }

    function adjustSavings(amount) {
        let savings = parseInt(savingsEl.textContent.replace("$", ""));
        savings += amount;
        savingsEl.textContent = `$${savings}`;
        checkBankruptcy();
    }

    function adjustSavingsPercentage(percent) {
        let savings = parseInt(savingsEl.textContent.replace("$", ""));
        let change = Math.floor(savings * (Math.abs(percent) / 100));
        if (percent < 0) {
            savings = savings - change;
        } else {
            savings = savings + change;
        }
        savingsEl.textContent = `$${savings}`;
    }

    function offerBusinessInvestment() {
        if (confirm("💼 Do you want to invest $2000 in a startup? (50% chance to double in 5 turns)")) {
            adjustSavings(-2000);
            setTimeout(() => {
                let success = Math.random() > 0.5;
                if (success) {
                    adjustSavings(5000);
                    alert("🚀 Your business was a success! +$5000");
                } else {
                    alert("💔 Your startup failed. You lost the investment.");
                }
            }, 5000);
        }
    }
    document.getElementById("financial-dilemma-btn").addEventListener("click", triggerFinancialDilemma);

    function triggerFinancialDilemma() {
        const dilemmas = [
            { msg: "💼 You have an opportunity to invest in a startup for $3000. Do you invest?", cost: 3000, reward: 7000 },
            { msg: "🏠 Your landlord offers you a discount if you pay 6 months' rent upfront. Pay $5000 now to save $1500 later?", cost: 5000, reward: 1500 },
            { msg: "📚 A certification course costs $2000 but can increase your salary. Take the course?", cost: 2000, reward: "salary" }
        ];

        let dilemma = dilemmas[Math.floor(Math.random() * dilemmas.length)];
        if (confirm(dilemma.msg)) {
            adjustSavings(-dilemma.cost);
            if (dilemma.reward === "salary") {
                let salary = parseInt(salaryEl.textContent.replace("$", ""));
                salary += 1000;
                salaryEl.textContent = `$${salary}`;
                alert("📈 Your salary has increased by $1000!");
            } else {
                setTimeout(() => {
                    adjustSavings(dilemma.reward);
                    alert("🎉 Your investment paid off! You gained $" + dilemma.reward);
                }, 5000);
            }
        }
    }
    function getFinancialDilemma() {
        const dilemmas = [
            {
                title: "The High-Risk Investment Opportunity",
                description: "You've been offered a high-risk investment opportunity that could potentially double your money, but it also comes with a high risk of losing everything. Do you take the risk or play it safe?",
                choices: [
                    {
                        option: "Take the risk",
                        outcome: "You invest in the opportunity and it pays off, doubling your money.",
                        financialImpact: "+$10,000"
                    },
                    {
                        option: "Play it safe",
                        outcome: "You decide not to invest in the opportunity and instead put your money in a safe, low-risk investment.",
                        financialImpact: "+$2,000"
                    }
                ]
            },
            {
                title: "The Low-Risk Investment Opportunity",
                description: "You've been offered a low-risk investment opportunity that could potentially earn you a steady return, but it also comes with a low potential for growth. Do you take the risk or play it safe?",
                choices: [
                    {
                        option: "Take the risk",
                        outcome: "You invest in the opportunity and it earns you a steady return.",
                        financialImpact: "+$5,000"
                    },
                    {
                        option: "Play it safe",
                        outcome: "You decide not to invest in the opportunity and instead put your money in a safe, low-risk investment.",
                        financialImpact: "+$1,000"
                    }
                ]
            },
            {
                title: "The Emergency Fund Dilemma",
                description: "You've been offered a chance to invest in a high-yield savings account, but it requires you to keep your money locked in for a year. Do you take the risk or play it safe?",
                choices: [
                    {
                        option: "Take the risk",
                        outcome: "You invest in the account and earn a high return, but you also have to keep your money locked in for a year.",
                        financialImpact: "+$8,000"
                    },
                    {
                        option: "Play it safe",
                        outcome: "You decide not to invest in the account and instead keep your money in a liquid savings account.",
                        financialImpact: "+$2,000"
                    }
                ]
            },
            {
                title: "The Credit Card Conundrum",
                description: "You've been offered a credit card with a 0% interest rate for 6 months, but after that, the interest rate jumps to 20%. Do you take the credit card or avoid it?",
                choices: [
                    {
                        option: "Take the credit card",
                        outcome: "You use the credit card and pay off the balance before the interest rate jumps, but you also have to pay a $500 annual fee.",
                        financialImpact: "-$500"
                    },
                    {
                        option: "Avoid the credit card",
                        outcome: "You decide not to take the credit card and instead use your own money for purchases.",
                        financialImpact: "$0"
                    }
                ]
            },
            {
                title: "The Retirement Account Dilemma",
                description: "You've been offered a chance to contribute to a retirement account, but it requires you to lock in your money for 10 years. Do you take the risk or play it safe?",
                choices: [
                    {
                        option: "Take the risk",
                        outcome: "You invest in the retirement account and earn a high return, but you also have to keep your money locked in for 10 years.",
                        financialImpact: "+$15,000"
                    },
                    {
                        option: "Play it safe",
                        outcome: "You decide not to invest in the retirement account and instead keep your money in a liquid savings account.",
                        financialImpact: "+$3,000"
                    }
                ]
            },
            {
                title: "The Insurance Conundrum",
                description: "You've been offered a chance to purchase insurance that will cover you in case of an emergency, but it costs $500 per year. Do you take the insurance or avoid it?",
                choices: [
                    {
                        option: "Take the insurance",
                        outcome: "You purchase the insurance and it pays off when you need it, but you also have to pay the annual premium.",
                        financialImpact: "-$500"
                    },
                    {
                        option: "Avoid the insurance",
                        outcome: "You decide not to take the insurance and instead use your own money to cover emergencies.",
                        financialImpact: "$0"
                    }
                ]
            },
            {
                title: "The Investment Opportunity",
                description: "You've been offered a chance to invest in a startup company, but it requires you to invest $10,000. Do you take the risk or play it safe?",
                choices: [
                    {
                        option: "Take the risk",
                        outcome: "You invest in the startup and it pays off, earning you a 20% return.",
                        financialImpact: "+$2,000"
                    },
                    {
                        option: "Play it safe",
                        outcome: "You decide not to invest in the startup and instead keep your money in a liquid savings account.",
                        financialImpact: "$0"
                    }
                ]
            },
            {
                title: "The Savings Account Dilemma",
                description: "You've been offered a chance to open a savings account with a high interest rate, but it requires you to keep a minimum balance of $1,000. Do you take the risk or play it safe?",
                choices: [
                    {
                        option: "Take the risk",
                        outcome: "You open the savings account and earn a high interest rate, but you also have to keep the minimum balance.",
                        financialImpact: "+$500"
                    },
                    {
                        option: "Play it safe",
                        outcome: "You decide not to open the savings account and instead keep your money in a liquid savings account.",
                        financialImpact: "$0"
                    }
                ]
            }
        ];
      
        const randomIndex = Math.floor(Math.random() * dilemmas.length);
        return dilemmas[randomIndex];
      }
      function presentFinancialDilemma() {
        const dilemma = getFinancialDilemma();
        const choice = confirm(`${dilemma.description} Do you ${dilemma.choices[0].option} or ${dilemma.choices[1].option}?`);
        if (choice) {
          const outcome = dilemma.choices[0].outcome;
          const financialImpact = dilemma.choices[0].financialImpact;
          alert(`You chose to ${dilemma.choices[0].option}. ${outcome} Your financial impact is ${financialImpact}.`);
          adjustSavings(parseInt(financialImpact.replace("+", "")));
        } else {
          const outcome = dilemma.choices[1].outcome;
          const financialImpact = dilemma.choices[1].financialImpact;
          alert(`You chose to ${dilemma.choices[1].option}. ${outcome} Your financial impact is ${financialImpact}.`);
          adjustSavings(parseInt(financialImpact.replace("+", "")));
        }
      }
      function checkBankruptcy() {
        let savings = parseInt(savingsEl.textContent.replace("$", ""));
        if (savings <= -2000) {
            alert("🚨 You've gone bankrupt! You have two options:");
            let choice = confirm("Do you want to take a loan to pay off your debts or restart the game?");
            if (choice) {
                let loanBalance = parseInt(loanBalanceEl.textContent.replace("$", ""));
                loanBalance += 2000;
                loanBalanceEl.textContent = `$${loanBalance}`;
                savings = 0;
                savingsEl.textContent = `$${savings}`;
                alert("💸 You've taken a loan to pay off your debts. Your new loan balance is $" + loanBalance);
            } else {
                alert("🔄 Game restarting...");
                location.reload();
            }
        }
    }
    
    let careerGrowthCounter = 0;
    const careerGrowthInterval = 7; 

    function triggerCareerGrowth() {
        careerGrowthCounter++;
        if (careerGrowthCounter % careerGrowthInterval === 0) {
            increaseSalary();
            increaseExpenses();
        }
    }

    function increaseSalary() {
        let salary = parseInt(salaryEl.textContent.replace("$", ""));
        let salaryIncrease = Math.floor(salary * 0.1); 
        salary += salaryIncrease;
        salaryEl.textContent = `$${salary}`;
        alert(`📈 Your salary has increased by $${salaryIncrease}! New salary: $${salary}`);
    }

    function increaseExpenses() {
        let expenses = parseInt(expensesEl.textContent.replace("$", ""));
        let expensesIncrease = Math.floor(expenses * 0.05); 
        expenses += expensesIncrease;
        expensesEl.textContent = `$${expenses}`;
        alert(`📊 Your monthly expenses have increased by $${expensesIncrease}! New expenses: $${expenses}`);
    }
});
