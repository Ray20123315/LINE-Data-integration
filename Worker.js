// ==========================================
// ★ 設定區
// ==========================================
const SUPER_ADMIN_PASSWORD_ENV_KEY = 'SUPER_ADMIN_PASSWORD'; 
const SUPER_ADMIN_PATH = "/super-admin";

// ★ 版本與更新控制
const CURRENT_VERSION = "2.9.0"; // 程式碼版本 (功能更新改這裡)
const TERMS_VERSION = "v1.0";    // 條款版本 (只有修改法律條款才改這裡，會觸發全員重新同意)

const CHANGELOG = `版本 ${CURRENT_VERSION} 更新：\n- 系統更新與條款更新分離。\n- 優化同意後的流程，舊用戶無需重新設定 ID。\n- 修正介面用語。`;

// 風控與安全性設定
const RISK_CONTROL_ENABLED = true; 
const MAX_LOGIN_ATTEMPTS = 5;      
const LOCKOUT_DURATION = 15 * 60 * 1000; 

// 客服與通知
const LINK_LINE_HOST = "https://github.com/Ray20123315/LINE-Data-integration"; 
const LINK_DISCORD = "https://discord.gg/kwRpZwn772";
const MAIL_CONTACT = "ray2026worker@ray2026.dpdns.org";
const CUSTOM_LINE_CONTACT = "https://lin.ee/VJ8IC4D";
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1447399857336746104/C3i3kpWvPm3ylH9x8tqi-PMEaKOxrNdqXftgYXmPtk-S0tLgQfvpbjyfcidUkIMiIZjZ";

const BAD_WORDS = ["幹", "靠北", "三小", "機掰", "白癡", "智障", "腦殘", "fuck", "shit"];

// 法律條款 (HTML 格式)
const TERMS_HTML_CONTENT = `
    <h1 class="text-2xl font-bold mb-6 text-blue-300">服務條款與隱私權政策 (${TERMS_VERSION})</h1>
    <div class="space-y-4 text-gray-300">
        <div>
            <h2 class="text-lg font-semibold text-red-400">1. 隱私權政策 (Privacy Policy)</h2>
            <p>本服務僅在必要範圍內處理使用者資料，包括：LINE User ID、使用者名稱、自訂班級名稱、綁定狀態、救援碼（以明碼方式儲存）。所有資料僅用於：提供作業整理功能、帳戶識別、系統運作與安全需求。資料以安全方式儲存，不會與第三方共享。使用者可要求刪除資料。</p>
        </div>
        <div>
            <h2 class="text-lg font-semibold text-red-400">2. 資料安全政策 (Data Security Policy)</h2>
            <p>系統採用 SHA-256 雜湊技術儲存密碼，避免明碼暴露。後端採權限分級管理。伺服器採 HTTPS 加密傳輸。</p>
        </div>
        <div>
            <h2 class="text-lg font-semibold text-red-400">3. 個資法 / GDPR 遵循</h2>
            <p>蒐集目的為提供作業整理與帳戶管理服務。使用期限至使用者終止服務後。使用者可依法規行使查詢、刪除、停止處理等權利。</p>
        </div>
        <div>
            <h2 class="text-lg font-semibold text-blue-400">4. 使用者行為政策 (User Conduct Policy)</h2>
            <p>使用者不得嘗試繞過授權、反編譯系統、修改資料庫內容、進行惡意攻擊、侵害他人隱私、或以商業方式使用本軟體。違者將立即終止授權。</p>
        </div>
        <div>
            <h2 class="text-lg font-semibold text-green-400">5. 服務終止與撤銷 (Service Termination)</h2>
            <p>作者保留隨時終止授權或關閉服務的權利。使用者違反 CC BY-NC-ND 4.0 或本條款時，其授權將自動撤銷。</p>
        </div>
    </div>
    <div class="mt-8 p-4 bg-red-900/30 border border-red-500 rounded text-center">
        <p class="text-red-300 font-bold">⚠️ 若不同意上述條款，請在群組輸入： <span class="text-white bg-red-800 px-2 py-1 rounded">/bot disagree</span></p>
    </div>
`;
const LEGAL_TEXT_SHORT = `[條款版本: ${TERMS_VERSION}]
在開始使用前，請所有成員點擊下方連結閱讀服務條款，並在群組中輸入 /bot agree 表示同意。

⚠️ 請注意：需【所有】群組成員都同意後，機器人才能啟用。`;

// EULA 內容
const EULA_TEXT = `
<h1 class="text-2xl font-bold mb-4">最終使用者許可協議 (EULA)</h1>
<p class="mb-4">歡迎使用本作業機器人服務。在使用本網站或服務之前，您必須同意以下條款：</p>
<ul class="list-disc pl-5 mb-4 space-y-2">
    <li><strong>授權使用：</strong> 本服務僅授權用於教育與班級管理用途。</li>
    <li><strong>免責聲明：</strong> 開發者不對因使用本服務而導致的任何資料遺失或損害負責。</li>
    <li><strong>資料收集：</strong> 我們會收集您的 IP 位址與必要的操作紀錄以維護系統安全。</li>
    <li><strong>禁止濫用：</strong> 禁止任何形式的攻擊、濫發訊息或未經授權的存取。</li>
</ul>
<p class="mb-4 text-red-400">若您不同意上述條款，請立即停止使用本服務。</p>
`;

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const hostname = url.hostname; 
        const CURRENT_ORIGIN = `${url.protocol}//${hostname}${url.port ? ':' + url.port : ''}`;
        
        const isManagerSite = hostname.includes("homeworkmanage") || hostname.includes("manage");
        const isSuperAdmin = hostname.includes("super") || url.pathname === SUPER_ADMIN_PATH; 
        const isSupportPage = url.pathname === "/support";
        const isEulaPage = url.pathname === "/eula";
        const isTermsPage = url.pathname === "/terms";

        if (request.method === "POST") {
            return handlePost(request, env, ctx, CURRENT_ORIGIN);
        }

        if (!isEulaPage && !isTermsPage && !isSuperAdmin && !request.headers.get("User-Agent")?.includes("LINE")) {
            const cookie = request.headers.get("Cookie");
            if (!cookie || !cookie.includes("eula_accepted=true")) {
                const target = encodeURIComponent(request.url);
                return Response.redirect(`${CURRENT_ORIGIN}/eula?redirect=${target}`, 302);
            }
        }
        
        if (isEulaPage) return new Response(renderEULAHTML(url.searchParams.get('redirect'), CURRENT_ORIGIN), { headers: { "Content-Type": "text/html;charset=utf-8" } });
        if (isTermsPage) return new Response(renderTermsHTML(CURRENT_ORIGIN), { headers: { "Content-Type": "text/html;charset=utf-8" } });
        if (isSuperAdmin) return new Response(renderSuperAdminHTML(CURRENT_ORIGIN), { headers: { "Content-Type": "text/html;charset=utf-8" } });
        if (isSupportPage) return new Response(renderSupportHTML(CURRENT_ORIGIN), { headers: { "Content-Type": "text/html;charset=utf-8" } });
        if (isManagerSite) return new Response(renderManagerHTML(CURRENT_ORIGIN), { headers: { "Content-Type": "text/html;charset=utf-8" } });
        
        const id = url.searchParams.get('id');
        if (!id) return new Response(renderHomePage(CURRENT_ORIGIN), { headers: { "Content-Type": "text/html;charset=utf-8" } });
        return new Response(renderStudentHTML(CURRENT_ORIGIN), { headers: { "Content-Type": "text/html;charset=utf-8" } });
    }
};

