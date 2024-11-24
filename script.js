// Check if browser supports Speech Recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
} else {
  alert("Speech recognition is not supported in this browser.");
}

const inputBox = document.getElementById("inputBox");
const placeholderText = "Click here to type or speak...";

// Function to handle placeholder visibility
function handlePlaceholder() {
  // Ensure placeholder is visible on initial load
  if (!inputBox.innerText.trim()) {
    inputBox.innerText = placeholderText;
  }
}

// Initial placeholder setup
handlePlaceholder();

// Remove placeholder when the box gains focus
inputBox.addEventListener("focus", () => {
  if (inputBox.innerText === placeholderText) {
    inputBox.innerText = "";
  }
});

// Restore placeholder if the box is empty on losing focus
inputBox.addEventListener("blur", () => {
  if (inputBox.innerText.trim() === "") {
    inputBox.innerText = placeholderText;
  }
});

// Function to activate speech recognition
function activateSpeechRecognition() {
  // Remove placeholder when the box is clicked
  if (inputBox.innerText === placeholderText) {
    inputBox.innerText = "";
  }

  // If speech recognition is supported, start listening
  if (recognition) {
    inputBox.classList.add("listening");
    recognition.start();

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      inputBox.innerText = speechToText; // Replace content with recognized speech
      inputBox.classList.remove("listening");
    };

    recognition.onend = () => {
      inputBox.classList.remove("listening"); // Remove visual feedback
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      inputBox.classList.remove("listening");
    };
  }
}

//i'm trying my best hahahahaha but i will make my self proud one day ichaallah.
