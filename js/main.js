function updateUtcClock(){
 const d=new Date();const z=v=>String(v).padStart(2,'0');
 document.getElementById('utcNow').textContent=`現在 UTC ${d.getUTCFullYear()}/${z(d.getUTCMonth()+1)}/${z(d.getUTCDate())} ${z(d.getUTCHours())}:${z(d.getUTCMinutes())}`;
 const today=Math.floor(d.getTime()/86400000)*86400000;
 if(window.lastMarkedToday!==undefined && today!==window.lastMarkedToday)render();
 window.lastMarkedToday=today;
}
updateUtcClock();setInterval(updateUtcClock,60000);

let PRESET=[{"name":"オールスターナイト（トップ司令官）","category":"個人対抗イベント","anchor":"2026-11-02","everyDays":14,"duration":7,"notes":"","frequency":"隔週"},{"name":"立入禁止戦域","category":"協力イベント","anchor":"2026-11-09","everyDays":14,"duration":2,"notes":"1日目は登録日、2日目以降イベント開始","frequency":"隔週"},{"name":"群島レイド","category":"同盟対抗＆戦闘イベント","anchor":"2026-11-09","everyDays":28,"duration":7,"notes":"1日目は登録日、2日目マッチング、3日目以降イベント開始","frequency":"4週間ごと"},{"name":"孤島レイド","category":"同盟対抗＆戦闘イベント","anchor":"2026-11-25","everyDays":28,"duration":5,"notes":"1日目は登録日、2日目マッチング、3日目以降イベント開始","frequency":"4週間ごと"},{"name":"ポンペイ","category":"協力イベント","anchor":"2026-11-02","everyDays":14,"duration":2,"notes":"1日目は登録日、2日目以降イベント開始","frequency":"毎週"},{"name":"ウォーター戦争","category":"個人対抗＆協力イベント","anchor":"2026-11-02","everyDays":7,"duration":3,"notes":"","frequency":"毎週"},{"name":"同盟リーグ","category":"個人対抗＆協力イベント","anchor":"2026-11-23","everyDays":28,"duration":7,"notes":"","frequency":"4週間ごと"},{"name":"極限対決","category":"同盟対抗＆戦闘イベント","anchor":"2026-11-20","everyDays":28,"duration":2,"notes":"1日目は登録日、2日目以降イベント開始","frequency":"4週間ごと"},{"name":"名誉エンブレム","category":"個人対抗イベント","anchor":"2026-11-08","everyDays":14,"duration":1,"notes":"","frequency":"隔週"},{"name":"釣りイベント","category":"個人対抗イベント","anchor":"2026-11-13","everyDays":14,"duration":3,"notes":"","frequency":"隔週"},{"name":"黙示録の金庫","category":"個人イベント（対抗無し）","anchor":"2026-11-01","everyDays":28,"duration":7,"notes":"","frequency":"4週間ごと"},{"name":"運命の勝者","category":"個人対抗イベント","anchor":"2026-11-07","everyDays":28,"duration":2,"notes":"","frequency":"4週間ごと"},{"name":"荒野の探索","category":"個人対抗＆協力イベント","anchor":"2026-11-02","everyDays":14,"duration":4,"notes":"1日目は登録日、2日目以降イベント開始","frequency":"隔週"},{"name":"拠点防衛","category":"協力イベント","anchor":"2026-11-04","everyDays":7,"duration":1,"notes":"","frequency":"毎週"},{"name":"同盟の旅","category":"個人対抗＆協力イベント","anchor":"2026-11-11","everyDays":28,"duration":5,"notes":"","frequency":"4週間ごと"},{"name":"生化獣探索","category":"個人イベント（対抗無し）","anchor":"2026-11-09","everyDays":14,"duration":3,"notes":"","frequency":"隔週"},{"name":"バイオパンク","category":"個人対抗イベント","anchor":"2026-11-09","everyDays":14,"duration":7,"notes":"","frequency":"隔週"},{"name":"砲火の祭典","category":"個人対抗イベント","anchor":"2026-11-15","everyDays":14,"duration":1,"notes":"","frequency":"隔週"},{"name":"地区対決（スゴロク）","category":"協力イベント","anchor":"2026-11-04","everyDays":28,"duration":5,"notes":"1日目は登録日、2日目マッチング、3日目以降イベント開始","frequency":"4週間ごと"},{"name":"精製チャレンジ","category":"個人対抗イベント","anchor":"2026-11-20","everyDays":28,"duration":3,"notes":"","frequency":"4週間ごと"},{"name":"沈没船の秘宝","category":"協力イベント","anchor":"2026-11-13","everyDays":28,"duration":3,"notes":"1日目は登録日、2日目から参加可能、3日目が報酬交換期限","frequency":"4週間ごと"},{"name":"物資リコール・お宝交換","category":"個人イベント（対抗無し）","anchor":"2026-11-09","everyDays":28,"duration":2,"notes":"兵装の欠片やヒーロー金欠片、プリスティンライフの交換がお薦め","frequency":"4週間ごと"},{"name":"基地探索","category":"個人イベント（対抗無し）","anchor":"2026-11-12","everyDays":14,"duration":2,"notes":"兵装の欠片やヒーロー金欠片、プリスティンライフの交換がお薦め","frequency":"隔週"}];
const CATS=[{name:'同盟対抗＆戦闘イベント',color:'#C86D56'},{name:'協力イベント',color:'#328F83'},{name:'個人対抗＆協力イベント',color:'#8C71BE'},{name:'個人対抗イベント',color:'#4F8DC3'},{name:'個人イベント（対抗無し）',color:'#C39A3B'},{name:'期間限定・コラボ',color:'#B83242'}];
const CATEGORY_SHORT_LABELS={'同盟対抗＆戦闘イベント':'同盟対抗＆戦闘','協力イベント':'協力','個人対抗＆協力イベント':'個人対抗＆協力','個人対抗イベント':'個人対抗','個人イベント（対抗無し）':'個人（対抗無し）','期間限定・コラボ':'期間限定・コラボ'};
const colorByCat=Object.fromEntries(CATS.map(c=>[c.name,c.color]));
const dayMS=86400000;const dateUTC=s=>new Date(s+'T00:00:00Z').getTime();const iso=t=>new Date(t).toISOString().slice(0,10);const fmt=t=>new Intl.DateTimeFormat('ja-JP',{year:'numeric',month:'numeric',day:'numeric',timeZone:'UTC'}).format(new Date(t));const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const fmtMd=t=>{let d=new Date(t);return `${d.getUTCMonth()+1}/${d.getUTCDate()}`};
let view='week',anchor=null,categoryFilter=new Set(),sortMode='date';
let weekSortMode='date',monthSortMode='custom';
let manual=[]; // GitHub events.json の specialEvents から取得
function offset(){return 0}function localDay(t){return Math.floor((t+offset())/dayMS)*dayMS-offset()}
function startWeek(t){let d=new Date(t+offset());let n=(d.getUTCDay()+6)%7;return localDay(t)-n*dayMS}function startMonth(t){let d=new Date(t+offset());return Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),1)-offset()}
function localToday(){return localDay(Date.now())}
function reset(){anchor=view==='week'?startWeek(Date.now()):startMonth(Date.now())}
function move(n){if(view==='week')anchor+=n*7*dayMS;else{let d=new Date(anchor+offset());anchor=Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+n,1)-offset()}render()}
// 初期順は従来20件の順序を維持し、沈没船の秘宝を末尾に追加。
let DEFAULT_ORDER=["群島レイド","孤島レイド","極限対決","地区対決（スゴロク）","黙示録の金庫","生化獣探索","オールスターナイト（トップ司令官）","運命の勝者","精製チャレンジ","名誉エンブレム","砲火の祭典","バイオパンク","釣りイベント","ポンペイ","拠点防衛","立入禁止戦域","同盟リーグ","同盟の旅","荒野の探索","ウォーター戦争","沈没船の秘宝","物資リコール・お宝交換","基地探索"];
let customOrder=[...DEFAULT_ORDER];
try{const saved=JSON.parse(localStorage.getItem('dls-order-v5')||'null');if(Array.isArray(saved)){const migrated=saved.map(n=>n==='禁区探索'?'バイオパンク':n);customOrder=[...migrated.filter(n=>customOrder.includes(n)),...customOrder.filter(n=>!migrated.includes(n))]}}catch(e){}
function orderRank(name){const i=customOrder.indexOf(name);return i<0?999:i}
function compareEvents(a,b){
 if(sortMode==='custom'){
  // 臨時イベントを優先。臨時イベント同士は開始UTC→開催日数→50音順。
  if(Boolean(a.manual)!==Boolean(b.manual))return a.manual?-1:1;
  if(a.manual&&b.manual)return a.start-b.start||a.duration-b.duration||a.name.localeCompare(b.name,'ja');
  // 通常イベントの指定順はこれまでどおり維持。
  let ar=customOrder.indexOf(a.name),br=customOrder.indexOf(b.name);
  if(ar!==br)return (ar<0?999:ar)-(br<0?999:br);
 }
 return a.start-b.start||orderRank(a.name)-orderRank(b.name)||a.name.localeCompare(b.name,'ja');
}
function saveOrder(){try{localStorage.setItem('dls-order-v5',JSON.stringify(customOrder))}catch(e){}}
function changeOrder(from,to){
 if(!Number.isInteger(from)||!Number.isInteger(to)||from<0||from>=customOrder.length||to<0||to>=customOrder.length||from===to)return;
 const [moved]=customOrder.splice(from,1);customOrder.splice(to,0,moved);
 saveOrder();renderOrderList();render();
}
let dragFrom=null;
function clearOrderHints(){document.querySelectorAll('#orderList .orderitem').forEach(r=>r.classList.remove('dragging','drop-before','drop-after'))}
function renderOrderList(){
 const list=document.getElementById('orderList');
 list.innerHTML=customOrder.map((n,i)=>`<div class="orderitem" data-idx="${i}" draggable="true" aria-label="${esc(n)}、${i+1}番目、ドラッグして並び替え"><span class="orderhandle" title="ドラッグして移動">⠿</span><span class="ordername">${i+1}. ${esc(n)} <small style="color:#98a9bd">（${esc(PRESET.find(p=>p.name===n)?.category||'その他')}）</small></span><button class="btn" data-top="${i}" ${i===0?'disabled':''} aria-label="${esc(n)}を先頭へ">先頭へ</button><button class="btn" data-order="${i}" data-direction="-1" ${i===0?'disabled':''} aria-label="${esc(n)}を上へ">▲</button><button class="btn" data-order="${i}" data-direction="1" ${i===customOrder.length-1?'disabled':''} aria-label="${esc(n)}を下へ">▼</button></div>`).join('');
 list.querySelectorAll('[data-order]').forEach(b=>b.onclick=()=>{let i=Number(b.dataset.order);changeOrder(i,i+Number(b.dataset.direction))});
 list.querySelectorAll('[data-top]').forEach(b=>b.onclick=()=>changeOrder(Number(b.dataset.top),0));
 list.querySelectorAll('.orderitem').forEach(row=>{
   row.addEventListener('dragstart',e=>{if(e.target.closest('button')){e.preventDefault();return}dragFrom=Number(row.dataset.idx);e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',String(dragFrom));requestAnimationFrame(()=>row.classList.add('dragging'))});
   row.addEventListener('dragover',e=>{if(dragFrom===null)return;e.preventDefault();e.dataTransfer.dropEffect='move';clearOrderHints();list.querySelector(`[data-idx="${dragFrom}"]`)?.classList.add('dragging');const after=e.clientY>row.getBoundingClientRect().top+row.offsetHeight/2;row.classList.add(after?'drop-after':'drop-before')});
   row.addEventListener('drop',e=>{e.preventDefault();if(dragFrom===null)return;const target=Number(row.dataset.idx),after=e.clientY>row.getBoundingClientRect().top+row.offsetHeight/2;let dest=target+(after?1:0);if(dragFrom<dest)dest--;const from=dragFrom;dragFrom=null;clearOrderHints();changeOrder(from,dest)});
   row.addEventListener('dragend',()=>{dragFrom=null;clearOrderHints()});
 });
}


// events.json は GitHub Pages と同じフォルダに設置する。公開ページは常に共有ファイルを読む。
// file:// でのHTML単体プレビューでは埋め込みの初期21件を表示する（共有更新は取得できない）。
async function loadSharedEvents(){
 if(location.protocol==='file:'){
   document.getElementById('dataStatus').textContent='HTML単体プレビュー：GitHubの共通データは未取得';
   return;
 }
 try{
   const r=await fetch('./events.json',{cache:'no-store'});
   if(!r.ok)throw new Error('HTTP '+r.status);
   const data=await r.json();
   if(!Array.isArray(data.events)||!Array.isArray(data.specialEvents))throw new Error('JSONのevents/specialEventsが配列ではありません');
   const validCategory=new Set(CATS.map(c=>c.name));
   const validDate=x=>/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x+'T00:00:00Z'));
   const base=data.events.filter(x=>x&&typeof x.name==='string'&&validCategory.has(x.category)&&validDate(x.anchor)&&Number.isInteger(x.everyDays)&&x.everyDays>0&&Number.isInteger(x.duration)&&x.duration>0);
   const specials=data.specialEvents.filter(x=>x&&typeof x.name==='string'&&validCategory.has(x.category)&&validDate(x.anchor)&&Number.isInteger(x.duration)&&x.duration>0);
   if(base.length!==data.events.length||specials.length!==data.specialEvents.length)throw new Error('データに不正なイベントがあります');
   PRESET=base;
   manual=specials.map((x,i)=>({...x,id:'shared_'+i+'_'+x.anchor,notes:x.notes||''}));
   if(Array.isArray(data.defaultOrder)){
      DEFAULT_ORDER=[...new Set([...data.defaultOrder.filter(x=>base.some(p=>p.name===x)),...base.map(x=>x.name)])];
      let saved=null;try{saved=JSON.parse(localStorage.getItem('dls-order-v5')||'null')}catch(e){}
      const migrated=Array.isArray(saved)?saved.map(n=>n==='禁区探索'?'バイオパンク':n):null;
      customOrder=migrated?[...migrated.filter(n=>DEFAULT_ORDER.includes(n)),...DEFAULT_ORDER.filter(n=>!migrated.includes(n))]:[...DEFAULT_ORDER];
   }
   document.getElementById('dataStatus').textContent=`共通データ取得済み：定期${base.length}件・臨時${specials.length}件`;
   render();
   window.refreshAutoNotices?.();
 }catch(e){
   document.getElementById('dataStatus').textContent='共通データを取得できませんでした（画面は内蔵の初期データ）';
   console.error('events.json の取得に失敗:',e);
 }
}

