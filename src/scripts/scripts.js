const playersMain = document.getElementById('players')
const page1Link = document.getElementById('page-1')
const page2Link = document.getElementById('page-2')
const page3Link = document.getElementById('page-3')
const page4Link = document.getElementById('page-4')
const page5Link = document.getElementById('page-5')
const page6Link = document.getElementById('page-6')
const navPages = document.getElementById('navigation')
const htmlPage = document.querySelector('html')

async function retrievePlayersInfo(skip, limit) {
    const baseUrl = 'https://fifagama.herokuapp.com/fifa19'
    let response = await fetch(`${baseUrl}/${skip}/${limit}`)

    return response.json();
}

function buildHTML(players) {
    playersMain.innerHTML = ''
    count = 0
    var lineDiv

    players.map(player => {
        player = player.data

        playerPassing = parseInt((parseInt(player.ShortPassing) + parseInt(player.LongPassing)) / 2)
        let html = `
        <div class="col-4">
            <a data-toggle="modal" data-target="#info${player.ID}">
            <div class="card mx-auto card-player" style="width: 16rem;">
                <img class="card-img-top mx-auto mt-2" style="width: 12rem;" src="${player.Photo.replace('/4/', '/10/')}"
                    alt="${player.Name}'s Photo">
                <div class="card-body text-center">
                    <p class="mb-2 player-name"><strong>${player.Name}</strong></p>
                    <p class="mb-0">Overall <strong>${player.Overall}</strong> | Position: <strong>${player.Position}</strong></p>
                    <p class="mb-0">Age <strong>${player.Age}</strong></p>
                    <p class="mb-0">Nacionality <img src="${player.Flag}" alt="${player.Nationality}'s Flag"></p>
                    <p class="mb-0 pb-2">Club <img src="${player['Club Logo']}" alt="${player.Club} "></p>
                </div>
            </div>
            <a>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="info${player.ID}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${player.Name}'s Status</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            ${player.Dribbling}<hr/>
            ${player.Acceleration}<hr/>
            ${player.BallControl}<hr/>
            ${player.Finishing}<hr/>
            ${player.Positioning}<hr/>
            ${player.Finishing}<hr/>
            ${player.Strength}<hr/>
            ${player.Interceptions}<hr/>
            ${playerPassing}<hr/>

            <div class="content">
                <div class="wrapper" style="max-width: 512px; margin: auto">
                    <canvas id="${player.ID}-graphic"></canvas>
                </div>
            </div>
            <hr/>
            Preferred Foot <strong>${player['Preferred Foot']}</strong>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>

        `

        if (count % 3 === 0 || count === 0) {
            lineDiv = document.createElement('div')
            lineDiv.className = 'row align-items-center mt-5 mx-0'
        }

        lineDiv.innerHTML += html
        playersMain.appendChild(lineDiv)

        htmlPage.style.height = 'auto'
        navPages.style.display = 'block'

        count++
    })

    players.map(player => {
        player = player.data
        new Chart(document.getElementById(`${player.ID}-graphic`),{
            "type":"radar",
            "data":{
                "labels":[
                    "Dribbling","Drinking","Sleeping","Designing","Coding","Cycling","Running"],
                "datasets":[{
                    "label":"My Second Dataset","data":[player.Dribbling,48,40,19,96,27,100],
                    "fill":true,
                    "backgroundColor":"rgba(54, 162, 235, 0.2)",
                    "borderColor":"rgb(54, 162, 235)",
                    "pointBackgroundColor":"rgb(54, 162, 235)",
                    "pointBorderColor":"#fff",
                    "pointHoverBackgroundColor":"#fff",
                    "pointHoverBorderColor":"rgb(54, 162, 235)"}
                ]},
                "options":{
                    "elements":{
                        "line":{
                            "tension":0,
                            "borderWidth":3
                        }
                    }
                }
        });
    })
}

function Loading() {
    navPages.style.display = 'none'
    htmlPage.style.height = '100%'
    playersMain.innerHTML = `
    <div class="d-flex justify-content-center my-auto loading">
        <span>Loading...</span>
        <div class="spinner-border" role="status"></div>
    </div>
    `
}

function changeActivePagination(page) {
    Loading()
    let pagesItemsButtons = document.getElementsByClassName('page-item')
    for (let index = 0; index < pagesItemsButtons.length; index++) {
        pagesItemsButtons[index].classList.remove('active')
    }

    let pageItemActive = document.getElementById(`page-${page}`)
    pageItemActive.classList.add('active')
}

window.onload = Loading(), retrievePlayersInfo(0, 9).then(players => buildHTML(players))

page1Link.addEventListener('click', () => {
    retrievePlayersInfo(0, 9)

    changeActivePagination(1)
        .then(players => buildHTML(players))

})

page2Link.addEventListener('click', () => {
    changeActivePagination(2)

    retrievePlayersInfo(9, 9)
        .then(players => buildHTML(players))
})

page3Link.addEventListener('click', () => {
    changeActivePagination(3)

    retrievePlayersInfo(18, 9)
        .then(players => buildHTML(players))
})

page4Link.addEventListener('click', () => {
    changeActivePagination(4)

    retrievePlayersInfo(27, 9)
        .then(players => buildHTML(players))
})

page5Link.addEventListener('click', () => {
    changeActivePagination(5)

    retrievePlayersInfo(36, 9)
        .then(players => buildHTML(players))
})

page6Link.addEventListener('click', () => {
    changeActivePagination(6)

    retrievePlayersInfo(45, 9)
        .then(players => buildHTML(players))
})