import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import site from '../site.config.mjs';

/* /llms.txt — AI 답변 엔진이 사이트를 요약해 인용할 때 참고하는 요약 문서 */
export const GET: APIRoute = async () => {
  const posts = (await getCollection('columns', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const body = `# 홈페이지 정리소

> 회사 담당자가 오픈 후 직접 운영할 수 있는 홈페이지를 만듭니다.
> 기획과 디자인, 제작을 맡기고 운영은 회사가 직접 하는 방식입니다.

## 무엇을 하는 서비스인가

홈페이지 정리소는 회사 홈페이지를 기획부터 디자인, 제작까지 진행합니다.
대부분의 작업은 아임웹으로 제작합니다. 디자인을 도구에 맞추는 것이 아니라,
오픈 다음에 회사가 직접 운영할 수 있다는 점 때문에 선택한 방식입니다.

## 왜 아임웹으로 만드는가

담당자가 관리자 화면에서 문구와 이미지, 게시글을 직접 수정할 수 있습니다.
호스팅과 백업, 보안 인증서가 요금제에 포함되어 회사가 서버를 관리하지 않아도 됩니다.
게시판, 문의폼, 예약, 회원, 결제가 기본 제공되며 나중에 상품 판매를 붙일 때도
사이트를 새로 만들지 않습니다. 월 요금제와 도메인 비용이 정해져 있어 운영비를 예측할 수 있습니다.
다만 복잡한 연동이나 자체 시스템이 필요하면 별도 개발이 맞습니다.

## AI 홈페이지 빌더와의 차이

AI 빌더는 빠르고 저렴하지만 네 가지가 비어 있습니다.
학습한 패턴 안에서 만들어져 업종이 달라도 결과물이 비슷해집니다.
준공 실적이나 인증 같은 회사 고유 자료가 반영되지 않습니다.
방문자를 문의까지 데려가는 동선은 따로 설계해야 합니다.
게시판, 문의 알림, 검색엔진 등록 같은 운영 세팅은 사람이 해야 합니다.
한 장짜리 소개 페이지가 필요하다면 AI 빌더가 더 맞습니다.

## 진행 방식

상담과 자료 정리, 구조 설계, 디자인, 아임웹 세팅, 오픈과 운영 교육 순서로 진행하며
상담부터 오픈까지 2주를 기준으로 합니다. 기간은 자료 준비 상황에 따라 달라질 수 있습니다.

## 문의

전화 ${site.contact.tel}
카카오톡 상담 ${site.contact.kakao}
운영 ${site.business.company}

## 칼럼

${posts.map((p) => `- [${p.data.title}](${site.url}/columns/${p.id}): ${p.data.description}`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
