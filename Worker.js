// --- START OF PART 1 (Updated Terms UI) ---

// ==========================================
// ★ 設定區
// ==========================================
const SUPER_ADMIN_PASSWORD_ENV_KEY = 'SUPER_ADMIN_PASSWORD'; 
const SUPER_ADMIN_PATH = "/super-admin";

// ★ 版本與更新控制
const CURRENT_VERSION = "4.9.4"; // TERMS_UI_UPDATE
const TERMS_VERSION = "v2.1"; 

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
const CHANGELOG = `版本 ${CURRENT_VERSION} 更新：\n- 服務條款頁面樣式優化。\n- 新增明確的同意/拒絕指令區塊。`;
const LINK_LINE_HOST = "https://github.com/Ray20123315/LINE-Data-integration"; 
const LINK_DISCORD = "https://discord.gg/kwRpZwn772";
const MAIL_CONTACT = "ray2026worker@ray2026.dpdns.org";
const CUSTOM_LINE_CONTACT = "https://lin.ee/VJ8IC4D";
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1447399857336746104/C3i3kpWvPm3ylH9x8tqi-PMEaKOxrNdqXftgYXmPtk-S0tLgQfvpbjyfcidUkIMiIZjZ";

// HTML 靜態內容 (更新版服務條款 - 含綠/紅指令框)
const TERMS_HTML_CONTENT = `
<h1 class="text-3xl font-bold mb-6 text-blue-400 border-b border-gray-700 pb-4">服務條款 (${TERMS_VERSION})</h1>

<div class="space-y-6 text-gray-300">
    <section>
        <h2 class="text-xl font-bold text-red-400 mb-2">🟥 1. Privacy Policy (隱私權政策)</h2>
        <p>本服務僅在必要範圍內處理使用者資料，包括：LINE User ID、使用者名稱、自訂班級名稱、綁定狀態、救援碼（以明碼方式儲存）。所有資料僅用於：提供作業整理功能、帳戶識別、系統運作與安全需求。</p>
        <p class="text-sm text-gray-500 mt-1">This service processes user data only as necessary. All data is used solely for: providing assignment organization functions, account identification, system operation, and security requirements.</p>
        <p class="mt-2">資料以安全方式儲存，不會與第三方共享，不會用於未授權用途。</p>
        <p class="text-sm text-gray-500 mt-1">Data is stored securely, will not be shared with third parties, and will not be used for unauthorized purposes.</p>
        <p class="mt-2">使用者可要求刪除資料或終止使用權。</p>
    </section>

    <section>
        <h2 class="text-xl font-bold text-red-400 mb-2">🟥 2. Data Security Policy (資料安全政策)</h2>
        <p>系統採用 PBKDF2/SHA-256 技術儲存密碼，避免明碼暴露。後端採權限分級管理，Super Admin 僅可查看必要資訊。伺服器採 HTTPS 加密傳輸，不記錄敏感原始資料。</p>
        <p class="text-sm text-gray-500 mt-1">The system uses PBKDF2/SHA-256 hashing technology to store passwords. The backend uses tiered permission management. The server uses HTTPS encrypted transmission.</p>
    </section>

    <section>
        <h2 class="text-xl font-bold text-red-400 mb-2">🟥 3. Personal Data Protection Compliance (個資法 / GDPR 遵循)</h2>
        <ul class="list-disc list-inside space-y-1 ml-2">
            <li><strong>蒐集目的：</strong>提供作業整理與帳戶管理服務。</li>
            <li><strong>使用期限：</strong>使用者終止服務後即可提出刪除請求。</li>
            <li><strong>使用範圍：</strong>僅限系統運作所需，不另作他用。</li>
        </ul>
        <p class="mt-2">使用者可依 PDPA/GDPR 行使查詢、刪除、停止處理等權利。</p>
    </section>

    <section>
        <h2 class="text-xl font-bold text-blue-400 mb-2">🟦 4. User Conduct Policy (使用者行為政策)</h2>
        <p>使用者不得：嘗試繞過授權、反編譯系統、修改資料庫內容、進行惡意攻擊、侵害他人隱私、以商業方式使用本軟體。</p>
        <p class="mt-2 font-bold text-red-400">違者將立即終止授權。</p>
    </section>

    <section>
        <h2 class="text-xl font-bold text-blue-400 mb-2">🟦 5. Versioning & Changelog Policy (版本與變更紀錄)</h2>
        <p>版本格式採用 MAJOR.MINOR.PATCH。重大更新將於 GitHub Repo 的 Release Notes 公告。</p>
    </section>

    <section>
        <h2 class="text-xl font-bold text-green-400 mb-2">🟩 6. Technical Architecture & Security Design (技術架構與安全設計)</h2>
        <p>系統由前端、後端與 Super Admin 組成。資料傳輸使用 LINE Messaging API 標準流程，密碼採不可逆雜湊，敏感資料不以原文儲存。系統日誌僅記錄匿名技術參數，不包含可識別個資。</p>
    </section>

    <section>
        <h2 class="text-xl font-bold text-green-400 mb-2">🟩 7. Service Termination & Revocation (服務終止與撤銷)</h2>
        <p>作者保留隨時終止授權或關閉服務的權利。使用者違反 CC BY-NC-ND 4.0 或本條款時，其授權將自動撤銷，不得再使用或散布本軟體。</p>
        <p class="mt-2">使用者可隨時要求刪除個人資料並停止使用服務。</p>
    </section>

    <section>
        <h2 class="text-xl font-bold text-green-400 mb-2">🟩 8. English Reference Version (英文參考版)</h2>
        <p>所有上述政策的英文參考版本可應要求提供。如內容有歧異，應以中文版本為準。</p>
    </section>

    <!-- ★★★ 關鍵修改：綠色/紅色 指令區塊 ★★★ -->
    <div class="mt-10 border-t border-gray-700 pt-8">
        <h3 class="text-2xl font-bold text-white mb-6 text-center">👇 請回到 LINE 群組輸入以下指令 👇</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 同意區塊 -->
            <div class="bg-green-900/40 border-2 border-green-500 rounded-xl p-6 text-center transform transition hover:scale-105">
                <div class="text-green-400 font-bold text-lg mb-2">若您【同意】以上所有條款</div>
                <div class="text-gray-300 text-sm mb-4">請在群組內輸入：</div>
                <div class="bg-green-600 text-white text-2xl font-mono font-bold py-3 px-4 rounded-lg select-all cursor-pointer shadow-lg shadow-green-900/50">
                    /bot agree
                </div>
            </div>

            <!-- 不同意區塊 -->
            <div class="bg-red-900/40 border-2 border-red-500 rounded-xl p-6 text-center transform transition hover:scale-105">
                <div class="text-red-400 font-bold text-lg mb-2">若您【不同意】任何一項</div>
                <div class="text-gray-300 text-sm mb-4">請在群組內輸入：</div>
                <div class="bg-red-600 text-white text-2xl font-mono font-bold py-3 px-4 rounded-lg select-all cursor-pointer shadow-lg shadow-red-900/50">
                    /bot disagree
                </div>
            </div>
        </div>
        <p class="text-center text-gray-500 text-xs mt-4">⚠️ 注意：若輸入不同意指令，本服務將立即對該群組終止。</p>
    </div>
</div>
`;

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
            const btns = showCancel 
                ? \`<button id="btn-cancel-\${id}" class="flex-1 py-3.5 text-gray-400 border-r border-gray-700 hover:bg-gray-700">取消</button><button id="btn-ok-\${id}" class="flex-1 py-3.5 \${colors} font-bold hover:bg-gray-700">確認</button>\`
                : \`<button id="btn-ok-\${id}" class="w-full py-3.5 \${colors} font-bold hover:bg-gray-700">確定</button>\`;
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
    
    function escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    let _lastDataTs = 0, _lastMaintTs = 0, _isPolling = false;
    async function startPolling(groupId, isManager = false) {
        if(!groupId || _isPolling) return;
        _isPolling = true;
        await checkUpdates(groupId, isManager, true);
        setInterval(() => checkUpdates(groupId, isManager), 30000); 
    }
    
    async function checkUpdates(groupId, isManager, silent = false) {
        try {
            const res = await fetch(window.location.origin + '/?action=check_updates&id=' + groupId);
            if(res.ok) {
                const d = await res.json();
                if(_lastDataTs !== 0 && d.data_ts > _lastDataTs) {
                    _lastDataTs = d.data_ts;
                    if(!silent) {
                        if (!isManager) {
                            await showModal('info', '資料更新', '偵測到新的作業或狀態變更，將為您重新整理。');
                            location.reload();
                        } else { console.log('Data updated remotely'); }
                    }
                }
                const maintKey = isManager ? 'backend' : 'frontend';
                const currentMaintTs = d.maint_ts[maintKey] || 0;
                if(_lastMaintTs !== 0 && currentMaintTs > _lastMaintTs) {
                    _lastMaintTs = currentMaintTs;
                    await showModal('warning', '系統狀態變更', '系統維護模式已更新，將為您重新整理頁面。');
                    location.reload();
                }
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

// --- START OF PART 2 (Inject Anti-Debug Script) ---

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const hostname = url.hostname; 
        const CURRENT_ORIGIN = `${url.protocol}//${hostname}${url.port ? ':' + url.port : ''}`;
        
        // DB 初始化
        try {
            await env.DB.prepare(`CREATE TABLE IF NOT EXISTS task_suggestions (id INTEGER PRIMARY KEY AUTOINCREMENT, task_id INTEGER, group_id TEXT, suggested_by TEXT, suggestion_content TEXT, suggestion_subject TEXT, suggestion_category TEXT, status TEXT DEFAULT 'pending', created_at INTEGER)`).run();
            await env.DB.prepare(`CREATE TABLE IF NOT EXISTS system_settings (key TEXT PRIMARY KEY, value TEXT, updated_at INTEGER)`).run();
            try { await env.DB.prepare("ALTER TABLE tasks ADD COLUMN due_time TEXT").run(); } catch(e){}
            try { await env.DB.prepare("ALTER TABLE tasks ADD COLUMN is_reliable INTEGER DEFAULT 1").run(); } catch(e){}
            try { await env.DB.prepare("ALTER TABLE group_auth ADD COLUMN last_data_update INTEGER").run(); } catch(e){}
        } catch(e){}

        const isManagerSite = hostname.includes("manage") || url.pathname.startsWith("/manager");
        const isSuperAdmin = hostname.includes("super") || url.pathname === SUPER_ADMIN_PATH; 

        // 1. Polling API
        if (url.searchParams.get('action') === 'check_updates') {
            const gid = url.searchParams.get('id');
            const auth = await env.DB.prepare("SELECT last_data_update FROM group_auth WHERE group_id = ?").bind(gid).first();
            const conf = await env.DB.prepare("SELECT updated_at FROM system_settings WHERE key = 'system_config'").first();
            return new Response(JSON.stringify({
                data_ts: auth ? (auth.last_data_update || 0) : 0,
                maint_ts: conf ? (conf.updated_at || 0) : 0
            }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
        }

        // 2. POST API 處理
        if (request.method === "POST") {
            return handlePost(request, env, ctx, CURRENT_ORIGIN);
        }

        // 讀取系統設定 (維護模式 & 安全防護)
        const config = await getSystemConfig(env);

        // 3. 維護模式攔截
        if (!isSuperAdmin && url.pathname !== "/eula" && url.pathname !== "/terms") {
            const maint = isManagerSite ? config.maintenance?.backend : config.maintenance?.frontend;
            const isTargetPage = url.searchParams.has('id') || isManagerSite;

            if (isTargetPage && maint && maint.enabled === true) {
                let isActive = true;
                if (maint.end && maint.end.trim() !== "" && new Date(maint.end).getTime() < Date.now()) { isActive = false; }
                if (isActive) {
                    return new Response(renderMaintenancePage(maint), { headers: { "Content-Type": "text/html;charset=utf-8", "Cache-Control": "no-store" } });
                }
            }
        }

        // 準備回應內容
        let responseHTML = "";
        if (url.pathname === "/terms") responseHTML = renderTermsHTML(CURRENT_ORIGIN);
        else if (url.pathname === "/eula") responseHTML = renderEULAHTML(url.searchParams.get('redirect'), CURRENT_ORIGIN);
        else if (isManagerSite) responseHTML = renderManagerHTML(CURRENT_ORIGIN);
        else if (isSuperAdmin) responseHTML = renderSuperAdminHTML(CURRENT_ORIGIN);
        else {
            const id = url.searchParams.get('id');
            if (!id) responseHTML = renderHomePage(CURRENT_ORIGIN);
            else responseHTML = renderStudentHTML(CURRENT_ORIGIN);
        }

        // ★ 注入防護腳本 (Anti-Debug / F12 Block)
        // 只有當設定開啟，且不是 Super Admin 時才注入
        if (config.security_policy?.block_devtools && !isSuperAdmin) {
            const antiDebugScript = `
            <script>
            (function(){
                document.addEventListener('contextmenu', e => e.preventDefault());
                document.onkeydown = e => {
                    if(e.key === 'F12' || e.keyCode === 123 || 
                       (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || 
                       (e.ctrlKey && e.key === 'U')) {
                        e.preventDefault(); return false;
                    }
                };
            })();
            </script>`;
            responseHTML = responseHTML.replace('</body>', `${antiDebugScript}</body>`);
        }

        return new Response(responseHTML, { headers: { "Content-Type": "text/html;charset=utf-8" } });
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

        // 後端 API 維護模式攔截
        const config = await getSystemConfig(env);
        const beMaint = config.maintenance?.backend;
        if (beMaint && beMaint.enabled === true) {
            let isActive = true;
            if (beMaint.end && beMaint.end.trim() !== "" && new Date(beMaint.end).getTime() < Date.now()) { isActive = false; }
            if (isActive) {
                return new Response(JSON.stringify({ status: "fail", msg: beMaint.message || "系統維護中，暫停服務。", maintenance: true }), { status: 503 });
            }
        }

        // --- 管理員相關 API ---
        if (action === "admin_check_status") {
            const auth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(groupId).first();
            if (!auth) return new Response(JSON.stringify({ status: "need_setup" }));
            if (auth.status === 'terminated') return new Response(JSON.stringify({ status: "terminated", msg: "服務已終止" }));
            
            const roles = JSON.parse(auth.角色設定 || '{}');
            let adv = {}; try { adv = JSON.parse(auth.advanced_settings || '{}'); } catch(e){}
            let subjects = {}; try { subjects = JSON.parse(auth.科目設定 || '{}'); } catch(e){}
            
            return new Response(JSON.stringify({ status: "login", roles: roles, subjects: subjects, groupName: auth.群組名稱, advanced: adv }));
        }

        if (action === "admin_login") {
            const auth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(groupId).first();
            if(!auth) return new Response(JSON.stringify({ status: "fail", msg: "ID錯誤" }));
            if (auth.status === 'terminated') return new Response(JSON.stringify({ status: "fail", msg: "服務已終止" }));
            
            let roles = JSON.parse(auth.角色設定);
            const role = roles[json.roleName];
            if(!role) return new Response(JSON.stringify({ status: "fail", msg: "角色不存在" }));
            
            let success = false;
            let needsUpdate = false;
            const inputPwd = (json.password || "").trim();

            if (!role.hash || role.hash === "") { success = true; } 
            else if (role.hash.startsWith("pbkdf2$")) { success = await verifyPassword(inputPwd, role.hash); } 
            else { if (role.hash === await sha256(inputPwd)) { success = true; needsUpdate = true; } }

            if(success) {
                if (needsUpdate && inputPwd) {
                    role.hash = await hashPassword(inputPwd);
                    roles[json.roleName] = role;
                    await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), groupId).run();
                }
                if (json.roleName === "Administrator" || json.roleName === "總管理員") {
                    if (!role.binding_code && !role.owner_line_id) {
                        role.binding_code = Math.floor(1000 + Math.random() * 9000).toString();
                        roles[json.roleName] = role;
                        await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), groupId).run();
                    }
                }
                let adv = {}; try { adv = JSON.parse(auth.advanced_settings || '{}'); } catch(e){}
                let subjects = {}; try { subjects = JSON.parse(auth.科目設定); } catch(e){}
                
                await writeLog(env, groupId, json.roleName, "登入成功", "", request);
                return new Response(JSON.stringify({ 
                    status: "success", roleData: role, allRoles: roles, subjects: subjects, groupName: auth.群組名稱, advanced: adv 
                }));
            }
            await writeLog(env, groupId, json.roleName, "登入失敗", "密碼錯誤", request);
            return new Response(JSON.stringify({ status: "fail", msg: "密碼錯誤" }));
        }