function enumerate(a,b){let output=[];for(let p of PRESET){let base=dateUTC(p.anchor),stride=p.everyDays*dayMS;let startN=Math.floor((a-base-p.duration*dayMS)/stride)-1;let endN=Math.ceil((b-base)/stride)+1;for(let n=startN;n<=endN;n++){let start=base+n*stride,end=start+p.duration*dayMS;if(end<=a||start>=b)continue;let title=p.name;let notes=p.notes||'';;output.push({...p,title,start,end,manual:false,id:p.name+'_'+iso(start),notes})}}for(let x of manual){let start=dateUTC(x.anchor),end=start+x.duration*dayMS;if(start<b&&end>a)output.push({...x,title:x.name,start,end,manual:true,id:x.id})}return output.filter(x=>categoryFilter.size===0||categoryFilter.has(x.category)).sort(compareEvents)}
function dayLabel(t){let d=new Date(t+offset()),days=['日','月','火','水','木','金','土'];return `<span>${days[d.getUTCDay()]}曜日</span><strong>${d.getUTCDate()}</strong>`}
function render(){const a=view==='week'?startWeek(anchor):startMonth(anchor);if(view==='week')anchor=a;else anchor=a;
let end,displayStart,events;if(view==='week'){end=a+7*dayMS;events=enumerate(a,end);displayStart=fmtMd(a+offset())+' 〜 '+fmtMd(end-dayMS+offset());document.getElementById('period').textContent=`${new Date(a+offset()).getUTCFullYear()}年 ${displayStart}　UTC`;renderWeek(a,events)}else{let d=new Date(a+offset());end=Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,1)-offset();events=enumerate(a,end);document.getElementById('period').textContent=`${d.getUTCFullYear()}年 ${d.getUTCMonth()+1}月　UTC`;renderMonth(a,end)}
document.getElementById('sortMode').value=sortMode;document.getElementById('displaySettingsCurrent').textContent='現在：'+(sortMode==='custom'?'指定したイベント順':'開始日が早い順');document.getElementById('counter').textContent=events.length+' 件';document.getElementById('periodMode').textContent=view==='week'?'週間表示':'月間表示';['weekly','monthly'].forEach((id,i)=>document.getElementById(id).classList.toggle('active',(i===0)===(view==='week')));renderLegend()}
function renderLegend(){
 const all=categoryFilter.size===0;
 document.getElementById('legend').innerHTML=`<button type="button" data-cat="all" class="${all?'active':''}" aria-pressed="${all}">すべて</button>`+CATS.map(c=>`<button type="button" data-cat="${esc(c.name)}" class="${categoryFilter.has(c.name)?'active':''}" aria-pressed="${categoryFilter.has(c.name)}"><i class="dot" style="background:${c.color}"></i>${esc(CATEGORY_SHORT_LABELS[c.name]||c.name)}</button>`).join('');
 document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{
   const target=b.dataset.cat;
   if(target==='all'){categoryFilter.clear()}
   else if(categoryFilter.size===0){categoryFilter.add(target)}
   else if(categoryFilter.has(target)){categoryFilter.delete(target)}
   else{categoryFilter.add(target)}
   // 6カテゴリ全選択なら「すべて」に戻す
   if(categoryFilter.size===CATS.length)categoryFilter.clear();
   render();
 });
}
function renderWeek(a,events){let h=`<div class="week"><div class="weekheader"><div class="labelcell">イベント名</div>`;for(let i=0;i<7;i++){let t=a+i*dayMS;h+=`<div class="dayhead ${localDay(Date.now())===t?'today':''}">${dayLabel(t)}</div>`}h+='</div>';if(!events.length)h+='<div class="empty">この週に該当するイベントはありません。</div>';for(let ev of events){h+=`<div class="evrow"><div class="evname">${esc(ev.title)}<small>${ev.manual?'臨時イベント（共通）':'周期から自動計算'}</small></div>`;for(let i=0;i<7;i++){let s=a+i*dayMS,e=s+dayMS,active=ev.start<e&&ev.end>s;if(active){let begin=ev.start>=s,finish=ev.end<=e;let cls=(begin?'start ':'')+(finish?'end ':'');if(!begin&&!finish)cls+='mid';let nth=Math.floor((s-ev.start)/dayMS);let barLabel=ev.notes.includes('1日目は登録日')&&nth===0?'登録日':ev.notes.includes('2日目マッチング')&&nth===1?'マッチング':'';h+=`<div class="daycell ${localToday()===s?'today':''}"><button class="bar ${cls}" data-id="${esc(ev.id)}" title="${esc(ev.title)}" style="background:${colorByCat[ev.category]}"><i>${barLabel}</i></button></div>`}else h+=`<div class="daycell ${localToday()===s?'today':''}"></div>`}h+='</div>'}h+='</div>';document.getElementById('calendar').innerHTML=h;linkDetails(events)}
function renderMonth(a,end){let firstWeek=startWeek(a),last=end;let weeks=Math.ceil((end-firstWeek)/dayMS/7),dayEnd=firstWeek+weeks*7*dayMS,events=enumerate(firstWeek,dayEnd);let h='<div class="month">';for(let x of ['月','火','水','木','金','土','日'])h+=`<div class="mhead">${x}</div>`;for(let t=firstWeek;t<dayEnd;t+=dayMS){let dayEvents=events.filter(e=>e.start<t+dayMS&&e.end>t),isOther=t<a||t>=end;h+=`<div class="mday ${isOther?'other':''} ${localToday()===t?'today':''}"><div class="mnum">${new Date(t+offset()).getUTCDate()}</div>`;for(let ev of dayEvents.slice(0,3)){h+=`<button class="mevent" data-id="${esc(ev.id)}" title="${esc(ev.title)}" style="background:${colorByCat[ev.category]}55;border-left-color:${colorByCat[ev.category]}">${esc(ev.title)}</button>`}if(dayEvents.length>3)h+=`<div class="more">ほか ${dayEvents.length-3} 件</div>`;h+='</div>'}h+='</div>';document.getElementById('calendar').innerHTML=h;linkDetails(events)}
function linkDetails(events){document.querySelectorAll('[data-id]').forEach(el=>el.onclick=()=>showDetail(events.find(e=>e.id===el.dataset.id)))}
function formatDateTime(t){return fmt(t+offset())+' '+String(new Date(t+offset()).getUTCHours()).padStart(2,'0')+':00'}
function showDetail(ev){if(!ev)return;document.getElementById('detailName').textContent=ev.title;document.getElementById('detailBody').innerHTML=`<span class="status">${ev.manual?'GitHub登録の臨時イベント':'周期から計算した予想日程'}</span><div class="detailrow"><span>カテゴリー</span><strong><i class="dot" style="background:${colorByCat[ev.category]}"></i> ${esc(ev.category)}</strong></div><div class="detailrow"><span>開始（UTC）</span><strong>${formatDateTime(ev.start)}</strong></div><div class="detailrow"><span>終了（UTC）</span><strong>${formatDateTime(ev.end)}</strong></div><div class="detailrow"><span>開催日数</span><strong>${ev.duration} 日</strong></div><div class="detailrow"><span>開催周期</span><strong>${ev.manual?'単発':esc(ev.frequency)}</strong></div>${ev.notes?`<div class="detailrow"><span>備考・段階</span><strong>${esc(ev.notes)}</strong></div>`:''}<div class="fine">※終了は最終日の翌日00:00（UTC）です。</div>`;document.getElementById('detailDlg').classList.add('show')}
function close(id){document.getElementById(id).classList.remove('show')}
document.getElementById('sortMode').onchange=e=>{sortMode=e.target.value;if(view==='week')weekSortMode=sortMode;else monthSortMode=sortMode;render()};document.getElementById('editOrder').onclick=()=>{renderOrderList();document.getElementById('orderDlg').classList.add('show')};document.getElementById('closeOrder').onclick=()=>close('orderDlg');document.getElementById('doneOrder').onclick=()=>close('orderDlg');document.getElementById('resetOrder').onclick=()=>{customOrder=[...DEFAULT_ORDER];saveOrder();renderOrderList();render()};document.getElementById('prev').onclick=()=>move(-1);document.getElementById('next').onclick=()=>move(1);document.getElementById('today').onclick=()=>{reset();render()};document.getElementById('weekly').onclick=()=>{view='week';sortMode=weekSortMode;reset();render()};document.getElementById('monthly').onclick=()=>{view='month';sortMode=monthSortMode;reset();render()};document.getElementById('closeDetail').onclick=()=>close('detailDlg');document.getElementById('doneDetail').onclick=()=>close('detailDlg');['detailDlg','orderDlg'].forEach(id=>document.getElementById(id).addEventListener('click',e=>{if(e.target.id===id)close(id)}));reset();render();loadSharedEvents();

