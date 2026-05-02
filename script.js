/* ── Animated background blobs ── */
(function () {
  const canvas = document.getElementById('bg');
  const ctx    = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const blobs = [
    { x: 0.20, y: 0.15, r: 380, c: 'rgba(100, 70, 220, 0.20)',  sx: 0.55, sy: 0.45, p: 0.0 },
    { x: 0.80, y: 0.80, r: 300, c: 'rgba(201,160,  55, 0.14)',  sx: 0.40, sy: 0.55, p: 2.1 },
    { x: 0.50, y: 0.55, r: 260, c: 'rgba( 30,110, 230, 0.13)',  sx: 0.35, sy: 0.50, p: 4.2 },
    { x: 0.10, y: 0.85, r: 220, c: 'rgba( 70,190, 170, 0.08)',  sx: 0.50, sy: 0.38, p: 1.0 },
    { x: 0.90, y: 0.10, r: 200, c: 'rgba(180, 60, 140, 0.09)',  sx: 0.45, sy: 0.42, p: 3.3 },
  ];

  function draw(now) {
    const t = now * 0.00028;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    blobs.forEach(b => {
      const cx = (b.x + Math.sin(t * b.sx + b.p) * 0.17) * canvas.width;
      const cy = (b.y + Math.cos(t * b.sy + b.p) * 0.13) * canvas.height;
      const g  = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r);
      g.addColorStop(0, b.c);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, b.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
})();

/* ── Ripple on buttons ── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top  = `${e.clientY - rect.top}px`;
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});
