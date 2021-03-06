import "./App.css";
import { useState } from "react";
import Dothecode from "./Dothecode";
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  let handleSubmit = async (e) => {
    let errID = document.getElementById("error");
    let emailRx =
      /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let mobRx = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(mobileNumber);
    if (name === null || name === "") {
      errID.innerHTML = "Please Enter Name.";
    } else if (email === null || email === "") {
      errID.innerHTML = "Please Enter Email.";
    } else if (!emailRx.test(email)) {
      errID.innerHTML = "Please Enter Valid Email.";
    } else if (mobileNumber === null || mobileNumber === "") {
      errID.innerHTML = "Please Enter Mobile.";
    } else if (!mobRx.test(mobileNumber)) {
      errID.innerHTML = "Please Enter Valid Mobile.";
    } else {
      try {
        let res = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
            mobileNumber: mobileNumber,
          }),
        });
        let resJson = await res.json();
        if (res.status === 200) {
          setName("");
          setEmail("");
          setMobileNumber("");
          setMessage("User created successfully");
          setTimeout(() => {
            setMessage("");
          }, 2000);

          errID.innerHTML = "";
        } else {
          setMessage("Some error occured");
          errID.innerHTML = "";
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  let handleChnage = (event, type) => {
    if (type === "name") {
      setName(event.target.value);
    } else if (type === "email") {
      setEmail(event.target.value);
    } else if (type === "mobile") {
      setMobileNumber(event.target.value);
    }
  };

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => handleChnage(e, "name")}
          />
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => handleChnage(e, "email")}
          />
          <input
            type="text"
            value={mobileNumber}
            placeholder="Mobile Number"
            onChange={(e) => handleChnage(e, "mobile")}
          />

          <button type="submit">Create</button>

          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
      <div style={{ textAlign: "center", color: "red" }}>
        <p id="error"></p>
      </div>
      <Dothecode />
    </>
  );
}

export default App;
