# [IT-ING] IT 취준생 직장인 커뮤니티 웹 어플리케이션 - 리팩토링

### **[IT-ING 구경 가기👉🏻](https://it-ing.co.kr)**

[리팩토링 이전 IT-ING Frontend Github 둘러보러 가기👉🏻](https://github.com/life-tutor/life-tutor-FE)

---

## 📌 주요 내용

### **Javascript에서 Typescript로 마이그레이션**

- 정적인 타입을 명시적으로 지정하고, 코드의 목적을 명확히 하여 가독성 향상
- 유지보수 편리성 향상

### **React Query, SockJS/StompJS 사용을 위한 커스텀 훅 정의 및 모듈화**

- 유지보수 편리성 향상
- 컴포넌트의 가독성 향상

### **context API에서 useReducer를 사용하는 방식으로 변경, 커스텀 훅 정의 및 모듈화**

- useState를 사용하는 것 보다 useReducer를 사용하는게 여러 상황에 유연하게 대처할 수 있고, Action type을 통해 코드의 목적이 명확해진다고 판단
- state와 dispatch의 context를 다르게 구성하여 컴포넌트에서 사용 시 사용 목적을 좀 더 명확히 하고, 불필요한 리렌더링 방지
- context의 타입은 undefined가 포함된 유니온 타입이기 때문에 타입 검사 필수
- 따라서 커스텀 훅에 타입 검사 로직을 포함하였으며 그 결과 컴포넌트 내 context 사용의 편리성 향상

### **ESlint와 Prettier 규칙을 설정하고, husky로 ESlint와 Prettier를 git hook(pre-commit)에 등록**

- ESlint, Prettier 규칙을 설정하여 일정한 코드 컨벤션과 포맷팅을 유지
- ESlint, Prettier를 사용하지 않는 경우를 방지하기 위해 husky로 실행 자동화

### **API 호출 함수를 컴포넌트와 분리하고, 목적이 비슷한 함수끼리 객체로 묶어 관심사 분리**

- API 호출 함수를 api.ts에 객체로 모아서 관리하여 유지보수 편리성 향상
- 비슷한 성격의 API 호출 함수끼리 묶어 관심사 분리 진행하여 코드 가독성, 유지보수 편리성 향상
- 컴포넌트와 API 호출 함수를 분리함으로써 로직 분리 및 컴포넌트 코드 간소화

### **setTimeout을 이용하여 디바운스를 직접 구현**

- 직접 구현으로 불필요해진 lodash를 제거, 서드파티 의존도 감소
- 코드 복잡도 감소 및 가독성 향상

### **react-hook-form을 도입**

- 번거롭고 복잡했던 validation 로직 및 코드 단순화
- validation 로직이 단순화 되면서 함수, 관리해야할 state, 변수의 갯수 감소
- 코드의 일관성, 유지보수 편리성 향상

### **Route 컴포넌트 분리 및 App.tsx 간소화**

- Route 관련 정보를 따로 관리할 수 있어 유지보수 편리성 향상
- App.tsx가 간소화됨에 따라 가독성 향상

## 📌 마주한 문제와 해결 과정

👉 **문제 1**: [try-catch에서 에러가 발생해도 catch로 빠지지 않는 현상](https://github.com/nggoong/iting-refactoring/issues/5)

- **문제 1 해결**: [PR 추가적인 태스크 참고](https://github.com/nggoong/iting-refactoring/pull/6)

👉 **문제 2** : [Detail.tsx에서 api.ts의 객체, 함수를 인식하지 못하는 현상](https://github.com/nggoong/iting-refactoring/issues/8)

- **문제 2 해결**: [PR 추가적인 태스크 참고](https://github.com/nggoong/iting-refactoring/pull/9)

👉 **[회고 및 다른 문제 보러가기(Blog)](https://velog.io/@apro_xo/%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC-%EC%A7%84%ED%96%89%ED%95%98%EB%A9%B0)**
