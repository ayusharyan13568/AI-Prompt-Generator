function adjustHeight(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

function copyToClipboard() {
  const defaultKeys = {
    promptRole: "AI Role: ",
    prompt1: "Instruction: ",
    prompt2: "Response format: ",
    prompt3: "Attention: ",
    prompt4: "Context: ",
  };

  const textareas = document.querySelectorAll(".global-container textarea");
  const texts = Array.from(textareas)
    .filter((textarea) => {
      const val = textarea.value.trim();
      if (!val) return false;
      const defaultVal = (defaultKeys[textarea.id] || "").trim();
      return val !== defaultVal;
    })
    .map((textarea) => textarea.value.trim())
    .join("\n\n"); // Joins with spacing between prompts

  if (texts.length === 0) {
    alert("Nothing to copy!");
    return;
  }

  navigator.clipboard
    .writeText(texts)
    .then(() => {
      showNotification();
    })
    .catch((err) => {
      console.error("Error copying: ", err);
    });
}

function showNotification() {
  const notification = document.getElementById("notification");
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 2000);
}

function clearField(id) {
  document.getElementById(id).value = "";
  localStorage.removeItem("content_" + id);
  updateCharCount(); 
}

function clearAllFields() {
  document.getElementById("promptRole").value = "AI Role: ";
  document.getElementById("prompt1").value = "Instruction: ";
  document.getElementById("prompt2").value = "Response format: ";
  document.getElementById("prompt3").value = "Attention: ";
  document.getElementById("prompt4").value = "Context: ";
  
  TEXTAREA_IDS.forEach((id) => {
    localStorage.removeItem("content_" + id);
    const el = document.getElementById(id);
    if (el) adjustHeight(el);
  });
  updateCharCount();
}

function insertText(id, text) {
  const textarea = document.getElementById(id);
  const select = event.target; 

  // Adds a line break if content already exists
  if (textarea.value) {
    textarea.value += "\n" + text + " ";
  } else {
    textarea.value = text + " ";
  }

  adjustHeight(textarea);

  // Returns the select to the first option and focuses the textarea
  setTimeout(() => {
    select.selectedIndex = 0;
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }, 1);
}

// POP-UP FUNCTIONS
function openPopup1() {
  document.getElementById("popup1").style.display = "flex";
}

function closePopup1() {
  document.getElementById("popup1").style.display = "none";
}

function openPopup2() {
  document.getElementById("popup2").style.display = "flex";
}

function closePopup2() {
  document.getElementById("popup2").style.display = "none";
}

function openPopup3() {
  document.getElementById("popup3").style.display = "flex";
}

function closePopup3() {
  document.getElementById("popup3").style.display = "none";
}

function openPopup4() {
  document.getElementById("popup4").style.display = "flex";
}

function closePopup4() {
  document.getElementById("popup4").style.display = "none";
}

function openPopupRole() {
  document.getElementById("popupRole").style.display = "flex";
}

function closePopupRole() {
  document.getElementById("popupRole").style.display = "none";
}

// Close pop-ups on clicking outside or pressing Escape
document.addEventListener("click", function (event) {
  ["popupRole", "popup1", "popup2", "popup3", "popup4"].forEach((id) => {
    let popup = document.getElementById(id);
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    ["popupRole", "popup1", "popup2", "popup3", "popup4"].forEach((id) => {
      document.getElementById(id).style.display = "none";
    });
  }
});

// Keyboard shortcuts: Ctrl+Enter = copy all, Ctrl+Delete = clear all
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "Enter") {
    event.preventDefault();
    copyToClipboard();
  }
  if (event.ctrlKey && event.key === "Delete") {
    event.preventDefault();
    clearAllFields();
  }
});

// CHARACTER COUNTER
function updateCharCount() {
  let totalChars = 0;
  document.querySelectorAll("textarea").forEach((textarea) => {
    totalChars += textarea.value.trim().length;
  });
  document.getElementById("char-counter").innerText = `Characters: ${totalChars}`;
}

