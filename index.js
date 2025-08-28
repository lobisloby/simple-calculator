const buttons = document.querySelectorAll(".btn");
let display = document.querySelector("#mainHeader")
let history = document.querySelector("#history")
const toggle = document.querySelector("#switch")
console.log(display.textContent)
let start = true;
let expression = "0";

toggle.addEventListener("change", () => {
    const html = document.documentElement;
    if (toggle.checked) {
        html.setAttribute('data-theme', 'dark')
    } else {
        html.setAttribute('data-theme', 'light')
    }
})

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        console.log(value)

        if (value === "=") {
            start = true;

            try {
                const expre = expression;
                const result = eval(expression); // evaluate expression
                expression = result
                refreshDisplay()
                historys(expre)
                expression = "0"; // reset after calculation
            } catch (err) {
                console.error("Invalid expression:", expression);
                refreshDisplay()
                expression = ""; // reset on error
            }
        } else {
            if (start) {
                expression = value;
                refreshDisplay();
            } else {
                expression += value;
                refreshDisplay();
            }
            start = false;
        }

    });
});


function refreshDisplay(result) {
    if (expression === "") {
        display.textContent = "0";
    } else {
        display.textContent = expression;
    }
}

function historys(rslt) {
    if (expression) {
        localStorage.setItem(history, `${rslt}= ${expression} `)
        history.textContent = `${rslt}= ${expression} `;
    }
}