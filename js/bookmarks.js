let myLeads = [];

const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
const ulEl = document.getElementById('ul-el');
const already = document.getElementById('already');

const leadsFromLocalStorange = JSON.parse(localStorage.getItem('myLeads'));

if (leadsFromLocalStorange) {
  myLeads = leadsFromLocalStorange;
  renderLeads(myLeads);
}

inputBtn.addEventListener("click", function () {
  if (myLeads.includes(inputEl.value)) {
    already.innerHTML = 'Already added!';
    inputEl.value = "";
    console.log(`${inputEl.value} exists in the array.`);
  } else {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
    console.log(localStorage.getItem("myLeads"));
  }
});

deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  already.innerHTML = ""
  myLeads = []
  renderLeads(myLeads);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (myLeads.includes(tabs[0].url)) {
      already.innerHTML = 'Already added!';
      inputEl.value = "";
      console.log(`${tabs[0].url} exists in the array.`);
    } else {
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      renderLeads(myLeads);
    }
  })
});

function renderLeads(myLeads) {
  let listItems = "";
  for (let i = 0; i < myLeads.length; i++) {
    listItems += `<li> 
    <a target='_blank' href='${myLeads[i]} 
    '> ${myLeads[i]} 
       </a>
     </li>
     `;
  }
  ulEl.innerHTML = listItems;
}