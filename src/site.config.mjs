/* 사이트 기본 정보 : 배포 전 [ ] 항목을 실제 값으로 교체 */
export default {
  name: '홈페이지 정리소',
  url: 'https://jeongriso-two.vercel.app', // 실제 도메인으로 교체
  keyword: '아임웹 홈페이지 제작',
  theme: {
    accent: '#0F7A5A',
    accentSoft: '#E9F5F0',
    bg: '#FCFBF8',
  },
  nav: [
    { label: '이럴 때 좋아요', href: '/#fit' },
    { label: '맡기면 다른 점', href: '/#scope' },
    { label: 'AI와 비교', href: '/#vs-ai' },
    { label: '진행 과정', href: '/#process' },
    { label: '칼럼', href: '/columns' },
  ],
  contact: {
    tel: '0507-1356-9136',
    kakao: 'https://pf.kakao.com/_DGHln/chat',
    formEndpoint: 'https://script.google.com/macros/s/AKfycbxTRQZs3f7eKw4wxUQHzqn-rumZPDHZAGW7ZF57vc0VfHegwwL8JmqudEse45xOVhwy/exec',
    privacyPeriod: '상담 종료 후 1년',
  },
  business: {
    company: '스튜디오 트리플디',
    ceo: '김주희',
  },
  verify: {
    naver: '', // 네이버 서치어드바이저 사이트 소유확인 코드
    google: '', // 구글 서치콘솔 소유확인 코드
  },
  columns: {
    title: '아임웹 홈페이지 제작 칼럼',
    description: '아임웹으로 회사 홈페이지를 만들고 운영할 때 알아두면 좋은 준비, 구조, 운영 방법을 정리합니다.',
    ctaTitle: '아임웹 홈페이지, 맡기면 얼마나 달라질까요?',
    ctaText: '만들고 싶은 홈페이지를 편하게 알려주시면 필요한 구성부터 정리해 드립니다.',
  },
};
