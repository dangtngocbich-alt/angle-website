function initScenes(){
 const rail=$('#scene-rail');if(!rail)return;
 requestAnimationFrame(()=>{rail.scrollLeft=matchMedia('(max-width:760px)').matches?0:Math.max(0,(rail.scrollWidth-rail.clientWidth)/2)});
 let start=0,scroll=0,dragging=false,moved=false;
 rail.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;start=e.clientX;scroll=rail.scrollLeft;dragging=true;moved=false;});
 rail.addEventListener('pointermove',e=>{if(!dragging)return;let delta=e.clientX-start;if(Math.abs(delta)>6){moved=true;rail.classList.add('dragging');rail.scrollLeft=scroll-delta;}});
 rail.addEventListener('pointerup',()=>{dragging=false;rail.classList.remove('dragging');});
 rail.addEventListener('pointercancel',()=>{dragging=false;rail.classList.remove('dragging');});
 rail.addEventListener('pointerleave',()=>{dragging=false;rail.classList.remove('dragging');});
 rail.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);
}
