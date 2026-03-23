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

// CONTACT FORM
document.getElementById("contactForm").addEventListener("submit", async (e)=>{
  e.preventDefault();

  console.log("Submitting form..."); // DEBUG

  const inputs = document.querySelectorAll("input, textarea");

  const data = {
    name: inputs[0].value,
    email: inputs[1].value,
    message: inputs[2].value
  };

  try {
    const res = await fetch("https://portfolio-backend-waxw.onrender.com/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
});
 alert("Sending... please wait");

    const text = await res.text();
    alert(text);

  } catch (error) {
    console.log("ERROR:", error);
    alert("Error connecting to server");
  }
});

// GITHUB API
fetch("https://api.github.com/users/YOUR_USERNAME")
.then(res=>res.json())
.then(data=>{
  document.getElementById("githubData").innerHTML = `
    <p>Repos: ${data.public_repos}</p>
    <p>Followers: ${data.followers}</p>
  `;
});

function downloadResume(){
  const link = document.createElement("a");
  link.href = "../assets/resume.pdf";
  link.download = "My_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}