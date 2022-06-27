let msg_container = document.querySelector('.container-msg');
let name;
let nome1;

function iniciar(){
    name = prompt("Digite o seu nome; ");
    buscar_msg()
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
    alert(`erro ${error.response.status}, insira outro nome`)
    iniciar();
    
}

function inserir_nome(){
    console.log("foi")
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promise.then(busca_nome)
}

function busca_nome(buscar){
    const date = new Date().toLocaleTimeString();
    console.log(buscar.data)
    const array = buscar.data;
    console.log(array[2].name)
    for (let i = 0; i < array.length; i++) {
        if(array[i].name == name){
            msg_container.innerHTML += `
                                <div class="msg-entrou">
                                    <div class="hora">
                                        (${date})
                                    </div>

                                    <div class="name">
                                        ${array[i].name}
                                    </div>

                                        entrou na sala
                                 </div> `;
        }
    }
}

function buscar_msg(){
 
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
            
        }
        
    }

    /*if(array[i].type == 'private_message'){
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
    }*/
        
    
    
    
}


function enviar_msg(){
    const date = new Date().toLocaleTimeString();
    let msg = document.querySelector('.text-msg').value;
    msg_container.innerHTML += `
                                <div class="msg">
                                    <div class="hora">
                                        (${date})
                                    </div>

                                    <div class="name">
                                        ${name}
                                    </div>
                                    
                                    para

                                    <div class ="privacidade">
                                     todos
                                    </div>

                                    ${msg}
                                </div> `;

    const elementoQueQueroQueApareca = document.querySelector('.msg');
    elementoQueQueroQueApareca.scrollIntoView();

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

    setInterval(logado, 5000);
}
