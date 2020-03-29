const playersMain = document.getElementById('players')
const page1Link = document.getElementById('page-1')
const page2Link = document.getElementById('page-2')
const page3Link = document.getElementById('page-3')
const page4Link = document.getElementById('page-4')
const page5Link = document.getElementById('page-5')
const page6Link = document.getElementById('page-6')

async function retrievePlayersInfo(skip, limit) {
    const baseUrl = 'https://fifagama.herokuapp.com/fifa19'
    let response = await fetch(`${baseUrl}/${skip}/${limit}`)
    playersMain.innerHTML = `
    <div class="d-flex justify-content-center my-auto">
        <span>Loading...</span>
        <div class="spinner-border" role="status"></div>
    </div>
    `

    return response.json();
}

function buildHTML(players) {
    playersMain.innerHTML = ''
    count = 0
    var lineDiv
    players.map(player => {
        player = player.data      

        let html = `
        <div class="col-4">
            <div class="card mx-auto" style="width: 14rem;">
                <img class="card-img-top" src="${player.Photo.replace('/4/', '/10/')}"
                    alt="${player.Name}'s Photo">
                <div class="card-body text-center">
                    <p class="bg-warning text-dark">Name: <strong>${player.Name}</strong></p>
                    <p class="mb-0">Overall: <strong>${player.Overall}</strong> | Position: <strong>${player.Position}</strong></p>
                    <p class="mb-0">Age: <strong>${player.Age}</strong></p>
                    <p class="mb-0">Nacionality: <img src="${player.Flag}" alt="${player.Nationality}'s Flag"></p>
                    <p class="mb-0">Club: <img src="${player['Club Logo']}" alt="${player.Club} "></p>
                </div>
            </div>
        </div>
        `  
        if(count % 3 === 0 || count === 0) {
            lineDiv = document.createElement('div')
            lineDiv.className = 'row align-items-center mt-5'
        }

        lineDiv.innerHTML += html
        playersMain.appendChild(lineDiv)

        count++
    })
}

function changeActivePagination(page) {
    let pagesItemsButtons = document.getElementsByClassName('page-item')
    for (let index = 0; index < pagesItemsButtons.length; index++) {
        pagesItemsButtons[index].classList.remove('active')
    }


    let pageItemActive = document.getElementById(`page-${page}`)
    console.log(pageItemActive)
    pageItemActive.classList.add('active')
}

window.onload = retrievePlayersInfo(0, 9).then(players => buildHTML(players))

page1Link.addEventListener('click', () => {
    retrievePlayersInfo(0, 9)
        .then(players => buildHTML(players))
    
    changeActivePagination(1)
})

page2Link.addEventListener('click', () => {
    retrievePlayersInfo(9, 9)
        .then(players => buildHTML(players))

    changeActivePagination(2)
})

page3Link.addEventListener('click', () => {
    retrievePlayersInfo(18, 9)
        .then(players => buildHTML(players))

    changeActivePagination(3)
})

page4Link.addEventListener('click', () => {
    retrievePlayersInfo(27, 9)
        .then(players => buildHTML(players))

    changeActivePagination(4)
})

page5Link.addEventListener('click', () => {
    retrievePlayersInfo(36, 9)
        .then(players => buildHTML(players))

    changeActivePagination(5)
})

page6Link.addEventListener('click', () => {
    retrievePlayersInfo(45, 9)
        .then(players => buildHTML(players))

    changeActivePagination(6)
})