// --- END OF PART 2 ---


// --- START OF PART 3 ---
        if (action === "update_settings") {
            const auth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(groupId).first();
            let roles = JSON.parse(auth.角色設定 || '{}');
            const actorName = json.roleName || "Student";
            const actor = roles[actorName];
            const isFullAdmin = actorName === "Administrator" || actorName === "總管理員";
            const hasSettingsPerm = actor?.perm?.includes("manage_settings");
            if (!actor || (!isFullAdmin && !hasSettingsPerm)) return new Response(JSON.stringify({ status: "fail", msg: "權限不足" }));

            if(json.advancedSettings) {
                if (json.advancedSettings.ai_enabled === true) {
                    const policyRes = await env.DB.prepare("SELECT value FROM system_settings WHERE key = ?").bind(`policy:${groupId}`).first();
                    let aiAllowed = true; 
                    if (policyRes && policyRes.value) { try { aiAllowed = JSON.parse(policyRes.value).ai_allowed !== false; } catch(e){} }
                    if (!aiAllowed) return new Response(JSON.stringify({ status: "fail", msg: "AI功能暫時無法使用，待功能開啟時才可使用" }));
                }
                let oldAdv = {}; try { oldAdv = JSON.parse(auth.advanced_settings || '{}'); } catch(e){}
                const newAdv = { ...oldAdv, ...json.advancedSettings };
                if (newAdv.periods) { for(let k in newAdv.periods) { if(!newAdv.periods[k]) delete newAdv.periods[k]; } }
                await env.DB.prepare("UPDATE group_auth SET advanced_settings = ? WHERE group_id = ?").bind(JSON.stringify(newAdv), groupId).run();
            }
            if(json.subjects) {
                if (!isFullAdmin && !actor.subjects.includes('all')) {
                     const oldSub = JSON.parse(auth.科目設定 || '{}');
                     for (let s in json.subjects) { if (!actor.subjects.includes(s) && !oldSub[s]) return new Response(JSON.stringify({ status: "fail", msg: `您無權管理科目: ${s}` })); }
                }
                await env.DB.prepare("UPDATE group_auth SET 科目設定 = ? WHERE group_id = ?").bind(JSON.stringify(json.subjects), groupId).run();
            }
            if(json.settings && json.settings.roles) {
                if (!isFullAdmin && !actor.perm.includes("manage_roles")) return new Response(JSON.stringify({ status: "fail", msg: "無成員管理權限" }));
                const incomingRoles = json.settings.roles;
                if (!incomingRoles["Administrator"] && roles["Administrator"]) incomingRoles["Administrator"] = roles["Administrator"];
                if (!incomingRoles["總管理員"] && roles["總管理員"]) incomingRoles["總管理員"] = roles["總管理員"];

                for (let [name, data] of Object.entries(incomingRoles)) {
                    if (!isFullAdmin) {
                        const newPerms = data.perm || [];
                        const illegalPerms = newPerms.filter(p => !actor.perm.includes(p));
                        if (illegalPerms.length > 0) return new Response(JSON.stringify({ status: "fail", msg: "無法賦予未擁有的權限" }));
                    }
                    let hash = data.hash || roles[name]?.hash || "";
                    if (data.password && data.password.trim() !== "") hash = await hashPassword(data.password.trim());
                    incomingRoles[name] = { ...data, hash: hash, perm: data.perm || roles[name]?.perm || [], subjects: data.subjects || roles[name]?.subjects || [], rec: roles[name]?.rec || data.rec, owner_line_id: roles[name]?.owner_line_id || data.owner_line_id, binding_code: roles[name]?.binding_code || data.binding_code };
                    delete incomingRoles[name].password;
                }
                roles = incomingRoles;
                await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), groupId).run();
                await writeLog(env, groupId, actorName, "更新成員", "", request);
                await triggerDataUpdate(env, groupId);
                return new Response(JSON.stringify({ status: "success", newRoles: roles }));
            }
            if(json.deleteRole) {
                const delName = json.deleteRole;
                if(delName === "Administrator" || delName === "總管理員" || delName === actorName) return new Response(JSON.stringify({ status: "fail", msg: "無法刪除此管理員" }));
                delete roles[delName];
                await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), groupId).run();
                await writeLog(env, groupId, actorName, "刪除成員", delName, request);
                return new Response(JSON.stringify({ status: "success", newRoles: roles }));
            }
            await triggerDataUpdate(env, groupId);
            await writeLog(env, groupId, actorName, "更新設定", "", request);
            return new Response(JSON.stringify({ status: "success" }));
        }

        if (action === "admin_setup") {
            const pwd = (json.password || "").trim();
            const hash = pwd ? await hashPassword(pwd) : "";
            const rescueCode = genRescueCode();
            const initialRoles = { "Administrator": { hash: hash, subjects: ["all"], perm: ["manage_roles", "manage_settings", "manage_tasks_full"], level: 99, rec: rescueCode } };
            const defaultSubjects = JSON.stringify({ 
                '國文': ['國文', '國語'], '英文': ['英文'], '數學': ['數學'], '地理': ['地理'], 
                '歷史': ['歷史'], '公民': ['公民'], '理化': ['理化', '物理', '化學'], '生物': ['生物'], 
                '地科': ['地科', '地球科學'], '資訊': ['資訊', '電腦'], '體育': ['體育'], '美術': ['美術'], '其他': [] 
            });
            await env.DB.prepare("INSERT OR REPLACE INTO group_auth (group_id, 群組名稱, 角色設定, 科目設定, status, version) VALUES (?, ?, ?, ?, 'active', ?)").bind(groupId, json.groupName, JSON.stringify(initialRoles), defaultSubjects, CURRENT_VERSION).run();
            await writeLog(env, groupId, "System", "初始化群組", `Name: ${json.groupName}`, request);
            return new Response(JSON.stringify({ status: "success", recoveryCode: rescueCode }));
        }

        if (action === "change_password") {
            const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(groupId).first();
            let roles = JSON.parse(auth.角色設定);
            const role = roles[json.roleName];
            if(!role) return new Response(JSON.stringify({ status: "fail", msg: "角色不存在" }));
            if(role.hash && role.hash !== "") {
                let valid = false;
                if (role.hash.startsWith("pbkdf2$")) valid = await verifyPassword(json.oldPassword, role.hash);
                else valid = (role.hash === await sha256(json.oldPassword));
                if (!valid) return new Response(JSON.stringify({ status: "fail", msg: "舊密碼錯誤" }));
            }
            role.hash = await hashPassword(json.newPassword);
            roles[json.roleName] = role;
            await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), groupId).run();
            await writeLog(env, groupId, json.roleName, "修改密碼", "", request);
            return new Response(JSON.stringify({ status: "success" }));
        }

        if (action === "admin_reset_pwd") {
            const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(groupId).first();
            let roles = JSON.parse(auth.角色設定);
            const role = roles[json.roleName]; 
            if (!role || role.rec !== json.recoveryCode) return new Response(JSON.stringify({ status: "fail", msg: "救援碼錯誤" }));
            const newPwd = (json.newPassword || "").trim();
            role.hash = newPwd ? await hashPassword(newPwd) : "";
            role.rec = genRescueCode();
            roles[json.roleName] = role;
            await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), groupId).run();
            await writeLog(env, groupId, json.roleName, "救援密碼重置", "", request);
            return new Response(JSON.stringify({ status: "success", newRecoveryCode: role.rec }));
        }

        if (action === "get_tasks" || action === "admin_get_tasks") {
            const auth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(groupId).first();
            if(!auth) return new Response(JSON.stringify({ tasks: [], error: "找不到群組" }));
            if (auth.status === 'terminated') return new Response(JSON.stringify({ tasks: [], error: "TERMINATED", msg: "服務已終止" }));
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
            const auth = await env.DB.prepare("SELECT 角色設定, advanced_settings FROM group_auth WHERE group_id = ?").bind(groupId).first();
            const roles = JSON.parse(auth.角色設定);
            const actor = roles[json.roleName];
            if (json.isAdmin) {
                if (!actor) return new Response(JSON.stringify({ status: "fail", msg: "Access Denied" }));
                const canManageAll = actor.perm.includes("manage_tasks_full") || json.roleName === "Administrator";
                const canManageSub = actor.subjects.includes("all") || actor.subjects.includes(json.subject);
                if (!canManageAll && !canManageSub) return new Response(JSON.stringify({ status: "fail", msg: "無此科目的新增權限" }));
            }
            let status = json.isAdmin ? "已發佈" : "待審核";
            let dueTime = json.dueTime || null;
            if(!dueTime && json.content) {
                let periods = {}; try { periods = JSON.parse(auth.advanced_settings).periods; } catch(e){}
                dueTime = parseTimeFromText(json.content, periods);
            }
            await env.DB.prepare(`INSERT INTO tasks (群組, 建立時間, 截止日期, due_time, 科目, 內容, 狀態, 類別, 來源) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`).bind(groupId, Date.now(), json.date, dueTime, json.subject || "未分類", json.content, status, json.category, "網頁", 1).run();
            await triggerDataUpdate(env, groupId);
            if(json.isAdmin) await writeLog(env, groupId, json.roleName || "Admin", "新增作業", json.content, request);
            return new Response(JSON.stringify({ status: "success" }));
        }

// --- END OF PART 3 ---

// --- START OF PART 4 ---

if (action === "update_task") {
    const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(groupId).first();
    const roles = JSON.parse(auth.角色設定);
    const actor = roles[json.roleName];
    const task = await env.DB.prepare("SELECT 科目 FROM tasks WHERE id = ?").bind(json.taskId).first();
    if (!task) return new Response(JSON.stringify({ status: "fail", msg: "作業不存在" }));
    const canManageAll = actor.perm.includes("manage_tasks_full") || json.roleName === "Administrator";
    const canManageSub = actor.subjects.includes("all") || actor.subjects.includes(task.科目);
    if (!canManageAll && !canManageSub) return new Response(JSON.stringify({ status: "fail", msg: "無權限修改此科目作業" }));

    const isHidden = json.is_hidden ? 1 : 0;
    const displayTime = json.display_start_time || null;
    await env.DB.prepare(`UPDATE tasks SET 截止日期 = ?, due_time = ?, 科目 = ?, 內容 = ?, 類別 = ?, is_hidden = ?, display_start_time = ? WHERE id = ?`)
        .bind(json.date, json.dueTime, json.subject, json.content, json.category, isHidden, displayTime, json.taskId).run();
    
    await triggerDataUpdate(env, groupId);
    await writeLog(env, groupId, json.roleName || "Admin", "更新作業", `ID:${json.taskId}`, request);
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
        await writeLog(env, groupId, json.roleName || "Admin", "刪除作業", `ID:${json.taskId}`, request);
    } else if(json.type === 'approve') {
        await env.DB.prepare("UPDATE tasks SET 狀態 = '已發佈' WHERE id = ?").bind(json.taskId).run();
        await writeLog(env, groupId, json.roleName || "Admin", "核准作業", `ID:${json.taskId}`, request);
    }
    await triggerDataUpdate(env, groupId);
    return new Response(JSON.stringify({ status: "success" }));
}

// --- 勘誤建議 ---

if (action === "submit_suggestion") {
    await env.DB.prepare("INSERT INTO task_suggestions (task_id, group_id, suggested_by, suggestion_content, suggestion_subject, suggestion_category, status, created_at) VALUES (?, ?, 'Student_FE', ?, ?, ?, 'pending', ?)")
        .bind(json.taskId, groupId, json.content, json.subject, json.category, Date.now()).run();
    await triggerDataUpdate(env, groupId);
    await writeLog(env, groupId, "Frontend", "提交建議", `Task:${json.taskId}`, request);
    return new Response(JSON.stringify({ status: "success" }));
}

if (action === "admin_approve_suggestion") {
    const sug = await env.DB.prepare("SELECT * FROM task_suggestions WHERE id = ?").bind(json.suggestionId).first();
    if(!sug) return new Response(JSON.stringify({ status: "fail", msg: "Suggestion not found" }));
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
    await writeLog(env, groupId, json.roleName || "Admin", "核准建議", `ID:${json.suggestionId}`, request);
    return new Response(JSON.stringify({ status: "success" }));
}

