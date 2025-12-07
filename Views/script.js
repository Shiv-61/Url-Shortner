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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const long_url = document.querySelector(".input-box").value;

  try {
    const response = await fetch(
      "https://url-shortner-voyager.vercel.app/url",
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

    if (!response.ok) {
      throw new Error("Failed to shorten URL");
    }

    const data = await response.json();
    console.log("SERVER:", data);

    document.getElementById("output").value = data.shortUrl;
  } catch (err) {
    console.error("ERROR:", err);
    alert("Backend not running!");
  }
});
