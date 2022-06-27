let msg_container = document.querySelector('.container-msg');
let name;
let nome1;
let msg;

function iniciar(){
    name = prompt("Digite o seu nome; ");
    const nome = {
        name: name
    };
    nome1 = nome;
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/participants",
        nome
      );
    promise.then(inserir_nome);
    promise.catch(deu_erro);
}
iniciar();

function deu_erro(error){
    if(error.response.status == 400){
    alert(`erro ${error.response.status}, insira outro nome`)
    iniciar();
    }
    else{
        alert(`erro ${error.response.status}`);
    }
    
}

function inserir_nome(){
    console.log("foi")
    buscar_msg()
    
}

function buscar_msg(){
    console.log("atualizando msg")
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(busca)
}

function busca (busca){
    let elementoQueQueroQueApareca;
    const array = busca.data;

    for (let i = 0; i < array.length; i++) {
        if(array[i].type == 'message'){
            msg_container.innerHTML += `
                                <div class="msg">
                                    <div class="hora">
                                        (${array[i].time})
                                    </div>

                                    <div class="name">
                                        ${array[i].from}
                                    </div>
                                    
                                    para

                                    <div class ="privacidade">
                                        ${array[i].to}
                                    </div>

                                    <div class ="tex">
                                        ${array[i].text}
                                    </div>
                                 </div> `;
                                 scroll();
        }
        
        if(array[i].type == 'status'){
            msg_container.innerHTML += `
                                <div class="msg-entrou">
                                    <div class="hora">
                                        (${array[i].time})
                                    </div>

                                    <div class="name">
                                        ${array[i].from}
                                    </div>
                                    

                                        ${array[i].text}
                                 </div> `;
                                 scroll();
        }
        
    

        if(array[i].type == 'private_message' && name == array[i].to){
            msg_container.innerHTML += `
                                <div class="msg-privada">
                                    <div class="hora">
                                        (${array[i].time})
                                    </div>

                                    <div class="name">
                                        ${array[i].from}
                                    </div>
                                    
                                    para

                                    <div class ="privacidade">
                                        ${array[i].to}
                                    </div>

                                    <div class ="tex">
                                        ${array[i].text}
                                    </div>

                                </div> `;
                                scroll();
        }
        
    }
    
}


function enviar_msg(){
    const date = new Date().toLocaleTimeString();
    msg = document.querySelector('.text-msg');
    let mensagem = {
        from: name,
        to: "Todos",
        text: msg.value,
        type: "message"
    }

    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/messages",
        mensagem );
    promise.then(buscar_msg);
    promise.catch(deu_erro_enviar);
    msg.value = "";

}

function deu_erro_enviar(){
    window.location.reload();
}

function logado(){
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/status",
        nome1
      );
    promise.then(inserir_nome_logado);
    promise.catch(deu_erro);
}

function inserir_nome_logado(){
    console.log("logado")
}

function scroll(){
    const ultima_msg = msg_container.lastElementChild;
    ultima_msg.scrollIntoView();
}

setInterval(logado, 5000);
setInterval(buscar_msg, 3000);