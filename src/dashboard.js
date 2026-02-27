// Variable to keep track of the currently selected grade
let currentGrade = 'Grade 7';

// Logic for Sidebar Grade Selection
function selectGrade(evt, gradeName) {
    // 1. Remove active class from all grade buttons
    const gradeBtns = document.getElementsByClassName("grade-btn");
    for (let i = 0; i < gradeBtns.length; i++) {
        gradeBtns[i].classList.remove("active");
    }

    // 2. Add active class to clicked button
    evt.currentTarget.classList.add("active");

    // 3. Update the tracking variable and UI Header
    currentGrade = gradeName;
    document.getElementById("current-grade-display").textContent = `${gradeName} Workspace`;
}

// Logic for Top Tab Switching
function openTab(evt, tabId) {
    // 1. Hide all tab content
    const contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }

    // 2. Remove active state from all tab buttons
    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].classList.remove("active");
    }

    // 3. Show the selected tab and highlight the button
    document.getElementById(tabId).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Mock Upload Function to show how we capture the context
function triggerUpload(fileCategory) {
    alert(`Ready to upload a ${fileCategory} file for ${currentGrade} to OneDrive!`);
}