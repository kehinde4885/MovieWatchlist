const form = document.querySelector('form')

let array =[]

if(localStorage.id){
    array = JSON.parse(localStorage.id)
}else{
    
}


if(window.document.title === 'Movies'){

    const searchResult = document.querySelector('section')

    form.addEventListener('submit', function(e){
        e.preventDefault()
        movieTitle = e.target.elements[0].value
    
        fetch(`http://www.omdbapi.com/?apikey=be76f5e8&t=${movieTitle}`)
        .then(res => res.json())
        .then(data => {
            searchResult.innerHTML = `
                <div class="item">
                    <div>
                        <img src="${data.Poster}" alt="Movie Poster" width="100" height="150">
                    </div>
                    <div>
                        <div class="movie">
                            <p>${data.Title}</p>
                            <p><img src="images/StarIcon.svg" alt=""><span>${data.imdbRating}</span></p>
                            <p>${data.Runtime}</p><p>${data.Genre}</p><button class="watchlist"><img src="images/Addicon.svg" alt=""><span>Watchlist</span></button>
                        </div>
    
                        <p class="plot">${data.Plot}</p>
                    </div>
    
                </div> `
            console.log(data.imdbID)

            document.querySelector('.watchlist').addEventListener('click',function(){
            
                array.push(data.imdbID)
                console.log(array)
                localStorage.id = JSON.stringify(array)
    
            })//click listener ends

            

        })//Promise resolves
    
    })//Submit listener ends
    
}//conditional statement ends


if (window.document.title === 'Watchlist'){

    const watchlist = document.querySelector('section')
    

    function logString(e){

        console.log(e)
    }


    let string = ''

    for(let i=0 ; i< array.length ; i++){

        fetch(`http://www.omdbapi.com/?apikey=be76f5e8&i=${array[i]}`)
        .then(res=> res.json())
        .then(data => {

            console.log(data)
            string += `<div class="item">
            <div>
                <img src="${data.Poster}" alt="Movie Poster" width="100" height="150">
            </div>
            <div>
                <div class="movie">
                    <p>${data.Title}</p>
                    <p><img src="images/StarIcon.svg" alt=""><span>${data.imdbRating}</span></p>
                    <p>${data.Runtime}</p><p>${data.Genre}</p><button class="watchlist"><img src="images/Addicon.svg" alt=""><span>Watchlist</span></button>
                </div>

                <p class="plot">${data.Plot}</p>
            </div>

        </div> `

        watchlist.innerHTML = string


        })


        
    }


    }
