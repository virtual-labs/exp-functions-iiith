// Mobile Detection and Overlay Script
// Detects phones/tablets, marks the page with body.mobile-mode and shows a
// one-time notice. The layout itself adapts to the screen width through the
// media queries in css/functions.css, so the simulation stays usable whether
// or not the notice is dismissed.

class MobileDetection {
  constructor() {
    this.storageKey = "functions-sim-mobile-notice-dismissed";
    this.isMobile = this.detectMobile();
    this.overlayShown = false;
    this.init();
  }

  detectMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobilePatterns = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
      /Opera Mini/i,
      /IEMobile/i,
      /Mobile/i,
    ];
    // Only small touch screens count, so touchscreen laptops are not flagged
    const isSmallScreen = Math.min(window.screen.width, window.screen.height) <= 768;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return (
      mobilePatterns.some((pattern) => pattern.test(userAgent)) ||
      (isSmallScreen && isTouchDevice)
    );
  }

  init() {
    if (!this.isMobile) return;
    const start = () => {
      document.body.classList.add("mobile-mode");
      if (!this.wasDismissed()) this.showOverlay();
    };
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", start);
    else start();
  }

  wasDismissed() {
    try {
      return sessionStorage.getItem(this.storageKey) === "1";
    } catch (e) {
      return false;
    }
  }

  rememberDismissal() {
    try {
      sessionStorage.setItem(this.storageKey, "1");
    } catch (e) {
      // Storage can be unavailable (private mode); the notice will just show again next time
    }
  }

  showOverlay() {
    if (this.overlayShown) return;
    this.overlayShown = true;

    const overlay = document.createElement("div");
    overlay.id = "mobile-warning-overlay";
    overlay.innerHTML = `
      <div class="mobile-overlay-backdrop">
        <div class="mobile-overlay-content" role="dialog" aria-modal="true" aria-labelledby="mobile-overlay-title">
          <div class="mobile-overlay-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="#f59e0b" stroke-width="2" fill="#fef3c7"/>
              <path d="M12 8V13M12 16H12.01" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <h2 class="mobile-overlay-title" id="mobile-overlay-title">Best viewed on a larger screen</h2>
          <p class="mobile-overlay-description">
            This Functions simulation works on your device: the panels are stacked one below the other.
            On a small screen, keep in mind:
          </p>
          <ul class="mobile-overlay-list">
            <li>Tap a shape in <strong>Code Output</strong> to define its function. The questions open in <strong>Initialize</strong>.</li>
            <li>The functions you define appear in <strong>Step Execution</strong>, at the bottom of the page.</li>
            <li>Rotating to landscape gives more room for the code.</li>
          </ul>
          <div class="mobile-overlay-actions">
            <button type="button" class="mobile-overlay-btn mobile-overlay-btn-primary" id="mobile-overlay-continue">
              Continue
            </button>
          </div>
        </div>
      </div>
    `;

    const styles = document.createElement("style");
    styles.id = "mobile-overlay-styles";
    styles.textContent = `
      .mobile-overlay-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.75);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        animation: mobileOverlayFadeIn 0.3s ease-out;
      }
      .mobile-overlay-content {
        background: #fff;
        border-radius: 16px;
        padding: 24px;
        max-width: 420px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        text-align: center;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
      .mobile-overlay-icon {
        margin: 0 auto 12px;
        width: 48px;
        height: 48px;
      }
      .mobile-overlay-title {
        font-size: 20px;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 12px;
        line-height: 1.3;
      }
      .mobile-overlay-description, .mobile-overlay-list {
        font-size: 15px;
        color: #4b5563;
        line-height: 1.5;
        text-align: left;
      }
      .mobile-overlay-description {
        margin-bottom: 12px;
      }
      .mobile-overlay-list {
        list-style: disc;
        padding-left: 20px;
        margin-bottom: 20px;
      }
      .mobile-overlay-list li {
        margin-bottom: 6px;
      }
      .mobile-overlay-btn {
        width: 100%;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        border: none;
        cursor: pointer;
        background: #3072b3;
        color: #fff;
      }
      .mobile-overlay-btn:hover {
        background: #2a65a0;
      }
      @keyframes mobileOverlayFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes mobileOverlayFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(styles);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    document
      .getElementById("mobile-overlay-continue")
      .addEventListener("click", () => this.continueAnyway());
  }

  continueAnyway() {
    this.rememberDismissal();
    this.hideOverlay();
  }

  hideOverlay() {
    const overlay = document.getElementById("mobile-warning-overlay");
    if (!overlay) return;
    overlay.style.animation = "mobileOverlayFadeOut 0.3s ease-out forwards";
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = "";
    }, 300);
  }
}

const mobileDetection = new MobileDetection();
