let currenttab = "all"
const tabActive = ["bg-navy", "border-navy", "text-white", "bg-purple-500"]
const tabInActive = ["bg-transparent", "text-slate-700", "border-slate-200", "text-black"]

const allContainer = document.getElementById("all-container")
const openContainer = document.getElementById("open-container")
const closedContainer = document.getElementById("closed-container")



// State update

const stat = document.getElementById("state")

stat.innerText = allContainer.children.length

function updateCount(tab) {
  let count = 0;
  if (tab === "all") {
    count = allContainer.children.length;
    
  } else if(tab === "open"){
    count = openContainer.children.length;
  }
    else count = closedContainer.children.length;

    stat.innerText = count;

  }


function switchTab(tab) {
 

  const tabs = ["all", "open", "closed"]

 for (const element of tabs) {
    const tabName = document.getElementById('tab-' + element); 
      if(element === tab) {
        currenttab = element;
        console.log(currenttab);
      }

    if(element === tab) {
      tabName.classList.remove (...tabInActive);
      tabName.classList.add (...tabActive);
      
    }
    else {
      tabName.classList.add(...tabInActive);
      tabName.classList.remove(...tabActive);
    }
 } 

const pages = [allContainer, openContainer, closedContainer]

for (const page of pages) {     // tab to page
  page.classList.add("hidden");
  
}

 if(tab === "all") {
  allContainer.classList.remove("hidden");
  
 }
 else if (tab === "open") {
  openContainer.classList.remove("hidden");
 }
 else {
  closedContainer.classList.remove("hidden");
 }
 updateCount(tab);
}
//যা যা হইল 
// ১। একটা arrow ফাংশন নিলাম loadissues 
// ২। Fetch করে ডাটাবেজ থেকে নিয়া আসলাম 
// ৩। fetch er promiss pawar পর (res=> res.json()) দিয়া json ডাটার প্রমিজ অ নিলাম 
// ৪। json data k displayissues er ভিতর নিলাম, 
// ৫। তার আগে displayissues ekta function create kore nilam, console log করে দেক্লাম ভালবাসে কি না।

let allissues = []
const loadissues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

  .then(res => res.json())
  // .then((json) => {displayissues(json.data)
  // allissuesArra = (json.data);
  // updateCount(currenttab);
  // });

  .then((json) => {
  allissues = json.data;

  const openIssues = allissues.filter(issue => issue.status === "open");
  const closedIssues = allissues.filter(issue => issue.status === "closed");

  displayissues(allissues, "all-container"); 
  displayissues(openIssues, "open-container");      
  displayissues(closedIssues, "closed-container");   
  switchTab(currenttab);

});
};

// Priortiy color
const priorityColor = (priority) => {
    if(priority === "high") return "background-color:#fff0f0; color:#ef4444;";
    if(priority === "medium") return "background-color:#fff7ed; ; color:#f97316;";
    return "background-color:#f3f4f6; color:#6b7280;";
}

// status color
const statusIcon = (status) => {
    if(status === "closed") return `
        <div style="width:32px; height:32px; border-radius:50%; border:2px solid #a855f7; display:flex; align-items:center; justify-content:center;">
            <i class="fa-solid fa-check text-purple-500 text-xs"></i>
        </div>
    `;
    return `
        <div style="width:32px; height:32px; border-radius:50%; border:2px dashed #22c55e; display:flex; align-items:center; justify-content:center;">
            <i class="fa-solid fa-circle text-green-500 text-xs"></i>
        </div>
    `;
}

