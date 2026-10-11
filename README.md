# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## 카카오톡 공유 설정

결과 페이지의 [공유하기] > [카카오톡 공유]가 동작하려면 카카오에 이 사이트를 등록해야 합니다.

### 1. 앱 만들고 JavaScript 키 받기

1. [developers.kakao.com](https://developers.kakao.com)에 카카오 계정으로 로그인합니다.
2. [내 애플리케이션]에서 앱을 새로 만듭니다. 이름은 자유롭게 정합니다.
3. [앱] > [플랫폼 키]에서 **JavaScript 키**를 복사합니다.

### 2. 사이트 주소 등록하기

같은 JavaScript 키 화면의 **JavaScript SDK 도메인**에 주소를 추가합니다. 등록하지 않으면 카카오가 공유를 막습니다.

- 내 컴퓨터에서 시험할 때: `http://localhost:5173`
- 사이트를 배포한 뒤: 실제 배포 주소

### 3. 키를 프로젝트에 넣기

`mbti-palette` 폴더에 `.env.local` 파일을 만들고 아래 한 줄을 적습니다. 형식은 `.env.example`을 참고하세요.

```
VITE_KAKAO_JS_KEY=복사한키
```

`.env.local`은 git에 올라가지 않습니다. 개발 서버(`npm run dev`)가 켜져 있었다면 껐다가 다시 켜야 적용됩니다.

### 확인하는 방법

`npm run dev`로 실행해 결과 페이지에서 [공유하기] > [카카오톡 공유]를 누릅니다.

- 카카오톡 공유 창이 뜨면 성공입니다.
- "카카오톡 공유를 사용할 수 없어요"가 나오면 키를 읽지 못한 것입니다. 3번의 파일 이름, 내용, 서버 재시작 여부를 확인하세요.
- 카카오 오류 화면이 나오면 2번의 도메인 등록이 빠졌을 가능성이 큽니다.

### 참고

- `localhost`에서는 공유 메시지의 이미지가 보이지 않을 수 있습니다. 카카오 서버가 이미지를 가져갈 수 없기 때문입니다. 배포한 주소에서 확인하세요.
- 공유 메시지 이미지는 `public/kakao-share.png`(임시 이미지)입니다. 원하는 이미지로 바꿔 쓰세요. 배포 후에도 이미지가 보이지 않으면 카카오 이미지 업로드 API로 올려 받은 URL을 사용해야 합니다.