// ====================================================================
// ★ 後端邏輯
// ====================================================================
async function handlePost(request, env, ctx, origin) {
    try {
        const json = await request.json();
        const { groupId, action } = json;

        if (json.events) return handleLineWebhook(json.events, env, ctx, origin);
        
        if (action === "agree_eula") {
            await writeLog(env, "WEB_USER", "Anonymous", "AGREE_EULA", "User agreed to EULA", request);
            const headers = new Headers();
            headers.append("Set-Cookie", "eula_accepted=true; Path=/; Max-Age=31536000; SameSite=Lax; Secure; HttpOnly");
            return new Response(JSON.stringify({ status: "success" }), { headers });
        }

        if (action === "log_frontend_action") {
            if (!groupId) return new Response("OK");
            await writeLog(env, groupId, "Student_Visitor", json.logType, json.logDetail, request);
            return new Response(JSON.stringify({ status: "success" }));
        }

        if (action === "send_support_msg") {
            const { message, type } = json;
            if (!message) return new Response(JSON.stringify({ status: "fail" }));
            await sendDiscordAlert(type, message);
            return new Response(JSON.stringify({ status: "success" }));
        }

        if (action === "get_tasks") {
            if (!groupId) return new Response(JSON.stringify([]));
            await writeLog(env, groupId, "Student_Visitor", "VIEW_PAGE", "Viewed Task List", request);
            const auth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(groupId).first();
            if (auth) {
                if (auth.status === 'terminated') return new Response(JSON.stringify({ tasks: [], error: "🚨 服務已終止。" }));
                if (auth.is_locked === 1) return new Response(JSON.stringify({ tasks: [], error: "⚠️ 群組有新成員尚未同意法律條款，系統暫停服務中。" }));
                const feStatus = auth.frontend_status || auth.前端存取權 || 'enabled';
                if (feStatus === 'disabled') return new Response(JSON.stringify({ tasks: [], error: "系統維護中，目前無法訪問。" }));
                let settings = {}; try { settings = JSON.parse(auth.advanced_settings || '{}'); } catch(e){}
                const approvalMode = settings.approval_mode || 'timed';
                const delayMins = parseInt(settings.approval_delay || 10);
                if (approvalMode === 'timed') {
                    const timeThreshold = Date.now() - (delayMins * 60 * 1000);
                    await env.DB.prepare("UPDATE tasks SET 狀態 = '已發佈' WHERE 狀態 = '待審核' AND 建立時間 < ? AND 群組 = ?").bind(timeThreshold, groupId).run();
                }
                const { results } = await env.DB.prepare(`SELECT id, 群組 as group_id, 建立時間 as created_at, 截止日期 as date, 科目 as subject, 內容 as content, 來源 as source, 狀態 as status, 類別 as category FROM tasks WHERE 狀態 = '已發佈' AND 群組 = ? ORDER BY 截止日期 ASC`).bind(groupId).all();
                let customSubjects = [];
                if (auth.科目設定) { try { const parsed = JSON.parse(auth.科目設定); customSubjects = Array.isArray(parsed) ? parsed : Object.keys(parsed); } catch(e) { customSubjects = []; } }
                const activeMonths = [...new Set(results.map(t => new Date(t.date).getMonth() + 1))].sort((a,b)=>a-b);
                return new Response(JSON.stringify({ tasks: results, customSubjects, activeMonths, groupName: auth.群組名稱 || "班級作業" }));
            }
            return new Response(JSON.stringify({ tasks: [], error: "找不到此群組" }));
        }

        // --- Admin Actions ---
        if (action === "admin_get_tasks") {
            const { results } = await env.DB.prepare(`SELECT id, 群組 as group_id, 建立時間 as created_at, 截止日期 as date, 科目 as subject, 內容 as content, 來源 as source, 狀態 as status, 類別 as category FROM tasks WHERE 群組 = ? ORDER BY 建立時間 DESC`).bind(groupId).all();
            return new Response(JSON.stringify({ tasks: results }));
        }
        
        if (action === "add_task") {
            if (!groupId) return new Response("Error: No Group ID", { status: 400 });
            let cat = json.category || "作業";
            if (!json.category) { if (json.content.includes("考")) cat="考試"; else if(json.content.includes("帶")) cat="攜帶"; }
            const status = json.isAdmin ? "已發佈" : "待審核";
            await env.DB.prepare(`INSERT INTO tasks (群組, 建立時間, 截止日期, 科目, 內容, 來源, 狀態, 類別) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(groupId, Date.now(), json.date, json.subject, json.content, "網頁", status, cat).run();
            if(json.isAdmin) await writeLog(env, groupId, json.roleName || "Admin", "ADD_TASK", json.content, request);
            return new Response(JSON.stringify({ status: "success" }));
        }
        
        if (action === "update_task") {
            const auth = await env.DB.prepare("SELECT 角色設定 as roles_json FROM group_auth WHERE group_id = ?").bind(groupId).first();
            if (!auth) return new Response(JSON.stringify({ status: "fail" }));
            const roles = JSON.parse(auth.roles_json);
            const actor = roles[json.roleName];
            const isNoPwd = (!actor.hash || actor.hash === "");
            if (!isNoPwd && actor.hash !== await sha256((json.password||"").trim())) return new Response(JSON.stringify({ status: "fail", msg: "密碼錯誤" }));
            let canDo = false;
            const actorPerms = actor.perm || [];
            if (json.roleName === "總管理員" || actorPerms.includes("manage_tasks_full")) canDo = true;
            else {
                const task = await env.DB.prepare("SELECT 科目 as subject FROM tasks WHERE id = ?").bind(json.taskId).first();
                if (task) { const actorSubjects = actor.subjects || []; if (actorSubjects.includes(task.subject) || actorSubjects.includes('all')) canDo = true; }
            }
            if (canDo) {
                await env.DB.prepare(`UPDATE tasks SET 截止日期 = ?, 科目 = ?, 內容 = ?, 類別 = ? WHERE id = ?`).bind(json.date, json.subject, json.content, json.category, json.taskId).run();
                await writeLog(env, groupId, json.roleName, "UPDATE_TASK", `ID:${json.taskId}`, request);
                return new Response(JSON.stringify({ status: "success" }));
            }
            return new Response(JSON.stringify({ status: "permission_denied" }));
        }

        if (action === "manage_task") {
            const auth = await env.DB.prepare("SELECT 角色設定 as roles_json FROM group_auth WHERE group_id = ?").bind(groupId).first();
            if (!auth) return new Response(JSON.stringify({ status: "fail" }));
            const roles = JSON.parse(auth.roles_json);
            const actor = roles[json.roleName];
            const isNoPwd = (!actor.hash || actor.hash === "");
            if (!isNoPwd && actor.hash !== await sha256((json.password||"").trim())) return new Response(JSON.stringify({ status: "fail", msg: "密碼錯誤" }));
            let canDo = false;
            const actorPerms = actor.perm || [];
            if (json.roleName === "總管理員" || actorPerms.includes("manage_tasks_full") || actorPerms.includes("manage_roles")) canDo = true;
            else {
                const task = await env.DB.prepare("SELECT 科目 as subject FROM tasks WHERE id = ?").bind(json.taskId).first();
                if (task) { const actorSubjects = actor.subjects || []; if (actorSubjects.includes(task.subject) || actorSubjects.includes('all')) canDo = true; }
            }
            if (canDo) {
                if(json.type === 'delete') {
                    await env.DB.prepare("DELETE FROM tasks WHERE id = ?").bind(json.taskId).run();
                    await writeLog(env, groupId, json.roleName, "DELETE_TASK", `ID:${json.taskId}`, request);
                } else if (json.type === 'approve') {
                    await env.DB.prepare("UPDATE tasks SET 狀態 = '已發佈' WHERE id = ?").bind(json.taskId).run();
                    await writeLog(env, groupId, json.roleName, "APPROVE_TASK", `ID:${json.taskId}`, request);
                }
                return new Response(JSON.stringify({ status: "success" }));
            }
            return new Response(JSON.stringify({ status: "permission_denied" }));
        }

        if (action === "admin_check_status") {
            const auth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(groupId).first();
            if (!auth) return new Response(JSON.stringify({ status: "need_setup" }));
            const rolesMap = JSON.parse(auth.角色設定 || auth.roles_json);
            let adv = {}; 
            try { if (auth.advanced_settings) adv = JSON.parse(auth.advanced_settings); } catch(e){}
            return new Response(JSON.stringify({ status: "login", roles: rolesMap, groupName: auth.群組名稱, advanced: adv }));
        }

        if (action === "admin_setup") {
            if (!json.groupName) return new Response(JSON.stringify({ status: "fail", msg: "需要群組名稱" }));
            const pwd = (json.password || "").trim();
            const hash = pwd ? await sha256(pwd) : "";
            const rescueCode = genRescueCode();
            const restoreCode = genRestoreCode();
            const bindingCode = Math.floor(1000 + Math.random() * 9000).toString();
            const initialRoles = { "總管理員": { hash: hash, rec: rescueCode, restore_key: restoreCode, binding_code: bindingCode, owner_line_id: null, subjects: ["all"], perm: ["manage_roles", "manage_settings", "manage_tasks_full", "access_frontend_control", "self_change_pwd"], level: 99 } };
            const defaultSubjects = JSON.stringify({ '國語': ['國文', '國語'], '英文': ['英文'], '數學': ['數學'], '其他': [] });
            await env.DB.prepare("INSERT OR REPLACE INTO group_auth (group_id, 群組名稱, 角色設定, 科目設定, 前端存取權, disagreement_policy, status, version) VALUES (?, ?, ?, ?, ?, NULL, 'active', ?)").bind(groupId, json.groupName, JSON.stringify(initialRoles), defaultSubjects, 'enabled', CURRENT_VERSION).run();
            await writeLog(env, groupId, "System", "INIT_GROUP", `Name: ${json.groupName}`, request);
            return new Response(JSON.stringify({ status: "success", role: "總管理員", recoveryCode: restoreCode, bindingCode: bindingCode, groupName: json.groupName }));
        }

        if (action === "admin_login") {
            const auth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(groupId).first();
            if (!auth) return new Response(JSON.stringify({ status: "fail", msg: "ID 不存在" }));
            const roles = JSON.parse(auth.角色設定);
            const targetRole = roles[json.roleName];
            if (!targetRole) return new Response(JSON.stringify({ status: "fail", msg: "角色不存在" }));
            const lockoutUntil = targetRole.lockout_until || 0;
            const now = Date.now();
            if (RISK_CONTROL_ENABLED && targetRole.hash && targetRole.hash !== "" && lockoutUntil > now) {
                const waitMin = Math.ceil((lockoutUntil - now) / 60000);
                await writeLog(env, groupId, json.roleName, "LOGIN_LOCKED", `Attempted login during lockout`, request);
                return new Response(JSON.stringify({ status: "fail", msg: `嘗試次數過多，請等待 ${waitMin} 分鐘後再試。` }));
            }
            let loginSuccess = false;
            const inputPwd = (json.password || "").trim();
            if (!targetRole.hash || targetRole.hash === "") { loginSuccess = true; } 
            else { if (targetRole.hash === await sha256(inputPwd)) loginSuccess = true; }
            if (loginSuccess) {
                await writeLog(env, groupId, json.roleName, "LOGIN_SUCCESS", "", request);
                try {
                    if((targetRole.login_fails || 0) > 0 || lockoutUntil > 0) {
                        targetRole.login_fails = 0; targetRole.lockout_until = null;
                    }
                    let needsUpdate = false;
                    if (json.roleName === '總管理員') {
                        if(!targetRole.level) { targetRole.level = 99; needsUpdate = true; }
                        if(!targetRole.perm) { targetRole.perm = ["manage_roles", "manage_settings", "manage_tasks_full"]; needsUpdate = true; }
                        if (!targetRole.binding_code && !targetRole.owner_line_id) {
                            targetRole.binding_code = Math.floor(1000 + Math.random() * 9000).toString();
                            needsUpdate = true;
                        }
                    }
                    if(needsUpdate || (targetRole.login_fails === 0 && lockoutUntil > 0)) {
                         roles[json.roleName] = targetRole;
                         await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), groupId).run();
                    }
                } catch(e) { console.error("DB Update Error (Login Success):", e); }
                let subjectsConfig = {};
                try { subjectsConfig = JSON.parse(auth.科目設定); if (Array.isArray(subjectsConfig)) { const converted = {}; subjectsConfig.forEach(s => converted[s] = [s]); subjectsConfig = converted; } } catch(e) { subjectsConfig = {}; }
                let adv = {}; try { if(auth.advanced_settings) adv = JSON.parse(auth.advanced_settings); } catch(e){}
                return new Response(JSON.stringify({ 
                    status: "success", 
                    roleData: targetRole, 
                    roleName: json.roleName, 
                    subjects: subjectsConfig, 
                    allRoles: roles, 
                    groupName: auth.群組名稱, 
                    frontendStatus: auth.frontend_status || auth.前端存取權 || 'enabled',
                    showBindNotify: auth.bind_notify === 1,
                    showPwdNotify: auth.pwd_notify === 1,
                    advanced: adv
                }));
            } else {
                let msg = "密碼錯誤";
                try {
                    let fails = targetRole.login_fails || 0;
                    fails++;
                    targetRole.login_fails = fails;
                    if (RISK_CONTROL_ENABLED && fails >= MAX_LOGIN_ATTEMPTS) {
                        targetRole.lockout_until = now + LOCKOUT_DURATION;
                        msg = `密碼錯誤次數過多，帳號已鎖定 15 分鐘。`;
                        await writeLog(env, groupId, json.roleName, "LOGIN_LOCKOUT", `Failed ${fails} times`, request);
                        await sendDiscordAlert("風控警報", `群組: ${groupId}\n使用者: ${json.roleName}\n狀態: 密碼錯誤過多，已鎖定。`);
                    } else {
                        msg = `密碼錯誤。剩餘嘗試次數：${MAX_LOGIN_ATTEMPTS - fails}`;
                        await writeLog(env, groupId, json.roleName, "LOGIN_FAIL", "Wrong Password", request);
                    }
                    roles[json.roleName] = targetRole;
                    await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), groupId).run();
                } catch(e) { console.error("DB Update Error (Login Fail):", e); }
                return new Response(JSON.stringify({ status: "fail", msg: msg }));
            }
        }
        if (action === "admin_reset_pwd") { const auth = await env.DB.prepare("SELECT 角色設定 as roles_json FROM group_auth WHERE group_id = ?").bind(groupId).first(); if (!auth) return new Response(JSON.stringify({ status: "fail" })); let roles = JSON.parse(auth.roles_json); const targetRole = roles[json.roleName]; if (!targetRole || targetRole.rec !== json.recoveryCode) return new Response(JSON.stringify({ status: "fail" })); const newPwd = (json.newPassword || "").trim(); targetRole.hash = newPwd ? await sha256(newPwd) : ""; targetRole.rec = genRescueCode(); targetRole.login_fails = 0; targetRole.lockout_until = null; roles[json.roleName] = targetRole; await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), groupId).run(); await writeLog(env, groupId, json.roleName, "RESET_PASSWORD", "Used Rescue Code", request); return new Response(JSON.stringify({ status: "success", newRecoveryCode: targetRole.rec })); }
        
        if (action === "admin_change_pwd") { const auth = await env.DB.prepare("SELECT 角色設定 as roles_json FROM group_auth WHERE group_id = ?").bind(groupId).first(); if (!auth) return new Response(JSON.stringify({ status: "fail" })); let roles = JSON.parse(auth.roles_json); const targetRole = roles[json.roleName]; if (!targetRole) return new Response(JSON.stringify({ status: "fail" })); const oldPwd = (json.oldPassword || "").trim(); const newPwd = (json.newPassword || "").trim(); const isNoPwd = (!targetRole.hash || targetRole.hash === ""); if (!isNoPwd) { if (targetRole.hash !== await sha256(oldPwd)) return new Response(JSON.stringify({ status: "fail", msg: "舊密碼錯誤" })); } if(newPwd !== "") targetRole.hash = await sha256(newPwd); else targetRole.hash = ""; roles[json.roleName] = targetRole; await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), groupId).run(); await writeLog(env, groupId, json.roleName, "CHANGE_PASSWORD", "", request); return new Response(JSON.stringify({ status: "success" })); }
        
        if (action === "update_settings") {
            const auth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(groupId).first();
            if (!auth) return new Response(JSON.stringify({ status: "fail" }));
            let roles = JSON.parse(auth.角色設定);
            const reqRole = roles["總管理員"]; 
            const reqPwd = (json.password || "").trim();
            const isNoPwd = (!reqRole.hash || reqRole.hash === "");
            if (!isNoPwd && reqRole.hash !== await sha256(reqPwd)) return new Response(JSON.stringify({ status: "fail", msg: "權限不足" }));

            if (json.subjects) await env.DB.prepare("UPDATE group_auth SET 科目設定 = ? WHERE group_id = ?").bind(JSON.stringify(json.subjects), groupId).run();
            if (json.frontendStatus) {
                try { await env.DB.prepare("UPDATE group_auth SET frontend_status = ? WHERE group_id = ?").bind(json.frontendStatus, groupId).run(); } 
                catch(e) { await env.DB.prepare("UPDATE group_auth SET 前端存取權 = ? WHERE group_id = ?").bind(json.frontendStatus, groupId).run(); }
            }
            if (json.advancedSettings) {
                let oldAdv = {}; try { if(auth.advanced_settings) oldAdv = JSON.parse(auth.advanced_settings); } catch(e){}
                const newAdv = { ...oldAdv, ...json.advancedSettings };
                await env.DB.prepare("UPDATE group_auth SET advanced_settings = ? WHERE group_id = ?").bind(JSON.stringify(newAdv), groupId).run();
            }
            if (json.settings && json.settings.roles) {
                const newRolesData = json.settings.roles;
                const finalRolesToSave = {};
                for (let [name, data] of Object.entries(newRolesData)) {
                     let old = roles[name] || {};
                     let hash = "";
                     const inputNewPwd = (data.password || "").trim();
                     if(inputNewPwd !== "") { hash = await sha256(inputNewPwd); } else { hash = old.hash || ""; }
                     let rec = old.rec || genRescueCode();
                     let autoLevel = 10;
                     if((data.perm||[]).includes('manage_settings')) autoLevel = 99;
                     finalRolesToSave[name] = { hash: hash, rec: rec, restore_key: old.restore_key, binding_code: old.binding_code, owner_line_id: old.owner_line_id, login_fails: old.login_fails || 0, lockout_until: old.lockout_until || null, subjects: data.subjects || [], perm: data.perm || [], level: autoLevel };
                }
                if(!finalRolesToSave["總管理員"] && roles["總管理員"]) finalRolesToSave["總管理員"] = roles["總管理員"];
                await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(finalRolesToSave), groupId).run();
                await writeLog(env, groupId, json.roleName || "Admin", "UPDATE_ROLES", "", request);
                return new Response(JSON.stringify({ status: "success", newRoles: finalRolesToSave }));
            }
            await writeLog(env, groupId, json.roleName || "Admin", "UPDATE_SETTINGS", "", request);
            return new Response(JSON.stringify({ status: "success" }));
        }

        if (action.startsWith("super_admin")) {
            const superPwd = env[SUPER_ADMIN_PASSWORD_ENV_KEY];
            if (!superPwd || json.password !== superPwd) {
                if(action === "super_admin_login") {
                    const failLimit = 5;
                    const checkTime = Date.now() - (15 * 60 * 1000);
                    const {c} = await env.DB.prepare("SELECT COUNT(*) as c FROM logs WHERE action = 'SUPER_LOGIN_FAIL' AND ip_address = ? AND timestamp > ?").bind(ip, checkTime).first();
                    if (c >= failLimit) return new Response(JSON.stringify({ status: "fail", msg: "嘗試次數過多，已鎖定 15 分鐘。" }));
                    await writeLog(env, "SYSTEM", "SuperAdmin", "SUPER_LOGIN_FAIL", "Wrong Password", request);
                }
                return new Response(JSON.stringify({ status: "fail", msg: "密碼錯誤或未設定" }));
            }
            if (action === "super_admin_login") { return new Response(JSON.stringify({ status: "success" })); }
            if (action === "super_admin_get_groups") {
                const { results } = await env.DB.prepare("SELECT * FROM group_auth").all();
                const groups = results.map(g => {
                    let roles = {}; let rescue = "無"; let isBound = false; let hasPwd = false;
                    try { roles = JSON.parse(g.角色設定); if(roles["總管理員"]) { rescue = roles["總管理員"].rec; if(roles["總管理員"].owner_line_id) isBound = true; if(roles["總管理員"].hash && roles["總管理員"].hash !== "") hasPwd = true; } } catch (e) {}
                    return { group_id: g.group_id, group_name: g.群組名稱 || '未命名', role_count: Object.keys(roles).length, rescue_code: rescue, is_bound: isBound, has_pwd: hasPwd };
                });
                return new Response(JSON.stringify({ status: "success", groups }));
            }
            if (action === "super_admin_notify") { const type = json.notifyType; try { if(type === 'bind') await env.DB.prepare("UPDATE group_auth SET bind_notify = 1 WHERE group_id = ?").bind(json.targetGroupId).run(); if(type === 'pwd') await env.DB.prepare("UPDATE group_auth SET pwd_notify = 1 WHERE group_id = ?").bind(json.targetGroupId).run(); return new Response(JSON.stringify({ status: "success" })); } catch(e) { return new Response(JSON.stringify({ status: "fail", msg: "DB Error" })); } }
            if (action === "super_admin_delete_group") { await env.DB.prepare("DELETE FROM group_auth WHERE group_id = ?").bind(json.targetGroupId).run(); await env.DB.prepare("DELETE FROM tasks WHERE 群組 = ?").bind(json.targetGroupId).run(); await env.DB.prepare("DELETE FROM line_user_state WHERE group_id = ?").bind(json.targetGroupId).run(); return new Response(JSON.stringify({ status: "success" })); }
            if (action === "super_admin_search") { const kw = json.keyword.trim(); const { results } = await env.DB.prepare("SELECT * FROM group_auth").all(); const found = []; for(const g of results) { try { const roles = JSON.parse(g.角色設定); const admin = roles["總管理員"]; const matchId = g.group_id.includes(kw); const matchName = (g.群組名稱||"").includes(kw); const matchRestore = (admin && admin.restore_key === kw); if(matchId || matchName || matchRestore) { found.push({ group_id: g.group_id, group_name: g.群組名稱, rescue_code: admin ? admin.rec : "無", is_bound: !!(admin && admin.owner_line_id) }); } } catch(e) {} } return new Response(JSON.stringify({ status: "success", data: found })); }
            if (action === "super_admin_regen_restore") { const gId = json.targetGroupId; const auth = await env.DB.prepare("SELECT 角色設定 as roles_json FROM group_auth WHERE group_id = ?").bind(gId).first(); if(!auth) return new Response(JSON.stringify({ status: "fail", msg: "群組不存在" })); let roles = JSON.parse(auth.roles_json); if(roles["總管理員"]) { roles["總管理員"].restore_key = genRestoreCode(); await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), gId).run(); return new Response(JSON.stringify({ status: "success", newRestoreCode: roles["總管理員"].restore_key })); } return new Response(JSON.stringify({ status: "fail" })); }
        }

        return new Response(JSON.stringify({error: "Unknown Action"}), { status: 400 }); 
    } catch (err) {
        console.error("Critical Error in handlePost:", err);
        return new Response(JSON.stringify({ error: err.message, stack: err.stack }), { status: 500 });
    }
}

// ====================================================================
// ★ LINE Webhook
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
                    await env.DB.prepare("UPDATE group_auth SET is_locked = 1, locking_user_id = ? WHERE group_id = ?").bind(newMembers[0].userId, gId).run();
                    const welcome = `⚠️ 有新成員加入！\n為確保所有成員權益，系統暫停服務。\n新成員需在群組輸入 /bot agree 同意條款後，服務才能恢復。`;
                    ctx.waitUntil(replyLineMessageWithButton(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, welcome, "查看條款", `${origin}/terms`));
                }
                continue;
            }

            if (event.type !== 'message' || event.message.type !== 'text') continue;
            
            const text = event.message.text.trim();

            if (isPrivate) {
                if (text.startsWith('/bind ')) {
                    const code = text.replace('/bind ', '').trim();
                    const { results } = await env.DB.prepare("SELECT group_id, 角色設定 FROM group_auth").all();
                    let foundGroup = null;
                    for(const g of results) { 
                        try { 
                            let roles = JSON.parse(g.角色設定); 
                            if (roles["總管理員"] && roles["總管理員"].binding_code === code) { 
                                roles["總管理員"].binding_code = null; 
                                roles["總管理員"].owner_line_id = uId; 
                                await env.DB.prepare("UPDATE group_auth SET 角色設定 = ? WHERE group_id = ?").bind(JSON.stringify(roles), g.group_id).run(); 
                                foundGroup = g.group_id; 
                                break; 
                            } 
                        } catch(e) { /* 忽略 JSON 錯誤 */ } 
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
                             if(r["總管理員"]?.owner_line_id === uId) {
                                 ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `🔑 復原碼：${r["總管理員"].rec}`));
                             } else {
                                 ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "⛔ 權限不足。"));
                             }
                         }
                    } else {
                        ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "⚠️ 請先在群組完成設定並綁定。"));
                    }
                }
                continue;
            }

            if (text.startsWith('/bind ')) {
                ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "🚫 為了安全，請在與機器人的「個人聊天」中使用 /bind 指令。"));
                continue;
            }

            if (text === '/bot test') { ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "✅ Cloudflare Worker 連接正常！")); continue; }
            if (text === '/bot help') { const helpMsg = `🤖 指令清單：\n🔹 /bot 學生：取得學生網址\n🔹 /bot 後台：取得後台網址\n🔹 /bot 復原碼：顯示復原碼 (限私訊)\n🔹 /bot ID：顯示群組 ID\n\n⚙️ 管理指令：\n/bind <4碼>：綁定管理員(限私訊)\n\n⚙️ 其他：\n/bot newID：生成新群組\n/bot <ID>：沿用舊設定`; ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, helpMsg)); continue; }

            const groupAuthPreCheck = await env.DB.prepare("SELECT status, version FROM group_auth WHERE group_id = ?").bind(gId).first();
            if (groupAuthPreCheck && groupAuthPreCheck.status === 'terminated') { continue; }
            
            // 修正：只有在非 awaiting_agreement 狀態下才觸發版本更新通知
            let userState = await env.DB.prepare("SELECT * FROM line_user_state WHERE user_id = ? AND group_id = ?").bind(uId, gId).first();
            
            if (groupAuthPreCheck && groupAuthPreCheck.version !== CURRENT_VERSION && userState?.state !== 'awaiting_agreement') {
                await env.DB.prepare("UPDATE group_auth SET is_locked = 1 WHERE group_id = ?").bind(gId).run();
                await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'awaiting_agreement')").bind(uId, gId).run();
                await env.DB.prepare("DELETE FROM group_agreements WHERE group_id = ?").bind(gId).run();
                ctx.waitUntil(replyLineMessageWithButton(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `🔄 服務版本已更新！\n為確保所有成員了解最新條款，請全體成員重新同意。\n\n${CHANGELOG}`, "閱讀最新條款", `${origin}/terms`));
                continue;
            }

            if (text === '/bot start') {
                await env.DB.prepare("INSERT OR IGNORE INTO group_auth (group_id) VALUES (?)").bind(gId).run();
                await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'awaiting_agreement')").bind(uId, gId).run();
                await env.DB.prepare("DELETE FROM group_agreements WHERE group_id = ?").bind(gId).run();
                ctx.waitUntil(replyLineMessageWithButton(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, LEGAL_TEXT_SHORT, "閱讀服務條款", `${origin}/terms`));
                continue; 
            }
            
            const hasAgreed = await env.DB.prepare("SELECT 1 FROM group_agreements WHERE group_id = ? AND user_id = ?").bind(gId, uId).first();
            const isGroupLocked = (groupAuthPreCheck && groupAuthPreCheck.is_locked === 1);

            let currentState = 'setup_complete'; 
            if (userState) {
                currentState = userState.state;
            } else if (isGroupLocked && !hasAgreed) {
                currentState = 'awaiting_agreement';
            }

            if (currentState === 'awaiting_agreement') {
                if (text === '/bot agree') {
                    if (hasAgreed) return; 

                    await env.DB.prepare("INSERT OR IGNORE INTO group_agreements (group_id, user_id) VALUES (?, ?)").bind(gId, uId).run();
                    const allAgreed = await checkAllAgreed(env, gId);
                    
                    if (allAgreed) {
                        await env.DB.prepare("UPDATE group_auth SET is_locked = 0, version = ? WHERE group_id = ?").bind(CURRENT_VERSION, gId).run();
                        
                        // 檢查是新群組還是舊群組
                        const auth = await env.DB.prepare("SELECT 角色設定 FROM group_auth WHERE group_id = ?").bind(gId).first();
                        if (!auth || !auth.角色設定) {
                             // 新群組：進入 ID 設定
                             await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'ready_for_setup')").bind(uId, gId).run();
                             ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `✅ 全體成員皆已同意！\n請管理員輸入 \`/bot newID\` (建立新群組) 或 \`/bot <舊ID>\` (沿用舊設定) 來完成啟用。`));
                        } else {
                             // 舊群組：直接恢復
                             await env.DB.prepare("UPDATE line_user_state SET state = 'setup_complete' WHERE group_id = ?").bind(gId).run();
                             ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `✅ 條款更新完畢，服務已恢復！\n${getExistingWelcomeMessage(gId, origin)}`));
                        }
                    } else {
                        // 安靜模式
                    }
                } else if (text === '/bot disagree') {
                    await env.DB.prepare("UPDATE group_auth SET status = 'terminated' WHERE group_id = ?").bind(gId).run();
                    ctx.waitUntil(pushLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, uId, "感謝您的回覆。依據服務條款，您已選擇不接受本協議，本服務將自即日起對您的帳號終止所有功能，並停止提供服務。"));
                    const groupMsg = `🚨 服務緊急終止通知 (Service Termination Notice)\n\n感謝您使用本服務。\n\n依據本服務嚴格的授權政策，由於未能取得所有使用者對新服務條款的百分之百一致同意，本服務已觸發終止條件。\n\n本服務將根據最終授權政策，自即日起永久終止運行，所有功能已停止提供。\n\n造成不便，敬請見諒。\n\n版權所有 © 2025 Ray Chen`;
                    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, groupMsg));
                }
                continue;
            }

            if (currentState === 'ready_for_setup') {
                if (text === '/bot newID') {
                    await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'setup_complete')").bind(uId, gId).run();
                    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, getNewWelcomeMessage(gId, origin)));
                    continue;
                }
                if (text.startsWith('/bot ')) {
                     const inputId = text.replace('/bot ', '').trim();
                     if (inputId.length > 5) {
                        const oldGroup = await env.DB.prepare("SELECT group_id FROM group_auth WHERE group_id = ?").bind(inputId).first();
                        if (oldGroup) {
                            await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'setup_complete')").bind(uId, inputId).run();
                            ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, getExistingWelcomeMessage(inputId, origin)));
                        } else {
                            ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, '❌ 找不到該 ID，請確認後再試。'));
                        }
                     }
                     continue;
                }
            }
            
            const effectiveGId = userState?.group_id || gId;
            const groupAuth = await env.DB.prepare("SELECT * FROM group_auth WHERE group_id = ?").bind(effectiveGId).first();
            
            if (groupAuth && groupAuth.is_locked === 1) {
                if (text === '/bot agree') {
                     await env.DB.prepare("INSERT OR IGNORE INTO group_agreements (group_id, user_id) VALUES (?, ?)").bind(gId, uId).run();
                     const allAgreed = await checkAllAgreed(env, gId);
                     if(allAgreed) {
                        await env.DB.prepare("UPDATE group_auth SET is_locked = 0, locking_user_id = NULL WHERE group_id = ?").bind(gId).run();
                        ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "✅ 新成員已同意條款，機器人恢復服務。"));
                     }
                } else if (text === '/bot disagree') {
                     await env.DB.prepare("UPDATE group_auth SET status = 'terminated' WHERE group_id = ?").bind(gId).run();
                    ctx.waitUntil(pushLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, uId, "感謝您的回覆。依據服務條款，您已選擇不接受本協議，本服務將自即日起對您的帳號終止所有功能，並停止提供服務。"));
                    const groupMsg = `🚨 服務緊急終止通知 (Service Termination Notice)\n\n感謝您使用本服務。\n\n依據本服務嚴格的授權政策，由於未能取得所有使用者對新服務條款的百分之百一致同意，本服務已觸發終止條件。\n\n本服務將根據最終授權政策，自即日起永久終止運行，所有功能已停止提供。\n\n造成不便，敬請見諒。\n\n版權所有 © 2025 Ray Chen`;
                    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, groupMsg));
                } else if (text.startsWith('/bot')) {
                    const now = Date.now();
                    if (now - (groupAuth.last_warning_ts || 0) > 60000) {
                        await env.DB.prepare("UPDATE group_auth SET last_warning_ts = ? WHERE group_id = ?").bind(now, gId).run();
                        ctx.waitUntil(replyLineMessageWithButton(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "⚠️ 群組暫停服務中，等待新成員同意條款。", "查看條款", `${origin}/terms`));
                    }
                }
                continue;
            }
            
            if (!groupAuth) continue;

            const finalGid = effectiveGId;
            const auth = await env.DB.prepare("SELECT advanced_settings FROM group_auth WHERE group_id = ?").bind(finalGid).first();
            let settings = {}; try { settings = JSON.parse(auth?.advanced_settings || '{}'); } catch(e){}
            const disabledCmds = settings.disabled_commands || [];

            if (text.startsWith('/bot') && disabledCmds.some(cmd => text.startsWith(cmd))) {
                ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "🚫 此指令已被管理員禁用。"));
                continue;
            }

            if (text === '/bot end') { 
                ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `⚠️ 確定要刪除 ${finalGid} 的所有資料嗎？\n請在 30 秒內輸入：確認刪除 ${finalGid}`)); 
                await env.DB.prepare("INSERT OR REPLACE INTO line_user_state (user_id, group_id, state) VALUES (?, ?, 'awaiting_delete_confirm')").bind(uId, finalGid).run(); 
                continue; 
            }
            
            if (currentState === 'awaiting_delete_confirm' && userState.group_id === finalGid) {
                if (text === `確認刪除 ${finalGid}`) { 
                    await env.DB.prepare("DELETE FROM group_auth WHERE group_id = ?").bind(finalGid).run(); 
                    await env.DB.prepare("DELETE FROM tasks WHERE 群組 = ?").bind(finalGid).run(); 
                    await env.DB.prepare("DELETE FROM line_user_state WHERE group_id = ?").bind(finalGid).run(); 
                    ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, "✅ 資料已刪除。")); 
                } else {
                     await env.DB.prepare("DELETE FROM line_user_state WHERE user_id = ?").bind(uId).run();
                }
                continue;
            }

            if (text === "/bot 學生" || text === "/bot student") { ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `📊 學生班級作業：\n${origin}/?id=${finalGid}`)); continue; } 
            if (text === "/bot 後台" || text === "/bot manager") { ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `🔧 後台管理：\n${origin}/manager?id=${finalGid}`)); continue; } 
            if (text === "/bot ID") { ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, `Group ID:\n${finalGid}`)); continue; } 
            if (text === "作業網址" || text === "公佈欄") { ctx.waitUntil(replyLineMessage(env.LINE_CHANNEL_ACCESS_TOKEN, event.replyToken, getNewWelcomeMessage(finalGid, origin))); continue; } 

            if (!text.startsWith('/')) {
                const config = await env.DB.prepare("SELECT 科目設定 as subjects_config FROM group_auth WHERE group_id = ?").bind(finalGid).first(); 
                let subjectConfig = null; 
                if(config && config.subjects_config) { try { const parsed = JSON.parse(config.subjects_config); if (Array.isArray(parsed)) { subjectConfig = {}; parsed.forEach(s => subjectConfig[s] = [s]); } else { subjectConfig = parsed; } } catch(e) {} } 
                const t = parseTask(text, subjectConfig); 
                if (t) { 
                    let status = "待審核";
                    if (settings.approval_mode === 'auto') {
                        const hasBadWord = BAD_WORDS.some(w => t.c.includes(w));
                        if (!hasBadWord) status = "已發佈";
                    }
                    await env.DB.prepare(`INSERT INTO tasks (群組, 建立時間, 截止日期, 科目, 內容, 來源, 狀態, 類別) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).bind(finalGid, Date.now(), t.dStr, t.s, t.c, "LINE", status, t.cat).run(); 
                }
            }
        } catch (err) {
            console.error("Critical Error in handleLineWebhook loop:", err);
        }
    }
    return new Response("ok");
}

async function checkAllAgreed(env, gId) {
    try {
        let allMemberIds = [];
        const res = await fetch(`https://api.line.me/v2/bot/group/${gId}/members/ids`, { 
            headers: { 'Authorization': `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}` } 
        });
        
        if (res.ok) {
            const data = await res.json();
            allMemberIds = data.memberIds;
        } else {
            const roomRes = await fetch(`https://api.line.me/v2/bot/room/${gId}/members/ids`, { 
                headers: { 'Authorization': `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}` } 
            });
            
            if (roomRes.ok) {
                const data = await roomRes.json();
                allMemberIds = data.memberIds;
            } else {
                console.warn("Failed to get members, skipping check.");
                return true;
            }
        }
        
        if (allMemberIds.length === 0) return false;

        const { results } = await env.DB.prepare("SELECT user_id FROM group_agreements WHERE group_id = ?").bind(gId).all();
        const agreedMembers = new Set(results.map(r => r.user_id));
        
        return allMemberIds.every(memberId => agreedMembers.has(memberId));
    } catch (e) {
        console.error("checkAllAgreed failed:", e);
        return false;
    }
}

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
(LINE 因故僅供問題反應，恕不回覆。若需提問與答覆，請至 Discord，感謝配合🙏)
Discord: ${LINK_DISCORD}
Mail: ${MAIL_CONTACT}
(Mail 因故僅供問題反應，恕不回覆。若需提問與答覆，請至 Discord，感謝配合🙏)
Github: ${LINK_LINE_HOST}
(若您希望修改原始碼，必須先同意 Pull Request (PR) 條款，並獲得原作者的接受方可合併。)

