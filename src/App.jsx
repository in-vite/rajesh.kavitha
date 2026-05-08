import React, { useEffect, useRef, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import TopBar from "./components/TopBar";
import HeroSection from "./components/HeroSection";
import WeddingSection from "./components/WeddingSection";
import FamilySection from "./components/FamilySection";
import EventsSection from "./components/EventsSection";
import ClosingSection from "./components/ClosingSection";
import BlessingsSection from "./components/BlessingsSection";
import FooterBar from "./components/FooterBar";
import { eventData } from "./data/invitationData";

class AmbientTrack {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.pulseTimer = null;
    this.active = false;
  }

  async init() {
    if (this.audioContext) {
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    this.audioContext = new AudioContextClass();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = 0.09;
    this.masterGain.connect(this.audioContext.destination);
  }

  async start() {
    await this.init();

    if (!this.audioContext || !this.masterGain || this.active) {
      return;
    }

    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    this.active = true;
    this.playDrone();
    this.pulseTimer = window.setInterval(() => {
      this.playDrone();
      this.playBell();
    }, 7000);
  }

  stop() {
    if (!this.audioContext || !this.masterGain || !this.active) {
      return;
    }

    this.active = false;
    window.clearInterval(this.pulseTimer);
    this.pulseTimer = null;
    this.masterGain.gain.cancelScheduledValues(this.audioContext.currentTime);
    this.masterGain.gain.setTargetAtTime(0.0001, this.audioContext.currentTime, 0.4);
  }

  playDrone() {
    if (!this.audioContext || !this.masterGain) {
      return;
    }

    [146.83, 220, 293.66, 369.99].forEach((frequency, index) => {
      const oscillator = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      oscillator.type = index === 1 ? "triangle" : "sine";
      oscillator.frequency.value = frequency;
      gain.gain.value = 0.0001;
      oscillator.connect(gain);
      gain.connect(this.masterGain);
      oscillator.start();
      gain.gain.exponentialRampToValueAtTime(0.08 / (index + 1), this.audioContext.currentTime + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 7.2);
      oscillator.stop(this.audioContext.currentTime + 7.4);
    });
  }

  playBell() {
    if (!this.audioContext || !this.masterGain || !this.active) {
      return;
    }

    const now = this.audioContext.currentTime;

    [587.33, 783.99, 987.77].forEach((frequency, index) => {
      const oscillator = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.05 / (index + 1), now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2 + index * 0.15);
      oscillator.connect(gain);
      gain.connect(this.masterGain);
      oscillator.start(now);
      oscillator.stop(now + 3.5);
    });
  }
}

class WeddingAudioPlayer {
  constructor() {
    this.videoId = "Gz8HDbQZSQA";
    this.player = null;
    this.playerReady = false;
    this.apiLoadPromise = null;
    this.active = false;
    this.usingFallback = false;
    this.fallbackTrack = new AmbientTrack();
  }

  ensureMountPoint() {
    let node = document.getElementById("ytMusicPlayer");

    if (node) {
      return node;
    }

    node = document.createElement("div");
    node.id = "ytMusicPlayer";
    node.setAttribute("aria-hidden", "true");
    node.style.position = "fixed";
    node.style.left = "-9999px";
    node.style.width = "1px";
    node.style.height = "1px";
    node.style.overflow = "hidden";
    document.body.appendChild(node);
    return node;
  }

