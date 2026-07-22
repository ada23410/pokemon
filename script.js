function scrollToSection(id) {
  const target = document.getElementById(id);

  if (target) {
    target.scrollIntoView({
      behavior: "smooth"
    });
  }
}

// 監聽元素是否進入畫面
const observer = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2
  }
);

// 找到所有需要動畫的元素
const revealElements = document.querySelectorAll(".reveal");

revealElements.forEach(function(element) {
  observer.observe(element);
});

// 關卡紀錄 Modal
const modalButtons = document.querySelectorAll("[data-modal-target]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");

function openStageModal(id) {
  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }
}

function closeStageModal(id) {
  const modal = document.getElementById(id);

  if (modal) {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }
}

modalButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    openStageModal(button.dataset.modalTarget);
  });
});

modalCloseButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    closeStageModal(button.dataset.modalClose);
  });
});

document.querySelectorAll(".stage-modal").forEach(function(modal) {
  modal.addEventListener("click", function(event) {
    if (event.target === modal) {
      closeStageModal(modal.id);
    }
  });
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    document.querySelectorAll(".stage-modal.show").forEach(function(modal) {
      closeStageModal(modal.id);
    });
  }
});

// 捲動到冒險地圖之後，顯示右側「回到頂部」寶貝球按鈕
const backToTopBtn = document.getElementById("backToTop");
const stagesSection = document.getElementById("stages");

if (backToTopBtn && stagesSection) {
  function updateBackToTop() {
    const triggerY = stagesSection.offsetTop;

    if (window.scrollY >= triggerY) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  window.addEventListener("resize", updateBackToTop);
  updateBackToTop();
}

// 關卡紀錄燈箱：點擊左側縮圖切換右側大圖／影片
document.querySelectorAll(".lightbox").forEach(function(lightbox) {
  const thumbs = lightbox.querySelectorAll(".lightbox-thumb");
  const mainImg = lightbox.querySelector(".lightbox-main-img");
  const mainVideo = lightbox.querySelector(".lightbox-main-video");

  thumbs.forEach(function(thumb) {
    thumb.addEventListener("click", function() {
      thumbs.forEach(function(t) {
        t.classList.remove("active");
      });
      thumb.classList.add("active");

      const fullSrc = thumb.dataset.full;

      if (thumb.dataset.type === "video") {
        mainImg.style.display = "none";
        mainVideo.style.display = "block";
        mainVideo.src = fullSrc;
        mainVideo.play();
      } else {
        mainVideo.pause();
        mainVideo.style.display = "none";
        mainVideo.src = "";
        mainImg.style.display = "block";
        mainImg.src = fullSrc;
      }
    });
  });
});
