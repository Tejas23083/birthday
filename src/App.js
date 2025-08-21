import React, {useEffect, useState, useRef} from 'react';
import './App.css';



const memoryPhotos = [
  { id: 1, src: "3.jpeg", caption: "1st Picture You Send Me On Snap 😍", className: "photo" },
  { id: 2, src: "4.jpeg", caption: "You Give Me Sona 😄 ", className: "photo" },
  { id: 3, src: "5.jpeg", caption: "Your Beautiful Mandala Art 🤩", className: "photo" },
  { id: 4, src: "7.jpeg", caption: "The Smile 👌", className: "photo" },
  { id: 5, src: "9.jpeg", caption: "Cutiie", className: "photo" },
  { id: 6, src: "award.jpeg", caption: "Your achievement", className: "photo" },
  { id: 7, src: "18.jpeg", caption: "The Beautifulness 😍", className: "photo" }
];

const memoryVideos = [
  { id: 1, src: "/birthday/10.mp4", caption: "Cuteness 😍" },
  { id: 2, src: "/birthday/8.mp4", caption: "" },
  { id: 3, src: "/birthday/14.mp4", caption: "" },
  { id: 4, src: "/birthday/12.mp4", caption: "" },
  { id: 5, src: "/birthday/13.mp4", caption: "" },
];

