function sceneCard(i){return `<button class="scene-card" data-category="${i}" aria-label="${T('Explore','Khám phá')} ${sceneNames[i]}"><img class="scene-photo" src="${scenePhotos[i]}" alt="${sceneNames[i]} — Angle" width="380" height="400" draggable="false"><h3>${T(sceneNames[i],sceneVi[i])}</h3><span class="arrow"><img src="assets/arrow.svg" width="20" height="20" alt=""></span></button>`}

function trialCard() {
  return `<button class="scene-card trial-card" data-trial aria-label="${T('Try with Angle','Thử chụp cùng Angle')}"><img class="scene-photo" src="assets/trial.png" alt="Trial — Angle" width="380" height="400" draggable="false"><h3>Trial</h3><span class="arrow"><img src="assets/arrow.svg" width="20" height="20" alt=""></span></button>`;
}
