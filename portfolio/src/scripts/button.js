const radius = 200;
const particles = 40;

document.querySelectorAll('.button').forEach((particlesBtn) => {
  particlesBtn.addEventListener('click', function (e) {
    const t = e.target;
    removeParticles(t);

    for (let i = 0; i < particles; i++) {
      const c = document.createElement('span');
      c.classList.add('particle');
      c.style.top = e.layerY + 'px';
      c.style.left = e.layerX + 'px';
      t.append(c);
    }

    setTimeout(() => {
      const parts = t.querySelectorAll('.particle');
      parts.forEach((p) => {
        p.style.transform = `translate(${getRndInteger(
          -radius,
          radius
        )}px, ${getRndInteger(-radius, radius)}px)`;
      });
    }, 0);

    setTimeout(() => {
      removeParticles(particlesBtn);
    }, 280);
  });
});

function removeParticles(btn) {
  const parts = btn.querySelectorAll('.particle');
  if (parts && parts.length) {
    parts.forEach((p) => {
      btn.removeChild(p);
    });
  }
}

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
