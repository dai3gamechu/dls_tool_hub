/* SYKオリジナル: 3-second press, local persistence, six equally weighted voice clips. */
(function(){
 'use strict';
 const KEY='dls-syk-original-v1';
 const holdMillis=3000,cooldownMillis=3000;
 const sounds=['a','b','c','d','e','f'].map(letter=>'./audio/syk-menu-'+letter+'.mp3');
 let timer=null,held=false,heldUntil=0,startingPoint=null,lastPlayed=-Infinity,activeAudio=null,dialog=null;
 const saved=()=>{try{return localStorage.getItem(KEY)==='on'}catch{return false}};
 function store(on){try{if(on)localStorage.setItem(KEY,'on');else localStorage.removeItem(KEY)}catch{}}
 function play(kind){
  // Activation and menu select uniformly from the same six sound files.
  // Activation always attempts playback; menu respects the cooldown.
  const now=performance.now();if(kind!=='activate'&&now-lastPlayed<cooldownMillis)return;
  lastPlayed=now; // Activation also starts the cooldown, so menu sounds never cut it off.
  try{if(activeAudio){activeAudio.pause();activeAudio.currentTime=0;}
   const sound=sounds[Math.floor(Math.random()*sounds.length)];
   activeAudio=new Audio(sound);activeAudio.volume=.65;
   const result=activeAudio.play();if(result&&result.catch)result.catch(()=>{});
  }catch(_){/* missing or blocked audio must never affect UI */}
 }
 function setSyk(on,announce){
  if(on){document.body.dataset.sykMode='on';delete document.body.dataset.heartMode;}
  else delete document.body.dataset.sykMode;
  store(on);renderButton();
  if(on&&announce)play('activate');
 }
 function renderButton(){
  const button=document.getElementById('dls-theme-toggle');if(!button)return;
  if(document.body.dataset.sykMode==='on'){
    button.textContent='モード解除';button.title='SYKオリジナルを解除';
    button.setAttribute('aria-label','SYKオリジナルを解除');
  } else {
    // Base-theme appearance belongs to shared/header.js. This script only restores the existing label.
    const light=document.body.dataset.theme==='light';
    button.textContent=light?'☾':'☀';
    button.setAttribute('aria-label',light?'ダークグレーテーマに切り替える':'ライトテーマに切り替える');
    button.title=button.getAttribute('aria-label');
  }
 }
 function closeDialog(){if(!dialog)return;dialog.hidden=true;dialog.querySelector('input').value='';dialog.querySelector('.syk-error').textContent='';dialog.querySelector('input').blur();held=false;heldUntil=0;}
 function openDialog(){
  if(document.body.dataset.sykMode==='on')return;
  if(!dialog){
   dialog=document.createElement('div');dialog.className='syk-unlock-overlay';dialog.hidden=true;
   dialog.innerHTML='<div class="syk-unlock-dialog" role="dialog" aria-modal="true" aria-labelledby="syk-unlock-title"><h2 id="syk-unlock-title">♛ 特別なテーマ</h2><p>特別なテーマへのパスワードを入力してください。</p><form id="syk-unlock-form"><label for="syk-password">パスワード</label><input id="syk-password" type="password" autocomplete="off" spellcheck="false" maxlength="32"><div class="syk-error" role="status"></div><div class="syk-actions"><button type="button" class="syk-cancel">キャンセル</button><button type="submit" class="syk-submit">テーマを解放</button></div></form></div>';
   document.body.appendChild(dialog);
   dialog.querySelector('.syk-cancel').addEventListener('click',closeDialog);
   dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});
   dialog.querySelector('form').addEventListener('submit',e=>{
    e.preventDefault();const value=dialog.querySelector('input').value.trim().toLowerCase();
    if(value!=='saikyou'){dialog.querySelector('.syk-error').textContent='パスワードが違います。';return}
    closeDialog();held=false;heldUntil=0;setSyk(true,true);
   });
   document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.hidden)closeDialog()});
  }
  dialog.hidden=false;dialog.querySelector('input').focus();
 }
 function init(){
  const button=document.getElementById('dls-theme-toggle');if(!button)return;
  // shared/header.js has already registered its normal click listener. Use capture to prevent
  // that listener only on unlock/disable interactions, leaving normal clicks untouched.
  button.addEventListener('click',e=>{
   if(held){const recent=performance.now()<heldUntil;held=false;if(recent){e.preventDefault();e.stopImmediatePropagation();return}}
   if(document.body.dataset.sykMode==='on'){
    e.preventDefault();e.stopImmediatePropagation();setSyk(false,false);return;
   }
  },true);
  const cancel=()=>{if(timer!==null){clearTimeout(timer);timer=null}startingPoint=null};
  button.addEventListener('pointerdown',e=>{
   if(e.button!==0||document.body.dataset.sykMode==='on')return;
   cancel();held=false;startingPoint={x:e.clientX,y:e.clientY};
   timer=setTimeout(()=>{timer=null;held=true;heldUntil=performance.now()+1000;openDialog();},holdMillis);
  });
  button.addEventListener('pointermove',e=>{
   if(startingPoint&&Math.hypot(e.clientX-startingPoint.x,e.clientY-startingPoint.y)>16)cancel();
  });
  button.addEventListener('pointerup',cancel);button.addEventListener('pointercancel',cancel);
  button.addEventListener('pointerleave',cancel);
  button.addEventListener('contextmenu',e=>{if(held||timer!==null)e.preventDefault()});
  // Keyboard accessibility: Space/Enter held for 3s follows the same interaction.
  button.addEventListener('keydown',e=>{
   if((e.key===' '||e.key==='Enter')&&!e.repeat&&document.body.dataset.sykMode!=='on'){
    cancel();held=false;timer=setTimeout(()=>{timer=null;held=true;heldUntil=performance.now()+1000;openDialog()},holdMillis);
   }
  });
  button.addEventListener('keyup',cancel);
  // Menu-open controls only reveal choices: no voice is played here.
  // Voice is reserved for the final navigation link selected by the visitor.
  // Navigation links can leave this document before sound playback finishes.
  // Only plain, same-tab user clicks are delayed; modified clicks and links that
  // explicitly open another tab keep the browser's default behavior.
  let navigating=false;
  const navigateWithVoice=(anchor)=>{
   if(navigating)return;
   const now=performance.now();
   if(now-lastPlayed<cooldownMillis){window.location.assign(anchor.href);return;}
   navigating=true;
   lastPlayed=now;
   let finished=false;
   let timeoutId=null;
   let sound=null;
   const finish=()=>{
    if(finished)return;
    finished=true;
    if(timeoutId!==null)clearTimeout(timeoutId);
    if(sound){sound.removeEventListener('ended',finish);sound.removeEventListener('error',finish);}
    window.location.assign(anchor.href);
   };
   // Never trap a visitor when a sound fails to load/play or is stalled.
   timeoutId=setTimeout(finish,4000);
   try{
    if(activeAudio){activeAudio.pause();activeAudio.currentTime=0;}
    sound=new Audio(sounds[Math.floor(Math.random()*sounds.length)]);
    activeAudio=sound;
    sound.volume=.65;
    sound.addEventListener('ended',finish,{once:true});
    sound.addEventListener('error',finish,{once:true});
    const result=sound.play();
    if(result&&result.catch)result.catch(finish);
   }catch(_){finish();}
  };
  document.querySelectorAll('#dls-global-header a.dls-gh-link, #dls-global-header .dls-gh-drop a, #dls-global-header a.dls-gh-brand').forEach(anchor=>{
   anchor.addEventListener('click',e=>{
    if(document.body.dataset.sykMode!=='on')return;
    if(e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
    if(anchor.hasAttribute('download')||(anchor.target&&anchor.target!=='_self'))return;
    if(!/^https?:$/.test(anchor.protocol))return;
    e.preventDefault();
    if(navigating)return;
    navigateWithVoice(anchor);
   });
  });
  // Apply saved state without audio; no unlock dialog on page load.
  if(saved())setSyk(true,false);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
