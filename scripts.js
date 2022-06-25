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
}


function buscar_msg(){
 
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(busca)
}

function busca (busca){
    console.log(busca.data)
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

                                        ${array[i].text}
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

    if(array[i].type == 'private_message'){
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

                                    ${array[i].text}
                             </div> `;
    }
        
    

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
        promise.then(inserir_nome);
        promise.catch(deu_erro);
    }

    setInterval(logado, 5000);
}
