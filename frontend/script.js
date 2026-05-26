// SMOOTH SCROLL

document.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", function(e){

    if(this.getAttribute("href").startsWith("#")){

      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior:"smooth"
      });

    }

  });

});


// DOWNLOAD RESUME

function downloadResume(){

  const link = document.createElement("a");

  link.href = "assets/resume.pdf";

  link.download = "Mirali_Sheth_Resume.pdf";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

}


// SCROLL ANIMATION

const hiddenElements = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries)=>{

  entries.forEach((entry)=>{

    if(entry.isIntersecting){

      entry.target.classList.add("show");

    }

  });

});

hiddenElements.forEach((el)=>{

  el.classList.add("hidden");

  observer.observe(el);

});