-- 1. 群組授權與設定表
CREATE TABLE IF NOT EXISTS group_auth (
    group_id TEXT PRIMARY KEY,
    群組名稱 TEXT,
    角色設定 TEXT,       -- JSON: 包含 Hash密碼, 權限, 救援碼, 綁定碼
    科目設定 TEXT,       -- JSON: 科目關鍵字對照
    advanced_settings TEXT, -- JSON: 節次時間, AI設定, 審核模式
    status TEXT DEFAULT 'active',
    version TEXT,
    is_locked INTEGER DEFAULT 0, -- 0:解鎖, 1:鎖定(需同意條款)
    locking_user_id TEXT,
    last_warning_ts INTEGER,
    terminated_at TEXT,
    last_data_update INTEGER
);

-- 2. 作業資料表
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    群組 TEXT,
    建立時間 INTEGER,
    截止日期 TEXT,
    due_time TEXT,       -- 具體時間或節次
    科目 TEXT,
    內容 TEXT,
    狀態 TEXT,           -- 已發佈 / 待審核
    類別 TEXT,           -- 作業 / 考試 / 攜帶
    來源 TEXT,
    is_hidden INTEGER DEFAULT 0,
    display_start_time TEXT,
    is_reliable INTEGER DEFAULT 1 -- 1:可靠, 0:AI生成需確認
);

-- 3. LINE 使用者狀態表 (用於對話流程)
CREATE TABLE IF NOT EXISTS line_user_state (
    user_id TEXT PRIMARY KEY,
    group_id TEXT,
    state TEXT,          -- awaiting_agreement, ready_for_setup, setup_complete
    updated_at INTEGER
);

-- 4. 條款同意紀錄表
CREATE TABLE IF NOT EXISTS group_agreements (
    group_id TEXT,
    user_id TEXT,
    agreed_at INTEGER,
    PRIMARY KEY (group_id, user_id)
);

-- 5. 勘誤建議表
CREATE TABLE IF NOT EXISTS task_suggestions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_id INTEGER,
    group_id TEXT,
    suggested_by TEXT,
    suggestion_content TEXT,
    suggestion_subject TEXT,
    suggestion_category TEXT,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected
    created_at INTEGER
);

-- 6. 全域系統設定表 (維護模式、政策)
CREATE TABLE IF NOT EXISTS system_settings (
    key TEXT PRIMARY KEY, -- system_config, ai_config, policy:{gid}
    value TEXT,
    updated_at INTEGER
);

-- 7. 系統日誌表
CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id TEXT,
    actor TEXT,
    action TEXT,
    details TEXT,
    ip_address TEXT,
    user_agent TEXT,
    timestamp INTEGER
);

-- 建立索引以加速查詢
CREATE INDEX IF NOT EXISTS idx_tasks_group ON tasks(群組);
CREATE INDEX IF NOT EXISTS idx_logs_ts ON logs(timestamp);
```

---

### 🔐 檔案 2: `SECRETS.txt` (環境變數與機密)
這些變數需要在 Cloudflare Worker 的 `Settings` -> `Variables` 中設定，或使用 `wrangler secret put` 指令。

| 變數名稱 (Key) | 說明 | 範例值 / 取得方式 |
| :--- | :--- | :--- |
| **`SUPER_ADMIN_PASSWORD`** | **超級管理員密碼** (最高權限) | `MySuperSecretPwd123!` (請設定高強度密碼) |
| **`LINE_CHANNEL_ACCESS_TOKEN`** | LINE Messaging API 存取權杖 | 從 LINE Developers Console 取得 (Long-lived) |
| **`LINE_CHANNEL_SECRET`** | (選用) LINE Channel Secret | 從 LINE Developers Console 取得 |

**綁定 (Bindings) 設定 (wrangler.toml):**
*   **D1 Database**: 變數名稱必須設為 `DB`
*   **Workers AI**: 變數名稱必須設為 `AI`
