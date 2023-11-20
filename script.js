import { apiKey } from "./key" //resolver erro de CORS - same-origin

const hubFilmes = document.getElementById('filmes')
const input = document.getElementById('input')

//consumindo API
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`)
    .then(resp => resp.json())
    .then(dados => dados.results)
    .then(infoFilmes => {

        //Array de filmes pesquisados
        let FilmesSelecionados = []

        //seleciona e exibe os filmes pesquisados
        input.addEventListener('change', (pesquisa) => {
            hubFilmes.innerHTML = ''
            pesquisa = input.value.toLowerCase()
            FilmesSelecionados = []

            //procura filme por titulo
            infoFilmes.forEach(filme => {
                let tituloFilme = filme.title.toLowerCase()

                if (tituloFilme.includes(pesquisa)) {
                    FilmesSelecionados.push(filme)
                }
            })

            //exibe cartaz de possíveis filmes procurados
            if (FilmesSelecionados[0] == undefined) {

                let semResposta = document.createElement('section')
                semResposta.classList.add('info')
                semResposta.classList.add('semResposta')
                semResposta.innerHTML = '<h2>Este filme não está disponivel no momento...</h2>'

                hubFilmes.appendChild(semResposta)

            } else {

                //Atribuindo informações ao site
                FilmesSelecionados.forEach(filme => {

                    let abaFilme = document.createElement('section')
                    abaFilme.classList.add('info')
                    abaFilme.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${filme.backdrop_path}" class="imgFilme">
                        <div class="informacao">
                            <h2 class="tituloFilme">${filme.title} (${filme.release_date.slice(0, 4)})</h2>
                            <div class="icons">
                                <div class="estrela">
                                    <i class="bi bi-star-fill"></i>
                                    <p>${filme.vote_average.toFixed(1)}</p>
                                </div>
                                <div class="favorito">
                                    <i class="bi bi-suit-heart"></i>
                                    <p>Favoritar</p>
                                </div>
                            </div>
                        </div>
                        <div class="descricao">
                        ${filme.overview}
                        </div>`
                    hubFilmes.appendChild(abaFilme)
                })
            }
        })
    }).catch(err => console.log(err))

//`api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`  -  url para utilizar api/ necessita chave
//https://image.tmdb.org/t/p/w500/${url-imagem-aqui.jpg}  -  url para exibir imagens da api



