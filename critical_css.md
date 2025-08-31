# ⚡ Critical CSS – Complete Guide for Developers

## 🔹 What is Critical CSS?
When someone opens your website, the browser needs CSS before it can show anything.  
If your CSS file is big, the browser waits until it downloads everything → user sees a blank screen 😐.  

**Critical CSS** = the *small chunk of CSS* needed to style the first part of your page (above-the-fold, the area visible without scrolling).  

👉 Put this CSS inside `<head>` → content shows up instantly.  
👉 Load the rest of the CSS later in the background.  

---

## 🔹 Why use Critical CSS?
- 🚀 Faster load → users see something quickly.  
- 📈 Better SEO → Google ranks fast sites higher.  
- 🎨 Better UX → avoids “unstyled flash.”  
- 📲 Great for mobile users → especially on slow networks.  

---

## 🔹 How it Works
1. Extract CSS for the top of the page.  
2. Inline it in `<head>` using `<style>`.  
3. Load the full CSS asynchronously.  

---

## 🔹 Example Code
```html
<head>
  <!-- Critical CSS (inline) -->
  <style>
    body { margin: 0; font-family: sans-serif; }
    header { background: #007acc; color: white; padding: 1rem; }
    h1 { margin: 0; font-size: 2rem; }
    .btn { background: #ff5722; color: white; padding: 8px 16px; border-radius: 4px; }
  </style>

  <!-- Load full CSS in background -->
  <link rel="preload" href="styles.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">

  <!-- Fallback if JS is off -->
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>
