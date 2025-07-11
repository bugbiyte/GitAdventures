document.getElementById("task1").innerText = "Changed using 'innerText'."; 
document.getElementById("task2").innerHTML = "button <button>Submit</button>";
document.body.style.backgroundColor = "#232323";
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
        item.style.border = "1px solid black";
    }); 

document.getElementById("task5").href = "https://www.springboard.com/";
document.getElementById("task6").value ="DOM Master";
document.getElementById("task7").classList.add("new-class");
const newButton = document.createElement("button");
newButton.textContent = "New Button";
document.getElementById("task8").appendChild(newButton);
const task9 = document.getElementById("task9");
if(task9) {
    task9.remove();
}