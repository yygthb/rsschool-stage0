(()=>{"use strict";const e=(e,...t)=>{const o=document.createElement(e);return t.forEach((e=>o.classList.add(e))),o},t=e=>{const t=Math.floor(e/60),o=e-60*t;return[`${Math.floor(t/10)}${Math.floor(t%10)}`,`${Math.floor(o/10)}${Math.floor(o%10)}`]},o=document.querySelector("body"),s=document.querySelector(".level-container").querySelector(".level-title"),l=document.querySelector(".game-button__show-results"),r=document.querySelector(".overlay"),c=document.querySelector(".results-list");let n=[];function a(e){e.stopPropagation(),(e.target.classList.contains("overlay")||e.target.closest(".modal-close"))&&(r.classList.remove("open"),document.removeEventListener("click",a),o.classList.remove("lock"))}l.addEventListener("click",(()=>{var l;l=s.dataset.level,n=JSON.parse(localStorage.getItem(`memoryGame_${l}`))||[],function(){o.classList.add("lock"),r.classList.add("open"),document.addEventListener("click",a),c.textContent="";for(let o=1;o<=n.length;o++){const s=e("li","results-item"),[l,r]=t(n[o-1][1]);s.insertAdjacentHTML("afterbegin",`<span>${o}: </span>${n[o-1][0]} clicks (in ${l}m ${r}s)`),c.append(s)}}()}))})();