請尊重原作者的智慧財產權。本產品受 CC BY-NC-ND 4.0 授權條款與所有附加政策嚴格保護。`;
}

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
(LINE 因故僅供問題反應，恕不回覆。若需提問與答覆，請至 Discord，感謝配合🙏)
Discord: ${LINK_DISCORD}
Mail: ${MAIL_CONTACT}
(Mail 因故僅供問題反應，恕不回覆。若需提問與答覆，請至 Discord，感謝配合🙏)
Github: ${LINK_LINE_HOST}
(若您希望修改原始碼，必須先同意 Pull Request (PR) 條款，並獲得原作者的接受方可合併。)

請尊重原作者的智慧財產權。本產品受 CC BY-NC-ND 4.0 授權條款與所有附加政策嚴格保護。`;
}

async function writeLog(env, groupId, actor, action, details, request) { 
    try { 
        const ip = request ? (request.headers.get('CF-Connecting-IP') || 'Unknown') : 'System'; 
        const ua = request ? (request.headers.get('User-Agent') || 'Unknown') : 'System'; 
        let device = "PC"; 
        if (ua.includes("Android")) { 
            const match = ua.match(/Android.*?; (.*?)\)/); 
            device = match ? match[1] : "Android"; 
        } else if (ua.includes("iPhone")) { 
            device = "iPhone"; 
        } 
        await env.DB.prepare("INSERT INTO logs (group_id, actor, action, details, ip_address, user_agent, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(groupId, actor, action, details + ` [${device}]`, ip, ua, Date.now()).run(); 
    } catch(e) { 
        console.error("Log Error:", e); 
    } 
}

