// --- START OF PART 1 ---

// ==========================================
// ★ 設定區
// ==========================================
const SUPER_ADMIN_PASSWORD_ENV_KEY = 'SUPER_ADMIN_PASSWORD'; 
const SUPER_ADMIN_PATH = "/super-admin";

// ★ 版本與更新控制
const CURRENT_VERSION = "4.8.0"; // PERMISSION_AND_UX_FIX
const TERMS_VERSION = "v1.2"; 

// ★ 維護模式設定
const MAINT_MODES = {
    "off": "正常運作",
    "data_update": "資料更新中",
    "data_maint": "資料維護中",
    "sys_update": "系統升級中",
    "sys_maint": "系統維護中"
};

const MAINT_MESSAGES_DETAIL = {
    "data_update": { title: "資料更新中", desc: "系統正在進行資料庫同步，請稍後再試。" },
    "data_maint": { title: "資料維護中", desc: "系統正在進行資料整理與備份，請稍候。" },
    "sys_update": { title: "系統升級中", desc: "我們正在部署新功能，敬請期待！" },
    "sys_maint": { title: "系統維護中", desc: "伺服器正在進行例行性維護，暫時無法提供服務。" },
    "off": { title: "正常運作", desc: "系統服務正常。" }
};

// 髒話過濾表
const DIRTY_WORDS = ["幹", "靠北", "三小", "機掰", "白癡", "智障", "腦殘", "fuck", "shit", "bitch", "傻B", "去死", "垃圾"];

// 常數定義
const CHANGELOG = `版本 ${CURRENT_VERSION} 更新：\n- 權限系統重構，支援科目級別管理。\n- 後台自動登入與體驗優化。\n- 新增 Administrator 最高權限保護。`;
const LINK_LINE_HOST = "https://github.com/Ray20123315/LINE-Data-integration"; 
const LINK_DISCORD = "https://discord.gg/kwRpZwn772";
const MAIL_CONTACT = "ray2026worker@ray2026.dpdns.org";
const CUSTOM_LINE_CONTACT = "https://lin.ee/VJ8IC4D";
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1447399857336746104/C3i3kpWvPm3ylH9x8tqi-PMEaKOxrNdqXftgYXmPtk-S0tLgQfvpbjyfcidUkIMiIZjZ";

// HTML 靜態內容
const TERMS_HTML_CONTENT = `<h1 class="text-2xl font-bold mb-6 text-blue-300">服務條款 (${TERMS_VERSION})</h1>`;
const LEGAL_TEXT_SHORT = `[條款版本: ${TERMS_VERSION}] 請點擊連結閱讀條款，並輸入 /bot agree 同意。`;
const EULA_TEXT = `<h1 class="text-2xl font-bold mb-4">最終使用者許可協議 (EULA)</h1><p>使用前請同意本條款。</p>`;

// 風控與安全性設定
const RISK_CONTROL_ENABLED = true; 
const MAX_LOGIN_ATTEMPTS = 5;      
const LOCKOUT_DURATION = 15 * 60 * 1000;

// UI 共用腳本
const COMMON_UI_SCRIPT = `
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<style>
    @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    .modal-content { animation: modalFadeIn 0.2s ease-out forwards; }
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: #1f2937; }
    ::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
</style>
<script>
    function showModal(type, title, message, showCancel = false) {
        return new Promise((resolve) => {
            const id = 'modal-' + Date.now();
            const colors = type === 'success' ? 'text-green-500' : (type === 'error' ? 'text-red-500' : 'text-blue-500');
            // 只有 showCancel 為 true 時才顯示取消，否則只有確認
            const btns = showCancel 
                ? \`<button id="btn-cancel-\${id}" class="flex-1 py-3.5 text-gray-400 border-r border-gray-700">取消</button><button id="btn-ok-\${id}" class="flex-1 py-3.5 \${colors} font-bold">確認</button>\`
                : \`<button id="btn-ok-\${id}" class="w-full py-3.5 \${colors} font-bold">確定</button>\`;
                
            const html = \`<div id="\${id}" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"><div class="modal-content bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700 overflow-hidden"><div class="p-6 text-center"><h3 class="text-xl font-bold text-white mb-2">\${title}</h3><p class="text-gray-300 text-sm whitespace-pre-wrap">\${message}</p></div><div class="flex border-t border-gray-700">\${btns}</div></div></div>\`;
            document.body.insertAdjacentHTML('beforeend', html);
            setTimeout(() => { 
                document.getElementById(\`btn-ok-\${id}\`).onclick = () => { document.getElementById(id).remove(); resolve(true); };
                if(showCancel) document.getElementById(\`btn-cancel-\${id}\`).onclick = () => { document.getElementById(id).remove(); resolve(false); };
            }, 50);
        });
    }
    window.alert = async (msg) => showModal('info', '提示', msg, false);
    window.myConfirm = async (msg) => showModal('warning', '確認', msg, true);
    window.successAlert = async (msg) => showModal('success', '成功', msg, false);
    window.errorAlert = async (msg) => showModal('error', '錯誤', msg, false);

    // ★ 輪詢機制
    let _lastDataTs = 0, _lastMaintTs = 0, _isPolling = false;
    async function startPolling(groupId, isManager = false) {
        if(!groupId || _isPolling) return;
        _isPolling = true;
        // 首次執行，不跳提示
        await checkUpdates(groupId, isManager, true);
        setInterval(() => checkUpdates(groupId, isManager), 30000); 
    }
    
    // silent = true 代表這是系統內部同步，不跳提示
    async function checkUpdates(groupId, isManager, silent = false) {
        try {
            const res = await fetch(window.location.origin + '/?action=check_updates&id=' + groupId);
            if(res.ok) {
                const d = await res.json();
                
                // 檢查資料
                if(_lastDataTs !== 0 && d.data_ts > _lastDataTs) {
                    _lastDataTs = d.data_ts;
                    if(!silent) {
                        // 後端不跳提示，只有前端跳
                        if (!isManager) {
                            await showModal('info', '資料更新', '偵測到新的作業或狀態變更，將為您重新整理。');
                            location.reload();
                        } else {
                            // 後台靜默更新，但如果需要刷新列表邏輯在後台腳本內處理
                            console.log('Data updated remotely');
                        }
                    }
                }
                
                // 檢查維護模式 (針對性檢查)
                const maintKey = isManager ? 'backend' : 'frontend';
                const currentMaintTs = d.maint_ts[maintKey] || 0;
                
                if(_lastMaintTs !== 0 && currentMaintTs > _lastMaintTs) {
                    _lastMaintTs = currentMaintTs;
                    await showModal('warning', '系統狀態變更', '系統維護模式已更新，將為您重新整理頁面。');
                    location.reload();
                }
                
                // 初始化 TS
                if(_lastDataTs === 0) _lastDataTs = d.data_ts;
                if(_lastMaintTs === 0) _lastMaintTs = currentMaintTs;
            }
        } catch(e) {}
    }
    
    function openMobileFilter(title, options, onSelect) {
        const id = 'sheet-' + Date.now();
        let optsHtml = options.map(opt => \`<button class="w-full py-4 px-6 text-left text-gray-300 hover:bg-gray-700 border-b border-gray-700 last:border-0" onclick="window._sheetCallbacks['\${id}']('\${opt.value}'); document.getElementById('\${id}').remove()">\${opt.text}</button>\`).join('');
        const html = \`<div id="\${id}" class="fixed inset-0 z-[8888] bg-black/60 backdrop-blur-sm flex flex-col justify-end"><div class="bg-gray-800 rounded-t-2xl max-h-[80vh] overflow-y-auto border-t border-gray-700"><div class="p-4 border-b border-gray-700 font-bold text-white text-center">\${title}</div>\${optsHtml}</div></div>\`;
        document.body.insertAdjacentHTML('beforeend', html);
        if(!window._sheetCallbacks) window._sheetCallbacks = {};
        window._sheetCallbacks[id] = onSelect;
    }
</script>
`;

// --- END OF PART 1 ---

// --- START OF PART 2 ---

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const hostname = url.hostname; 
        const CURRENT_ORIGIN = `${url.protocol}//${hostname}${url.port ? ':' + url.port : ''}`;
        
        // 初始化 DB
        try {
            await env.DB.prepare(`CREATE TABLE IF NOT EXISTS task_suggestions (id INTEGER PRIMARY KEY AUTOINCREMENT, task_id INTEGER, group_id TEXT, suggested_by TEXT, suggestion_content TEXT, suggestion_subject TEXT, suggestion_category TEXT, status TEXT DEFAULT 'pending', created_at INTEGER)`).run();
            await env.DB.prepare(`CREATE TABLE IF NOT EXISTS system_settings (key TEXT PRIMARY KEY, value TEXT, updated_at INTEGER)`).run();
            try { await env.DB.prepare("ALTER TABLE tasks ADD COLUMN due_time TEXT").run(); } catch(e){}
            try { await env.DB.prepare("ALTER TABLE group_auth ADD COLUMN last_data_update INTEGER").run(); } catch(e){}
        } catch(e){}

        const isManagerSite = hostname.includes("manage") || url.pathname.startsWith("/manager");
        const isSuperAdmin = hostname.includes("super") || url.pathname === SUPER_ADMIN_PATH; 

        // Polling API
        if (url.searchParams.get('action') === 'check_updates') {
            const gid = url.searchParams.get('id');
            const auth = await env.DB.prepare("SELECT last_data_update FROM group_auth WHERE group_id = ?").bind(gid).first();
            const conf = await env.DB.prepare("SELECT updated_at FROM system_settings WHERE key = 'system_config'").first();
            return new Response(JSON.stringify({
                data_ts: auth ? (auth.last_data_update || 0) : 0,
                maint_ts: conf ? (conf.updated_at || 0) : 0
            }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
        }

        if (request.method === "POST") {
            return handlePost(request, env, ctx, CURRENT_ORIGIN);
        }

        // ★★★ 維護模式攔截邏輯 (修復) ★★★
        if (!isSuperAdmin && url.pathname !== "/" && url.pathname !== "/eula" && url.pathname !== "/terms") {
            const config = await getSystemConfig(env);
            const maint = isManagerSite ? config.maintenance?.backend : config.maintenance?.frontend;
            
            if (maint && maint.enabled === true) {
                let isActive = true;
                // 只有當設定了結束時間，且當前時間大於結束時間時，才視為維護結束
                if (maint.end && maint.end.trim() !== "" && new Date(maint.end).getTime() < Date.now()) {
                    isActive = false;
                }
                
                if (isActive) {
                    return new Response(renderMaintenancePage(maint), { 
                        headers: { "Content-Type": "text/html;charset=utf-8", "Cache-Control": "no-store" } 
                    });
                }
            }
        }

        if (url.pathname === "/terms") return new Response(renderTermsHTML(CURRENT_ORIGIN), { headers: { "Content-Type": "text/html;charset=utf-8" } });
        if (url.pathname === "/eula") return new Response(renderEULAHTML(url.searchParams.get('redirect'), CURRENT_ORIGIN), { headers: { "Content-Type": "text/html;charset=utf-8" } });
        if (isManagerSite) return new Response(renderManagerHTML(CURRENT_ORIGIN), { headers: { "Content-Type": "text/html;charset=utf-8" } });
        if (isSuperAdmin) return new Response(renderSuperAdminHTML(CURRENT_ORIGIN), { headers: { "Content-Type": "text/html;charset=utf-8" } });
        
        const id = url.searchParams.get('id');
        if (!id) return new Response(renderHomePage(CURRENT_ORIGIN), { headers: { "Content-Type": "text/html;charset=utf-8" } });
        return new Response(renderStudentHTML(CURRENT_ORIGIN), { headers: { "Content-Type": "text/html;charset=utf-8" } });
    }
};

// ====================================================================
// ★ 後端邏輯 (API 處理)
// ====================================================================
async function handlePost(request, env, ctx, origin) {
    try {
        const ip = request.headers.get('CF-Connecting-IP') || 'Unknown';
        const json = await request.json();
        const { groupId, action } = json;

        if (json.events) return handleLineWebhook(json.events, env, ctx, origin);

        if (action && action.startsWith("super_admin")) {
            return handleSuperAdminAction(action, json, env, ip, request);
        }

        // --- 管理員相關 API ---
        
        if (action === "admin_check_status") {
            const auth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(groupId).first();
            if (!auth) return new Response(JSON.stringify({ status: "need_setup" }));
            // 後端這裡也要擋
            if (auth.status === 'terminated') return new Response(JSON.stringify({ status: "terminated", msg: "服務已終止，無法存取後台。" }));
            
            const roles = JSON.parse(auth.角色設定 || '{}');
            let adv = {}; try { adv = JSON.parse(auth.advanced_settings || '{}'); } catch(e){}
            let subjects = {}; try { subjects = JSON.parse(auth.科目設定 || '{}'); } catch(e){}
            
            return new Response(JSON.stringify({ 
                status: "login", 
                roles: roles, 
                subjects: subjects, 
                groupName: auth.群組名稱, 
                advanced: adv 
            }));
        }

        if (action === "admin_login") {
            const auth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(groupId).first();
            if(!auth) return new Response(JSON.stringify({ status: "fail", msg: "ID錯誤" }));
            if (auth.status === 'terminated') return new Response(JSON.stringify({ status: "fail", msg: "服務已終止" }));
            
            const roles = JSON.parse(auth.角色設定);
            const role = roles[json.roleName];
            if(!role) return new Response(JSON.stringify({ status: "fail", msg: "角色不存在" }));
            
            let success = false;
            const inputPwd = (json.password || "").trim();
            if (!role.hash || role.hash === "") success = true;
            else if (role.hash === await sha256(inputPwd)) success = true;

            if(success) {
                let adv = {}; try { adv = JSON.parse(auth.advanced_settings || '{}'); } catch(e){}
                let subjects = {}; try { subjects = JSON.parse(auth.科目設定); } catch(e){}
                
                await writeLog(env, groupId, json.roleName, "LOGIN_SUCCESS", "", request);
                return new Response(JSON.stringify({ 
                    status: "success", 
                    roleData: role, 
                    allRoles: roles, 
                    subjects: subjects, 
                    groupName: auth.群組名稱, 
                    advanced: adv 
                }));
            }
            
            await writeLog(env, groupId, json.roleName, "LOGIN_FAIL", "Wrong Password", request);
            return new Response(JSON.stringify({ status: "fail", msg: "密碼錯誤" }));
        }

// --- END OF PART 2 ---

// --- START OF PART 3 ---

if (action === "update_settings") {
    const auth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(groupId).first();
    let roles = JSON.parse(auth.角色設定 || '{}');
    
    // 驗證操作者權限 (基於傳入的 roleName)
    const actorName = json.roleName || "Student";
    const actor = roles[actorName];
    
    // 安全檢查：若非 Administrator 且無 manage_settings 權限，禁止進入
    const isFullAdmin = actorName === "Administrator";
    const hasSettingsPerm = actor?.perm?.includes("manage_settings");
    
    if (!actor || (!isFullAdmin && !hasSettingsPerm)) {
         return new Response(JSON.stringify({ status: "fail", msg: "權限不足" }));
    }

    // 1. 更新進階設定
    if(json.advancedSettings) {
        let oldAdv = {}; try { oldAdv = JSON.parse(auth.advanced_settings || '{}'); } catch(e){}
        const newAdv = { ...oldAdv, ...json.advancedSettings };
        if (newAdv.periods) {
            for(let k in newAdv.periods) { if(!newAdv.periods[k]) delete newAdv.periods[k]; }
        }
        await env.DB.prepare("UPDATE group_auth SET advanced_settings = ? WHERE group_id = ?").bind(JSON.stringify(newAdv), groupId).run();
    }

    // 2. 更新科目設定 (權限：Administrator 或 擁有該科目權限者)
    if(json.subjects) {
        // 若不是全權管理員，檢查是否只修改自己擁有的科目
        if (!isFullAdmin && !actor.subjects.includes('all')) {
             const oldSub = JSON.parse(auth.科目設定 || '{}');
             for (let s in json.subjects) {
                 if (!actor.subjects.includes(s) && !oldSub[s]) {
                     return new Response(JSON.stringify({ status: "fail", msg: `您無權管理科目: ${s}` }));
                 }
             }
        }
        await env.DB.prepare("UPDATE group_auth SET 科目設定 = ? WHERE group_id = ?").bind(JSON.stringify(json.subjects), groupId).run();
    }

    // 3. 更新角色/成員設定
    if(json.settings && json.settings.roles) {
        // 只有擁有 manage_roles 權限者可操作
        if (!isFullAdmin && !actor.perm.includes("manage_roles")) {
            return new Response(JSON.stringify({ status: "fail", msg: "無成員管理權限" }));
        }

        for (let [name, data] of Object.entries(json.settings.roles)) {
            // 防止篡改 Administrator
            if (name === "Administrator" && actorName !== "Administrator") continue;

            // 防止提權：非 Administrator 不能賦予別人自己沒有的權限
            if (!isFullAdmin) {
                const newPerms = data.perm || [];
                const illegalPerms = newPerms.filter(p => !actor.perm.includes(p));
                if (illegalPerms.length > 0) {
                    return new Response(JSON.stringify({ status: "fail", msg: "無法賦予您未擁有的權限" }));
                }
            }

            let old = roles[name] || {};
            let hash = old.hash || ""; 
            if(data.password && data.password.trim() !== "") hash = await sha256(data.password.trim());
            
            roles[name] = { 
                ...old, ...data, hash: hash,
                perm: data.perm || old.perm || [],
                subjects: data.subjects || old.subjects || []
            };
            delete roles[name].password;
        }
        
        await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), groupId).run();
        await writeLog(env, groupId, actorName, "UPDATE_ROLES", "", request);
        await triggerDataUpdate(env, groupId);
        return new Response(JSON.stringify({ status: "success", newRoles: roles }));
    }

    await triggerDataUpdate(env, groupId);
    await writeLog(env, groupId, actorName, "UPDATE_SETTINGS", "", request);
    return new Response(JSON.stringify({ status: "success" }));
}