const Confetti = () => {
  useEffect(() => {
    import("canvas-confetti").then(confetti => {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const colors = ["#a855f7", "#9333ea", "#facc15"];

      (function frame() {
        confetti.default({
          particleCount: 3,
          angle: 50,
          spread: 80,
          origin: { x: 0 },
          colors: colors
        });
        confetti.default({
          particleCount: 3,
          angle: 130,
          spread: 80,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    });
  }, []);
  return null;
};


const App = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [direction, setDirection] = useState("next");


  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, [showConfetti]);

  const prevPhoto = () => {
  setDirection("prev");
  setCurrentPhotoIndex((prev) =>
    prev === 0 ? memoryPhotos.length - 1 : prev - 1
  );
};

const nextPhoto = () => {
  setDirection("next");
  setCurrentPhotoIndex((prev) =>
    prev === memoryPhotos.length - 1 ? 0 : prev + 1
  );
};
const [shimmer, setShimmer] = useState(false);
const [showBirthday, setShowBirthday] = useState(false);
const confettiPlayed = useRef(false);

useEffect(() => {
  if (confettiPlayed.current) return; // stop if already played once

  const timer = setTimeout(() => {
    setShowBirthday(true);
    confettiPlayed.current = true; // mark as played

    import("canvas-confetti").then(confetti => {
      const colors = ["#ff4d4d", // bright red
    "#ffcc00", // gold
    "#00ccff"];
      confetti.default({
        particleCount: 120,
        spread: 360,
        origin: { x: 0.5, y: 0.5 },
        colors: colors
      });
    });
  }, 2500);
  
  return () => clearTimeout(timer);
}, []);
useEffect(() => {
  // After typing effect finishes (adjust timing to match typing duration)
  const timer = setTimeout(() => {
    setShimmer(true);
  }, 2000); // 2 seconds after start

  return () => clearTimeout(timer);
}, []);
return (
    <div className="App">
      {/* Heading */}
      <div className="startText">
  <h1
    className={`intro-text ${showBirthday ? "fade-out" : ""}`}
  >
    ✨ A Magical Day Awaits... ✨
  </h1>

  {showBirthday && (
    <h1
      className="birthday-text"
      dangerouslySetInnerHTML={{
        __html: "🎉 Happy 21<sup>st</sup> Birthday 🎉"
      }}
    />
  )}
</div>
      <div className='name'>
        <h1 className={`animated-name ${shimmer ? "shimmer" : ""}`}>
          ✨ Sayali ✨
        </h1>
      </div>
      <p>
        On this special day, I just want to say thank you for being the
        wonderful person you are.💞
      </p>

      <div className="first-section">
      {/* Left image */}
      <div className="side-img">
        <img src="16.jpeg" alt="Sayali" />
      </div>

    {/* Center paragraph */}
    <div className="first-text">
  <p>
    <span className="line" style={{ animationDelay: "0s" }}>
      Happy Birthday to the most beautiful person I know!  
    </span>
    <span className="line" style={{ animationDelay: "1.2s" }}>
      Your smile has a way of lighting up every room,
    </span>
    <span className="line" style={{ animationDelay: "2.4s" }}>
      and your presence makes everything feel brighter.
    </span>
    <span className="line" style={{ animationDelay: "2.4s" }}>
      It’s not just how you look, but the way your kindness and confidence shine through that makes you truly stunning.
    </span>
    <span className="line" style={{ animationDelay: "2.4s" }}>
      I hope today brings you as much happiness as you bring to everyone around you.
    </span>
    <span className="line" style={{ animationDelay: "2.4s" }}>
      From my heart, I just wish I could see you this happy always,because your joy is the most beautiful thing I’ve ever known. 
    </span>

  </p>
</div>

    {/* Right image */}
    <div className="side-img">
      <img src="2.jpeg" alt="Sayali" />
    </div>
  </div>

      <div className='scroll'>
        <button className="button" onClick={() => setShowConfetti(true)}> Click Me ✨</button>
      </div><br></br><br></br><br></br>

      {/* Text for Slide Images */}
      <div className='photo-text'>
        <h3>Beautiful moments You Shared Me ✨</h3>
      </div>

      {/* Slider */}
      <div className="image-slider">
        <button className="slider-btn left" onClick={prevPhoto}>❮</button>

        <div className={`slider-frame ${direction}`}>
          <img
            key={memoryPhotos[currentPhotoIndex].src}
            src={memoryPhotos[currentPhotoIndex].src}
            alt={memoryPhotos[currentPhotoIndex].caption}
            className="slider-main-img"
          />
          <p className="slider-caption">
            {memoryPhotos[currentPhotoIndex].caption || "Beautiful moments"}
          </p>
        </div>

        <button className="slider-btn right" onClick={nextPhoto}>❯</button>
      </div><br></br>

      {/* Text for Slide Images */}
      <div className='hori-text'>
        <h3>The eyes holds the magic 💖</h3>
      </div>

      {/* Horizontal Video */}
      <div className="hori">
        <img className="eyes" src='17.jpeg' alt='eyesImage'>
        </img>
      </div><br></br><br></br><br></br><br></br>

      <div className='photo-text'>
        <h3>Cuteness overloaded 💖</h3>
      </div>

      {/* Videos Grid */}
      <div className="video-grid">
        {memoryVideos.map((video) => (
          <div className="video-item" key={video.id}>
            <video autoPlay loop muted playsInline controls>
              <source src={video.src} type="video/mp4" />
            </video>
            <p className="caption">{video.caption}</p>
          </div>
        ))}
      </div>

      <div className="extra-video-section">
      <div className="extra-text">
        <h2>💜 A Special Moment 💜</h2>
        <p>
          Happy Birthday to the one who makes my heart skip a beat every time I see you. 
          You’re honestly so special to me, more than you probably even realize. 
          Just your presence makes everything around me feel brighter and more beautiful. 
          I really admire the way you are, and I feel lucky to even know you. On your birthday, 
          I just want you to know how much you mean to me—you’re truly unforgettable, and 
          I hope this year brings you all the happiness you deserve. 🌸✨
        </p>
      </div>

        <div className="extra-video">
  <video loop controls>
    <source src="/birthday/videosay.mp4" type="video/mp4" />
  </video>
  <p className="caption">🌟A Special Video For You🌟</p>
</div>

    </div>


      <p>Made with ❤️ just for you — forever and always 💫</p>
      {showConfetti && <Confetti />}
    </div>
  );
};

export default App;

