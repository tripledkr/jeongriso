/* 사이트 기본 정보 : 배포 전 [ ] 항목을 실제 값으로 교체 */
export default {
  name: '홈페이지 정리소',
  url: 'https://homepage-jeongriso.kr', // 실제 도메인으로 교체
  keyword: '아임웹 홈페이지 제작',
  theme: {
    accent: '#0F7A5A',
    accentSoft: '#E9F5F0',
    bg: '#FCFBF8',
  },
  nav: [
    { label: '이런 회사에', href: '/#fit' },
    { label: '진행 과정', href: '/#process' },
    { label: '자주 묻는 질문', href: '/#faq' },
    { label: '칼럼', href: '/columns' },
  ],
  contact: {
    formEndpoint: 'https://script.google.com/macros/s/AKfycbxTRQZs3f7eKw4wxUQHzqn-rumZPDHZAGW7ZF57vc0VfHegwwL8JmqudEse45xOVhwy/exec', // 구글 Apps Script 웹 앱 주소 (입력하면 사이트 안 문의 폼이 표시됨)
    privacyPeriod: '상담 종료 후 1년', // 개인정보 보유 기간
    tel: '010-3080-9136',
    email: 'tripled_kr@naver.com',
    formUrl: 'mailto:tripled_kr@naver.com?subject=%5B%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80%20%EC%A0%95%EB%A6%AC%EC%86%8C%5D%20%EC%95%84%EC%9E%84%EC%9B%B9%20%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80%20%EC%A0%9C%EC%9E%91%20%EC%83%81%EB%8B%B4', // 구글폼 등 문의폼 주소가 있으면 교체
  },
  business: {
    company: '[상호]',
    ceo: '[대표자명]',
    bizNo: '[000-00-00000]',
    address: '[사업장 주소]',
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
