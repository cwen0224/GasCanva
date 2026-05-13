function initSampleData() {
  const ss = SpreadsheetApp.openById(CONFIG.SS_ID);
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);
  const headers = ["年份", "日期", "標題", "描述", "圖片網址", "狀態", "標題字級", "內文字級", "品牌名稱", "標籤內容", "陰影顏色", "陰影透明度"];
  const samples = [["1895", "04.17", "馬關條約簽訂", "台灣進入日治時期。", "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200", "Ready", 85, 32, "故事 STORY STUDIO", "TODAY IN HISTORY", "#000000", 1.0]];
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(2, 1, samples.length, headers.length).setValues(samples);
}