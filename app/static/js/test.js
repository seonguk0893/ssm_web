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

let buttonClicked = false; // 한 번의 음성 입력에 대해 한 번의 버튼 클릭만 처리되도록 하는 플래그

recognition.addEventListener("result", (e) => {
  let interimTranscript = "";

  for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
    let transcript = e.results[i][0].transcript;

    // 버튼을 클릭하는 조건을 확인하고, 클릭하도록 합니다.
    if (!buttonClicked) {
      if (
        transcript.includes("일번") ||
        transcript.includes("일 번") ||
        transcript.includes("1번") ||
        transcript.includes("1 번") ||
        transcript.includes("일본")
      ) {
        clickButton(1);
        buttonClicked = true;
      } else if (
        transcript.includes("이번") ||
        transcript.includes("이 번") ||
        transcript.includes("2번") ||
        transcript.includes("2 번")
      ) {
        clickButton(2);
        buttonClicked = true;
      } else if (
        transcript.includes("삼번") ||
        transcript.includes("삼 번") ||
        transcript.includes("3번") ||
        transcript.includes("3 번")
      ) {
        clickButton(3);
        buttonClicked = true;
      } else if (
        transcript.includes("사번") ||
        transcript.includes("사 번") ||
        transcript.includes("4번") ||
        transcript.includes("4 번")
      ) {
        clickButton(4);
        buttonClicked = true;
      } else if (
        transcript.includes("19번") ||
        transcript.includes("19 번")
      ) {
        clickButton(5);
        buttonClicked = true;
      } else if (
        transcript.includes("20번") ||
        transcript.includes("20 번")
      ) {
        clickButton(6);
        buttonClicked = true;
      } else if (
        transcript.includes("21번") ||
        transcript.includes("21 번")
      ) {
        clickButton(7);
        buttonClicked = true;
      } else if (
        transcript.includes("22번") ||
        transcript.includes("22 번")
      ) {
        clickButton(8);
        buttonClicked = true;
      }
    }

    interimTranscript += transcript;
  }

  if (e.results[e.results.length - 1].isFinal) {
    speechToText += interimTranscript;
    alertShown = false; // 알림이 표시되지 않았음을 나타내는 플래그 초기화
    document.querySelector(".para").innerHTML = speechToText;
    buttonClicked = false; // 음성 입력 처리가 끝났으므로 플래그를 재설정합니다.
  }
});


function clickButton(buttonId) {
  alert(`${buttonId}번 출구로 안내하겠습니다.`);
  playAudio(buttonId); // 버튼을 클릭하면 MP3 파일 재생
  recognition.stop(); // 음성 인식 중지
}

// MP3 파일을 재생하는 함수
function playAudio(buttonId) {
  let audio = new Audio(); // Audio 객체 생성
  let audioPath = ""; // MP3 파일 경로 설정

  // 버튼에 따라 재생할 MP3 파일 경로 설정
  switch (buttonId) {
    case 1:
      audioPath = "/static/1.wav";
      break;
    case 2:
      audioPath = "path/to/audio2.mp3";
      break;
    case 3:
      audioPath = "path/to/audio3.mp3";
      break;
    case 4:
      audioPath = "path/to/audio1.mp3";
      break;
    case 5:
      audioPath = "path/to/audio1.mp3";
      break;
    case 6:
      audioPath = "path/to/audio2.mp3";
      break;
    case 7:
      audioPath = "path/to/audio3.mp3";
      break;
    case 8:
      audioPath = "path/to/audio1.mp3";
      break;
    // 나머지 버튼에 대한 MP3 파일 경로도 설정할 수 있습니다.
    default:
      audioPath = ""; // 디폴트로 설정된 MP3 파일 경로
      break;
  }

  // MP3 파일 경로가 설정되어 있다면 재생
  if (audioPath !== "") {
    audio.src = audioPath; // Audio 객체에 MP3 파일 경로 설정
    audio.play(); // MP3 파일 재생
  }
}

document.getElementById("startSpeechButton").addEventListener("click", function () {
  recognition.start();
  alertShown = false; // Speech Recognition 시작 시 알림이 표시되지 않았음을 나타내는 플래그 초기화
});

// 문서 로드가 완료되면 버튼 클릭 이벤트 설정
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".image-button").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const buttonId = button.getAttribute("id").replace("button", ""); // 버튼의 ID에서 번호 추출
      clickButton(buttonId);
    });
  });
});

recognition.addEventListener("end", function () {
  // 음성인식 중지
  recognition.stop();
  // Speech Recognition 재시작 시 알림이 표시되지 않았음을 나타내는 플래그 초기화
  alertShown = false;
});
