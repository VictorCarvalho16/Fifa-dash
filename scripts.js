const playersMain = document.getElementById('players')
const page1Link = document.getElementById('page-1')
const page2Link = document.getElementById('page-2')
const page3Link = document.getElementById('page-3')

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
            console.log(lineDiv)
        }

        lineDiv.innerHTML += html
        playersMain.appendChild(lineDiv)

        count++
    })
}

page1Link.addEventListener('click', () => {
    retrievePlayersInfo(0, 9)
        .then(players => buildHTML(players))
})
page2Link.addEventListener('click', () => {
    retrievePlayersInfo(9, 9)
        .then(players => buildHTML(players))
})
page3Link.addEventListener('click', () => {
    retrievePlayersInfo(18, 9)
        .then(players => buildHTML(players))
})