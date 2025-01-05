export function formatDate(dateString) {
  if (!dateString) return '';

  try {
    // UTC 시간을 Date 객체로 변환
    const date = new Date(dateString);

    // UTC 시간을 한국 시간으로 변환 (UTC+9)
    const koreanTime = new Date(date.getTime());

    // 한국 시간으로 포맷팅
    const formatter = new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Seoul',
    });

    return formatter.format(koreanTime).replace(/\. /g, '-').replace('.', '');
  } catch (error) {
    console.error('날짜 변환 오류:', error);
    return dateString;
  }
}