// Ensure only English prompts are visible
function updateSelectOptions() {
  const paretoPromptPt = document.getElementById("pareto-prompt-pt");
  const paretoPromptEn = document.getElementById("pareto-prompt-en");
  const studyHelperPromptPt = document.getElementById("study-helper-prompt-pt");
  const studyHelperPromptEn = document.getElementById("study-helper-prompt-en");
  const imageRefinerPromptPt = document.getElementById("image-refiner-prompt-pt");
  const imageRefinerPromptEn = document.getElementById("image-refiner-prompt-en");
  const questionsPromptPt = document.getElementById("questions-prompt-pt");
  const questionsPromptEn = document.getElementById("questions-prompt-en");
  const helpProblemPt = document.getElementById("help-problem-pt");
  const helpProblemEn = document.getElementById("help-problem-en");

  if (paretoPromptPt) paretoPromptPt.style.display = "none";
  if (paretoPromptEn) paretoPromptEn.style.display = "block";
  
  if (studyHelperPromptPt) studyHelperPromptPt.style.display = "none";
  if (studyHelperPromptEn) studyHelperPromptEn.style.display = "block";
  
  if (imageRefinerPromptPt) imageRefinerPromptPt.style.display = "none";
  if (imageRefinerPromptEn) imageRefinerPromptEn.style.display = "block";
  
  if (questionsPromptPt) questionsPromptPt.style.display = "none";
  if (questionsPromptEn) questionsPromptEn.style.display = "block";
  
  if (helpProblemPt) helpProblemPt.style.display = "none";
  if (helpProblemEn) helpProblemEn.style.display = "block";
}

// Update textarea default values
function updateTextareaDefaults() {
  const promptRole = document.getElementById("promptRole");
  const prompt1 = document.getElementById("prompt1");
  const prompt2 = document.getElementById("prompt2");
  const prompt3 = document.getElementById("prompt3");
  const prompt4 = document.getElementById("prompt4");

  if (promptRole && (promptRole.value === "Papel da IA: " || promptRole.value === "")) {
    promptRole.value = "AI Role: ";
  }
  if (prompt1 && (prompt1.value === "Instrução: " || prompt1.value === "")) {
    prompt1.value = "Instruction: ";
  }
  if (prompt2 && (prompt2.value === "Formato da resposta: " || prompt2.value === "")) {
    prompt2.value = "Response format: ";
  }
  if (prompt3 && (prompt3.value === "Atenção: " || prompt3.value === "")) {
    prompt3.value = "Attention: ";
  }
  if (prompt4 && (prompt4.value === "Contexto: " || prompt4.value === "")) {
    prompt4.value = "Context: ";
  }
}

const TEXTAREA_IDS = ["promptRole", "prompt1", "prompt2", "prompt3", "prompt4"];

function todayKey() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function saveContent() {
  const today = todayKey();
  TEXTAREA_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) localStorage.setItem("content_" + id, el.value);
  });
  localStorage.setItem("content_date", today);
}

function restoreContent() {
  const today = todayKey();
  const savedDate = localStorage.getItem("content_date");
  if (savedDate !== today) {
    TEXTAREA_IDS.forEach((id) => localStorage.removeItem("content_" + id));
    localStorage.removeItem("content_date");
    return;
  }
  TEXTAREA_IDS.forEach((id) => {
    const saved = localStorage.getItem("content_" + id);
    const el = document.getElementById(id);
    if (el && saved !== null) {
      el.value = saved;
      adjustHeight(el);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Restore last saved content (overrides defaults if user had typed something)
  restoreContent();

  // Set initial text defaults if fields are empty
  updateTextareaDefaults();
  updateSelectOptions();

  // Set initial height for all textareas based on their content
  document.querySelectorAll("textarea").forEach(adjustHeight);

  document.querySelectorAll("textarea").forEach((textarea) => {
    textarea.addEventListener("input", () => {
      updateCharCount();
      saveContent();
    });
  });

  document.querySelectorAll("select").forEach((select) => {
    select.addEventListener("change", () => {
      setTimeout(() => {
        updateCharCount();
        saveContent();
      }, 0);
    });
  });

  updateCharCount();
});