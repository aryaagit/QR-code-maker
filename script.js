let textInput = document.getElementById('textInput');
let qrCode = document.getElementById('qrCode');
let qrContainer = document.getElementById('qrContainer');
let btn = document.getElementById('btn');
let downloadBtn = document.getElementById('downloadqrCode');
let micBtn = document.getElementById('micBtn');

btn.addEventListener('click', function () {
    generateQR();
});

function generateQR() {
    let text = textInput.value.trim();
    if (text === "") {
        alert('Please enter some text');
        return;
    }

    let fetchUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
    qrCode.src = fetchUrl;

    qrContainer.style.display = 'block';
}

downloadBtn.addEventListener('click', function () {
    let link = document.createElement('a');
    link.href = qrCode.src;
    link.download = 'QR_Code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Speech Recognition Feature
let recognition;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    micBtn.addEventListener('click', function () {
        recognition.start();
    });

    recognition.onresult = function (event) {
        let speechResult = event.results[0][0].transcript;
        textInput.value = speechResult;
    };

    recognition.onerror = function (event) {
        alert('Speech recognition error. Please try again.');
    };
} else {
    micBtn.disabled = true;
    micBtn.title = "Speech recognition not supported in this browser";
}
