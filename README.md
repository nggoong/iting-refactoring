# [IT-ING] IT 취준생 직장인 커뮤니티 웹 어플리케이션 - 리팩토링

### **[IT-ING 구경 가기👉🏻](https://it-ing.co.kr)**

[리팩토링 이전 IT-ING Frontend Github 둘러보러 가기👉🏻](https://github.com/life-tutor/life-tutor-FE)

---

## 📌 주요 내용

- Typescript로 마이그레이션하여 정적인 타입을 명시적으로 지정하고, 코드의 목적을 명확히 하여 가독성 향상

- context API에서 useState 대신 useReducer를 사용하는 방식으로 변경, 커스텀 훅을 만들어 context 사용 편리성 향상
- ESlint, Prettier 규칙을 설정하고, husky로 git hook(pre-commit)을 등록하여 ESlint와 Prettier 실행 자동화
- API 호출 함수를 컴포넌트와 분리하고, 목적이 비슷한 함수끼리 객체로 묶어 관심사 분리
- 디바운스를 직접 구현하여 코드 가독성 향상, 서드파티 의존도 감소
- react-hook-form을 도입하여 복잡했던 validation 로직 및 코드 단순화
- Route 컴포넌트 분리 및 App.tsx 간소화

## 📌 마주한 문제와 해결 과정

👉 **문제 1**: [try-catch에서 에러가 발생해도 catch로 빠지지 않는 현상](https://github.com/nggoong/iting-refactoring/issues/5)

- **문제 1 해결**: [PR 추가적인 태스크 참고](https://github.com/nggoong/iting-refactoring/pull/6)

👉 **문제 2** : [Detail.tsx에서 api.ts의 객체, 함수를 인식하지 못하는 현상](https://github.com/nggoong/iting-refactoring/issues/8)

- **문제 2 해결**: [PR 추가적인 태스크 참고](https://github.com/nggoong/iting-refactoring/pull/9)
