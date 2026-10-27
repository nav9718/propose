
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./App.css";

const loveMessages = [
  "You make my world more beautiful. ❤️",
  "Every adventure is better with you. 🌹",
  "I choose you, today and always. 💖",
  "Let's make a million beautiful memories! ✨",
];

function FloatingHearts() {
  const hearts = ["❤️", "💗", "💕", "🌹", "💖", "🌸"];

  return (
    <div className="floating-layer" aria-hidden="true">
      {Array.from({ length: 24 }, (_, i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            left: `${(i * 37 + 7) % 100}%`,
            animationDelay: `${(i % 8) * 0.8}s`,
            animationDuration: `${7 + (i % 5) * 2}s`,
            fontSize: `${16 + (i % 4) * 7}px`,
          }}
        >
          {hearts[i % hearts.length]}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [noPosition, setNoPosition] = useState(null);
  const [kissCount, setKissCount] = useState(0);

  const noButtonRef = useRef(null);
  const previousPosition = useRef(null);

  useEffect(() => {
    document.title = accepted
      ? "I Knew It! ❤️"
      : "You Love Me, Right? 💕";
  }, [accepted]);

  // Find a new visible position inside the browser viewport.
  function moveNoButton() {
    const button = noButtonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const margin = 12;

    const maxX = Math.max(margin, window.innerWidth - rect.width - margin);
    const maxY = Math.max(margin, window.innerHeight - rect.height - margin);

    let x = margin;
    let y = margin;

    // Try several positions so the button doesn't stay in one place.
    for (let i = 0; i < 20; i++) {
      x = margin + Math.random() * Math.max(0, maxX - margin);
      y = margin + Math.random() * Math.max(0, maxY - margin);

      const previous = previousPosition.current;

      if (
        !previous ||
        Math.hypot(x - previous.x, y - previous.y) > 120
      ) {
        break;
      }
    }

    previousPosition.current = { x, y };
    setNoPosition({ x, y });
  }

  function handleNoTouch(event) {
    event.preventDefault();
    moveNoButton();
  }

  function celebrate() {
    setAccepted(true);
    setMessageIndex(Math.floor(Math.random() * loveMessages.length));
    setNoPosition(null);
    previousPosition.current = null;
  }

  function sendLove() {
    setKissCount((count) => count + 1);
    setMessageIndex((index) => (index + 1) % loveMessages.length);
  }

  function restart() {
    setAccepted(false);
    setNoPosition(null);
    previousPosition.current = null;
    setKissCount(0);
  }

  return (
    <main className={`app ${accepted ? "celebration" : ""}`}>
      <FloatingHearts />

      <div className="glow glow-one" />
      <div className="glow glow-two" />

      {!accepted ? (
        <>
          <section className="love-card">
            <div className="rose-bouquet" aria-hidden="true">
              🌹 💐 🌹
            </div>

            <div className="heart-icon">💗</div>

            <p className="eyebrow">A LITTLE QUESTION FOR YOU</p>

            <h1>
              You love me,
              <br />
              <span>right?</span> 🥹
            </h1>

            <p className="subtitle">
              Be honest, my favourite person.
              <br />
              My heart is waiting for your answer...
            </p>

            <div className="button-area">
              <button className="yes-button" onClick={celebrate}>
                Yes, of course! 💖
              </button>

              {!noPosition && (
                <button
                  ref={noButtonRef}
                  className="no-button"
                  onMouseEnter={moveNoButton}
                  onTouchStart={handleNoTouch}
                  onClick={moveNoButton}
                >
                  No 🙈
                </button>
              )}
            </div>

            <p className="tiny-note">
              Psst... try clicking No if you can! 😉
            </p>

            <div className="card-footer">
              Made with endless love <span>♥</span>
            </div>
          </section>

          {/* Render the moving button outside the card so it
              won't be clipped by card or container styling. */}
          {noPosition &&
            createPortal(
              <button
                ref={noButtonRef}
                className="no-button runaway"
                style={{
                  left: `${noPosition.x}px`,
                  top: `${noPosition.y}px`,
                }}
                onMouseEnter={moveNoButton}
                onTouchStart={handleNoTouch}
                onClick={moveNoButton}
                aria-label="No, try catching this button"
              >
                No 🙈
              </button>,
              document.body
            )}
        </>
      ) : (
        <section className="love-card celebration-card">
          <div className="celebration-emoji">🎉 💃🏻 🥳</div>

          <div className="big-heart">❤️</div>

          <p className="eyebrow">MY HEART KNEW IT!</p>

          <h1>
            I knew it!
            <br />
            <span>Let's party! 🎊</span>
          </h1>

          <p className="subtitle">
            You just made me the happiest person
            in the whole world! 🥹💕
          </p>

          <div className="love-letter">
            <p>My favourite person, 🌹</p>

            <p>
              I want to laugh with you, travel with you,
              watch sunsets with you, and turn ordinary
              days into extraordinary memories.
            </p>

            <p>
              I'll keep trying to make you smile, support
              your dreams, surprise you with little things,
              and remind you how special you are.
            </p>

            <p className="forever">
              Today, tomorrow, and always — it's you. ❤️
            </p>
          </div>

          <p className="changing-message">
            {loveMessages[messageIndex]}
          </p>

          <button className="yes-button love-button" onClick={sendLove}>
            {kissCount === 0
              ? "Send me a kiss 😘"
              : "One more kiss! 💋"}
          </button>

          {kissCount > 0 && (
            <p className="kiss-feedback">
              {Array.from(
                { length: Math.min(kissCount, 10) },
                () => "💋"
              ).join(" ")}
              <br />
              You have sent {kissCount} virtual{" "}
              {kissCount === 1 ? "kiss" : "kisses"}!
            </p>
          )}

          <button className="restart-button" onClick={restart}>
            Replay our little love story ↻
          </button>

          <div className="card-footer">
            You + Me = Forever <span>♥</span>
          </div>
        </section>
      )}
    </main>
  );
}
