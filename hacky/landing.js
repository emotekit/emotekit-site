"use strict";

// All characters and conversations are fictional. Each example answers the same question.
const examples = {
  friend: { file: "リク.hacky", reply: ["え はや", "もう寝たほうがよくない"] },
  teacher: {
    file: "リク.hacky",
    reply: ["では、今日の宿題は寝ること。", "続きは明日の君に任せよう。"],
  },
  idol: {
    file: "リク.hacky",
    reply: ["7時！早起き仲間だね。", "今日は一緒に夜更かしお休み。おやすみ！"],
  },
  interviewer: {
    file: "リク.hacky",
    reply: [
      "では、7時に起きるために",
      "今夜できることを一つ、教えてください。",
    ],
  },
  character: {
    file: "リク.hacky",
    reply: ["朝7時に出発か。", "ならば今夜は休もう。冒険の続きは、夢の先で。"],
  },
};
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panel = document.getElementById("conversation");
const reply = panel.querySelector("[data-reply]");
const filename = panel.querySelector("[data-filename]");
function selectExample(tab) {
  const example = examples[tab.dataset.example];
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  panel.setAttribute("aria-labelledby", tab.id);
  filename.textContent = example.file;
  reply.replaceChildren(
    ...example.reply.flatMap((line, index) =>
      index
        ? [document.createElement("br"), document.createTextNode(line)]
        : [document.createTextNode(line)],
    ),
  );
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectExample(tab));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      next = (index + tabs.length - 1) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectExample(tabs[next]);
    tabs[next].focus();
  });
});
