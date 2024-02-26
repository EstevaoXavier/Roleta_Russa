// Lista 
const list_att = document.querySelector('#list_att')
var new_li = Element
var new_li_text = ''
// Botões
const atirar_em_si_mesmo = document.querySelector('#atirar_em_si')
const atirar_no_inimigo = document.querySelector('#atirar_no_inimigo')
const numero_de_turnos_div = document.querySelector('#numero_de_turnos_div')
// Tela start
const start_screen = document.querySelector('#start_screen')
const start_button = document.querySelector('#start_button')

var quantidade_de_balas_sorteadas = 0
var numero_de_turnos = 1
var numero_de_turnos_inimigo = 1
var numero_maximo_de_balas = 4
var numero_maximo_de_balas_falsas = 1
var balas_lista = []
var indice_bala_falsa = 0
var indice_bala_escolhida = 0
var indice_bala_atirada = 0

// Lista de Pessoas
let pessoas = ["John Doe",
"Mary Smith",
"Michael Johnson",
"Susan Davis",
"Christopher Wilson",
"Jessica Brown",
"David Martinez",
"Linda Anderson",
"James Thompson",
"Jennifer Garcia"]
var pessoa_selecionada =''


// Funções
function GameStart() {
    // começando o jogo
    ResetNoGame()
    numero_de_turnos_div.textContent = `Turnos: ${numero_de_turnos}`
    EscolherQuantidadeDeBalas()
    console.log('Quantidade de balas',balas_lista)
    EscolherBalaFalsa(balas_lista)
    console.log('Escolhendo bala falsa', balas_lista)
    setTimeout(()=> {
        MensagemSimples('Aguarde, já estamos trazendo o seu inimigo...')
    }, 1500)
    pessoa_selecionada = pessoas[Math.floor(Math.random() * 10)]
    console.log(pessoa_selecionada)
    setTimeout(()=> {
        MensagemInimigoChegou(pessoa_selecionada)
    }, 3000)
    setTimeout(()=> {
        MensagemSimples('O Jogo Começou!')
        AtivarBotoes()
        MensagemAviso(`Tem ${quantidade_de_balas_sorteadas} balas no pente, e uma delas é falsa.`)
        MensagemSimples('Começem!')
    }, 4000)

}
function GameOver() {
    start_screen.style.display = 'flex'
}
// Ativar e desativar botões
function DesativarBotoes() {
    atirar_em_si_mesmo.setAttribute('disabled', '')
    atirar_no_inimigo.setAttribute('disabled', '')
}
function AtivarBotoes() {
    atirar_em_si_mesmo.removeAttribute('disabled')
    atirar_no_inimigo.removeAttribute('disabled')
}

function ResetNoGame() {
        // resetando
        quantidade_de_balas_sorteadas = 0
        numero_de_turnos = 1
        numero_de_turnos_inimigo = 1
        numero_maximo_de_balas = 4
        numero_maximo_de_balas_falsas = 1
        balas_lista = []
        indice_bala_falsa = 0
        indice_bala_escolhida = 0
        indice_bala_atirada = 0
}

// avisos
function MensagemSimples(texto) {
    new_li = document.createElement('li')
    new_li_text = document.createTextNode(texto)
    new_li.appendChild(new_li_text)
    new_li.classList.add('item_list')
    list_att.appendChild(new_li)
}
function MensagemInimigoChegou(pessoa) {
    new_li = document.createElement('li')
    new_li_text = document.createTextNode(`${pessoa} Chegou...`)
    new_li.appendChild(new_li_text)
    new_li.classList.add('inimigo')
    list_att.appendChild(new_li)
}
function MensagemAviso(texto) {
    new_li = document.createElement('li')
    new_li_text = document.createTextNode(texto)
    new_li.appendChild(new_li_text)
    new_li.classList.add('aviso')
    list_att.appendChild(new_li)
}
function MensagemPositiva(texto) {
    new_li = document.createElement('li')
    new_li_text = document.createTextNode(texto)
    new_li.appendChild(new_li_text)
    new_li.classList.add('boa_noticia')
    list_att.appendChild(new_li)
}

function EscolherQuantidadeDeBalas() {
    quantidade_de_balas_sorteadas = Math.floor(Math.random() * numero_maximo_de_balas + 1)
    balas_lista = []
    for (let i = 0; i < quantidade_de_balas_sorteadas; i++) {
        balas_lista[i] = 'bala'
    }
    return balas_lista
}

function EscolherBalaFalsa(quantidade) {
    indice_bala_falsa = 0
    for (let i = 1; i <= numero_maximo_de_balas_falsas; i++){
        indice_bala_falsa = Math.floor(Math.random() * quantidade.length)
        quantidade[indice_bala_falsa] = 'bala_falsa'
    }    
}

