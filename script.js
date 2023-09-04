
function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

const messagesContainer = document.getElementById('messages')

const heartElem = document.createElement('i')
heartElem.classList.add("nes-icon")
heartElem.classList.add("is-medium")
heartElem.classList.add("heart")

let heartAmount = 1

const weddingDateStr = '2021-09-04T07:00:00.000000Z'
const timestamp = Date.parse(weddingDateStr);
const weddingDateTimestamp = new Date(timestamp);

const weddingDateDifference = (messageDateTimestamp) => {
    const weddingDateStr = '2021-09-04T07:00:00.000000Z'
    const weddingDateTimestamp = Date.parse(weddingDateStr)
    const weddingDateFormatted = new Date(timestamp);
    const weddingYear = weddingDateFormatted.getFullYear();

    const messageDate = new Date(messageDateTimestamp * 1000)
    const messageYear = messageDate.getFullYear();

    const difference = messageYear - weddingYear;
    return difference
}

const linkFormer = (hash) => {
    return `https://www.blockchain.com/ru/explorer/transactions/btc/${hash}`
}

fetch('https://blockchain.info/rawaddr/1GQG6i6j9nLN3KKdKGAEU9T44sukDeFcNx')
    .then(response => response.json())
    .then(data => {
        data.txs.forEach(transaction => {
            if(transaction.result < 0){
                const date = new Date(transaction.time * 1000);
                transaction.out.forEach(txInfo => {
                    if(txInfo.value === 0){
                        // console.log(transaction.hash)
                        console.log(linkFormer(transaction.hash))

                        const hashData = txInfo.script
                        const message = hex2a(hashData).slice(2)

                        const yearsDifference = weddingDateDifference(transaction.time)

                        const msgElement = document.createElement("a")
                        msgElement.classList.add("message-element")
                        // msgElement.innerText = message
                        msgElement.innerText = `${yearsDifference}'nd Wedding Anniversary: '${message}'`
                        msgElement.setAttribute("href", linkFormer(transaction.hash));

                        messagesContainer.appendChild(msgElement)
                        heartAmount+=1
                    }
                })
            }
        })
    })


// function hex2a(hexx) {
//     var hex = hexx.toString();//force conversion
//     var str = '';
//     for (var i = 0; i < hex.length; i += 2)
//         str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
//     return str;
// }


// function getMessage(){
//     const txHash = document.getElementById("hashInput").value;
//     let message = ''
//     fetch('https://blockchain.info/rawtx/' + txHash)
//     .then(response => response.json())
//     .then(data => {
//         data.out.forEach(elem => {
//             if (!('addr' in elem)){
//                 const hashData = elem.script
//                 message = hex2a(elem.script).slice(2)
//                 document.getElementById("messageText").innerText = message
//             }
//         })
//     })
//     .catch(error => console.error(error));
// }

// const submitBtn = document.getElementById("submit")
// submitBtn.addEventListener("click", getMessage);
