// 執行這個 function 來強迫 Google 偵測並彈出權限視窗
function manualAuthTrigger() {
  // 強迫偵測外部連線權限
  UrlFetchApp.fetch("https://www.google.com");
  // 強迫偵測雲端硬碟權限
  DriveApp.getRootFolder();
  // 強迫偵測試算表權限
  SpreadsheetApp.openById("1zmOtVKLgJt0jOnf-Cfcm7oK5KEYxjol3JiA4jGYzM_A");
  console.log("授權偵測完成");
}