  loadYouTubeApi() {
    if (window.YT && window.YT.Player) {
      return Promise.resolve();
    }

    if (this.apiLoadPromise) {
      return this.apiLoadPromise;
    }

    this.apiLoadPromise = new Promise((resolve, reject) => {
      const previousCallback = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousCallback === "function") {
          previousCallback();
        }

        resolve();
      };

      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => reject(new Error("Failed to load YouTube API"));
      document.head.appendChild(script);
    });

    return this.apiLoadPromise;
  }

  async initPlayer() {
    if (this.playerReady && this.player) {
      return;
    }

    await this.loadYouTubeApi();

    await new Promise((resolve, reject) => {
      const mountNode = this.ensureMountPoint();

      this.player = new window.YT.Player(mountNode, {
        width: "1",
        height: "1",
        videoId: this.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          loop: 1,
          playlist: this.videoId,
          start: 10
        },
        events: {
          onReady: () => {
            this.playerReady = true;
            resolve();
          },
          onError: () => {
            reject(new Error("YouTube player error"));
          }
        }
      });
    });
  }

  async start() {
    if (this.active) {
      return;
    }

    try {
      await this.initPlayer();
      this.player.playVideo();
      this.usingFallback = false;
      this.active = true;
    } catch {
      await this.fallbackTrack.start();
      this.usingFallback = true;
      this.active = true;
    }
  }

  stop() {
    if (!this.active) {
      return;
    }

    if (this.usingFallback) {
      this.fallbackTrack.stop();
    } else {
      this.player?.stopVideo();
    }

    this.active = false;
    this.usingFallback = false;
  }
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [visits, setVisits] = useState("001");
  const [marriageCountdown, setMarriageCountdown] = useState("");
  const [receptionCountdown, setReceptionCountdown] = useState("");
  const [scrollPercent, setScrollPercent] = useState("0%");
  const [countdownDays, setCountdownDays] = useState("49");
  const [countdownHours, setCountdownHours] = useState("21");
  const [countdownMins, setCountdownMins] = useState("15");
  const [countdownSecs, setCountdownSecs] = useState("30");
  const audioRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const percent = docHeight > 0 ? Math.round((scrolled / docHeight) * 100) : 0;
      setScrollPercent(`${Math.max(0, Math.min(100, percent))}%`);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateCountdowns = () => {
      const marriage = new Date("2026-06-25T07:30:00").getTime();
      const reception = new Date("2026-06-26T18:00:00").getTime();
      const now = new Date().getTime();

      const updateTimer = (targetTime, setShort, setDays, setHours, setMins, setSecs) => {
        if (now >= targetTime) {
          setShort("Event Live");
          setDays("0");
          setHours("0");
          setMins("0");
          setSecs("0");
          return;
        }

        const diff = targetTime - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        setShort(`${days}d ${hours}h ${mins}m left`);

        if (targetTime === marriage) {
          setCountdownDays(String(days));
          setCountdownHours(String(hours));
          setCountdownMins(String(mins));
          setCountdownSecs(String(secs));
        }
      };

      updateTimer(marriage, setMarriageCountdown, setCountdownDays, setCountdownHours, setCountdownMins, setCountdownSecs);
      updateTimer(reception, setReceptionCountdown, () => {}, () => {}, () => {}, () => {});
    };

    updateCountdowns();
    const timer = setInterval(updateCountdowns, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("splash-active", !isOpen);

    return () => {
      document.body.classList.remove("splash-active");
    };
  }, [isOpen]);

  useEffect(() => {
    const currentVisits = Number(window.localStorage.getItem("wedding-visit-count-react") || "0") + 1;
    window.localStorage.setItem("wedding-visit-count-react", String(currentVisits));
    setVisits(String(currentVisits).padStart(3, "0"));
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );

    revealTargets.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 120}ms`;
      revealObserver.observe(element);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const layer = document.querySelector(".petal-layer");

    if (!layer || layer.childElementCount > 0) {
      return;
    }

    for (let index = 0; index < 18; index += 1) {
      const petal = document.createElement("span");
      const duration = 12 + Math.random() * 16;
      const delay = Math.random() * -22;
      const left = Math.random() * 100;
      const drift = `${Math.random() * 180 - 90}px`;
      const size = 10 + Math.random() * 12;
      petal.style.left = `${left}vw`;
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;
      petal.style.setProperty("--drift", drift);
      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.45}px`;
      layer.appendChild(petal);
    }
  }, []);

  async function openInvitation() {
    setIsClosing(true);

    if (!audioRef.current) {
      audioRef.current = new WeddingAudioPlayer();
    }

    await audioRef.current.start();
    setIsMusicOn(true);

    window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setIsOpen(true);
    }, 1000);
  }

  async function toggleMusic() {
    if (!audioRef.current) {
      audioRef.current = new WeddingAudioPlayer();
    }

    if (isMusicOn) {
      audioRef.current.stop();
      setIsMusicOn(false);
      return;
    }

    await audioRef.current.start();
    setIsMusicOn(true);
  }

  return (
    <>
      <div className="petal-layer" aria-hidden="true"></div>
      <div
        id="ytMusicPlayer"
        aria-hidden="true"
        style={{ position: "fixed", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      ></div>

      <SplashScreen isOpen={isOpen} isClosing={isClosing} onOpenInvitation={openInvitation} />
      <TopBar scrollPercent={scrollPercent} isMusicOn={isMusicOn} onToggleMusic={toggleMusic} />

      <main>
        <HeroSection />
        <WeddingSection
          marriageCountdown={marriageCountdown}
          receptionCountdown={receptionCountdown}
          countdownDays={countdownDays}
          countdownHours={countdownHours}
          countdownMins={countdownMins}
          countdownSecs={countdownSecs}
        />
        <FamilySection />
        <EventsSection eventData={eventData} marriageCountdown={marriageCountdown} receptionCountdown={receptionCountdown} />
        <ClosingSection />
        <BlessingsSection />
      </main>

      <FooterBar visits={visits} />
    </>
  );
}
