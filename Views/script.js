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
  if (isValidHttpUrl(long_url)) {
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
        console.error("Backend error:", data);
        throw new Error(data.error || "Failed to shorten URL");
      }

      document.getElementById("output").value = data.shortUrl;
    } catch (err) {
      console.error("ERROR:", err);
      alert("Something went wrong");
    }
  } else {
    alert("Invalid url");
  }
});
