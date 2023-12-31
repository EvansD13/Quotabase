const textElement = document.getElementById("Quotetext");
const authorElement = document.getElementById("Quoteauthor");
const randomiseButton = document.getElementById("randomise");
const form = document.getElementById("create-form");

form.addEventListener("submit", createNewQuote);
randomiseButton.addEventListener("click", displayQuote);


async function displayQuote() {
  try{
    const repsData = await fetch(`https://quotabase-1.onrender.com/quotes/random`)
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
      text: e.target.text.value,
      author: e.target.author.value 
  }
  

  console.log(data)

  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  }

  const response = await fetch(`https://quotabase-1.onrender.com/quotes`, options);
  console.log(response)
  let message = document.querySelector("#message")
  if (response.status == 201) {
    e.target.name.value = ''
    e.target.author.value = ''
    alert("Quote added.")
  }else{
    e.target.name.value = ''
    e.target.author.value ='' 
    console.log(message)
    message.textContent = "ERR"
  }
}