const displayissues = (issues, containerId) => {
    

    // 1. get the container & empty
    const issueContainer = document.getElementById(containerId);
    issueContainer.innerHTML="";

    // 2. get into every issues
    for (let issue of issues) {

    // 3. create Element
     const issuecard=document.createElement("div");
     issuecard.className = "h-full p-2";
    issuecard.innerHTML=`

      <div onclick="loadIssueDetail(${issue.id})" class="border border-gray-100 mx-2 p-2 shadow-md bg-white rounded-xl flex flex-col gap-3 h-full justify-between cursor-pointer"    // মডালের জাদু এইখানেই , div এর কানে ধরে modal  এর সাথে বিয়া দিতে হবে।
         style="border-top: 3px solid ${issue.status === 'closed' ? '#a855f7' : '#22c55e'};">
                
          <div class="flex items-center justify-between">
            ${statusIcon(issue.status)}
             
             <span style="${priorityColor(issue.priority)} font-weight:700; font-size:0.75rem; padding:4px 12px; border-radius:999px;">
             ${issue.priority.toUpperCase()}
             </span>
             </div>

             <h1 class="font-bold text-gray-900 text-base leading-snug" style="display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${issue.title}</h1>

      
             <p class="text-gray-500 text-sm leading-5"
             style="display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
             ${issue.description}
             </p>

              <div class="flex gap-2 flex-wrap">

              ${issue.labels?.[0] ? `
              <span style="background-color:#fff0f0; border:1.5px solid #f87171; color:#ef4444; font-weight:700; font-size:0.75rem; padding:4px 12px; border-radius:999px; display:inline-flex; align-items:center; gap:4px;">
              <i class="fa-solid fa-bug"></i> ${issue.labels[0]}
              </span>
              ` : ""}
              ${issue.labels?.[1] ? `
              <span style="background-color:#fefce8; border:1.5px solid #d97706; color:#d97706; font-weight:700; font-size:0.75rem; padding:4px 12px; border-radius:999px; display:inline-flex; align-items:center; gap:4px;">
              <i class="fa-solid fa-life-ring"></i> ${issue.labels[1]}
              </span>
              ` : ""}
              </div>

              <hr class="border-gray-300">

              <div class="text-xs text-gray-400 flex flex-col gap-1">
                    <p>#${issue.id ?? ""} by <span class="text-gray-600 font-medium">${issue.author}</span></p>
                    <p>${new Date(issue.updatedAt).toLocaleDateString('en-US')}</p>
                </div>

            </div>
  
    `;
    // 4. apend into container
        issueContainer.append(issuecard);

    }


  };
  
const searchIssues = () => {
    const query = document.getElementById("search-input").value.toLowerCase();

    const filtered = allissues.filter(issue => 
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query) ||
        issue.author.toLowerCase().includes(query)
    );

    if(currenttab === "all") {
        displayissues(filtered, "all-container");
    } else if(currenttab === "open") {
        const openFiltered = filtered.filter(i => i.status === "open");
        displayissues(openFiltered, "open-container");
    } else {
        const closedFiltered = filtered.filter(i => i.status === "closed");
        displayissues(closedFiltered, "closed-container");
    }

    updateCount(currenttab);

} 


// Modal part

const loadIssueDetail = (id) => {
  const issue = allissues.find(i => i.id == id);
  if (!issue) return;

  // Title
  document.getElementById("modal-title").innerText = issue.title;

  // Status badge
  const statusBadge = document.getElementById("modal-status-badge");
  statusBadge.innerText = issue.status === "open" ? "Opened" : "Closed";
  statusBadge.style.cssText = issue.status === "open"
    ? "background-color:#22c55e;"
    : "background-color:#a855f7;";

  // Author & Date
  document.getElementById("modal-author-text").innerText = `Opened by ${issue.author}`;
  document.getElementById("modal-date-text").innerText = new Date(issue.updatedAt).toLocaleDateString('en-GB').replace(/\//g, '/');

  // Assignee
  document.getElementById("modal-assignee").innerText = issue.author;

  // Priority badge
  const priorityBadge = document.getElementById("modal-priority-badge");
  priorityBadge.innerText = issue.priority.toUpperCase();
  priorityBadge.style.cssText = issue.priority === "high"
    ? "background-color:#ef4444;"
    : issue.priority === "medium"
    ? "background-color:#f97316;"
    : "background-color:#6b7280;";

  // Description
  document.getElementById("modal-description").innerText = issue.description;

  // Labels
  const labelsEl = document.getElementById("modal-labels");
  labelsEl.innerHTML = "";
  if (issue.labels?.[0]) {
    labelsEl.innerHTML += `<span style="border:1.5px solid #f87171; color:#ef4444; font-weight:700; font-size:0.75rem; padding:4px 12px; border-radius:999px; display:inline-flex; align-items:center; gap:4px;">
      <i class="fa-solid fa-bug"></i> ${issue.labels[0].toUpperCase()}
    </span>`;
  }
  if (issue.labels?.[1]) {
    labelsEl.innerHTML += `<span style="border:1.5px solid #d97706; color:#d97706; font-weight:700; font-size:0.75rem; padding:4px 12px; border-radius:999px; display:inline-flex; align-items:center; gap:4px;">
      <i class="fa-solid fa-life-ring"></i> ${issue.labels[1].toUpperCase()}
    </span>`;
  }

  // Show modal
  document.getElementById("issue-modal").classList.remove("hidden");
}

const closeModal = () => {
  document.getElementById("issue-modal").classList.add("hidden");
}

// Close on backdrop click
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("issue-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("issue-modal")) closeModal();
  });
});

loadissues();
switchTab(currenttab);

