/**
 * 這是專門用來測試 Drive 權限與 ID 的獨立函數
 */
function testDriveAccess() {
  const props = PropertiesService.getScriptProperties();
  const rawUrl = props.getProperty('TARGET_DRIVE_URL');
  
  Logger.log("--- 🚀 開始獨立 Drive 測試 ---");
  Logger.log("原始輸入值: " + rawUrl);

  if (!rawUrl) {
    Logger.log("❌ 錯誤：找不到 TARGET_DRIVE_URL 屬性。");
    return;
  }

  // 解析 ID
  let folderId = rawUrl.trim();
  const match = folderId.match(/\/folders\/([a-zA-Z0-9-_]+)/) || 
                folderId.match(/\/d\/([a-zA-Z0-9-_]+)/) || 
                folderId.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  
  if (match && match[1]) {
    folderId = match[1];
    Logger.log("✅ 解析成功，提取 ID: " + folderId);
  } else {
    Logger.log("⚠️ 無法從網址解析 ID，將嘗試以原始值作為 ID。");
  }

  try {
    // 測試 A：獲取資料夾名稱
    const folder = DriveApp.getFolderById(folderId);
    Logger.log("✅ 成功連線！資料夾名稱為: " + folder.getName());

    // 測試 B：嘗試寫入一個檔案
    const time = new Date().toLocaleTimeString();
    const testFileName = "TEST_LOG_" + time.replace(/[:]/g, "-") + ".txt";
    const testFile = folder.createFile(testFileName, "這是測試內容，產生於 " + time);
    
    Logger.log("✅ 寫入成功！已建立檔案: " + testFileName);
    Logger.log("🔗 檔案網址: " + testFile.getUrl());

    // 測試 C：刪除測試檔（保持資料夾乾淨）
    testFile.setTrashed(true);
    Logger.log("✅ 測試結束，已將測試檔丟入垃圾桶。");

  } catch (e) {
    Logger.log("❌ 發生錯誤！");
    Logger.log("錯誤內容: " + e.toString());
    
    if (e.toString().includes("Unexpected error")) {
      Logger.log("💡 偵測到系統性 Unexpected error！建議改用 Drive API 模式（需先在左側「服務」開啟 Drive API）。");
    } else if (e.toString().includes("Access denied") || e.toString().includes("not found")) {
      Logger.log("💡 權限不足或 ID 錯誤。請檢查您是否為資料夾擁有者，或 ID 是否複製完整。");
    }
  }
}