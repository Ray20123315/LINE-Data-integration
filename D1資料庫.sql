-- 1. 群組授權與設定表
CREATE TABLE IF NOT EXISTS group_auth (
    group_id TEXT PRIMARY KEY,
    群組名稱 TEXT,
    角色設定 TEXT,       -- JSON: 含 Hash密碼, 權限, 救援碼(rec), 綁定碼
    科目設定 TEXT,       -- JSON
    advanced_settings TEXT, -- JSON: AI開關, 節次時間
    status TEXT DEFAULT 'active',
    version TEXT,
    is_locked INTEGER DEFAULT 0,
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
    due_time TEXT,
    科目 TEXT,
    內容 TEXT,
    狀態 TEXT,
    類別 TEXT,
    來源 TEXT,
    is_hidden INTEGER DEFAULT 0,
    display_start_time TEXT,
    is_reliable INTEGER DEFAULT 1 -- 1:可靠, 0:AI生成
);

-- 3. LINE 使用者狀態表
CREATE TABLE IF NOT EXISTS line_user_state (
    user_id TEXT PRIMARY KEY,
    group_id TEXT,
    state TEXT,
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
    status TEXT DEFAULT 'pending',
    created_at INTEGER
);

-- 6. 全域系統設定表
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

-- 建立索引
CREATE INDEX IF NOT EXISTS idx_tasks_group ON tasks(群組);
CREATE INDEX IF NOT EXISTS idx_logs_ts ON logs(timestamp);
