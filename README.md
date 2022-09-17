# [IT-ING] IT 취준생 직장인 커뮤니티 웹 어플리케이션

### **[IT-ING 구경 가기👉🏻](https://it-ing.co.kr)**

### 📌 GITHUB

 [Back-End Github 둘러보러 가기👉🏻](https://github.com/life-tutor/life-tutor-BE)

## IT 취준생 직장인 커뮤니티 웹 어플리케이션

![cover2-3](https://user-images.githubusercontent.com/107831692/190368971-8a70c5cc-09bc-4317-accc-44b13441f7ae.jpg)


---

## 📚 아키텍쳐

![Untitled](https://user-images.githubusercontent.com/107831692/190369013-4eb10bbb-06e7-406b-9ff5-b60da5dea36e.png)


---

## 👋 IT-ING의 핵심 기능

### 1 : 1 채팅방 기능  🔢

### 게시글 해시태그 등록, 검색 및 검색어 자동완성 ✨

### 소셜로그인 🗨️

### 작성한 글, 작성한 댓글 모아보기 기능 🗨️

### 개인정보 변경✨

### 게시글 및 댓글 공감기능🔢

---

## 🔧 기술적 의사 결정


| 사용 기술 | 기술 설명 |
| --- | --- |
| amazon S3 + CloudFront | 리액트 프로젝트는 정적 리소스인 html, css, javascript 파일로 이루어져 있는데, amazon S3가 정적 리소스를 저장하는 스토리지이지만, 배포가 가능하고, EC2보다 배포 및 서비스 비용이 저렴하기 때문에 S3를 선택하였고, HTTPS(redirect)를 적용하기 위해 CloundFront를 사용하였다.  |
| SockJS | SockJS는 websocket 기반이지만, 순수 websocket과는 다르게 websocket을 지원하지 않는 브라우저에서도 HTTP polling과 같은 HTTP을 사용하여 실시간 통신 처럼 동작하게 한다.  |
| React Query | Redux에 비해 서버와 통신하는 로직의 보일러 플레이트가 적고,  서버에서 최신의 데이터를 유지하는데 특화 되어 있으며, 데이터 캐싱, 값 업데이트, 에러핸들링 등 비동기 과정을 좀 더 용이하게 사용하기 위해 사용하였다. |
| context API | 이번 프로젝트에서는 client state의 비중이 적고, 단순히 로그인 유저의 정보를 저장하기 위한 목적과 props로 전달하기 까다로운 하나의 특정 부분을 해결하기 위해 Redux를 사용하는 것은 불필요하다고 판단 되어 리액트에 내장된 context API를 사용하였다.  |
| axios | 모든 리퀘스트, 리스폰스에 대한 공통된 config 설정을 쉽게 할 수 있고, 서버에서 받아온 데이터를 자동으로 JSON으로 변환해주며, interceptors 기능을 사용하여 JWT 기반 인증 구현에 용이할 것으로 판단하였고, 브라우저 호환성이 뛰어나기 때문에 axios를 사용하였다. |

---

## 😵‍💫 트러블슈팅


### ✅ react-query 쿼리 무효화 문제

- [ ]  문제 상황
    - 쿼리 무효화가 되지 않는 현상
    - useMutate()의 mutate 성공 시, 기존의 쿼리를 무효화하고 react-router-dom의 useNavigate를 통해 페이지를 이동, 이동한 페이지에서 정보를 다시 리패치가 되어야 하는데, 쿼리가 무효화 되지 않고 페이지가 이동 되어 변경사항이 반영 되지 않는 현상
- [ ]  원인 추론
    - mutate 성공 후의 로직을 실행하는 onSuccess가 동작하는 도중에 페이지가 이동되면 수행하던 로직을 다 완료하지 못함.
    - queryClient.invalidateQueries 는 promise를 반환하는 비동기 동작이므로 무효화가 진행 중일 때 페이지가 이동된다는 것을 알게 됨.
- [ ]  해결 방법
    - async/await으로 queryClient.invalidateQueries를 비동기 처리 하여 쿼리 무효화가 완료 되었을 경우에 페이지가 이동되도록 구현

### ✅ 실시간 통신 연결 끊김 문제

- [ ]  문제 상황
    - 1 : 1 채팅방에서 실시간 채팅 도중 연결이 끊어져 메세지가 한 번씩 보내지지 않는 현상 발생
    - 메세지 전송 100번 당 한 번 정도 연결이 끊겨 보내지지 않음.
    - 보내지지 않을 때 전송 버튼을 한 번 더 누르면 전송됨.
- [ ]  원인 추론
    - 메세지를 보낼 때 마다 메세지를 채팅방 컴포넌트의 state에 저장
    - 위의 이유로 메세지를 보낼 때 마다 채팅방 컴포넌트가 리렌더링 되면서 연결을 다시 시도하는지 의문이 들어 console.log로 테스트를 함.
    - 리렌더링이 될 때마다 연결을 재시도하지는 않았음
- [ ]  해결 방법
    - StompJS의 stomp.client에는 연결 유무를 알려주는 ws.readyState 값이 있다는 것을 알게 됨.
    - 메세지를 보낼 때 마다 ws.readyState를 확인하고, 연결이 되지 않은 상태라면 다시 전송하도록 구현

### ✅ 디바운스가 적용되지 않는 문제

- [ ]  문제 상황
    - 검색어 자동완성 기능에서 성능 향상 및 API 호출 횟수를 줄이기 위해 디바운스를 적용하였지만 적용이 되지 않음.
- [ ]  원인 추론
    - 사용자로 부터 입력 받는 검색어를 onChange로 state에 저장
    - 디바운스를 적용한 자동완성 된 검색어를 가져오는 API 요청 함수가 onChange 함수 내부에서 호출
    - state가 변경되면서 컴포넌트 리렌더링에 의해 onChange함수도 재생성되어 디바운스가 적용되지 않음
- [ ]  해결 방법
    - useMemo를 사용하여 디바운스 함수를 메모이제이션하여 해결

### ✅ react-query 쿼리 키 문제

- [ ]  문제 상황
    - 상세페이지를 들어갈 때마다 전에 들어갔던 상세페이지의 글이 살짝 보이는 현상이 발생
- [ ]  원인
    - 상세페이지에서 [”post”]라는 하나의 쿼리 키 값을 사용해서 데이터를 관리 했던 것이 원인
    - 상세페이지에서 불러오는 게시글이 바뀔 때 마다 게시글의 정보를 API 요청으로 가져오는데, 이 과정이 비동기 동작이기 때문에 새로운 데이터가 불러와지기 전까지는 이전에 저장했었던 데이터가 잠깐 보여지는 것으로 판단
- [ ]  해결 방법
    - 쿼리 키 값을 [”post”, postingId]로 상세페이지 포스팅 아이디 별로 캐싱 처리

---

### ❗ 성능 개선 ❗

🎇 lighthouse로 퍼포먼스 점수 측정 결과 80점이 나옴

🎇 lazy loading을 이용한 코드 스플리팅,  웹 폰트 최적화를 통해 92점 까지 향상

!![lighthouse80](https://user-images.githubusercontent.com/78852661/190861512-b62e82cd-dc4b-4781-9df5-21d76e78ceb3.png)

![lighthouse92](https://user-images.githubusercontent.com/78852661/190861517-af7c3a53-7c85-4593-9ea2-0511ca442896.png)


## 👩🏻‍💻제작자들🧑🏻‍💻

|포지션|이름|담당|깃허브|
|---|---|---|---|
|Front-End_(React)|권익주|게시글/채팅방 불러오기 및 무한스크롤, 게시글/채팅방 해시태그 기반 검색 기능 및 검색어 자동완성 기능, 실시간 채팅 기능, 리프레시 토큰, 게시글 작성, 내가 쓴 글 모아보기, HTTPS배포,성능개선(lighthouse 퍼포먼스 점수) |[https://github.com/nggoong](https://github.com/nggoong)|
|Front-End_(React)|설승운|게시글 상세페이지, 게시글 수정&삭제&공감, 댓글 작성&수정&삭제&공감, 마이페이지, 마이페이지 개인정보 변경, 비밀번호 변경, 댓글 단 글|[https://github.com/s-woon](https://github.com/s-woon)|
|Front-End_(React)|김다희|회원가입, 로그인 페이지, 소셜로그인|[https://github.com/uglad22](https://github.com/uglad22)|
|Back-End_(Spring)|문철현|로그인,회원가입, 마이페이지, 리프레시 토큰|[https://github.com/MoonDoorKing](https://github.com/MoonDoorKing)|
|Back-End_(Spring)|안병규|게시글 API, NGINX 구현 및 설정, CI/CD|[https://github.com/fox9d](https://github.com/fox9d)|
|Back-End_(Spring)|박주영|채팅, 게시글 공감, 댓글, 댓글 공감, 채팅방 해시태그 검색(하이버네이트 2차 캐시 사용)|[https://github.com/ju-ei8ht](https://github.com/ju-ei8ht)|
|Designer|정유진|디자인 담당✨||

