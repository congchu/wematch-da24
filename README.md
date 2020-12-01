# da24booking-user-web

------

### 환경 설정
#### 시스템 요구 사항
* node.js v12 이상
* npm v6.7 이상


#### 명령어
기본적으로 `package.json`에 정의한 `scripts`를 사용 가능합니다.
[npm 문서](https://docs.npmjs.com/)도 참고바랍니다.

``` bash
# 외부 의존성 패키지 설치
$ yarn install

# localhost:3000으로 개발환경 빌드 및 실행
$ yarn start

# 린트 체크
$ yarn lint

# 개발 환경 빌드
$ yarn build:dev

# 프로덕션 환경 빌드
$ yarn build:prod
```

------

### 주요 기술 스택
#### Node.js
자바스크립트 개발 환경

[공식문서](https://nodejs.org/ko/)

#### NPM
**N**ode.js **P**ackage **M**anager

`node.js`에서 사용하는 외부 의존성 패키지 관리

[공식문서](https://www.npmjs.com/)

#### Typescript
`Javascript`에서 좀 더 엄격한 타입 도입으로 안정성을 높여줍니다.

[공식문서](https://www.typescriptlang.org/)


#### Eslint
린트(lint)란 개발 단계에서 잘못 작성한 언어의 문법적 오류나

코드 컨벤션 등을 체크해주는 도구입니다.

다양한 플러그인이 있고 입맛대로 커스터마이징 가능합니다.

`Eslint`는 `Javascript` 린트 도구입니다.

개발단계에서 `Javascript` 코드 컨벤션 체크, 유효성 검사 등 지원

[공식문서](https://eslint.org/)


#### React
**Javascript** 웹 라이브러리

Jquery는 전혀 사용하지 않습니다.

[공식문서](https://reactjs.org/)

#### React-router
`React`에서 브라우저 라우팅을 위한 라이브러리입니다.

[공식문서](https://reacttraining.com/react-router/web/guides/quick-start)

#### Styled-components
컴포넌트 단위로 마크업을 쉽게 할 수 있게 해주는 라이브러리입니다.

[공식문서](https://styled-components.com/)

#### Redux
`Flux 패턴`으로 상태 관리를 위한 라이브러리입니다.

[Flux로의 카툰 안내서](https://bestalign.github.io/2015/10/06/cartoon-guide-to-flux/)

[공식문서](https://redux.js.org/)

#### Redux-saga
`Redux`에서 지원하지 않는 비동기작업(ajax api 호출 등)을 하기 위한 라이브러리입니다.

[공식문서](https://redux-saga.js.org/)


------

### 주요 디렉토리 설명

#### public
정적인 웹 리소스들이 위치한 디렉토리입니다.
`React`가 렌더링되는 `index.html`도 여기 있습니다.


#### src
`React`에서 사용하는 대부분의 소스들이 있습니다.
후술할 디렉토리는 모두 `src`안에 하위 디렉토리로 있습니다.

#### assets
이미지 리소스들이 있습니다. 일부 이미지의 경우 컴포넌트 단위로 디렉토리가 구분되어 있습니다.

#### lib
재사용 가능한 함수들 또는 외부 오픈소스를 포장한 모듈 등이 있습니다.
`React`의 `custom hook`은 여기 들어가지 않습니다.

#### components
사용되는 재사용 가능한 컴포넌트들이 위치해 있습니다.

#### constants
코드 내에 사용되는 상수값이 있습니다. 설정 변수 또한 env.ts로 있습니다.

#### hooks
커스텀 훅들이 위치해 있습니다.

#### pages
`React-router`에서 페이지 단위로 사용되는 컴포넌트들이 위치해 있습니다.

#### store
`Redux`와 `Redux-saga`가 있는 디렉토리입니다.

DB schema와 유사한 단위로 구분되어 있으며, 대부분의 비동기 작업은 여기서 이루어집니다.

#### styles
`reset.css`처럼 사이트의 기본이 되는 스타일 코드들이 위치해 있습니다.

`css`를 재사용 가능하게 묶어둔 `mixins`도 있습니다.

#### types
프로젝트 내에서 사용되는 타입들을 모아놓은 곳입니다.

------

### 배포 방법

#### 개발 서버

먼저 http://ec2-52-78-57-73.ap-northeast-2.compute.amazonaws.com/root/wematch_da24 권한이 필요.

```
$ yarn build:dev
```

빌드된 build/* 파일 전부를 wematch_da24 developer 브랜치에 복사한 뒤에 push 한다.

확인은 http://dev.da24.wematch.com/ 경로에서 한다.

#### 운영 서버
```
$ yarn build:prod
```

빌드된 build/* 파일 전부를 zip로 복사하여, 배포자에게 전달한다.
