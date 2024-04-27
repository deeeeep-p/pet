document
        .querySelector("#loginForm")
        .addEventListener("submit", function (event) {
          event.preventDefault(); // Prevent the default form submission

          // Get email and password values
          const email = document.querySelector("#email").value;
          const password = document.querySelector("#password").value;

          axios
            .post("http://localhost:4000/api/login/get", {
              email,
              password,
            })
            .then((res)=>{
            // document.querySelector(".div").innerHTML=res.user.email 
            console.log(res);}
            )
            .catch((err) => console.log(err));

          // Here you can perform further validation or send the data to the server for authentication
          // For simplicity, let's just log the values
          console.log("email:", email);
          console.log("Password:", password);

          // Clear the form fields
          document.querySelector("#email").value = "";
          document.querySelector("#password").value = "";
        });