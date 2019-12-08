import "./style.css";

const switchTheme = target => {
  const block = target.closest(".onoffswitch");
  if (block !== null) {
    const [defaultMod, inverseMod] = [
      "theme_color_project-default",
      "theme_color_project-inverse"
    ];

    block.classList.toggle("onoffswitch_checked");

    document.querySelectorAll(`.${defaultMod}, .${inverseMod}`).forEach(mod => {
      mod.classList.toggle(defaultMod);
      mod.classList.toggle(inverseMod);
    });
  }
};

const collapseHistory = target => {
  const block = target.closest(".e-accordion");
  if (block !== null) {
    block
      .querySelector(".e-accordion__more")
      .classList.toggle("e-accordion__more_show");
  }
};

document.addEventListener("click", e => {
  switchTheme(e.target);
  collapseHistory(e.target);
});