if (action === "admin_setup") {
    const pwd = (json.password || "").trim();
    const hash = pwd ? await sha256(pwd) : "";
    const rescueCode = genRescueCode();
    
    // 名稱改為 Administrator
    const initialRoles = { "Administrator": { hash: hash, subjects: ["all"], perm: ["manage_roles", "manage_settings", "manage_tasks_full"], level: 99, rec: rescueCode } };
    const defaultSubjects = JSON.stringify({ '國語': ['國文'], '英文': ['英文'], '數學': ['數學'] });
    
    await env.DB.prepare("INSERT OR REPLACE INTO group_auth (group_id, 群組名稱, 角色設定, 科目設定, status, version) VALUES (?, ?, ?, ?, 'active', ?)").bind(groupId, json.groupName, JSON.stringify(initialRoles), defaultSubjects, CURRENT_VERSION).run();
    await writeLog(env, groupId, "System", "INIT_GROUP", `Name: ${json.groupName}`, request);
    return new Response(JSON.stringify({ status: "success", recoveryCode: rescueCode }));
}

if (action === "change_password") {
    const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(groupId).first();
    let roles = JSON.parse(auth.角色設定);
    
    // 允許修改自己的密碼，或 Administrator 修改他人 (需擴充，目前僅支援改自己)
    // 這裡邏輯改為：如果 roleName 是自己，驗舊密碼；如果是 Admin 改別人，不用舊密碼 (但前端目前只送 old/new)
    
    const role = roles[json.roleName];
    if(!role) return new Response(JSON.stringify({ status: "fail", msg: "角色不存在" }));
    
    if(role.hash && role.hash !== "") {
        if (role.hash !== await sha256(json.oldPassword)) return new Response(JSON.stringify({ status: "fail", msg: "舊密碼錯誤" }));
    }
    
    role.hash = await sha256(json.newPassword);
    roles[json.roleName] = role;
    
    await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), groupId).run();
    await writeLog(env, groupId, json.roleName, "CHANGE_PASSWORD", "", request);
    return new Response(JSON.stringify({ status: "success" }));
}

if (action === "admin_reset_pwd") {
    const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(groupId).first();
    let roles = JSON.parse(auth.角色設定);
    const role = roles[json.roleName]; // 這裡通常是 Administrator
    
    if (!role || role.rec !== json.recoveryCode) return new Response(JSON.stringify({ status: "fail", msg: "救援碼錯誤" }));
    
    const newPwd = (json.newPassword || "").trim();
    role.hash = newPwd ? await sha256(newPwd) : "";
    role.rec = genRescueCode();
    
    roles[json.roleName] = role;
    await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), groupId).run();
    return new Response(JSON.stringify({ status: "success", newRecoveryCode: role.rec }));
}

// --- 作業相關 API ---

if (action === "get_tasks" || action === "admin_get_tasks") {
    const auth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(groupId).first();
    if(!auth) return new Response(JSON.stringify({ tasks: [], error: "找不到群組" }));
    
    if (auth.status === 'terminated') {
        return new Response(JSON.stringify({ tasks: [], error: "TERMINATED", msg: "服務已終止" }));
    }
    
    const isAdmin = action === "admin_get_tasks";
    let sql = `SELECT id, 截止日期 as date, due_time, 科目 as subject, 內容 as content, 狀態 as status, 類別 as category, 來源 as source FROM tasks WHERE 群組 = ?`;
    
    if(!isAdmin) sql += ` AND 狀態 = '已發佈' AND (is_hidden = 0 OR is_hidden IS NULL) ORDER BY 截止日期 ASC, due_time ASC`;
    else sql += ` ORDER BY 建立時間 DESC`;

    const { results } = await env.DB.prepare(sql).bind(groupId).all();
    
    let adv = {}; try { adv = JSON.parse(auth.advanced_settings || '{}'); } catch(e){}
    let response = { tasks: results, groupName: auth.群組名稱, periods: adv.periods || {} };
    
    if(isAdmin) {
        const sugs = await env.DB.prepare("SELECT * FROM task_suggestions WHERE group_id = ? AND status = 'pending'").bind(groupId).all();
        response.suggestions = sugs.results;
    }
    return new Response(JSON.stringify(response));
}

if (action === "add_task") {
    // 權限檢查
    const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(groupId).first();
    const roles = JSON.parse(auth.角色設定);
    const actor = roles[json.roleName];

    // 若非 Admin 且無 manage_tasks_full 且無該科目權限，禁止
    // 若為 "add_task" 前端請求 (json.isAdmin 為 true 但其實是後台 API)，需檢查權限
    if (json.isAdmin) {
        if (!actor) return new Response(JSON.stringify({ status: "fail", msg: "Access Denied" }));
        const canManageAll = actor.perm.includes("manage_tasks_full") || json.roleName === "Administrator";
        const canManageSub = actor.subjects.includes("all") || actor.subjects.includes(json.subject);
        
        if (!canManageAll && !canManageSub) {
            return new Response(JSON.stringify({ status: "fail", msg: "無此科目的新增權限" }));
        }
    }

    let status = json.isAdmin ? "已發佈" : "待審核";
    let dueTime = json.dueTime || null;
    
    if(!dueTime && json.content) {
        const authSettings = await env.DB.prepare("SELECT advanced_settings FROM group_auth WHERE group_id = ?").bind(groupId).first();
        let periods = {}; try { periods = JSON.parse(authSettings.advanced_settings).periods; } catch(e){}
        dueTime = parseTimeFromText(json.content, periods);
    }

    await env.DB.prepare(`INSERT INTO tasks (群組, 建立時間, 截止日期, due_time, 科目, 內容, 狀態, 類別, 來源) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(groupId, Date.now(), json.date, dueTime, json.subject || "未分類", json.content, status, json.category, "網頁").run();
    
    await triggerDataUpdate(env, groupId);
    if(json.isAdmin) await writeLog(env, groupId, json.roleName || "Admin", "ADD_TASK", json.content, request);
    return new Response(JSON.stringify({ status: "success" }));
}

// --- END OF PART 3 ---

// --- START OF PART 4 ---

if (action === "update_task") {
    const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(groupId).first();
    const roles = JSON.parse(auth.角色設定);
    const actor = roles[json.roleName];
    
    const canManageAll = actor.perm.includes("manage_tasks_full") || json.roleName === "Administrator";
    const canManageSub = actor.subjects.includes("all") || actor.subjects.includes(json.subject); // 注意：需確認該 Task 的科目

    // 嚴謹檢查：需先撈出 Task 確認科目 (略微耗時但安全)
    const task = await env.DB.prepare("SELECT 科目 FROM tasks WHERE id = ?").bind(json.taskId).first();
    if (!task) return new Response(JSON.stringify({ status: "fail", msg: "作業不存在" }));
    
    const taskSubAccess = actor.subjects.includes("all") || actor.subjects.includes(task.科目);

    if (!canManageAll && !taskSubAccess) {
         return new Response(JSON.stringify({ status: "fail", msg: "無權限修改此科目作業" }));
    }

    const isHidden = json.is_hidden ? 1 : 0;
    const displayTime = json.display_start_time || null;

    await env.DB.prepare(`UPDATE tasks SET 截止日期 = ?, due_time = ?, 科目 = ?, 內容 = ?, 類別 = ?, is_hidden = ?, display_start_time = ? WHERE id = ?`)
        .bind(json.date, json.dueTime, json.subject, json.content, json.category, isHidden, displayTime, json.taskId).run();
    
    await triggerDataUpdate(env, groupId);
    await writeLog(env, groupId, json.roleName || "Admin", "UPDATE_TASK", `ID:${json.taskId}`, request);
    return new Response(JSON.stringify({ status: "success" }));
}

if (action === "manage_task") {
    const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(groupId).first();
    const roles = JSON.parse(auth.角色設定);
    const actor = roles[json.roleName];
    
    const task = await env.DB.prepare("SELECT 科目 FROM tasks WHERE id = ?").bind(json.taskId).first();
    if(!task) return new Response(JSON.stringify({ status: "fail", msg: "Task not found" }));
    
    const canManageAll = actor.perm.includes("manage_tasks_full") || json.roleName === "Administrator";
    const canManageSub = actor.subjects.includes("all") || actor.subjects.includes(task.科目);
    
    if (!canManageAll && !canManageSub) return new Response(JSON.stringify({ status: "fail", msg: "權限不足" }));

    if(json.type === 'delete') {
        await env.DB.prepare("DELETE FROM tasks WHERE id = ?").bind(json.taskId).run();
        await writeLog(env, groupId, json.roleName || "Admin", "DELETE_TASK", `ID:${json.taskId}`, request);
    } 
    else if(json.type === 'approve') {
        await env.DB.prepare("UPDATE tasks SET 狀態 = '已發佈' WHERE id = ?").bind(json.taskId).run();
        await writeLog(env, groupId, json.roleName || "Admin", "APPROVE_TASK", `ID:${json.taskId}`, request);
    }
    await triggerDataUpdate(env, groupId);
    return new Response(JSON.stringify({ status: "success" }));
}

// --- 勘誤建議 ---

if (action === "submit_suggestion") {
    await env.DB.prepare("INSERT INTO task_suggestions (task_id, group_id, suggested_by, suggestion_content, suggestion_subject, suggestion_category, status, created_at) VALUES (?, ?, 'Student_FE', ?, ?, ?, 'pending', ?)")
        .bind(json.taskId, groupId, json.content, json.subject, json.category, Date.now()).run();
    await triggerDataUpdate(env, groupId);
    await writeLog(env, groupId, "Frontend", "SUBMIT_SUGGESTION", `Task:${json.taskId}`, request);
    return new Response(JSON.stringify({ status: "success" }));
}

if (action === "admin_approve_suggestion") {
    const sug = await env.DB.prepare("SELECT * FROM task_suggestions WHERE id = ?").bind(json.suggestionId).first();
    if(!sug) return new Response(JSON.stringify({ status: "fail", msg: "Suggestion not found" }));

    // 權限檢查：審核者是否有該科目權限
    const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(groupId).first();
    const roles = JSON.parse(auth.角色設定);
    const actor = roles[json.roleName];
    
    const canManageAll = actor.perm.includes("manage_tasks_full") || json.roleName === "Administrator";
    const canManageSub = actor.subjects.includes("all") || actor.subjects.includes(sug.suggestion_subject);
    
    if (!canManageAll && !canManageSub) return new Response(JSON.stringify({ status: "fail", msg: "無權限審核此科目" }));

    await env.DB.prepare("UPDATE tasks SET 科目 = ?, 內容 = ?, 類別 = ? WHERE id = ?").bind(sug.suggestion_subject, sug.suggestion_content, sug.suggestion_category, sug.task_id).run();
    await env.DB.prepare("UPDATE task_suggestions SET status = 'approved' WHERE id = ?").bind(json.suggestionId).run();
    await env.DB.prepare("UPDATE task_suggestions SET status = 'rejected' WHERE task_id = ? AND status = 'pending'").bind(sug.task_id).run();
    
    await triggerDataUpdate(env, groupId);
    await writeLog(env, groupId, json.roleName || "Admin", "APPROVE_SUGGESTION", `ID:${json.suggestionId}`, request);
    return new Response(JSON.stringify({ status: "success" }));
}

if (action === "admin_reject_suggestion") {
    // 駁回也需要檢查權限
    const sug = await env.DB.prepare("SELECT * FROM task_suggestions WHERE id = ?").bind(json.suggestionId).first();
    if(!sug) return new Response(JSON.stringify({ status: "fail" }));
    
    const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(groupId).first();
    const roles = JSON.parse(auth.角色設定);
    const actor = roles[json.roleName];
    const canManage = actor.perm.includes("manage_tasks_full") || json.roleName === "Administrator" || actor.subjects.includes("all") || actor.subjects.includes(sug.suggestion_subject);
    
    if(!canManage) return new Response(JSON.stringify({ status: "fail", msg: "無權限" }));

    await env.DB.prepare("UPDATE task_suggestions SET status = 'rejected' WHERE id = ?").bind(json.suggestionId).run();
    return new Response(JSON.stringify({ status: "success" }));
}

return new Response(JSON.stringify({error: "Unknown Action"}), { status: 400 });
} catch (err) {
console.error("Critical Error in handlePost:", err);
return new Response(JSON.stringify({ error: err.message }), { status: 500 });
}
}

// ====================================================================
// ★ Super Admin 邏輯
// ====================================================================
async function handleSuperAdminAction(action, json, env, ip, request) {
const superPwd = env[SUPER_ADMIN_PASSWORD_ENV_KEY];
if (!superPwd || json.password !== superPwd) {
if(action === "super_admin_login") await writeLog(env, "SYSTEM", "SuperAdmin", "SUPER_LOGIN_FAIL", "Wrong Password", request);
return new Response(JSON.stringify({ status: "fail", msg: "密碼錯誤" }));
}

if (action === "super_admin_login") {
return new Response(JSON.stringify({ status: "success" }));
}

if (action === "super_admin_get_data") {
const config = await getSystemConfig(env);
const { results } = await env.DB.prepare("SELECT group_id, 群組名稱, 角色設定 FROM group_auth").all();
const groups = results.map(g => {
    let roles = {}; 
    let rescue = "無";
    let isBound = false;
    try { 
        roles = JSON.parse(g.角色設定); 
        if(roles["Administrator"] || roles["總管理員"]) { 
            const admin = roles["Administrator"] || roles["總管理員"];
            rescue = admin.rec || "無"; 
            if(admin.owner_line_id) isBound = true;
        }
    } catch (e) {}
    return { id: g.group_id, name: g.群組名稱 || '未命名', rescue_code: rescue, is_bound: isBound };
});
return new Response(JSON.stringify({ status: "success", config: config, groups: groups }));
}

if (action === "super_admin_set_maintenance") {
try {
    await env.DB.prepare(`CREATE TABLE IF NOT EXISTS system_settings (key TEXT PRIMARY KEY, value TEXT, updated_at INTEGER)`).run();
    
    const newSettings = { maintenance: json.maintenance };
    
    await env.DB.prepare("INSERT INTO system_settings (key, value, updated_at) VALUES ('system_config', ?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at")
        .bind(JSON.stringify(newSettings), Date.now()).run();
        
    await writeLog(env, "System", "SuperAdmin", "SET_MAINTENANCE", JSON.stringify(json.maintenance), request);
    return new Response(JSON.stringify({ status: "success" }));
} catch(e) {
    return new Response(JSON.stringify({ status: "fail", msg: "DB Error: " + e.message }));
}
}

// --- END OF PART 4 ---

// --- START OF PART 5 ---

if (action === "super_admin_get_logs") {
    // 取得系統日誌 (最近 100 筆)
    const { results } = await env.DB.prepare("SELECT * FROM logs ORDER BY timestamp DESC LIMIT 100").all();
    return new Response(JSON.stringify({ status: "success", logs: results }));
}

if (action === "super_admin_delete_group") { 
    // 強制刪除群組所有資料 (不可逆)
    const gId = json.targetGroupId;
    await env.DB.prepare("DELETE FROM group_auth WHERE group_id = ?").bind(gId).run(); 
    await env.DB.prepare("DELETE FROM tasks WHERE 群組 = ?").bind(gId).run(); 
    await env.DB.prepare("DELETE FROM line_user_state WHERE group_id = ?").bind(gId).run();
    await env.DB.prepare("DELETE FROM group_agreements WHERE group_id = ?").bind(gId).run();
    
    await writeLog(env, "System", "SuperAdmin", "DELETE_GROUP", `Deleted ${gId}`, request);
    return new Response(JSON.stringify({ status: "success" })); 
}

// Factory Reset Group (清除資料但保留 ID 與 綁定資訊)
if (action === "super_admin_reset_group_data") {
     const gId = json.targetGroupId;
     // 1. 清除所有作業
     await env.DB.prepare("DELETE FROM tasks WHERE 群組 = ?").bind(gId).run();
     // 2. 清除使用者狀態
     await env.DB.prepare("DELETE FROM line_user_state WHERE group_id = ?").bind(gId).run();
     // 3. 清除同意條款紀錄
     await env.DB.prepare("DELETE FROM group_agreements WHERE group_id = ?").bind(gId).run();
     
     // 4. 重置角色設定，但保留「總管理員」的關鍵資訊 (復原碼、Hash、綁定ID)
     const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(gId).first();
     if(auth) {
         let roles = {};
         try { roles = JSON.parse(auth.角色設定); } catch(e){}
         
         const oldAdmin = roles["總管理員"] || {};
         const newAdmin = { 
             ...oldAdmin, 
             // 強制重置權限與科目為預設全開
             subjects: ["all"], 
             perm: ["manage_roles", "manage_settings", "manage_tasks_full", "access_frontend_control", "self_change_pwd"], 
             level: 99 
         };
         
         const initialRoles = { "總管理員": newAdmin };
         await env.DB.prepare("UPDATE group_auth SET 角色設定 = ?, is_locked = 0, status = 'active' WHERE group_id = ?").bind(JSON.stringify(initialRoles), gId).run();
     }
     
     await writeLog(env, "System", "SuperAdmin", "RESET_GROUP", `Reset ${gId}`, request);
     return new Response(JSON.stringify({ status: "success" }));
}

if (action === "super_admin_search") { 
    // 萬能搜尋 (ID / 名稱 / 復原碼)
    const kw = json.keyword.trim(); 
    const { results } = await env.DB.prepare("SELECT * FROM group_auth").all(); 
    const found = []; 
    
    for(const g of results) { 
        try { 
            const roles = JSON.parse(g.角色設定); 
            const admin = roles["總管理員"]; 
            
            const matchId = g.group_id.includes(kw); 
            const matchName = (g.群組名稱||"").includes(kw); 
            const matchRestore = (admin && (admin.restore_key === kw || admin.rec === kw)); 
            
            if(matchId || matchName || matchRestore) { 
                found.push({ 
                    group_id: g.group_id, 
                    group_name: g.群組名稱, 
                    rescue_code: admin ? admin.rec : "無", 
                    restore_code: admin ? admin.restore_key : "無", 
                    is_bound: !!(admin && admin.owner_line_id) 
                }); 
            } 
        } catch(e) {} 
    } 
    return new Response(JSON.stringify({ status: "success", data: found })); 
}

if (action === "super_admin_regen_restore") { 
    // 強制重置某群組的復原碼 (User 忘記救援碼時使用)
    const gId = json.targetGroupId; 
    const auth = await env.DB.prepare("SELECT 角色設定 as roles_json FROM group_auth WHERE group_id = ?").bind(gId).first(); 
    
    if(!auth) return new Response(JSON.stringify({ status: "fail", msg: "群組不存在" })); 
    
    let roles = JSON.parse(auth.roles_json); 
    if(roles["總管理員"]) { 
        roles["總管理員"].restore_key = genRestoreCode(); // 生成新的 10 碼
        await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), gId).run(); 
        return new Response(JSON.stringify({ status: "success", newRestoreCode: roles["總管理員"].restore_key })); 
    } 
    return new Response(JSON.stringify({ status: "fail" })); 
}

return new Response(JSON.stringify({status: "fail", msg: "Unknown Super Admin Action"}));
}

// ====================================================================
// ★ LINE Webhook (處理 LINE 傳來的事件)
// ====================================================================
async function handleLineWebhook(events, env, ctx, origin) {
for (const event of events) {
    try {
        const gId = event.source.groupId || event.source.roomId; // 群組ID
        const uId = event.source.userId; // 使用者ID
        const isPrivate = !gId; // 是否為私訊

        // 1. 機器人離開群組事件
        if (event.type === 'leave' && gId) { 
            // 清除該群組的暫存狀態與同意紀錄，保留主要設定以免誤刪
            await env.DB.prepare("DELETE FROM group_agreements WHERE group_id = ?").bind(gId).run();
            await env.DB.prepare("UPDATE group_auth SET is_locked = 0, locking_user_id = NULL WHERE group_id = ?").bind(gId).run();
            await env.DB.prepare("DELETE FROM line_user_state WHERE group_id = ?").bind(gId).run();
            continue; 
        }

        // 2. 成員加入群組事件 (觸發條款同意流程)
        if (event.type === 'memberJoined' && gId) {
            const newMembers = event.joined.members;
            if (newMembers.length > 0) {
                const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(gId).first();
                // 只有已啟用的群組才需要鎖定
                if (auth && auth.角色設定) {
                    await env.DB.prepare("UPDATE group_auth SET is_locked = 1, locking_user_id = ? WHERE group_id = ?").bind(newMembers[0].userId, gId).run();
                    const welcome = `⚠️ 有新成員加入！\n為確保所有成員權益，系統暫停服務。\n新成員需在群組輸入 /bot agree 同意條款後，服務才能恢復。`;
                    ctx.waitUntil(replyLineMessageWithButton(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, welcome, "點擊此處查看服務條款", `${origin}/terms`));
                }
            }
            continue;
        }

        // 只處理文字訊息
        if (event.type !== 'message' || event.message.type !== 'text') continue;
        
        const text = event.message.text.trim();

        // --- 系統指令區 ---

        // ★ /bot test (健康檢查與維護狀態查詢)
        if (text === '/bot test') {
            let isAllowed = isPrivate;
            if (!isPrivate) {
                // 群組內僅限「綁定擁有者」使用，避免洗版
                const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(gId).first();
                if (auth) {
                    try {
                        const roles = JSON.parse(auth.角色設定);
                        if (roles['總管理員'] && roles['總管理員'].owner_line_id === uId) isAllowed = true;
                    } catch(e){}
                }
            }
            
            if (!isAllowed) continue; // 權限不足不回覆

            const start = Date.now();
            const dbStart = Date.now();
            await env.DB.prepare("SELECT 1").first(); // 測試 DB 連線
            const dbMs = Date.now() - dbStart;
            
            const config = await getSystemConfig(env);
            const fe = config.maintenance?.frontend;
            const be = config.maintenance?.backend;
            
            // 檢查維護模式是否生效 (時間判斷)
            const isFeActive = fe && fe.enabled && (!fe.end || Date.now() <= new Date(fe.end).getTime());
            const isBeActive = be && be.enabled && (!be.end || Date.now() <= new Date(be.end).getTime());
            
            const cfMs = Date.now() - start; 
            let report = `Worker 健康檢查報告：\n✅ Cloudflare: ${cfMs}ms\n✅ D1資料庫: ${dbMs}ms\n`;
            
            if (isFeActive) report += `⚠️ 前端: ${MAINT_MODES[fe.type] || fe.type}\n`; else report += `✅ 前端: 正常\n`;
            if (isBeActive) report += `⚠️ 後端: ${MAINT_MODES[be.type] || be.type}\n`; else report += `✅ 後端: 正常\n`;
            
            ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, report));
            continue;
        }

        // ★ /bot reboot (強制修復指令)
        if (text === '/bot reboot') {
            // 不論狀態如何都強制重置鎖定狀態 (用於卡死救援)
            if (gId) {
                await env.DB.prepare("UPDATE group_auth SET status = 'active', terminated_at = NULL, is_locked = 1 WHERE group_id = ?").bind(gId).run();
                await env.DB.prepare("DELETE FROM group_agreements WHERE group_id = ?").bind(gId).run();
                await env.DB.prepare("DELETE FROM line_user_state WHERE group_id = ?").bind(gId).run();
                ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `✅ 服務已強制重啟！狀態已重置。\n所有成員需重新同意條款才能繼續使用。`));
            }
            continue;
        }

        // ★ 私訊綁定邏輯 (/bind)
        if (isPrivate) {
            if (text.startsWith('/bind ')) {
                const code = text.replace('/bind ', '').trim();
                // 搜尋哪個群組有此綁定碼
                const { results } = await env.DB.prepare("SELECT group_id, 角色設定 FROM group_auth").all();
                let foundGroup = null;
                
                for(const g of results) { 
                    try { 
                        let roles = JSON.parse(g.角色設定); 
                        // 檢查總管理員的 binding_code
                        if (roles["總管理員"] && roles["總管理員"].binding_code === code) { 
                            roles["總管理員"].binding_code = null; // 綁定後清除代碼
                            roles["總管理員"].owner_line_id = uId; // 記錄 LINE User ID
                            await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), g.group_id).run(); 
                            foundGroup = g.group_id; 
                            break; 
                        } 
                    } catch(e) {} 
                }
                
                if(foundGroup) { 
                    await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, state, group_id) VALUES (?, 'setup_complete', ?)").bind(uId, foundGroup).run(); 
                    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "✅ 綁定成功！您現在是此群組的擁有者，可使用 /bot 復原碼 查看復原碼。")); 
                } else { 
                    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "❌ 綁定失敗：代碼錯誤或已失效。")); 
                }
            } else if (text === '/bot 復原碼') {
                // 查詢自己擁有的群組復原碼
                const stateEntry = await env.DB.prepare("SELECT group_id FROM line_user_state WHERE user_id = ?").bind(uId).first();
                if(stateEntry && stateEntry.group_id) {
                     const g = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(stateEntry.group_id).first();
                     if(g) {
                         const r = JSON.parse(g.角色設定);
                         if(r["總管理員"]?.owner_line_id === uId) {
                             ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `🔑 復原碼：${r["總管理員"].rec}`));
                         } else {
                             ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "⛔ 權限不足：您不是此群組的擁有者。"));
                         }
                     }
                } else {
                    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "⚠️ 查無綁定紀錄，請先在群組完成設定並使用 /bind 綁定。"));
                }
            }
            continue;
        }

        // 防止在群組內洩漏綁定碼
        if (text.startsWith('/bind ')) {
            ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "🚫 為了安全，請在與機器人的「個人聊天」中使用 /bind 指令。"));
            continue;
        }

// --- END OF PART 5 ---

// --- START OF PART 6 ---

if (text === '/bot help') { 
    const helpMsg = `🤖 指令清單：\n🔹 /bot 學生：取得學生網址\n🔹 /bot 後台：取得後台網址\n🔹 /bot 復原碼：顯示復原碼 (限私訊)\n🔹 /bot ID：顯示群組 ID\n\n⚙️ 管理指令：\n/bind <4碼>：綁定管理員(限私訊)\n\n⚙️ 其他：\n/bot newID：生成新群組\n/bot <ID>：沿用舊設定\n/bot test：系統診斷(限管理員)\n/bot reboot：重啟服務`; 
    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, helpMsg)); 
    continue; 
}

// 檢查群組狀態 (是否終止、版本是否過舊)
const groupAuthPreCheck = await env.DB.prepare("SELECT status, version, is_locked, last_warning_ts FROM group_auth WHERE group_id = ?").bind(gId).first();

if (groupAuthPreCheck && groupAuthPreCheck.status === 'terminated') { 
    // 若已終止服務，不再回應任何訊息 (除非是 reboot 指令，已在上面處理)
    continue; 
}

// 讀取使用者狀態
let userState = await env.DB.prepare("SELECT * FROM line_user_state WHERE user_id = ? AND group_id = ?").bind(uId, gId).first();

// 版本更新檢查：若程式版本更新，強制鎖定群組並要求重新同意條款
if (groupAuthPreCheck && groupAuthPreCheck.version !== CURRENT_VERSION && userState?.state !== 'awaiting_agreement') {
    await env.DB.prepare("UPDATE group_auth SET is_locked = 1 WHERE group_id = ?").bind(gId).run();
    await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'awaiting_agreement')").bind(uId, gId).run();
    await env.DB.prepare("DELETE FROM group_agreements WHERE group_id = ?").bind(gId).run();
    ctx.waitUntil(replyLineMessageWithButton(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `🔄 【後端】服務版本已更新！\n為確保所有成員了解最新條款，請全體成員重新同意。\n\n${CHANGELOG}`, "我知道了", `${origin}/terms?ack=1`));
    continue;
}

// ★ /bot start (初始化流程)
if (text === '/bot start') {
    await env.DB.prepare("INSERT OR IGNORE INTO group_auth (group_id) VALUES (?)").bind(gId).run();
    let groupAuth = await env.DB.prepare("SELECT version FROM group_auth WHERE group_id = ?").bind(gId).first();
    
    // 如果版本不同，更新版本號並重置狀態
    if (groupAuth && groupAuth.version && groupAuth.version !== CURRENT_VERSION) {
        await env.DB.prepare("UPDATE group_auth SET version = ? WHERE group_id = ?").bind(CURRENT_VERSION, gId).run();
    }
    
    // 設定狀態為「等待同意」
    await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'awaiting_agreement')").bind(uId, gId).run();
    await env.DB.prepare("DELETE FROM group_agreements WHERE group_id = ?").bind(gId).run(); // 清除舊紀錄
    
    ctx.waitUntil(replyLineMessageWithButton(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, LEGAL_TEXT_SHORT, "閱讀服務條款", `${origin}/terms`));
    continue; 
}

// 檢查是否已同意
const hasAgreed = await env.DB.prepare("SELECT 1 FROM group_agreements WHERE group_id = ? AND user_id = ?").bind(gId, uId).first();
const isGroupLocked = (groupAuthPreCheck && groupAuthPreCheck.is_locked === 1);

// 決定當前狀態
let currentState = 'setup_complete'; 
if (userState) {
    currentState = userState.state;
} else if (isGroupLocked && !hasAgreed) {
    // 如果群組被鎖定且使用者未同意，強制進入等待同意狀態
    currentState = 'awaiting_agreement';
}

// --- 狀態機邏輯 ---

// 狀態 1: 等待同意條款
if (currentState === 'awaiting_agreement') {
    if (text === '/bot agree') {
        if (hasAgreed) continue; // 已同意過則忽略

        await env.DB.prepare("INSERT OR IGNORE INTO group_agreements (group_id, user_id) VALUES (?, ?)").bind(gId, uId).run();
        
        // 檢查是否「全體」成員都已同意
        const allAgreed = await checkAllAgreed(env, gId);
        
        if (allAgreed) {
            // 解鎖群組
            await env.DB.prepare("UPDATE group_auth SET is_locked = 0, locking_user_id = NULL, version = ? WHERE group_id = ?").bind(CURRENT_VERSION, gId).run();
            
            const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(gId).first();
            
            if (!auth || !auth.角色設定) {
                 // 首次使用：引導去設定 ID
                 await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'ready_for_setup')").bind(uId, gId).run();
                 ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `✅ 全體成員皆已同意！\n請管理員輸入 \`/bot newID\` (建立新群組) 或 \`/bot <舊ID>\` (沿用舊設定) 來完成啟用。`));
            } else {
                 // 既有群組 (如新成員加入解鎖)：恢復服務
                 await env.DB.prepare("UPDATE line_user_state SET state = 'setup_complete' WHERE group_id = ?").bind(gId).run();
                 ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `✅ 條款更新完畢，服務已恢復！\n${getExistingWelcomeMessage(gId, origin)}`));
            }
        }
    } else if (text === '/bot disagree') {
        // 有人不同意，觸發服務終止
        const terminatedAt = new Date().toISOString();
        await env.DB.prepare("UPDATE group_auth SET status = 'terminated', terminated_at = ? WHERE group_id = ?").bind(terminatedAt, gId).run();
        
        ctx.waitUntil(pushLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, uId, "感謝您的回覆。依據服務條款，您已選擇不接受本協議，本服務將自即日起對您的帳號終止所有功能，並停止提供服務。"));
        const groupMsg = `🚨 服務緊急終止通知 (Service Termination Notice)\n\n感謝您使用本服務。\n\n依據本服務嚴格的授權政策，由於未能取得所有使用者對新服務條款的百分之百一致同意，本服務已觸發終止條件。\n\n本服務將在72小時後永久關閉，在此之前請記錄下救援碼以便日後恢復。\n\n版權所有 © 2025 [Ray20123315/Ray chen]。保留所有權利。`;
        ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, groupMsg));
    }
    continue;
}

