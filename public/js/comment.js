// Validate user input and send login request
const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const comment = document.querySelector("#exampleFormControlTextarea1").value.trim();  
    //   if (!username || !password) {
    //     alert("You must provide a username and password.");
    //     return;
    //   }
    
  
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ comment }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
  
      if (!response.ok) {
        alert("Failed to sign up.");
        return;
      }
  
      // go to home page
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  document
    .querySelector("#comment-button");
    .addEventListener("submit", handleLoginSubmit);
  