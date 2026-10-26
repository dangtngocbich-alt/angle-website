let toastTimer;function toast(s){clearTimeout(toastTimer);$('.toast').textContent=s;$('.toast').classList.add('show');toastTimer=setTimeout(()=>$('.toast').classList.remove('show'),3500);}
