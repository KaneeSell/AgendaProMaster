// Ao carregar a pagina
verificarLocalStorage()
maxCaracterNome(false, localStorage.getItem('maxNome'))
maxCaracterDescricao(false, localStorage.getItem('maxDescricao'))
// Declarando constantes
const barNavegacao = document.getElementById('barNavegacao');
const divBemVindo = document.getElementById('divBemVindo')
const divAgenda = document.getElementById('divAgenda')
const divConfiguracoes = document.getElementById('divConfiguracoes')
const liBemVindo = document.getElementsByClassName('nav-link')[0]
const liAgenda = document.getElementsByClassName('nav-link')[1]
const liConfiguracoes = document.getElementsByClassName('nav-link')[2]

// Funções
function verificarLocalStorage(){
    const maxNome = localStorage.getItem('maxNome')
    const maxDescricao = localStorage.getItem('maxDescricao')
    if(maxNome == undefined && maxDescricao == undefined){
        localStorage.setItem('maxNome', 30)
        localStorage.setItem('maxDescricao', 300)
    }
}
function hideBarNavegacao(...elementos){
    const collapse = new bootstrap.Collapse(barNavegacao);
    collapse.toggle();
    trocaAtivos(...elementos)
    function trocaAtivos(...elementos){
        elementos.forEach(elemento => {
            elemento.className = 'nav-link';
        });
        if (elementos.length > 0) {
            elementos[0].className = 'nav-link active';
        }
    }
}
function linkBemVindo(){
    hideBarNavegacao(liBemVindo, liConfiguracoes, liAgenda)
    divAgenda.style.display = 'none'
    divBemVindo.style.display = 'block'
    divConfiguracoes.style.display = 'none'
}
function linkAgenda(){
    hideBarNavegacao(liAgenda, liBemVindo, liConfiguracoes)
    divAgenda.style.display = 'block'
    divBemVindo.style.display = 'none'
    divConfiguracoes.style.display = 'none'
}
function linkConfiguracoes(){
    hideBarNavegacao(liConfiguracoes, liBemVindo, liAgenda)
    divAgenda.style.display = 'none'
    divBemVindo.style.display = 'none'
    divConfiguracoes.style.display = 'flex'
}
// Funções de configurações
function maxCaracterDescricao(e = false, maxDescricao = false){
    if(e){
        e.preventDefault();
    }
    const inputMaxCaracterDescricao = document.getElementById('customRange2')
    const labelmaxCaracterDescricao = document.getElementById('maxCaracterDescricao')
    if(maxDescricao){
        labelmaxCaracterDescricao.innerText = `Máximo caracteres Descrição ${maxDescricao}`
        inputMaxCaracterDescricao.value = maxDescricao
    } else{
        labelmaxCaracterDescricao.innerText = `Máximo caracteres Descrição ${inputMaxCaracterDescricao.value}`
    }
}
function maxCaracterNome(e = false, maxNome = false){
    if(e){
        e.preventDefault();
    }
    const inputMaxCaracterNome = document.getElementById('customRange3')
    const labelmaxCaracterNome = document.getElementById('maxCaracterNome')
    if(maxNome){
    labelmaxCaracterNome.innerText = `Máximo caracteres nome ${maxNome}`
    inputMaxCaracterNome.value = maxNome
    } else{
        labelmaxCaracterNome.innerText = `Máximo caracteres nome ${inputMaxCaracterNome.value}`
    }
}
// Tooltip and popover demos
document.querySelectorAll('.tooltip-demo')
.forEach(tooltip => {
  new bootstrap.Tooltip(tooltip, {
    selector: '[data-bs-toggle="tooltip"]'
  })
})

document.querySelectorAll('[data-bs-toggle="popover"]')
.forEach(popover => {
  new bootstrap.Popover(popover)
})

document.querySelectorAll('.toast')
.forEach(toastNode => {
  const toast = new bootstrap.Toast(toastNode, {
    autohide: false
  })

  toast.show()
})
// Funções Agenda
function visualizarEvento(e = false){
    if(e){
        e.preventDefault();
    }
}