// 狀態 2: 準備設定 ID (僅限首次/重置後)
if (currentState === 'ready_for_setup') {
    if (text === '/bot newID') {
        // 使用當前群組 ID
        await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'setup_complete')").bind(uId, gId).run();
        ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, getNewWelcomeMessage(gId, origin)));
        continue;
    }
    if (text.startsWith('/bot ')) {
         // 沿用舊 ID
         const inputId = text.replace('/bot ', '').trim();
         if (inputId.length > 5) {
            const oldGroup = await env.DB.prepare("SELECT group_id FROM group_auth WHERE group_id = ?").bind(inputId).first();
            if (oldGroup) {
                // 更新使用者狀態指向舊 ID
                await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'setup_complete')").bind(uId, inputId).run();
                ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, getExistingWelcomeMessage(inputId, origin)));
            } else {
                ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, '❌ 找不到該 ID，請確認後再試。'));
            }
         }
         continue;
    }
}

// 決定實際生效的 Group ID (可能是沿用的舊 ID)
const effectiveGId = userState?.group_id || gId;
const groupAuth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(effectiveGId).first();

// 檢查鎖定狀態 (例如新成員加入)
if (groupAuth && groupAuth.is_locked === 1) {
    // 如果是同意指令，進行檢查
    if (text === '/bot agree') {
         await env.DB.prepare("INSERT OR IGNORE INTO group_agreements (group_id, user_id) VALUES (?, ?)").bind(gId, uId).run();
         const allAgreed = await checkAllAgreed(env, gId);
         if(allAgreed) {
            await env.DB.prepare("UPDATE group_auth SET is_locked = 0, locking_user_id = NULL WHERE group_id = ?").bind(gId).run();
            ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "✅ 新成員已同意條款，機器人恢復服務。"));
         }
    } else if (text === '/bot disagree') {
         // 同上，不同意則終止
         const terminatedAt = new Date().toISOString();
         await env.DB.prepare("UPDATE group_auth SET status = 'terminated', terminated_at = ? WHERE group_id = ?").bind(terminatedAt, gId).run();
         const groupMsg = `🚨 服務緊急終止通知 (Service Termination Notice)\n\n因成員拒絕條款，服務已終止。`;
         ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, groupMsg));
    } else if (text.startsWith('/bot')) {
        // 若在鎖定期間輸入其他指令，提示需先同意
        const now = Date.now();
        // 避免提示太頻繁 (每分鐘一次)
        if (now - (groupAuth.last_warning_ts || 0) > 60000) {
            await env.DB.prepare("UPDATE group_auth SET last_warning_ts = ? WHERE group_id = ?").bind(now, gId).run();
            ctx.waitUntil(replyLineMessageWithButton(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "⚠️ 群組暫停服務中，等待新成員同意條款。", "查看條款", `${origin}/terms`));
        }
    }
    continue;
}

// 若無群組資料，不進行後續處理
if (!groupAuth) continue;

const finalGid = effectiveGId;

// 讀取設定
let settings = {}; try { settings = JSON.parse(groupAuth.advanced_settings || '{}'); } catch(e){}
const disabledCmds = settings.disabled_commands || [];

// 檢查指令是否被禁用
if (text.startsWith('/bot') && disabledCmds.some(cmd => text.startsWith(cmd))) {
    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "🚫 此指令已被管理員禁用。"));
    continue;
}

// ★ /bot end (刪除群組)
if (text === '/bot end') { 
    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `⚠️ 確定要刪除 ${finalGid} 的所有資料嗎？\n請在 30 秒內輸入：確認刪除 ${finalGid}`)); 
    await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'awaiting_delete_confirm')").bind(uId, finalGid).run(); 
    continue; 
}

// 確認刪除流程
if (currentState === 'awaiting_delete_confirm' && userState.group_id === finalGid) {
    if (text === `確認刪除 ${finalGid}`) { 
        await env.DB.prepare("DELETE FROM group_auth WHERE group_id = ?").bind(finalGid).run(); 
        await env.DB.prepare("DELETE FROM tasks WHERE 群組 = ?").bind(finalGid).run(); 
        await env.DB.prepare("DELETE FROM line_user_state WHERE group_id = ?").bind(finalGid).run(); 
        ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "✅ 資料已刪除。")); 
    } else {
         // 輸入錯誤或其他指令，取消刪除狀態
         await env.DB.prepare("DELETE FROM line_user_state WHERE user_id = ?").bind(uId).run();
    }
    continue;
}

// 一般資訊指令
if (text === "/bot 學生" || text === "/bot student") { ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `📊 學生班級作業：\n${origin}/?id=${finalGid}`)); continue; } 
if (text === "/bot 後台" || text === "/bot manager") { ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `🔧 後台管理：\n${origin}/manager?id=${finalGid}`)); continue; } 
if (text === "/bot ID") { ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `Group ID:\n${finalGid}`)); continue; } 
if (text === "作業網址" || text === "公佈欄") { ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, getNewWelcomeMessage(finalGid, origin))); continue; } 

