//Declarando constantes
const barNavegacao = document.getElementById('barNavegacao');
const divBemVindo = document.getElementById('divBemVindo')
const divAgenda = document.getElementById('divAgenda')
const divConfiguracoes = document.getElementById('divConfiguracoes')
const liBemVindo = document.getElementsByClassName('nav-link')[0]
const liAgenda = document.getElementsByClassName('nav-link')[1]
const liConfiguracoes = document.getElementsByClassName('nav-link')[2]

//Funções
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