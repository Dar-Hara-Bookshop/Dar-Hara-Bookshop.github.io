/* 
   مكتبة دار حراء - البرمجة والتفاعلية (Interactivity & Animations)
   التصميم والبرمجة بواسطة BizMapper
   نوفمبر 2026
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. شريط التنقل اللاصق والتحكم بمؤشر القراءة
  const header = document.querySelector('.header');
  const scrollIndicator = document.getElementById('scroll-indicator');
  
  window.addEventListener('scroll', () => {
    // اللاصق للنافبار
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // مؤشر القراءة العلوي
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (scrollIndicator) {
      scrollIndicator.style.width = scrolled + '%';
    }
  });

  // 2. قائمة الموبايل المنزلقة والتحكم بالولوج والتوافقية (Accessibility)
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  
  function toggleMobileMenu() {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', !isExpanded);
    mobileToggle.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    
    // منع سكرول الصفحة الخلفية عند فتح القائمة
    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle && mobileNavOverlay) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
    
    // إغلاق القائمة عند النقر على أي رابط داخلي
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileNavOverlay.classList.contains('active')) {
          toggleMobileMenu();
        }
      });
    });
  }

  // 3. نظام تصفية الكتب التفاعلي (Interactive Catalog Filter)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const bookCards = document.querySelectorAll('.book-card');
  
  if (filterButtons.length > 0 && bookCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // تحديث الزر النشط
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        bookCards.forEach(card => {
          // تأثير الفلاش الخفيف قبل الفلترة
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          
          setTimeout(() => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
              card.style.display = 'flex';
              // إظهار تدريجي
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }, 50);
            } else {
              card.style.display = 'none';
            }
          }, 300);
        });
      });
    });
  }

  // 4. تفعيل التحريك عند التمرير (Scroll Reveal using IntersectionObserver)
  const revealElements = document.querySelectorAll('.service-card, .book-card, .meta-item, .contact-info-panel, .map-card, .about-content-text');
  
  // إعداد النمط المبدئي للتحريك
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  });
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // تشغيل التحريك مرة واحدة فقط
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 5. التحديث التلقائي للرابط النشط في القائمة بناءً على التمرير
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120; // هامش للنافبار
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});
