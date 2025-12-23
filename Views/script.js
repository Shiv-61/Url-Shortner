const form = document.getElementById("form");

function change_theme() {
  const body = document.body;
  if (body.style.backgroundColor === "black") {
    body.style.backgroundColor = "white";
    body.style.color = "black";
    document.querySelectorAll(".input-box").forEach((el) => {
      el.style.backgroundColor = "white";
      el.style.color = "black";
    });
    document.getElementById("output").style.backgroundColor = "white";
    document.getElementById("output").style.color = "black";
  } else {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    document.querySelectorAll(".input-box").forEach((el) => {
      el.style.backgroundColor = "#333";
      el.style.color = "white";
    });
    document.getElementById("output").style.backgroundColor = "#333";
    document.getElementById("output").style.color = "white";
  }
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
        "https://url-shortner-mauve-nine.vercel.app",
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
