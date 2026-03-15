const loadlessons=()=> {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then(res=> res.json())
  .then(json=>displayLessons(json));
};

const displayLessons=(lessons)=> {
  console.log(lessons.data);

// 1. get the container
 const levelContainer = document.getElementById("level-container");
 // 2. get every lesson
 for (let lesson of lessons.data) {
  console.log(lesson);
   // 3. create element
   const btnDiv = document.createElement("div")
    btnDiv.innerHTML=`
      <button>learn ${lesson.title}</button>

    `;
   // 4. append into container
      levelContainer.append(btnDiv)
 }
}


loadlessons();





<section >

  <button id="level-container">
  
  </button>


</section>