// --- 作業訊息判讀邏輯 (核心) ---
if (!text.startsWith('/')) {
    let subConfig = null; try { subConfig = JSON.parse(groupAuth.科目設定 || '{}'); } catch(e){}
    let periods = settings.periods || {};

    // 1. 嘗試規則判讀 (Regex)
    const ruleResult = parseTask(text, subConfig, periods); 
    
    if (ruleResult) {
        // 規則判讀成功，直接寫入
        let status = (settings.approval_mode === 'auto') ? '已發佈' : '待審核';
        
        // 自動審核：檢查髒話
        if (status === '已發佈' && DIRTY_WORDS.some(w => text.includes(w))) {
            status = '待審核';
        }

        await env.DB.prepare(`INSERT INTO tasks (群組, 建立時間, 截止日期, due_time, 科目, 內容, 來源, 狀態, 類別, is_reliable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`)
            .bind(finalGid, Date.now(), ruleResult.dStr, ruleResult.tStr, ruleResult.s, ruleResult.c, "LINE", status, ruleResult.cat).run(); 
        
        await triggerDataUpdate(env, finalGid);
    } 
    else {
        // 2. 規則判讀失敗，呼叫 AI
        if (settings.ai_enabled) {
            const aiAnalysis = await analyzeMessageSmart(text, env);
            
            if (aiAnalysis.type === 'AI') {
                // AI 判讀成功
                let status = '待審核'; // AI 判讀預設待審核，除非信心度極高(此處簡化為待審核)
                
                // 拆分任務 (AI 可能回傳多個)
                let tasks = aiAnalysis.split_tasks && aiAnalysis.split_tasks.length > 0 ? aiAnalysis.split_tasks : [aiAnalysis.content || text];
                
                const stmt = env.DB.prepare(`INSERT INTO tasks (群組, 建立時間, 截止日期, 科目, 內容, 來源, 狀態, 類別, is_reliable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
                
                // 批次寫入
                const batch = tasks.map(c => {
                    // 嘗試對每個子任務做簡單的時間解析
                    // (AI 有時只給內容沒給時間，這裡可選)
                    return stmt.bind(finalGid, Date.now(), "", aiAnalysis.subject || '未分類', c, "LINE", status, "作業", 0);
                });
                
                await env.DB.batch(batch);
                await triggerDataUpdate(env, finalGid);
            }
        }
    }
}

} catch (err) {
console.error("Webhook Error:", err);
}
}
return new Response("ok");
}

// --- END OF PART 6 ---

// --- START OF PART 7 (FIXED) ---

// ====================================================================
// ★ 輔助函式區 (Helpers)
// ====================================================================

/**
 * 使用 AI 分析訊息內容
 */
async function analyzeMessageSmart(text, env) {
    if (!text || text.length < 2 || text.length > 800) return { type: 'IGNORE' };
    
    let config = await getAIUsageConfig(env);
    if (!config.enabled || config.used_today >= config.daily_limit) {
        return { type: 'MANUAL', reason: 'LIMIT_REACHED' };
    }

    try {
        const prompt = `分析此訊息是否為作業/考試/攜帶物品通知。\n訊息:"${text}"\n若不是，回傳 {"is_task":false}。\n若是，回傳 {"is_task":true, "subject":"科目", "summary":"內容", "split_tasks":["任務1","任務2"]}\n請只回傳純 JSON 格式，不要包含 Markdown 標記。`;
        
        const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', { messages: [{ role: "user", content: prompt }] });
        
        let rawText = "";
        if (response && response.response) rawText = response.response;
        else if (typeof response === 'string') rawText = response;
        else rawText = JSON.stringify(response);

        let res = { is_task: false };
        const match = rawText.match(/\{[\s\S]*\}/);
        if (match) {
            try { res = JSON.parse(match[0]); } catch(e) { console.error("AI JSON Parse Fail", rawText); }
        }
        
        config.used_today += 1;
        await updateAIConfig(env, config);

        if (res.is_task === false) return { type: 'IGNORE' };
        
        return {
            type: 'AI',
            subject: res.subject || '未分類',
            content: res.summary || text,
            split_tasks: res.split_tasks || [res.summary || text]
        };

    } catch (e) {
        return { type: 'MANUAL', reason: 'AI_ERROR' };
    }
}

async function getSystemConfig(env) {
    try {
        const res = await env.DB.prepare("SELECT value FROM system_settings WHERE key = 'system_config'").first();
        if (res && res.value) return JSON.parse(res.value);
    } catch(e) {}
    return {
        maintenance: {
            frontend: { enabled: false, type: "off", message: "", end: "" },
            backend: { enabled: false, type: "off", message: "", end: "" }
        }
    };
}

async function getAIUsageConfig(env) {
  let r = await env.DB.prepare("SELECT value FROM system_settings WHERE key = 'ai_config'").first();
  let c = r ? JSON.parse(r.value) : { enabled: true, daily_limit: 50, used_today: 0, last_reset: 0 };
  const now = Date.now();
  if (now - c.last_reset > 86400000) { 
      c.used_today = 0; 
      c.last_reset = now; 
      await updateAIConfig(env, c); 
  }
  return c;
}

async function updateAIConfig(env, c) {
  await env.DB.prepare("INSERT INTO system_settings (key, value, updated_at) VALUES ('ai_config', ?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at").bind(JSON.stringify(c), Date.now()).run();
}

/**
 * ★★★ 觸發資料更新 (補回) ★★★
 * 用於通知前端 Polling 機制有新資料
 */
async function triggerDataUpdate(env, groupId) {
    try {
        await env.DB.prepare("UPDATE group_auth SET last_data_update = ? WHERE group_id = ?").bind(Date.now(), groupId).run();
    } catch(e) { console.error("triggerDataUpdate Error", e); }
}

function parseTask(text, subjectConfig, periods) { 
    let targetDate = null; 
    let content = text; 
    const today = new Date(); today.setHours(0, 0, 0, 0); 
    function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }

    if (text.includes("下禮拜") || text.includes("下週")) { targetDate = addDays(today, 7); content = content.replace(/下(禮拜|週)/, ""); } 
    else if (text.includes("明天")) { targetDate = addDays(today, 1); content = content.replace("明天", ""); } 
    else if (text.includes("後天")) { targetDate = addDays(today, 2); content = content.replace("後天", ""); } 
    else if (text.match(/下(週|禮拜|星期)([一二三四五六日])/)) { 
        const match = text.match(/下(週|禮拜|星期)([一二三四五六日])/); 
        const map = { "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "日": 0 }; 
        const targetDay = map[match[2]]; 
        const currentDay = today.getDay(); 
        let daysToAdd = (7 - currentDay) + targetDay; 
        if (targetDay === 0) daysToAdd += 7; 
        targetDate = addDays(today, daysToAdd); 
        content = content.replace(match[0], ""); 
    } else {
        const m = text.match(/(\d{1,2})[./-](\d{1,2})/);
        if (m) { targetDate = new Date(today.getFullYear(), parseInt(m[1])-1, parseInt(m[2])); content = content.replace(m[0], ""); }
    }
    
    if (!targetDate) return null; 

    // 時間與節次解析
    const timeRes = parseTimeFromText(content, periods);
    if(timeRes) {
        content = content.replace(/第[一二三四五六七八\d]節(下課)?/g, "").replace(/\d{1,2}[:：]\d{1,2}/g, "");
    }

    content = content.replace(/要交|要考|截止|作業|要帶|記得|繳交/g, "").trim(); 
    let cat = text.includes("考") ? "考試" : (text.includes("帶") ? "攜帶" : "作業");
    
    let sub = "其他"; 
    const subs = subjectConfig || { "國語": ["國文", "國語"], "英文": ["英文"], "數學": ["數學"], "自然": ["自然", "生物", "理化"], "社會": ["社會", "歷史", "地理", "公民"] }; 
    for (let key in subs) { 
        const keywords = Array.isArray(subs[key]) ? subs[key] : subs[key].split(',');
        if (keywords.some(k => text.includes(k.trim()))) { sub = key; break; } 
    } 
    
    const dStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth()+1).padStart(2,'0')}-${String(targetDate.getDate()).padStart(2,'0')}`; 
    return { dStr, tStr: timeRes, s: sub, c: content, cat }; 
}

function parseTimeFromText(text, periods = {}) {
    const numMap = {'一':1, '二':2, '三':3, '四':4, '五':5, '六':6, '七':7, '八':8, '1':1, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8};
    const periodMatch = text.match(/第([一二三四五六七八\d])節(下課)?/);
    if (periodMatch) {
        const num = numMap[periodMatch[1]];
        const isBreak = !!periodMatch[2];
        if (periods[num]) return isBreak ? periods[num].end : periods[num].start;
    }
    const timeMatch = text.match(/(\d{1,2})[:：](\d{1,2})/);
    if (timeMatch) return `${String(parseInt(timeMatch[1])).padStart(2,'0')}:${String(parseInt(timeMatch[2])).padStart(2,'0')}`;
    return null;
}

async function sha256(message) { const msgBuffer = new TextEncoder().encode(message); const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer); return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join(''); }
async function replyLineMessage(token, replyToken, text) { await fetch('https://api.line.me/v2/bot/message/reply', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ replyToken: replyToken, messages: [{ type: 'text', text: text }] }) }); }
async function replyLineMessageWithButton(token, replyToken, text, buttonText, linkUrl) { const message = { type: "template", altText: text.split('\n')[0], template: { type: "buttons", text: text, actions: [{ type: "uri", label: buttonText, uri: linkUrl }] } }; await fetch('https://api.line.me/v2/bot/message/reply', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ replyToken: replyToken, messages: [message] }) }); }
async function pushLineMessage(token, userId, text) { await fetch('https://api.line.me/v2/bot/message/push', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ to: userId, messages: [{ type: 'text', text: text }] }) }); }
async function writeLog(env, groupId, actor, action, details, request) { try { const ip = request ? (request.headers.get('CF-Connecting-IP') || 'Unknown') : 'System'; const ua = request ? (request.headers.get('User-Agent') || 'Unknown') : 'System'; await env.DB.prepare("INSERT INTO logs (group_id, actor, action, details, ip_address, user_agent, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(groupId, actor, action, details, ip, ua, Date.now()).run(); } catch(e) { console.error("Log Error:", e); } }
async function sendDiscordAlert(title, message) { try { await fetch(DISCORD_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: `🚨 **${title}**\n${message}` }) }); } catch(e) { console.error("Discord webhook error:", e); } }
function genRescueCode() { return Math.floor(100000 + Math.random() * 900000).toString(); }
function genRestoreCode() { return Math.random().toString(36).substring(2, 12); }

// --- END OF PART 7 (FIXED) ---

// --- START OF PART 8 ---

/**
 * 檢查群組內是否所有成員都已同意條款
 * 注意：這需要 LINE Messaging API 的權限，且只能取得有加好友的成員 ID 或群組成員計數
 * 此處實作邏輯：比對群組成員清單與資料庫中的同意紀錄
 */
async function checkAllAgreed(env, gId) {
    try {
        let allMemberIds = [];
        
        // 嘗試取得群組成員 ID (需 LINE 官方帳號有權限)
        // 註：標準 Messaging API 不提供完整成員列表，通常只能取得 active users 或透過 webhook 收集
        // 這裡假設是透過 getMemberIds (需付費或特殊權限) 或是簡化為：若同意人數 >= 群組人數 (概略檢查)
        // 為了相容性，這裡使用計數檢查：
        
        const countRes = await fetch(`https://api.line.me/v2/bot/group/${gId}/members/count`, { 
            headers: { 'Authorization': `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}` } 
        });
        
        let memberCount = 0;
        if (countRes.ok) { 
            const data = await countRes.json(); 
            memberCount = data.count; 
        } else {
            // 若失敗 (可能是在 Room 而非 Group)，嘗試 Room API
            const roomRes = await fetch(`https://api.line.me/v2/bot/room/${gId}/members/count`, { 
                headers: { 'Authorization': `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}` } 
            });
            if (roomRes.ok) { 
                const data = await roomRes.json(); 
                memberCount = data.count; 
            } else {
                // 無法取得人數，預設通過 (避免卡死)，或視為失敗
                // 這裡為了使用者體驗，若無法取得人數則預設通過 (但在嚴格模式下應 return false)
                return true; 
            }
        }

        // 取得資料庫中該群組已同意的人數
        const { count } = await env.DB.prepare("SELECT COUNT(*) as count FROM group_agreements WHERE group_id = ?").bind(gId).first();
        
        // 寬容判定：只要同意人數 >= LINE 回傳的成員數 - 1 (排除機器人自己)
        // 實際上 LINE 的 count 包含機器人，所以 -1 是合理的
        // 若同意人數 >= 成員數 - 1，則視為全部同意
        return count >= (memberCount - 1);

    } catch (e) { 
        console.error("checkAllAgreed failed:", e); 
        return false; // 發生錯誤時保守處理
    }
}

// 生成新群組的歡迎訊息
function getNewWelcomeMessage(gId, origin) {
    return `各位使用者您好！感謝您使用 LINE 資料整合助理。
ID: ${gId}

📊 學生作業：
${origin}/?id=${gId}
🔧 後台管理：
${origin}/manager?id=${gId}
(請盡快設定後台)

若需要回報問題或尋求幫助，可透過以下方式：
LINE: ${CUSTOM_LINE_CONTACT}
Discord: ${LINK_DISCORD}
Mail: ${MAIL_CONTACT}

請尊重原作者的智慧財產權。本產品受 CC BY-NC-ND 4.0 授權條款與所有附加政策嚴格保護。`;
}

// 生成既有群組的歡迎訊息 (重啟/解鎖時)
function getExistingWelcomeMessage(gId, origin) {
    return `歡迎回來！感謝您繼續使用 LINE 資料整合助理。
ID: ${gId}

📊 學生作業：
${origin}/?id=${gId}
🔧 後台管理：
${origin}/manager?id=${gId}
(請盡快設定後台)

若需要回報問題或尋求幫助，可透過以下方式：
LINE: ${CUSTOM_LINE_CONTACT}
Discord: ${LINK_DISCORD}
Mail: ${MAIL_CONTACT}

請尊重原作者的智慧財產權。本產品受 CC BY-NC-ND 4.0 授權條款與所有附加政策嚴格保護。`;
}

// ==========================================
// ★ 前端頁面渲染函式
// ==========================================

// 1. 維護頁面
function renderMaintenancePage(maintConfig) { 
    const typeName = MAINT_MODES[maintConfig.type] || "系統維護中";
    const detail = MAINT_MESSAGES_DETAIL[maintConfig.type] || {title:typeName, desc:maintConfig.message||"系統正在進行必要維護，請稍後再試。"};
    
    return `<!DOCTYPE html><html lang="zh-TW" class="dark"><head><title>${typeName}</title>
    ${COMMON_UI_SCRIPT}
    </head><body class="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full text-center space-y-8 bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-700">
        <div class="text-7xl text-yellow-500 animate-pulse"><i class="fas fa-tools"></i></div>
        <div>
            <h1 class="text-3xl font-bold text-white mb-2">${detail.title}</h1>
            <p class="text-gray-400 text-lg">${maintConfig.message || detail.desc}</p>
        </div>
        ${maintConfig.end ? `<div class="bg-gray-700/50 p-4 rounded-xl"><p class="text-sm text-gray-400">預計結束時間</p><p class="text-xl font-mono text-green-400 font-bold mt-1">${new Date(maintConfig.end).toLocaleString()}</p></div>` : ''}
    </div></body></html>`; 
}

// 2. 服務條款頁面
function renderTermsHTML(origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><title>服務條款</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-900 text-white min-h-screen p-4 md:p-8">
    <div class="max-w-3xl mx-auto bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-gray-700">
        ${TERMS_HTML_CONTENT}
        <div class="mt-8 text-center text-sm text-gray-400">
            <p>版權所有 © 2025 [Ray20123315/Ray chen]。保留所有權利。<br/>COPYRIGHT © 2025 [Ray20123315/Ray chen]. ALL RIGHTS RESERVED.</p>
        </div>
    </div>
    </body></html>`;
}

// 3. EULA 同意頁面
function renderEULAHTML(redirectUrl, origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><title>服務條款同意</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4"><div class="max-w-lg w-full bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
        ${EULA_TEXT}
        <div class="mt-8 flex gap-4">
            <button onclick="disagree()" class="flex-1 bg-red-700 hover:bg-red-600 py-3 rounded font-bold transition">不同意</button>
            <button onclick="agree()" class="flex-1 bg-green-600 hover:bg-green-500 py-3 rounded font-bold transition">我同意</button>
        </div>
    </div><script>
    async function agree() {
        const btn = document.querySelector('button:last-child');
        btn.disabled = true; btn.innerText = '處理中...';
        try {
            const res = await fetch('${origin}', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ action: 'agree_eula' }) });
            if(res.ok) {
                const redirect = decodeURIComponent('${redirectUrl || origin}');
                window.location.href = redirect.startsWith('http') ? redirect : '${origin}';
            } else { alert('系統錯誤，請稍後再試'); btn.disabled = false; btn.innerText = '我同意'; }
        } catch(e) { alert('網路錯誤'); btn.disabled = false; btn.innerText = '我同意'; }
    }
    function disagree() { document.body.innerHTML = '<div class="text-center p-8"><h1 class="text-2xl font-bold">您必須同意條款才能使用本服務。</h1><p class="mt-4 text-gray-400">請關閉此頁面。</p></div>'; }
    </script></body></html>`;
}

