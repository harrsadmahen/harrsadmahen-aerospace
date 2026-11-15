
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
