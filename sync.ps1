# 1. 純粹推送，不對檔案內容做任何修改
Write-Host "🚀 正在推送本地代碼到雲端..." -ForegroundColor Cyan
clasp push

# 2. 自動抓取最後一個部署 ID
$deployId = (clasp deployments | Select-String -Pattern '(?<=- )\w+(?= @\d+)').Matches.Value | Select-Object -Last 1

if ($deployId) {
    Write-Host "📦 偵測到部署 ID: $deployId，正在更新部署..." -ForegroundColor Green
    clasp deploy -i $deployId -d "Manual fix sync: $(Get-Date -Format 'MM-dd HH:mm')"
    Write-Host "✅ 更新成功！" -ForegroundColor Green
} else {
    Write-Host "⚠️ 找不到部署 ID，請手動執行一次 clasp deploy" -ForegroundColor Yellow
}
