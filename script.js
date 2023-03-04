let movieData = {
    "The Darjeeling Limited": {
        plot: "A year after their father's funeral, three brothers travel across India by train in an attempt to bond with each other.",
        cast: ["Jason Schwartzman", "Owen Wilson", "Adrien Brody"],
        runtime: 151,
        rating: 7.2,
        year: 2007,
        image: "https://upload.wikimedia.org/wikipedia/en/1/1e/Darjeeling_Limited_Poster.jpg",
    },
    "The Royal Tenenbaums": {
        plot: "The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons",
        rating: 7.6,
        year: 2001,
        cast: ["Gene Hackman", "Gwnyeth Paltrow", "Anjelica Huston"],
        runtime: 170,
        image: "http://www.movienewsletters.net/photos/032993R1.jpg",
    },
    "Fantastic Mr. Fox": {
        year: 2009,
        plot: "An urbane fox cannot resist returning to his farm raiding ways and then must help his community survive the farmers' retaliation.",
        cast: [
            "George Clooney",
            "Meryl Streep",
            "Bill Murray",
            "Jason Schwartzman",
        ],
        runtime: 147,
        rating: 7.9,
        image: "https://i.ytimg.com/vi/B-J95eYpYZM/movieposter.jpg",
    },
    "The Grand Budapest Hotel": {
        rating: 8.1,
        runtime: 159,
        year: 2014,
        plot: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
        cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
        image: "https://i.ytimg.com/vi/uC4n3_EK_kA/movieposter.jpg",
    },
};

const container = document.querySelector(".container")

const createDiv = (key, movie) => {
    const movieDiv = document.createElement('div')
    movieDiv.id = key

    const moviePic = document.createElement("img")
    moviePic.src = movie['image']
    movieDiv.appendChild(moviePic)

    const movieTitle = document.createElement('h4')
    movieTitle.innerHTML = key
    movieDiv.appendChild(movieTitle)

    const moviePlot = document.createElement('p')
    moviePlot.innerHTML = movie['plot']
    movieDiv.appendChild(moviePlot)

    const year = document.createElement('p')
    year.innerHTML = "This movie was released in " + movie['year'] + "."
    movieDiv.appendChild(year)

    const rating = document.createElement('p')
    rating.innerHTML = "Rating: " + movie['rating']
    movieDiv.appendChild(rating)

    // movieDiv.classList.add("hidden")
    movieDiv.classList.add('box')
    container.appendChild(movieDiv)


}


for (const [key, movie] of Object.entries(movieData)) {
    createDiv(key, movie);

}


const runtimeOver150 = () => {
    let runtimeMovies = [];
    for (const [key, movie] of Object.entries(movieData)) {
        if (movie["runtime"] >= 150) {
            runtimeMovies.push(key)
        }
    }
    return runtimeMovies;
}


const getBestRated = () => {
    let bestRating = 0;
    let bestMovie = undefined;
    for (const [key, movie] of Object.entries(movieData)) {
        if (movie["rating"] > bestRating) {
            bestRating = movie["rating"]
            bestMovie = key;
        }
    }
    return bestMovie;
}
console.log(getBestRated())

const getLatestMovie = () => {
    let latestYear = 0;
    let bestMovie = undefined;
    for (const [key, movie] of Object.entries(movieData)) {
        if (movie["year"] > latestYear) {
            latestYear = movie["year"];
            bestMovie = key;
        }
    }
    return bestMovie;
}

// Buttons

const buttons = document.querySelectorAll(".btn")
const form = document.getElementById("form")

buttons.forEach(function (button) {
    button.addEventListener('click', function (e) {
        e.preventDefault()
        const filter = e.target.id;
        const boxes = document.querySelectorAll(".box");


        if (filter == "all-movies") {
            form.classList.add("hidden")
            boxes.forEach(function (box) {
                box.classList.remove("hidden")
            })

        }
        if (filter == "rating") {
            boxes.forEach(function (box) {
                box.classList.add("hidden")
            })
            const bestMovie = getBestRated()
            const bestDiv = document.getElementById(bestMovie)
            bestDiv.classList.remove("hidden")
            form.classList.add("hidden")
        }
        if (filter == "year") {
            boxes.forEach(function (box) {
                box.classList.add("hidden")
            })
            const latestMovie = getLatestMovie()
            const latestMovieDiv = document.getElementById(latestMovie)
            latestMovieDiv.classList.remove("hidden")
            form.classList.add("hidden")
        }
        if (filter == "runtime") {
            form.classList.add("hidden")
            boxes.forEach(function (box) {
                box.classList.add("hidden")
            })
            const runtimeMovies = runtimeOver150()
            runtimeMovies.forEach(function (movie) {
                const runtimeDiv = document.getElementById(movie)
                runtimeDiv.classList.remove("hidden")
            })
        }
        if (filter == "add") {
            console.log(filter)
            boxes.forEach(function (box) {
                box.classList.add("hidden")
            })
            form.classList.remove("hidden")
        }
    })
})



const submit = document.getElementById("submit")
let movies = []
const addMovie = (e) => {
    e.preventDefault();
    const newTitle = document.getElementById("movie-user").value;
    const newMovie =
    {
        //title: document.getElementById("movie-user").value,
        plot: document.getElementById("plot-user").value,
        rating: document.getElementById("rating-user").value,
        year: document.getElementById("year-user").value,
        image: document.getElementById("url").value,
    }
    movies.push(newMovie);

    // Check the object is correct in the console
    // const myJson = JSON.stringify(newMovie)

    movieData[newTitle] = newMovie;

    createDiv(newTitle, newMovie);


    // TODO: close modal
    form.classList.add("hidden")
    // TODO: show all movies
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(function (box) {
        box.classList.remove("hidden")
    })

}

document.addEventListener("DOMContentLoaded", () => {
    submit.addEventListener("click", addMovie);

})