async function sendDiscordAlert(title, message) { 
    try { 
        await fetch(DISCORD_WEBHOOK_URL, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ content: `🚨 **${title}**\n${message}` }) 
        }); 
    } catch(e) { 
        console.error("Discord webhook error:", e); 
    } 
}

function genRescueCode() { return Math.floor(100000 + Math.random() * 900000).toString(); }
function genRestoreCode() { return Math.random().toString(36).substring(2, 12); } 
async function sha256(message) { const msgBuffer = new TextEncoder().encode(message); const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer); return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join(''); }

async function replyLineMessage(token, replyToken, text) {
    if (!token || !replyToken) return;
    try {
        await fetch('https://api.line.me/v2/bot/message/reply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ replyToken: replyToken, messages: [{ type: 'text', text: text }] })
        });
    } catch (e) { console.error("Reply message failed:", e); }
}

async function replyLineMessageWithButton(token, replyToken, text, buttonText, linkUrl) {
    if (!token || !replyToken) return;
    const message = {
        type: "template",
        altText: text.split('\n')[0],
        template: {
            type: "buttons",
            text: text,
            actions: [{
                type: "uri",
                label: buttonText,
                uri: linkUrl
            }]
        }
    };
    try {
        await fetch('https://api.line.me/v2/bot/message/reply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ replyToken: replyToken, messages: [message] })
        });
    } catch(e) { console.error("Reply with button failed:", e); }
}

async function pushLineMessage(token, userId, text) {
    if (!token || !userId) return;
    try {
        await fetch('https://api.line.me/v2/bot/message/push', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ to: userId, messages: [{ type: 'text', text: text }] })
        });
    } catch (e) { console.error("Push message failed:", e); }
}

async function leaveGroup(token, groupId) { 
    if (!token || !groupId) return; 
    try { await fetch(`https://api.line.me/v2/bot/group/${groupId}/leave`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } }); } catch(e) { console.error("Leave group failed:", e); } 
    try { await fetch(`https://api.line.me/v2/bot/room/${groupId}/leave`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } }); } catch(e) { console.error("Leave room failed:", e); } 
}

function addDays(d, days) { const r = new Date(d); r.setDate(r.getDate() + days); return r; }
function parseTask(text, subjectConfig) { let targetDate = null; let content = text; const today = new Date(); today.setHours(0, 0, 0, 0); if (text.includes("下禮拜")) { targetDate = addDays(today, 7); content = content.replace("下禮拜", ""); } if (text.includes("明天")) { targetDate = addDays(today, 1); content = content.replace("明天", ""); } else if (text.includes("後天")) { targetDate = addDays(today, 2); content = content.replace("後天", ""); } else if (text.match(/下(週|禮拜|星期)([一二三四五六日])/)) { const match = text.match(/下(週|禮拜|星期)([一二三四五六日])/); const map = { "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "日": 0 }; const targetDay = map[match[2]]; const currentDay = today.getDay(); let daysToAdd = (7 - currentDay) + targetDay; if (targetDay === 0) daysToAdd += 7; targetDate = addDays(today, daysToAdd); content = content.replace(match[0], ""); } else { const strictMatch = text.match(/(^|[^0-9])(\d{6,7})(?![0-9])/); let matchDateStr = null; if (strictMatch) { matchDateStr = strictMatch[2]; } else { const symMatch = text.match(/(\d{2,4})[./-](\d{1,2})[./-](\d{1,2})/); if (symMatch) matchDateStr = symMatch[0]; } if (matchDateStr) { let y, m, d; if (matchDateStr.match(/^\d{6,7}$/)) { let num = matchDateStr; if (num.length === 7) { y = parseInt(num.substring(0,3)); m = parseInt(num.substring(3,5)); d = parseInt(num.substring(5,7)); } else { y = parseInt(num.substring(0,2)); m = parseInt(num.substring(2,4)); d = parseInt(num.substring(4,6)); } } else { let symMatch = matchDateStr.match(/(\d{2,4})[./-](\d{1,2})[./-](\d{1,2})/); if(symMatch) { y = parseInt(symMatch[1]); m = parseInt(symMatch[2]); d = parseInt(symMatch[3]); } } if (y) { if (y < 1000) y += 1911; if (y < 2000) y += 2000; let tempDate = new Date(y, m - 1, d); if (tempDate < today && tempDate.getFullYear() === today.getFullYear()) tempDate.setFullYear(tempDate.getFullYear() + 1); if (!isNaN(tempDate.getTime())) { targetDate = tempDate; content = content.replace(matchDateStr, ""); } } } } if (targetDate) { content = content.replace(/要交|要考|截止|作業|要帶|記得|繳交/g, "").trim(); let cat = "作業"; if (text.includes("考")) cat = "考試"; else if (text.includes("帶")) cat = "攜帶"; let sub = "其他"; const subs = subjectConfig || { "國語": ["國文", "國語", "作文"], "英文": ["英文", "English"], "數學": ["數學", "Math"] }; for (let key in subs) { if (subs[key] && Array.isArray(subs[key]) && subs[key].some(k => text.includes(k))) { sub = key; subs[key].forEach(k => content = content.replace(k, "")); break; } } content = content.trim(); const dStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth()+1).padStart(2,'0')}-${String(targetDate.getDate()).padStart(2,'0')}`; if(content.length === 0) return null; return { dStr, s: sub, c: content, cat }; } return null; }

// ==========================================
// ★ 前端頁面渲染函式 (完整版)
// ==========================================
function renderTermsHTML(origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>服務條款</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-900 text-white min-h-screen p-4 md:p-8">
    <div class="max-w-3xl mx-auto bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-gray-700">
        ${TERMS_HTML_CONTENT}
        <div class="mt-8 text-center text-sm text-gray-400">
            <p>請回到 LINE 群組輸入 /bot agree 以同意以上條款。</p>
        </div>
    </div>
    </body></html>`;
}

function renderEULAHTML(redirectUrl, origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>服務條款同意</title><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4"><div class="max-w-lg w-full bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
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

function renderHomePage(origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ray 作業機器人</title><script src="https://cdn.tailwindcss.com"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></head><body class="bg-gradient-to-b from-blue-900 to-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6"><div class="max-w-2xl text-center space-y-6"><div class="text-6xl mb-4">🤖</div><h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Ray 作業機器人</h1><p class="text-gray-300 text-lg">協助班級管理作業、考試與攜帶物品的智慧小幫手。</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"><a href="${LINK_LINE_HOST}" target="_blank" class="bg-[#181717] hover:bg-[#2d2d2d] text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition transform hover:scale-105"><i class="fab fa-github text-2xl"></i> 開始架設自己的機器人</a><a href="${LINK_DISCORD}" target="_blank" class="bg-[#5865F2] hover:bg-[#4752c4] text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition transform hover:scale-105"><i class="fab fa-discord text-2xl"></i> 加入 Discord 支援</a></div><div class="mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"><h2 class="text-xl font-bold mb-4">🚀 如何開始？</h2><ol class="text-left list-decimal list-inside space-y-2 text-gray-300"><li>加入 自己申請的LINE官方帳號 好友。</li><li>將 自己申請的LINE官方帳號 邀請至班級群組。</li><li>輸入 <code class="bg-black/30 px-2 py-1 rounded">/bot start</code> 開始設定。</li><li>(群組全員需同意法律條款，並設定不同意時的踢人策略)</li><li>輸入 <code class="bg-black/30 px-2 py-1 rounded">/bot new</code> 建立專屬班級 ID。</li></ol></div><footer class="mt-10 text-xs text-gray-500">&copy; 2025 Ray2026. All Rights Reserved.</footer></div></body></html>`;
}

function renderSupportHTML(origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Ray 機器人客服中心</title><script src="https://cdn.tailwindcss.com"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></head><body class="bg-gray-900 text-white min-h-screen flex items-center justify-center p-6"><div class="max-w-md w-full space-y-8"><div class="text-center"><h1 class="text-3xl font-bold text-blue-400 mb-2">🛠️ 客服與回報中心</h1><p class="text-gray-400">請選擇您的需求，我們將盡快為您服務。</p></div><div class="space-y-4">
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
    async function sendMsg() { const msg = document.getElementById('msg-content').value.trim(); if(!msg) return alert('請輸入內容'); const btn = document.querySelector('#msg-modal button:last-child'); const originalText = btn.innerText; btn.innerText = '傳送中...'; btn.disabled = true; try { const res = await fetch(window.location.href, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ action: 'send_support_msg', type: currentType, message: msg }) }); const d = await res.json(); if(d.status === 'success') { alert('✅ 回報成功！我們會盡快處理。'); closeForm(); document.getElementById('msg-content').value=''; } else { alert('❌ 發送失敗，請稍後再試。'); } } catch(e) { alert('❌ 錯誤'); } btn.innerText = originalText; btn.disabled = false; }
    </script></body></html>`;
}

function renderSuperAdminHTML(origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><title>Super Admin</title><script src="https://cdn.tailwindcss.com"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></head><body class="bg-gray-900 text-gray-100 min-h-screen p-4"><div class="max-w-4xl mx-auto"><h1 class="text-3xl font-bold mb-8 text-center text-blue-400">⚡ Super Admin</h1><div id="login-panel" class="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md mx-auto"><input type="password" id="super-pwd" placeholder="輸入超級密碼" class="w-full bg-gray-700 border border-gray-600 rounded p-3 mb-4 text-white"><button onclick="superLogin()" class="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded font-bold">登入</button></div><div id="dashboard" class="hidden space-y-8"><div class="bg-gray-800 p-6 rounded-xl border border-blue-900"><h2 class="text-xl font-bold mb-4 flex items-center gap-2"><i class="fas fa-search"></i> 萬能搜尋</h2><div class="flex gap-2"><input type="text" id="restore-code-input" placeholder="輸入 ID / 名稱 / 復原碼" class="flex-1 bg-gray-700 border border-gray-600 rounded p-2 text-white"><button onclick="searchRestore()" class="bg-green-600 hover:bg-green-500 px-6 py-2 rounded font-bold">查詢</button></div><div id="restore-results" class="mt-4 space-y-2 hidden"></div></div><div class="bg-gray-800 p-6 rounded-xl"><h2 class="text-xl font-bold mb-4"><i class="fas fa-users"></i> 群組列表</h2><button onclick="loadGroups()" class="mb-4 text-sm bg-gray-700 px-3 py-1 rounded">重新整理</button><div id="group-list" class="space-y-3"></div></div></div></div><script>let superPwd = '';async function superLogin() {superPwd = document.getElementById('super-pwd').value;const res = await fetch(window.location.href, {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({ action: 'super_admin_login', password: superPwd })});const d = await res.json();if(d.status === 'success') {document.getElementById('login-panel').classList.add('hidden');document.getElementById('dashboard').classList.remove('hidden');loadGroups();} else {alert(d.msg || '密碼錯誤');}}async function loadGroups() {const res = await fetch(window.location.href, {method: 'POST',body: JSON.stringify({ action: 'super_admin_get_groups', password: superPwd })});const d = await res.json();document.getElementById('group-list').innerHTML = d.groups.map(g => \`<div class="p-4 bg-gray-700 rounded flex flex-col md:flex-row justify-between items-start md:items-center gap-4"><div class="flex-1"><div class="font-bold text-lg text-white">\${g.group_name} <span class="text-xs \${g.is_bound?'text-green-400':'text-red-400'} border \${g.is_bound?'border-green-400':'border-red-400'} px-1 rounded">\${g.is_bound?'已綁定':'未綁定'}</span> <span class="text-xs \${g.has_pwd?'text-blue-400':'text-yellow-400'} border \${g.has_pwd?'border-blue-400':'border-yellow-400'} px-1 rounded">\${g.has_pwd?'有密碼':'⚠️ 無密碼'}</span></div><div class="text-xs text-gray-400 font-mono">\${g.group_id}</div><div class="text-sm text-gray-300 mt-1">角色: \${g.role_count} | 🔑 救援碼: <span class="text-yellow-400 font-bold">\${g.rescue_code}</span></div></div><div class="flex gap-2 flex-wrap">\${!g.is_bound ? '<button onclick="notify(\\'bind\\', \\''+g.group_id+'\\')" class="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-xs">🔔 通知綁定</button>' : ''}\${!g.has_pwd ? '<button onclick="notify(\\'pwd\\', \\''+g.group_id+'\\')" class="bg-orange-600 hover:bg-orange-500 px-3 py-1 rounded text-xs">🔔 通知設密碼</button>' : ''}<button onclick="regenRestore('\${g.group_id}')" class="bg-yellow-700 hover:bg-yellow-600 px-3 py-1 rounded text-xs">重置復原碼</button><button onclick="delGroup('\${g.group_id}')" class="bg-red-900 hover:bg-red-700 px-3 py-1 rounded text-xs">刪除</button></div></div>\`).join('');}async function notify(type, gid){ if(!confirm("確定發送通知？"))return; const res = await fetch(window.location.href, {method: 'POST',body: JSON.stringify({ action: 'super_admin_notify', password: superPwd, targetGroupId: gid, notifyType: type })}); const d = await res.json(); if(d.status==='success') alert('已發送通知'); else alert('失敗'); } async function searchRestore() {const code = document.getElementById('restore-code-input').value.trim();if(!code) return alert("請輸入關鍵字");const res = await fetch(window.location.href, {method: 'POST',body: JSON.stringify({ action: 'super_admin_search', password: superPwd, keyword: code })});const d = await res.json();const box = document.getElementById('restore-results'); box.innerHTML=''; if(d.status === 'success' && d.data.length > 0) {box.classList.remove('hidden'); d.data.forEach(item => { box.innerHTML += \`<div class="p-3 bg-gray-900 rounded border border-gray-600"><p class="text-white font-bold">\${item.group_name} \${item.is_bound?'<span class="text-green-400 text-xs">[已綁定]</span>':'<span class="text-red-400 text-xs">[未綁定]</span>'}</p><p class="text-gray-400 font-mono text-xs">\${item.group_id}</p><p class="text-yellow-400 mt-1">🔑 救援碼: \${item.rescue_code}</p></div>\`; }); } else {box.classList.add('hidden');alert("未找到符合項目");}}async function regenRestore(gid) {if(!confirm("確定？")) return;const res = await fetch(window.location.href, {method: 'POST',body: JSON.stringify({ action: 'super_admin_regen_restore', password: superPwd, targetGroupId: gid })});const d = await res.json();if(d.status === 'success') alert("新復原碼: " + d.newRestoreCode); else alert(d.msg);}async function delGroup(gid) {if(!confirm('確定刪除？')) return;const res = await fetch(window.location.href, {method: 'POST',body: JSON.stringify({ action: 'super_admin_delete_group', password: superPwd, targetGroupId: gid })});const d = await res.json();if(d.status === 'success') { alert('已刪除'); loadGroups(); } else alert('失敗');}</script></body></html>`;
}

