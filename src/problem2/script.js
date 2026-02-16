const priceURL = "https://interview.switcheo.com/prices.json";

const elements = {
    tokenFrom: document.getElementById("tokenFrom"),
    tokenTo: document.getElementById("tokenTo"),
    amountFrom: document.getElementById("amountFrom"),
    amountTo: document.getElementById("amountTo"),
    rateDisplay: document.getElementById("rateDisplay"),
    errorDiv: document.getElementById("error"),
    swapBtn: document.getElementById("swapBtn"),
    confirmBtn: document.getElementById("confirmBtn"),
};

let prices = {};

init();

async function init() {
    await fetchPrices();
    bindEvents();
}

async function fetchPrices() {
    try {
        const res = await fetch(priceURL);
        if (!res.ok) throw new Error("Network error");

        const data = await res.json();

        prices = data.reduce((acc, token) => {
            if (token.currency && token.price) {
                acc[token.currency] = token.price;
            }
            return acc;
        }, {});

        if (Object.keys(prices).length < 2) {
            throw new Error("Not enough tokens");
        }

        populateSelects();
    } catch (err) {
        showError("Failed to load token prices.");
        console.error(err);
    }
}

const populateSelects = () => {
    const tokens = Object.keys(prices);

    [elements.tokenFrom, elements.tokenTo].forEach(select => {
        select.innerHTML = "";
        tokens.forEach(token => {
            select.add(new Option(token, token));
        });
    });

    elements.tokenFrom.selectedIndex = 0;
    elements.tokenTo.selectedIndex = 1;

    calculate();
}

const calculate = () => {
    clearError();
    elements.confirmBtn.disabled = true;

    const { tokenFrom, tokenTo, amountFrom } = elements;

    const from = tokenFrom.value;
    const to = tokenTo.value;
    const amount = parseFloat(amountFrom.value);

    if (!isValidAmount(amount)) return;
    if (!isDifferentToken(from, to)) return;
    if (!hasPrice(from, to)) return;

    const rate = prices[from] / prices[to];
    const result = amount * rate;

    elements.amountTo.value = formatNumber(result);
    elements.rateDisplay.innerText = `1 ${from} = ${formatNumber(rate)} ${to}`;
    elements.confirmBtn.disabled = false;
}

const isValidAmount = (amount) => {
    if (!amount || amount <= 0) {
        elements.amountTo.value = "";
        return false;
    }
    return true;
}

const isDifferentToken = (from, to) => {
    if (from === to) {
        showError("Cannot swap same token.");
        elements.amountTo.value = "";
        return false;
    }
    return true;
}

const hasPrice = (from, to) => {
    if (!prices[from] || !prices[to]) {
        showError("Invalid token selection.");
        return false;
    }
    return true;
}

const formatNumber = (num) => {
    return Number(num).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
    });
}

const sanitizeInput = (value) => {
    value = value.replace(/[^0-9.]/g, "");
    const parts = value.split(".");
    if (parts.length > 2) value = parts[0] + "." + parts[1];
    if (parts[1]?.length > 6)
        value = parts[0] + "." + parts[1].slice(0, 6);
    return value;
}

const showError = (msg) => {
    elements.errorDiv.innerText = msg;
}

const clearError = () => {
    elements.errorDiv.innerText = "";
}

const bindEvents = () => {
    elements.amountFrom.addEventListener("input", (e) => {
        e.target.value = sanitizeInput(e.target.value);
        calculate();
    });

    elements.tokenFrom.addEventListener("change", calculate);
    elements.tokenTo.addEventListener("change", calculate);

    elements.swapBtn.addEventListener("click", (e) => {
        e.preventDefault();
        swapTokens();
    });

    elements.confirmBtn.addEventListener("click", () => {
        alert("Swap Confirmed!");
    });
}

const swapTokens = () => {
    const { tokenFrom, tokenTo } = elements;
    [tokenFrom.value, tokenTo.value] = [tokenTo.value, tokenFrom.value];
    calculate();
}
