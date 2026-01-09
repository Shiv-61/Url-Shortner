const form = document.getElementById("form");

// Function to wake up the server
const wakeUpServer = async () => {
  try {
    await fetch("https://url-shortner-mauve-nine.vercel.app/health");
    console.log("Wake-up ping sent successfully");
  } catch (error) {
    console.error("Failed to ping server:", error);
  }
};

// Call immediately when script loads
wakeUpServer();

function change_theme() {
  document.body.classList.toggle("light-theme");
}

function copy_url() {
  const copyText = document.getElementById("output");
  copyText.select();
  navigator.clipboard.writeText(copyText.value);
  const btn = document.querySelector(".copy-btn");
  btn.innerText = "Copied!";
  setTimeout(() => {
    btn.innerText = "Copy";
  }, 1500);
}

function isValidHttpUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const long_url = document.querySelector(".input-box").value;
  const outputBox = document.getElementById("output");
  const submitBtn = document.querySelector(".submit-btn");
  const originalBtnText = submitBtn.value;

  if (isValidHttpUrl(long_url)) {
    // Reset UI
    outputBox.value = "";
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
    submitBtn.value = "Shortening...";

    try {
      const response = await fetch(
        "https://url-shortner-mauve-nine.vercel.app/url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: long_url,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to shorten URL");
      }

      // Success!
      outputBox.value = data.shortUrl;

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    }

    // Reset Button
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
    submitBtn.value = originalBtnText;

  } else {
    alert("Invalid url");
  }
});
