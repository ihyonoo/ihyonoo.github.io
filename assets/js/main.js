(function () {
  const content = window.PORTFOLIO_CONTENT;
  const langButtons = document.querySelectorAll(".lang-btn");
  const projectGrid = document.getElementById("project-grid");
  const skillsList = document.getElementById("skills-list");
  const awardsList = document.getElementById("awards-list");
  const experienceList = document.getElementById("experience-list");
  const resumeLink = document.getElementById("resume-link");
  const contactEmail = document.getElementById("contact-email");
  const contactGithub = document.getElementById("contact-github");
  const contactLinkedin = document.getElementById("contact-linkedin");

  let currentLang = "en";

  function getPathValue(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""), obj);
  }

  function renderSkills(skills) {
    skillsList.innerHTML = skills.map((skill) => `<li>${skill}</li>`).join("");
  }

  function renderProjects(projects, labels) {
    projectGrid.innerHTML = projects
      .map(
        (project) => `
          <article class="project-card">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-period">${project.period}</p>
            <p class="project-summary">${project.summary}</p>
            <div class="tag-row">
              ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <div class="project-links">
              <a class="project-link" href="${project.githubUrl}" target="_blank" rel="noreferrer">${labels.source}</a>
              <a class="project-link" href="${project.liveUrl}" target="_blank" rel="noreferrer">${labels.live}</a>
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderStackList(container, items) {
    container.innerHTML = items
      .map(
        (item) => `
          <article class="stack-item">
            <h3 class="stack-item-title">${item.title}</h3>
            <p class="stack-item-meta">${item.meta}</p>
            <p class="stack-item-body">${item.body}</p>
          </article>
        `
      )
      .join("");
  }

  function applyLanguage(lang) {
    const locale = content[lang];

    if (!locale) {
      return;
    }

    currentLang = lang;
    document.documentElement.lang = lang === "ko" ? "ko" : "en";
    document.title = locale.meta.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", locale.meta.description);
    }

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translatedText = getPathValue(locale, key);
      if (translatedText) {
        element.textContent = translatedText;
      }
    });

    renderSkills(locale.skills);
    renderProjects(locale.projects, locale.labels);
    renderStackList(awardsList, locale.awards);
    renderStackList(experienceList, locale.experience);

    contactEmail.textContent = locale.contact.emailText;
    contactEmail.href = locale.contact.emailUrl;

    contactGithub.textContent = locale.contact.githubText;
    contactGithub.href = locale.contact.githubUrl;

    contactLinkedin.textContent = locale.contact.linkedinText;
    contactLinkedin.href = locale.contact.linkedinUrl;

    resumeLink.href = locale.resume.file;

    langButtons.forEach((button) => {
      const isActive = button.dataset.lang === lang;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function setupLanguageToggle() {
    langButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetLang = button.dataset.lang;
        if (targetLang && targetLang !== currentLang) {
          applyLanguage(targetLang);
        }
      });
    });
  }

  function setupRevealAnimation() {
    const revealTargets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealTargets.forEach((target, idx) => {
      target.style.transitionDelay = `${Math.min(idx * 70, 280)}ms`;
      observer.observe(target);
    });
  }

  setupLanguageToggle();
  setupRevealAnimation();
  applyLanguage("en");
})();