if (action === "admin_reject_suggestion") {
    const sug = await env.DB.prepare("SELECT * FROM task_suggestions WHERE id = ?").bind(json.suggestionId).first();
    if(!sug) return new Response(JSON.stringify({ status: "fail" }));
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
// ★ Super Admin 邏輯 (支援設定儲存與敏感操作密碼驗證)
// ====================================================================
async function handleSuperAdminAction(action, json, env, ip, request) {
    const superPwd = env[SUPER_ADMIN_PASSWORD_ENV_KEY];
    if (!superPwd || json.password !== superPwd) {
        if(action === "super_admin_login") await writeLog(env, "SYSTEM", "SuperAdmin", "登入失敗", "密碼錯誤", request);
        return new Response(JSON.stringify({ status: "fail", msg: "密碼錯誤" }));
    }

    // ★ 修復：敏感操作密碼驗證邏輯
    if (["super_admin_delete_group", "super_admin_reset_group_data"].includes(action)) {
        const config = await getSystemConfig(env);
        const secPolicy = config.security_policy || {};
        
        // 只有在「已啟用」且「密碼不為空」時才檢查
        if (secPolicy.require_password_for_destructive_actions === true) {
            const serverSidePwd = (secPolicy.action_password || "").trim();
            const clientSidePwd = (json.actionPassword || "").trim();
            
            if (serverSidePwd !== clientSidePwd) {
                await writeLog(env, "System", "SuperAdmin", "敏感操作阻擋", `動作:${action} / 原因:密碼錯誤`, request);
                return new Response(JSON.stringify({ status: "fail", msg: "操作密碼錯誤或未輸入" }));
            }
        }
    }

    if (action === "super_admin_login") return new Response(JSON.stringify({ status: "success" }));

    if (action === "super_admin_get_data") {
        const config = await getSystemConfig(env);
        const { results } = await env.DB.prepare("SELECT group_id, 群組名稱, 角色設定 FROM group_auth").all();
        const groups = results.map(g => {
            let roles = {}; 
            let rescue = "無", restore = "無", isBound = false, hasPwd = false;
            try { 
                roles = JSON.parse(g.角色設定); 
                const admin = roles["Administrator"] || roles["總管理員"];
                if(admin) {
                    rescue = admin.rec || "無";
                    restore = admin.restore_key || "無"; 
                    if(admin.owner_line_id) isBound = true;
                    if(admin.hash) hasPwd = true;
                }
            } catch (e) { rescue = "資料損毀"; }
            return { id: g.group_id, name: g.群組名稱 || '未命名', rescue_code: rescue, restore_code: restore, is_bound: isBound, has_pwd: hasPwd };
        });
        return new Response(JSON.stringify({ status: "success", config: config, groups: groups }));
    }

    if (action === "super_admin_get_group_policy") {
        const res = await env.DB.prepare("SELECT value FROM system_settings WHERE key = ?").bind(`policy:${json.targetGroupId}`).first();
        const policy = res ? JSON.parse(res.value) : { ai_allowed: true }; 
        return new Response(JSON.stringify({ status: "success", policy: policy }));
    }

    if (action === "super_admin_set_group_policy") {
        const key = `policy:${json.targetGroupId}`;
        const policy = { ai_allowed: json.ai_allowed };
        await env.DB.prepare("INSERT INTO system_settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at")
            .bind(key, JSON.stringify(policy), Date.now()).run();
        return new Response(JSON.stringify({ status: "success" }));
    }

    if (action === "super_admin_save_settings") {
        const currentConfig = await getSystemConfig(env);
        const newConfig = { ...currentConfig, ...json.settings };
        await env.DB.prepare("INSERT INTO system_settings (key, value, updated_at) VALUES ('system_config', ?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at")
            .bind(JSON.stringify(newConfig), Date.now()).run();
        await writeLog(env, "System", "SuperAdmin", "更新全域設定", "", request);
        return new Response(JSON.stringify({ status: "success" }));
    }

    if (action === "super_admin_set_maintenance") {
        const currentConfig = await getSystemConfig(env);
        currentConfig.maintenance = json.maintenance;
        await env.DB.prepare("INSERT INTO system_settings (key, value, updated_at) VALUES ('system_config', ?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at")
            .bind(JSON.stringify(currentConfig), Date.now()).run();
        await writeLog(env, "System", "SuperAdmin", "設定維護模式", JSON.stringify(json.maintenance), request);
        return new Response(JSON.stringify({ status: "success" }));
    }

    if (action === "super_admin_get_logs") {
        const page = json.page || 1;
        const limit = json.limit || 50;
        const offset = (page - 1) * limit;
        const { results } = await env.DB.prepare(`SELECT * FROM logs ORDER BY timestamp DESC LIMIT ? OFFSET ?`).bind(limit, offset).all();
        return new Response(JSON.stringify({ status: "success", logs: results }));
    }
    
    if (action === "super_admin_clear_logs") {
        await env.DB.prepare("DELETE FROM logs").run();
        await writeLog(env, "System", "SuperAdmin", "清空日誌", "已手動清空所有紀錄", request);
        return new Response(JSON.stringify({ status: "success" }));
    }

    if (action === "super_admin_delete_group") { 
        const gId = json.targetGroupId;
        await env.DB.prepare("DELETE FROM group_auth WHERE group_id = ?").bind(gId).run(); 
        await env.DB.prepare("DELETE FROM tasks WHERE 群組 = ?").bind(gId).run(); 
        await env.DB.prepare("DELETE FROM line_user_state WHERE group_id = ?").bind(gId).run();
        await env.DB.prepare("DELETE FROM group_agreements WHERE group_id = ?").bind(gId).run();
        await env.DB.prepare("DELETE FROM task_suggestions WHERE group_id = ?").bind(gId).run();
        await env.DB.prepare("DELETE FROM system_settings WHERE key = ?").bind(`policy:${gId}`).run(); 
        await writeLog(env, "System", "SuperAdmin", "刪除群組", `Deleted ${gId}`, request);
        return new Response(JSON.stringify({ status: "success" })); 
    }

    if (action === "super_admin_reset_group_data") {
         const gId = json.targetGroupId;
         await env.DB.prepare("DELETE FROM tasks WHERE 群組 = ?").bind(gId).run();
         await env.DB.prepare("DELETE FROM line_user_state WHERE group_id = ?").bind(gId).run();
         await env.DB.prepare("DELETE FROM group_agreements WHERE group_id = ?").bind(gId).run();
         await env.DB.prepare("DELETE FROM task_suggestions WHERE group_id = ?").bind(gId).run();
         
         const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(gId).first();
         let adminData = { hash: "", subjects: ["all"], perm: ["manage_roles", "manage_settings", "manage_tasks_full"], level: 99, rec: genRescueCode(), binding_code: Math.floor(1000 + Math.random() * 9000).toString() };
         if(auth && auth.角色設定) {
             try { 
                 const oldRoles = JSON.parse(auth.角色設定); 
                 const oldAdmin = oldRoles["Administrator"] || oldRoles["總管理員"];
                 if (oldAdmin) {
                     if(oldAdmin.rec) adminData.rec = oldAdmin.rec;
                     if(oldAdmin.binding_code) adminData.binding_code = oldAdmin.binding_code;
                     if(oldAdmin.owner_line_id) adminData.owner_line_id = oldAdmin.owner_line_id;
                     if(oldAdmin.restore_key) adminData.restore_key = oldAdmin.restore_key;
                 }
             } catch(e) {}
         }
         const newRoles = { "Administrator": adminData };
         const defaultSubjects = JSON.stringify({ 
            '國文': ['國文', '國語'], '英文': ['英文'], '數學': ['數學'], '地理': ['地理'], 
            '歷史': ['歷史'], '公民': ['公民'], '理化': ['理化', '物理', '化學'], '生物': ['生物'], 
            '地科': ['地科', '地球科學'], '資訊': ['資訊', '電腦'], '體育': ['體育'], '美術': ['美術'], '其他': [] 
         });
         await env.DB.prepare("UPDATE group_auth SET 角色設定 = ?, 科目設定 = ?, advanced_settings = '{}', is_locked = 0, status = 'active' WHERE group_id = ?")
            .bind(JSON.stringify(newRoles), defaultSubjects, gId).run();
         
         await writeLog(env, "System", "SuperAdmin", "重置群組狀態", `Reset ${gId} (Deep Clean)`, request);
         return new Response(JSON.stringify({ status: "success" }));
    }

    if (action === "super_admin_regen_restore") { 
        const gId = json.targetGroupId; 
        const auth = await env.DB.prepare("SELECT 角色設定 as roles_json FROM group_auth WHERE group_id = ?").bind(gId).first(); 
        if(!auth) return new Response(JSON.stringify({ status: "fail", msg: "群組不存在" })); 
        let roles = JSON.parse(auth.roles_json); 
        const adminKey = roles["Administrator"] ? "Administrator" : "總管理員";
        if(roles[adminKey]) { 
            roles[adminKey].restore_key = Math.random().toString(36).substring(2, 12);
            await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), gId).run(); 
            return new Response(JSON.stringify({ status: "success", newRestoreCode: roles[adminKey].restore_key })); 
        } 
        return new Response(JSON.stringify({ status: "fail" })); 
    }

    return new Response(JSON.stringify({status: "fail", msg: "Unknown Super Admin Action"}));
}

// --- END OF PART 4 ---

// --- START OF PART 5 (Webhook Entry & System Commands) ---

// ====================================================================
// ★ LINE Webhook (處理 LINE 傳來的事件)
// ====================================================================
async function handleLineWebhook(events, env, ctx, origin) {
for (const event of events) {
    try {
        const gId = event.source.groupId || event.source.roomId;
        const uId = event.source.userId;
        const isPrivate = !gId; 

        if (event.type === 'leave' && gId) { 
            await env.DB.prepare("DELETE FROM group_agreements WHERE group_id = ?").bind(gId).run();
            await env.DB.prepare("UPDATE group_auth SET is_locked = 0, locking_user_id = NULL WHERE group_id = ?").bind(gId).run();
            await env.DB.prepare("DELETE FROM line_user_state WHERE group_id = ?").bind(gId).run();
            continue; 
        }

        if (event.type === 'memberJoined' && gId) {
            const newMembers = event.joined.members;
            if (newMembers.length > 0) {
                const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(gId).first();
                if (auth && auth.角色設定) {
                    await env.DB.prepare("UPDATE group_auth SET is_locked = 1, locking_user_id = ? WHERE group_id = ?").bind(newMembers[0].userId, gId).run();
                    const welcome = `⚠️ 有新成員加入！\n為確保所有成員權益，系統暫停服務。\n\n🟢 同意：請輸入 /bot agree\n🔴 不同意：請輸入 /bot disagree`;
                    ctx.waitUntil(replyLineMessageWithButton(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, welcome, "點擊此處查看服務條款", `${origin}/terms`));
                }
            }
            continue;
        }

        if (event.type !== 'message' || event.message.type !== 'text') continue;
        const text = event.message.text.trim();

        // ★ /bot test (健康檢查與維護狀態 - 格式修正版)
        if (text === '/bot test') {
            let isAllowed = isPrivate;
            if (!isPrivate) {
                const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(gId).first();
                if (auth) {
                    try {
                        const roles = JSON.parse(auth.角色設定);
                        const admin = roles['Administrator'] || roles['總管理員'];
                        if (admin && admin.owner_line_id === uId) isAllowed = true;
                    } catch(e){}
                }
            }
            if (!isAllowed) continue;

            const start = Date.now();
            await env.DB.prepare("SELECT 1").first();
            const dbLatency = Date.now() - start;
            const cfLatency = Math.floor(dbLatency * 1.2 + 10); // 估算值

            const config = await getSystemConfig(env);
            const fe = config.maintenance?.frontend;
            const be = config.maintenance?.backend;
            
            const isFeActive = fe && fe.enabled && (!fe.end || Date.now() <= new Date(fe.end).getTime());
            const isBeActive = be && be.enabled && (!be.end || Date.now() <= new Date(be.end).getTime());
            
            const fmtDate = (iso) => {
                if(!iso) return "";
                return new Date(iso).toLocaleString('zh-TW', {year:'numeric', month:'2-digit', day:'2-digit', hour12:true, hour:'2-digit', minute:'2-digit'});
            };

            const feStatus = isFeActive 
                ? `⚠️ 前端 : ${MAINT_MODES[fe.type] || fe.type} ${fe.end ? `(預計結束時間 ${fmtDate(fe.end)})` : ''}` 
                : "✅ 前端 : 正常運作";
                
            const beStatus = isBeActive 
                ? `⚠️ 後端 : ${MAINT_MODES[be.type] || be.type} ${be.end ? `(預計結束時間 ${fmtDate(be.end)})` : ''}` 
                : "✅ 後端 : 正常運作";

            let report = `Worker 健康檢查報告：\n✅ Cloudflare : 延遲 ${cfLatency}ms\n✅ D1資料庫 : 延遲 ${dbLatency}ms\n${feStatus}\n${beStatus}`;
            
            ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, report));
            continue;
        }

        // ★ /bot reboot (強制修復)
        if (text === '/bot reboot') {
            if (gId) {
                await env.DB.prepare("UPDATE group_auth SET status = 'active', terminated_at = NULL, is_locked = 1, locking_user_id = NULL WHERE group_id = ?").bind(gId).run();
                await env.DB.prepare("DELETE FROM group_agreements WHERE group_id = ?").bind(gId).run();
                await env.DB.prepare("DELETE FROM line_user_state WHERE group_id = ?").bind(gId).run();
                ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `✅ 服務已強制重啟！\n所有成員需重新輸入 /bot agree 同意條款才能繼續使用。`));
            }
            continue;
        }

        // ★ 私訊綁定邏輯 (/bind)
        if (isPrivate) {
            if (text.startsWith('/bind ')) {
                const code = text.replace('/bind ', '').trim();
                const { results } = await env.DB.prepare("SELECT group_id, 角色設定 FROM group_auth").all();
                let foundGroup = null;
                for(const g of results) { 
                    try { 
                        let roles = JSON.parse(g.角色設定); 
                        const admin = roles["Administrator"] || roles["總管理員"];
                        if (admin && admin.binding_code === code) { 
                            admin.binding_code = null; 
                            admin.owner_line_id = uId; 
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
                const stateEntry = await env.DB.prepare("SELECT group_id FROM line_user_state WHERE user_id = ?").bind(uId).first();
                if(stateEntry && stateEntry.group_id) {
                     const g = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(stateEntry.group_id).first();
                     if(g) {
                         const r = JSON.parse(g.角色設定);
                         const admin = r["Administrator"] || r["總管理員"];
                         if(admin?.owner_line_id === uId) {
                             ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `🔑 復原碼：${admin.rec}`));
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

        if (text.startsWith('/bind ')) {
            ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "🚫 為了安全，請在與機器人的「個人聊天」中使用 /bind 指令。"));
            continue;
        }

// --- END OF PART 5 ---

// --- START OF PART 6 (Fix Logic & Syntax) ---

// --- 接續 Part 5 的 try 區塊 ---

if (text === '/bot help') { 
    const helpMsg = `🤖 指令清單：\n🔹 /bot 學生：取得學生網址\n🔹 /bot 後台：取得後台網址\n🔹 /bot 復原碼：顯示復原碼 (限私訊)\n🔹 /bot ID：顯示群組 ID\n\n⚙️ 管理指令：\n/bind <4碼>：綁定管理員(限私訊)\n\n⚙️ 其他：\n/bot newID：生成新群組\n/bot <ID>：沿用舊設定\n/bot test：系統診斷(限管理員)\n/bot reboot：重啟服務`; 
    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, helpMsg)); 
    continue; 
}

// 取得群組基本資料 (用於判斷狀態)
const groupAuth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(gId).first();

// ★ 隱藏指令：/bot allagree (強制解鎖，並不需綁定特定使用者狀態)
if (text === '/bot allagree' && gId) {
    await env.DB.prepare("INSERT OR IGNORE INTO group_auth (group_id) VALUES (?)").bind(gId).run();
    // 強制解鎖並更新版本
    await env.DB.prepare("UPDATE group_auth SET is_locked = 0, locking_user_id = NULL, version = ? WHERE group_id = ?").bind(TERMS_VERSION, gId).run();
    
    // 判斷是否需要初始化 (若無角色設定)
    let setupHint = "";
    const currentRoles = groupAuth ? groupAuth.角色設定 : null;
    if (!currentRoles || currentRoles === '{}') {
        setupHint = "\n\n請輸入 `/bot newID` (建立新群組) 或 `/bot <舊ID>` (沿用舊設定)。";
    }

    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `㊙️ 隱藏指令生效：已強制全員同意條款，服務已解鎖。${setupHint}`));
    continue;
}

// 檢查是否已終止
if (groupAuth && groupAuth.status === 'terminated') continue; 

// 取得使用者狀態
let userState = await env.DB.prepare("SELECT * FROM line_user_state WHERE user_id = ? AND group_id = ?").bind(uId, gId).first();

// 檢查是否因「條款更新」或「新成員加入」而鎖定
// 邏輯：(版本不同 OR 被鎖定) AND 還沒同意
const isVersionMismatch = groupAuth && groupAuth.version !== TERMS_VERSION;
const isLocked = groupAuth && groupAuth.is_locked === 1;
const hasAgreed = await env.DB.prepare("SELECT 1 FROM group_agreements WHERE group_id = ? AND user_id = ?").bind(gId, uId).first();

// 若版本不符，先鎖定群組
if (isVersionMismatch && !isLocked) {
    await env.DB.prepare("UPDATE group_auth SET is_locked = 1 WHERE group_id = ?").bind(gId).run();
    await env.DB.prepare("DELETE FROM group_agreements WHERE group_id = ?").bind(gId).run(); // 清空舊同意紀錄
    ctx.waitUntil(replyLineMessageWithButton(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `🔄 服務條款已更新 (${TERMS_VERSION})！\n為確保權益，請全體成員重新同意。\n\n${CHANGELOG}\n\n🟢 同意：/bot agree\n🔴 不同意：/bot disagree`, "閱讀條款", `${origin}/terms?ack=1`));
    continue;
}

// ★ /bot start (初始化)
if (text === '/bot start') {
    await env.DB.prepare("INSERT OR IGNORE INTO group_auth (group_id) VALUES (?)").bind(gId).run();
    // 若版本舊，鎖定之
    if (isVersionMismatch) {
        await env.DB.prepare("UPDATE group_auth SET is_locked = 1 WHERE group_id = ?").bind(gId).run();
    }
    const agreeMsg = `[條款版本: ${TERMS_VERSION}]\n請點擊連結閱讀條款，並依照以下指令操作：\n\n🟢 同意：請輸入 /bot agree\n🔴 不同意：請輸入 /bot disagree`;
    ctx.waitUntil(replyLineMessageWithButton(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, agreeMsg, "閱讀服務條款", `${origin}/terms`));
    continue; 
}

// --- 狀態機邏輯 ---

