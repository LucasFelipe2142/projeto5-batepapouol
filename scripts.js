let msg_container = document.querySelector('.container-msg');
let name;
function iniciar(){
    const date = new Date().toLocaleTimeString();
    name = prompt("Digite o seu nome; ");
    msg_container.innerHTML += `
                                <div class="msg-entrou">
                                    <div class="hora">
                                        (${date})
                                    </div>

                                    <div class="name">
                                        ${name}
                                    </div>

                                    entrou na sala
                                </div> `;
}
iniciar();


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
}