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



// CONTACT FORM

const contactForm = document.getElementById("contact-form");

if (contactForm) {

  contactForm.addEventListener("submit", async function(e) {

    e.preventDefault();

    const button = contactForm.querySelector("button");

    button.disabled = true;
    button.innerText = "Sending...";

    try {

      const response = await fetch("https://formspree.io/f/mljgrqnp", {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {

        alert("Message sent successfully! Thank you for contacting me.");

        contactForm.reset();

      } else {

        alert("Something went wrong. Please try again.");

      }

    } catch (error) {

      alert("Unable to send message. Please try again later.");

    }

    button.disabled = false;
    button.innerText = "Send Message";

  });

}