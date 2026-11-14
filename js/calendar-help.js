/* Beginner help dialog; intentionally isolated from event rendering and settings. */
(function(){'use strict';
 function init(){
  const dlg=document.getElementById('helpDlg');
  const open=document.getElementById('helpOpen');
  const close=document.getElementById('helpClose');
  const done=document.getElementById('helpDone');
  if(!dlg||!open||!close||!done)return;
  let focusBefore=null;
  function show(){focusBefore=document.activeElement;dlg.classList.add('show');dlg.setAttribute('aria-hidden','false');close.focus();}
  function hide(){dlg.classList.remove('show');dlg.setAttribute('aria-hidden','true');if(focusBefore&&document.contains(focusBefore))focusBefore.focus();}
  open.addEventListener('click',show);
  close.addEventListener('click',hide);
  done.addEventListener('click',hide);
  dlg.addEventListener('click',e=>{if(e.target===dlg)hide();});
  dlg.addEventListener('keydown',e=>{
   if(e.key==='Escape'){e.preventDefault();hide();return;}
   if(e.key!=='Tab')return;
   const items=[...dlg.querySelectorAll('button:not([disabled])')];
   const first=items[0],last=items[items.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
