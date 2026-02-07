const allQuestions = [
  { q: ["موجود بكل مكان", "ما بنشوفني", "إذا اختفيت… كل شي بوقف"], a: "الوقت" },
  { q: ["ما إلي وزن", "بحمل وزن كبير", "بغيّر قرارات"], a: "المسؤولية" },
  { q: ["بزيد لما أشاركني", "بنقص لما أخبّيني", "ما بنشوفني"], a: "المعرفة" },
  { q: ["بطلع بدون صوت", "بعمل أثر كبير", "ما برجع إذا طلع"], a: "القرار" },
  { q: ["ببدأ صغير", "بكبر بسرعة", "بغيّر كل شي"], a: "التغيير" },
  { q: ["الناس بتدور علي", "لما توصلني بتتعود", "لما تروح بتشتاق"], a: "الراحة" },
  { q: ["بعيش معك طول عمرك", "بتعرفني أكتر لما تكبر", "ما بقدر أكون زي غيري"], a: "الشخصية" },
  { q: ["بوجع أكتر لما يجي من قريب", "ما بنشوفه", "أثره بطوّل"], a: "الخذلان" },
  { q: ["كل الناس عندهم ياي", "بس ما حدا بقدر يشوف ياي", "بميّزك عن غيرك"], a: "العقل" },
  { q: ["إذا مسكتني بضيّعك", "إذا تركتني بخوّفك", "بقرّبك وببعدك بنفس الوقت"], a: "الخوف" }
];

let questions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
let index = 0;
let revealed = 0;

function loadQuestion() {
  const q = questions[index];

  document.getElementById("question").innerHTML =
    "مين أنا؟<br>• " + q.q.join("<br>• ");

  revealed = 0;
  renderLetters();
  document.getElementById("message").innerText = "";
  document.getElementById("answer").value = "";
}

function renderLetters() {
  const container = document.getElementById("letters");
  container.innerHTML = "";

  const answer = questions[index].a;
  for (let i = 0; i < answer.length; i++) {
    const span = document.createElement("span");
    span.textContent = i < revealed ? answer[i] : "";
    container.appendChild(span);
  }
}

function checkAnswer() {
  const user = document.getElementById("answer").value.trim();
  const answer = questions[index].a;
  const msg = document.getElementById("message");

  if (user === answer) {
    msg.textContent = "✅ صح!";
    msg.style.color = "green";

    setTimeout(() => {
      index++;
      if (index < questions.length) {
        loadQuestion();
      } else {
        document.querySelector(".game").innerHTML =
          "<h2>🎉 خلصت اللعبة!</h2><p>أحسنت 👏</p>";
      }
    }, 1000);
  } else {
    msg.textContent = "❌ غلط… انكشف حرف!";
    msg.style.color = "orange";

    if (revealed < answer.length) {
      revealed++;
      renderLetters();
    }
  }
}

loadQuestion();
