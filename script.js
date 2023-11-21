import { apiKey } from "./key" //resolver erro de CORS - same-origin

const hubFilmes = document.getElementById('filmes')
const input = document.getElementById('input')
const checkbox = document.getElementById('checked')

let filmesFavoritos = [];

//carregando site
document.addEventListener('DOMContentLoaded', () => {

//consumindo API
    function displayResults(pesquisa) {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`)
            .then(resp => resp.json())
            .then(dados => {
                hubFilmes.innerHTML = ''
                dados.results.forEach((valorFilme) => {
                    if (valorFilme.title.toLowerCase().includes(pesquisa.toLowerCase())) {
                        adicionarFilme(valorFilme);
                    } 
                })
            })
        //.catch(err => console.log(err))
    }

    //adicionando filmes
    function adicionarFilme(filme) {

        const abaFilme = document.createElement('section')
        abaFilme.classList.add('info')
        hubFilmes.appendChild(abaFilme)

        const imgFilme = document.createElement('img')
        imgFilme.src = `https://image.tmdb.org/t/p/w500/${filme.backdrop_path}`
        imgFilme.classList.add('imgFilme')
        abaFilme.appendChild(imgFilme)

        const statusFilme = document.createElement('div')
        statusFilme.classList.add('informacao')
        statusFilme.innerHTML = `<h2 class="tituloFilme">${filme.title} (${filme.release_date.slice(0, 4)})</h2>`
        abaFilme.appendChild(statusFilme)

        const iconesFilme = document.createElement('div')
        iconesFilme.classList.add('icons')
        statusFilme.appendChild(iconesFilme)

        const starIcon = document.createElement('div')
        starIcon.classList.add('estrela')
        starIcon.innerHTML = ` <i class="bi bi-star-fill"></i>
        <p>${filme.vote_average.toFixed(1)}</p>`
        iconesFilme.appendChild(starIcon)

        //Favoritando itens
        const favorito = document.createElement('div')
        favorito.classList.add('favorito')

        favorito.addEventListener('click', () => {
            if (filmesFavoritos.includes(filme)) {
                heartIcon.setAttribute('class', 'bi bi-suit-heart')
                filmesFavoritos.splice(filmesFavoritos.indexOf(filme), 1)
            } else {
                heartIcon.setAttribute('class', 'bi bi-suit-heart-fill')
                filmesFavoritos.push(filme)
            }
            console.log(filmesFavoritos);
        })
        iconesFilme.appendChild(favorito)

        const heartIcon = document.createElement('i')
        heartIcon.setAttribute('id', 'heart')
        heartIcon.setAttribute('class', 'bi bi-suit-heart')
        const favTxt = document.createElement('p')
        favTxt.innerHTML = 'Favoritar'
        favorito.appendChild(heartIcon)
        favorito.appendChild(favTxt)

        const descricaoFilme = document.createElement('div')
        descricaoFilme.classList.add('descricao')
        descricaoFilme.innerHTML = filme.overview
        abaFilme.appendChild(descricaoFilme)
    }

    input.addEventListener('input', () => {
        const pesquisa = input.value

        displayResults(pesquisa)
    })

    checkbox.addEventListener('change', () => {

        if (checkbox.checked) {
            hubFilmes.innerHTML = ''
            filmesFavoritos.forEach(filme => {
                adicionarFilme(filme)
            })
        } else if (!checkbox.checked) {
            displayResults('')
        }
    })
    displayResults('')
});

