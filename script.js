const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 },
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const audio = document.querySelector("#love-song");
const musicPlayer = document.querySelector("[data-music-player]");
const musicToggle = document.querySelector("[data-music-toggle]");
const musicLabel = document.querySelector("[data-music-label]");

if (audio && musicPlayer && musicToggle && musicLabel) {
  audio.volume = 0.42;

  const setPlaying = (isPlaying) => {
    musicToggle.setAttribute("aria-pressed", String(isPlaying));
    musicToggle.setAttribute(
      "aria-label",
      isPlaying ? "Mettre Perfect Symphony en pause" : "Lancer Perfect Symphony",
    );
    musicLabel.textContent = isPlaying ? "Pause" : "Perfect Symphony";
  };

  const setUnavailable = () => {
    musicPlayer.hidden = true;
    musicToggle.disabled = true;
    musicToggle.setAttribute("aria-label", "Musique indisponible");
    musicLabel.textContent = "Musique indisponible";
  };

  musicToggle.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setUnavailable();
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    musicPlayer.hidden = false;
  });
  audio.addEventListener("pause", () => setPlaying(false));
  audio.addEventListener("ended", () => setPlaying(false));
  audio.addEventListener("error", setUnavailable);
  setPlaying(false);

  if (audio.readyState > 0) {
    musicPlayer.hidden = false;
  }
}
