window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = "ko-KR";
recognition.continuous = true;

let p = document.createElement("p");
p.classList.add("para");

let words = document.querySelector(".words");
words.appendChild(p);

let speechToText = "";
let alertShown = false; // 알림이 표시되었는지 여부를 나타내는 플래그

function clickButton(buttonId) {
  if (!alertShown) {
    alert(`버튼 ${buttonId}이(가) 클릭되었습니다!`);
    alertShown = true; // 알림이 표시되었음을 기록
  }
}

recognition.addEventListener("result", (e) => {
  let interimTranscript = "";
  for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
    let transcript = e.results[i][0].transcript;

    // 특정 단어를 포함하고 있는지 확인하여 버튼 클릭
    if (
      transcript.includes("일번") ||
      transcript.includes("일 번") ||
      transcript.includes("1번") ||
      transcript.includes("1 번") ||
      transcript.includes("일본")
    ) {
      clickButton(1);
    } else if (
        transcript.includes("이번") ||
        transcript.includes("이 번") ||
        transcript.includes("2번") ||
        transcript.includes("2 번")
    ) {
      clickButton(2);
    } else if (
        transcript.includes("삼번") ||
        transcript.includes("삼 번") ||
        transcript.includes("3번") ||
        transcript.includes("3 번")
    ) {
      clickButton(3);
    } else if (
        transcript.includes("사번") ||
        transcript.includes("사 번") ||
        transcript.includes("4번") ||
        transcript.includes("4 번")
    ) {
      clickButton(4);
    } else if (
        transcript.includes("19번") ||
        transcript.includes("19 번")
    ) {
      clickButton(5);
    } else if (
        transcript.includes("20번") ||
        transcript.includes("20 번")
    ) {
      clickButton(6);
    } else if (
        transcript.includes("21번") ||
        transcript.includes("21 번")
    ) {
      clickButton(7);
    } else if (
        transcript.includes("22번") ||
        transcript.includes("22 번")
    ) {
      clickButton(8);
    }

    if (e.results[i].isFinal) {
      speechToText += transcript;
      alertShown = false; // 알림이 표시되지 않았음을 나타내는 플래그 초기화
    } else {
      interimTranscript += transcript;
    }
  }
  document.querySelector(".para").innerHTML = speechToText + interimTranscript;
});

document.getElementById("startSpeechButton").addEventListener("click", function () {
  recognition.start();
  alertShown = false; // Speech Recognition 시작 시 알림이 표시되지 않았음을 나타내는 플래그 초기화
});

recognition.addEventListener("end", function () {
  recognition.start();
  alertShown = false; // Speech Recognition 종료 시 알림이 표시되지 않았음을 나타내는 플래그 초기화
});