// 1. 鎖定狀態 (等待同意)
if (isLocked || isVersionMismatch) {
    if (text === '/bot agree') {
        if (!hasAgreed) {
            await env.DB.prepare("INSERT OR IGNORE INTO group_agreements (group_id, user_id) VALUES (?, ?)").bind(gId, uId).run();
        }
        
        // 檢查全員是否同意
        if(await checkAllAgreed(env, gId)) {
            // 解鎖並更新版本
            await env.DB.prepare("UPDATE group_auth SET is_locked = 0, locking_user_id = NULL, version = ? WHERE group_id = ?").bind(TERMS_VERSION, gId).run();
            
            // 檢查是否需要設定 ID
            // 重新讀取最新的 auth 狀態
            const freshAuth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(gId).first();
            const isConfigured = freshAuth && freshAuth.角色設定 && freshAuth.角色設定 !== '{}';

            if (!isConfigured) {
                 ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `✅ 全體成員皆已同意！\n請輸入 \`/bot newID\` (建立新群組) 或 \`/bot <舊ID>\` (沿用舊設定)。`));
            } else {
                 ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `✅ 條款更新完畢，服務已恢復！\n${getExistingWelcomeMessage(gId, origin)}`));
            }
        }
    } else if (text === '/bot disagree') {
        const terminatedAt = new Date().toISOString();
        await env.DB.prepare("UPDATE group_auth SET status = 'terminated', terminated_at = ? WHERE group_id = ?").bind(terminatedAt, gId).run();
        ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `🚨 服務緊急終止。\n因成員拒絕條款，服務已永久關閉。`));
    }
    // 鎖定期間不回應其他指令
    continue;
}

// 2. 設定狀態 (群組未鎖定，但尚未有角色設定)
// ★ 關鍵修復：不依賴使用者個人的 state，而是看群組是否「空設定」
const isGroupConfigured = groupAuth && groupAuth.角色設定 && groupAuth.角色設定 !== '{}';

if (!isGroupConfigured) {
    // 建立新群組
    if (text.startsWith('/bot newID')) {
        const sysConfig = await getSystemConfig(env);
        const policy = sysConfig.creation_policy || { mode: 'open', password: '' };
        let allow = false;
        let errMsg = "";

        if (policy.mode === 'closed') errMsg = "⛔ 系統目前禁止建立新群組。";
        else if (policy.mode === 'restricted') {
            const inputPwd = text.replace('/bot newID', '').trim();
            if (inputPwd === policy.password) allow = true;
            else errMsg = "🔒 此操作需要密碼，請輸入 /bot newID <密碼>";
        } else allow = true;

        if (!allow) {
            ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, errMsg));
            continue;
        }

        const rescueCode = genRescueCode();
        const bindingCode = Math.floor(1000 + Math.random() * 9000).toString();
        const initialRoles = { "Administrator": { hash: "", subjects: ["all"], perm: ["manage_roles", "manage_settings", "manage_tasks_full"], level: 99, rec: rescueCode, binding_code: bindingCode } };
        // 預設科目
        const defaultSubjects = JSON.stringify({ 
            '國文': ['國文', '國語'], '英文': ['英文'], '數學': ['數學'], '地理': ['地理'], 
            '歷史': ['歷史'], '公民': ['公民'], '理化': ['理化', '物理', '化學'], '生物': ['生物'], 
            '地科': ['地科', '地球科學'], '資訊': ['資訊', '電腦'], '體育': ['體育'], '美術': ['美術'], '其他': [] 
        });
        
        await env.DB.prepare("UPDATE group_auth SET 群組名稱 = ?, 角色設定 = ?, 科目設定 = ?, status = 'active', version = ?, is_locked = 0 WHERE group_id = ?").bind('未命名群組', JSON.stringify(initialRoles), defaultSubjects, TERMS_VERSION, gId).run();
        
        // 更新當前使用者狀態 (方便日後追蹤，非必要)
        await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'setup_complete')").bind(uId, gId).run();
        
        ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, getNewWelcomeMessage(gId, origin)));
        continue;
    }
    
    // 沿用舊群組
    if (text.startsWith('/bot ') && text.length > 6) {
         const inputId = text.replace('/bot ', '').trim();
         // 檢查該 ID 是否存在且已設定
         const oldGroup = await env.DB.prepare("SELECT group_id FROM group_auth WHERE group_id = ? AND 角色設定 IS NOT NULL").bind(inputId).first();
         
         if (oldGroup) {
            // 更新目前使用者的指標
            await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'setup_complete')").bind(uId, inputId).run();
            ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, getExistingWelcomeMessage(inputId, origin)));
         } else {
            ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, '❌ 找不到該 ID 或該群組尚未初始化。'));
         }
         continue;
    }
    
    // 若尚未設定，不處理其他指令 (或提示需設定)
    // 這裡選擇靜默，除非輸入指令錯誤
    if (text.startsWith('/bot')) {
         ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "⚠️ 此群組尚未初始化，請輸入 `/bot newID` 建立資料。"));
    }
    continue;
}

// 3. 正常運作狀態 (已設定且未鎖定)
const finalGid = userState?.group_id || gId; // 優先使用個人綁定的 ID (針對沿用舊 ID 的情況)

// 檢查禁用指令
let settings = {}; try { settings = JSON.parse(groupAuth.advanced_settings || '{}'); } catch(e){}
const disabledCmds = settings.disabled_commands || [];
if (text.startsWith('/bot') && disabledCmds.some(cmd => text.startsWith(cmd))) {
    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "🚫 此指令已被管理員禁用。"));
    continue;
}

// 刪除群組流程
if (text === '/bot end') { 
    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `⚠️ 確定要刪除 ${finalGid} 的所有資料嗎？\n請在 30 秒內輸入：確認刪除 ${finalGid}`)); 
    await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'awaiting_delete_confirm')").bind(uId, finalGid).run(); 
    continue; 
}
if (userState?.state === 'awaiting_delete_confirm' && text === `確認刪除 ${finalGid}`) { 
    await env.DB.prepare("DELETE FROM group_auth WHERE group_id = ?").bind(finalGid).run(); 
    await env.DB.prepare("DELETE FROM tasks WHERE 群組 = ?").bind(finalGid).run(); 
    await env.DB.prepare("DELETE FROM line_user_state WHERE group_id = ?").bind(finalGid).run(); 
    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "✅ 資料已刪除。")); 
    continue;
}

// 一般資訊指令
if (text === "/bot 學生" || text === "/bot student") { ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `📊 學生班級作業：\n${origin}/?id=${finalGid}`)); continue; } 
if (text === "/bot 後台" || text === "/bot manager") { ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `🔧 後台管理：\n${origin}/manager?id=${finalGid}`)); continue; } 
if (text === "/bot ID") { ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `Group ID:\n${finalGid}`)); continue; } 

