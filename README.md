# 유튜브 트레일러 댓글 및 영상 정보를 활용한 Multi-view Feature Selection 기반 개봉 첫 주말 박스오피스 예측

Opening Weekend Box Office Prediction Based on Multi-View Feature Selection Using YouTube Trailer Comments and Video

프로젝트 페이지 · 서정범 (Jeongbeom Seo) · 고려대학교 SW·AI 융합대학원 빅데이터융합학과 · 지도교수 강성구

트레일러 공개 후 7일 이내의 댓글과 트레일러 영상으로 북미 개봉 첫 주말 실적(OW)을
예측하는 MvFS 모델을 다룹니다. 학위논문 탭은 최종 제출본, KCC 탭은 학회 제출 PDF를 기준으로 합니다.

- 분석 대상 217편 (학습 195 / 평가 22, 시간 기준 분할)
- 최종 사용 댓글 2,725,731건
- 교차검증 RMSE $25.43M · MAPE 44.6%
- 최종 평가 RMSE $23.86M · MAPE 38.8%

## 구성

상단 탭으로 두 버전을 오갑니다.

| 탭 | 파일 | 내용 |
| --- | --- | --- |
| 석사 학위논문 | `index.html` | 고려대학교 SW·AI 융합대학원 빅데이터융합학과 석사학위논문 (6-View, 217편) |
| KCC 2026 논문 | `kcc.html` | KCC 2026 제출 논문 (4-View, 135편), Paper 버튼으로 PDF 열람·다운로드 |

```
index.html        석사 학위논문 페이지
kcc.html          KCC 2026 논문 페이지
site.css          두 페이지 공용 스타일
site.js           두 페이지 공용 스크립트 (한국어·영어 전환, 현재 섹션 표시)
fig/              학위논문 그림 15종 (f3-1 = 그림 3.1) + KCC 논문 그림 2종 (kcc-f1, kcc-f2)
paper/            KCC 2026 논문 PDF
```

외부 의존성은 Google Fonts뿐입니다.

## 로컬에서 보기

```bash
python3 -m http.server 8000
# http://localhost:8000
```