function renderStudentHTML(origin) {
    return `<!DOCTYPE html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>班級作業</title><script src="https://cdn.tailwindcss.com"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></head><body class="bg-gray-900 text-white min-h-screen p-4"><div class="max-w-4xl mx-auto"><div class="text-center mb-6"><h1 class="text-3xl font-bold text-white mb-2" id="page-title">📋 載入中...</h1><p class="text-sm text-gray-400" id="page-date"></p></div><div id="error-msg" class="hidden bg-red-900/50 p-4 rounded text-center mb-4 text-red-200"></div><div id="loading" class="text-center py-8"><i class="fas fa-spinner fa-spin text-3xl text-blue-500"></i></div>
    
    <div id="filters" class="hidden mb-6 bg-gray-800 p-4 rounded-xl space-y-3"><div class="flex flex-wrap gap-2"><select id="subject-filter" class="bg-gray-700 text-white p-2 rounded text-sm border border-gray-600"><option value="all">所有科目</option></select><select id="month-filter" class="bg-gray-700 text-white p-2 rounded text-sm border border-gray-600"><option value="all">所有月份</option><option value="1">1月</option><option value="2">2月</option><option value="3">3月</option><option value="4">4月</option><option value="5">5月</option><option value="6">6月</option><option value="7">7月</option><option value="8">8月</option><option value="9">9月</option><option value="10">10月</option><option value="11">11月</option><option value="12">12月</option></select><select id="time-filter" class="bg-gray-700 text-white p-2 rounded text-sm border border-gray-600"><option value="all">所有時間</option><option value="7">最近 7 天</option><option value="14">最近 14 天</option><option value="30">最近 1 個月</option><option value="180">最近 6 個月</option><option value="365">最近 1 年</option></select></div></div>

    <div id="content-area" class="hidden space-y-4"></div></div><script>
    const urlParams = new URLSearchParams(window.location.search); const gId = urlParams.get('id'); document.getElementById('page-date').innerText = new Date().toLocaleDateString();
    let allTasks = [];
    async function load() {
        if(!gId) { document.body.innerHTML = 'No ID'; return; }
        try {
            const res = await fetch(window.location.href, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ action: 'get_tasks', groupId: gId }) });
            const data = await res.json();
            document.getElementById('loading').classList.add('hidden');
            if(data.error) { document.getElementById('error-msg').innerText = data.error; document.getElementById('error-msg').classList.remove('hidden'); return; }
            
            document.getElementById('page-title').innerText = '📋 ' + (data.groupName || '班級作業');
            document.getElementById('content-area').classList.remove('hidden');
            document.getElementById('filters').classList.remove('hidden');
            
            allTasks = data.tasks;
            
            const subSet = new Set(allTasks.map(t => t.subject));
            const subSel = document.getElementById('subject-filter');
            subSet.forEach(s => { const opt = document.createElement('option'); opt.value = s; opt.innerText = s; subSel.appendChild(opt); });
            
            document.getElementById('subject-filter').addEventListener('change', render);
            document.getElementById('month-filter').addEventListener('change', render);
            document.getElementById('time-filter').addEventListener('change', render);
            
            render();
        } catch(e) { document.getElementById('loading').innerHTML = 'Error'; }
    }
    
    function render() {
        const list = document.getElementById('content-area');
        list.innerHTML = '';
        const subVal = document.getElementById('subject-filter').value;
        const monthVal = document.getElementById('month-filter').value;
        const timeVal = document.getElementById('time-filter').value;
        const now = new Date(); now.setHours(0,0,0,0);
        
        const filtered = allTasks.filter(t => {
            const d = new Date(t.date);
            if(subVal !== 'all' && t.subject !== subVal) return false;
            if(monthVal !== 'all' && (d.getMonth() + 1) != monthVal) return false;
            if(timeVal !== 'all') { const diff = (d - now) / (1000 * 60 * 60 * 24); if(diff < 0 || diff > parseInt(timeVal)) return false; }
            return true;
        });
        
        if(filtered.length === 0) { list.innerHTML = '<p class="text-center text-gray-500">沒有符合條件的作業</p>'; return; }
        
        let lastDate = '';
        filtered.forEach(t => {
            if(t.date !== lastDate) { list.innerHTML += \`<div class="text-lg font-bold text-blue-400 mt-6 mb-2 border-b border-gray-700 pb-1">\${t.date} (\${getDayName(t.date)})</div>\`; lastDate = t.date; }
            let colorClass = 'border-l-4 border-blue-500';
            if(t.category === '考試') colorClass = 'border-l-4 border-red-500';
            else if(t.category === '攜帶') colorClass = 'border-l-4 border-yellow-500';
            list.innerHTML += \`<div class="bg-gray-800 p-4 rounded shadow \${colorClass}"><div class="flex justify-between items-start"><div class="text-sm font-bold text-gray-400">\${t.subject} <span class="text-xs bg-gray-700 px-1 rounded ml-1">\${t.category}</span></div></div><div class="mt-1 text-lg">\${linkify(t.content)}</div></div>\`;
        });
    }

    function getDayName(dStr) { const d = new Date(dStr); const days = ['日','一','二','三','四','五','六']; return '週' + days[d.getDay()]; }
    function linkify(text) { const urlRegex = /(https?:\\/\\/[^\\s]+)/g; return text.replace(urlRegex, url => \`<a href="\${url}" target="_blank" class="text-blue-400 underline">\${url}</a>\`); }
    load();
    fetch(window.location.href, {method: 'POST', body: JSON.stringify({action:'log_frontend_action', groupId: gId, logType: 'PAGE_VIEW', logDetail: 'Student Page'})});
    </script></body></html>`;
}