function InimigoMorto(atirador, alvo) {
    if(alvo == 'Você'){
        setTimeout(()=>{
            GameOver()
        },2000)
    }else {
        setTimeout(()=>{
        MensagemSimples(`Procurando um novo inimigo`)
    }, 2000)
    GameStart()
    }
}
// IA do Personagem
var escolha_do_inimigo = 1
var inimigo_da_vez = ''
function TurnoDoInimigo() {
    inimigo_da_vez = 'Você'
    indice_bala_atirada = 0
    MensagemSimples(`É a vez do(a): ${pessoa_selecionada}`)
    if (balas_lista.length == 1 && balas_lista[0] == 'bala_falsa'){
        atirar(pessoa_selecionada, pessoa_selecionada)
    } else {
        escolha_do_inimigo = Math.floor(Math.random() * 2)
        MensagemSimples(`${pessoa_selecionada} está se decidindo...`)
        if (escolha_do_inimigo == 1) {
            console.log(pessoa_selecionada, 'se decidiu')
            atirar(pessoa_selecionada, pessoa_selecionada)
        } else{
            console.log(pessoa_selecionada, 'se decidiu')
            atirar(pessoa_selecionada, inimigo_da_vez)
        }
    }
}

function VerificarSeTemBalas() {
    if (balas_lista.length == 0) {
        MensagemSimples('As balas acabaram')
        EscolherQuantidadeDeBalas()
        EscolherBalaFalsa(balas_lista)
        MensagemSimples('Recomeçando!')
        AtivarBotoes()
        indice_bala_atirada = 0
    }    
}

function atirar(atirador, alvo) {
    DesativarBotoes()
    console.log(balas_lista[indice_bala_atirada]) //
    if (balas_lista[indice_bala_atirada] == 'bala'){
        if (alvo == inimigo_da_vez) {
            numero_de_turnos--
            numero_de_turnos_div.textContent = `Turnos: ${numero_de_turnos}`
        }else {
            numero_de_turnos_inimigo--
        }
    
        if (atirador == alvo) {
            MensagemSimples(`${atirador} atirou uma bala em si mesmo...`)
            setTimeout(()=> {
                MensagemAviso(`${atirador} se matou...`)
                balas_lista.splice(0, 1)
                if (atirador == 'Você') {
                    setTimeout(()=>{
                        GameOver()
                    },2000)
                } else {
                    GameStart()
                }
            }, 2000)

            // return
        } else {
            setTimeout(() =>{
                MensagemSimples(`${atirador} atirou no ${alvo}`)
            }, 500)
            setTimeout(() =>{
                MensagemAviso(`${atirador} matou ${alvo}`)
                InimigoMorto(atirador, alvo)
                balas_lista.splice(0,1)
                VerificarSeTemBalas()
                if (numero_de_turnos == 0) {
                    TurnoDoInimigo()
                }
            },2000)}

    }else if (balas_lista[indice_bala_atirada] == 'bala_falsa') {
        if (alvo == inimigo_da_vez) {
            numero_de_turnos--
            numero_de_turnos_div.textContent = `Turnos: ${numero_de_turnos}`
        }else {
            numero_de_turnos_inimigo--
        }    
        if (atirador == alvo) {
            MensagemSimples(`${atirador} atirou uma bala em si mesmo...`)
            setTimeout(()=> {
                MensagemPositiva(`Era falsa! ${atirador} ganhou mais um turno!`)
                if (atirador == 'Você') {
                    numero_de_turnos++
                    numero_de_turnos_div.textContent = `Turnos: ${numero_de_turnos}`
                }else {
                    numero_de_turnos_inimigo++
                }
                balas_lista.splice(0,1)
                indice_bala_atirada++

                VerificarSeTemBalas()
                if (numero_de_turnos >= 1) {
                    AtivarBotoes()
                }
                if (numero_de_turnos == 0) {
                    TurnoDoInimigo()
                }
            }, 2000)
            VerificarSeTemBalas()
            // return
        } else {
            setTimeout(() =>{
                MensagemSimples(`${atirador} atirou no ${alvo}`)
            }, 1000)
            setTimeout(() =>{
                MensagemSimples('O tiro falhou... Era uma bala falsa!')
                balas_lista.splice(0,1)
                indice_bala_atirada++
                VerificarSeTemBalas()    
                if (numero_de_turnos >= 1) {
                    AtivarBotoes()
                }
                if (numero_de_turnos == 0) {
                    TurnoDoInimigo()
                }
            }, 4000)

        }
    }
    console.log(balas_lista)

    return true
}

start_button.addEventListener('click', function(){
    start_screen.style.display = 'none'
    GameStart()
})

atirar_no_inimigo.addEventListener('click', function(){
    inimigo_da_vez = pessoa_selecionada
    atirar('Você',pessoa_selecionada)
})

atirar_em_si_mesmo.addEventListener('click', function(){
    inimigo_da_vez = pessoa_selecionada
    atirar('Você', 'Você')
})



setTimeout(()=> {
    console.log('Atualizando por aqui')
}, 3000)