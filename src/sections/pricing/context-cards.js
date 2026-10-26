function pricingCardsSection() {
  return `<div class="price-cards">${sceneNames.map((s,i)=>`<article class="price-card"><div class="art"><img class="scene-photo" src="${scenePhotos[i]}" width="380" height="400" alt="${T(s,sceneVi[i])}"></div><div class="price-copy"><h3>${T(s,sceneVi[i])}</h3><p>${T(...descriptions[i])}</p><button class="btn secondary" data-category="${i}">${T('Try this scene ↗','Thử bối cảnh ↗')}</button></div></article>`).join('')}</div>`;
}
