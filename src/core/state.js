
'use strict';
const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
let lang=localStorage.getItem('angle-lang')||'en',theme=localStorage.getItem('angle-theme')||'light';
const T=(en,vi)=>lang==='vi'?vi:en;
const scenePhotos=['assets/coffee.png','assets/dating.png','assets/event.png','assets/travel.png'];
const sceneNames=['Coffee','Dating','Event','Travel'],sceneVi=['Cà phê','Hẹn hò','Sự kiện','Du lịch'];
const descriptions=[['A little pause. A new perspective.','Một khoảng nghỉ. Một góc nhìn mới.'],['Make the moment feel like you.','Lưu khoảnh khắc theo cách của bạn.'],['Keep the energy. Capture the feeling.','Giữ năng lượng. Ghi lại cảm xúc.'],['Find a different angle on the familiar.','Tìm góc nhìn khác trong điều quen thuộc.']];
const services=[['Photography','Nhiếp ảnh','Explore composition, light and a fresh point of view.','Khám phá bố cục, ánh sáng và một góc nhìn mới.'],['Videography','Quay phim','Explore movement and the moments between still frames.','Khám phá chuyển động và những khoảnh khắc giữa các khung hình.'],['Cinematography','Ngôn ngữ điện ảnh','Explore visual storytelling through framing and atmosphere.','Khám phá cách kể chuyện qua khung hình và bầu không khí.'],['Personalization','Cá nhân hoá','Find a visual direction that feels true to you.','Tìm một hướng hình ảnh phù hợp với chính bạn.'],['Creative planning','Lên ý tưởng','Start with a context. Explore a creative possibility.','Bắt đầu từ bối cảnh. Khám phá một khả năng sáng tạo.'],['Secret','Bí mật','There is always another perspective to discover.','Luôn có một góc nhìn khác chờ bạn khám phá.']];

let demoState={stage:0,scene:0,guide:0,compare:1};let renderGeneration=0,scanTimer=null;
