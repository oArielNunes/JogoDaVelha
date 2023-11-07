let x = document.querySelector('.x');
let o = document.querySelector('.o');
let boxes = document.querySelectorAll('.box');
let buttons = document.querySelectorAll('#btnContainer button');
let msgContainer = document.querySelector('#msg');
let elP = document.querySelector('#msg p');
let secondPlayer;
let loading = document.querySelector('#loading')


// TELA DE LOADING //

setTimeout(() => {
    loading.style.display = 'none';
}, 1500);

//FUNÇÃO PARA ESCOLHER O MODO DE JOGO //


for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener('click', function() {   // percorrendo todos os botões e checando a interação de click //

        secondPlayer = this.getAttribute('id'); //Armazenando o atributo 'id' do botão selecionado //
        
        for (let b = 0; b < buttons.length; b++) {

            buttons[b].style.display = 'none';      //escondendo os botões //
        }

        setTimeout(() => {
            let container = document.querySelector('#gameContainer');       // mostrando o tabuleiro do  jogo //

            container.classList.remove('hide');
        }, 500);
    })

}



// contador de jogadas //

let player1 = 0;
let player2 = 0;





// adicionando um listener nos eventos de clique nas boxes //

for (let i = 0; i < boxes.length; i++) {

    boxes[i].addEventListener('click', function () {      // quando alguém clicar em alguma box //

        let element = checkEl(player1, player2);


        if (this.childNodes.length == 0) {      //VERIFICA SE HÁ ALGUM ELEMENTO JÁ INSERIDO // 
            let cloneElement = element.cloneNode(true);   //função que clona o elemento, para que possamos usá-lo posteriormente em outras boxes. //
            this.appendChild(cloneElement);

            //computar a jogada //

            if (player1 == player2) {
                player1++;

                if(secondPlayer == 'aiPlayer') {  // checando se o jogador2 é a maquina, se for, faz com que a jogada do player1 seja só sobre o elemento X //

                    computerPlay();

                    player2++;
                }
            } else {
                player2++;
            }

            // FUNÇÃO QUE CHECA QUEM VENCEU //
            checkWinCond();

        }
    });



}






// lógica da CPU //

function computerPlay() {
    let cloneO = o.cloneNode(true);
    let counter = 0;
    let filled = 0;

    for (let i = 0; i < boxes.length; i++) {

//SÓ PREENCHE SE ESTIVER VAZIO //


        let randomNum = Math.floor(Math.random() *6);  // o número aleatório serve para checar se a CPU deve ou não preencher a box se ela estiver vazia //

        if(boxes[i].childNodes[0] == undefined) {            // checando se as boxes tem algum elemento //  // Se for igual a indefinido, siginifica que ainda não foi preenchida //
            if (randomNum <= 1)  {
                boxes[i].appendChild(cloneO);   // se o número for X, então a CPU usa o elemento clonado pra preencher a box //
                counter++;  //contador serve de condicional para parar a função recursiva //
                break;
            }
        }else {

//CHECA QUANTAS ESTÃO PREENCHIDAS //


            filled++;   // o preenchido serve para que, se todas as box estiverem preenchidas, a função não fique infinita //
        }

    }

    if(counter == 0 && filled < 9) {       //CONDIÇÃO PARA FUNÇÃO RECURSIVA //
        computerPlay();
    }
}



// CHECA DE QUEM É A VEZ //


function checkEl(player1, player2) {

    if (player1 == player2) {
        // x //
        element = x;                //determinando por meio de uma função, de qual jogador será o elemento inserido dentro da box//
    }                               
    else {
        // o //
        element = o;

    }
    return element;
}




//FUNÇÃO PARA CHECAR QUEM VENCEU //

