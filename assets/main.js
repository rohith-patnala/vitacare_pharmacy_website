document.addEventListener('DOMContentLoaded',()=>{
 const body=document.body;
 // Persist the selected theme across every page in this site.
 try { if (localStorage.getItem('vitacare-theme') === 'dark') body.classList.add('dark-mode'); else body.classList.remove('dark-mode'); } catch (e) {}
 // Split heading words between the primary and secondary brand colours.
 document.querySelectorAll('main h1, main h2').forEach(heading=>{
   if(heading.dataset.splitColours==='true') return;
   const words=heading.textContent.trim().split(/\s+/).filter(Boolean);
   if(words.length<2) return;
   const split=Math.ceil(words.length/2);
   heading.textContent='';
   const first=document.createElement('span'); first.className='heading-primary'; first.textContent=words.slice(0,split).join(' ')+' ';
   const second=document.createElement('span'); second.className='heading-secondary'; second.textContent=words.slice(split).join(' ');
   heading.append(first,second); heading.dataset.splitColours='true';
 });

 const themeButton=document.querySelector('[data-theme-toggle]');
 const rtlButton=document.querySelector('[data-rtl-toggle]');
 const menuButton=document.querySelector('.menu-toggle');
 const nav=document.querySelector('.site-nav');
 const homeToggle=document.querySelector('.home-toggle');
 const homeMenu=document.querySelector('.home-menu');
 const setThemeIcon=()=>{if(!themeButton)return;themeButton.innerHTML=body.classList.contains('dark-mode')?'<i data-lucide="sun"></i>':'<i data-lucide="moon"></i>';if(window.lucide)window.lucide.createIcons()};
 if(themeButton){themeButton.addEventListener('click',()=>{body.classList.toggle('dark-mode');try{localStorage.setItem('vitacare-theme',body.classList.contains('dark-mode')?'dark':'light');}catch(e){}setThemeIcon();});setThemeIcon();}
 if(rtlButton){rtlButton.textContent=body.classList.contains('rtl-mode')?'LTR':'RTL';rtlButton.addEventListener('click',()=>{body.classList.toggle('rtl-mode');rtlButton.textContent=body.classList.contains('rtl-mode')?'LTR':'RTL';});}
 if(menuButton&&nav){menuButton.addEventListener('click',()=>{nav.classList.toggle('nav-open');menuButton.setAttribute('aria-expanded',nav.classList.contains('nav-open'));});}
 if(homeToggle&&homeMenu){homeToggle.addEventListener('click',()=>{window.location.href='index.html';}); homeToggle.addEventListener('mouseenter',()=>{homeMenu.classList.add('dropdown-open');homeToggle.setAttribute('aria-expanded','true');}); const homeWrap=homeToggle.closest('.home-wrap'); if(homeWrap){homeWrap.addEventListener('mouseleave',()=>{if(!homeWrap.contains(document.activeElement)){homeMenu.classList.remove('dropdown-open');homeToggle.setAttribute('aria-expanded','false');}});}}
 const current=location.pathname.split('/').pop()||'index.html';
 document.querySelectorAll('.site-nav a.nav-item').forEach(a=>{if(a.getAttribute('href')===current){a.setAttribute('aria-current','page');}});
 if(current==='index.html'||current==='home-2.html'){if(homeToggle)homeToggle.setAttribute('aria-current','page');}
 if(homeToggle&&homeMenu){homeToggle.addEventListener('keydown',e=>{if(e.key==='Escape'){homeMenu.classList.remove('dropdown-open');homeToggle.setAttribute('aria-expanded','false');homeToggle.blur();}});}
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
 const form=document.querySelector('.enquiry-form');if(form){form.addEventListener('submit',e=>{e.preventDefault();const message=form.querySelector('.form-message');if(message)message.textContent='Demo only: connect a secure backend before accepting enquiries.';});}
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));}
 if(window.lucide)window.lucide.createIcons();
});