// 4. 首頁 (Landing Page)
function renderHomePage(origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ray 作業機器人</title><script src="https://cdn.tailwindcss.com"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></head><body class="bg-gradient-to-b from-blue-900 to-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6"><div class="max-w-2xl text-center space-y-6"><div class="text-6xl mb-4">🤖</div><h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Ray 作業機器人</h1><p class="text-gray-300 text-lg">協助班級管理作業、考試與攜帶物品的智慧小幫手。</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"><a href="${LINK_LINE_HOST}" target="_blank" class="bg-[#181717] hover:bg-[#2d2d2d] text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition transform hover:scale-105"><i class="fab fa-github text-2xl"></i> 開始架設自己的機器人</a><a href="${LINK_DISCORD}" target="_blank" class="bg-[#5865F2] hover:bg-[#4752c4] text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition transform hover:scale-105"><i class="fab fa-discord text-2xl"></i> 加入 Discord 支援</a></div><div class="mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"><h2 class="text-xl font-bold mb-4">🚀 如何開始？</h2><ol class="text-left list-decimal list-inside space-y-2 text-gray-300"><li>加入 自己申請的LINE官方帳號 好友。</li><li>將 自己申請的LINE官方帳號 邀請至班級群組。</li><li>輸入 <code class="bg-black/30 px-2 py-1 rounded">/bot start</code> 開始設定。</li><li>(群組全員需同意法律條款，並設定不同意時的踢人策略)</li><li>輸入 <code class="bg-black/30 px-2 py-1 rounded">/bot newID</code> 建立專屬班級 ID。</li></ol></div><footer class="mt-10 text-xs text-gray-500">&copy; 2025 Ray2026. All Rights Reserved.</footer></div></body></html>`;
}

// 5. 客服與支援頁面
function renderSupportHTML(origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ray 機器人客服中心</title>
    ${COMMON_UI_SCRIPT}
    </head><body class="bg-gray-900 text-white min-h-screen flex items-center justify-center p-6"><div class="max-w-md w-full space-y-8"><div class="text-center"><h1 class="text-3xl font-bold text-blue-400 mb-2">🛠️ 客服與回報中心</h1><p class="text-gray-400">請選擇您的需求，我們將盡快為您服務。</p></div><div class="space-y-4">
    <a href="${LINK_LINE_HOST}" target="_blank" class="block w-full bg-green-600 hover:bg-green-500 text-white py-4 px-6 rounded-xl font-bold flex items-center justify-between transition transform hover:scale-105"><span><i class="fab fa-github mr-2"></i> 自行架設教學 (GitHub)</span><i class="fas fa-chevron-right"></i></a>
    <button onclick="openForm('一般問題回報')" class="block w-full bg-green-600 hover:bg-green-500 text-white py-4 px-6 rounded-xl font-bold flex items-center justify-between transition transform hover:scale-105"><span><i class="fas fa-envelope mr-2"></i> 一般問題回報</span><i class="fas fa-chevron-right"></i></button>
    <a href="${LINK_DISCORD}" target="_blank" class="block w-full bg-red-600 hover:bg-red-500 text-white py-4 px-6 rounded-xl font-bold flex items-center justify-between transition transform hover:scale-105"><span><i class="fab fa-discord mr-2"></i> 緊急客服 (Discord)</span><i class="fas fa-chevron-right"></i></a>
    <button onclick="openForm('緊急問題回報')" class="block w-full bg-red-600 hover:bg-red-500 text-white py-4 px-6 rounded-xl font-bold flex items-center justify-between transition transform hover:scale-105"><span><i class="fas fa-exclamation-triangle mr-2"></i> 緊急問題回報</span><i class="fas fa-chevron-right"></i></button>
    <a href="${origin}/manager" target="_blank" class="block w-full bg-red-600 hover:bg-red-500 text-white py-4 px-6 rounded-xl font-bold flex items-center justify-between transition transform hover:scale-105"><span><i class="fas fa-key mr-2"></i> 忘記密碼 (請至後台使用救援碼)</span><i class="fas fa-chevron-right"></i></a>
    </div><div class="text-center text-sm text-gray-500 mt-8"><a href="/" class="hover:text-white underline">回首頁</a></div>
    <div id="msg-modal" class="fixed inset-0 bg-black/80 hidden items-center justify-center p-4"><div class="bg-gray-800 rounded-xl p-6 w-full max-w-sm"><h3 id="msg-title" class="text-xl font-bold mb-4"></h3><textarea id="msg-content" class="w-full h-32 bg-gray-700 text-white rounded p-2 mb-4" placeholder="請詳細描述您的問題..."></textarea><div class="flex gap-2"><button onclick="closeForm()" class="flex-1 bg-gray-600 py-2 rounded">取消</button><button onclick="sendMsg()" class="flex-1 bg-blue-600 py-2 rounded font-bold">送出</button></div></div></div>
    <script>
    let currentType = '';
    function openForm(type) { currentType = type; document.getElementById('msg-title').innerText = type; document.getElementById('msg-modal').classList.remove('hidden'); document.getElementById('msg-modal').classList.add('flex'); }
    function closeForm() { document.getElementById('msg-modal').classList.add('hidden'); document.getElementById('msg-modal').classList.remove('flex'); }
    async function sendMsg() { const msg = document.getElementById('msg-content').value.trim(); if(!msg) return alert('請輸入內容'); const btn = document.querySelector('#msg-modal button:last-child'); const originalText = btn.innerText; btn.innerText = '傳送中...'; btn.disabled = true; try { const res = await fetch(window.location.href, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ action: 'send_support_msg', type: currentType, message: msg }) }); const d = await res.json(); if(d.status === 'success') { successAlert('回報成功！我們會盡快處理。'); closeForm(); document.getElementById('msg-content').value=''; } else { errorAlert('發送失敗，請稍後再試。'); } } catch(e) { errorAlert('錯誤'); } btn.innerText = originalText; btn.disabled = false; }
    </script></body></html>`;
}

// 6. Super Admin 後台
function renderSuperAdminHTML(origin) {
    return `<!DOCTYPE html><html lang="zh-TW" class="dark"><head><meta charset="UTF-8"><title>Super Admin</title>
    ${COMMON_UI_SCRIPT}
    </head>
    <body class="bg-gray-900 text-white min-h-screen p-4 md:p-8">
        <div class="max-w-5xl mx-auto space-y-8">
            <h1 class="text-3xl font-bold text-blue-400 text-center tracking-wider">⚡ Super Admin v${CURRENT_VERSION}</h1>
            
            <div id="login-box" class="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md mx-auto border border-gray-700">
                <div class="mb-6 text-center"><i class="fas fa-user-shield text-5xl text-gray-500"></i></div>
                <input type="password" id="spwd" placeholder="請輸入超級密碼" class="bg-gray-700 text-white border border-gray-600 p-4 rounded-xl w-full mb-6 focus:ring-2 focus:ring-blue-500 outline-none text-center text-lg placeholder-gray-500">
                <button id="btn-login" class="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-900/50">驗證身分</button>
            </div>
            
            <div id="control-panel" class="hidden space-y-8 animate-[fadeIn_0.5s_ease-out]">
                <!-- 分頁導航 -->
                <div class="flex justify-center gap-4 bg-gray-800/50 p-2 rounded-xl backdrop-blur max-w-lg mx-auto">
                    <button onclick="switchTab('maint')" class="tab-btn flex-1 py-2 rounded-lg font-bold transition text-gray-400 hover:text-white" id="btn-tab-maint">🛡️ 系統維護</button>
                    <button onclick="switchTab('groups')" class="tab-btn flex-1 py-2 rounded-lg font-bold transition text-gray-400 hover:text-white" id="btn-tab-groups">👥 群組管理</button>
                    <button onclick="switchTab('logs')" class="tab-btn flex-1 py-2 rounded-lg font-bold transition text-gray-400 hover:text-white" id="btn-tab-logs">📜 系統日誌</button>
                </div>

                <!-- 分頁 1: 維護設定 -->
                <div id="tab-maint" class="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl">
                    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2"><i class="fas fa-traffic-light text-yellow-500"></i> 全域維護模式設定</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="bg-gray-900 p-6 rounded-xl border border-blue-900/50 relative overflow-hidden group">
                            <div class="absolute top-0 right-0 bg-blue-600 text-xs px-2 py-1 rounded-bl-lg font-bold">FRONTEND</div>
                            <h3 class="text-xl font-bold text-blue-400 mb-4"><i class="fas fa-desktop"></i> 前端網頁</h3>
                            <div class="space-y-4">
                                <label class="flex items-center gap-3 cursor-pointer bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-blue-500 transition">
                                    <input type="checkbox" id="fe-enabled" class="w-5 h-5 text-blue-600 rounded">
                                    <span class="font-bold">啟用維護攔截</span>
                                </label>
                                <div><label class="text-xs text-gray-500 font-bold mb-1 block">維護類型</label><select id="fe-type" class="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-sm"><option value="data_update">資料更新中</option><option value="data_maint">資料維護中</option><option value="sys_update">系統升級中</option><option value="sys_maint">系統維護中</option></select></div>
                                <div><label class="text-xs text-gray-500 font-bold mb-1 block">顯示訊息</label><input type="text" id="fe-msg" class="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-sm" placeholder="自訂維護公告..."></div>
                                <div><label class="text-xs text-gray-500 font-bold mb-1 block">預計結束時間</label><input type="datetime-local" id="fe-end" class="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-sm text-gray-300"></div>
                            </div>
                        </div>
                        <div class="bg-gray-900 p-6 rounded-xl border border-purple-900/50 relative overflow-hidden group">
                            <div class="absolute top-0 right-0 bg-purple-600 text-xs px-2 py-1 rounded-bl-lg font-bold">BACKEND</div>
                            <h3 class="text-xl font-bold text-purple-400 mb-4"><i class="fas fa-server"></i> 後端 API</h3>
                            <div class="space-y-4">
                                <label class="flex items-center gap-3 cursor-pointer bg-gray-800 p-3 rounded-lg border border-gray-700 hover:border-purple-500 transition">
                                    <input type="checkbox" id="be-enabled" class="w-5 h-5 text-purple-600 rounded">
                                    <span class="font-bold">啟用 API 阻擋</span>
                                </label>
                                <div><label class="text-xs text-gray-500 font-bold mb-1 block">維護類型</label><select id="be-type" class="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-sm"><option value="data_update">資料更新中</option><option value="data_maint">資料維護中</option><option value="sys_update">系統升級中</option><option value="sys_maint">系統維護中</option></select></div>
                                <div><label class="text-xs text-gray-500 font-bold mb-1 block">錯誤訊息</label><input type="text" id="be-msg" class="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-sm" placeholder="API 回傳錯誤訊息..."></div>
                                <div><label class="text-xs text-gray-500 font-bold mb-1 block">預計結束時間</label><input type="datetime-local" id="be-end" class="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-sm text-gray-300"></div>
                            </div>
                        </div>
                    </div>
                    <button onclick="saveMaint()" class="w-full mt-8 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-900/50 transition transform hover:scale-[1.01]">
                        <i class="fas fa-save mr-2"></i> 儲存並套用設定
                    </button>
                </div>

                <!-- 分頁 2: 群組管理 (保持原樣，略微簡化 HTML 結構以節省篇幅) -->
                <div id="tab-groups" class="hidden space-y-6">
                    <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <h2 class="text-xl font-bold mb-4">萬能搜尋</h2>
                        <div class="flex gap-2"><input type="text" id="skey" placeholder="輸入 ID / 名稱 / 復原碼" class="bg-gray-700 p-3 rounded-lg flex-1 text-white"><button onclick="search()" class="bg-green-600 hover:bg-green-500 text-white px-6 rounded-lg font-bold">查詢</button></div>
                    </div>
                    <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <div class="flex justify-between items-center mb-4"><h2 class="text-xl font-bold">群組列表</h2><button onclick="loadData()" class="text-sm bg-gray-700 px-3 py-1 rounded">重整</button></div>
                        <div id="group-list" class="space-y-3"></div>
                    </div>
                </div>

                <!-- 分頁 3: 系統日誌 -->
                <div id="tab-logs" class="hidden space-y-6">
                    <div class="bg-gray-800 p-6 rounded-xl border border-gray-700">
                         <div class="flex justify-between items-center mb-4"><h2 class="text-xl font-bold">系統日誌 (最近 100 筆)</h2><button onclick="loadLogs()" class="text-sm bg-gray-700 px-3 py-1 rounded">重整</button></div>
                         <div id="log-list" class="space-y-2 text-sm font-mono max-h-[600px] overflow-y-auto"></div>
                    </div>
                </div>
            </div>
        </div>
        <script>
            let currentConfig = {};
            let groups = [];
            
            document.addEventListener('DOMContentLoaded', () => {
                document.getElementById('btn-login').addEventListener('click', login);
            });

            async function apiRequest(payload) {
                const p = document.getElementById('spwd').value;
                if(!p && payload.action !== 'super_admin_login') return { status: 'fail', msg: '請輸入密碼' };
                payload.password = p;
                try {
                    const res = await fetch(location.href, {
                        method: 'POST', 
                        headers: {'Content-Type':'application/json'}, 
                        body: JSON.stringify(payload)
                    });
                    if (res.status !== 200) throw new Error("HTTP Error: " + res.status);
                    return await res.json();
                } catch (e) {
                    return { status: 'error', msg: e.message };
                }
            }

            async function login() {
                const d = await apiRequest({action:'super_admin_login'});
                if(d.status === 'success') {
                    document.getElementById('login-box').classList.add('hidden');
                    document.getElementById('control-panel').classList.remove('hidden');
                    await loadData();
                    switchTab('maint');
                } else {
                    errorAlert(d.msg || '登入失敗');
                }
            }

            async function loadData() {
                const d = await apiRequest({action:'super_admin_get_data'});
                if(d.status === 'success') {
                    currentConfig = d.config || {};
                    groups = d.groups || [];
                    loadMaintUI(); // 修復：確保這裡會根據後端資料更新 UI
                    renderGroups();
                }
            }

            async function loadLogs() {
                const d = await apiRequest({action:'super_admin_get_logs'});
                if(d.status === 'success') {
                    const div = document.getElementById('log-list'); div.innerHTML = '';
                    d.logs.forEach(l => {
                        div.innerHTML += \`<div class="p-2 bg-gray-900 rounded border border-gray-700 flex justify-between gap-2">
                            <span class="text-blue-400">\${new Date(l.timestamp).toLocaleString()}</span>
                            <span class="text-green-400">\${l.actor}</span>
                            <span class="text-yellow-400">\${l.action}</span>
                            <span class="text-gray-400 truncate">\${l.details}</span>
                        </div>\`;
                    });
                }
            }

            function loadMaintUI() {
                // 修正：正確讀取 config 物件結構
                const fe = currentConfig.maintenance?.frontend || {};
                const be = currentConfig.maintenance?.backend || {};
                
                document.getElementById('fe-enabled').checked = fe.enabled === true;
                document.getElementById('fe-type').value = fe.type || 'sys_maint';
                document.getElementById('fe-msg').value = fe.message || '';
                document.getElementById('fe-end').value = fe.end || '';
                
                document.getElementById('be-enabled').checked = be.enabled === true;
                document.getElementById('be-type').value = be.type || 'sys_maint';
                document.getElementById('be-msg').value = be.message || '';
                document.getElementById('be-end').value = be.end || '';
            }

            function renderGroups(filtered) {
                const div = document.getElementById('group-list'); div.innerHTML='';
                const data = filtered || groups;
                if(data.length === 0) { div.innerHTML = '<p class="text-gray-500">無資料</p>'; return; }
                data.forEach(g => {
                    div.innerHTML += \`<div class="p-4 bg-gray-700/50 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4 border border-gray-700">
                        <div class="flex-1"><div class="font-bold text-lg">\${g.name} <span class="text-xs ml-2 px-1 rounded border \${g.is_bound?'text-green-400 border-green-400':'text-red-400 border-red-400'}">\${g.is_bound?'已綁定':'未綁定'}</span> <span class="text-xs px-1 rounded border \${g.has_pwd?'text-blue-400 border-blue-400':'text-yellow-400 border-yellow-400'}">\${g.has_pwd?'有密碼':'無密碼'}</span></div>
                        <div class="text-xs text-gray-400 font-mono mt-1">\${g.id}</div>
                        <div class="text-sm mt-1 flex gap-4"><span>🔑 復原碼: <span class="text-yellow-400 select-all">\${g.restore_code}</span></span><span>🆘 救援碼: <span class="text-yellow-400 select-all">\${g.rescue_code}</span></span></div></div>
                        <div class="flex gap-2 flex-wrap justify-end">
                            <button onclick="regenRestore('\${g.id}')" class="bg-yellow-700 px-3 py-1 rounded text-xs hover:bg-yellow-600 transition">重置復原碼</button>
                            <button onclick="resetGroupData('\${g.id}')" class="bg-orange-800 px-3 py-1 rounded text-xs hover:bg-orange-700 transition">Factory Reset</button>
                            <button onclick="delGroup('\${g.id}')" class="bg-red-900 px-3 py-1 rounded text-xs hover:bg-red-700 transition">刪除</button>
                        </div>
                    </div>\`;
                });
            }

            async function saveMaint() {
                // 修正：確保送出的結構與 loadMaintUI 讀取的結構一致
                const newMaint = {
                    frontend: { 
                        enabled: document.getElementById('fe-enabled').checked, 
                        type: document.getElementById('fe-type').value, 
                        message: document.getElementById('fe-msg').value, 
                        end: document.getElementById('fe-end').value 
                    },
                    backend: { 
                        enabled: document.getElementById('be-enabled').checked, 
                        type: document.getElementById('be-type').value, 
                        message: document.getElementById('be-msg').value, 
                        end: document.getElementById('be-end').value 
                    }
                };
                const d = await apiRequest({ action:'super_admin_set_maintenance', maintenance: newMaint });
                if(d.status === 'success') {
                    successAlert('維護設定已更新！');
                    // 更新本地 config 避免需重整才能看到變更
                    currentConfig.maintenance = newMaint;
                }
                else errorAlert(d.msg || '更新失敗');
            }

            function switchTab(id) {
                document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('bg-blue-600', 'text-white', 'shadow-lg'); b.classList.add('text-gray-400'); });
                document.querySelectorAll('#control-panel > div[id^="tab-"]').forEach(d => d.classList.add('hidden'));
                document.getElementById('tab-'+id).classList.remove('hidden');
                document.getElementById('btn-tab-'+id).classList.add('bg-blue-600', 'text-white', 'shadow-lg');
                document.getElementById('btn-tab-'+id).classList.remove('text-gray-400');
                if(id === 'logs') loadLogs();
            }

            window.search = function() { const k = document.getElementById('skey').value.toLowerCase().trim(); renderGroups(groups.filter(g=>g.id.includes(k) || g.name.toLowerCase().includes(k) || g.restore_code === k)); }
            window.delGroup = async function(id) { if(await myConfirm('確定刪除此群組？(無法復原)')) { const d = await apiRequest({action:'super_admin_delete_group', targetGroupId:id}); if(d.status === 'success') { await successAlert('已刪除'); loadData(); } else errorAlert(d.msg); } }
            window.resetGroupData = async function(id) { if(await myConfirm('確定重置此群組資料？(只保留ID與綁定，清除所有作業與設定)')) { const d = await apiRequest({action:'super_admin_reset_group_data', targetGroupId:id}); if(d.status === 'success') { await successAlert('已重置'); loadData(); } else errorAlert(d.msg); } }
            window.regenRestore = async function(id) { if(await myConfirm('確定重置復原碼？')) { const d = await apiRequest({action:'super_admin_regen_restore', targetGroupId:id}); if(d.status === 'success') { await successAlert('新碼: ' + d.newRestoreCode); loadData(); } else errorAlert(d.msg); } }
        </script>
    </body></html>`;
}

// --- END OF PART 8 ---

// --- START OF PART 9 (SAFE RENDER FIX) ---

// 7. 學生作業頁面
function renderStudentHTML(origin) {
    // 1. 定義 CSS 樣式
    const css = 
    "<style>" +
        ".filter-btn { white-space: nowrap; padding: 0.5rem 1rem; border-radius: 9999px; background: #374151; color: #d1d5db; border: 1px solid #4b5563; transition: 0.2s; font-size: 0.875rem; cursor: pointer; }" +
        ".filter-btn.active { background: #2563eb; color: white; border-color: #2563eb; }" +
        ".month-scroll { -ms-overflow-style: none; scrollbar-width: none; }" +
        ".month-scroll::-webkit-scrollbar { display: none; }" +
        ".task-card { transition: transform 0.2s; border-left-width: 4px; }" +
        ".task-card:active { transform: scale(0.98); }" +
    "</style>";

    // 2. 定義客戶端 JavaScript (使用傳統字串拼接，避免 Worker 解析錯誤)
    const clientScript = 
    "const urlParams = new URLSearchParams(window.location.search);" +
    "const gId = urlParams.get('id');" +
    "const mentionParam = urlParams.get('mention');" +
    "document.getElementById('page-date').innerText = new Date().toLocaleDateString();" +
    
    "let allTasks = [], periods = {}, filters = { status: 'active', month: 'all', subject: 'all', mention: mentionParam || null };" +

    "function escapeHtml(text) {" +
        "if (!text) return '';" +
        "return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/'/g, '&#039;');" +
    "}" +

    "async function load() {" +
        "if(!gId) { document.body.innerHTML = '<div class=\"text-center mt-10 text-gray-500\">錯誤：網址缺少 ID 參數</div>'; return; }" +
        "if(typeof startPolling === 'function') startPolling(gId);" +
        "try {" +
            "const res = await fetch(window.location.href, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ action: 'get_tasks', groupId: gId }) });" +
            "if (res.status === 503) { document.body.innerHTML = '<div class=\"text-center p-10 text-white\"><h1 class=\"text-2xl\">系統維護中</h1></div>'; return; }" +
            "const data = await res.json();" +
            "if(data.error === 'TERMINATED') {" +
                "document.body.innerHTML = '<div class=\"flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6 text-center\"><h1 class=\"text-3xl font-bold mb-4 text-red-500\">服務已終止</h1></div>';" +
                "return;" +
            "}" +
            "if(data.error) { document.getElementById('error-msg').innerText = data.error; document.getElementById('error-msg').classList.remove('hidden'); document.getElementById('loading').classList.add('hidden'); return; }" +
            "document.getElementById('loading').classList.add('hidden');" +
            "document.getElementById('filters').classList.remove('hidden');" +
            "document.getElementById('page-title').innerText = '📋 ' + (data.groupName || '班級作業');" +
            "allTasks = data.tasks || [];" +
            "periods = data.periods || {};" +
            "initMonthFilter();" +
            "if(filters.mention) { document.getElementById('mention-alert').classList.remove('hidden'); document.getElementById('mention-name').innerText = filters.mention; }" +
            "render();" +
        "} catch(e) { document.getElementById('loading').innerHTML = 'Error'; }" +
    "}" +

    "function initMonthFilter() {" +
        "const months = new Set(allTasks.map(t => new Date(t.date).getMonth() + 1));" +
        "const list = document.getElementById('month-filter-list');" +
        "list.innerHTML = '<button onclick=\"setFilter(\\'month\\', \\'all\\')\" class=\"filter-btn active\" id=\"btn-month-all\">全部</button>';" +
        "Array.from(months).sort((a,b)=>a-b).forEach(m => {" +
            "list.innerHTML += '<button onclick=\"setFilter(\\'month\\', '+m+')\" class=\"filter-btn\" id=\"btn-month-'+m+'\">'+m+'月</button>';" +
        "});" +
    "}" +

    "window.setFilter = function(type, val) {" +
        "filters[type] = val;" +
        "if(type === 'status') {" +
            "document.getElementById('btn-status-active').className = val === 'active' ? 'px-6 py-1.5 rounded-full text-sm font-bold transition bg-blue-600 text-white' : 'px-6 py-1.5 rounded-full text-sm font-bold transition text-gray-400 hover:text-white';" +
            "document.getElementById('btn-status-history').className = val === 'history' ? 'px-6 py-1.5 rounded-full text-sm font-bold transition bg-gray-600 text-white' : 'px-6 py-1.5 rounded-full text-sm font-bold transition text-gray-400 hover:text-white';" +
        "}" +
        "if(type === 'month') {" +
            "document.querySelectorAll('#month-filter-list .filter-btn').forEach(b => b.classList.remove('active'));" +
            "document.getElementById('btn-month-' + val).classList.add('active');" +
        "}" +
        "render();" +
    "};" +
    
    "window.clearMention = function() { filters.mention = null; document.getElementById('mention-alert').classList.add('hidden'); render(); };" +

    "function render() {" +
        "const list = document.getElementById('content-area'); list.innerHTML = '';" +
        "const today = new Date(); today.setHours(0,0,0,0);" +
        "const filtered = allTasks.filter(t => {" +
            "const tDate = new Date(t.date);" +
            "if(filters.status === 'active' && tDate < today) return false;" +
            "if(filters.status === 'history' && tDate >= today) return false;" +
            "if(filters.month !== 'all' && (tDate.getMonth() + 1) !== filters.month) return false;" +
            "if(filters.subject !== 'all' && t.subject !== filters.subject) return false;" +
            "if(filters.mention && !t.content.includes('@' + filters.mention)) return false;" +
            "return true;" +
        "});" +
        "if(filtered.length === 0) { list.innerHTML = '<div class=\"text-center text-gray-500 py-12\">無資料</div>'; return; }" +
        
        "let lastDate = '';" +
        "filtered.forEach(t => {" +
            "if(t.date !== lastDate) { list.innerHTML += '<div class=\"text-lg font-bold text-blue-400 mt-6 mb-2 border-b border-gray-700 pb-1\">' + t.date + '</div>'; lastDate = t.date; }" +
            "let colorClass = 'border-blue-500';" +
            "if(t.category === '考試') colorClass = 'border-red-500';" +
            "else if(t.category === '攜帶') colorClass = 'border-yellow-500';" +
            
            "let timeBadge = '';" +
            "if(t.due_time) {" +
                "let label = t.due_time;" +
                "for(let k in periods) { if(periods[k].start === t.due_time) label = '第' + k + '節'; if(periods[k].end === t.due_time) label = '第' + k + '節下課'; }" +
                "timeBadge = '<span class=\"bg-gray-700 text-xs px-2 py-0.5 rounded ml-2 border border-gray-600\">' + label + '</span>';" +
            "}" +

            "let safeContent = escapeHtml(t.content);" +
            "const urlRegex = new RegExp('(https?:\\/\\/[^\\s]+)', 'g');" +
            "safeContent = safeContent.replace(urlRegex, '<a href=\"$1\" target=\"_blank\" class=\"text-blue-400 underline\">$1</a>');" +
            
            // 修正：onclick 參數轉義
            "const editContent = t.content.replace(/\\\\/g, '\\\\\\\\').replace(/'/g, \"\\\\'\").replace(/\"/g, '&quot;').replace(/\\n/g, '\\\\n');" +

            "list.innerHTML += " +
            "'<div class=\"bg-gray-800 p-4 rounded-xl shadow-md border-l-4 ' + colorClass + ' mb-2\">' +" +
                "'<div class=\"flex items-center mb-2\">' +" +
                    "'<span class=\"bg-gray-700 text-xs px-2 py-0.5 rounded mr-2\">' + t.category + '</span>' +" +
                    "'<span class=\"font-bold text-gray-200 mr-1\">' + t.subject + '</span>' +" +
                    "timeBadge +" +
                "'</div>' +" +
                "'<div class=\"text-gray-300 whitespace-pre-wrap\">' + safeContent + '</div>' +" +
                "'<div class=\"mt-2 text-right\">' +" +
                    "'<button onclick=\"openSuggestion(\\'' + t.id + '\\', \\'' + t.subject + '\\', \\'' + t.category + '\\', \\'' + editContent + '\\')\" class=\"text-xs text-gray-500 hover:text-white\">勘誤</button>' +" +
                "'</div>' +" +
            "'</div>';" +
        "});" +
    "}" +

    "window.openSubjectFilter = function() {" +
        "const subSet = new Set(allTasks.map(t => t.subject));" +
        "const options = [{text: '全部科目', value: 'all'}];" +
        "Array.from(subSet).sort().forEach(s => options.push({text: s, value: s}));" +
        "openMobileFilter('選擇科目', options, (val) => { filters.subject = val; document.getElementById('current-subject-label').innerText = val === 'all' ? '全部科目' : val; render(); });" +
    "};" +

    "window.openSuggestion = function(id, sub, cat, con) {" +
        "document.getElementById('sug-task-id').value = id;" +
        "document.getElementById('sug-subject').value = sub;" +
        "document.getElementById('sug-category').value = cat;" +
        "document.getElementById('sug-content').value = con;" +
        "document.getElementById('suggestion-modal').classList.remove('hidden');" +
        "document.getElementById('suggestion-modal').classList.add('flex');" +
    "};" +
    "window.closeSuggestion = function() { const m = document.getElementById('suggestion-modal'); m.classList.add('hidden'); m.classList.remove('flex'); };" +
    
    "window.submitSuggestion = async function() {" +
        "const con = document.getElementById('sug-content').value;" +
        "if(!con) return alert('內容不能為空');" +
        "const btn = document.querySelector('#suggestion-modal button');" +
        "btn.disabled = true; btn.innerText = '傳送中...';" +
        "await fetch(window.location.href, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ action: 'submit_suggestion', groupId: gId, taskId: document.getElementById('sug-task-id').value, subject: document.getElementById('sug-subject').value, category: document.getElementById('sug-category').value, content: con }) });" +
        "alert('建議已送出'); closeSuggestion();" +
        "btn.disabled = false; btn.innerText = '送出建議';" +
    "};" +
    "load();";

    // 3. 組合 HTML
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>班級作業</title>
    ${COMMON_UI_SCRIPT}
    ${css}
    </head><body class="bg-gray-900 text-white min-h-screen pb-20">
    
    <div class="max-w-4xl mx-auto p-4" id="main-container">
        <div class="text-center mb-4">
            <h1 class="text-2xl font-bold text-white mb-1" id="page-title">📋 載入中...</h1>
            <p class="text-xs text-gray-400" id="page-date"></p>
        </div>

        <div id="loading" class="text-center py-8"><i class="fas fa-spinner fa-spin text-3xl text-blue-500"></i></div>
        <div id="error-msg" class="hidden bg-red-900/50 p-4 rounded text-center mb-4 text-red-200 border border-red-700"></div>

        <div id="filters" class="hidden space-y-3 mb-4">
            <div class="flex justify-center">
                <div class="bg-gray-800 p-1 rounded-full border border-gray-700 flex shadow-sm">
                    <button onclick="setFilter('status', 'active')" id="btn-status-active" class="px-6 py-1.5 rounded-full text-sm font-bold transition bg-blue-600 text-white">進行中</button>
                    <button onclick="setFilter('status', 'history')" id="btn-status-history" class="px-6 py-1.5 rounded-full text-sm font-bold transition text-gray-400 hover:text-white">已結束</button>
                </div>
            </div>
            <div class="flex overflow-x-auto gap-2 month-scroll py-1 px-1" id="month-filter-list"></div>
            <div class="flex gap-2">
                <button onclick="openSubjectFilter()" class="flex-1 bg-gray-800 py-2.5 rounded-lg text-sm border border-gray-700 flex items-center justify-center shadow active:bg-gray-700 hover:border-gray-500 transition">
                    <i class="fas fa-filter mr-2 text-blue-400"></i> <span id="current-subject-label">全部科目</span>
                </button>
            </div>
            <div id="mention-alert" class="hidden bg-purple-900/40 border border-purple-500/50 text-purple-200 px-3 py-2 rounded-lg text-sm flex items-center justify-between animate-pulse">
                <span><i class="fas fa-at mr-2"></i> 只顯示標註 <b id="mention-name"></b> 的作業</span>
                <button onclick="clearMention()" class="text-purple-300 hover:text-white px-2"><i class="fas fa-times"></i></button>
            </div>
        </div>

        <div id="content-area" class="space-y-3"></div>
    </div>
    
    <div id="suggestion-modal" class="fixed inset-0 z-[9999] hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div class="bg-gray-800 rounded-xl w-full max-w-sm border border-gray-700 overflow-hidden shadow-2xl transform transition-all">
            <div class="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-750">
                <h3 class="font-bold text-white"><i class="fas fa-edit mr-2 text-yellow-500"></i>勘誤/建議</h3>
                <button onclick="closeSuggestion()" class="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700"><i class="fas fa-times"></i></button>
            </div>
            <div class="p-4 space-y-4">
                <input type="hidden" id="sug-task-id">
                <input type="text" id="sug-subject" class="w-full bg-gray-900 border-gray-600 border rounded p-2 text-white" placeholder="科目">
                <select id="sug-category" class="w-full bg-gray-900 border-gray-600 border rounded p-2 text-white"><option value="作業">作業</option><option value="考試">考試</option><option value="攜帶">攜帶</option></select>
                <textarea id="sug-content" rows="4" class="w-full bg-gray-900 border-gray-600 border rounded p-2 text-white" placeholder="修正內容..."></textarea>
            </div>
            <div class="p-4 border-t border-gray-700"><button onclick="submitSuggestion()" class="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold">送出建議</button></div>
        </div>
    </div>

    <script>${clientScript}</script></body></html>`;
}

// --- END OF PART 9 (FINAL SAFE FIX) ---

// --- START OF PART 10 (FINAL ULTIMATE FIX v4.8.5) ---

// 8. 後台管理頁面
function renderManagerHTML(origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>後台管理</title>
    ${COMMON_UI_SCRIPT}
    <style>
        /* 基礎樣式與滾動修復 */
        html, body { height: 100%; margin: 0; padding: 0; background-color: #0f172a; color: #f8fafc; font-family: 'Segoe UI', sans-serif; }
        
        /* 輸入框美化 */
        .input-dark { background: #1e293b; border: 1px solid #334155; color: white; border-radius: 0.5rem; padding: 0.75rem; width: 100%; transition: all 0.2s; font-size: 0.95rem; }
        .input-dark:focus { border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3); outline: none; }
        .input-dark:disabled { opacity: 0.5; cursor: not-allowed; background: #111827; }

        /* 按鈕美化 */
        .btn { padding: 0.6rem 1.2rem; border-radius: 0.5rem; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; border: none; font-size: 0.9rem; }
        .btn:active { transform: scale(0.96); }
        .btn-primary { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.3); }
        .btn-primary:hover { filter: brightness(1.1); }
        .btn-danger { background: linear-gradient(135deg, #ef4444, #b91c1c); color: white; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3); }
        .btn-secondary { background: #334155; color: #cbd5e1; border: 1px solid #475569; }
        .btn-secondary:hover { background: #475569; color: white; }
        
        /* 側邊欄與佈局 */
        #step-dash { display: flex; height: 100vh; overflow: hidden; }
        
        .sidebar { width: 280px; background: #1f2937; border-right: 1px solid #374151; display: flex; flex-direction: column; z-index: 50; flex-shrink: 0; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .sidebar-link { display: flex; align-items: center; padding: 1rem 1.5rem; color: #94a3b8; text-decoration: none; transition: 0.2s; cursor: pointer; border-left: 3px solid transparent; font-weight: 500; }
        .sidebar-link:hover { background: #374151; color: white; transform: translateX(4px); }
        .sidebar-link.active { background: #0f172a; color: #60a5fa; border-left-color: #60a5fa; box-shadow: inset 0 0 20px rgba(0,0,0,0.2); }
        .sidebar-link i { width: 24px; text-align: center; margin-right: 1rem; font-size: 1.1rem; }
        
        /* 主內容區滾動修復 */
        .main { flex: 1; overflow-y: auto; padding: 2rem; position: relative; background: #0f172a; height: 100%; display: flex; flex-direction: column; }
        
        @media (max-width: 768px) {
            .sidebar { position: fixed; top: 0; bottom: 0; left: 0; transform: translateX(-100%); box-shadow: 0 0 20px rgba(0,0,0,0.5); }
            .sidebar.open { transform: translateX(0); }
            .mobile-header { display: flex !important; }
            .main { padding: 1rem; padding-top: 80px; }
            .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 45; backdrop-filter: blur(2px); }
            .sidebar-overlay.show { display: block; }
        }

        .mobile-header { display: none; height: 64px; background: #1f2937; align-items: center; justify-content: space-between; padding: 0 1.5rem; border-bottom: 1px solid #374151; z-index: 40; position: fixed; top: 0; left: 0; right: 0; }

        /* 卡片與元件 */
        .card { background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); transition: transform 0.2s; }
        .card:hover { border-color: #475569; }
        .avatar-circle { width: 40px; height: 40px; border-radius: 50%; background: rgba(59, 130, 246, 0.1); color: #60a5fa; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; border: 1px solid rgba(59, 130, 246, 0.2); }
        
        details { background: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; overflow: hidden; margin-bottom: 1rem; }
        details > summary { padding: 1rem; cursor: pointer; font-weight: bold; display: flex; justify-content: space-between; align-items: center; background: #262f3e; transition: background 0.2s; user-select: none; }
        details > summary:hover { background: #2d3b55; }
        .accordion-content { padding: 1.25rem; border-top: 1px solid #334155; background: #151e2e; }
        
        .perm-row { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: #0f172a; border-radius: 0.5rem; border: 1px solid #334155; cursor: pointer; transition: 0.2s; }
        .perm-row:hover { border-color: #60a5fa; background: #1e293b; }
        .perm-checkbox { width: 1.1rem; height: 1.1rem; accent-color: #3b82f6; cursor: pointer; }
        .task-chk { width: 1.2rem; height: 1.2rem; cursor: pointer; accent-color: #2563eb; }
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #475569; border-radius: 3px; }
    </style>
    </head><body>

    <!-- 登入流程 -->
    <div id="login-container" class="fixed inset-0 z-[100] bg-gray-900 flex items-center justify-center p-4 overflow-y-auto">
        <div id="step-id" class="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 my-auto">
            <div class="text-center mb-8"><div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 mb-4 text-3xl ring-1 ring-blue-500/50"><i class="fas fa-wrench"></i></div><h1 class="text-3xl font-bold tracking-tight">後台管理系統</h1><p class="text-gray-400 mt-2">請輸入您的群組 ID 以開始管理</p></div>
            <input id="inp-gid" placeholder="輸入 Group ID" class="input-dark text-center mb-6 text-xl tracking-widest font-mono shadow-inner">
            <button onclick="checkId()" id="btn-check" class="btn btn-primary w-full text-lg py-3">下一步 <i class="fas fa-arrow-right"></i></button>
        </div>
        <div id="step-role" class="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl hidden my-auto"><h1 class="text-2xl font-bold text-center mb-6">👤 選擇登入身分</h1><div id="role-buttons" class="grid grid-cols-2 gap-4 mb-6"></div><button onclick="showSection('step-id')" class="w-full text-gray-500 hover:text-white text-sm py-2">返回上一步</button></div>
        <div id="step-pwd" class="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl hidden my-auto"><h1 class="text-2xl font-bold text-center mb-2">身分驗證</h1><p id="lbl-role" class="text-center text-blue-400 font-bold mb-6 bg-blue-900/20 py-1 px-4 rounded-full inline-block mx-auto"></p><input type="password" id="inp-pwd" placeholder="請輸入密碼" class="input-dark text-center mb-6 text-lg shadow-inner"><button onclick="doLogin()" class="btn btn-primary w-full py-3 text-lg bg-green-600 hover:bg-green-500">登入系統</button><div class="flex justify-between mt-4 px-2"><button onclick="showSection('step-reset')" class="text-sm text-gray-400 hover:text-blue-400">忘記密碼?</button><button onclick="showSection('step-role')" class="text-sm text-gray-400 hover:text-white">切換身分</button></div></div>
        <div id="step-reset" class="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl hidden my-auto"><h1 class="text-2xl font-bold text-center mb-6 text-red-400">重設密碼</h1><input id="reset-code" placeholder="救援碼 (6位數)" class="input-dark text-center mb-4 text-lg font-mono"><input type="password" id="reset-new-pwd" placeholder="設定新密碼" class="input-dark text-center mb-6"><button onclick="doReset()" class="btn btn-danger w-full py-3 text-lg">確認重設</button><button onclick="showSection('step-pwd')" class="w-full text-gray-500 mt-4 text-sm hover:text-white">返回</button></div>
    </div>

    <!-- 主介面 -->
    <div id="step-dash" class="hidden">
        <div class="mobile-header">
            <button onclick="toggleSidebar()" class="text-white text-2xl p-2"><i class="fas fa-bars"></i></button>
            <span class="font-bold text-lg text-white">管理後台</span>
            <button onclick="logout()" class="text-red-400 p-2"><i class="fas fa-sign-out-alt"></i></button>
        </div>
        <aside id="sidebar" class="sidebar custom-scroll">
            <div class="p-6 border-b border-gray-700 bg-gray-900/50">
                <div class="text-blue-400 text-xl font-bold mb-2 flex items-center gap-2"><i class="fas fa-robot"></i> RayBot</div>
                <div class="text-xs text-gray-400 truncate font-mono bg-gray-800 p-2 rounded border border-gray-700 mb-2" id="dash-group-name"></div>
                <div class="text-xs text-green-400 font-bold px-1 mb-1">身分: <span id="role-display"></span></div>
                <div id="rescue-code-area" class="mt-2 hidden"><div class="flex items-center gap-2 bg-yellow-900/10 p-2 rounded border border-yellow-700/30"><i class="fas fa-key text-yellow-600 text-xs"></i><span id="rec-code" class="text-xs font-mono text-yellow-400 blur-sm select-all cursor-pointer flex-1" onclick="this.classList.toggle('blur-sm')">******</span></div></div>
            </div>
            <nav class="flex-1 p-4 overflow-y-auto space-y-1">
                <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">功能選單</p>
                <a onclick="switchView('tasks')" class="sidebar-link active" id="link-tasks"><i class="fas fa-list-check"></i> 作業管理</a>
                <a onclick="switchView('settings')" class="sidebar-link" id="link-settings"><i class="fas fa-sliders-h"></i> 系統設定</a>
                <a onclick="switchView('members')" class="sidebar-link" id="link-members"><i class="fas fa-users-cog"></i> 成員權限</a>
                <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mt-6 mb-2 ml-2">帳戶安全</p>
                <a onclick="openPwdModal()" class="sidebar-link"><i class="fas fa-key"></i> 修改密碼</a>
            </nav>
            <div class="p-4 border-t border-gray-700 bg-gray-900/30"><button onclick="logout()" class="btn btn-secondary w-full text-red-400 hover:text-white hover:bg-red-600/20 border-red-900/30"><i class="fas fa-sign-out-alt"></i> 登出系統</button></div>
        </aside>
        <div id="sidebar-overlay" class="sidebar-overlay" onclick="toggleSidebar()"></div>

        <!-- 內容區 -->
        <main class="main custom-scroll">
            <!-- A. 作業管理 -->
            <div id="view-tasks" class="view-section max-w-6xl mx-auto space-y-6 w-full">
                <div class="flex flex-wrap justify-between items-center gap-4">
                    <div><h2 class="text-3xl font-bold text-white">作業管理</h2><p class="text-gray-400 text-sm mt-1">管理與發佈班級作業</p></div>
                    <div class="flex gap-2">
                        <button onclick="batchDelTasks()" class="btn btn-danger text-sm shadow-lg"><i class="fas fa-trash-alt"></i> 批量刪除</button>
                        <button onclick="loadTasks(true)" class="btn btn-secondary text-sm shadow-lg"><i class="fas fa-sync-alt"></i> 重整</button>
                        <button onclick="openAddModal()" class="btn btn-primary text-sm shadow-lg"><i class="fas fa-plus"></i> 新增作業</button>
                    </div>
                </div>
                <div class="card grid grid-cols-2 md:grid-cols-5 gap-3 p-4">
                    <div class="md:col-span-1"><input id="f-kw" class="input-dark bg-gray-900" placeholder="🔍 搜尋..." oninput="applyFilters()"></div>
                    <select id="f-st" class="input-dark bg-gray-900" onchange="applyFilters()"><option value="all">🟢 狀態: 全部</option><option value="approved">✅ 已發佈</option><option value="pending">⚠️ 待審核</option></select>
                    <select id="f-tm" class="input-dark bg-gray-900" onchange="applyFilters()"><option value="active">📅 時效: 進行中</option><option value="history">🗄️ 時效: 已結束</option><option value="all">全部時間</option></select>
                    <select id="f-mt" class="input-dark bg-gray-900" onchange="applyFilters()"><option value="all">🗓️ 月份: 全部</option></select>
                    <select id="f-sb" class="input-dark bg-gray-900" onchange="applyFilters()"><option value="all">📚 科目: 全部</option></select>
                </div>
                <div id="suggestions-panel" class="hidden bg-yellow-900/20 border border-yellow-600/30 p-4 rounded-xl mb-6"><h3 class="font-bold text-yellow-500 mb-3 flex items-center gap-2"><i class="fas fa-bell mr-2 animate-bounce"></i> 待審核的勘誤建議</h3><div id="suggestion-list" class="space-y-3"></div></div>
                <div id="task-list" class="space-y-4 pb-10"></div>
            </div>

            <!-- B. 系統設定 -->
            <div id="view-settings" class="view-section max-w-3xl mx-auto space-y-6 hidden w-full">
                <div class="border-b border-gray-800 pb-4 mb-6"><h2 class="text-3xl font-bold text-white">系統設定</h2><p class="text-gray-400 text-sm mt-1">調整機器人運作參數</p></div>
                <details open><summary class="text-blue-400 text-lg">⏰ 節次與時間設定</summary>
                    <div class="accordion-content">
                        <div class="bg-blue-900/20 p-3 rounded mb-4 text-xs text-blue-200 border border-blue-500/30 flex items-start gap-2"><i class="fas fa-info-circle mt-0.5"></i><span>設定「第一節」對應上課，「第一節下課」對應下課時間。</span></div>
                        <div id="period-list" class="space-y-3 mb-4"></div>
                        <button onclick="addPeriod()" class="btn btn-secondary w-full border-dashed border-2 border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white">+ 增加一節</button>
                    </div>
                </details>
                <details><summary class="text-purple-400 text-lg">🤖 進階功能設定</summary>
                    <div class="accordion-content grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label class="block text-sm text-gray-400 mb-2 font-bold">審核模式</label><select id="adv-approval-mode" class="input-dark bg-gray-900"><option value="auto">⚡ 自動審核</option><option value="timed">⏲️ 定時審核</option><option value="manual">🛡️ 完全手動</option></select></div>
                        <div><label class="block text-sm text-gray-400 mb-2 font-bold">AI 智慧輔助</label><label class="flex items-center gap-3 p-3 bg-gray-900 rounded border border-gray-700 cursor-pointer hover:bg-gray-800 transition"><input type="checkbox" id="adv-ai-enabled" class="perm-checkbox"> <span class="font-bold">啟用 AI 自動判斷</span></label></div>
                        <div class="md:col-span-2"><label class="block text-sm text-gray-400 mb-2 font-bold">禁用指令 (逗號分隔)</label><input id="adv-disabled-cmds" class="input-dark bg-gray-900" placeholder="例如: /bot student, /bot end"></div>
                    </div>
                </details>
                <details class="group"><summary class="text-green-400 text-lg">📚 科目設定</summary>
                    <div class="accordion-content">
                        <div id="subject-list" class="space-y-3 mb-4"></div>
                        <button onclick="addSubjectRow()" class="btn btn-secondary w-full border-dashed border-2 border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white">+ 新增科目</button>
                    </div>
                </details>
                <div class="sticky bottom-6 z-30"><button onclick="saveAllSettings()" class="btn btn-primary w-full py-3 shadow-xl text-lg border-t border-white/10">💾 儲存所有設定</button></div>
            </div>

            <!-- C. 成員管理 -->
            <div id="view-members" class="view-section max-w-4xl mx-auto space-y-6 hidden w-full">
                <div class="flex justify-between items-center border-b border-gray-800 pb-4"><div><h2 class="text-3xl font-bold text-white">成員管理</h2><p class="text-gray-400 text-sm mt-1">設定管理員與小老師權限</p></div><button onclick="openRoleModal()" class="btn btn-primary shadow-lg"><i class="fas fa-user-plus"></i> 新增成員</button></div>
                <div id="role-list" class="grid gap-4 grid-cols-1 md:grid-cols-2"></div>
            </div>
        </main>
    </div>

    <!-- Modals -->
    <div id="modal-add" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4">
        <div class="bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl border border-gray-700 relative scale-100">
            <h3 class="font-bold text-xl text-white mb-4" id="modal-task-title">新增作業</h3>
            <input type="hidden" id="edit-task-id">
            <div class="space-y-3">
                <div><label class="text-xs text-gray-400 block mb-1">日期</label><input type="date" id="add-date" class="input-dark bg-gray-900"></div>
                <div class="flex gap-2">
                    <div class="flex-1"><label class="text-xs text-gray-400 block mb-1">時間</label><input type="time" id="add-time" class="input-dark bg-gray-900"></div>
                    <div class="flex-1"><label class="text-xs text-gray-400 block mb-1">類型</label><select id="add-cat" class="input-dark bg-gray-900"><option value="作業">作業</option><option value="考試">考試</option><option value="攜帶">攜帶</option></select></div>
                </div>
                <div><label class="text-xs text-gray-400 block mb-1">科目</label><select id="add-sub" class="input-dark bg-gray-900"><option value="">選擇科目...</option></select></div>
                <div><label class="text-xs text-gray-400 block mb-1">內容</label><textarea id="add-content" class="input-dark bg-gray-900" rows="4" placeholder="內容..."></textarea></div>
            </div>
            <div class="flex gap-3 mt-6"><button onclick="closeModal('add')" class="btn btn-secondary flex-1">取消</button><button onclick="submitTaskAction()" class="btn btn-primary flex-1">確認</button></div>
        </div>
    </div>
    <div id="modal-role" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4">
        <div class="bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl border border-gray-700 relative max-h-[90vh] overflow-y-auto">
            <h3 class="font-bold text-xl text-white mb-4">成員權限設定</h3>
            <div class="space-y-4">
                <input id="r-name" class="input-dark bg-gray-900 text-lg font-bold" placeholder="職稱 (必填)">
                <input id="r-pwd" type="password" class="input-dark bg-gray-900" placeholder="密碼 (留空則不修改)">
                <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
                    <label class="text-xs text-blue-400 font-bold uppercase mb-3 block">系統權限</label>
                    <div class="grid grid-cols-1 gap-2">
                        <label class="perm-row"><input type="checkbox" class="perm-chk role-perm" value="manage_tasks_full"> <span>📝 作業完全管理</span></label>
                        <label class="perm-row"><input type="checkbox" class="perm-chk role-perm" value="manage_settings"> <span>⚙️ 系統設定管理</span></label>
                        <label class="perm-row"><input type="checkbox" class="perm-chk role-perm" value="manage_roles"> <span>👥 成員帳號管理</span></label>
                    </div>
                </div>
                <div class="bg-gray-900 p-4 rounded-xl border border-gray-700">
                    <label class="text-xs text-green-400 font-bold uppercase mb-3 block">可管理科目</label>
                    <div id="r-subs" class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto custom-scroll"></div>
                </div>
            </div>
            <div class="flex gap-3 mt-6"><button onclick="closeModal('role')" class="btn btn-secondary flex-1">取消</button><button onclick="saveRole()" class="btn btn-primary flex-1">儲存</button></div>
        </div>
    </div>
    <div id="modal-pwd" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4">
        <div class="bg-gray-800 p-6 rounded-2xl w-full max-w-sm shadow-2xl border border-gray-700 relative">
            <h3 class="font-bold text-xl text-white mb-4 text-center">修改密碼</h3>
            <div class="space-y-4"><input type="password" id="chg-old" class="input-dark bg-gray-900 text-center" placeholder="舊密碼"><input type="password" id="chg-new" class="input-dark bg-gray-900 text-center" placeholder="新密碼"></div>
            <div class="flex gap-3 mt-6"><button onclick="closeModal('pwd')" class="btn btn-secondary flex-1">取消</button><button onclick="submitChgPwd()" class="btn btn-primary flex-1">確認</button></div>
        </div>
    </div>

    <script>
    let gId='', selectedRole='Administrator', periods={}, subjects={}, roles={}, allTasks=[], advanced={}, myRoleData={};
    function escapeHtml(text) { return text ? text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""; }

    document.addEventListener('DOMContentLoaded', () => {
        const p = new URLSearchParams(window.location.search);
        const cId = localStorage.getItem('hw_gid'), cRole = localStorage.getItem('hw_role'), cPwd = localStorage.getItem('hw_pwd');
        if (p.get('id')) { document.getElementById('inp-gid').value = p.get('id'); checkId(); }
        else if (cId && cRole && cPwd) { gId=cId; selectedRole=cRole; document.getElementById('inp-gid').value=cId; document.getElementById('inp-pwd').value=cPwd; doLogin(true); }
    });

    window.showSection = (id) => {
        ['step-id','step-role','step-pwd','step-reset','step-dash'].forEach(s => document.getElementById(s).classList.add('hidden'));
        document.getElementById('login-container').classList.add('hidden');
        if(id==='step-dash') { document.getElementById('step-dash').classList.remove('hidden'); }
        else { document.getElementById('login-container').classList.remove('hidden'); document.getElementById(id).classList.remove('hidden'); }
    };
    window.toggleSidebar = () => { const sb=document.getElementById('sidebar'), ov=document.querySelector('.sidebar-overlay'); sb.classList.toggle('-translate-x-full'); ov.classList.toggle('show'); };
    window.switchView = (v) => {
        ['tasks','settings','members'].forEach(id=>document.getElementById('view-'+id).classList.add('hidden'));
        document.getElementById('view-'+v).classList.remove('hidden');
        document.querySelectorAll('.sidebar-link').forEach(el=>el.classList.remove('active'));
        const l=document.getElementById('link-'+v); if(l) l.classList.add('active');
        if(window.innerWidth < 768) toggleSidebar();
        document.querySelector('.main').scrollTop = 0;
    };
    window.logout = () => { localStorage.clear(); location.href = location.pathname; };

    window.checkId = async () => {
        gId = document.getElementById('inp-gid').value.trim(); if(!gId) return alert('請輸入 ID');
        const btn = document.getElementById('btn-check'); btn.innerText='...'; btn.disabled=true;
        try {
            const res = await fetch(location.href, {method:'POST', body:JSON.stringify({action:'admin_check_status', groupId:gId})});
            if(res.status === 503) return document.body.innerHTML = await res.text();
            const d = await res.json();
            if(d.status==='login') { 
                const div = document.getElementById('role-buttons'); div.innerHTML = '';
                Object.keys(d.roles).sort((a,b)=>(a==='Administrator'?-1:1)).forEach(r => { div.innerHTML += \`<button onclick="selRole('\${r}')" class="bg-gray-700 hover:bg-gray-600 p-4 rounded-xl font-bold text-white transition shadow">\${r}</button>\`; });
                showSection('step-role');
            } else if(d.status==='need_setup') {
                if(confirm('初始化?')) { await fetch(location.href,{method:'POST',body:JSON.stringify({action:'admin_setup',groupId:gId,groupName:'新班級'})}); alert('成功(Administrator/空密碼)'); location.reload(); }
            } else alert(d.msg);
        } catch(e) { alert('連線錯誤'); }
        btn.innerText='下一步'; btn.disabled=false;
    };
    window.selRole=(r)=>{selectedRole=r; document.getElementById('lbl-role').innerText='身分：'+r; showSection('step-pwd');};
    window.doLogin = async (auto=false) => {
        const pwd = document.getElementById('inp-pwd').value;
        const res = await fetch(location.href, {method:'POST', body:JSON.stringify({action:'admin_login', groupId:gId, roleName:selectedRole, password:pwd})});
        const d = await res.json();
        if(d.status==='success') {
            localStorage.setItem('hw_gid',gId); localStorage.setItem('hw_role',selectedRole); localStorage.setItem('hw_pwd',pwd);
            showSection('step-dash');
            document.getElementById('dash-group-name').innerText = d.groupName;
            document.getElementById('role-display').innerText = selectedRole;
            myRoleData = d.roleData;
            if(d.roleData.rec) { document.getElementById('rescue-code-area').classList.remove('hidden'); document.getElementById('rec-code').innerText = d.roleData.rec; }
            
            const perms = d.roleData.perm || [];
            if(!perms.includes('manage_settings') && selectedRole!=='Administrator') document.getElementById('link-settings').classList.add('hidden');
            if(!perms.includes('manage_roles') && selectedRole!=='Administrator') document.getElementById('link-members').classList.add('hidden');
            advanced=d.advanced||{}; periods=advanced.periods||{}; subjects=d.subjects||{}; roles=d.allRoles||{};
            if(Object.keys(periods).length===0) for(let i=1;i<=7;i++) periods[i]={start:'',end:''};
            renderAll(); loadTasks(); if(typeof startPolling==='function') startPolling(gId, true);
        } else { if(auto) { localStorage.clear(); showSection('step-id'); } else alert(d.msg||'密碼錯誤'); }
    };
    window.doReset = async () => {
        const code = document.getElementById('reset-code').value; const newPwd = document.getElementById('reset-new-pwd').value;
        const res = await fetch(window.location.href, { method: 'POST', body: JSON.stringify({ action: 'admin_reset_pwd', groupId: gId, roleName: selectedRole, recoveryCode: code, newPassword: newPwd }) });
        const d = await res.json();
        if(d.status==='success') { alert('重設成功'); showSection('step-pwd'); } else alert(d.msg);
    };

    function renderAll() {
        // Periods
        const pd = document.getElementById('period-list'); pd.innerHTML='';
        Object.keys(periods).sort((a,b)=>parseInt(a)-parseInt(b)).forEach(k => {
            const p=periods[k]||{};
            pd.innerHTML += \`<div class="bg-gray-800 p-3 rounded-lg flex flex-col md:flex-row gap-3 items-center border border-gray-700 shadow-sm"><span class="font-bold text-blue-300 w-16 text-center bg-gray-900 rounded py-1">第 \${k} 節</span><div class="flex flex-1 gap-4"><label class="flex-1 text-xs text-gray-500 font-bold block">上課 <input type="time" value="\${p.start}" onchange="periods[\${k}].start=this.value" class="input-dark mt-1 py-1 text-center bg-gray-900"></label><label class="flex-1 text-xs text-gray-500 font-bold block">下課 <input type="time" value="\${p.end}" onchange="periods[\${k}].end=this.value" class="input-dark mt-1 py-1 text-center bg-gray-900"></label></div><button onclick="removePeriod('\${k}')" class="text-red-400 hover:bg-red-900/30 p-2 rounded-lg transition" title="刪除"><i class="fas fa-trash"></i></button></div>\`;
        });
        // Subjects (★修復：移除 readonly 且使用 innerHTML 渲染資料)
        const sd = document.getElementById('subject-list'); sd.innerHTML='';
        const sel = document.getElementById('add-sub'); sel.innerHTML='<option value="">請選擇科目...</option>';
        const fs = document.getElementById('f-sb'); fs.innerHTML='<option value="all">📚 科目: 全部</option>';
        if(!subjects) subjects = {};
        Object.keys(subjects).forEach(s => {
            const keys = Array.isArray(subjects[s]) ? subjects[s].join(', ') : subjects[s];
            // 這裡移除了 readonly
            sd.innerHTML += \`<div class="flex gap-3 mb-2 bg-gray-800 p-2 rounded-lg items-center border border-gray-700 subject-row"><input class="input-dark w-1/3 sub-name bg-gray-900 font-bold" value="\${s}" placeholder="科目名稱"><input class="input-dark w-2/3 sub-key bg-gray-900" value="\${keys}" placeholder="關鍵字(逗號分隔)"><button onclick="this.closest('.subject-row').remove()" class="text-red-400 px-2 hover:bg-red-900/30 rounded"><i class="fas fa-trash"></i></button></div>\`;
            sel.innerHTML += \`<option value="\${s}">\${s}</option>\`; fs.innerHTML += \`<option value="\${s}">\${s}</option>\`;
        });
        
        // Roles
        const rd = document.getElementById('role-list'); rd.innerHTML='';
        Object.keys(roles).forEach(r => {
            let delBtn = (r !== 'Administrator' && r !== selectedRole) ? \`<button onclick="delRole('\${r}')" class="btn btn-danger text-xs px-3 py-1">刪除</button>\` : '';
            let avatar = r==='Administrator' ? '🛡️' : '👤';
            rd.innerHTML += \`<div class="card flex justify-between items-center"><div class="flex items-center gap-4"><div class="avatar-circle">\${avatar}</div><div><div class="font-bold text-lg text-white">\${r}</div><div class="text-xs text-gray-500">權限: \${(roles[r].perm||[]).length} 項</div></div></div><div class="flex gap-2"><button onclick="openRoleModal('\${r}')" class="btn btn-secondary text-xs px-3 py-1">編輯</button>\${delBtn}</div></div>\`;
        });
        
        // Advanced
        if(advanced) {
            document.getElementById('adv-approval-mode').value = advanced.approval_mode || 'manual';
            document.getElementById('adv-ai-enabled').checked = advanced.ai_enabled || false;
            document.getElementById('adv-disabled-cmds').value = (advanced.disabled_commands || []).join(',');
        }
    }

    // Settings & Subjects
    window.saveAllSettings = async () => {
        try {
            const newSub = {};
            // ★修復：讀取使用者打的字，並更新資料
            document.querySelectorAll('.subject-row').forEach(row=>{ 
                const name = row.querySelector('.sub-name').value.trim();
                const keysVal = row.querySelector('.sub-key').value;
                if(name && keysVal) {
                    const keys = keysVal.split(',').map(k => k.trim()).filter(k=>k);
                    newSub[name]=keys; 
                }
            });
            
            advanced.periods=periods; 
            advanced.approval_mode=document.getElementById('adv-approval-mode').value; 
            advanced.ai_enabled=document.getElementById('adv-ai-enabled').checked; 
            const cmdsVal = document.getElementById('adv-disabled-cmds').value;
            advanced.disabled_commands = cmdsVal ? cmdsVal.split(',').map(c=>c.trim()) : [];

            await apiCall({action:'update_settings', advancedSettings:advanced, subjects:newSub, roleName:selectedRole});
            subjects=newSub; renderAll(); successAlert('設定已儲存');
        } catch(e) {
            console.error(e); errorAlert('儲存失敗：' + e.message);
        }
    };
    
    window.addPeriod = () => { const k=Object.keys(periods).map(Number); const n=k.length?Math.max(...k)+1:1; periods[n]={start:'',end:''}; renderAll(); };
    window.removePeriod = (k) => { delete periods[k]; renderAll(); };
    
    // ★修復：新增科目直接插入 HTML，不重繪整個列表，防止輸入一半被清空
    window.addSubjectRow = () => { 
        const html = \`<div class="flex gap-3 mb-2 bg-gray-800 p-2 rounded-lg items-center border border-gray-700 subject-row"><input class="input-dark w-1/3 sub-name bg-gray-900 font-bold" value="" placeholder="新科目"><input class="input-dark w-2/3 sub-key bg-gray-900" value="" placeholder="關鍵字"><button onclick="this.closest('.subject-row').remove()" class="text-red-400 px-2 hover:bg-red-900/30 rounded"><i class="fas fa-trash"></i></button></div>\`;
        document.getElementById('subject-list').insertAdjacentHTML('beforeend', html);
    };

    // Role Logic
    window.openRoleModal = (n='') => {
        openModal('role'); document.getElementById('r-name').value = n; document.getElementById('r-pwd').value = '';
        document.querySelectorAll('.role-perm').forEach(c=>c.checked=false);
        const c=document.getElementById('r-subs'); c.innerHTML='<label class="perm-row"><input type="checkbox" value="all" class="r-sub perm-checkbox"> <span>🌟 全科 (All)</span></label>';
        Object.keys(subjects).forEach(s => c.innerHTML+=\`<label class="perm-row"><input type="checkbox" value="\${s}" class="r-sub perm-checkbox"> <span>\${s}</span></label>\`);
        
        const isSelf = (n === selectedRole);
        if(n && roles[n]) {
            (roles[n].perm||[]).forEach(p=>{
                const el=document.querySelector(\`.role-perm[value="\${p}"]\`);
                if(el) { el.checked=true; if(isSelf) el.disabled=true; } 
            });
            (roles[n].subjects||[]).forEach(s=>{
                const el=document.querySelector(\`.r-sub[value="\${s}"]\`);
                if(el) { el.checked=true; if(isSelf) el.disabled=true; }
            });
        }
    };
    
    window.saveRole = async () => {
        const n=document.getElementById('r-name').value; if(!n) return alert('必填名稱');
        if(n==='Administrator' && selectedRole!=='Administrator') return errorAlert('無權限修改管理員');
        const perms=Array.from(document.querySelectorAll('.role-perm:checked')).map(x=>x.value);
        const subs=Array.from(document.querySelectorAll('.r-sub:checked')).map(x=>x.value);
        const res=await fetch(location.href,{method:'POST',body:JSON.stringify({action:'update_settings',groupId:gId,password:localStorage.getItem('hw_pwd'),roleName:selectedRole,settings:{roles:{[n]:{password:document.getElementById('r-pwd').value,perm:perms,subjects:subs}}}})});
        const d=await res.json();
        if(d.status==='success'){ if(d.newRoles) roles=d.newRoles; renderAll(); closeModal('role'); successAlert('已儲存'); } else errorAlert(d.msg);
    };

    window.delRole = async (n) => {
        if(!await myConfirm(\`確定要刪除成員 "\${n}" 嗎？\`)) return;
        try {
            const res = await fetch(window.location.href, { method: 'POST', body: JSON.stringify({ action: 'update_settings', groupId: gId, password: localStorage.getItem('hw_pwd'), roleName: selectedRole, deleteRole: n }) });
            const d = await res.json();
            if(d.status === 'success') { 
                if(d.newRoles) roles = d.newRoles; else delete roles[n];
                renderAll(); 
                successAlert('已刪除'); 
            } else alert(d.msg);
        } catch(e) { alert('刪除失敗'); }
    };

    // Task Logic
    async function loadTasks(showMsg=false) {
        const res=await fetch(location.href,{method:'POST',body:JSON.stringify({action:'admin_get_tasks',groupId:gId})});
        const d=await res.json(); allTasks=d.tasks||[];
        const sl=document.getElementById('suggestion-list'); sl.innerHTML='';
        if(d.suggestions?.length) {
            document.getElementById('suggestions-panel').classList.remove('hidden');
            d.suggestions.forEach(s=>sl.innerHTML+=\`<div class="bg-gray-900 p-2 rounded mb-2 flex justify-between text-sm"><div><b class="text-yellow-400">\${s.suggestion_subject}</b><br>\${escapeHtml(s.suggestion_content)}</div><div class="flex gap-2"><button onclick="approveSug(\${s.id})" class="text-green-400">V</button><button onclick="rejectSug(\${s.id})" class="text-red-400">X</button></div></div>\`);
        } else document.getElementById('suggestions-panel').classList.add('hidden');
        
        const mt=document.getElementById('f-mt'); mt.innerHTML='<option value="all">🗓️ 月份: 全部</option>';
        const ms=new Set(allTasks.map(t=>new Date(t.date).getMonth()+1));
        Array.from(ms).sort((a,b)=>a-b).forEach(m=>mt.innerHTML+=\`<option value="\${m}">\${m}月</option>\`);
        renderTasks(); if(showMsg) successAlert('已重整');
    }

    window.renderTasks=()=>{
        const div=document.getElementById('task-list'); div.innerHTML='';
        const kw=document.getElementById('f-kw').value.toLowerCase();
        const st=document.getElementById('f-st').value, tm=document.getElementById('f-tm').value, mt=document.getElementById('f-mt').value, sb=document.getElementById('f-sb').value;
        const today = new Date(); today.setHours(0,0,0,0);
        
        const filtered = allTasks.filter(t => {
            if(kw && !t.content.toLowerCase().includes(kw)) return false;
            if(st!=='all' && ((st==='approved' && t.status!=='已發佈') || (st==='pending' && t.status==='已發佈'))) return false;
            const d=new Date(t.date);
            if(tm==='active' && d<today) return false;
            if(tm==='history' && d>=today) return false;
            if(mt!=='all' && (d.getMonth()+1)!=mt) return false;
            if(sb!=='all' && t.subject!==sb) return false;
            return true;
        });
        
        if(!filtered.length) div.innerHTML = '<div class="text-center text-gray-500 py-10">無符合資料</div>';
        
        filtered.forEach(t=>{
            const stColor = t.status === '已發佈' ? 'text-green-400 border-green-500' : 'text-yellow-400 border-yellow-500';
            const timeStr = t.due_time ? \`<span class="bg-gray-700 px-2 py-0.5 rounded text-white ml-2 text-xs border border-gray-600">\${t.due_time}</span>\` : '';
            div.innerHTML += \`<div class="card relative group hover:bg-gray-800 transition"><div class="absolute top-3 right-3 flex gap-2"><input type="checkbox" class="task-chk" value="\${t.id}"><button onclick="editTask(\${t.id})" class="text-blue-400 p-1"><i class="fas fa-edit"></i></button><button onclick="delTask(\${t.id})" class="text-red-400 p-1"><i class="fas fa-trash"></i></button></div><div><span class="bg-blue-900 text-blue-300 px-2 rounded text-xs">\${t.date}</span> \${timeStr} <span class="px-2 rounded border border-opacity-30 \${stColor} text-xs font-bold">[\${t.status}]</span> <b class="text-white ml-2">\${t.subject}</b></div><div class="mt-2 text-gray-300 text-sm whitespace-pre-wrap">\${escapeHtml(t.content)}</div></div>\`;
        });
    };
    
    window.openModal=(id)=>{document.getElementById('modal-'+id).classList.remove('hidden');document.getElementById('modal-'+id).classList.add('flex'); if(id==='add'){document.getElementById('modal-task-title').innerText='新增';document.getElementById('edit-task-id').value='';document.getElementById('add-content').value='';}}
    window.closeModal=(id)=>document.getElementById('modal-'+id).classList.add('hidden');
    window.editTask=(id)=>{ const t=allTasks.find(x=>x.id==id); if(!t)return; openModal('add'); document.getElementById('modal-task-title').innerText='編輯作業'; document.getElementById('edit-task-id').value=id; document.getElementById('add-date').value=t.date; document.getElementById('add-time').value=t.due_time||''; document.getElementById('add-cat').value=t.category; document.getElementById('add-sub').value=t.subject; document.getElementById('add-content').value=t.content; };
    window.submitTaskAction=async ()=>{ const id=document.getElementById('edit-task-id').value; const p={action:id?'update_task':'add_task',taskId:id,date:document.getElementById('add-date').value,dueTime:document.getElementById('add-time').value,subject:document.getElementById('add-sub').value,content:document.getElementById('add-content').value,category:document.getElementById('add-cat').value,isAdmin:true,roleName:selectedRole}; if(!p.date||!p.content) return alert('必填'); await apiCall(p); closeModal('add'); successAlert(id?'編輯成功':'新增成功'); };
    window.batchDelTasks=async ()=>{ const ids=Array.from(document.querySelectorAll('.task-chk:checked')).map(c=>c.value); if(!ids.length) return alert('未選擇'); if(!await myConfirm('刪除 '+ids.length+' 筆?')) return; for(let id of ids) await fetch(location.href,{method:'POST',body:JSON.stringify({action:'manage_task',type:'delete',taskId:id,groupId:gId,password:localStorage.getItem('hw_pwd'),roleName:selectedRole})}); loadTasks(true); };
    window.delTask=async(id)=>{if(await myConfirm('刪除?')) await apiCall({action:'manage_task',type:'delete',taskId:id});};
    window.approveSug=async(id)=>await apiCall({action:'admin_approve_suggestion',suggestionId:id});
    window.rejectSug=async(id)=>await apiCall({action:'admin_reject_suggestion',suggestionId:id});
    window.openPwdModal = () => { document.getElementById('modal-pwd').classList.remove('hidden'); document.getElementById('modal-pwd').classList.add('flex'); };
    window.submitChgPwd=async()=>{await apiCall({action:'change_password',oldPassword:document.getElementById('chg-old').value,newPassword:document.getElementById('chg-new').value});closeModal('pwd');alert('成功');};
    
    // 綁定遺失的函式
    window.applyFilters = window.renderTasks;
    window.openAddModal = () => openModal('add');

    async function apiCall(d){ d.groupId=gId; d.password=localStorage.getItem('hw_pwd'); d.roleName=selectedRole; const res=await fetch(location.href,{method:'POST',body:JSON.stringify(d)}); const r=await res.json(); if(r.status==='success'){ if(d.action!=='admin_get_tasks') loadTasks(); } else errorAlert(r.msg); }
    </script></body></html>`;
}

// --- END OF PART 10 (FINAL ULTIMATE FIX v4.8.5) ---
