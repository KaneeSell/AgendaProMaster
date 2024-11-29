// Ao carregar a pagina
verificarLocalStorage()
maxCaracterNome(false, localStorage.getItem('maxNome'))
maxCaracterDescricao(false, localStorage.getItem('maxDescricao'))
verificaEventoVazio()
verificarFecharAposSalvar()
// Declarando constantes
const barNavegacao = document.getElementById('barNavegacao');
const divBemVindo = document.getElementById('divBemVindo')
const divAgenda = document.getElementById('divAgenda')
const divConfiguracoes = document.getElementById('divConfiguracoes')
const liBemVindo = document.getElementsByClassName('nav-link')[0]
const liAgenda = document.getElementsByClassName('nav-link')[1]
const liConfiguracoes = document.getElementsByClassName('nav-link')[2]
const onfiltroAbertos = document.getElementById('onFiltroAbertos')
const offFiltroAbertos = document.getElementById('offFiltroAbertos')
const onFiltroFechados = document.getElementById('onFiltroFechados')
const offFiltroFechados = document.getElementById('offFiltroFechados')

function verificarFecharAposSalvar(){
    const fecharAposSalvar = localStorage.getItem('fecharAposSalvar')
    if(!fecharAposSalvar){
        localStorage.setItem('fecharAposSalvar', true)
    }
}
function verificaAbertoFechado(){
    const localStorageAbertos = localStorage.getItem('abertos')
    const localStorageFechados = localStorage.getItem('fechados')
    if(localStorageAbertos && localStorageFechados){
        if(localStorageAbertos == 'true'){
            offBtnFiltroAberto()
        } else{
            onBtnFiltroAberto()
        }
        if(localStorageFechados == 'true'){
            offBtnFiltroFechado()
        } else{
            onBtnFiltroFechado()
        }
    } else{
        offBtnFiltroAberto()
        offBtnFiltroFechado()
        atualizarEventos()
    }
}
verificaAbertoFechado()
// Data Flatpickr
flatpickr('#datePicker', {
    enableTime: true,
    dateFormat: "d/m/Y H:i",
    defaultDate: dataAtual()+' '+horaAtual(),
})
function dataAtual(){
    const data = new Date()
    const dia = data.getDate()+1
    const mes = data.getMonth()+1
    const ano = data.getFullYear()
    return `${dia}/${mes}/${ano}`
}
function horaAtual(){
    const data = new Date()
    const hora = data.getHours()
    const min = data.getMinutes()
    return `${hora}:${min}`
}
console.log(dataAtual())
// Funções
function retornoEventos(){
    return JSON.parse(localStorage.getItem('eventos'))
}
function verificaEventoVazio(){
    const eventos = retornoEventos()
    if(!eventos){
        localStorage.setItem('eventos', JSON.stringify([]))
    }
}
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
    atualizarEventos()
}
function linkConfiguracoes(){
    const FecharAposSalvar = localStorage.getItem('fecharAposSalvar')
    hideBarNavegacao(liConfiguracoes, liBemVindo, liAgenda)
    divAgenda.style.display = 'none'
    divBemVindo.style.display = 'none'
    divConfiguracoes.style.display = 'flex'
    maxCaracterNome(false, localStorage.getItem('maxNome'))
    maxCaracterDescricao(false, localStorage.getItem('maxDescricao'))
    if(FecharAposSalvar == 'true'){
        document.getElementById('FecharAposSalvar').checked = true
    } else{
        document.getElementById('FecharAposSalvar').checked = false
    }
}
// Funções de configurações
function maxCaracterDescricao(e = false, maxDescricao = false){
    if(e){
        e.preventDefault();
    }
    const inputMaxCaracterDescricao = document.getElementById('customRange2')
    const labelmaxCaracterDescricao = document.getElementById('maxCaracterDescricao')
    if(maxDescricao){
        labelmaxCaracterDescricao.innerHTML = `Máximo caracteres Descrição <code class="fs-6">${maxDescricao}</code>`
        inputMaxCaracterDescricao.value = maxDescricao
    } else{
        labelmaxCaracterDescricao.innerHTML = `Máximo caracteres Descrição <code class="fs-6">${inputMaxCaracterDescricao.value}</code>`
    }
}
function maxCaracterNome(e = false, maxNome = false){
    if(e){
        e.preventDefault();
    }
    const inputMaxCaracterNome = document.getElementById('customRange3')
    const labelmaxCaracterNome = document.getElementById('maxCaracterNome')
    if(maxNome){
    labelmaxCaracterNome.innerHTML = `Máximo caracteres nome <code class="fs-6">${maxNome}</code>`
    inputMaxCaracterNome.value = maxNome
    } else{
        labelmaxCaracterNome.innerHTML = `Máximo caracteres nome <code class="fs-6">${inputMaxCaracterNome.value}</code>`
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
// Constantes Agenda
const inputName = document.getElementById('inputName')
const inputDescricao = document.getElementById('inputDescricao')
// Funções Agenda
function btnNovoEvento(e){
    if(e){
        e.preventDefault();
    }
    inputName.maxLength = localStorage.getItem('maxNome')
    inputDescricao.maxLength = localStorage.getItem('maxDescricao')
    }
function onBtnFiltroAberto(e = false){
    if(e){
        e.preventDefault();
    }
    onfiltroAbertos.style.display = 'none'
    offFiltroAbertos.style.display = 'flex'
    localStorage.setItem('abertos', false)
    atualizarEventos()
}
function offBtnFiltroAberto(e = false){
    if(e){
        e.preventDefault();
    }
    onfiltroAbertos.style.display = 'flex'
    offFiltroAbertos.style.display = 'none'
    localStorage.setItem('abertos', true)
    atualizarEventos()
}
function onBtnFiltroFechado(e = false){
    if(e){
        e.preventDefault();
    }
    onFiltroFechados.style.display = 'none'
    offFiltroFechados.style.display = 'flex'
    localStorage.setItem('fechados', false)
    atualizarEventos()
}
function offBtnFiltroFechado(e = false){
    if(e){
        e.preventDefault();
    }
    onFiltroFechados.style.display = 'flex'
    offFiltroFechados.style.display = 'none'
    localStorage.setItem('fechados', true)
    atualizarEventos()
}
function criarDivEvento(id, nome, descricao, status, datacriacao, dataevento){
    const eventosPainel = document.getElementById('eventos-painel')
    return `
                    <div class="col">
                    <div class="card">
                      <div class="card-body position-relative pt-3" style="max-height: 250px;overflow: hidden;">
                        <div class="eventNumber">
                        <div class="d-flex justify-content-center align-items-center flex-row flex-nowrap text-align-center">
                            <span class="status bg-${status?'success':'danger'}" title="${status? 'Aberto':'Fechado'}"></span>
                            <p class="m-1 ms-4 btn btn-secondary cursor-none">${id}</p>
                        </div>
                          <h5 class="card-title">${nome}</h5>
                          <div>
                            <button class="btn btn-outline-${status?'danger':'success'} m-0 ms-4-5" onclick="${status?'desativarEvento(event,'+id+')':'restaurarEvento(event,'+id+')'}">${status?'☓':'✓'}</button>
                          </div>
                        </div>
                        <p class="card-text mb-0" id="limiteDescricao">${descricao}</p>
                        <div class="d-flex justify-content-center position-absolute bottom-0 start-0 w-100 pb-2">
                        </div>
                      </div>
                      <div class="card-footer text-body-secondary mb-0">
                        <button type="button" class="btn btn-primary poin" data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable" onclick="visualizarEvento(event, ${id})">
                            <svg class="text-body" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#B7B7B7"><path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z"/></svg>
                            Visualizar
                        </button>
                      </div>
                      <div class="card-footer text-body-secondary d-flex justify-content-center align-items-center p-0">
                        <p>
                        Data do Evento: <code class="fs-6">${dataevento}</code>
                        </p>
                        </div>
                        <div class="card-footer text-body-secondary d-flex justify-content-center align-items-center p-0">
                        <p>
                        Data de Criação: <code class="fs-6">${datacriacao}</code>
                        </p>
                      </div>
                    </div>
                  </div>
                            `
}
function visualizarEvento(e = false, id){
    if(e){
        e.preventDefault();
    }
    const eventos = retornoEventos()
    const alertEventoSalvo2 = document.getElementById('alertEventoSalvo2')
    const nome = eventos[id].nome
    const descricao = eventos[id].descricao
    const status = eventos[id].status
    const dataEvento = eventos[id].dataevento
    const conteudoModal = document.getElementById('conteudoModal') 
    conteudoModal.innerHTML = `
        <div class="modal-header">
          <span class="status bg-${status?'success':'danger'}" title="${status?'Aberto':'Fechado'}"></span>
          <p class="m-1 ms-4 btn btn-secondary cursor-none">${id}</p>
          <h5 class="card-title fs-1 ms-3" id="h5Nome">${nome}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="document.getElementById('titleAgendaProMaster').focus()"></button>
          </div>
          <div class="list-group-item list-group-item-primary d-flex justify-content-center align-items-center p-0">
          <p class="m-0 p-0">Data do Evento: <code class="fs-6">${dataEvento}</code></p>
        </div>
          <pre style="font-family: inherit;white-space: pre-line; word-wrap: break-word; padding: 10px;" class="modal-body pt-1 fs-2" id="preDescricao">
          ${descricao}
          </pre>
        <div class="list-group-item list-group-item-action list-group-item-danger d-flex justify-content-center text-align-center pb-0 d-none" id="alertEventoMaximoCaracter">
          <p class="m-1">Maximo limite de caracteres atingido!</p>
        </div>
        <div class="list-group-item list-group-item-action list-group-item-success  justify-content-center text-align-center pb-0" id="alertEventoSalvo2">
          <p class="m-1">Salvo com sucesso!</p>
        </div>
        <div class="modal-footer d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onsubmit="cancelarNovoEvento(event)" data-bs-dismiss="modal" aria-label="Close" onclick="document.getElementById('titleAgendaProMaster').focus()">
          <svg class="text-body" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#B7B7B7"><path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z"/></svg>
          Fechar</button>
          <button type="button" class="btn btn-primary" onclick="editarEvento(event, ${id})">
          <svg class="text-body" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#B7B7B7"><path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z"/></svg>
          Editar</button>
          <button class="btn btn-outline-${status?'danger':'success'} m-0" onclick="${status?'desativarEvento(event, '+id+')':'restaurarEvento(event, '+id+')'}" data-bs-dismiss="modal" aria-label="Close">${status?'☓':'✓'}</button>
        </div>
    `
}
function cancelarEdicaoEvento(e = false, id){
    if(e){
        e.preventDefault()
    }
    visualizarEvento(false, id)
}
function salvarEdicaoEvento(e = false, id){
    if(e){
        e.preventDefault()
    }
    const eventos = retornoEventos()
    const nome = document.getElementById('h5Nome').innerText
    const datacriacao = eventos[id].datacriacao
    const dataEvento = eventos[id].dataevento
    const status = eventos[id].status
    const descricao = document.getElementById('preDescricao').innerText
    const conteudoModal = document.getElementById('conteudoModal') 
    salvarEditadoEvento(id, nome, descricao, status, datacriacao, dataEvento)
    visualizarEvento(false, id)
}
function editarEvento(e = false, id){
    if(e){
        e.preventDefault()
    }
    const eventos = retornoEventos()
    const nome = eventos[id].nome
    const descricao = eventos[id].descricao
    const status = eventos[id].status
    const dataEvento = eventos[id].dataevento
    const conteudoModal = document.getElementById('conteudoModal') 
    conteudoModal.innerHTML = `
        <div class="modal-header">
          <span class="status bg-${status?'success':'danger'}" title="${status?'Aberto':'Fechado'}"></span>
          <p class="m-1 ms-4 btn btn-secondary cursor-none">${id}</p>
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#B7B7B7"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
          <h5 contenteditable="true" class="card-title fs-1 ms-3" oninput="limiteCaracterh5(event)" id="h5Nome">${nome}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="list-group-item list-group-item-primary d-flex justify-content-center align-items-center p-0">
          <p class="m-0 p-0">Data do Evento: <code class="fs-6">${dataEvento}</code></p>
        </div>
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#B7B7B7"><path d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"/></svg>
          <pre contenteditable="true" style="font-family: inherit;white-space: pre-line; word-wrap: break-word; border: 1px solid #ccc; padding: 10px;" class="modal-body pt-1 fs-2" id="preDescricao" oninput="limiteCaracterPre(event)">
          ${descricao}
          </pre>
        <div class="list-group-item list-group-item-action list-group-item-danger justify-content-center text-align-center pb-0" id="alertEventoMaximoCaracter">
          <p class="m-1">Maximo limite de caracteres atingido!</p>
        </div>
        <div class="list-group-item list-group-item-action list-group-item-success justify-content-center text-align-center pb-0" id="alertEventoSalvo2">
          <p class="m-1">Salvo com sucesso!</p>
        </div>
        <div class="modal-footer d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-danger" onclick="cancelarEdicaoEvento(event, ${id})">
          <svg class="text-body" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#B7B7B7"><path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q55 0 104-18t89-50L236-673q-32 40-50 89t-18 104q0 130 91 221t221 91Zm244-119q32-40 50-89t18-104q0-130-91-221t-221-91q-55 0-104 18t-89 50l437 437Z"/></svg>
          Cancelar</button>
          <button type="button" class="btn btn-primary" onclick="salvarEdicaoEvento(event, ${id})">
          <svg class="text-body" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#B7B7B7"><path d="M816-672v456q0 29.7-21.15 50.85Q773.7-144 744-144H216q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h456l144 144Zm-72 30L642-744H216v528h528v-426ZM480-252q45 0 76.5-31.5T588-360q0-45-31.5-76.5T480-468q-45 0-76.5 31.5T372-360q0 45 31.5 76.5T480-252ZM264-552h336v-144H264v144Zm-48-77v413-528 115Z"/></svg>
          Salvar</button>
        </div>
    `
}
function limiteCaracterh5(e){
    if(e){
        e.preventDefault();
    }
    const h5Nome = document.getElementById('h5Nome')
    const maxCaracterNome = localStorage.getItem('maxNome')
    const alertEventoMaximoCaracter = document.getElementById('alertEventoMaximoCaracter')
    if (h5Nome.innerText.length > maxCaracterNome) {
    h5Nome.innerText = h5Nome.innerText.slice(0, maxCaracterNome);
    }
    if (h5Nome.innerText.length >= maxCaracterNome) {
        h5Nome.setAttribute('contenteditable', 'false');
        alertEventoMaximoCaracter.style.display = 'flex'
        setTimeout(() => {
            h5Nome.setAttribute('contenteditable', 'true');
            alertEventoMaximoCaracter.style.display = 'none'
        }, 2500);
    }
}
function limiteCaracterPre(e){
    if(e){
        e.preventDefault();
    }
    const preDescricao = document.getElementById('preDescricao')
    const maxCaracterDescricaopre = localStorage.getItem('maxDescricao')
    const alertEventoMaximoCaracter = document.getElementById('alertEventoMaximoCaracter')
    if (preDescricao.innerText.length > maxCaracterDescricaopre) {
    preDescricao.innerText = preDescricao.innerText.slice(0, maxCaracterDescricaopre);
    }
    if (preDescricao.innerText.length >= maxCaracterDescricaopre) {
        preDescricao.setAttribute('contenteditable', 'false');
        alertEventoMaximoCaracter.style.display = 'flex'
        setTimeout(() => {
            preDescricao.setAttribute('contenteditable', 'true');
            alertEventoMaximoCaracter.style.display = 'none'
        }, 2500);
    }
}
function restaurarEvento(e = false, id){
    if(e){
        e.preventDefault();
    }
    let eventos = retornoEventos()
    const nome = eventos[id].nome
    const descricao = eventos[id].descricao
    const datacriacao = eventos[id].datacriacao
    const dataEvento = eventos[id].dataevento
    const status = true
    eventos[id] = ({'id': id,'nome': nome, 'descricao': descricao, 'status': status, 'datacriacao': datacriacao, 'dataevento': dataEvento})
    localStorage.setItem('eventos', JSON.stringify(eventos))
    atualizarEventos()
}
function desativarEvento(e = false, id){
    if(e){
        e.preventDefault();
    }
    let eventos = retornoEventos()
    const nome = eventos[id].nome
    const descricao = eventos[id].descricao
    const datacriacao = eventos[id].datacriacao
    const dataEvento = eventos[id].dataevento
    const status = false
    eventos[id] = ({'id': id,'nome': nome, 'descricao': descricao, 'status': status, 'datacriacao': datacriacao, 'dataevento': dataEvento})
    localStorage.setItem('eventos', JSON.stringify(eventos))
    atualizarEventos()
}
function salvarEditadoEvento(id, nome, descricao, status, datacriacao, dataEvento){
    const eventos = retornoEventos()
    eventos[id] = {'id': id,'nome': nome, 'descricao': descricao, 'status': status, 'datacriacao': datacriacao, 'dataevento': dataEvento}
    localStorage.setItem('eventos', JSON.stringify(eventos))
    atualizarEventos()
    visualizarEvento(false, id)
    setTimeout(()=>{
        const alertEventoSalvo = document.getElementById('alertEventoSalvo2')
        if(alertEventoSalvo){
            alertEventoSalvo.style.display = 'flex'
        }
    }, 300)
    setTimeout(()=>{
        const alertEventoSalvo = document.getElementById('alertEventoSalvo2')
        if(alertEventoSalvo){
            alertEventoSalvo.style.display = 'none'
        }
    }, 3000)
}

async function atualizarEventos() {
    try {
        await executarAtualizacao(); // Aguarda a função assíncrona
    } catch (error) {
        console.error("Erro durante a atualização:", error);
    } finally {
        divLoading.style.display = 'none'; // Oculta o loading quando terminar
    }
}

function salvarNovoEvento(e = false){
    if(e){
        e.preventDefault()
    }
    const fecharAposSalvar = localStorage.getItem('fecharAposSalvar')
    const alertEventoSalvo = document.getElementById('alertEventoSalvo')
    const nome = inputName.value
    const descricao = inputDescricao.value
    const dataEvento = document.getElementById('datePicker')
    verificaEventoVazio()
    const eventos = retornoEventos()
    const data = new Date()
    const dia = data.getDate() < 10? `0${data.getDate()}`: `${data.getDate()}`
    const mes = data.getMonth()+1 < 10? `0${data.getMonth()+1}`: `${data.getMonth()+1}`
    const ano = data.getFullYear()
    if(eventos.length == 0){
        localStorage.setItem('eventos', JSON.stringify([{'id': 0,'nome': nome, 'descricao': descricao, 'status': true, 'datacriacao': `${dataAtual()} ${horaAtual()}`, 'dataevento': dataEvento.value}]))
    } else{
        const id = eventos.length
        eventos.push({'id': id,'nome': nome, 'descricao': descricao, 'status': true, 'datacriacao': `${dataAtual()} ${horaAtual()}`, 'dataevento': dataEvento.value})
        localStorage.setItem('eventos', JSON.stringify(eventos))
    }
    atualizarEventos()
    inputName.value = ''
    inputDescricao.value = ''
    alertEventoSalvo.style.display = 'flex'
    inputName.focus()
    setTimeout(()=>{
        alertEventoSalvo.style.display = 'none'
    }, 1300)
    if(fecharAposSalvar == 'true'){
        document.getElementById('titleAgendaProMaster').focus()
        document.querySelector('[data-bs-dismiss="modal"]').click();
    }
}
function executarAtualizacao(){
    return new Promise(resolve => {
        const divLoading = document.getElementById('divLoading');
        if (divLoading){
            divLoading.style.display = 'flex';
        } 
        setTimeout(() => {
    const eventos = retornoEventos()
    const conteudoModal = document.getElementById('conteudoModal') 
    const eventosPainel = document.getElementById('eventos-painel')
    const divNenhumResultado = document.getElementById('divNenhumResultado')
    const divResultadoEncontrado = document.getElementById('divResultadoEncontrado')
    const pResultadoEncontrado = document.getElementById('pResultadoEncontrado')
    const abertos = onfiltroAbertos.style.display == 'flex'? true:false
    const fechados = onFiltroFechados.style.display == 'flex'? true:false
    document.getElementById('eventos-painel').style.display = 'flex'
    // conteudoModal.innerHTML = ''
    let divEventos = ''
    let resultado = 0
    for(let i = 0; i < eventos.length; i++){
        if(abertos == true && eventos[i].status == true){
            divEventos += criarDivEvento(eventos[i].id, eventos[i].nome, eventos[i].descricao, eventos[i].status, eventos[i].datacriacao, eventos[i].dataevento)
            resultado++
        }
        if(fechados == true && eventos[i].status == false){
            divEventos += criarDivEvento(eventos[i].id, eventos[i].nome, eventos[i].descricao, eventos[i].status, eventos[i].datacriacao, eventos[i].dataevento)
            resultado++
        }
    }
    if(resultado == 0){
        divNenhumResultado.style.display = 'block'
        divResultadoEncontrado.style.display = 'none'
        divLoading.style.display = 'none'
        // setTimeout(()=>{
            //     divNenhumResultado.style.display = 'none'
            // }, 2000)
        } else{
            divNenhumResultado.style.display = 'none'
            divResultadoEncontrado.style.display = 'block'
            pResultadoEncontrado.innerText = `${resultado} Resultados encontrados.`
            divLoading.style.display = 'none'
            // setTimeout(()=>{
                //     divResultadoEncontrado.style.display = 'none'
                // }, 2000)
            }
    eventosPainel.innerHTML = divEventos
    divLoading.style.display = 'none'; // Oculta o indicador de carregamento

    resolve(); // Resolve a Promise após o processamento
}, 0); // Simulação de carregamento
});
}
function cancelarNovoEvento(e = false){
    if(e){
        e.preventDefault();
    }
    inputName.value = ''
    inputDescricao.value = ''
    inputName.focus()
    inputName.blur()
}
// Constantes Configurações
    const inputMaxCaracterNome = document.getElementById('customRange3')
    const inputMaxCaracterDescricao = document.getElementById('customRange2')
    // Funções Configurações
    function salvarConfiguracao(e = false){
        if(e){
            e.preventDefault();
        }
        const FecharAposSalvar = document.getElementById('FecharAposSalvar').checked? true: false
        localStorage.setItem('maxNome', inputMaxCaracterNome.value)
        localStorage.setItem('maxDescricao', inputMaxCaracterDescricao.value)
        localStorage.setItem('fecharAposSalvar', FecharAposSalvar)
}
function resetConfiguracoes(id){
    const eventos = JSON.parse(localStorage.getItem("eventos"))
    localStorage.setItem(`edit`, id)
    atualizaStorage(eventos[id].nome, eventos[id].descricao)
    offBtnFiltroAberto()
    offBtnFiltroFechado()
    atualizarEventos();
}
function resetConfiguracoes(e = false){
    if(e){
        e.preventDefault();
    }
    localStorage.setItem('maxNome', 30)
    localStorage.setItem('maxDescricao', 300)
    localStorage.setItem('fecharAposSalvar', true)
    linkConfiguracoes()
}
function apagarTudo(e){
    if(e){
        e.preventDefault();
    }
    localStorage.setItem('eventos', JSON.stringify([]))
    atualizarEventos()
}
function configCaracterNome(){
    let caracterNome = document.getElementById('nome-evento')
    caracterNome.maxLength = `${inputMaxCaracterNome.value}`
    localStorage.setItem('caracterNome', inputMaxCaracterNome.value)
}
function configCaracterDesc(){
    let caracterDescricao = document.getElementById('descricao-evento')
    caracterDescricao.maxLength = `${inputMaxCaracterDescricao.value}`
    localStorage.setItem('caracterDescricao', inputMaxCaracterDescricao.value)
}
