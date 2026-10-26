/**
 * KAMMA MANIDHIP CHOWDARY & PRIYANKA — ROYAL WEDDING CELEBRATIONS
 * Interactive Engine:
 * - Royal Wax Seal Unlock Screen (InviteStory Reel Signature)
 * - Auspicious Indian Web Audio Synthesizer (Tanpura, Flute & Temple Bell)
 * - Golden Akshatas & Floral Petals Canvas Physics
 * - Real-Time Muhurtham Countdown Clock
 * - Wedding Calendar Invite Generator (.ics)
 * - Wedding Directions Modal
 * - Guest Blessings Wall (Aashirwadam) with Local Storage
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. REAL-TIME MUHURTHAM COUNTDOWN
  // Muhurtham: Thursday, 3 December 2026; ceremony time to be announced
  // =========================================================================
  const muhurthamDate = new Date('2026-12-03T00:00:00+05:30').getTime();
  const elDays = document.getElementById('cdDays');
  const elHours = document.getElementById('cdHours');
  const elMins = document.getElementById('cdMins');
  const elSecs = document.getElementById('cdSecs');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = muhurthamDate - now;

    if (distance <= 0) {
      if (elDays) elDays.textContent = '00';
      if (elHours) elHours.textContent = '00';
      if (elMins) elMins.textContent = '00';
      if (elSecs) elSecs.textContent = '00';
      const badge = document.querySelector('.cd-title-badge');
      if (badge) {
        const today = new Date(now).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
        badge.textContent = today === '2026-12-03'
          ? 'శుభ వివాహం · TODAY IS OUR WEDDING DAY!'
          : 'శుభ వివాహం · 3 DECEMBER 2026';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMins) elMins.textContent = String(minutes).padStart(2, '0');
    if (elSecs) elSecs.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // =========================================================================
  // 2. CANVAS AKSHATAS & FLORAL PETALS PHYSICS
  // =========================================================================
  const canvas = document.getElementById('petalsCanvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const MAX_AMBIENT_PARTICLES = 30;

  class Particle {
    constructor(isBurst = false, originX, originY) {
      this.init(isBurst, originX, originY);
    }

    init(isBurst = false, originX, originY) {
      this.type = Math.random() < 0.4 ? 'akshata' : (Math.random() < 0.7 ? 'rose' : 'marigold');

      if (isBurst) {
        this.x = originX !== undefined ? originX : width / 2 + (Math.random() - 0.5) * (width * 0.7);
        this.y = originY !== undefined ? originY : Math.random() * (height * 0.3);
        const angle = (Math.random() - 0.5) * Math.PI * 0.8;
        const speed = Math.random() * 6 + 3;
        this.vx = Math.sin(angle) * speed;
        this.vy = -Math.cos(angle) * speed * 0.5 + Math.random() * 2;
      } else {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = Math.random() * 1.5 + 1;
      }

      this.size = this.type === 'akshata' ? Math.random() * 3 + 2.5 : Math.random() * 8 + 8;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.05;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.04 + 0.02;
      this.opacity = Math.random() * 0.4 + 0.6;
      this.gravity = this.type === 'akshata' ? 0.04 : 0.015;

      if (this.type === 'akshata') {
        this.color = Math.random() < 0.6 ? '#f59e0b' : '#fbbf24';
      } else if (this.type === 'rose') {
        this.color = Math.random() < 0.5 ? '#b91c1c' : '#881326';
      } else {
        this.color = Math.random() < 0.5 ? '#ea580c' : '#f59e0b';
      }
    }

    update() {
      this.vy += this.gravity;
      this.vx += Math.sin(this.wobble) * 0.03;
      this.wobble += this.wobbleSpeed;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotSpeed;

      this.vx *= 0.99;
      this.vy *= 0.99;

      if (this.y > height + 20) {
        if (particles.length <= MAX_AMBIENT_PARTICLES) {
          this.init(false);
          this.y = -20;
        } else {
          const index = particles.indexOf(this);
          if (index > -1) particles.splice(index, 1);
        }
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      if (this.type === 'akshata') {
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 1.6, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.ellipse(0, -this.size * 0.15, this.size * 1.1, this.size * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.6, this.size * 0.8, this.size * 0.6, 0, this.size);
        ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.6, -this.size * 0.8, -this.size * 0.6, 0, -this.size);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < MAX_AMBIENT_PARTICLES; i++) {
    const p = new Particle(false);
    p.y = Math.random() * height;
    particles.push(p);
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(loop);
  }
  loop();

  function triggerPetalShower(count = 70) {
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(true));
    }
  }

  // =========================================================================
  // 3. AUSPICIOUS INDIAN MUSIC SYNTHESIZER (WEB AUDIO API)
  // Classical Tanpura Drone + Raag Mohanam Flute & Temple Bell
  // =========================================================================
  let audioCtx = null;
  let isPlaying = false;
  let tanpuraNodes = [];
  let melodyTimer = null;
  let bellTimer = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  }

  function playTempleBell(freq = 1174) {
    if (!audioCtx || !isPlaying) return;
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 3.6);
  }

  function playFluteNote(freq, duration = 1.4) {
    if (!audioCtx || !isPlaying) return;
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const vibrato = audioCtx.createOscillator();
    const vibratoGain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    vibrato.frequency.setValueAtTime(5.2, now);
    vibratoGain.gain.setValueAtTime(4.0, now);
    vibrato.connect(osc.frequency);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.065, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    vibrato.start(now);
    osc.start(now);
    vibrato.stop(now + duration + 0.1);
    osc.stop(now + duration + 0.1);
  }

  function startTanpura() {
    if (!audioCtx) return;
    const droneFreqs = [146.83, 220.00, 293.66]; // D3, A3, D4

    droneFreqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420 + idx * 80, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.014, audioCtx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      tanpuraNodes.push(osc);
    });
  }

  function stopTanpura() {
    tanpuraNodes.forEach(node => {
      try {
        node.stop();
        node.disconnect();
      } catch (e) {}
    });
    tanpuraNodes = [];
  }

  function startIndianMelody() {
    const melodyPhrases = [
      [293.66, 329.63, 369.99, 440.00],
      [440.00, 493.88, 587.33, 493.88],
      [493.88, 440.00, 369.99, 329.63],
      [369.99, 329.63, 293.66, 293.66],
      [293.66, 369.99, 440.00, 587.33],
      [587.33, 493.88, 440.00, 369.99]
    ];

    let phraseIdx = 0;
    let noteIdx = 0;

    function playNext() {
      if (!isPlaying) return;
      const currentPhrase = melodyPhrases[phraseIdx % melodyPhrases.length];
      const freq = currentPhrase[noteIdx];

      playFluteNote(freq, 1.3);

      noteIdx++;
      if (noteIdx >= currentPhrase.length) {
        noteIdx = 0;
        phraseIdx++;
        playTempleBell(880);
      }

      const nextDelay = 1600 + Math.random() * 400;
      melodyTimer = setTimeout(playNext, nextDelay);
    }

    playNext();
  }

  // Music UI Sync & Custom MP3 / Synthesizer Handler
  const weddingAudio = document.getElementById('weddingAudio');
  const musicToggleTop = document.getElementById('musicToggle');
  const dockMusicBtn = document.getElementById('dockMusicBtn');
  const dockMusicIcon = document.getElementById('dockMusicIcon');
  const dockMusicLabel = document.getElementById('dockMusicLabel');

  let isUsingCustomAudio = false;

  async function toggleMusic(forceState = null) {
    isPlaying = forceState !== null ? forceState : !isPlaying;

    if (isPlaying) {
      if (musicToggleTop) musicToggleTop.classList.add('playing');
      if (dockMusicBtn) dockMusicBtn.classList.add('playing');
      if (dockMusicLabel) dockMusicLabel.textContent = 'Pause';
      if (dockMusicIcon) dockMusicIcon.textContent = '⏸️';

      // Check if custom MP3 file can be played
      let customAudioStarted = false;
      if (weddingAudio && weddingAudio.src) {
        try {
          const playPromise = weddingAudio.play();
          if (playPromise !== undefined) {
            await playPromise;
            customAudioStarted = true;
            isUsingCustomAudio = true;
          }
        } catch (err) {
          // Custom MP3 not found or blocked, fall back to Web Audio Synthesizer
          customAudioStarted = false;
        }
      }

      // Fallback: Auspicious Web Audio Indian Synthesizer
      if (!customAudioStarted) {
        isUsingCustomAudio = false;
        initAudio();
        if (audioCtx.state === 'suspended') {
          await audioCtx.resume();
        }
        playTempleBell(1174);
        startTanpura();
        startIndianMelody();
      }
    } else {
      if (musicToggleTop) musicToggleTop.classList.remove('playing');
      if (dockMusicBtn) dockMusicBtn.classList.remove('playing');
      if (dockMusicLabel) dockMusicLabel.textContent = 'Music';
      if (dockMusicIcon) dockMusicIcon.textContent = '🎵';

      // Pause custom MP3 if playing
      if (weddingAudio) {
        try {
          weddingAudio.pause();
        } catch (e) {}
      }

      // Stop synthesizer
      stopTanpura();
      if (melodyTimer) clearTimeout(melodyTimer);
      if (bellTimer) clearTimeout(bellTimer);
    }
  }

  if (musicToggleTop) {
    musicToggleTop.addEventListener('click', () => toggleMusic());
  }

  if (dockMusicBtn) {
    dockMusicBtn.addEventListener('click', () => toggleMusic());
  }

  // =========================================================================
  // 4. ROYAL WAX SEAL UNLOCK MECHANISM
  // =========================================================================
  const sealScreen = document.getElementById('sealScreen');
  const waxSealBtn = document.getElementById('waxSealBtn');
  const reopenSealBtn = document.getElementById('reopenSealBtn');

  function unlockSeal() {
    if (!sealScreen) return;
    sealScreen.classList.add('unlocked');
    document.body.classList.remove('seal-locked');

    triggerPetalShower(80);

    if (!isPlaying) {
      toggleMusic(true);
    }
  }

  function relockSeal() {
    if (!sealScreen) return;
    sealScreen.classList.remove('unlocked');
    document.body.classList.add('seal-locked');
  }

  if (waxSealBtn) waxSealBtn.addEventListener('click', unlockSeal);
  if (reopenSealBtn) reopenSealBtn.addEventListener('click', relockSeal);

  // Shower button in bottom dock
  const dockShowerBtn = document.getElementById('dockShowerBtn');
  if (dockShowerBtn) {
    dockShowerBtn.addEventListener('click', () => {
      triggerPetalShower(75);
    });
  }

  // =========================================================================
  // 5. DIRECTIONS MODAL (WEDDING LOCATION)
  // =========================================================================
  const dockDirectionsBtn = document.getElementById('dockDirectionsBtn');
  const directionsModal = document.getElementById('directionsModal');
  const closeDirectionsBtn = document.getElementById('closeDirectionsBtn');
  const directionsBackdrop = document.getElementById('directionsBackdrop');

  function openDirections() {
    if (directionsModal) directionsModal.removeAttribute('hidden');
  }

  function closeDirections() {
    if (directionsModal) directionsModal.setAttribute('hidden', '');
  }

  if (dockDirectionsBtn) dockDirectionsBtn.addEventListener('click', openDirections);
  if (closeDirectionsBtn) closeDirectionsBtn.addEventListener('click', closeDirections);
  if (directionsBackdrop) directionsBackdrop.addEventListener('click', closeDirections);

  // =========================================================================
  // 6. SAVE DATE MODAL & MULTI-EVENT ICS GENERATOR
  // =========================================================================
  const dockSaveBtn = document.getElementById('dockSaveBtn');
  const saveDateModal = document.getElementById('saveDateModal');
  const closeSaveDateBtn = document.getElementById('closeSaveDateBtn');
  const saveDateBackdrop = document.getElementById('saveDateBackdrop');

  const calDownloadMuhurthamBtn = document.getElementById('calDownloadMuhurthamBtn');

  const calendarMuhurthamBtn = document.getElementById('calendarMuhurthamBtn');

  function openSaveDate() {
    if (saveDateModal) saveDateModal.removeAttribute('hidden');
  }

  function closeSaveDate() {
    if (saveDateModal) saveDateModal.setAttribute('hidden', '');
  }

  if (dockSaveBtn) dockSaveBtn.addEventListener('click', openSaveDate);
  if (closeSaveDateBtn) closeSaveDateBtn.addEventListener('click', closeSaveDate);
  if (saveDateBackdrop) saveDateBackdrop.addEventListener('click', closeSaveDate);

  // ICS Generation Helpers
  function downloadIcs(filename, icsContent) {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // All-day calendar entry until the family supplies a ceremony time.
  const MUHURTHAM_ICS_BLOCK = [
    'BEGIN:VEVENT',
    'UID:manidhip-priyanka-wedding-20261203@subhavivaham.in',
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')}`,
    'DTSTART;VALUE=DATE:20261203',
    'DTEND;VALUE=DATE:20261204',
    'SUMMARY:Wedding — Kamma Manidhip Chowdary & Priyanka',
    'LOCATION:Botlagudur Village\\, Pamur Mandal\\, Markapuram District\\, Andhra Pradesh',
    'DESCRIPTION:శుభ వివాహం — కమ్మ మణిదీప్ చౌదరి మరియు ప్రియాంక.\\nబొట్లగూడూరు గ్రామం\\, పామూరు మండలం\\, మార్కాపురం జిల్లా.\\nCeremony time to be announced.',
    'STATUS:CONFIRMED',
    'END:VEVENT'
  ].join('\r\n');

  function getSingleEventIcs(block) {
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Kamma Manidhip Chowdary & Priyanka//Wedding Celebrations//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      block,
      'END:VCALENDAR'
    ].join('\r\n');
  }


  if (calDownloadMuhurthamBtn) {
    calDownloadMuhurthamBtn.addEventListener('click', () => {
      downloadIcs('Manidhip-Priyanka-Wedding.ics', getSingleEventIcs(MUHURTHAM_ICS_BLOCK));
      closeSaveDate();
    });
  }


  if (calendarMuhurthamBtn) {
    calendarMuhurthamBtn.addEventListener('click', () => {
      downloadIcs('Manidhip-Priyanka-Wedding.ics', getSingleEventIcs(MUHURTHAM_ICS_BLOCK));
    });
  }

  // =========================================================================
  // 7. AASHIRWADAM (BLESSINGS WALL) WITH LOCAL STORAGE
  // =========================================================================
  const blessingForm = document.getElementById('blessingForm');
  const formStatus = document.getElementById('formStatus');
  const blessingsFeed = document.getElementById('blessingsFeed');
  const STORAGE_KEY = 'manidhip_priyanka_emerald_blessings';

  function renderBlessing(name, relation, message, dateStr, prepend = false) {
    if (!blessingsFeed) return;

    const card = document.createElement('div');
    card.className = 'blessing-card-item';

    const top = document.createElement('div');
    top.className = 'card-item-top';

    const author = document.createElement('strong');
    author.textContent = name;

    const badge = document.createElement('span');
    badge.className = 'relation-pill';
    badge.textContent = relation;

    top.appendChild(author);
    top.appendChild(badge);

    const text = document.createElement('p');
    text.textContent = `“${message}”`;

    const time = document.createElement('span');
    time.className = 'blessing-timestamp';
    time.textContent = dateStr;

    card.appendChild(top);
    card.appendChild(text);
    card.appendChild(time);

    if (prepend && blessingsFeed.firstChild) {
      blessingsFeed.insertBefore(card, blessingsFeed.firstChild);
    } else {
      blessingsFeed.appendChild(card);
    }
  }

  function loadSavedBlessings() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      saved.forEach(item => {
        renderBlessing(item.name, item.relation, item.message, item.date, false);
      });
    } catch (e) {}
  }
  loadSavedBlessings();

  if (blessingForm) {
    blessingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guestName').value.trim();
      const relation = document.getElementById('guestRelation').value;
      const message = document.getElementById('guestMessage').value.trim();

      if (!name || !message) return;

      const dateStr = `Blessed on ${new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })}`;

      renderBlessing(name, relation, message, dateStr, true);

      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        saved.unshift({ name, relation, message, date: dateStr });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      } catch (err) {}

      if (formStatus) {
        formStatus.textContent = '॥ ధన్యవాదాలు ॥ Thank you for your divine blessings!';
        formStatus.className = 'form-status-message success';
      }

      triggerPetalShower(60);
      blessingForm.reset();

      setTimeout(() => {
        if (formStatus) formStatus.textContent = '';
      }, 5000);
    });
  }

})();