// Phase 1 notices: dates in UTC, end exclusive, optional https links.
(function(){
 const panel=document.getElementById('noticePanel'),list=document.getElementById('noticeList'),toggle=document.getElementById('noticeExpand');
 const priority={important:0,warning:1,info:2};
 const labels={important:'重要',warning:'注意',info:'案内'};
 // 同じ重要度の自動通知は events.json の共通 defaultOrder に従う。
 // 手動通知は従来どおり別枠で先に表示する。
 const noticeOrderRank=name=>{const i=DEFAULT_ORDER.indexOf(name);return i<0?Number.MAX_SAFE_INTEGER:i};
 const compareNotices=(a,b)=>{
  const sourceDifference=(a.source==='manual'?0:1)-(b.source==='manual'?0:1);
  if(sourceDifference)return sourceDifference;
  const levelDifference=priority[a.level]-priority[b.level];
  if(levelDifference)return levelDifference;
  if(a.source==='auto'&&b.source==='auto'){
   const rankDifference=noticeOrderRank(a.event)-noticeOrderRank(b.event);
   if(rankDifference)return rankDifference;
  }
  return Date.parse(b.start)-Date.parse(a.start)||String(a.id).localeCompare(String(b.id),'ja');
 };
 let entries=[],autoEntries=[],expanded=false;
 function isValid(item){
  if(!item||typeof item!=='object'||!Object.hasOwn(priority,item.level)||typeof item.title!=='string'||!item.title.trim()||typeof item.message!=='string')return false;
  if(typeof item.start!=='string'||typeof item.end!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(item.start)||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(item.end))return false;
  const a=Date.parse(item.start),b=Date.parse(item.end);
  return Number.isFinite(a)&&Number.isFinite(b)&&new Date(a).toISOString().replace('.000Z','Z')===item.start&&new Date(b).toISOString().replace('.000Z','Z')===item.end&&a<b;
 }
 // Copy eligibility is intentionally different from the on-screen notices:
 // automatic info is excluded, all valid manual levels are included.
 const noticeCopyDialog=document.getElementById('noticeCopyDlg');
 const noticeCopyText=document.getElementById('noticeCopyText');
 const noticeCopyCount=document.getElementById('noticeCopyCount');
 const noticeCopyMessage=document.getElementById('noticeCopyMessage');
 const copyTodayButton=document.getElementById('copyTodayOpen');
 const copyWeekButton=document.getElementById('copyWeekOpen');
 let copyReturnFocus=null;
 const weekDays=['日','月','火','水','木','金','土'];
 const copyDate=t=>{const d=new Date(t);return `${d.getUTCMonth()+1}/${d.getUTCDate()}（${weekDays[d.getUTCDay()]}）`};
 const eligible=n=>n.source==='manual'||n.level==='important'||n.level==='warning';
 function copyForDay(day,now){
  const start=Math.max(day,now),end=day+dayMS;
  const manual=entries.filter(n=>Date.parse(n.start)<end&&Date.parse(n.end)>start).map(n=>({...n,source:'manual'}));
  const auto=buildAutoNotices(day);
  return [...manual,...auto].filter(eligible).sort(compareNotices);
 }
 function makeCopyText(which){
  const now=Date.now(),day=fullUtcDay(now);
  const until=which==='today'?day:day+((7-new Date(day).getUTCDay())%7)*dayMS;
  const all=[];
  for(let d=day;d<=until;d+=dayMS){
   const notices=copyForDay(d,now);
   for(const n of notices){
    // Consecutive identical messages become a date range; unrelated or deadline notices remain separate.
    const key=JSON.stringify([n.source,n.source==='auto'?n.event:n.id,n.level,n.title,n.message]);
    const previous=all.find(x=>x.key===key&&x.end===d-dayMS);
    if(previous&&which==='week')previous.end=d;
    else all.push({key,start:d,end:d,notice:n});
   }
  }
  const prefix=which==='today'?'【本日のお知らせ（UTC）】':'【今週のお知らせ（UTC）】';
  if(!all.length)return {text:'',count:0,from:day,to:until};
  all.sort((a,b)=>a.start-b.start||compareNotices(a.notice,b.notice));
  const chunks=[prefix];
  let heading='';
  for(const item of all){
   const d=item.start===item.end?copyDate(item.start):copyDate(item.start)+'〜'+copyDate(item.end);
   // Group notices under one heading per date; preserve the exact title and body.
   if(d!==heading){chunks.push(`■ ${d}`);heading=d;}
   const lines=[`【${labels[item.notice.level]}】${item.notice.title}`];
   if(item.notice.message.trim())lines.push(item.notice.message.trim());
   chunks.push(lines.join('\n'));
  }
  return {text:chunks.join('\n\n').replace(/(■ [^\n]+)\n\n(?=【)/g,'$1\n'),count:all.length,from:day,to:until};
 }
 const COPY_LIMIT=500;
 function syncCopyCount(){
  const count=Array.from(noticeCopyText.value).length;
  const remaining=COPY_LIMIT-count;
  noticeCopyCount.textContent=`${count} / ${COPY_LIMIT}文字（${remaining>=0?'残り'+remaining:'超過'+(-remaining)}文字）`;
  noticeCopyCount.dataset.state=count>COPY_LIMIT?'over':count>=450?'near':'normal';
  document.getElementById('noticeCopyDo').disabled=!noticeCopyText.value.trim()||count>COPY_LIMIT;
  const bar=document.getElementById('noticeCopyMeterBar');
  if(bar){bar.style.width=Math.min(100,count/COPY_LIMIT*100)+'%';bar.dataset.state=noticeCopyCount.dataset.state;}
  if(count>COPY_LIMIT){noticeCopyMessage.textContent=`500文字を${count-COPY_LIMIT}文字超えています。チェックを外すか文章を短くしてください。`;noticeCopyMessage.dataset.error='true';}
  else if(noticeCopyMessage.dataset.error==='true'&&noticeCopyMessage.textContent.startsWith('500文字を')){noticeCopyMessage.textContent='文章を確認・編集してコピーしてください。';noticeCopyMessage.dataset.error='false';}
 }
 // Week editor is intentionally ephemeral: nothing is stored or written back to JSON.
 const weeklyEditor=document.getElementById('weeklyEditor');
 const weeklyEditorList=document.getElementById('weeklyEditorList');
 const weeklySelectedCount=document.getElementById('weeklySelectedCount');
 const weeklyEditorSummary=document.getElementById('weeklyEditorSummary');
 let weeklyCandidates=[],weekDraftEdited=false;
 // The weekly editor has its own concise wording; the daily notice text is unchanged.
 function shortTitleForWeek(n){
  let title=n.title.trim().replace(/^本日は(?:、)?/,'').replace(/^本日から/,'').replace(/^今日は/,'').trim();
  // Deadlines stay explicit, while generic warning phrases and duplicate 'final-day' prose are removed.
  title=title.replace(/の最終日・報酬受取期限日です[！!。]?$/, '：報酬受取期限');
  title=title.replace(/の最終日・報酬受け取り期限日です[！!。]?$/, '：報酬受取期限');
  title=title.replace(/の報酬交換は本日まで[！!。]?$/, '：報酬交換期限');
  title=title.replace(/の交換期限は本日まで[！!。]?$/, '：交換期限');
  title=title.replace(/の最終日です[！!。]?$/, '：最終日');
  title=title.replace(/の登録日です[！!。]?$/, '：登録日');
  title=title.replace(/の戦闘日です[！!。]?$/, '：戦闘日');
  title=title.replace(/の開催日です[！!。]?$/, '：開催日');
  title=title.replace(/が始まります[！!。]?$/, '開始');
  title=title.replace(/の戦闘が始まります[！!。]?$/, '：戦闘開始');
  title=title.replace(/最終日、報酬受け取り漏れにご注意を[！!。]?$/, '最終日（報酬受取注意）');
  return title;
 }
 // Blue automatic notices are possible weekly candidates only for registration/opening information.
 function isWeekStartInfo(n){
  return n.source==='auto'&&n.level==='info'&&/(始まり|始まります|開催日|開催されます|開始|登録日)/.test(n.title)
   && !/(トップ司令官：|オールスター期間)/.test(n.title);
 }
 function hasRegistrationDay(eventName){
  const rule=autoRules&&autoRules[eventName];
  return !!(rule&&Array.isArray(rule.notifications)&&rule.notifications.some(n=>typeof n.title==='string'&&/登録日/.test(n.title)));
 }
 function selectedByDefault(n){
  if(n.source==='manual'||n.level==='important')return true;
  // Ordinary final-day reminders remain optional; actual reward/exchange deadlines stay selected.
  if(/最終日/.test(n.title)&&!/(交換|報酬|受取|受け取り|期限)/.test(n.title))return false;
  if(n.level==='info'){
   if(/登録日/.test(n.title))return true;
   if(/(?:始まり|始まります|開催日|開催されます|開始)/.test(n.title))return !hasRegistrationDay(n.event);
   return false;
  }
  return true;
 }
 function shortMessageForWeek(n){
  if(n.source==='manual')return n.message.trim();
  // Keep only specific advice, not repeated generic final-day/reward reminders.
  if(/報酬が良い|チームは組んで/.test(n.message))return n.message.trim();
  return '';
 }
 function weekCandidates(){
  const now=Date.now(),day=fullUtcDay(now);
  const until=day+((7-new Date(day).getUTCDay())%7)*dayMS;
  const output=[];
  for(let d=day;d<=until;d+=dayMS){
   const start=Math.max(d,now),end=d+dayMS;
   const manual=entries.filter(n=>Date.parse(n.start)<end&&Date.parse(n.end)>start).map(n=>({...n,source:'manual'}));
   const auto=buildAutoNotices(d);
   for(const n of [...manual,...auto].filter(n=>eligible(n)||isWeekStartInfo(n)).sort(compareNotices)){
    const identity=n.source==='manual'?n.id:n.event;
    const key=JSON.stringify([d,n.source,identity,n.title]);
    const title=shortTitleForWeek(n);
    const message=shortMessageForWeek(n);
    output.push({key,day:d,notice:n,selected:selectedByDefault(n),defaultSelected:selectedByDefault(n),title,message});
   }
  }
  return output;
 }
 function weeklyText(){
  const chosen=weeklyCandidates.filter(n=>n.selected);
  if(!chosen.length)return '';
  const rows=['【今週のお知らせ（UTC）】'];
  let day=null;
  for(const c of chosen){
   if(day!==c.day){rows.push('',`■ ${copyDate(c.day)}`);day=c.day;}
   rows.push(`【${labels[c.notice.level]}】${c.title}`);
   if(c.message.trim())rows.push(c.message.trim());
  }
  return rows.join('\n');
 }
 function updateWeekDraft(ask=true){
  if(ask&&weekDraftEdited&&!confirm('文章欄に直接加えた変更を、選択内容から再生成して置き換えますか？'))return false;
  noticeCopyText.value=weeklyText();
  weekDraftEdited=false;
  const count=weeklyCandidates.filter(x=>x.selected).length;
  weeklySelectedCount.textContent=count+'件選択';
  weeklyEditorSummary.textContent=`候補 ${weeklyCandidates.length} 件／選択 ${count} 件。最終確認で文章を自由に編集できます。`;
  noticeCopyMessage.textContent=count?'内容を選び、文章を確認・編集してコピーしてください。':'選択中のお知らせはありません。';
  noticeCopyMessage.dataset.error='false';
  syncCopyCount();
  return true;
 }
 function renderWeekEditor(){
  weeklyEditorList.replaceChildren();
  let lastDay=null;
  for(const candidate of weeklyCandidates){
   if(candidate.day!==lastDay){
    const date=document.createElement('div');date.className='weekly-editor-date';date.textContent='■ '+copyDate(candidate.day);weeklyEditorList.append(date);lastDay=candidate.day;
   }
   const item=document.createElement('div');item.className='weekly-editor-item';item.dataset.level=candidate.notice.level;
   const row=document.createElement('div');row.className='weekly-editor-row';
   const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.className='weekly-editor-checkbox';checkbox.checked=candidate.selected;checkbox.setAttribute('aria-label',candidate.title+'をコピー対象にする');
   const summary=document.createElement('div');summary.className='weekly-editor-summary';
   const tag=document.createElement('span');tag.className='weekly-level';tag.textContent=labels[candidate.notice.level];
   const headline=document.createElement('span');headline.textContent=candidate.title;
   summary.append(tag,headline);
   row.append(checkbox,summary);item.append(row);
   checkbox.addEventListener('change',()=>{
    const old=candidate.selected;candidate.selected=checkbox.checked;
    if(!updateWeekDraft()){candidate.selected=old;checkbox.checked=old;return}
    summary.style.opacity=candidate.selected?'':'.57';
   });
   const details=document.createElement('details');details.className='weekly-editor-edit';
   const toggle=document.createElement('summary');toggle.textContent='文章を調整';details.append(toggle);
   const titleLabel=document.createElement('label');titleLabel.textContent='タイトル（週間コピー用）';
   const titleInput=document.createElement('input');titleInput.type='text';titleInput.value=candidate.title;
   const msgLabel=document.createElement('label');msgLabel.textContent='補足文（空欄でもOK）';
   const msgInput=document.createElement('textarea');msgInput.value=candidate.message;
   details.append(titleLabel,titleInput,msgLabel,msgInput);
   const changeField=(field,value)=>{
    const old=candidate[field];candidate[field]=value;
    if(!updateWeekDraft()){candidate[field]=old;return false}
    headline.textContent=candidate.title;
    return true;
   };
   titleInput.addEventListener('change',()=>{if(!changeField('title',titleInput.value))titleInput.value=candidate.title});
   msgInput.addEventListener('change',()=>{if(!changeField('message',msgInput.value))msgInput.value=candidate.message});
   item.append(details);weeklyEditorList.append(item);
  }
 }
 function setWeekChecks(choice){
  if(weekDraftEdited&&!confirm('文章欄の手動変更を破棄して選択内容を更新しますか？'))return;
  for(const candidate of weeklyCandidates)candidate.selected=choice==='all'?true:choice==='none'?false:candidate.defaultSelected;
  renderWeekEditor();updateWeekDraft(false);
 }
 document.getElementById('weeklySelectAll').addEventListener('click',()=>setWeekChecks('all'));
 document.getElementById('weeklySelectNone').addEventListener('click',()=>setWeekChecks('none'));
 document.getElementById('weeklyRestore').addEventListener('click',()=>setWeekChecks('default'));
 function showCopy(which){
  const result=makeCopyText(which);
  copyReturnFocus=document.activeElement;
  document.getElementById('noticeCopyTitle').textContent=which==='today'?'📋 今日のお知らせをコピー':'📅 今週のお知らせを編集・コピー';
  const note=document.getElementById('noticeCopyNote');
  if(which==='week'){
   weeklyCandidates=weekCandidates();weeklyEditor.hidden=false;
   renderWeekEditor();weekDraftEdited=false;updateWeekDraft(false);
   const today=fullUtcDay(Date.now());const until=today+((7-new Date(today).getUTCDay())%7)*dayMS;
   document.getElementById('noticeCopyPeriod').textContent=`対象：${copyDate(today)}〜${copyDate(until)}（UTC）`;
   note.textContent='週間向け：登録日がないイベントの開始・開催情報と重要な期限を優先します。500文字以内でコピーできます。編集はJSONには保存されません。';
  }else{
   weeklyEditor.hidden=true;
   document.getElementById('noticeCopyPeriod').textContent=`対象：${copyDate(result.from)}（UTC）／ ${result.count}件`;
   noticeCopyText.value=result.text;
   note.textContent='自動通知は重要・注意のみ、手動通知は全レベルが対象です。編集内容はJSONに保存されません。';
   noticeCopyMessage.textContent=result.count?'文章を確認・編集してからコピーしてください。':'コピー対象のお知らせはありません。';
   noticeCopyMessage.dataset.error='false';
   syncCopyCount();
  }
  noticeCopyText.placeholder='対象のお知らせはありません。';
  noticeCopyDialog.classList.add('show');noticeCopyDialog.setAttribute('aria-hidden','false');
  document.getElementById('noticeCopyClose').focus();
 }
 function hideCopy(){noticeCopyDialog.classList.remove('show');noticeCopyDialog.setAttribute('aria-hidden','true');copyReturnFocus?.focus?.()}
 copyTodayButton.addEventListener('click',()=>showCopy('today'));
 copyWeekButton.addEventListener('click',()=>showCopy('week'));
 document.getElementById('noticeCopyClose').addEventListener('click',hideCopy);
 document.getElementById('noticeCopyCancel').addEventListener('click',hideCopy);
 noticeCopyDialog.addEventListener('click',e=>{if(e.target===noticeCopyDialog)hideCopy()});
 document.addEventListener('keydown',e=>{
  if(!noticeCopyDialog.classList.contains('show'))return;
  if(e.key==='Escape'){e.preventDefault();hideCopy();return}
  if(e.key==='Tab'){
   const targets=[...noticeCopyDialog.querySelectorAll('button:not([disabled]),textarea:not([disabled])')];
   if(!targets.length)return;
   if(e.shiftKey&&document.activeElement===targets[0]){e.preventDefault();targets[targets.length-1].focus()}
   else if(!e.shiftKey&&document.activeElement===targets[targets.length-1]){e.preventDefault();targets[0].focus()}
  }
 });
 noticeCopyText.addEventListener('input',()=>{if(!weeklyEditor.hidden)weekDraftEdited=true;noticeCopyMessage.textContent='編集した文章をコピーできます。';noticeCopyMessage.dataset.error='false';syncCopyCount()});
 document.getElementById('noticeCopyDo').addEventListener('click',async()=>{
  const text=noticeCopyText.value;
  if(!text.trim()||Array.from(text).length>COPY_LIMIT)return;
  let success=false;
  try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);success=true}}catch(_){/* fallback */}
  if(!success){
   noticeCopyText.focus();noticeCopyText.select();
   try{success=document.execCommand('copy')}catch(_){success=false}
   noticeCopyText.setSelectionRange(0,0);
  }
  noticeCopyMessage.textContent=success?'コピーしました！ゲーム内の同盟通知に貼り付けてください。':'自動コピーできませんでした。文章を選択して Ctrl+C でコピーしてください。';
  noticeCopyMessage.dataset.error=String(!success);
 });
 function draw(){
  const now=Date.now();
  const visible=[...entries.filter(n=>Date.parse(n.start)<=now&&now<Date.parse(n.end)).map(n=>({...n,source:'manual'})),...autoEntries]
   .sort(compareNotices);
  const today=fullUtcDay(now);
  const until=today+((7-new Date(today).getUTCDay())%7)*dayMS;
  let futureAvailable=false;
  for(let day=today;day<=until;day+=dayMS){if(copyForDay(day,now).length||buildAutoNotices(day).some(isWeekStartInfo)){futureAvailable=true;break}}
  panel.hidden=visible.length===0&&!futureAvailable;
  list.replaceChildren();
  visible.slice(0,expanded?undefined:3).forEach(n=>{
   const row=document.createElement('article');row.className='notice-entry';row.dataset.level=n.level;
   const mark=document.createElement('div');mark.className='notice-mark';mark.setAttribute('aria-hidden','true');
   const content=document.createElement('div');content.className='notice-entry-content';
   const heading=document.createElement('div');heading.className='notice-entry-title';
   const label=document.createElement('span');label.className='notice-entry-label';label.textContent=labels[n.level];
   heading.append(label,document.createTextNode(n.title));content.append(heading);
   if(n.message){const msg=document.createElement('p');msg.className='notice-entry-message';msg.textContent=n.message;content.append(msg)}
   if(typeof n.url==='string'&&/^https:\/\/[^\s]+$/i.test(n.url)){
    try{const u=new URL(n.url);if(u.protocol==='https:'){const link=document.createElement('a');link.className='notice-entry-link';link.href=u.href;link.target='_blank';link.rel='noopener noreferrer';link.textContent='関連ページを開く ↗';content.append(link)}}catch(e){}
   }
   row.append(mark,content);list.append(row);
  });
  toggle.hidden=visible.length<=3;
  toggle.textContent=expanded?'閉じる':`すべてのお知らせを見る（全${visible.length}件）`;
  toggle.setAttribute('aria-expanded',String(expanded));
 }
 toggle.addEventListener('click',()=>{expanded=!expanded;draw()});
 async function load(){
  try{
   const response=await fetch('./notices.json',{cache:'no-store'});
   if(!response.ok)throw new Error('HTTP '+response.status);
   const data=await response.json();
   if(!data||!Array.isArray(data.notices))throw new Error('Invalid notices format');
   entries=data.notices.filter(isValid).map(n=>({...n,id:typeof n.id==='string'?n.id:''}));
   draw();
  }catch(error){entries=[];draw();console.warn('notices.json を読み込めません:',error)}
 }
 // 自動通知: events.json の定期開催情報と event_notice_rules.json を参照する。
 // 手動お知らせは既存の notices.json から別途読み込み、常に手動分を先に並べる。
 let autoRules=null;
 const fullUtcDay=t=>Math.floor(t/dayMS)*dayMS;
 function activeEventOnDate(event,utcDay){
  const base=dateUTC(event.anchor),step=event.everyDays*dayMS;
  const cycle=Math.floor((utcDay-base)/step);
  for(const index of [cycle-1,cycle,cycle+1]){
   const start=base+index*step;
   if(start<=utcDay&&utcDay<start+event.duration*dayMS)return true;
  }
  return false;
 }
 function buildAutoNotices(today=fullUtcDay(Date.now())){
  if(!autoRules)return [];
  const result=[];
  for(const ev of PRESET){
   const rule=autoRules[ev.name];
   if(!rule||!Number.isInteger(ev.everyDays)||ev.everyDays<1)continue;
   const base=dateUTC(ev.anchor),step=ev.everyDays*dayMS;
   const cycle=Math.floor((today-base)/step);
   for(const k of [cycle-1,cycle,cycle+1]){
    const start=base+k*step,dayIndex=(today-start)/dayMS;
    let chosen=null;
    for(const n of (rule.notifications||[])){
     const offset=n.day==='last'?ev.duration-1:n.day==='after'?ev.duration:n.day;
     if(offset===dayIndex) {chosen=n;break;}
    }
    if(!chosen&&rule.activeEveryDay&&dayIndex>=0&&dayIndex<ev.duration){
     const c=rule.activeEveryDay,partner=PRESET.find(x=>x.name===c.requiresOverlap);
     if(partner&&activeEventOnDate(partner,today))chosen=c;
    }
    if(chosen){
     const end=today+dayMS;
     result.push({id:'auto-'+ev.name+'-'+iso(start)+'-'+iso(today),source:'auto',event:ev.name,level:chosen.level,title:chosen.title,message:chosen.message||'',start:new Date(today).toISOString().replace('.000Z','Z'),end:new Date(end).toISOString().replace('.000Z','Z'),url:''});
     break; // 1イベント・UTC 1日につき最大1件
    }
   }
  }
  return result;
 }
 window.refreshAutoNotices=()=>{autoEntries=buildAutoNotices();draw()};
 async function loadAutoRules(){
  if(location.protocol==='file:')return;
  try{
   const response=await fetch('./event_notice_rules.json',{cache:'no-store'});
   if(!response.ok)throw new Error('HTTP '+response.status);
   const payload=await response.json();
   if(!payload||!payload.rules||typeof payload.rules!=='object'||Array.isArray(payload.rules))throw new Error('通知ルールの形式が不正です');
   autoRules=payload.rules;
   window.refreshAutoNotices();
  }catch(error){console.warn('event_notice_rules.json を読み込めません:',error)}
 }
 loadAutoRules();
 load();setInterval(()=>{if(autoRules)autoEntries=buildAutoNotices();draw()},60000);
})();