// 作業判讀 (AI / 規則)
if (!text.startsWith('/')) {
    let subConfig = null; try { subConfig = JSON.parse(groupAuth.科目設定 || '{}'); } catch(e){}
    let periods = settings.periods || {};
    const ruleResult = parseTask(text, subConfig, periods); 
    
    if (ruleResult) {
        let status = (settings.approval_mode === 'auto') ? '已發佈' : '待審核';
        if (status === '已發佈' && DIRTY_WORDS.some(w => text.includes(w))) status = '待審核';
        try {
            await env.DB.prepare(`INSERT INTO tasks (群組, 建立時間, 截止日期, due_time, 科目, 內容, 來源, 狀態, 類別, is_reliable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`)
                .bind(finalGid, Date.now(), ruleResult.dStr, ruleResult.tStr, ruleResult.s, ruleResult.c, "LINE", status, ruleResult.cat).run(); 
            await triggerDataUpdate(env, finalGid);
        } catch (dbErr) {
            await writeLog(env, finalGid, "System", "作業寫入失敗", dbErr.message, null);
        }
    } else if (settings.ai_enabled) {
        const aiAnalysis = await analyzeMessageSmart(text, env);
        if (aiAnalysis.type === 'AI') {
            let tasks = aiAnalysis.split_tasks && aiAnalysis.split_tasks.length > 0 ? aiAnalysis.split_tasks : [aiAnalysis.content || text];
            const stmt = env.DB.prepare(`INSERT INTO tasks (群組, 建立時間, 截止日期, 科目, 內容, 來源, 狀態, 類別, is_reliable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
            const batch = tasks.map(c => stmt.bind(finalGid, Date.now(), "", aiAnalysis.subject || '未分類', c, "LINE", '待審核', "作業", 0));
            try {
                await env.DB.batch(batch);
                await triggerDataUpdate(env, finalGid);
            } catch (dbErr) {
                await writeLog(env, finalGid, "System", "AI作業寫入失敗", dbErr.message, null);
            }
        }
    }
}

} catch (err) { 
    console.error("Webhook Error:", err); 
    try { await writeLog(env, "SYSTEM", "Webhook", "CriticalError", err.message, null); } catch(e){}
}
} // End of for loop
return new Response("ok");
} // End of handleLineWebhook

// --- END OF PART 6 ---

// --- START OF PART 7 (Helper Fixes) ---

// ====================================================================
// ★ 輔助函式區 (Helpers)
// ====================================================================

async function hashPassword(password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), {name: "PBKDF2"}, false, ["deriveBits", "deriveKey"]);
    const key = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" }, keyMaterial, 256);
    const hashHex = Array.from(new Uint8Array(key)).map(b => b.toString(16).padStart(2, '0')).join('');
    const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
    return `pbkdf2$${saltHex}$${hashHex}`;
}

async function verifyPassword(password, storedHash) {
    if (!storedHash.startsWith("pbkdf2$")) return false;
    const [_, saltHex, hashHex] = storedHash.split('$');
    const salt = new Uint8Array(saltHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), {name: "PBKDF2"}, false, ["deriveBits", "deriveKey"]);
    const key = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" }, keyMaterial, 256);
    const newHashHex = Array.from(new Uint8Array(key)).map(b => b.toString(16).padStart(2, '0')).join('');
    return newHashHex === hashHex;
}

async function sha256(message) { 
    const msgBuffer = new TextEncoder().encode(message); 
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer); 
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join(''); 
}

async function analyzeMessageSmart(text, env) {
    if (!text || text.length < 2 || text.length > 800) return { type: 'IGNORE' };
    let config = await getAIUsageConfig(env);
    if (!config.enabled || config.used_today >= config.daily_limit) return { type: 'MANUAL', reason: 'LIMIT_REACHED' };

    try {
        const prompt = `分析此訊息是否為作業/考試/攜帶物品通知。\n訊息:"${text}"\n若不是，回傳 {"is_task":false}。\n若是，回傳 {"is_task":true, "subject":"科目", "summary":"內容", "split_tasks":["任務1","任務2"]}\n請只回傳純 JSON 格式。`;
        const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', { messages: [{ role: "user", content: prompt }] });
        let rawText = response.response || (typeof response === 'string' ? response : JSON.stringify(response));
        let res = { is_task: false };
        const match = rawText.match(/\{[\s\S]*\}/);
        if (match) { try { res = JSON.parse(match[0]); } catch(e) {} }
        
        config.used_today += 1;
        await updateAIConfig(env, config);
        if (res.is_task === false) return { type: 'IGNORE' };
        return { type: 'AI', subject: res.subject || '未分類', content: res.summary || text, split_tasks: res.split_tasks || [res.summary || text] };
    } catch (e) { return { type: 'MANUAL', reason: 'AI_ERROR' }; }
}

async function getSystemConfig(env) {
    try {
        const res = await env.DB.prepare("SELECT value FROM system_settings WHERE key = 'system_config'").first();
        if (res && res.value) return JSON.parse(res.value);
    } catch(e) {}
    return { maintenance: { frontend: { enabled: false, type: "off", message: "", end: "" }, backend: { enabled: false, type: "off", message: "", end: "" } } };
}

async function getAIUsageConfig(env) {
  let r = await env.DB.prepare("SELECT value FROM system_settings WHERE key = 'ai_config'").first();
  let c = r ? JSON.parse(r.value) : { enabled: true, daily_limit: 50, used_today: 0, last_reset: 0 };
  const now = Date.now();
  if (now - c.last_reset > 86400000) { c.used_today = 0; c.last_reset = now; await updateAIConfig(env, c); }
  return c;
}

async function updateAIConfig(env, c) { await env.DB.prepare("INSERT INTO system_settings (key, value, updated_at) VALUES ('ai_config', ?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at").bind(JSON.stringify(c), Date.now()).run(); }
async function triggerDataUpdate(env, groupId) { try { await env.DB.prepare("UPDATE group_auth SET last_data_update = ? WHERE group_id = ?").bind(Date.now(), groupId).run(); } catch(e) {} }

function parseTask(text, subjectConfig, periods) { 
    let targetDate = null, content = text; 
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

    const timeRes = parseTimeFromText(content, periods);
    if(timeRes) content = content.replace(/第[一二三四五六七八\d]節(下課)?/g, "").replace(/\d{1,2}[:：]\d{1,2}/g, "");

    content = content.replace(/要交|要考|截止|作業|要帶|記得|繳交/g, "").trim(); 
    let cat = text.includes("考") ? "考試" : (text.includes("帶") ? "攜帶" : "作業");
    let sub = "其他"; 
    
    // ★ 關鍵防呆：若 subjectConfig 為空，強制使用預設值
    const defaults = { "國語": ["國文", "國語"], "英文": ["英文"], "數學": ["數學"], "自然": ["自然", "生物", "理化"], "社會": ["社會", "歷史", "地理", "公民"] };
    const subs = (subjectConfig && Object.keys(subjectConfig).length > 0) ? subjectConfig : defaults;
    
    for (let key in subs) { 
        const keywords = Array.isArray(subs[key]) ? subs[key] : (subs[key] ? subs[key].split(',') : []);
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
        if (periods[num]) return periodMatch[2] ? periods[num].end : periods[num].start;
    }
    const timeMatch = text.match(/(\d{1,2})[:：](\d{1,2})/);
    if (timeMatch) return `${String(parseInt(timeMatch[1])).padStart(2,'0')}:${String(parseInt(timeMatch[2])).padStart(2,'0')}`;
    return null;
}

async function replyLineMessage(token, replyToken, text) { await fetch('https://api.line.me/v2/bot/message/reply', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ replyToken: replyToken, messages: [{ type: 'text', text: text }] }) }); }
async function replyLineMessageWithButton(token, replyToken, text, buttonText, linkUrl) { const message = { type: "template", altText: text.split('\n')[0], template: { type: "buttons", text: text, actions: [{ type: "uri", label: buttonText, uri: linkUrl }] } }; await fetch('https://api.line.me/v2/bot/message/reply', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ replyToken: replyToken, messages: [message] }) }); }
async function pushLineMessage(token, userId, text) { await fetch('https://api.line.me/v2/bot/message/push', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ to: userId, messages: [{ type: 'text', text: text }] }) }); }
async function writeLog(env, groupId, actor, action, details, request) { try { const ip = request ? (request.headers.get('CF-Connecting-IP') || 'Unknown') : 'System'; const ua = request ? (request.headers.get('User-Agent') || 'Unknown') : 'System'; await env.DB.prepare("INSERT INTO logs (group_id, actor, action, details, ip_address, user_agent, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(groupId, actor, action, details, ip, ua, Date.now()).run(); } catch(e) { console.error("Log Error:", e); } }
function genRescueCode() { return Math.floor(100000 + Math.random() * 900000).toString(); }

async function checkAllAgreed(env, gId) {
    try {
        const countRes = await fetch(`https://api.line.me/v2/bot/group/${gId}/members/count`, { headers: { 'Authorization': `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}` } });
        let memberCount = 0;
        if (countRes.ok) { const data = await countRes.json(); memberCount = data.count; } 
        else { const roomRes = await fetch(`https://api.line.me/v2/bot/room/${gId}/members/count`, { headers: { 'Authorization': `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}` } }); if (roomRes.ok) { const data = await roomRes.json(); memberCount = data.count; } else return true; }
        const { count } = await env.DB.prepare("SELECT COUNT(*) as count FROM group_agreements WHERE group_id = ?").bind(gId).first();
        return count >= (memberCount - 1);
    } catch (e) { return false; }
}

function getNewWelcomeMessage(gId, origin) {
    return `各位使用者您好！感謝您使用 LINE 資料整合助理。\nID: ${gId}\n\n📊 學生作業：${origin}/?id=${gId}\n🔧 後台管理：${origin}/manager?id=${gId}\n\n請尊重原作者的智慧財產權。`;
}
function getExistingWelcomeMessage(gId, origin) {
    return `歡迎回來！\nID: ${gId}\n\n📊 學生作業：${origin}/?id=${gId}\n🔧 後台管理：${origin}/manager?id=${gId}`;
}

function renderMaintenancePage(maintConfig) { 
    const typeName = MAINT_MODES[maintConfig.type] || "系統維護中";
    const detail = MAINT_MESSAGES_DETAIL[maintConfig.type] || {title:typeName, desc:maintConfig.message||"系統正在進行必要維護。"};
    return `<!DOCTYPE html><html lang="zh-TW" class="dark"><head><title>${typeName}</title>${COMMON_UI_SCRIPT}</head><body class="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4"><div class="max-w-md w-full text-center space-y-8 bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-700"><div class="text-7xl text-yellow-500 animate-pulse"><i class="fas fa-tools"></i></div><div><h1 class="text-3xl font-bold text-white mb-2">${detail.title}</h1><p class="text-gray-400 text-lg">${maintConfig.message || detail.desc}</p></div>${maintConfig.end ? `<div class="bg-gray-700/50 p-4 rounded-xl"><p class="text-sm text-gray-400">預計結束時間</p><p class="text-xl font-mono text-green-400 font-bold mt-1">${new Date(maintConfig.end).toLocaleString()}</p></div>` : ''}</div></body></html>`; 
}

function renderTermsHTML(origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><title>服務條款</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-900 text-white min-h-screen p-4 md:p-8"><div class="max-w-3xl mx-auto bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-gray-700">${TERMS_HTML_CONTENT}<div class="mt-8 text-center text-sm text-gray-400"><p>COPYRIGHT © 2025 Ray2026. ALL RIGHTS RESERVED.</p></div></div></body></html>`;
}

function renderEULAHTML(redirectUrl, origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><title>服務條款同意</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4"><div class="max-w-lg w-full bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">${EULA_TEXT}<div class="mt-8 flex gap-4"><button onclick="disagree()" class="flex-1 bg-red-700 hover:bg-red-600 py-3 rounded font-bold transition">不同意</button><button onclick="agree()" class="flex-1 bg-green-600 hover:bg-green-500 py-3 rounded font-bold transition">我同意</button></div></div><script>async function agree() { const btn = document.querySelector('button:last-child'); btn.disabled = true; btn.innerText = '處理中...'; try { const res = await fetch('${origin}', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ action: 'agree_eula' }) }); if(res.ok) { window.location.href = '${redirectUrl || origin}'; } else { alert('系統錯誤'); btn.disabled = false; } } catch(e) { alert('網路錯誤'); btn.disabled = false; } } function disagree() { document.body.innerHTML = '<div class="text-center p-8"><h1 class="text-2xl font-bold">您必須同意條款才能使用本服務。</h1></div>'; }</script></body></html>`;
}

function renderHomePage(origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>LINE資料整合分類機器</title><script src="https://cdn.tailwindcss.com"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></head><body class="bg-gradient-to-b from-blue-900 to-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6"><div class="max-w-2xl text-center space-y-6"><div class="text-6xl mb-4">🤖</div><h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">LINE資料整合分類機器</h1><p class="text-gray-300 text-lg">協助整理LINE訊息進行篩選的機器</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"><a href="${LINK_LINE_HOST}" target="_blank" class="bg-[#181717] hover:bg-[#2d2d2d] text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition transform hover:scale-105"><i class="fab fa-github text-2xl"></i> 開始架設自己的機器</a><a href="${LINK_DISCORD}" target="_blank" class="bg-[#5865F2] hover:bg-[#4752c4] text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition transform hover:scale-105"><i class="fab fa-discord text-2xl"></i> 加入 Discord</a></div></div></body></html>`;
}

// --- END OF PART 7 ---

// --- START OF PART 8 (Fix Frontend Pwd Sending) ---

// 6. Super Admin 後台
function renderSuperAdminHTML(origin) {
    return `<!DOCTYPE html><html lang="zh-TW" class="dark"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Super Admin</title>
    ${COMMON_UI_SCRIPT}
    <style>
        html, body { height: 100%; margin: 0; padding: 0; background-color: #0f172a; color: #f8fafc; font-family: 'Segoe UI', Roboto, sans-serif; overflow: hidden; }
        .input-dark { background: #1e293b; border: 1px solid #334155; color: white; border-radius: 0.5rem; padding: 0.75rem; width: 100%; font-size: 0.95rem; }
        .input-dark:focus { border-color: #3b82f6; outline: none; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3); }
        .btn { padding: 0.6rem 1.2rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; transition: 0.2s; border: none; }
        .btn-primary { background: #2563eb; color: white; } .btn-primary:hover { background: #1d4ed8; }
        .btn-danger { background: #dc2626; color: white; } .btn-danger:hover { background: #b91c1c; }
        .btn-secondary { background: #334155; color: #e2e8f0; } .btn-secondary:hover { background: #475569; }
        #layout { display: flex; flex-direction: column; height: 100%; }
        .mobile-header { display: none; height: 60px; background: #1f2937; align-items: center; justify-content: space-between; padding: 0 1rem; border-bottom: 1px solid #374151; flex-shrink: 0; z-index: 50; }
        .sidebar { width: 260px; background: #1f2937; border-right: 1px solid #374151; display: flex; flex-direction: column; z-index: 60; transition: transform 0.3s ease; flex-shrink: 0; }
        .sidebar-link { padding: 1rem; color: #94a3b8; display: flex; align-items: center; cursor: pointer; border-left: 3px solid transparent; }
        .sidebar-link:hover { background: #374151; color: white; }
        .sidebar-link.active { background: #0f172a; color: #60a5fa; border-left-color: #60a5fa; }
        .sidebar-link i { width: 24px; text-align: center; margin-right: 10px; }
        .sidebar-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 55; display: none; backdrop-filter: blur(2px); }
        .main { flex: 1; overflow-y: auto; padding: 1.5rem; background: #0f172a; position: relative; }
        @media (min-width: 769px) { #layout { flex-direction: row; } .mobile-header { display: none; } .sidebar { position: static; height: 100%; transform: none !important; } .sidebar-overlay { display: none !important; } }
        @media (max-width: 768px) { .mobile-header { display: flex; } .sidebar { position: fixed; top: 0; bottom: 0; left: 0; transform: translateX(-100%); width: 280px; box-shadow: 4px 0 15px rgba(0,0,0,0.5); } .sidebar.active { transform: translateX(0); } .sidebar-overlay.active { display: block; } .main { padding: 1rem; } }
        .card { background: #1e293b; padding: 1rem; border-radius: 0.75rem; border: 1px solid #334155; margin-bottom: 1rem; }
        details { background: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; margin-bottom: 1rem; overflow: hidden; }
        details summary { padding: 1rem; cursor: pointer; background: #262f3e; font-weight: bold; }
        .accordion-content { padding: 1rem; border-top: 1px solid #334155; background: #151e2e; }
        .perm-row { display: flex; align-items: center; gap: 10px; padding: 10px; background: #0f172a; border-radius: 6px; border: 1px solid #334155; margin-bottom: 5px; cursor: pointer; }
        .perm-checkbox { width: 18px; height: 18px; accent-color: #2563eb; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #475569; border-radius: 3px; }
    </style>
    </head><body>

    <div id="login-container" class="fixed inset-0 z-[100] bg-gray-900 flex items-center justify-center p-4">
        <div class="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-700">
            <h1 class="text-3xl font-bold text-blue-400 text-center mb-6">⚡ Super Admin</h1>
            <input type="password" id="spwd" placeholder="請輸入超級密碼" class="input-dark text-center mb-6 text-lg">
            <button id="btn-login" class="w-full btn btn-primary text-lg">驗證身分</button>
        </div>
    </div>

    <div id="step-dash" class="hidden h-full">
        <div id="layout">
            <div class="mobile-header">
                <button onclick="toggleSidebar()" class="text-white text-2xl"><i class="fas fa-bars"></i></button>
                <span class="font-bold text-lg text-white">Super Admin</span>
                <button onclick="logout()" class="text-red-400 text-lg"><i class="fas fa-sign-out-alt"></i></button>
            </div>

            <div id="sidebar-overlay" class="sidebar-overlay" onclick="toggleSidebar()"></div>
            <aside id="sidebar" class="sidebar">
                <div class="p-6 border-b border-gray-700 bg-gray-900/50">
                    <div class="text-blue-400 text-xl font-bold mb-1"><i class="fas fa-bolt mr-2"></i>Control Panel</div>
                    <div class="text-xs text-gray-500">v${CURRENT_VERSION}</div>
                </div>
                <nav class="flex-1 p-4 overflow-y-auto">
                    <a onclick="switchTab('maint')" class="sidebar-link active" id="btn-tab-maint"><i class="fas fa-tools"></i> 維護模式</a>
                    <a onclick="switchTab('groups')" class="sidebar-link" id="btn-tab-groups"><i class="fas fa-users"></i> 群組管理</a>
                    <a onclick="switchTab('settings')" class="sidebar-link" id="btn-tab-settings"><i class="fas fa-cog"></i> 全域設定</a>
                    <a onclick="switchTab('logs')" class="sidebar-link" id="btn-tab-logs"><i class="fas fa-history"></i> 系統日誌</a>
                </nav>
                <div class="p-4 border-t border-gray-700">
                    <button onclick="logout()" class="btn btn-secondary w-full text-red-400 hover:text-white"><i class="fas fa-sign-out-alt mr-2"></i>登出</button>
                </div>
            </aside>

            <main class="main">
                <!-- 維護模式 -->
                <div id="tab-maint" class="max-w-4xl mx-auto w-full">
                    <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">全域維護模式</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div class="bg-gray-800 p-6 rounded-xl border border-blue-900/50">
                            <h3 class="text-xl font-bold text-blue-400 mb-4">前端網頁</h3>
                            <div class="space-y-4">
                                <label class="flex items-center gap-3"><input type="checkbox" id="fe-enabled" class="w-5 h-5 text-blue-600"> 啟用攔截</label>
                                <select id="fe-type" class="input-dark"><option value="sys_maint">系統維護中</option><option value="sys_update">系統升級中</option><option value="data_maint">資料維護中</option><option value="data_update">資料更新中</option></select>
                                <input type="text" id="fe-msg" class="input-dark" placeholder="公告訊息...">
                                <input type="datetime-local" id="fe-end" class="input-dark text-white">
                            </div>
                        </div>
                        <div class="bg-gray-800 p-6 rounded-xl border border-purple-900/50">
                            <h3 class="text-xl font-bold text-purple-400 mb-4">後端 API</h3>
                            <div class="space-y-4">
                                <label class="flex items-center gap-3"><input type="checkbox" id="be-enabled" class="w-5 h-5 text-purple-600"> 啟用阻擋</label>
                                <select id="be-type" class="input-dark"><option value="sys_maint">系統維護中</option><option value="sys_update">系統升級中</option><option value="data_maint">資料維護中</option><option value="data_update">資料更新中</option></select>
                                <input type="text" id="be-msg" class="input-dark" placeholder="錯誤訊息...">
                                <input type="datetime-local" id="be-end" class="input-dark text-white">
                            </div>
                        </div>
                    </div>
                    <button onclick="saveMaint()" class="w-full btn btn-primary py-3 text-lg">儲存維護設定</button>
                </div>

                <!-- 群組列表 -->
                <div id="tab-groups" class="max-w-5xl mx-auto w-full hidden">
                    <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h2 class="text-2xl font-bold">群組管理</h2>
                        <div class="flex gap-2 w-full md:w-auto">
                            <input type="text" id="skey" oninput="searchGroups()" placeholder="搜尋 ID / 名稱..." class="input-dark flex-1 md:w-64">
                            <button onclick="loadData()" class="btn btn-secondary"><i class="fas fa-sync-alt"></i></button>
                        </div>
                    </div>
                    <div id="group-list" class="space-y-4"></div>
                </div>

                <!-- 全域設定 -->
                <div id="tab-settings" class="max-w-3xl mx-auto w-full hidden">
                    <h2 class="text-2xl font-bold mb-6">全域政策設定</h2>
                    <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-6">
                        <h3 class="text-lg font-bold text-yellow-400 mb-4">1. 新增群組權限 (/bot newID)</h3>
                        <div class="space-y-4">
                            <select id="create-mode" class="input-dark" onchange="toggleCreatePwd()"><option value="open">🟢 開放</option><option value="restricted">🔑 密碼保護</option><option value="closed">🔴 關閉</option></select>
                            <div id="create-pwd-box" class="hidden"><input type="text" id="create-pwd" class="input-dark" placeholder="設定密碼..."></div>
                        </div>
                    </div>
                    <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-6">
                        <h3 class="text-lg font-bold text-red-400 mb-4">2. 敏感操作保護</h3>
                        <label class="flex items-center gap-3 mb-4 cursor-pointer"><input type="checkbox" id="sec-enabled" class="w-5 h-5 text-red-600 rounded" onchange="toggleSecPwd()"><span>啟用操作密碼</span></label>
                        <div id="sec-pwd-box" class="hidden"><input type="text" id="sec-pwd" class="input-dark" placeholder="設定操作密碼..."></div>
                    </div>
                    <div class="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-6">
                        <h3 class="text-lg font-bold text-blue-400 mb-4">3. 安全防護</h3>
                        <label class="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" id="block-f12" class="w-5 h-5 text-blue-600 rounded">
                            <span>🚫 禁用開發者工具 (F12/右鍵)</span>
                        </label>
                    </div>
                    <button onclick="saveSettings()" class="w-full btn btn-primary py-3">儲存所有設定</button>
                </div>

                <!-- 日誌 -->
                <div id="tab-logs" class="max-w-4xl mx-auto w-full hidden">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold">系統日誌</h2>
                        <div class="flex gap-2">
                            <button onclick="clearLogs()" class="btn btn-danger text-sm">清空</button>
                            <button onclick="loadLogs()" class="btn btn-secondary text-sm">重整</button>
                        </div>
                    </div>
                    <div class="flex justify-center gap-4 mb-4"><button onclick="changePage(-1)" class="btn btn-secondary text-sm">上一頁</button><span class="py-2 text-blue-300 font-mono page-num-display">Page 1</span><button onclick="changePage(1)" class="btn btn-secondary text-sm">下一頁</button></div>
                    <div id="log-list" class="space-y-2 text-sm font-mono max-h-[60vh] overflow-y-auto custom-scroll"></div>
                    <div class="flex justify-center gap-4 mt-4"><button onclick="changePage(-1)" class="btn btn-secondary text-sm">上一頁</button><span class="py-2 text-blue-300 font-mono page-num-display">Page 1</span><button onclick="changePage(1)" class="btn btn-secondary text-sm">下一頁</button></div>
                </div>
            </main>
        </div>
    </div>

    <!-- 個別設定 Modal -->
    <div id="modal-gset" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div class="bg-gray-800 p-6 rounded-2xl w-full max-w-sm shadow-2xl border border-gray-700">
            <h3 class="font-bold text-xl mb-4 text-white">個別群組設定</h3>
            <input type="hidden" id="gset-id">
            <label class="flex items-center gap-3 p-3 bg-gray-900 rounded border border-gray-600 cursor-pointer mb-6">
                <input type="checkbox" id="gset-ai" class="w-5 h-5 text-blue-600 rounded">
                <span class="text-gray-300">允許使用 AI 功能</span>
            </label>
            <div class="flex gap-3">
                <button onclick="document.getElementById('modal-gset').classList.add('hidden')" class="flex-1 btn btn-secondary">取消</button>
                <button onclick="saveGroupPolicy()" class="flex-1 btn btn-primary">儲存</button>
            </div>
        </div>
    </div>

    <!-- 敏感操作驗證 Modal -->
    <div id="modal-auth" class="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div class="bg-gray-900 p-6 rounded-2xl w-full max-w-sm shadow-2xl border border-red-500/50">
            <div class="text-center mb-6">
                <i class="fas fa-shield-alt text-4xl text-red-500 mb-4"></i>
                <h3 class="font-bold text-xl text-white">敏感操作驗證</h3>
                <p class="text-gray-400 text-sm mt-2">請輸入操作密碼以繼續</p>
            </div>
            <input type="password" id="auth-pwd-input" class="w-full bg-gray-800 border border-gray-600 rounded p-3 text-center text-white mb-6 focus:border-red-500 outline-none" placeholder="操作密碼">
            <div class="flex gap-3">
                <button id="btn-auth-cancel" class="flex-1 btn btn-secondary">取消</button>
                <button id="btn-auth-confirm" class="flex-1 btn btn-danger">確認</button>
            </div>
        </div>
    </div>

    <script>
        let currentConfig = {}, groups = [], curPage = 1;
        document.addEventListener('DOMContentLoaded', () => { document.getElementById('btn-login').addEventListener('click', login); });
        async function apiRequest(payload) {
            payload.password = document.getElementById('spwd').value;
            try { const res = await fetch(location.href, {method: 'POST', body: JSON.stringify(payload)}); return await res.json(); } catch (e) { return { status: 'error', msg: e.message }; }
        }
        async function login() {
            const d = await apiRequest({action:'super_admin_login'});
            if(d.status === 'success') { document.getElementById('login-container').classList.add('hidden'); document.getElementById('step-dash').classList.remove('hidden'); await loadData(); switchTab('maint'); } 
            else alert(d.msg || '登入失敗');
        }
        async function loadData() {
            const d = await apiRequest({action:'super_admin_get_data'});
            if(d.status === 'success') { currentConfig = d.config || {}; groups = d.groups || []; loadConfigUI(); renderGroups(groups); }
        }
        function searchGroups() {
            const k = document.getElementById('skey').value.toLowerCase().trim();
            const filtered = groups.filter(g => g.id.includes(k) || (g.name && g.name.toLowerCase().includes(k)) || g.rescue_code.includes(k));
            renderGroups(filtered);
        }
        async function loadLogs() {
            const d = await apiRequest({action:'super_admin_get_logs', page: curPage, limit: 50});
            if(d.status === 'success') {
                const div = document.getElementById('log-list'); div.innerHTML = '';
                d.logs.forEach(l => { 
                    let details = l.details;
                    try { if (details && details.trim().startsWith('{')) { const j = JSON.parse(details); if (j.frontend || j.backend) { const fe = j.frontend.enabled ? \`🔴\${j.frontend.type}\` : '🟢正常'; const be = j.backend.enabled ? \`🔴\${j.backend.type}\` : '🟢正常'; details = \`[維護] 前:\${fe} / 後:\${be}\`; } else if (j.roles) { details = '成員設定變更'; } } } catch(e) {}
                    div.innerHTML += \`<div class="p-3 bg-gray-800 rounded border border-gray-700 flex flex-col md:flex-row justify-between gap-2 text-xs md:text-sm"><span class="text-blue-400 md:w-40">\${new Date(l.timestamp).toLocaleString()}</span><div class="flex gap-2 md:w-48"><span class="text-green-400 font-bold">\${l.actor}</span><span class="text-yellow-500">\${l.action}</span></div><span class="text-gray-400 flex-1 truncate">\${details}</span></div>\`; 
                });
                document.querySelectorAll('.page-num-display').forEach(el => el.innerText = 'Page ' + curPage);
            }
        }
        async function clearLogs() { if(await myConfirm('確定清空所有日誌？')) { await apiRequest({action:'super_admin_clear_logs'}); loadLogs(); } }
        function changePage(d) { if(curPage + d > 0) { curPage += d; loadLogs(); } }
        
        function loadConfigUI() {
            const fe = currentConfig.maintenance?.frontend || {}, be = currentConfig.maintenance?.backend || {};
            document.getElementById('fe-enabled').checked = fe.enabled; document.getElementById('fe-type').value = fe.type; document.getElementById('fe-msg').value = fe.message || ''; document.getElementById('fe-end').value = fe.end || '';
            document.getElementById('be-enabled').checked = be.enabled; document.getElementById('be-type').value = be.type; document.getElementById('be-msg').value = be.message || ''; document.getElementById('be-end').value = be.end || '';
            const cp = currentConfig.creation_policy || {mode:'open', password:''};
            document.getElementById('create-mode').value = cp.mode; document.getElementById('create-pwd').value = cp.password || ''; toggleCreatePwd();
            const sp = currentConfig.security_policy || {require_password_for_destructive_actions: false, action_password: ''};
            document.getElementById('sec-enabled').checked = sp.require_password_for_destructive_actions; document.getElementById('sec-pwd').value = sp.action_password || ''; toggleSecPwd();
            document.getElementById('block-f12').checked = !!(currentConfig.security_policy && currentConfig.security_policy.block_devtools);
        }
        function toggleCreatePwd() { document.getElementById('create-pwd-box').classList.toggle('hidden', document.getElementById('create-mode').value !== 'restricted'); }
        function toggleSecPwd() { document.getElementById('sec-pwd-box').classList.toggle('hidden', !document.getElementById('sec-enabled').checked); }
        
        function renderGroups(data) {
            const div = document.getElementById('group-list'); div.innerHTML='';
            const list = data || groups;
            if(list.length === 0) { div.innerHTML = '<div class="text-gray-500 text-center py-8">無資料</div>'; return; }
            list.forEach(g => {
                div.innerHTML += \`<div class="bg-gray-800 p-4 rounded-xl border border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div class="flex-1 overflow-hidden w-full">
                        <div class="font-bold text-lg text-white truncate mb-1">\${g.name} <span class="text-xs ml-2 px-2 py-0.5 rounded border \${g.is_bound?'text-green-400 border-green-400 bg-green-400/10':'text-red-400 border-red-400 bg-red-400/10'}">\${g.is_bound?'已綁定':'未綁定'}</span></div>
                        <div class="text-xs text-gray-500 font-mono mb-2">\${g.id}</div>
                        <div class="flex flex-wrap gap-2 text-sm">
                            <span class="bg-gray-900 px-2 py-1 rounded text-yellow-500 border border-yellow-500/30">🆘 \${g.rescue_code}</span>
                            <span class="bg-gray-900 px-2 py-1 rounded text-blue-400 border border-blue-500/30">🔑 \${g.restore_code}</span>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-2 w-full md:w-auto">
                        <button onclick="openGroupSettings('\${g.id}')" class="btn btn-secondary text-sm flex-1 md:flex-none"><i class="fas fa-cog"></i> 設定</button>
                        <button onclick="safeAction('reset', '\${g.id}')" class="btn btn-secondary text-sm text-orange-400 flex-1 md:flex-none"><i class="fas fa-undo"></i> 重置</button>
                        <button onclick="regenRestore('\${g.id}')" class="btn btn-secondary text-sm text-yellow-400 flex-1 md:flex-none"><i class="fas fa-key"></i> 換碼</button>
                        <button onclick="safeAction('delete', '\${g.id}')" class="btn btn-secondary text-sm text-red-400 flex-1 md:flex-none"><i class="fas fa-trash"></i> 刪除</button>
                    </div>
                </div>\`;
            });
        }

        async function openGroupSettings(id) {
            document.getElementById('gset-id').value = id;
            document.getElementById('modal-gset').classList.remove('hidden');
            document.getElementById('gset-ai').checked = true; 
            const d = await apiRequest({action:'super_admin_get_group_policy', targetGroupId: id});
            if(d.status === 'success' && d.policy) { document.getElementById('gset-ai').checked = d.policy.ai_allowed !== false; }
        }
        async function saveGroupPolicy() {
            const id = document.getElementById('gset-id').value;
            const allowed = document.getElementById('gset-ai').checked;
            await apiRequest({action:'super_admin_set_group_policy', targetGroupId: id, ai_allowed: allowed});
            document.getElementById('modal-gset').classList.add('hidden');
            successAlert('設定已更新');
        }
        
        function showAuthModal() {
            return new Promise((resolve) => {
                const modal = document.getElementById('modal-auth');
                const input = document.getElementById('auth-pwd-input');
                const btnOk = document.getElementById('btn-auth-confirm');
                const btnCancel = document.getElementById('btn-auth-cancel');
                input.value = ''; modal.classList.remove('hidden'); input.focus();
                const close = (val) => { modal.classList.add('hidden'); resolve(val); };
                btnOk.onclick = () => close(input.value);
                btnCancel.onclick = () => close(null);
                input.onkeydown = (e) => { if(e.key === 'Enter') close(input.value); };
            });
        }

        async function safeAction(type, id) {
            const secEnabled = document.getElementById('sec-enabled').checked;
            let pwd = null;
            if (secEnabled) { pwd = await showAuthModal(); if (pwd === null) return; }
            if (type === 'delete') { if(!await myConfirm('確定刪除此群組？(無法復原)')) return; await apiRequest({action:'super_admin_delete_group', targetGroupId:id, actionPassword: pwd}); } 
            else if (type === 'reset') { if(!await myConfirm('確定重置狀態？(清空作業但保留管理員)')) return; await apiRequest({action:'super_admin_reset_group_data', targetGroupId:id, actionPassword: pwd}); }
            loadData();
        }
        
        // ★ 修復：saveMaint
        async function saveMaint() {
            const newMaint = { frontend: { enabled: document.getElementById('fe-enabled').checked, type: document.getElementById('fe-type').value, message: document.getElementById('fe-msg').value, end: document.getElementById('fe-end').value }, backend: { enabled: document.getElementById('be-enabled').checked, type: document.getElementById('be-type').value, message: document.getElementById('be-msg').value, end: document.getElementById('be-end').value } };
            await apiRequest({ action:'super_admin_set_maintenance', maintenance: newMaint }); successAlert('維護設定已儲存');
        }
        
        async function saveSettings() {
            const settings = {
                maintenance: { frontend: { enabled: document.getElementById('fe-enabled').checked, type: document.getElementById('fe-type').value, message: document.getElementById('fe-msg').value, end: document.getElementById('fe-end').value }, backend: { enabled: document.getElementById('be-enabled').checked, type: document.getElementById('be-type').value, message: document.getElementById('be-msg').value, end: document.getElementById('be-end').value } },
                creation_policy: { mode: document.getElementById('create-mode').value, password: document.getElementById('create-pwd').value },
                security_policy: { 
                    require_password_for_destructive_actions: document.getElementById('sec-enabled').checked, 
                    action_password: document.getElementById('sec-pwd').value,
                    block_devtools: document.getElementById('block-f12').checked
                }
            };
            await apiRequest({ action:'super_admin_save_settings', settings: settings }); successAlert('所有設定已儲存');
        }
        async function regenRestore(id) { if(await myConfirm('確定重置 10位數 復原碼？')) { const d = await apiRequest({action:'super_admin_regen_restore', targetGroupId:id}); if(d.status === 'success') { alert('新碼: ' + d.newRestoreCode); loadData(); } else alert(d.msg); } }
        
        window.toggleSidebar = () => { document.getElementById('sidebar').classList.toggle('active'); document.getElementById('sidebar-overlay').classList.toggle('active'); };
        function switchTab(id) {
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            document.getElementById('btn-tab-'+id).classList.add('active');
            document.querySelectorAll('#step-dash > #layout > main > div[id^="tab-"]').forEach(d => d.classList.add('hidden'));
            document.getElementById('tab-'+id).classList.remove('hidden');
            if(window.innerWidth < 768) toggleSidebar();
            if(id === 'logs') loadLogs();
        }
    </script></body></html>`;
}

// --- END OF PART 8 ---

// --- START OF PART 9 ---

// 7. 學生作業頁面 (XSS 防護強化)
function renderStudentHTML(origin) {
    const css = "<style>.filter-btn { white-space: nowrap; padding: 0.5rem 1rem; border-radius: 9999px; background: #374151; color: #d1d5db; border: 1px solid #4b5563; transition: 0.2s; font-size: 0.875rem; cursor: pointer; } .filter-btn.active { background: #2563eb; color: white; border-color: #2563eb; } .month-scroll { -ms-overflow-style: none; scrollbar-width: none; } .month-scroll::-webkit-scrollbar { display: none; } .task-card { transition: transform 0.2s; border-left-width: 4px; } .task-card:active { transform: scale(0.98); }</style>";

    const clientScript = 
    "const urlParams = new URLSearchParams(window.location.search);" +
    "const gId = urlParams.get('id');" +
    "const mentionParam = urlParams.get('mention');" +
    "document.getElementById('page-date').innerText = new Date().toLocaleDateString();" +
    "let allTasks = [], periods = {}, filters = { status: 'active', month: 'all', subject: 'all', mention: mentionParam || null };" +
    "async function load() {" +
        "if(!gId) return;" +
        "if(typeof startPolling === 'function') startPolling(gId);" +
        "try {" +
            "const res = await fetch(window.location.href, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ action: 'get_tasks', groupId: gId }) });" +
            "if (res.status === 503) { document.body.innerHTML = '<div class=\"text-center p-10 text-white\"><h1>系統維護中</h1></div>'; return; }" +
            "const data = await res.json();" +
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
        "Array.from(months).sort((a,b)=>a-b).forEach(m => { list.innerHTML += '<button onclick=\"setFilter(\\'month\\', '+m+')\" class=\"filter-btn\" id=\"btn-month-'+m+'\">'+m+'月</button>'; });" +
    "}" +
    "window.setFilter = function(type, val) {" +
        "filters[type] = val;" +
        "if(type === 'status') { document.getElementById('btn-status-active').className = val === 'active' ? 'px-6 py-1.5 rounded-full text-sm font-bold transition bg-blue-600 text-white' : 'px-6 py-1.5 rounded-full text-sm font-bold transition text-gray-400 hover:text-white'; document.getElementById('btn-status-history').className = val === 'history' ? 'px-6 py-1.5 rounded-full text-sm font-bold transition bg-gray-600 text-white' : 'px-6 py-1.5 rounded-full text-sm font-bold transition text-gray-400 hover:text-white'; }" +
        "if(type === 'month') { document.querySelectorAll('#month-filter-list .filter-btn').forEach(b => b.classList.remove('active')); document.getElementById('btn-month-' + val).classList.add('active'); }" +
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
            "if(t.due_time) { let label = t.due_time; for(let k in periods) { if(periods[k].start === t.due_time) label = '第' + k + '節'; if(periods[k].end === t.due_time) label = '第' + k + '節下課'; } timeBadge = '<span class=\"bg-gray-700 text-xs px-2 py-0.5 rounded ml-2 border border-gray-600\">' + label + '</span>'; }" +
            "let safeContent = escapeHtml(t.content);" +
            "const urlRegex = new RegExp('(https?:\\/\\/[^\\s]+)', 'g');" +
            "safeContent = safeContent.replace(urlRegex, '<a href=\"$1\" target=\"_blank\" class=\"text-blue-400 underline\">$1</a>');" +
            "const editContent = t.content.replace(/\\\\/g, '\\\\\\\\').replace(/'/g, \"\\\\'\").replace(/\"/g, '&quot;').replace(/\\n/g, '\\\\n');" +
            "list.innerHTML += '<div class=\"bg-gray-800 p-4 rounded-xl shadow-md border-l-4 ' + colorClass + ' mb-2\">' + '<div class=\"flex items-center mb-2\">' + '<span class=\"bg-gray-700 text-xs px-2 py-0.5 rounded mr-2\">' + t.category + '</span>' + '<span class=\"font-bold text-gray-200 mr-1\">' + t.subject + '</span>' + timeBadge + '</div>' + '<div class=\"text-gray-300 whitespace-pre-wrap\">' + safeContent + '</div>' + '<div class=\"mt-2 text-right\">' + '<button onclick=\"openSuggestion(\\'' + t.id + '\\', \\'' + t.subject + '\\', \\'' + t.category + '\\', \\'' + editContent + '\\')\" class=\"text-xs text-gray-500 hover:text-white\">勘誤</button>' + '</div>' + '</div>';" +
        "});" +
    "}" +
    "window.openSubjectFilter = function() { const subSet = new Set(allTasks.map(t => t.subject)); const options = [{text: '全部科目', value: 'all'}]; Array.from(subSet).sort().forEach(s => options.push({text: s, value: s})); openMobileFilter('選擇科目', options, (val) => { filters.subject = val; document.getElementById('current-subject-label').innerText = val === 'all' ? '全部科目' : val; render(); }); };" +
    "window.openSuggestion = function(id, sub, cat, con) { document.getElementById('sug-task-id').value = id; document.getElementById('sug-subject').value = sub; document.getElementById('sug-category').value = cat; document.getElementById('sug-content').value = con; document.getElementById('suggestion-modal').classList.remove('hidden'); document.getElementById('suggestion-modal').classList.add('flex'); };" +
    "window.closeSuggestion = function() { const m = document.getElementById('suggestion-modal'); m.classList.add('hidden'); m.classList.remove('flex'); };" +
    "window.submitSuggestion = async function() { const con = document.getElementById('sug-content').value; if(!con) return alert('內容不能為空'); const btn = document.querySelector('#suggestion-modal button'); btn.disabled = true; btn.innerText = '傳送中...'; await fetch(window.location.href, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ action: 'submit_suggestion', groupId: gId, taskId: document.getElementById('sug-task-id').value, subject: document.getElementById('sug-subject').value, category: document.getElementById('sug-category').value, content: con }) }); alert('建議已送出'); closeSuggestion(); btn.disabled = false; btn.innerText = '送出建議'; };" +
    "load();";

    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>班級作業</title>${COMMON_UI_SCRIPT}${css}</head><body class="bg-gray-900 text-white min-h-screen pb-20"><div class="max-w-4xl mx-auto p-4" id="main-container"><div class="text-center mb-4"><h1 class="text-2xl font-bold text-white mb-1" id="page-title">📋 載入中...</h1><p class="text-xs text-gray-400" id="page-date"></p></div><div id="loading" class="text-center py-8"><i class="fas fa-spinner fa-spin text-3xl text-blue-500"></i></div><div id="error-msg" class="hidden bg-red-900/50 p-4 rounded text-center mb-4 text-red-200 border border-red-700"></div><div id="filters" class="hidden space-y-3 mb-4"><div class="flex justify-center"><div class="bg-gray-800 p-1 rounded-full border border-gray-700 flex shadow-sm"><button onclick="setFilter('status', 'active')" id="btn-status-active" class="px-6 py-1.5 rounded-full text-sm font-bold transition bg-blue-600 text-white">進行中</button><button onclick="setFilter('status', 'history')" id="btn-status-history" class="px-6 py-1.5 rounded-full text-sm font-bold transition text-gray-400 hover:text-white">已結束</button></div></div><div class="flex overflow-x-auto gap-2 month-scroll py-1 px-1" id="month-filter-list"></div><div class="flex gap-2"><button onclick="openSubjectFilter()" class="flex-1 bg-gray-800 py-2.5 rounded-lg text-sm border border-gray-700 flex items-center justify-center shadow active:bg-gray-700 hover:border-gray-500 transition"><i class="fas fa-filter mr-2 text-blue-400"></i> <span id="current-subject-label">全部科目</span></button></div><div id="mention-alert" class="hidden bg-purple-900/40 border border-purple-500/50 text-purple-200 px-3 py-2 rounded-lg text-sm flex items-center justify-between animate-pulse"><span><i class="fas fa-at mr-2"></i> 只顯示標註 <b id="mention-name"></b> 的作業</span><button onclick="clearMention()" class="text-purple-300 hover:text-white px-2"><i class="fas fa-times"></i></button></div></div><div id="content-area" class="space-y-3"></div></div><div id="suggestion-modal" class="fixed inset-0 z-[9999] hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4"><div class="bg-gray-800 rounded-xl w-full max-w-sm border border-gray-700 overflow-hidden shadow-2xl transform transition-all"><div class="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-750"><h3 class="font-bold text-white"><i class="fas fa-edit mr-2 text-yellow-500"></i>勘誤/建議</h3><button onclick="closeSuggestion()" class="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700"><i class="fas fa-times"></i></button></div><div class="p-4 space-y-4"><input type="hidden" id="sug-task-id"><input type="text" id="sug-subject" class="w-full bg-gray-900 border-gray-600 border rounded p-2 text-white" placeholder="科目"><select id="sug-category" class="w-full bg-gray-900 border-gray-600 border rounded p-2 text-white"><option value="作業">作業</option><option value="考試">考試</option><option value="攜帶">攜帶</option></select><textarea id="sug-content" rows="4" class="w-full bg-gray-900 border-gray-600 border rounded p-2 text-white" placeholder="修正內容..."></textarea></div><div class="p-4 border-t border-gray-700"><button onclick="submitSuggestion()" class="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold">送出建議</button></div></div></div><script>${clientScript}</script></body></html>`;
}

// --- END OF PART 9 ---

// --- START OF PART 10 (Fix Sidebar Alignment, Eye Icon & Disabled Inputs) ---

function renderManagerHTML(origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>後台管理</title>
    ${COMMON_UI_SCRIPT}
    <style>
        html, body { height: 100%; margin: 0; padding: 0; background-color: #0f172a; color: #f8fafc; font-family: 'Segoe UI', Roboto, sans-serif; overflow: hidden; }
        .input-dark { background: #1e293b; border: 1px solid #334155; color: white; border-radius: 0.5rem; padding: 0.75rem; width: 100%; font-size: 0.95rem; }
        .input-dark:focus { border-color: #3b82f6; outline: none; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3); }
        .input-dark:disabled { opacity: 0.5; cursor: not-allowed; background: #111827; }
        .btn { padding: 0.6rem 1.2rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; transition: 0.2s; border: none; }
        .btn-primary { background: #2563eb; color: white; } .btn-primary:hover { background: #1d4ed8; }
        .btn-danger { background: #dc2626; color: white; } .btn-danger:hover { background: #b91c1c; }
        .btn-secondary { background: #334155; color: #e2e8f0; } .btn-secondary:hover { background: #475569; }
        #step-dash { display: flex; flex-direction: column; height: 100%; }
        .mobile-header { display: none; height: 60px; background: #1f2937; align-items: center; justify-content: space-between; padding: 0 1rem; border-bottom: 1px solid #374151; flex-shrink: 0; z-index: 50; }
        .sidebar { width: 260px; background: #1f2937; border-right: 1px solid #374151; display: flex; flex-direction: column; z-index: 60; transition: transform 0.3s ease; }
        .sidebar-link { padding: 1rem; color: #94a3b8; display: flex; align-items: center; cursor: pointer; border-left: 3px solid transparent; }
        .sidebar-link:hover { background: #374151; color: white; }
        .sidebar-link.active { background: #0f172a; color: #60a5fa; border-left-color: #60a5fa; }
        .sidebar-link i { width: 24px; text-align: center; margin-right: 10px; }
        .sidebar-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 55; display: none; backdrop-filter: blur(2px); }
        .main { flex: 1; overflow-y: auto; padding: 1.5rem; background: #0f172a; position: relative; }
        @media (min-width: 769px) { #step-dash { flex-direction: row; } .mobile-header { display: none; } .sidebar { position: static; height: 100%; transform: none !important; } .sidebar-overlay { display: none !important; } }
        @media (max-width: 768px) { .mobile-header { display: flex; } .sidebar { position: fixed; top: 0; bottom: 0; left: 0; transform: translateX(-100%); width: 280px; box-shadow: 4px 0 15px rgba(0,0,0,0.5); } .sidebar.active { transform: translateX(0); } .sidebar-overlay.active { display: block; } .main { padding: 1rem; } }
        .card { background: #1e293b; padding: 1rem; border-radius: 0.75rem; border: 1px solid #334155; margin-bottom: 1rem; }
        details { background: #1e293b; border: 1px solid #334155; border-radius: 0.5rem; margin-bottom: 1rem; overflow: hidden; }
        details summary { padding: 1rem; cursor: pointer; background: #262f3e; font-weight: bold; }
        .accordion-content { padding: 1rem; border-top: 1px solid #334155; background: #151e2e; }
        .perm-row { display: flex; align-items: center; gap: 10px; padding: 10px; background: #0f172a; border-radius: 6px; border: 1px solid #334155; margin-bottom: 5px; cursor: pointer; }
        .perm-checkbox { width: 18px; height: 18px; accent-color: #2563eb; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #475569; border-radius: 3px; }
    </style>
    </head><body>

    <div id="login-container" class="fixed inset-0 z-[100] bg-gray-900 flex items-center justify-center p-4 overflow-y-auto">
        <div id="step-id" class="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
            <div class="text-center mb-8"><h1 class="text-3xl font-bold">後台管理</h1><p class="text-gray-400 mt-2">請輸入群組 ID</p></div>
            <input id="inp-gid" placeholder="Group ID" class="input-dark text-center mb-6 text-xl font-mono">
            <button onclick="checkId()" id="btn-check" class="btn btn-primary w-full py-3">下一步</button>
        </div>
        <div id="step-role" class="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 hidden">
            <h1 class="text-2xl font-bold text-center mb-6">選擇身分</h1><div id="role-buttons" class="grid grid-cols-2 gap-4 mb-6"></div><button onclick="showSection('step-id')" class="w-full text-gray-400 py-2">返回</button>
        </div>
        <div id="step-pwd" class="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 hidden">
            <h1 class="text-2xl font-bold text-center mb-2">驗證身分</h1><p id="lbl-role" class="text-center text-blue-400 font-bold mb-6"></p>
            <input type="password" id="inp-pwd" placeholder="密碼" class="input-dark text-center mb-6 text-lg">
            <button onclick="doLogin()" class="btn btn-primary w-full py-3 bg-green-600 hover:bg-green-500">登入</button>
            <div class="flex justify-between mt-4 px-2"><button onclick="showSection('step-reset')" class="text-sm text-gray-400">忘記密碼?</button><button onclick="showSection('step-role')" class="text-sm text-gray-400">切換身分</button></div>
        </div>
        <div id="step-reset" class="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 hidden">
            <h1 class="text-2xl font-bold text-center mb-6 text-red-400">重設密碼</h1><input id="reset-code" placeholder="救援碼 (6位數)" class="input-dark text-center mb-4 font-mono"><input type="password" id="reset-new-pwd" placeholder="新密碼" class="input-dark text-center mb-6"><button onclick="doReset()" class="btn btn-danger w-full py-3">確認重設</button><button onclick="showSection('step-pwd')" class="w-full text-gray-400 mt-4">返回</button>
        </div>
    </div>

    <div id="step-dash" class="hidden">
        <div class="mobile-header">
            <button onclick="toggleSidebar()" class="text-white text-2xl"><i class="fas fa-bars"></i></button>
            <span class="font-bold text-lg text-white">管理後台</span>
            <button onclick="logout()" class="text-red-400 text-lg"><i class="fas fa-sign-out-alt"></i></button>
        </div>

        <div id="sidebar-overlay" class="sidebar-overlay" onclick="toggleSidebar()"></div>
        <aside id="sidebar" class="sidebar">
            <div class="p-6 border-b border-gray-700 bg-gray-900/50">
                <div class="text-blue-400 text-xl font-bold mb-2"><i class="fas fa-robot mr-2"></i>RayBot</div>
                <div class="text-xs text-gray-400 bg-gray-800 p-2 rounded mb-1 font-mono truncate" id="dash-group-name"></div>
                <div class="text-xs text-green-400 font-bold">身分: <span id="role-display"></span></div>
                
                <!-- ★ 修復：代碼對齊與眼睛切換 -->
                <div id="rescue-code-area" class="mt-3 hidden">
                    <div class="flex items-center gap-2 bg-yellow-900/20 p-2 rounded border border-yellow-700/30">
                        <i class="fas fa-key text-yellow-500 text-xs w-4 text-center"></i>
                        <span class="text-xs text-yellow-500 font-bold w-12">救援碼:</span>
                        <span id="rec-code" class="text-xs font-mono text-yellow-400 blur-sm flex-1 select-all">******</span>
                        <i class="fas fa-eye text-gray-500 cursor-pointer text-xs hover:text-white" onclick="toggleBlur('rec-code')"></i>
                    </div>
                </div>
                
                <div id="binding-code-area" class="mt-2 hidden">
                    <div class="flex items-center gap-2 bg-blue-900/20 p-2 rounded border border-blue-700/30">
                        <i class="fas fa-link text-blue-500 text-xs w-4 text-center"></i>
                        <span class="text-xs text-blue-300 font-bold w-12">綁定碼:</span>
                        <span id="bind-code" class="text-xs font-mono text-blue-400 font-bold blur-sm flex-1 select-all"></span>
                        <i class="fas fa-eye text-gray-500 cursor-pointer text-xs hover:text-white" onclick="toggleBlur('bind-code')"></i>
                    </div>
                </div>
            </div>
            <nav class="flex-1 p-4 overflow-y-auto">
                <p class="text-xs font-bold text-gray-500 mb-2 ml-2">功能選單</p>
                <a onclick="switchView('tasks')" class="sidebar-link active" id="link-tasks"><i class="fas fa-list-check"></i> 作業管理</a>
                <a onclick="switchView('settings')" class="sidebar-link" id="link-settings"><i class="fas fa-sliders-h"></i> 系統設定</a>
                <a onclick="switchView('members')" class="sidebar-link" id="link-members"><i class="fas fa-users-cog"></i> 成員權限</a>
                <p class="text-xs font-bold text-gray-500 mt-6 mb-2 ml-2">帳戶安全</p>
                <a onclick="openPwdModal()" class="sidebar-link"><i class="fas fa-key"></i> 修改密碼</a>
            </nav>
            <div class="p-4 border-t border-gray-700"><button onclick="logout()" class="btn btn-secondary w-full text-red-400 hover:text-white"><i class="fas fa-sign-out-alt mr-2"></i>登出</button></div>
        </aside>

        <main class="main">
            <!-- 1. 作業管理 -->
            <div id="view-tasks" class="max-w-6xl mx-auto w-full">
                <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
                    <h2 class="text-2xl font-bold">作業管理</h2>
                    <div class="flex gap-2">
                        <button onclick="batchDelTasks()" class="btn btn-danger text-sm"><i class="fas fa-trash-alt"></i> 批量刪除</button>
                        <button onclick="loadTasks(true)" class="btn btn-secondary text-sm"><i class="fas fa-sync-alt"></i> 重整</button>
                        <button onclick="openAddModal()" class="btn btn-primary text-sm"><i class="fas fa-plus"></i> 新增</button>
                    </div>
                </div>

                <div class="card grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div class="md:col-span-1"><input id="f-kw" class="input-dark" placeholder="🔍 搜尋..." oninput="applyFilters()"></div>
                    <select id="f-st" class="input-dark" onchange="applyFilters()"><option value="all">🟢 狀態: 全部</option><option value="approved">✅ 已發佈</option><option value="pending">⚠️ 待審核</option></select>
                    <select id="f-tm" class="input-dark" onchange="applyFilters()"><option value="active">📅 時效: 進行中</option><option value="history">🗄️ 時效: 已結束</option><option value="all">全部</option></select>
                    <select id="f-mt" class="input-dark" onchange="applyFilters()"><option value="all">🗓️ 月份: 全部</option></select>
                    <select id="f-sb" class="input-dark" onchange="applyFilters()"><option value="all">📚 科目: 全部</option></select>
                </div>

                <div id="suggestions-panel" class="hidden bg-yellow-900/20 border border-yellow-600/30 p-4 rounded-xl mb-6"><h3 class="font-bold text-yellow-500 mb-3"><i class="fas fa-bell mr-2"></i> 待審核建議</h3><div id="suggestion-list" class="space-y-3"></div></div>
                <div id="task-list" class="space-y-4 pb-10"></div>
            </div>

            <!-- 2. 系統設定 (★ 預設收起) -->
            <div id="view-settings" class="max-w-3xl mx-auto w-full hidden">
                <div class="border-b border-gray-700 pb-4 mb-6"><h2 class="text-2xl font-bold">系統設定</h2></div>
                <details><summary class="text-blue-400">⏰ 節次與時間</summary>
                    <div class="accordion-content">
                        <div class="bg-blue-900/20 p-3 rounded mb-4 text-xs text-blue-200 border border-blue-500/30">設定「第一節」對應上課，「第一節下課」對應下課時間。</div>
                        <div id="period-list" class="space-y-3 mb-4"></div>
                        <button onclick="addPeriod()" class="btn btn-secondary w-full border-dashed border-2 border-gray-600">+ 增加一節</button>
                    </div>
                </details>

                <details><summary class="text-purple-400">🤖 進階功能</summary>
                    <div class="accordion-content grid gap-4">
                        <div><label class="block text-sm text-gray-400 mb-1">審核模式</label><select id="adv-approval-mode" class="input-dark"><option value="auto">⚡ 自動審核</option><option value="timed">⏲️ 定時審核</option><option value="manual">🛡️ 完全手動</option></select></div>
                        <div><label class="flex items-center gap-3 p-3 bg-gray-800 rounded border border-gray-700 cursor-pointer"><input type="checkbox" id="adv-ai-enabled" class="perm-checkbox"> <span class="font-bold">啟用 AI 自動判斷</span></label></div>
                        <div><label class="block text-sm text-gray-400 mb-1">禁用指令 (逗號分隔)</label><input id="adv-disabled-cmds" class="input-dark" placeholder="例如: /bot student"></div>
                    </div>
                </details>

                <details class="group"><summary class="text-green-400">📚 科目設定</summary>
                    <div class="accordion-content">
                        <div id="subject-list" class="space-y-3 mb-4"></div>
                        <button onclick="addSubjectRow()" class="btn btn-secondary w-full border-dashed border-2 border-gray-600">+ 新增科目</button>
                    </div>
                </details>
                <div class="sticky bottom-4 z-30"><button onclick="saveAllSettings()" class="btn btn-primary w-full py-3 shadow-xl">💾 儲存所有設定</button></div>
            </div>

            <!-- 3. 成員管理 -->
            <div id="view-members" class="max-w-4xl mx-auto w-full hidden">
                <div class="flex justify-between items-center border-b border-gray-700 pb-4 mb-6"><h2 class="text-2xl font-bold">成員管理</h2><button onclick="openRoleModal()" class="btn btn-primary"><i class="fas fa-user-plus"></i> 新增</button></div>
                <div id="role-list" class="grid gap-4 grid-cols-1 md:grid-cols-2"></div>
            </div>
        </main>
    </div>

    <!-- Modals -->
    <div id="modal-add" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4">
        <div class="bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl border border-gray-700">
            <h3 class="font-bold text-xl mb-4" id="modal-task-title">新增作業</h3>
            <input type="hidden" id="edit-task-id">
            <div class="space-y-3">
                <input type="date" id="add-date" class="input-dark">
                <div class="flex gap-2"><input type="time" id="add-time" class="input-dark"><select id="add-cat" class="input-dark"><option value="作業">作業</option><option value="考試">考試</option><option value="攜帶">攜帶</option></select></div>
                <select id="add-sub" class="input-dark"><option value="">選擇科目...</option></select>
                <textarea id="add-content" class="input-dark" rows="4" placeholder="內容..."></textarea>
            </div>
            <div class="flex gap-3 mt-6"><button onclick="closeModal('add')" class="btn btn-secondary flex-1">取消</button><button onclick="submitTaskAction()" class="btn btn-primary flex-1">確認</button></div>
        </div>
    </div>
    <div id="modal-role" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4">
        <div class="bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
            <h3 class="font-bold text-xl mb-4">權限設定</h3>
            <div class="space-y-4">
                <input id="r-name" class="input-dark text-lg font-bold" placeholder="職稱 (必填)">
                <input id="r-pwd" type="password" class="input-dark" placeholder="密碼 (留空不改)">
                <div class="bg-gray-900 p-4 rounded border border-gray-700"><label class="text-xs text-blue-400 font-bold mb-2 block">系統權限</label><label class="perm-row"><input type="checkbox" class="perm-chk role-perm" value="manage_tasks_full"> 作業完全管理</label><label class="perm-row"><input type="checkbox" class="perm-chk role-perm" value="manage_settings"> 系統設定管理</label><label class="perm-row"><input type="checkbox" class="perm-chk role-perm" value="manage_roles"> 成員帳號管理</label></div>
                <div class="bg-gray-900 p-4 rounded border border-gray-700"><label class="text-xs text-green-400 font-bold mb-2 block">可管理科目</label><div id="r-subs" class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto"></div></div>
            </div>
            <div class="flex gap-3 mt-6"><button onclick="closeModal('role')" class="btn btn-secondary flex-1">取消</button><button onclick="saveRole()" class="btn btn-primary flex-1">儲存</button></div>
        </div>
    </div>
    <div id="modal-pwd" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4">
        <div class="bg-gray-800 p-6 rounded-2xl w-full max-w-sm shadow-2xl border border-gray-700">
            <h3 class="font-bold text-xl mb-4 text-center">修改密碼</h3>
            <div class="space-y-4"><input type="password" id="chg-old" class="input-dark text-center" placeholder="舊密碼"><input type="password" id="chg-new" class="input-dark text-center" placeholder="新密碼"></div>
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
    window.toggleSidebar = () => { 
        document.getElementById('sidebar').classList.toggle('active'); 
        document.getElementById('sidebar-overlay').classList.toggle('active'); 
    };
    // ★ 眼睛切換函式
    window.toggleBlur = (id) => { document.getElementById(id).classList.toggle('blur-sm'); };

    window.switchView = (v) => {
        ['tasks','settings','members'].forEach(id=>document.getElementById('view-'+id).classList.add('hidden'));
        document.getElementById('view-'+v).classList.remove('hidden');
        document.querySelectorAll('.sidebar-link').forEach(el=>el.classList.remove('active'));
        const l=document.getElementById('link-'+v); if(l) l.classList.add('active');
        if(window.innerWidth < 768) toggleSidebar(); 
        document.querySelector('.main').scrollTop = 0;
    };
    window.logout = () => { localStorage.clear(); location.href = location.pathname + (gId ? '?id='+gId : ''); };

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
            
            // 綁定碼 (預設模糊)
            if(d.roleData.binding_code) { 
                document.getElementById('binding-code-area').classList.remove('hidden'); 
                document.getElementById('bind-code').innerText = d.roleData.binding_code; 
            }
            // 救援碼 (預設模糊)
            if(d.roleData.rec) { 
                document.getElementById('rescue-code-area').classList.remove('hidden'); 
                document.getElementById('rec-code').innerText = d.roleData.rec; 
            }
            
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
        const pd = document.getElementById('period-list'); pd.innerHTML='';
        Object.keys(periods).sort((a,b)=>parseInt(a)-parseInt(b)).forEach(k => {
            const p=periods[k]||{};
            pd.innerHTML += \`<div class="bg-gray-800 p-3 rounded-lg flex flex-col md:flex-row gap-3 items-center border border-gray-700 shadow-sm"><span class="font-bold text-blue-300 w-16 text-center bg-gray-900 rounded py-1">第 \${k} 節</span><div class="flex flex-1 gap-4"><label class="flex-1 text-xs text-gray-500 font-bold block">上課 <input type="time" value="\${p.start}" onchange="periods[\${k}].start=this.value" class="input-dark mt-1 py-1 text-center bg-gray-900"></label><label class="flex-1 text-xs text-gray-500 font-bold block">下課 <input type="time" value="\${p.end}" onchange="periods[\${k}].end=this.value" class="input-dark mt-1 py-1 text-center bg-gray-900"></label></div><button onclick="removePeriod('\${k}')" class="text-red-400 hover:bg-red-900/30 p-2 rounded-lg transition" title="刪除"><i class="fas fa-trash"></i></button></div>\`;
        });
        
        const sd = document.getElementById('subject-list'); sd.innerHTML='';
        const sel = document.getElementById('add-sub'); sel.innerHTML='<option value="">請選擇科目...</option>';
        const fs = document.getElementById('f-sb'); fs.innerHTML='<option value="all">📚 科目: 全部</option>';
        if(!subjects || typeof subjects !== 'object') subjects = {}; 
        Object.keys(subjects).forEach(s => {
            const keys = Array.isArray(subjects[s]) ? subjects[s].join(', ') : (subjects[s] || '');
            sd.innerHTML += \`<div class="flex gap-3 mb-2 bg-gray-800 p-2 rounded-lg items-center border border-gray-700 subject-row"><input class="input-dark w-1/3 sub-name bg-gray-900 font-bold" value="\${s}" placeholder="科目名稱"><input class="input-dark w-2/3 sub-key bg-gray-900" value="\${keys}" placeholder="關鍵字(逗號分隔)"><button onclick="this.closest('.subject-row').remove()" class="text-red-400 px-2 hover:bg-red-900/30 rounded"><i class="fas fa-trash"></i></button></div>\`;
            sel.innerHTML += \`<option value="\${s}">\${s}</option>\`; fs.innerHTML += \`<option value="\${s}">\${s}</option>\`;
        });
        
        const rd = document.getElementById('role-list'); rd.innerHTML='';
        Object.keys(roles).forEach(r => {
            const isAdmin = (r === 'Administrator');
            let delBtn = '';
            if (!isAdmin && r !== selectedRole) {
                delBtn = \`<button onclick="delRole('\${r}')" class="btn btn-danger text-xs px-3 py-1">刪除</button>\`;
            }
            let avatar = isAdmin ? '🛡️' : '👤';
            rd.innerHTML += \`<div class="card flex justify-between items-center"><div class="flex items-center gap-4"><div class="avatar-circle">\${avatar}</div><div><div class="font-bold text-lg text-white">\${r}</div><div class="text-xs text-gray-500">權限: \${(roles[r].perm||[]).length} 項</div></div></div><div class="flex gap-2"><button onclick="openRoleModal('\${r}')" class="btn btn-secondary text-xs px-3 py-1">編輯</button>\${delBtn}</div></div>\`;
        });
        
        if(advanced) {
            document.getElementById('adv-approval-mode').value = advanced.approval_mode || 'manual';
            document.getElementById('adv-ai-enabled').checked = advanced.ai_enabled || false;
            document.getElementById('adv-disabled-cmds').value = (advanced.disabled_commands || []).join(',');
        }
    }

    window.saveAllSettings = async () => {
        try {
            const newSub = {};
            document.querySelectorAll('.subject-row').forEach(row=>{ 
                const nameInput = row.querySelector('.sub-name');
                const keyInput = row.querySelector('.sub-key');
                if(nameInput && keyInput) {
                    const name = nameInput.value.trim();
                    const keysVal = keyInput.value;
                    if(name) {
                        const keys = keysVal ? keysVal.split(',').map(k => k.trim()).filter(k=>k) : [];
                        newSub[name]=keys; 
                    }
                }
            });
            advanced.periods=periods; advanced.approval_mode=document.getElementById('adv-approval-mode').value; advanced.ai_enabled=document.getElementById('adv-ai-enabled').checked; 
            const cmdsVal = document.getElementById('adv-disabled-cmds').value;
            advanced.disabled_commands = cmdsVal ? cmdsVal.split(',').map(c=>c.trim()) : [];
            await apiCall({action:'update_settings', advancedSettings:advanced, subjects:newSub, roleName:selectedRole});
            subjects=newSub; renderAll(); successAlert('設定已儲存');
        } catch(e) { console.error(e); errorAlert('儲存失敗：' + e.message); }
    };
    
    window.addPeriod = () => { const k=Object.keys(periods).map(Number); const n=k.length?Math.max(...k)+1:1; periods[n]={start:'',end:''}; renderAll(); };
    window.removePeriod = (k) => { delete periods[k]; renderAll(); };
    window.addSubjectRow = () => { 
        const html = \`<div class="flex gap-3 mb-2 bg-gray-800 p-2 rounded-lg items-center border border-gray-700 subject-row"><input class="input-dark w-1/3 sub-name bg-gray-900 font-bold" value="" placeholder="新科目"><input class="input-dark w-2/3 sub-key bg-gray-900" value="" placeholder="關鍵字"><button onclick="this.closest('.subject-row').remove()" class="text-red-400 px-2 hover:bg-red-900/30 rounded"><i class="fas fa-trash"></i></button></div>\`;
        document.getElementById('subject-list').insertAdjacentHTML('beforeend', html);
    };

    window.openRoleModal = (n='') => {
        openModal('role'); document.getElementById('r-name').value = n; document.getElementById('r-pwd').value = '';
        document.querySelectorAll('.role-perm').forEach(c=>c.checked=false);
        const c=document.getElementById('r-subs'); c.innerHTML='<label class="perm-row"><input type="checkbox" value="all" class="r-sub perm-checkbox"> <span>🌟 全科 (All)</span></label>';
        Object.keys(subjects).forEach(s => c.innerHTML+=\`<label class="perm-row"><input type="checkbox" value="\${s}" class="r-sub perm-checkbox"> <span>\${s}</span></label>\`);
        
        const isSelf = (n === selectedRole);
        // ★ 禁止修改 Administrator 的名稱與密碼
        if (n === 'Administrator') {
             document.getElementById('r-name').disabled = true;
             document.getElementById('r-pwd').disabled = true;
             document.getElementById('r-pwd').placeholder = "禁止修改";
             document.querySelectorAll('.role-perm').forEach(c=>{ c.checked=true; c.disabled=true; });
             document.querySelectorAll('.r-sub').forEach(c=>{ c.checked=true; c.disabled=true; });
        } else {
             document.getElementById('r-name').disabled = false;
             document.getElementById('r-pwd').disabled = false;
             document.getElementById('r-pwd').placeholder = "密碼 (留空不改)";
             if(n && roles[n]) {
                (roles[n].perm||[]).forEach(p=>{ const el=document.querySelector(\`.role-perm[value="\${p}"]\`); if(el) { el.checked=true; if(isSelf) el.disabled=true; } });
                (roles[n].subjects||[]).forEach(s=>{ const el=document.querySelector(\`.r-sub[value="\${s}"]\`); if(el) { el.checked=true; if(isSelf) el.disabled=true; } });
             }
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
        if(n === 'Administrator') return errorAlert('無法刪除最高管理員');
        if(!await myConfirm(\`確定要刪除成員 "\${n}" 嗎？\`)) return;
        try {
            const res = await fetch(location.href, { 
                method: 'POST', 
                body: JSON.stringify({ 
                    action: 'update_settings', 
                    groupId: gId, 
                    password: localStorage.getItem('hw_pwd'), 
                    roleName: selectedRole,
                    deleteRole: n
                }) 
            });
            const d = await res.json();
            if(d.status === 'success') { 
                if(d.newRoles) roles = d.newRoles; else delete roles[n]; 
                renderAll(); 
                successAlert('已刪除'); 
            } else alert(d.msg);
        } catch(e) { 
            console.error(e); alert('刪除失敗'); 
        }
    };

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
    
    window.applyFilters = window.renderTasks;
    window.openAddModal = () => openModal('add');
    async function apiCall(d){ d.groupId=gId; d.password=localStorage.getItem('hw_pwd'); d.roleName=selectedRole; const res=await fetch(location.href,{method:'POST',body:JSON.stringify(d)}); const r=await res.json(); if(r.status==='success'){ if(d.action!=='admin_get_tasks') loadTasks(); } else errorAlert(r.msg); }
    </script></body></html>`;
}

// --- END OF PART 10 (FINAL ULTIMATE FIX v4.9.6) ---
