function aboutIntroSection(c, tab) {
  return `<section class="page-head wrap"><div class="eyebrow">ANGLE / ${T('ABOUT US','VỀ ANGLE')}</div><h1>${c[0]}</h1><div class="subnav">${['vision','foundation','culture'].map((s,i)=>`<a href="#/about/${s}" class="${s===tab?'active':''}">${T(['Vision','Foundation','Corporate culture'][i],['Tầm nhìn','Nền tảng','Văn hoá'][i])}</a>`).join('')}</div></section>`;
}
