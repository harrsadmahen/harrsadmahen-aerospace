
document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".main-nav");
if(menu&&nav){menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.textContent=open?"×":"☰";});}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
const plane=document.querySelector(".cursor-plane"),trail=document.querySelector(".cursor-trail");
if(plane&&window.matchMedia("(pointer:fine)").matches&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
 let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y,px=x,py=y;
 window.addEventListener("mousemove",e=>{tx=e.clientX;ty=e.clientY;});
 function animate(){
   x+=(tx-x)*.24;y+=(ty-y)*.24;
   const dx=x-px,dy=y-py,angle=Math.atan2(dy,dx)*180/Math.PI+90;
   plane.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%) rotate(${angle}deg)`;
   trail.style.transform=`translate(${x-10}px,${y+10}px) translate(-50%,-50%)`;
   px=x;py=y;requestAnimationFrame(animate);
 }
 animate();
 document.querySelectorAll("a,button,select,input,textarea").forEach(el=>{
   el.addEventListener("mouseenter",()=>plane.classList.add("is-hover"));
   el.addEventListener("mouseleave",()=>plane.classList.remove("is-hover"));
 });
}
const params=new URLSearchParams(location.search);
const subject=params.get("subject"),select=document.querySelector("#subject-select");
if(subject&&select){for(const opt of select.options){if(opt.text===subject){opt.selected=true;break;}}}
if(params.get("sent")==="1"){const msg=document.querySelector("#sent-message");if(msg)msg.hidden=false;}


// Home flight pad: steer the aircraft around the radar display with pointer or arrow keys.
const flightPad=document.querySelector(".hero-visual");
const flightPlane=document.querySelector("#flight-plane");
const flightStatus=document.querySelector("#flight-status");
if(flightPad&&flightPlane){
  let targetX=50,targetY=48,currentX=50,currentY=48,heading=-28,frame;
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
  const steer=(clientX,clientY)=>{
    const r=flightPad.getBoundingClientRect();
    targetX=clamp(((clientX-r.left)/r.width)*100,13,87);
    targetY=clamp(((clientY-r.top)/r.height)*100,20,78);
    flightPad.classList.add("is-steering");
    if(flightStatus)flightStatus.textContent="AIRCRAFT RESPONDING · STEER";
  };
  const animateFlight=()=>{
    currentX+=(targetX-currentX)*.12;currentY+=(targetY-currentY)*.12;
    const dx=targetX-currentX,dy=targetY-currentY;
    if(Math.abs(dx)+Math.abs(dy)>.02)heading=Math.atan2(dy,dx)*180/Math.PI+90;
    flightPlane.style.left=currentX+"%";flightPlane.style.top=currentY+"%";
    flightPlane.style.transform=`translate(-50%,-50%) rotate(${heading}deg)`;
    frame=requestAnimationFrame(animateFlight);
  };
  flightPad.addEventListener("pointermove",e=>steer(e.clientX,e.clientY));
  flightPad.addEventListener("pointerleave",()=>{targetX=50;targetY=48;flightPad.classList.remove("is-steering");if(flightStatus)flightStatus.textContent="STANDBY · MOVE TO STEER";});
  flightPad.addEventListener("keydown",e=>{
    const step=4;let used=true;
    if(e.key==="ArrowLeft")targetX-=step;else if(e.key==="ArrowRight")targetX+=step;else if(e.key==="ArrowUp")targetY-=step;else if(e.key==="ArrowDown")targetY+=step;else used=false;
    if(used){e.preventDefault();targetX=clamp(targetX,13,87);targetY=clamp(targetY,20,78);flightPad.classList.add("is-steering");if(flightStatus)flightStatus.textContent="KEYBOARD CONTROL · STEER";}
  });
  if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)frame=requestAnimationFrame(animateFlight);
  else{flightPlane.style.left="50%";flightPlane.style.top="48%";}
}
