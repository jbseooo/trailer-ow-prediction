# 유튜브 트레일러 댓글 및 영상 정보를 활용한 Multi-view Feature Selection 기반 개봉 첫 주말 박스오피스 예측

Opening Weekend Box Office Prediction Based on Multi-View Feature Selection Using YouTube Trailer Comments and Video

프로젝트 페이지 · 서정범 (Jeongbeom Seo) · 고려대학교 SW·AI 융합대학원 빅데이터융합학과 · 지도교수 강성구

트레일러 공개 후 7일 이내의 댓글과 트레일러 영상으로 북미 개봉 첫 주말 실적(OW)을
예측하는 6-View MvFS 모델을 다룹니다. 페이지 내용과 수치는 최종 제출본 논문을 기준으로 합니다.

- 분석 대상 217편 (학습 195 / 평가 22, 시간 기준 분할)
- 최종 사용 댓글 2,725,731건
- 교차검증 RMSE $25.43M · MAPE 44.6%
- 최종 평가 RMSE $23.86M · MAPE 38.8%

## 구성

```
index.html        단일 페이지 (한국어·영어 전환)
fig/              논문 그림 15종 (파일명 = 논문 그림 번호, 예: f4-3 = 그림 4.3)
```

외부 의존성은 Google Fonts뿐이며, 그 밖의 CSS·JS·도식은 모두 파일 안에 들어 있습니다.

## 로컬에서 보기

```bash
python3 -m http.server 8000
# http://localhost:8000
```
