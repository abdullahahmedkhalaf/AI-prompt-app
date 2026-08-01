// A function to clear the input text box
function clearText() {
    document.getElementById("input-text-box").value = "";
}

// This funtion is used to send the prompt to the back-end server
async function send() {
    // Get the text boxes
    let inputField = document.getElementById("input-text-box");
    let respondField = document.getElementById("respond-text-box")

    // The error message
    let errorElement = document.querySelector('.error');

    // The buttons
    let sendBtn = document.querySelector('.send-button');
    let clearBtn = document.querySelector('.clear-button');

    // Clear the prompt
    let userPrompt = inputField.value.trim();
    
    // Prevent any empty prompts
    if (userPrompt === "") {
        errorElement.classList.add("error-show");
        return;
    }

    // Hide error if visible
    errorElement.classList.remove('error-show');

    // Stop all the buttons while processing
    sendBtn.disabled = true;
    clearBtn.disabled = true;

    // Temperary until we connect it with the api
    showLoading();
    respondField.value = "Thinking...";

    try {
        // Get the data from the api
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");

        // Check if the response was OK 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Show statistics and sample data
        if (Array.isArray(data)) {
            const completed = data.filter(todo => todo.completed);
            const incomplete = data.filter(todo => !todo.completed);
            
            let output = `📊 Todo Statistics:\n`;
            output += `─────────────────\n`;
            output += `Total todos: ${data.length}\n`;
            output += `✅ Completed: ${completed.length}\n`;
            output += `❌ Incomplete: ${incomplete.length}\n`;
            output += `\n📝 Sample (first 5 todos):\n`;
            output += `─────────────────\n`;
            
            data.slice(0, 5).forEach((todo, index) => {
                output += `\n${index + 1}. ${todo.title}\n`;
                output += `   User: ${todo.userId} | Completed: ${todo.completed ? 'Yes' : 'No'}\n`;
            });
            
            respondField.value = output;
        } else {
            respondField.value = JSON.stringify(data, null, 2);
        }
        hideLoading();
    } catch (error) {
        hideLoading();
        console.error("Error: ", error);
        respondField.value = `Error: ${error.message}`;
    } finally {
        // Renable the buttons
        sendBtn.disabled = false;
        clearBtn.disabled = false;
    }
}

function showLoading() {
    document.querySelector(".loading-container").classList.remove("hidden");
}

function hideLoading() {
    document.querySelector(".loading-container").classList.add("hidden");
}

// Custome Cursor
const cursor = document.querySelector(".custom-cursor");

if (cursor && window.matchMedia("(hover: hover)").matches) {
    // Keep tracking the mouse position
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Find all interactive elements
    const interactiveElements = document.querySelectorAll("button, input, textarea, a");

    interactiveElements.forEach((element) => {
        // Add hover effects for interactive elements
        element.addEventListener("mouseenter", () => {
            cursor.classList.add("cursor-hover");
        });
        element.addEventListener("mouseleave", () => {
            cursor.classList.remove("cursor-hover");
        });

        // Add global click animations
        document.addEventListener("mousedown", () => {
            cursor.classList.add("cursor-clicking");
        });

        document.addEventListener("mouseup", () => {
            cursor.classList.remove("cursor-clicking");
        });
    });
}