function checkWinCond() {
    let b1 = document.getElementById('block-1');
    let b2 = document.getElementById('block-2');
    let b3 = document.getElementById('block-3');
    let b4 = document.getElementById('block-4');
    let b5 = document.getElementById('block-5');        // selecionando todas as boxes //
    let b6 = document.getElementById('block-6');
    let b7 = document.getElementById('block-7');
    let b8 = document.getElementById('block-8');
    let b9 = document.getElementById('block-9');

    if (b1.childNodes.length > 0 && b2.childNodes.length > 0 && b3.childNodes.length > 0) {              // CHECANDO A PRIMEIRA LINHA HORIZONTAL //

        let b1Child = b1.childNodes[0].className;
        let b2Child = b2.childNodes[0].className;           // CHECANDO SE A CLASSE É 'X' OU 'O' //
        let b3Child = b3.childNodes[0].className;

        if (b1Child == 'x' && b2Child == 'x' && b3Child == 'x') {
            showWinner('x'); // X VENCE //

        } else if (b1Child == 'o' && b2Child == 'o' && b3Child == 'o') {
            showWinner('o');      // O VENCE //
        }

    }

    if (b4.childNodes.length > 0 && b5.childNodes.length > 0 && b6.childNodes.length > 0) {              // CHECANDO A SEGUNDA LINHA HORIZONTAL //

        let b4Child = b4.childNodes[0].className;
        let b5Child = b5.childNodes[0].className;
        let b6Child = b6.childNodes[0].className;

        if (b4Child == 'x' && b5Child == 'x' && b6Child == 'x') {
            showWinner('x');

        } else if (b4Child == 'o' && b5Child == 'o' && b6Child == 'o') {
            showWinner('o');
        }

    }


    if (b7.childNodes.length > 0 && b8.childNodes.length > 0 && b9.childNodes.length > 0) {              // CHECANDO A TERCEIRA LINHA HORIZONTAL //

        let b7Child = b7.childNodes[0].className;
        let b8Child = b8.childNodes[0].className;
        let b9Child = b9.childNodes[0].className;

        if (b7Child == 'x' && b8Child == 'x' && b9Child == 'x') {
            showWinner('x');

        } else if (b7Child == 'o' && b8Child == 'o' && b9Child == 'o') {
            showWinner('o');
        }

    }

    if (b1.childNodes.length > 0 && b4.childNodes.length > 0 && b7.childNodes.length > 0) {              // CHECANDO A PRIMEIRA LINHA VERTICAL //

        let b1Child = b1.childNodes[0].className;
        let b4Child = b4.childNodes[0].className;
        let b7Child = b7.childNodes[0].className;

        if (b1Child == 'x' && b4Child == 'x' && b7Child == 'x') {
            showWinner('x');

        } else if (b1Child == 'o' && b4Child == 'o' && b7Child == 'o') {
            showWinner('o');
        }

    }

    if (b2.childNodes.length > 0 && b5.childNodes.length > 0 && b8.childNodes.length > 0) {              // CHECANDO A SEGUNDA LINHA VERTICAL //

        let b2Child = b2.childNodes[0].className;
        let b5Child = b5.childNodes[0].className;
        let b8Child = b8.childNodes[0].className;

        if (b2Child == 'x' && b5Child == 'x' && b8Child == 'x') {
            showWinner('x');

        } else if (b2Child == 'o' && b5Child == 'o' && b8Child == 'o') {
            showWinner('o');
        }

    }

    if (b3.childNodes.length > 0 && b6.childNodes.length > 0 && b9.childNodes.length > 0) {              // CHECANDO A TERCEIRA LINHA VERTICAL //

        let b3Child = b3.childNodes[0].className;
        let b6Child = b6.childNodes[0].className;
        let b9Child = b9.childNodes[0].className;

        if (b3Child == 'x' && b6Child == 'x' && b9Child == 'x') {
            showWinner('x');

        } else if (b3Child == 'o' && b6Child == 'o' && b9Child == 'o') {
            showWinner('o');
        }

    }

    if (b1.childNodes.length > 0 && b5.childNodes.length > 0 && b9.childNodes.length > 0) {              // CHECANDO A PRIMEIRA DIAGONAL //

        let b1Child = b1.childNodes[0].className;
        let b5Child = b5.childNodes[0].className;
        let b9Child = b9.childNodes[0].className;

        if (b1Child == 'x' && b5Child == 'x' && b9Child == 'x') {
            showWinner('x');

        } else if (b1Child == 'o' && b5Child == 'o' && b9Child == 'o') {
            showWinner('o');
        }

    }

    if (b3.childNodes.length > 0 && b5.childNodes.length > 0 && b7.childNodes.length > 0) {              // CHECANDO A SEGUNDA DIAGONAL //

        let b3Child = b3.childNodes[0].className;
        let b5Child = b5.childNodes[0].className;
        let b7Child = b7.childNodes[0].className;

        if (b3Child == 'x' && b5Child == 'x' && b7Child == 'x') {
            showWinner('x');

        } else if (b3Child == 'o' && b5Child == 'o' && b7Child == 'o') {
            showWinner('o');
        }

    }
    // CHECANDO SE DEU VELHA //

    let counter = 0;

    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].childNodes[0] != undefined) {           // checando uma box por vez e verificando se há um elemento dentro//
            counter++;
        }
    }
    if (counter == 9) {
        showWinner('Deu velha');
    }
}




//FUNÇÃO PARA MOSTRAR QUEM VENCEU (ou se deu velha)//

function showWinner(winner) {

    let scoreboardX = document.querySelector('#scoreboard1'); 
    let scoreboardO = document.querySelector('#scoreboard2');
    let msg = '';

    if(winner == 'x') {
        scoreboardX.textContent = parseInt(scoreboardX.textContent) +1;
        msg = 'O jogador X venceu!'
    }
    else if (winner == 'o') {
        scoreboardO.textContent = parseInt(scoreboardO.textContent) +1;
        msg = 'O jogador O venceu!'
    }
    else {
        msg = 'Deu velha!'
    }

    // EXIBE A MENSAGEM //

    elP.innerHTML = msg;
    msgContainer.classList.remove('hide');


    //ESCONDE A MENSAGEM //

    setTimeout(function(){

        msgContainer.classList.add('hide');

    },2000)

    // ZERA AS JOGADAS //

    player1 = 0;
    player2 = 0;

    // ZERA OS CAMPOS X / O //

    let boxesToRemove = document.querySelectorAll('.box div');

    for(let i = 0; i < boxesToRemove.length; i++) {
        boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]);
    }
}
