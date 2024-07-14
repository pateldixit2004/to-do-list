const inputBox = document.getElementById("input-Box");
const listContainer = document.getElementById("list-container");
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}


function addTask() {
    if (inputBox.value === "") {
        alert("You must Write Something !");
    }
    else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        /** */
        let datetime = document.createElement('div');
        datetime.className = 'datetime';
        // datetime.innerHTML = new Date().toLocaleString();
        datetime.innerHTML = `Added: ${formatDate(new Date())}`;
        li.appendChild(datetime);

        let checkedTime = document.createElement('div');
        checkedTime.className = 'checked-time';
        checkedTime.innerHTML = "";
        li.appendChild(checkedTime);
        /** */
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}




listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        /***/
        let checkedTime = e.target.querySelector('.checked-time');
        if (e.target.classList.contains("checked")) {
            checkedTime.innerHTML = `Checked: ${new Date().toLocaleString()}`;
            // checkedTime.innerHTML = `Checked: ${formatDate(new Date())} ${new Date().getTimezoneOffset()}`;

        } else {
            checkedTime.innerHTML = "";
        }
        /** */
        saveData();
    } else if (e.target.tagName === "SPAN") {
        // e.target.parentElement.remove();
        if (confirm("Are you sure you want to remove this task?")) {
            e.target.parentElement.remove();
            saveData();
        }
        saveData();
    }
});

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask(inputBox.value);
        console.log("heelo ");
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);

}

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    alert("Right-click is disabled on this page.");
});

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    checkedTime.innerHTML = `Checked: ${formatDate(new Date())}`;
}
showTask();