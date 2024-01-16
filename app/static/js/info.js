const imagesPerPart = [44, 43, 43, 27, 13, 7, 5, 3, 7];

const numParts = imagesPerPart.length;

const imageFileNamesArray = [];

let imageCounter = 1;

for (let part = 0; part < numParts; part++) {
  const partImageCount = imagesPerPart[part];

  const imageFileNames = [];
  for (let i = 0; i < partImageCount; i++) {
    imageFileNames.push(`img-${imageCounter}.png`);
    imageCounter++;
  }

  imageFileNamesArray.push(imageFileNames);
}

console.log(imageFileNamesArray);

// 각 카테고리에 대한 슬라이더와 버튼 추가
for (let part = 0; part < numParts; part++) {
  const sliderContainer = document.querySelector(`.slider-${part + 1}`);
  const nextButton = document.querySelector(`.next-${part + 1}`);
  const prevButton = document.querySelector(`.prev-${part + 1}`);

  // 이미지를 슬라이더에 추가
  const sliderImages = sliderContainer.querySelectorAll(".item img");
  if (sliderImages.length === 0) {
    imageFileNamesArray[part].forEach((fileName, relativeIndex) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `<img src="static/img/${fileName}" alt="" data-part="${part}" data-relative-index="${relativeIndex}" onclick="handleImageClick(this)">`;
      sliderContainer.appendChild(div);
    });
  }

  // 슬라이더 기능 추가 (이미지 슬라이드)
  nextButton.addEventListener("click", () => {
    sliderContainer.scrollBy({
      left: sliderContainer.offsetWidth,
      behavior: "smooth",
    });
  });

  prevButton.addEventListener("click", () => {
    sliderContainer.scrollBy({
      left: -sliderContainer.offsetWidth,
      behavior: "smooth",
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const resetButton = document.getElementById("resetButton");

  // 검색 버튼 클릭 시 또는 엔터키 입력 시 검색 실행
  function performSearch() {
    const searchTerm = searchInput.value.trim(); // 검색어

    // 모든 이미지 삭제
    for (let part = 0; part < numParts; part++) {
      const sliderContainer = document.querySelector(`.slider-${part + 1}`);
      const sliderImages = sliderContainer.querySelectorAll(".item");
      sliderImages.forEach((item) => {
        item.remove();
      });
    }

    // 검색어와 일치하는 이미지만 해당 슬라이더에 추가
    let startIndex = 0;
    for (let part = 0; part < numParts; part++) {
      const partImagesCount = imagesPerPart[part];
      for (let i = startIndex; i < startIndex + partImagesCount; i++) {
        if (imageDescriptions[i].name.toLowerCase().includes(searchTerm)) {
          const relativeIndex = i - startIndex;
          const img = document.createElement("div");
          img.className = "item";
          img.innerHTML = `<img src="static/img/${imageFileNamesArray[part][relativeIndex]}" alt="" data-part="${part}" data-relative-index="${relativeIndex}" onclick="handleImageClick(this)">`;
          const sliderContainer = document.querySelector(`.slider-${part + 1}`);
          sliderContainer.appendChild(img);
        }
      }
      startIndex += partImagesCount;
    }

    // 필터된 항목이 없으면 알림 표시
    const filteredImages = document.querySelectorAll(".item");
    if (filteredImages.length === 0) {
      alert("일치하는 상가가 없습니다.");
    }
  }
  // 검색 버튼 클릭 시 검색 실행
  searchButton.addEventListener("click", performSearch);

  // 엔터키 입력 시 검색 실행
  searchInput.addEventListener("keypress", function (event) {
    // 엔터키를 누른 경우 (keyCode 13)
    if (event.keyCode === 13) {
      performSearch();
    }
  });
  resetButton.addEventListener("click", function () {
    searchInput.value = ""; // 검색어 초기화
    location.reload(); // 페이지 새로고침
  });
});

// 이미지 클릭 핸들러 추가
function handleImageClick(clickedImage) {
  const part = parseInt(clickedImage.dataset.part);
  const relativeIndex = parseInt(clickedImage.dataset.relativeIndex);
  const dataIndex = relativeIndex + imagesPerPart.slice(0, part).reduce((a, b) => a + b, 0); // 데이터 인덱스 계산
  const fileName = `img-${dataIndex + 1}.png`; // 이미지 파일 이름
  const description = imageDescriptions[dataIndex]; // 데이터

  openModal(fileName, description);
}

// 모달에 이미지와 텍스트를 표시하는 함수
function openModal(fileName, description) {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modalContent");

  // 이미지 태그 생성
  const imgElement = document.createElement("img");
  imgElement.src = "static/img/" + fileName;
  imgElement.alt = "Image";

  // 텍스트 요소 생성
  const textElement = document.createElement("div");
  textElement.innerHTML = `
        상가명: ${description.name}<br />
        카테고리: ${description.category}<br />
        위치: ${description.location}
    `;
  textElement.style.color = "black";
  textElement.style.fontSize = "20px";

  // 모달 내용 초기화 후 이미지와 텍스트 추가
  modalContent.innerHTML = "";
  modalContent.appendChild(imgElement);
  modalContent.appendChild(textElement);

  // 모달 열기
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// 모달 외부 클릭 시 모달 닫기
window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".content-list .slider"); // 각 슬라이더 아이템들을 선택합니다.

  sliders.forEach((slider, sliderIndex) => {
    const items = slider.querySelectorAll(".item"); // 각 슬라이더 아이템들을 선택합니다.

    items.forEach((item, itemIndex) => {
      item.addEventListener("mouseover", function () {
        let dataIndex = 0;

        // 해당 아이템의 슬라이더 이전 인덱스들에 대한 이미지 개수의 합을 계산하여 데이터 인덱스를 계산합니다.
        for (let i = 0; i < sliderIndex; i++) {
          dataIndex += imagesPerPart[i];
        }

        // 현재 아이템의 인덱스에 해당하는 데이터 인덱스를 계산합니다.
        dataIndex += itemIndex;

        const itemContent = imageDescriptions[dataIndex].name; // 해당 아이템에 대한 상가명을 가져옵니다.
        item.style.setProperty("--content", `"${itemContent}"`); // content 속성을 변경합니다.
      });
    });
  });
});
