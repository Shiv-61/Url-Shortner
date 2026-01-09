const form = document.getElementById("form");

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

    const maxRetries = 4;
    const retryDelay = 3000; // 3 seconds
    let attempt = 0;
    let success = false;

    while (attempt <= maxRetries && !success) {
      try {
        if (attempt > 0) {
           outputBox.value = "Server waking up… please wait";
           submitBtn.value = "Waking up...";
        }

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
        document.getElementById("output").value = data.shortUrl;
        success = true;

      } catch (err) {
        console.error(`Attempt ${attempt + 1} failed:`, err);
        
        if (attempt < maxRetries) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          attempt++;
        } else {
          // Final failure
          console.error("All attempts failed.");
          outputBox.value = "Error: Backend unreachable. Try again.";
          alert("Something went wrong. Please try again later.");
        }
      }
    }

    // Reset Button
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
    submitBtn.value = originalBtnText;

  } else {
    alert("Invalid url");
  }
});
