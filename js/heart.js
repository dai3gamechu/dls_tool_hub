/* Easter egg for the TOP page only. No persistence, no changes to shared header.js or stored theme. */
(function(){
 'use strict';
 const sky=document.createElement('div');
 sky.className='dls-heart-sky';sky.setAttribute('aria-hidden','true');
 document.body.appendChild(sky);
 const shapes=['♥','♡','♥','♥','♡'];
 // Static, evenly spread coordinates with subtle varied motion. All decoration is behind the content.
 const positions=[
  [-5,5,250],[89,6,225],[-6,52,210],[86,59,260],
  [5,24,43],[94,29,45],[8,76,39],[91,84,44],
  [19,5,28],[76,10,30],[15,92,28],[82,91,29],
  [27,3,23],[68,5,24],[32,96,24],[66,95,24],
  [2,44,30],[96,47,32],[11,38,24],[89,74,25],
  [48,2,21],[50,96,22],[-2,86,120],[94,92,135]
 ];
 positions.forEach(([x,y,size],i)=>{
  const heart=document.createElement('span');heart.className='dls-heart'+(size>=100?' dls-heart-giant':'');heart.textContent=shapes[i%shapes.length];
  heart.style.setProperty('--heart-x',x+'%');heart.style.setProperty('--heart-y',y+'%');
  heart.style.setProperty('--heart-size',size>=100?'clamp(115px, '+(size/14).toFixed(2)+'vw, '+size+'px)':size+'px');
  heart.style.setProperty('--heart-color',i%3===0?'#d85b94':i%3===1?'#eda0c1':'#c94a83');
  heart.style.setProperty('--heart-opacity',String(size>=100?.16+(i%3)*.055:.34+(i%4)*.10));
  heart.style.setProperty('--heart-duration',(size>=100?10+i%4*2:5+i%5)+'s');
  heart.style.setProperty('--heart-delay',(-i*.29)+'s');sky.appendChild(heart);
 });
 let clicks=0,firstClick=0;
 const timeframe=3000;
 function burst(x,y){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const fx=document.createElement('div');fx.className='dls-heart-burst';fx.setAttribute('aria-hidden','true');
  for(let i=0;i<12;i++){
   const heart=document.createElement('span');heart.textContent=i%3?'♥':'♡';
   const angle=i*Math.PI/6;const distance=55+(i%3)*22;
   heart.style.setProperty('--burst-x',x+'px');heart.style.setProperty('--burst-y',y+'px');
   heart.style.setProperty('--burst-size',(15+i%4*4)+'px');
   heart.style.setProperty('--dx',Math.round(Math.cos(angle)*distance)+'px');
   heart.style.setProperty('--dy',Math.round(Math.sin(angle)*distance)+'px');
   fx.appendChild(heart);
  }
  document.body.appendChild(fx);
  fx.addEventListener('animationend',()=>fx.remove(),{once:true});
  // Fallback cleanup in case an animation is cancelled.
  window.setTimeout(()=>fx.remove(),1100);
 }
 function onLogoClick(event){
  if(document.body.dataset.sykMode==='on')return;
  // The brand links to this same TOP page; prevent navigation so the sequence can be detected.
  event.preventDefault();
  const now=performance.now();
  if(!firstClick||now-firstClick>timeframe){firstClick=now;clicks=0;}
  clicks++;
  if(clicks!==5)return;
  clicks=0;firstClick=0;
  const enabled=document.body.dataset.heartMode!=='on';
  if(enabled){document.body.dataset.heartMode='on';const rect=event.currentTarget.getBoundingClientRect();burst(rect.left+rect.width/2,rect.top+rect.height/2);}
  else delete document.body.dataset.heartMode;
 }
 function init(){
  const brand=document.querySelector('#dls-global-header .dls-gh-brand');
  if(!brand)return false;
  brand.addEventListener('click',onLogoClick);
  // Retain keyboard activation of the branding anchor as well.
  return true;
 }
 // shared/header.js is deferred: the DOM exists before it runs, so wait for DOMContentLoaded.
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
 else init();
})();
