// Smooth single-page scrolling and nav active
document.querySelectorAll('[data-scroll]').forEach(el=>{
  el.addEventListener('click', e=>{
    e.preventDefault();
    const targetId = el.getAttribute('data-scroll');
    const target = document.getElementById(targetId);
    if(!target) return;
    // smooth scroll to the section, offset for header
    const headerOffset = 70;
    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetPos = rect.top + scrollTop - headerOffset;
    window.scrollTo({top: targetPos, behavior:'smooth'});
    // update active link
    document.querySelectorAll('.navlinks a').forEach(a=>a.classList.remove('active'));
    document.querySelectorAll('.navlinks a').forEach(a=>{
      if (a.getAttribute('data-scroll') === targetId) a.classList.add('active');
    });
  });
});

// When scroll, highlight current section in navbar
const sections = document.querySelectorAll('main section');
window.addEventListener('scroll', ()=>{
  const headerOffset = 80;
  let current = 'home';
  sections.forEach(sec=>{
    const top = sec.offsetTop - headerOffset;
    if(window.scrollY >= top) current = sec.id;
  });
  document.querySelectorAll('.navlinks a').forEach(a=>{
    a.classList.toggle('active', a.getAttribute('data-scroll') === current);
  });
});

// Project filter buttons
const filters = document.querySelectorAll('.filter');
const projectGrid = document.getElementById('project-grid');
const techGrid = document.getElementById('tech-grid');

filters.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filters.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.getAttribute('data-filter');
    if(f === 'tech'){
      projectGrid.style.display = 'none';
      techGrid.hidden = false;
    } else {
      projectGrid.style.display = '';
      techGrid.hidden = true;
      // show/hide cards by type
      document.querySelectorAll('.project-card').forEach(card=>{
        if(f === 'project') card.style.display = card.dataset.type === 'project' ? '' : 'none';
        else if(f === 'certificate') card.style.display = card.dataset.type === 'certificate' ? '' : 'none';
        else card.style.display = '';
      });
    }
  });
});

// Modal logic for project details
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.querySelector('.modal-close');
const modalBack = document.getElementById('modal-back');

function openModalFromCard(card){
  const title = card.dataset.title || 'Project';
  const image = card.dataset.image || '';
  modalTitle.textContent = title;
  modalImg.src = image;
  modalDesc.textContent = `A full-featured ${title}. Deskripsi singkat: responsive, modern UI. Teknologi: HTML, CSS, JS, PHP (example).`;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.open-detail').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const card = e.target.closest('.project-card');
    if(card) openModalFromCard(card);
  });
});
modalClose.addEventListener('click', ()=>closeModal());
modalBack.addEventListener('click', ()=>closeModal());
modal.querySelector('.modal-backdrop').addEventListener('click', ()=>closeModal());

function closeModal(){
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// contact form (dummy)
document.getElementById('contact-form').addEventListener('submit', e=>{
  e.preventDefault();
  alert('Pesan terkirim! (demo)');
  e.target.reset();
});

// small: animate shapes randomly for more organic motion
const shapes = document.querySelectorAll('.shape');
shapes.forEach((s,i)=>{
  const duration = 6 + Math.random()*6;
  s.style.animationDuration = duration + 's';
  s.style.left = (5 + i*18 + Math.random()*20) + '%';
  s.style.top = (5 + i*13 + Math.random()*20) + '%';
});
