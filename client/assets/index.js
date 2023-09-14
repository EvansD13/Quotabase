
const form = document.querySelector("#create-form");
const textElement = document.querySelector("#text");
const authorElement = document.querySelector("#author");
const randomiseButton = document.querySelector("#randomise btn");


randomiseButton.addEventListener("click", displayQuote);
form.addEventListener("submit", createNewQuote);



async function displayQuote() {
  try{
    const repsData = await fetch(`http://localhost:3000/quotes/random`)
    if (repsData.ok){
      const data = await repsData.json()
      const quote = {
        content: data.text,//"More than introversion or logic, though, coding selects for people who can handle endless frustration.",
        author: data.author//"Clive Thompson"
      }
      textElement.textContent = quote["content"];
    authorElement.textContent = quote["author"];
    }else{
      throw "Something has gone wrong with one of the API requests"
    }
  }catch (e){
    console.log(e)
  }
}

async function createNewQuote(e) {

  e.preventDefault();

  const data = {
      text: e.target.name.value,
      author: e.target.author.value 
  }

  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  }

  const response = await fetch("http://localhost:3000/quotes", options);
  console.log(response)
  let message = document.querySelector("#message")
  if (response.status == 201) {
    e.target.name.value = ''
    e.target.author.value = ''
    alert("Quote added.")
  }else{
    e.target.name.value = ''
    e.target.author.value ='' 
    message.textContent = "ERR"
  }
}