function renderManagerHTML(origin) {
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>後台管理</title><script src="https://cdn.tailwindcss.com"></script><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"><style>
    body { background-color: #1f2937; color: #f3f4f6; }
    .bg-gray-900 { background-color: #111827; }
    .bg-gray-800 { background-color: #1f2937; border-color: #374151; }
    .text-gray-300 { color: #d1d5db; }
    .text-white { color: white; }
    input, select, textarea { background-color: #374151; color: white; border-color: #4b5563; }
    .checkbox-wrapper { display: flex; flex-wrap: wrap; gap: 8px; max-height: 150px; overflow-y: auto; background: rgba(0,0,0,0.2); padding: 8px; rounded: 4px; border: 1px solid #4b5563; }
    .check-item { display: flex; align-items: center; gap: 4px; font-size: 0.8rem; padding: 2px 6px; background: rgba(255,255,255,0.05); border-radius: 4px; cursor: pointer; user-select: none; }
    .check-item input { margin: 0; }
    .chip-active { background-color: #2563eb; color: white; border-color: #2563eb; } .chip-inactive { background-color: #374151; color: white; border-color: #4b5563; }
    </style></head>
    <body class="min-h-screen flex items-center justify-center p-4">
    <div id="step-id" class="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
      <h1 class="text-2xl font-bold mb-6">🔧 後台登入</h1>
      <input type="text" id="group-id" placeholder="群組 ID" class="w-full p-3 rounded mb-4 text-center">
      <button id="btn-check-id" class="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded font-bold">下一步</button>
    </div>
    <div id="step-role" class="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md text-center hidden">
      <h1 class="text-2xl font-bold mb-4">👤 請選擇身分</h1>
      <div id="role-buttons" class="grid grid-cols-2 gap-3"></div>
      <button id="btn-back-id" class="mt-4 text-sm text-gray-500 hover:text-gray-700">返回</button>
    </div>
    <div id="step-pwd" class="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md text-center hidden">
      <h1 class="text-2xl font-bold mb-2">🔐 <span id="current-role-name"></span></h1>
      <p class="text-gray-400 text-sm mb-6">請輸入密碼</p>
      <div class="relative mb-4"><input type="password" id="password" placeholder="密碼" class="w-full p-3 rounded mb-4 text-center pr-10"><i id="btn-toggle-pwd" class="fas fa-eye absolute right-3 top-4 text-gray-400 cursor-pointer"></i></div>
      <button id="btn-login" class="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded font-bold">登入</button>
      <div id="btn-forgot" class="mt-4 text-xs text-blue-400 cursor-pointer">忘記密碼?</div>
      <button id="btn-back-role" class="mt-2 text-xs text-gray-500 hover:text-gray-700">切換身分</button>
    </div>
    <div id="step-setup" class="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md text-center hidden">
      <h1 class="text-2xl font-bold mb-2">✨ 第一次使用</h1>
      <p class="text-gray-400 text-sm mb-6">請設定總管理員密碼</p>
      <input type="text" id="setup-name" placeholder="群組名稱 (例: 115 班)" class="w-full p-3 rounded mb-4 text-center">
      <input type="password" id="setup-pwd" placeholder="設定密碼" class="w-full p-3 rounded mb-4 text-center">
      <button id="btn-do-setup" class="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded font-bold">設定並啟用</button>
    </div>
    <div id="step-reset" class="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md text-center hidden">
      <h1 class="text-2xl font-bold mb-2">🆘 重置密碼</h1>
      <p class="text-gray-400 text-sm mb-4">身分：<span id="reset-role-name" class="font-bold"></span></p>
      <input type="text" id="recovery-code" placeholder="救援碼" class="w-full p-3 rounded mb-2 text-center">
      <input type="password" id="new-password" placeholder="新密碼" class="w-full p-3 rounded mb-4 text-center">
      <button id="btn-do-reset" class="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded font-bold">重設</button>
      <button id="btn-back-pwd" class="mt-2 text-xs text-gray-500 hover:text-gray-700">取消</button>
    </div>
    <div id="step-dashboard" class="w-full max-w-7xl hidden">
      <div class="flex justify-between items-center mb-6">
        <div>
            <h1 class="text-2xl font-bold"><i class="fas fa-cog"></i> <span id="dash-group-name"></span> <span id="dash-role" class="text-base text-gray-400"></span></h1>
            <div class="text-xs text-gray-400 mt-1 flex items-center gap-2">救援碼: <span id="my-rec-code" class="blur-sm select-none">****</span><i id="btn-toggle-rec" class="fas fa-eye cursor-pointer hover:text-gray-500"></i></div>
            <div id="binding-info" class="text-xs text-yellow-500 mt-1 hidden">LINE 綁定碼: <span id="my-bind-code" class="font-mono font-bold text-lg"></span> (請在 LINE 輸入 /bind 此四碼)</div>
        </div>
        <div class="flex items-center gap-2"><button id="btn-open-add" class="text-sm bg-green-700 px-3 py-1 rounded hover:bg-green-600 text-white">新增作業</button><button id="btn-open-change-pwd" class="text-sm bg-yellow-700 px-3 py-1 rounded hover:bg-yellow-600 text-white">改密碼</button><button id="btn-logout" class="text-sm text-gray-400 hover:text-gray-500">登出</button></div></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div id="settings-panel" class="bg-gray-900 p-6 rounded-xl hidden"><h3 class="font-bold mb-4 text-gray-300 border-b border-gray-700 pb-2">⚙️ 系統設定 (僅總管理員)</h3>
        <div class="mb-4"><label class="text-xs text-gray-500">科目關鍵字設定 (科目名稱 | 關鍵字,關鍵字...)</label><div id="subject-editor" class="space-y-2 mt-1"></div><button id="btn-add-subject" class="mt-2 w-full bg-gray-700 hover:bg-gray-600 py-1 rounded text-xs text-white">+ 新增科目</button><button id="btn-save-subjects" class="mt-2 w-full bg-blue-700 hover:bg-blue-600 py-1 rounded text-xs text-white">儲存科目設定</button></div>
        
        <h3 class="font-bold mb-4 mt-6 text-gray-300 border-b border-gray-700 pb-2">🤖 機器人進階設定</h3>
        <div class="mb-2">
            <label class="text-xs font-bold text-gray-500">自動審核模式</label>
            <select id="approval-mode" class="w-full bg-gray-700 border-gray-600 border rounded p-1 text-sm mt-1">
                <option value="manual">手動審核 (需管理員按✅)</option>
                <option value="timed">手動 + 自動 (時間到自動✅)</option>
                <option value="auto">全自動 (無髒話即✅)</option>
            </select>
        </div>
        <div id="timed-setting" class="mb-2 hidden">
             <label class="text-xs font-bold text-gray-500">自動審核時間 (分鐘)</label>
             <input type="number" id="approval-delay" class="w-full bg-gray-700 border-gray-600 border rounded p-1 text-sm mt-1" value="10">
        </div>
        <div class="mb-4">
            <label class="text-xs font-bold text-gray-500">禁用指令 (以逗號分隔)</label>
            <input type="text" id="disabled-cmds" class="w-full bg-gray-700 border-gray-600 border rounded p-1 text-sm mt-1" placeholder="/bot end, /bot student">
        </div>
        
        <button id="btn-save-advanced" class="w-full bg-purple-700 hover:bg-purple-600 py-1 rounded text-xs text-white">儲存進階設定</button>

        <h3 class="font-bold mb-4 mt-6 text-gray-300 border-b border-gray-700 pb-2">👥 人員與權限</h3><div id="role-editor" class="space-y-4"></div><button id="btn-open-role-modal" class="mt-4 w-full bg-blue-800 hover:bg-blue-700 text-sm py-2 rounded text-white">+ 新增人員</button></div>
        <div id="tasks-panel" class="md:col-span-2 bg-gray-900 p-6 rounded-xl w-full">
            <h3 class="font-bold mb-4 text-gray-300 border-b border-gray-700 pb-2">📋 作業管理</h3>
            <div class="mb-4 space-y-2">
                <div class="flex items-center gap-2 overflow-x-auto filter-scroll pb-1"><span class="text-xs font-bold text-gray-500 whitespace-nowrap">關鍵字：</span><input type="text" id="content-search" oninput="renderList()" class="bg-white border rounded text-sm p-1 w-full max-w-xs" style="color:black" placeholder="搜尋作業內容..."></div>
                <div class="flex items-center gap-2 overflow-x-auto filter-scroll pb-1"><span class="text-xs font-bold text-gray-500 whitespace-nowrap">時間：</span><select id="time-filter" onchange="renderList()" class="bg-gray-700 border-gray-600 text-white rounded text-sm p-1"><option value="all">全部</option><option value="7">7天內</option><option value="14">14天內</option><option value="30">1個月內</option><option value="180">半年內</option><option value="365">1年內</option></select></div>
                <div class="flex items-center gap-2 overflow-x-auto filter-scroll pb-1 md:hidden"><span class="text-xs font-bold text-gray-500 whitespace-nowrap">月份：</span><select id="month-filter-select" onchange="toggleMonth(parseInt(this.value)); this.value='';" class="bg-gray-700 border-gray-600 text-white rounded text-sm p-1"><option value="">選擇月份...</option><option value="1">1月</option><option value="2">2月</option><option value="3">3月</option><option value="4">4月</option><option value="5">5月</option><option value="6">6月</option><option value="7">7月</option><option value="8">8月</option><option value="9">9月</option><option value="10">10月</option><option value="11">11月</option><option value="12">12月</option></select><div id="selected-months-display" class="flex gap-1"></div></div>
                <div class="hidden md:flex items-center gap-2 overflow-x-auto filter-scroll pb-1"><span class="text-xs font-bold text-gray-500 whitespace-nowrap">月份：</span><div id="month-container" class="flex gap-2"></div></div>
                <div class="flex items-center gap-2 overflow-x-auto filter-scroll pb-1 md:hidden"><span class="text-xs font-bold text-gray-500 whitespace-nowrap">科目：</span><select id="subject-filter-select" onchange="toggleSubject(this.value); this.value='';" class="bg-gray-700 border-gray-600 text-white rounded text-sm p-1"></select><div id="selected-subjects-display" class="flex gap-1 flex-wrap"></div></div>
                <div class="hidden md:flex items-center gap-2 overflow-x-auto filter-scroll pb-1"><span class="text-xs font-bold text-gray-500 whitespace-nowrap">科目：</span><div id="subject-container" class="flex gap-2"></div></div>
            </div>
            <div id="admin-task-list" class="space-y-3 max-h-[70vh] overflow-y-auto"></div>
        </div></div>
    </div>
    <div id="modal-container">
      <div id="modal-disclaimer" class="fixed inset-0 hidden items-center justify-center z-50 px-4 modal-bg" style="background-color:rgba(0,0,0,0.8)"><div class="bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"><div class="p-4 border-b border-gray-700"><h3 class="font-bold text-lg text-white">📜 使用須知</h3></div><div class="p-6 space-y-3 text-gray-300"><p>1. 本服務之所有權及智慧財產權歸開發者所有，使用者僅擁有使用權。</p><p>2. 你的密碼將會以 SHA-256 進行加密儲存，包含開發者在內的任何人都無法得知你的原始密碼。</p><p>3. 本服務為業餘時間開發，若你需要更穩定、功能更全面的服務，建議可參考 Google Classroom 等專業平台。</p><p>4. 首次使用請務必妥善保管你的「總管理員」密碼與「救援碼」，遺失將無法找回。(若忘記可使用 10 碼復原碼向開發者查詢救援碼)</p></div><div class="p-4 border-t border-gray-700"><button id="btn-accept-disclaimer" class="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">我已閱讀並同意</button></div></div></div>
      <div id="modal-admin-add" class="fixed inset-0 hidden items-center justify-center z-50 px-4 modal-bg" style="background-color:rgba(0,0,0,0.8)"><div class="bg-gray-900 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden text-gray-100"><div class="p-4 border-b border-gray-700 flex justify-between items-center"><h3 class="font-bold">✏️ 新增事項</h3><button id="btn-close-add" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button></div><div class="p-4 space-y-3"><div class="flex gap-2"><div class="w-2/3"><label class="text-xs font-bold text-gray-500">日期</label><input type="date" id="admin-date" class="w-full bg-gray-700 border-gray-600 border rounded p-2"></div><div class="w-1/3"><label class="text-xs font-bold text-gray-500">類型</label><select id="admin-category" class="w-full bg-gray-700 border-gray-600 border rounded p-2"><option value="作業">作業</option><option value="考試">考試</option><option value="攜帶">攜帶</option></select></div></div><div><label class="text-xs font-bold text-gray-500">科目</label><select id="admin-subject" class="w-full bg-gray-700 border-gray-600 border rounded p-2"></select></div><div><label class="text-xs font-bold text-gray-500">內容</label><input type="text" id="admin-content" class="w-full bg-gray-700 border-gray-600 border rounded p-2" placeholder="內容..."></div><div><label class="text-xs font-bold text-gray-500">標註人員 (@)</label><input type="text" id="admin-mentions" class="w-full bg-gray-700 border-gray-600 border rounded p-2" placeholder="輸入人名，空格分隔 (如: 王小明 李大華)"></div></div><div class="p-4 border-t border-gray-700"><button id="btn-submit-task" class="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">直接發佈</button></div></div></div>
      <div id="modal-edit-task" class="fixed inset-0 hidden items-center justify-center z-50 px-4 modal-bg" style="background-color:rgba(0,0,0,0.8)"><div class="bg-gray-900 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden text-gray-100"><div class="p-4 border-b border-gray-700 flex justify-between items-center"><h3 class="font-bold">✏️ 編輯事項</h3><button id="btn-close-edit" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button></div><div class="p-4 space-y-3"><input type="hidden" id="edit-id"><div class="flex gap-2"><div class="w-2/3"><label class="text-xs font-bold text-gray-500">日期</label><input type="date" id="edit-date" class="w-full bg-gray-700 border-gray-600 border rounded p-2"></div><div class="w-1/3"><label class="text-xs font-bold text-gray-500">類型</label><select id="edit-category" class="w-full bg-gray-700 border-gray-600 border rounded p-2"><option value="作業">作業</option><option value="考試">考試</option><option value="攜帶">攜帶</option></select></div></div><div><label class="text-xs font-bold text-gray-500">科目</label><select id="edit-subject" class="w-full bg-gray-700 border-gray-600 border rounded p-2"></select></div><div><label class="text-xs font-bold text-gray-500">內容</label><input type="text" id="edit-content" class="w-full bg-gray-700 border-gray-600 border rounded p-2" placeholder="內容..."></div>
      <div><label class="text-xs font-bold text-gray-500">標註人員 (@)</label><input type="text" id="edit-mentions" class="w-full bg-gray-700 border-gray-600 border rounded p-2" placeholder="追加標註 (如: 王小明)"></div>
      </div><div class="p-4 border-t border-gray-700"><button id="btn-update-task" class="w-full bg-green-600 text-white py-2 rounded-lg font-bold">儲存修改</button></div></div></div><div id="modal-change-pwd" class="fixed inset-0 hidden items-center justify-center z-50 px-4 modal-bg" style="background-color:rgba(0,0,0,0.8)"><div class="bg-gray-900 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden text-gray-100"><div class="p-4 border-b border-gray-700 flex justify-between items-center"><h3 class="font-bold">🔑 變更密碼</h3><button id="btn-close-change-pwd" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button></div><div class="p-6 space-y-4"><div><label class="text-xs font-bold text-gray-500">舊密碼</label><input type="password" id="old-pwd" class="w-full bg-gray-700 border-gray-600 border rounded p-2 mt-1"></div><div><label class="text-xs font-bold text-gray-500">新密碼</label><input type="password" id="new-pwd" class="w-full bg-gray-700 border-gray-600 border rounded p-2 mt-1"></div></div><div class="p-4 border-t border-gray-700"><button id="btn-do-change-pwd" class="w-full bg-yellow-600 text-white py-2 rounded-lg font-bold">確認變更</button></div></div></div><div id="modal-delete-confirm" class="fixed inset-0 hidden items-center justify-center z-50 px-4 modal-bg" style="background-color:rgba(0,0,0,0.8)"><div class="bg-gray-900 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden text-gray-100 border border-red-900"><div class="p-4 border-b border-red-900 bg-red-900/30 flex justify-between items-center"><h3 class="font-bold text-red-400">⚠️ 確認刪除</h3><button onclick="closeDelModal()" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button></div><div class="p-6 text-center"><p class="mb-4">確定要刪除此項目嗎？此動作無法復原。</p><div class="flex gap-2 justify-center"><button onclick="closeDelModal()" class="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 text-white">取消</button><button id="btn-confirm-delete" class="px-4 py-2 bg-red-600 rounded hover:bg-red-500 font-bold text-white">確認刪除</button></div></div></div></div><div id="modal-role-add" class="fixed inset-0 hidden items-center justify-center z-50 px-4 modal-bg" style="background-color:rgba(0,0,0,0.8)"><div class="bg-gray-900 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden text-gray-100"><div class="p-4 border-b border-gray-700 flex justify-between items-center"><h3 class="font-bold">👤 人員設定</h3><button onclick="closeRoleModal()" class="text-gray-400 hover:text-white"><i class="fas fa-times"></i></button></div><div class="p-4 space-y-3"><div><label class="text-xs font-bold text-gray-500">職稱</label><div class="flex gap-2"><select id="role-select" class="w-full bg-gray-700 border-gray-600 border rounded p-2" onchange="checkRoleSelect()"><option value="班導師">班導師</option><option value="副班長">副班長</option><option value="國文小老師">國文小老師</option><option value="英文小老師">英文小老師</option><option value="數學小老師">數學小老師</option><option value="自然小老師">自然小老師</option><option value="社會小老師">社會小老師</option><option value="其他">自訂...</option></select><input type="text" id="role-custom" class="w-full bg-gray-700 border-gray-600 border rounded p-2 hidden" placeholder="輸入職稱"></div></div><div><label class="text-xs font-bold text-gray-500">密碼 <span class="text-gray-500 font-normal">(若不修改請留空)</span></label><input type="text" id="role-new-pwd" class="w-full bg-gray-700 border-gray-600 border rounded p-2" placeholder="設定密碼"></div><div><label class="text-xs font-bold text-gray-500">進階權限</label><div class="checkbox-wrapper mt-1"><label class="check-item"><input type="checkbox" class="role-perm-check" value="manage_settings"> 🎛️ 系統設定</label><label class="check-item"><input type="checkbox" class="role-perm-check" value="manage_roles"> 👥 人員管理</label><label class="check-item"><input type="checkbox" class="role-perm-check" value="manage_tasks_full"> ✅ 完全管理</label></div></div><div><label class="text-xs font-bold text-gray-500">可管理科目</label><div id="role-subject-checks" class="checkbox-wrapper mt-1"></div></div></div><div class="p-4 border-t border-gray-700"><button onclick="saveRole()" class="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">儲存設定</button></div></div></div></div><template id="role-card-template"><div class="bg-gray-800 p-4 rounded border border-gray-700 mb-2 flex justify-between items-center"><div><div class="font-bold text-lg role-name-display text-white"></div><div class="text-xs text-gray-400 role-desc"></div></div><div class="flex gap-2"><button class="role-edit-button text-blue-400 hover:text-blue-300 text-xs border border-blue-900 px-2 py-1 rounded"><i class="fas fa-edit"></i> 編輯</button><button class="role-delete-button text-red-400 hover:text-red-300 text-xs border border-red-900 px-2 py-1 rounded"><i class="fas fa-trash"></i> 刪除</button></div></div></template><template id="subject-row-template"><div class="flex gap-2 items-center mb-2"><input type="text" placeholder="科目" class="subject-name-input w-1/3 bg-gray-800 p-2 rounded text-sm border border-gray-600 text-white"><input type="text" placeholder="關鍵字 (逗號分隔)" class="subject-keywords-input w-2/3 bg-gray-800 p-2 rounded text-sm border border-gray-600 text-white"><button class="subject-delete-button text-red-400 hover:text-red-300"><i class="fas fa-times"></i></button></div></template><script>let gId='',selectedRole='',currentUser=null,currentSubjects={},allRoles={};let delTaskId=null,delRoleName=null;let isEditingRole=false;let currentEditingRoleName='';let allTasks=[],selectedSubjects=['全部'],selectedMonths=[];let subjects=[];let currentAdvanced={};
    window.onload=function(){try{const p=new URLSearchParams(window.location.search);const i=p.get('id');const s=localStorage.getItem('hw_gid');if(i){document.getElementById('group-id').value=i;gId=i;}else if(s){document.getElementById('group-id').value=s;gId=s;}if(i&&i!==s){localStorage.removeItem('hw_role');localStorage.removeItem('hw_pwd');}document.getElementById('btn-check-id').onclick=()=>checkId();document.getElementById('btn-back-id').onclick=()=>showSection('step-id');document.getElementById('btn-toggle-pwd').onclick=()=>togglePwd('password',document.getElementById('btn-toggle-pwd'));document.getElementById('btn-login').onclick=()=>doLogin();document.getElementById('btn-forgot').onclick=showReset;document.getElementById('btn-back-role').onclick=()=>showSection('step-role');document.getElementById('btn-do-setup').onclick=doSetup;document.getElementById('btn-do-reset').onclick=doReset;document.getElementById('btn-back-pwd').onclick=()=>showSection('step-pwd');document.getElementById('btn-toggle-rec').onclick=toggleRec;document.getElementById('btn-open-add').onclick=openAddModal;document.getElementById('btn-open-change-pwd').onclick=openChangePwdModal;document.getElementById('btn-logout').onclick=doLogout;document.getElementById('btn-save-subjects').onclick=saveSubjects;document.getElementById('btn-add-subject').onclick=addNewSubjectRow;document.getElementById('btn-open-role-modal').onclick=()=>openRoleModal(false);document.getElementById('btn-accept-disclaimer').onclick=acceptDisclaimer;document.getElementById('btn-close-add').onclick=closeAddModal;document.getElementById('btn-submit-task').onclick=adminSubmitTask;document.getElementById('btn-close-change-pwd').onclick=closeChangePwdModal;document.getElementById('btn-do-change-pwd').onclick=doChangePassword;document.getElementById('btn-close-edit').onclick=closeEditModal;document.getElementById('btn-update-task').onclick=adminUpdateTask;document.getElementById('btn-confirm-delete').onclick=execDelete;
    document.getElementById('approval-mode').onchange=()=>{const v=document.getElementById('approval-mode').value; if(v==='timed') document.getElementById('timed-setting').classList.remove('hidden'); else document.getElementById('timed-setting').classList.add('hidden'); };
    document.getElementById('btn-save-advanced').onclick=saveAdvancedSettings;
    const sr=localStorage.getItem('hw_role'),sp=localStorage.getItem('hw_pwd');if(i&&sr&&sp)checkId(true);if(!localStorage.getItem('hw_disclaimer_accepted'))document.getElementById('modal-disclaimer').classList.remove('hidden','flex'),document.getElementById('modal-disclaimer').classList.add('flex');}catch(e){console.error(e);}};
    async function checkId(a=false){gId=document.getElementById('group-id').value.trim();if(!gId){if(!a)alert("請輸入ID");return;}try{const r=await fetch(window.location.href,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'admin_check_status',groupId:gId})});const d=await r.json();if(d.status==='need_setup'){if(a)showSection('step-id');else showSection('step-setup');}else if(d.status==='login'){allRoles=d.roles;currentAdvanced=d.advanced||{};const sr=localStorage.getItem('hw_role'),sp=localStorage.getItem('hw_pwd');if(a&&sr&&sp&&allRoles[sr]){selectedRole=sr;document.getElementById('password').value=sp;doLogin(true);}else{renderRoleButtons();showSection('step-role');}}}catch(e){if(!a)alert("錯誤");showSection('step-id');}}
    function acceptDisclaimer(){localStorage.setItem('hw_disclaimer_accepted','true');document.getElementById('modal-disclaimer').classList.add('hidden');document.getElementById('modal-disclaimer').classList.remove('flex');}
    function showSection(id){['step-id','step-role','step-pwd','step-setup','step-reset','step-dashboard'].forEach(s=>document.getElementById(s).classList.add('hidden'));document.getElementById(id).classList.remove('hidden');}
    function renderRoleButtons(){const d=document.getElementById('role-buttons');d.innerHTML='';Object.keys(allRoles).sort((a,b)=>((allRoles[a].perm||[]).includes('manage_settings')?1:0)-((allRoles[b].perm||[]).includes('manage_settings')?1:0)).forEach(r=>{const b=document.createElement('button');b.className='bg-gray-700 hover:bg-gray-600 p-3 rounded text-white font-bold';b.textContent=r;b.onclick=()=>{selectedRole=r;document.getElementById('current-role-name').innerText="身分: "+r;showSection('step-pwd');};d.appendChild(b);});}
    async function doSetup(){const n=document.getElementById('setup-name').value,p=document.getElementById('setup-pwd').value;if(!n)return alert("請填寫");const r=await fetch(window.location.href,{method:'POST',body:JSON.stringify({action:'admin_setup',groupId:gId,password:p,groupName:n})});const d=await r.json();if(d.status==='success'){alert("設定成功！\\n請截圖保存您的復原碼： "+d.recoveryCode);location.reload();}else alert(d.msg);}
    async function doLogin(s=false){const p=document.getElementById('password').value;try{const r=await fetch(window.location.href,{method:'POST',body:JSON.stringify({action:'admin_login',groupId:gId,roleName:selectedRole,password:p})});const d=await r.json();if(d.status==='success'){localStorage.setItem('hw_gid',gId);localStorage.setItem('hw_role',selectedRole);localStorage.setItem('hw_pwd',p);currentUser=d.roleData;currentSubjects=d.subjects;subjects=Object.keys(currentSubjects);allRoles=d.allRoles;currentAdvanced=d.advanced||{};document.getElementById('dash-role').innerText="身分: "+selectedRole;document.getElementById('dash-group-name').innerText=d.groupName||'群組';document.getElementById('my-rec-code').innerText=currentUser.rec;if(currentUser.binding_code){document.getElementById('binding-info').classList.remove('hidden');document.getElementById('my-bind-code').innerText=currentUser.binding_code;}else document.getElementById('binding-info').classList.add('hidden');if(d.showBindNotify){alert("🔔 請儘速綁定 LINE 帳號！\\n綁定後才可使用復原碼找回密碼。\\n綁定碼已顯示在畫面左上角。");}if(d.showPwdNotify && !p){alert("⚠️ 安全警告：您的帳號未設定密碼！\\n建議立即設定密碼以保護資料安全。");}const pm=currentUser.perm||[];if(pm.includes('manage_settings')||selectedRole==='總管理員'){document.getElementById('settings-panel').classList.remove('hidden');renderSubjectEditor();renderRoleEditor();renderAdvancedSettings();document.getElementById('tasks-panel').classList.remove('md:col-span-3');document.getElementById('tasks-panel').classList.add('md:col-span-2');}else{document.getElementById('settings-panel').classList.add('hidden');document.getElementById('tasks-panel').classList.remove('md:col-span-2');document.getElementById('tasks-panel').classList.add('md:col-span-3');}loadTasks();renderFilters();showSection('step-dashboard');}else{if(!s)alert(d.msg||"密碼錯誤");else{localStorage.clear();checkId();}}}catch(e){if(!s)alert("失敗");else showSection('step-id');}}
    function doLogout(){localStorage.clear();location.reload();}
    function renderSubjectEditor(){const c=document.getElementById('subject-editor');c.innerHTML='';Object.entries(currentSubjects).forEach(([s,k])=>{c.appendChild(createSubjectRowFragment(s,k.join(',')));});}
    function createSubjectRowFragment(n,k){const t=document.getElementById('subject-row-template'),c=t.content.cloneNode(true);c.querySelector('.subject-name-input').value=n;c.querySelector('.subject-keywords-input').value=k;c.querySelector('.subject-delete-button').onclick=function(){this.parentElement.remove();};return c;}
    function addNewSubjectRow(){document.getElementById('subject-editor').appendChild(createSubjectRowFragment('',''));}
    async function saveSubjects(){const ns={};document.querySelectorAll('#subject-editor > div').forEach(d=>{const n=d.querySelector('.subject-name-input').value.trim(),k=d.querySelector('.subject-keywords-input').value.split(',').map(x=>x.trim()).filter(x=>x);if(n){if(!k.includes(n))k.unshift(n);ns[n]=k;}});const r=await fetch(window.location.href,{method:'POST',body:JSON.stringify({action:'update_settings',groupId:gId,password:localStorage.getItem('hw_pwd'),subjects:ns})});const d=await r.json();if(d.status==='success'){alert("成功");currentSubjects=ns;subjects=Object.keys(ns);renderSubjectEditor();renderRoleEditor();renderFilters();}else alert('失敗');}
    function renderAdvancedSettings(){
        document.getElementById('approval-mode').value = currentAdvanced.approval_mode || 'timed';
        document.getElementById('approval-delay').value = currentAdvanced.approval_delay || 10;
        document.getElementById('disabled-cmds').value = (currentAdvanced.disabled_commands || []).join(', ');
        if(currentAdvanced.approval_mode === 'timed') document.getElementById('timed-setting').classList.remove('hidden'); else document.getElementById('timed-setting').classList.add('hidden');
    }
    async function saveAdvancedSettings(){
        const mode = document.getElementById('approval-mode').value;
        const delay = document.getElementById('approval-delay').value;
        const cmds = document.getElementById('disabled-cmds').value.split(',').map(x=>x.trim()).filter(x=>x);
        const newAdv = { approval_mode: mode, approval_delay: delay, disabled_commands: cmds };
        const r=await fetch(window.location.href,{method:'POST',body:JSON.stringify({action:'update_settings',groupId:gId,password:localStorage.getItem('hw_pwd'), advancedSettings: newAdv})});
        const d=await r.json();
        if(d.status==='success') { alert("進階設定已儲存"); currentAdvanced = {...currentAdvanced, ...newAdv}; } else alert("失敗");
    }
    function renderRoleEditor(){const c=document.getElementById('role-editor');c.innerHTML='';Object.entries(allRoles).sort(([,a],[,b])=>{const pa=(a.perm||[]).includes('manage_settings')?1:0,pb=(b.perm||[]).includes('manage_settings')?1:0;return pb-pa;}).forEach(([n,d])=>c.appendChild(createRoleCardFragment(n,d)));}
    function createRoleCardFragment(n,d){const t=document.getElementById('role-card-template'),c=t.content.cloneNode(true);c.querySelector('.role-name-display').innerText=n;let desc=[];if(d.perm.includes('manage_settings'))desc.push('系統設定');if(d.perm.includes('manage_tasks_full'))desc.push('完全管理');c.querySelector('.role-desc').innerText=desc.join(', ')||(d.subjects.includes('all')?'全科':'部分科目');const delBtn=c.querySelector('.role-delete-button');const editBtn=c.querySelector('.role-edit-button');if(n==='總管理員'){delBtn.remove();}else{delBtn.onclick=()=>{confirmDelRole(n);};}editBtn.onclick=()=>{openRoleModal(true,n);};return c;}
    function openRoleModal(isEdit,roleName){isEditingRole=isEdit;currentEditingRoleName=roleName||'';document.getElementById('modal-role-add').classList.remove('hidden');document.getElementById('modal-role-add').classList.add('flex');document.getElementById('role-new-pwd').value='';document.querySelectorAll('.role-perm-check').forEach(c=>c.checked=false);document.querySelectorAll('.role-perm-check').forEach(c=>c.disabled=false);const c=document.getElementById('role-subject-checks');c.innerHTML='';const al=document.createElement('label');al.className='check-item';al.innerHTML='<input type="checkbox" value="all"> 所有科目';c.appendChild(al);Object.keys(currentSubjects).forEach(s=>{const l=document.createElement('label');l.className='check-item';l.innerHTML='<input type="checkbox" value="'+s+'"> '+s;c.appendChild(l);});if(isEdit&&allRoles[roleName]){const d=allRoles[roleName];const sel=document.getElementById('role-select');if(["班導師","副班長","國文小老師","英文小老師","數學小老師","自然小老師","社會小老師"].includes(roleName)){sel.value=roleName;document.getElementById('role-custom').classList.add('hidden');}else{sel.value='其他';document.getElementById('role-custom').classList.remove('hidden');document.getElementById('role-custom').value=roleName;}if(roleName==='總管理員'){sel.disabled=true;document.getElementById('role-custom').disabled=true;document.querySelectorAll('.role-perm-check').forEach(k=>{k.checked=true; k.disabled=true;});}else{sel.disabled=false;document.getElementById('role-custom').disabled=false; (d.perm||[]).forEach(p=>{const k=document.querySelector('.role-perm-check[value="'+p+'"]');if(k)k.checked=true;});}(d.subjects||[]).forEach(s=>{const k=document.querySelector('#role-subject-checks input[value="'+s+'"]');if(k)k.checked=true;});}else{document.getElementById('role-select').value='班導師';checkRoleSelect();document.getElementById('role-select').disabled=false;document.getElementById('role-custom').disabled=false;}}
    function closeRoleModal(){document.getElementById('modal-role-add').classList.add('hidden');document.getElementById('modal-role-add').classList.remove('flex');}
    function checkRoleSelect(){const v=document.getElementById('role-select').value;if(v==='其他')document.getElementById('role-custom').classList.remove('hidden');else document.getElementById('role-custom').classList.add('hidden');}
    async function saveRole(){let n=document.getElementById('role-select').value;if(n==='其他')n=document.getElementById('role-custom').value.trim();if(!n)return alert("填寫職稱");if(isEditingRole&&currentEditingRoleName!==n&&currentEditingRoleName!=='總管理員'){delete allRoles[currentEditingRoleName];}if(isEditingRole&&currentEditingRoleName==='總管理員')n='總管理員';const p=document.getElementById('role-new-pwd').value;let perms=[];if(n==='總管理員'){perms=["manage_roles","manage_settings","manage_tasks_full","access_frontend_control","self_change_pwd"];}else{perms=Array.from(document.querySelectorAll('.role-perm-check:checked')).map(x=>x.value);}const subs=Array.from(document.querySelectorAll('#role-subject-checks input:checked')).map(x=>x.value);const nr={...allRoles};let oldHash=(allRoles[n])?allRoles[n].hash:"";let finalPwd=(p)?p:"";nr[n]={hash:'',rec:'',level:perms.includes('manage_settings')?99:10,subjects:subs,perm:perms,password:finalPwd};const r=await fetch(window.location.href,{method:'POST',body:JSON.stringify({action:'update_settings',groupId:gId,password:localStorage.getItem('hw_pwd'),settings:{roles:nr}})});const d=await r.json();if(d.status==='success'){alert("儲存成功");allRoles=d.newRoles;renderRoleEditor();closeRoleModal();}else alert(d.msg);}
    function confirmDelRole(n){delRoleName=n;delTaskId=null;document.getElementById('modal-delete-confirm').classList.remove('hidden');document.getElementById('modal-delete-confirm').classList.add('flex');}
    async function deleteRole(){if(!delRoleName)return;const nr={...allRoles};delete nr[delRoleName];const r=await fetch(window.location.href,{method:'POST',body:JSON.stringify({action:'update_settings',groupId:gId,password:localStorage.getItem('hw_pwd'),settings:{roles:nr}})});const d=await r.json();closeDelModal();if(d.status==='success'){allRoles=d.newRoles;renderRoleEditor();}else alert(d.msg);}
    function openChangePwdModal(){document.getElementById('modal-change-pwd').classList.remove('hidden','flex');document.getElementById('modal-change-pwd').classList.add('flex');}
    function closeChangePwdModal(){document.getElementById('modal-change-pwd').classList.add('hidden');}
    async function doChangePassword(){const o=document.getElementById('old-pwd').value,n=document.getElementById('new-pwd').value;if(!o||!n)return alert("填寫");const r=await fetch(window.location.href,{method:'POST',body:JSON.stringify({action:'change_password',groupId:gId,roleName:selectedRole,oldPassword:o,newPassword:n})});const d=await r.json();if(d.status==='success'){alert("成功");doLogout();}else alert(d.msg);}
    function showReset(){document.getElementById('reset-role-name').innerText=selectedRole;showSection('step-reset');}
    async function doReset(){const c=document.getElementById('recovery-code').value,n=document.getElementById('new-password').value;const r=await fetch(window.location.href,{method:'POST',body:JSON.stringify({action:'admin_reset_pwd',groupId:gId,roleName:selectedRole,recoveryCode:c,newPassword:n})});const d=await r.json();if(d.status==='success'){alert("成功");showSection('step-pwd');}else alert("失敗");}
    function toggleTheme(){document.body.classList.toggle('light-mode');}
    function togglePwd(id,ic){const i=document.getElementById(id);i.type=i.type==='password'?'text':'password';ic.classList.toggle('fa-eye');ic.classList.toggle('fa-eye-slash');}
    function toggleRec(){document.getElementById('my-rec-code').classList.toggle('blur-sm');}
    async function loadTasks(){const r=await fetch(window.location.href,{method:'POST',body:JSON.stringify({action:'admin_get_tasks',groupId:gId})});const d=await r.json();allTasks=d.tasks||[];renderList();renderFilters();}
    function renderFilters(){
        const sc = document.getElementById('subject-container'); sc.innerHTML='';
        subjects.forEach(s => {
            const btn = document.createElement('button');
            const isActive = selectedSubjects.includes(s);
            btn.className = 'px-3 py-1 border rounded-full text-sm whitespace-nowrap transition ' + (isActive ? 'chip-active' : 'chip-inactive');
            btn.textContent = s; btn.onclick = () => toggleSubject(s); sc.appendChild(btn);
        });
        const subSel = document.getElementById('subject-filter-select'); 
        subSel.innerHTML='<option value="">選擇科目...</option><option value="全部">全部</option>';
        subjects.forEach(s => { subSel.innerHTML+= '<option value="'+s+'">'+s+'</option>'; });
        const subDisp = document.getElementById('selected-subjects-display'); subDisp.innerHTML='';
        selectedSubjects.forEach(s=>{ if(s!=='全部'){ const sp=document.createElement('span'); sp.className='bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1'; sp.innerHTML=s+' <i class="fas fa-times cursor-pointer"></i>'; sp.onclick=()=>toggleSubject(s); subDisp.appendChild(sp); } });
        const mc = document.getElementById('month-container'); mc.innerHTML='';
        for(let i=1; i<=12; i++){
            const btn = document.createElement('button');
            const mStr = i + '月'; const isActive = selectedMonths.includes(i);
            btn.className = 'px-3 py-1 border rounded-full text-sm whitespace-nowrap transition ' + (isActive ? 'chip-active' : 'chip-inactive');
            btn.textContent = mStr; btn.onclick = () => toggleMonth(i); mc.appendChild(btn);
        }
        const mDisp = document.getElementById('selected-months-display'); mDisp.innerHTML='';
        selectedMonths.sort((a,b)=>a-b).forEach(m=>{ const sp = document.createElement('span'); sp.className='bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1'; sp.innerHTML = m+'月 <i class="fas fa-times cursor-pointer"></i>'; sp.onclick = () => toggleMonth(m); mDisp.appendChild(sp); });
    }
    function toggleSubject(s){
        if(s === '全部'){ selectedSubjects = ['全部']; }
        else { if(selectedSubjects.includes('全部')) selectedSubjects = []; if(selectedSubjects.includes(s)) selectedSubjects = selectedSubjects.filter(i => i !== s); else selectedSubjects.push(s); if(selectedSubjects.length === 0) selectedSubjects = ['全部']; }
        renderFilters(); renderList();
    }
    function toggleMonth(m){
        if(document.getElementById('time-filter').value !== 'all') document.getElementById('time-filter').value = 'all';
        if(selectedMonths.includes(m)) selectedMonths = selectedMonths.filter(i => i !== m); else selectedMonths.push(m);
        renderFilters(); renderList();
    }
    function renderList(){const l=document.getElementById('admin-task-list');l.innerHTML='';
        const timeVal = document.getElementById('time-filter').value;
        const contentVal = document.getElementById('content-search').value.toLowerCase();
        const now = new Date(); now.setHours(0,0,0,0);
        if(timeVal !== 'all' && selectedMonths.length > 0){ selectedMonths = []; renderFilters(); }
        const f=allTasks.filter(t=>{
            if(!selectedSubjects.includes('全部') && !selectedSubjects.includes(t.subject)) return false;
            const d = new Date(t.date);
            if(timeVal !== 'all'){ const diff = (d - now) / (1000 * 60 * 60 * 24); if(diff < 0 || diff > parseInt(timeVal)) return false; }
            if(selectedMonths.length > 0){ if(!selectedMonths.includes(d.getMonth() + 1)) return false; }
            if(contentVal && !t.content.toLowerCase().includes(contentVal)) return false;
            return true;
        });
    
        if(f.length===0){l.innerHTML='<p class="text-center text-gray-500">無</p>';return;}f.forEach(t=>{const can=((currentUser.subjects||[]).includes('all')||(currentUser.subjects||[]).includes(t.subject));const perms=currentUser.perm||[];const canFull=perms.includes('manage_tasks_full')||selectedRole==='總管理員';const canDo=can||canFull;const row=document.createElement('div');row.className="flex items-center gap-3 p-3 bg-gray-800 rounded mb-2";let st='bg-gray-700';if(t.status==='待審核')st='bg-yellow-900';if(t.status==='疑慮')st='bg-red-900';if(t.status==='已發佈')st='bg-green-900';let h='<div class="w-16 text-center"><span class="text-xs '+st+' text-white px-2 py-1 rounded">'+t.status+'</span></div>'+'<div class="flex-1"><p class="text-sm">'+t.content+'</p><p class="text-xs text-gray-400">'+t.date+'・'+t.subject+'</p></div>';row.innerHTML=h;const g=document.createElement('div');g.className="flex items-center gap-2";if(canDo){const edit=document.createElement('button');edit.className="text-blue-400 text-xs mr-2 hover:text-white";edit.innerHTML='<i class="fas fa-edit"></i> 編輯';edit.onclick=()=>{document.getElementById('edit-id').value=t.id;document.getElementById('edit-date').value=t.date;document.getElementById('edit-content').value=t.content;document.getElementById('edit-category').value=t.category;const es=document.getElementById('edit-subject');es.innerHTML=Object.keys(currentSubjects).map(x=>'<option>'+x+'</option>').join('');es.value=t.subject;document.getElementById('modal-edit-task').classList.remove('hidden');document.getElementById('modal-edit-task').classList.add('flex');};g.appendChild(edit);}if(canDo&&(t.status==='待審核'||t.status==='疑慮')){const b=document.createElement('button');b.className="text-green-400 px-2 border border-green-900 rounded hover:bg-green-900";b.innerHTML="✅";b.onclick=()=>manageTask(t.id,'approve');g.appendChild(b);}if(canDo){const b=document.createElement('button');b.className="text-red-400 text-xs hover:text-red-200";b.innerHTML='<i class="fas fa-trash"></i> 刪除';b.onclick=()=>{delTaskId=t.id;delRoleName=null;document.getElementById('modal-delete-confirm').classList.remove('hidden');document.getElementById('modal-delete-confirm').classList.add('flex');};g.appendChild(b);}row.appendChild(g);l.appendChild(row);});}
    function closeEditModal(){document.getElementById('modal-edit-task').classList.add('hidden');}
    async function adminUpdateTask(){const id=document.getElementById('edit-id').value,dt=document.getElementById('edit-date').value,sub=document.getElementById('edit-subject').value,con=document.getElementById('edit-content').value,cat=document.getElementById('edit-category').value;if(!dt||!con)return alert("填寫");
    const mentions = document.getElementById('edit-mentions').value.trim();
    let finalContent = con; if(mentions) finalContent += " " + mentions.split(' ').map(m=>m.startsWith('@')?m:'@'+m).join(' ');
    await fetch(window.location.href,{method:'POST',body:JSON.stringify({action:'update_task',taskId:id,date:dt,subject:sub,content:finalContent,category:cat,groupId:gId,password:localStorage.getItem('hw_pwd'),roleName:selectedRole})});closeEditModal();loadTasks();}
    async function execDelete(){if(delRoleName){deleteRole();}else if(delTaskId){const r=await fetch(window.location.href,{method:'POST',body:JSON.stringify({action:'manage_task',type:'delete',groupId:gId,taskId:delTaskId,password:localStorage.getItem('hw_pwd'),roleName:selectedRole})});const d=await r.json();closeDelModal();if(d.status==='success')loadTasks();else alert(d.msg);}}
    function closeDelModal(){document.getElementById('modal-delete-confirm').classList.add('hidden');delTaskId=null;delRoleName=null;}
    async function manageTask(id,type){const r=await fetch(window.location.href,{method:'POST',body:JSON.stringify({action:'manage_task',type,groupId:gId,taskId:id,password:localStorage.getItem('hw_pwd'),roleName:selectedRole})});const d=await r.json();if(d.status==='success')loadTasks();else alert(d.msg);}
    function openAddModal(){const t=new Date();t.setDate(t.getDate()+1);document.getElementById('admin-date').valueAsDate=t;const s=document.getElementById('admin-subject');s.innerHTML=Object.keys(currentSubjects).map(x=>'<option>'+x+'</option>').join('');document.getElementById('modal-admin-add').classList.remove('hidden');document.getElementById('modal-admin-add').classList.add('flex');}
    function closeAddModal(){document.getElementById('modal-admin-add').classList.add('hidden');}
    async function adminSubmitTask(){const dt=document.getElementById('admin-date').value,s=document.getElementById('admin-subject').value,c=document.getElementById('admin-content').value,cat=document.getElementById('admin-category').value;if(!dt||!c)return alert("填寫");
    const mentions = document.getElementById('admin-mentions').value.trim();
    let finalContent = c; if(mentions) finalContent += " " + mentions.split(' ').map(m=>m.startsWith('@')?m:'@'+m).join(' ');
    await fetch(window.location.href,{method:'POST',body:JSON.stringify({action:'add_task',date:dt,subject:s,content:finalContent,category:cat,groupId:gId,isAdmin:true})});closeAddModal();loadTasks();}
</script></body></html>`;
}
