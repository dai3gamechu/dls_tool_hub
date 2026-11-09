(function(){
  'use strict';
  const modal=document.getElementById('versionDlg');
  const open=document.getElementById('versionOpen');
  const closeBtn=document.getElementById('versionClose');
  const done=document.getElementById('versionDone');
  const history=document.getElementById('versionHistory');
  const badge=document.getElementById('versionText');
  const topOpen=document.getElementById('versionTopOpen');
  const topText=document.getElementById('versionTopText');
  const topDate=document.getElementById('versionTopDate');
  const topNew=document.getElementById('versionTopNew');
  let beforeOpen=null;
  const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n};
  function show(){beforeOpen=document.activeElement;modal.classList.add('show');modal.setAttribute('aria-hidden','false');closeBtn.focus()}
  function hide(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');if(beforeOpen&&beforeOpen.focus)beforeOpen.focus()}
  open.addEventListener('click',show);
  topOpen.addEventListener('click',show);
  closeBtn.addEventListener('click',hide);
  done.addEventListener('click',hide);
  modal.addEventListener('click',e=>{if(e.target===modal)hide()});
  document.addEventListener('keydown',e=>{
    if(!modal.classList.contains('show'))return;
    if(e.key==='Escape'){e.preventDefault();hide();return}
    if(e.key==='Tab'){
      const targets=[...modal.querySelectorAll('button:not([disabled]),a[href]')];
      if(!targets.length)return;
      if(e.shiftKey&&document.activeElement===targets[0]){e.preventDefault();targets[targets.length-1].focus()}
      else if(!e.shiftKey&&document.activeElement===targets[targets.length-1]){e.preventDefault();targets[0].focus()}
    }
  });
  function render(data){
    if(!data||!Array.isArray(data.releases)||typeof data.currentVersion!=='string'||!data.currentVersion.trim())throw new Error('changelog.json の形式が不正です');
    const versions=new Set();
    for(const release of data.releases){
      if(!release||typeof release.version!=='string'||!release.version.trim()||versions.has(release.version)||typeof release.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(release.date)||!Number.isFinite(Date.parse(release.date+'T00:00:00Z'))||new Date(release.date+'T00:00:00Z').toISOString().slice(0,10)!==release.date||typeof release.title!=='string'||!Array.isArray(release.changes)||!release.changes.every(x=>typeof x==='string'))throw new Error('更新履歴に不正な項目があります');
      versions.add(release.version);
    }
    if(!versions.has(data.currentVersion))throw new Error('現在のバージョンが更新履歴にありません');
    badge.textContent='Ver.'+data.currentVersion;
    topText.textContent='Ver.'+data.currentVersion;
    const current=data.releases.find(x=>x.version===data.currentVersion);
    topDate.textContent=current ? current.date.replaceAll('-','/')+' 更新' : '更新日不明';
    const today=new Date().toISOString().slice(0,10);
    const elapsed=current ? Math.round((Date.parse(today+'T00:00:00Z')-Date.parse(current.date+'T00:00:00Z'))/86400000) : -1;
    topNew.hidden=!(elapsed>=0&&elapsed<7);
    history.replaceChildren();
    const releases=[...data.releases].sort((a,b)=>b.date.localeCompare(a.date)||b.version.localeCompare(a.version,undefined,{numeric:true}));
    if(!releases.length){history.append(el('div','更新履歴はまだありません。'));return}
    for(const release of releases){
      const section=el('section');section.className='version-release';
      const top=el('div');top.className='version-release-title';
      const title=el('strong','Ver.'+release.version+(release.version===data.currentVersion?'（現在）':''));
      const date=el('time',release.date+' UTC');date.dateTime=release.date;top.append(title,date);section.append(top);
      section.append(el('h3',release.title));
      if(release.changes.length){const list=el('ul');for(const change of release.changes)list.append(el('li',change));section.append(list)}
      history.append(section);
    }
  }
  async function load(){
    if(location.protocol==='file:'){
      topText.textContent='更新履歴';
      topDate.textContent='GitHub公開後に表示';
      history.textContent='ローカルHTMLでは更新履歴を取得できません。GitHub Pages上で確認してください。';
      return;
    }
    try{
      const response=await fetch('./changelog.json',{cache:'no-store'});
      if(!response.ok)throw new Error('HTTP '+response.status);
      render(await response.json());
    }catch(error){
      topText.textContent='更新履歴';
      topDate.textContent='読み込みできませんでした';
      topNew.hidden=true;
      history.replaceChildren();
      const msg=el('p','更新履歴を読み込めませんでした。changelog.json が公開されているか確認してください。');
      msg.className='version-empty';
      history.append(msg);
      console.warn('更新履歴の読み込みに失敗:',error);
    }
  }
  load();
})();
