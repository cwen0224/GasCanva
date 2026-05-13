const CONFIG = {
  SS_ID: "1zmOtVKLgJt0jOnf-Cfcm7oK5KEYxjol3JiA4jGYzM_A",
  FOLDER_ID: "1qjDHujkgeeHfbp1JIiriPOJ3fLQokXAh",
  SHEET_NAME: "Post_Data"
};
function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle('GASCANVA | 自動海報生成器')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
function apiGetPendingData() {
  try {
    const ss = SpreadsheetApp.openById(CONFIG.SS_ID);
    const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const pending = [];
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][5]) !== 'Done' && String(data[i][2]) !== "") {
        pending.push({
          rowId: i + 1, year: String(data[i][0]), date: String(data[i][1]), 
          title: String(data[i][2]), description: String(data[i][3]),
          bgBase64: "", // 圖片轉換邏輯簡化以確保穩定
          titleSize: data[i][6] || 80, descSize: data[i][7] || 32,
          brandName: data[i][8] || "故事 STORY STUDIO", badgeText: data[i][9] || "TODAY IN HISTORY",
          shadowColor: data[i][10] || "#000000", shadowOpacity: data[i][11] !== "" ? data[i][11] : 1.0
        });
      }
    }
    return { success: true, data: pending };
  } catch (e) { return { success: false, error: e.toString() }; }
}
function apiSaveImage(base64Data, fileName, rowId) {
  try {
    const folder = DriveApp.getFolderById(CONFIG.FOLDER_ID);
    const blob = Utilities.newBlob(Utilities.base64Decode(base64Data.split(',')[1]), 'image/png', fileName);
    folder.createFile(blob);
    SpreadsheetApp.openById(CONFIG.SS_ID).getSheetByName(CONFIG.SHEET_NAME).getRange(rowId, 6).setValue('Done');
    return { success: true };
  } catch (e) { return { success: false, error: e.toString() }; }
}