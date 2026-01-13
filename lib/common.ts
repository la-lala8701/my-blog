export const japaneseFormattedDate = (date: string) => {
    // 記事作成日時を日本時間に変換して表示
    const jstDate = new Date(date);
    // 日付のみ表示
    const formattedDate = jstDate.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Tokyo',
    });
    return formattedDate;
}

