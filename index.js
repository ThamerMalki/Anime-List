let myButton = document.querySelector('#myButton');
let searchInput = document.querySelector('#searchInput');
let cardContainer = document.createElement("div");
cardContainer.className = "animeList";

let animes = [];

async function myFun(name){
    try{
        
      cardContainer.innerHTML = 
        `
        <div class="card mb-3">
                    <div class="row g-0">
                      <div class="col-md-auto">
                        <img class="img-fluid rounded-start" alt="...">
                        <p class = "mt-1 ms-1" > Rating: <span class="rating" style="font-weight: bold;"></span> </p>
                        <p class = "ms-1"> Ranked: <span class="rank" style="font-weight: bold;"></span> </p> 
                        <p class = "ms-1"> Popularity: <span class="popularity" style="font-weight: bold;"></span> </p>
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">Card title</h5>
                          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. ghstghsaht bhgfhbsyjnsafagb aa gahgahatah</p>
                        </div>
                      </div>
                    </div>
                  </div>
        
        `;

        let myData = await fetch(`https://api.jikan.moe/v4/anime?letter=${name}`);
        let myRealData = await myData.json();
        animes = myRealData.data;
        // console.log(cardContainer.children[0].children[0].children[1].children[0].children[0]);
        // console.log(cardContainer.children[0].children[0].children[1].children[0].children[1]);
        

        if(JSON.stringify(animes) !== '{}'){  // check if not empty

          for(let anime in animes){
            let cardContainer_clone = cardContainer.cloneNode(true);

            let image = cardContainer_clone.children[0].children[0].children[0].children[0];
            image.src = animes[anime].images.jpg.image_url.toString();

            let animeTitle = cardContainer_clone.children[0].children[0].children[1].children[0].children[0];

            if(animes[anime].title_english !== null){
              animeTitle.textContent = animes[anime].title_english;
            }
            else{
              animeTitle.textContent = animes[anime].title;
            }
            
            let animeDescreption = cardContainer_clone.children[0].children[0].children[1].children[0].children[1];
            animeDescreption.textContent = animes[anime].synopsis;

            let rate = cardContainer_clone.children[0].children[0].children[0].children[1].children[0];
            rate.textContent = animes[anime].score;

            let rank = cardContainer_clone.children[0].children[0].children[0].children[2].children[0];
            rank.textContent = `#${animes[anime].rank}`;

            let popularity = cardContainer_clone.children[0].children[0].children[0].children[3].children[0];
            popularity.textContent = `#${animes[anime].popularity}`;

            document.body.appendChild(cardContainer_clone);

            isEnterPressed = false;
        }
  }
    }

    catch(error){
        console.log(error);
    }
}


// this part is for tracking if the user is done typing, so it starting to request the data of the anime

let typingTimer;

// Done typing
searchInput.addEventListener("keyup",(e)=>{

    if(!isEnterPressed){
    clearTimeout(typingTimer);
    typingTimer = setTimeout(()=>{
        myFun(e.target.value);
    }, 2000);
  }
});

// Still typing
searchInput.addEventListener("keydown",()=>{
    clearTimeout(typingTimer);
    let allAnime = document.querySelectorAll(".animeList");
    allAnime.forEach(e =>{
        e.remove();
    })

})

// Pressed the "Search" Button
myButton.addEventListener("click",()=>{
  clearTimeout(typingTimer);
  myFun(searchInput.value);
})

let isEnterPressed = false;

// Start fetching data when "Enter" key is pressed
searchInput.addEventListener("keypress",(e)=>{
  if (e.key === 'Enter') {
    isEnterPressed = true;
    e.preventDefault();
    //clearTimeout(typingTimer); // I don't think  I need it
    myFun(searchInput.value);
  }
})
