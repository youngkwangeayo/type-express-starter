
# N-Helper Server

TypeScript Express 서버 프로젝트로 AWS IoT MQTT 연결을 위한 Pre-signed URL 생성과 헬퍼 기능을 제공합니다.

## 프로젝트 개요

이 프로젝트는 Express.js와 TypeScript를 사용하여 구축된 백엔드 서버입니다. 주요 기능으로는 AWS IoT MQTT 연결을 위한 Pre-signed URL 생성, Redis 캐싱, 그리고 다양한 헬퍼 API를 제공합니다.

## 주요 기능

### 🔗 Pre-signed URL 서비스
- AWS IoT MQTT WebSocket 연결을 위한 Pre-signed URL 생성
- Redis 캐싱을 통한 성능 최적화 (1시간 TTL)
- AWS Signature V4 인증

### 🛠️ 헬퍼 API
- 테스트용 API 엔드포인트
- 표준화된 API 응답 구조

### 📊 로깅 시스템
- Winston을 사용한 구조화된 로깅
- 콘솔, 파일 로그 분리 (error.log, combined.log)
- 타임스탬프와 로그 레벨 포함

### 💾 Redis 캐싱
- Redis 클라이언트 설정
- 만료 시간이 있는 키-값 저장소
- 확장된 Redis 클라이언트 인터페이스

## 기술 스택

### Runtime & Language
- **Node.js** - JavaScript 런타임
- **TypeScript** - 타입 안전성을 위한 정적 타입 언어

### Framework & Libraries
- **Express.js** - 웹 애플리케이션 프레임워크
- **Winston** - 로깅 라이브러리
- **Redis** - 인메모리 데이터 구조 저장소

### AWS Services
- **AWS IoT Core** - MQTT 디바이스 게이트웨이
- **AWS SDK** - AWS 서비스 통합
- **Smithy Signature V4** - AWS 요청 서명

### Development Tools
- **ts-node-dev** - TypeScript 개발 서버
- **dotenv** - 환경 변수 관리
- **CORS** - Cross-Origin Resource Sharing

## 프로젝트 구조

```
src/
├── app.ts                    # 애플리케이션 진입점
├── config/                   # 설정 파일들
│   ├── error.config.ts       # 에러 핸들링 설정
│   ├── logger.config.ts      # Winston 로거 설정
│   └── redis.config.ts       # Redis 클라이언트 설정
├── model/                    # 데이터 모델
│   └── apiresponse.model.ts  # API 응답 모델 및 에러 클래스
├── router/                   # 라우터 파일들
│   ├── index.ts             # 라우터 통합
│   ├── helper.router.ts     # 헬퍼 API 라우터
│   └── pre-signed.router.ts # Pre-signed URL 라우터
└── service/                 # 비즈니스 로직
    └── pre-signed.service.ts # Pre-signed URL 생성 서비스
```

## 설치 및 실행

### 사전 요구사항
- Node.js (버전 16 이상)
- Redis 서버 (로컬 또는 원격)
- AWS 계정 및 IoT Core 설정

### 설치
```bash
npm install
```

### 환경 변수 설정
`.env` 파일을 생성하고 다음 변수들을 설정하세요:
```env
PORT=3000
MQTT_ENDPOINT=your-iot-endpoint.iot.ap-northeast-2.amazonaws.com
```

### 개발 모드 실행
```bash
npm run dev
```

### 프로덕션 빌드 및 실행
```bash
npm run build
npm start
```

## API 엔드포인트

### Health Check
- `GET /ping` - 서버 상태 확인 (응답: "pong")
- `HEAD /` - 헤더만 반환하는 Health Check

### Pre-signed URL
- `GET /api/pres-signed/mqtt` - MQTT WebSocket 연결용 Pre-signed URL 생성
- `GET /api/pres-signed/test` - 테스트 엔드포인트

### Helper APIs
- `GET /api/helper/` - 기본 테스트 응답
- `POST /api/helper/test1` - POST 요청 테스트용 엔드포인트

## API 응답 구조

### 성공 응답
```json
{
  "code": 0,
  "state": 200,
  "payLoad": {
    // 응답 데이터
  }
}
```

### 에러 응답
```json
{
  "error": {
    "code": -1,
    "state": 500,
    "message": "에러 메시지",
    "reason": "에러 상세 사유"
  }
}
```

## 주요 특징

### 1. AWS IoT MQTT 통합
- AWS Signature V4를 사용한 보안 인증
- WebSocket 프로토콜 지원
- 동적 Pre-signed URL 생성

### 2. Redis 캐싱 전략
- Pre-signed URL 1시간 캐싱
- 성능 최적화 및 AWS API 호출 최소화
- 확장된 Redis 클라이언트 메서드

### 3. 구조화된 로깅
- 개발/프로덕션 환경별 로그 레벨 분리
- 파일 및 콘솔 로그 동시 지원
- 타임스탬프 및 구조화된 로그 포맷

### 4. 타입 안전성
- 완전한 TypeScript 지원
- 인터페이스 기반 API 응답 모델
- 컴파일 타임 타입 검사

## 개발 가이드

### 새로운 라우터 추가
1. `src/router/` 디렉토리에 새 라우터 파일 생성
2. `src/router/index.ts`에 라우터 등록
3. 필요시 `src/service/`에 비즈니스 로직 추가

### 환경별 설정
- 개발: `ts-node-dev`를 사용한 핫 리로드
- 프로덕션: TypeScript 컴파일 후 Node.js 실행

### 에러 처리
- `APIError` 클래스를 사용한 구조화된 에러 처리
- 전역 에러 핸들러를 통한 일관된 에러 응답

## 초기 프로젝트 세팅 명령어

```bash
npm init -y                 # npm 세팅
npx tsc --init              # tsconfig.json 생성

npm install express         # 노드 was 프레임워크
npm install dotenv          # env property 파일
npm install -D typescript   # 프로젝트에 tsc 컴파일러 설치
npm install ts-node-dev     # ts파일 실시간 실행 (도중컴파일불필요) nodemon 파일감지기능  ts-node + nodemon 합쳐놓은 개발 툴
npm install @types/node     # js 라이브러리 타입파일 알기 편하게
npm install @types/express  # js 라이브러리 타입파일 알기 편하게

# 추가 디펜던시
npm install winston
npm install @smithy/signature-v4
```

## 라이선스

ISC License

## 기여

프로젝트에 기여하고 싶으시면 이슈를 생성하거나 풀 리퀘스트를 제출해 주세요.



