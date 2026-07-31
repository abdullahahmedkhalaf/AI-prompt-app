// A function to clear the input text box
function clearText() {
    document.getElementById("input-text-box").value = "";
    document.getElementById("respond-text-box").value = "";
}

// This funtion is used to send the prompt to the back-end server
function send() {
    // Get the text boxes
    let inputField = document.getElementById("input-text-box");
    let respondField = document.getElementById("respond-text-box")

    // Clear the prompt
    let userPrompt = inputField.value.trim();
    
    // Prevent any empty prompts
    if (userPrompt === "") {
        alert("Please enter a prompt first!");
        return;
    }

    // Temperary until we connect it with the api
    respondField.value = "Thinking...";

    // Mock response simulation
    setTimeout(() => {
        respondField.value = "Processed response for: " + userPrompt;
    }, 5000);
}

// Custome Cursor
const cursor = document.querySelector(".custom-cursor");

if (cursor) {
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