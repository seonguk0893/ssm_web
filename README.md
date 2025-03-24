# Geumnam Underground Shopping Mall Self-Driving Robot Web

#### ssm_web is a web application built using Flask and contains sensing information, shopping mall information, and entrance information of the Geumnam Underground Shopping Mall located in Gwangju.
#### ssm_web은 Flask를 사용하여 구축된 웹 애플리케이션으로 광주에 위치한 금남지하도상가의 센싱정보와 상가정보, 출입구정보를 담고 있습니다.


This project is built with :

![HTML5](https://www.w3.org/html/logo/downloads/HTML5_Logo_64.png) , ![CSS3](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/48px-CSS3_logo_and_wordmark.svg.png) , ![Vanilla JS](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/64px-Unofficial_JavaScript_logo_2.svg.png) , ![Python](https://www.quintagroup.com/++theme++quintagroup-theme/images/logo_python_section.png) , ![Flask](https://www.quintagroup.com/services/service-images/flask.png)



## Installation 📦
### To install subway_shoppingmall_web, follow these steps:
## 1. Clone this repository:
>'https://github.com/seonguk0893/ssm_web.git'
## 2. Navigate to the project directory:


```bash
  cd app
```
## 3 . Create a virtual environment:
```bash
  python3 -m venv env
```
## 4. Activate the virtual environment:
```bash
  source env/bin/activate
```
## 5. Install the project dependencies:
```bash
  pip install -r requirements.txt
```
## 6 . Run the server
```bash
  python3 main.py # mac
  python main.py # windows
```
## 7 . Go to localhost:8000
---



## 페이지 및 기능 설명

### 환경정보 페이지
  - 지하상가의 환경정보를 담은 메인화면
  - 실제 센서가 로봇에 부착되어 있어 환경정보를 실시간으로 제공

<img width="500" alt="image" src="https://github.com/user-attachments/assets/53c110d4-4de4-4389-8db6-6918c68e6bb7">


### 출입구정보 페이지
  - 지하상가 출입구 정보가 버튼형식으로 구성
  - 버튼을 클릭하면 로봇이 해당 출입구 앞으로 사용자를 안내
  - 음성인식을 통한 출입구 안내 ("0번 출구" 단어 인식 후 해당 번호 출입구로 안내)
  - 지하상가 지도 서비스 제공

<img width="500" alt="image" src="https://github.com/user-attachments/assets/5ee0487a-eab9-42ca-9503-19a54c993e92">
<img width="500" alt="image" src="https://github.com/user-attachments/assets/69d42b99-f55e-4693-9578-ed1808d50126">
<img width="500" alt="image" src="https://github.com/user-attachments/assets/7dbcd4c9-ae3f-467d-a777-d70929d5a18f">
<img width="500" alt="image" src="https://github.com/user-attachments/assets/c4ceb9d1-b272-4416-b2d0-ef266618d502">


### 상가정보 페이지
  - 지하상가에 있는 상가정보 제공
  - 상가위치, 상가카테고리 등 기본정보 제공

<img width="500" alt="image" src="https://github.com/user-attachments/assets/e67c5490-6323-4ebe-9860-077eadba75c9">



#### ssm_web was created by Seongha Kim, Seonguk Kim
