const MineAIWizardUI = (() => {

    function create(plan) {

        if (!plan || !plan.steps) return;

        const box = document.createElement("div");

        box.id = "wizardBox";
        box.className = "wizardBox";

        document
            .getElementById("messages")
            .appendChild(box);

        render(box, plan, 0);

        box.scrollIntoView({
            behavior: "smooth"
        });
    }


    function render(box, plan, index) {

        const step = plan.steps[index];

        if (!step) {

            box.innerHTML = `
                <div class="wizardDone">
                    <div class="doneIcon">✓</div>

                    <h3>Server rejasi tugadi!</h3>

                    <p>
                        ${plan.name} uchun barcha
                        asosiy bosqichlarni ko‘rib chiqdik.
                    </p>

                    <button id="wizardRestart">
                        🔄 Qaytadan boshlash
                    </button>
                </div>
            `;

            document
                .getElementById("wizardRestart")
                .onclick = () => {
                    render(box, plan, 0);
                };

            return;
        }


        const total = plan.steps.length;

        const progress =
            Math.round(
                ((index + 1) / total) * 100
            );


        box.innerHTML = `

            <div class="wizardHeader">

                <div>
                    <small>
                        ${plan.name}
                    </small>

                    <h3>
                        ${step.title}
                    </h3>
                </div>

                <strong>
                    ${index + 1}/${total}
                </strong>

            </div>


            <div class="wizardProgress">
                <div
                    style="width:${progress}%"
                ></div>
            </div>


            <div class="wizardContent">

                <div class="wizardNumber">
                    ${index + 1}
                </div>

                <div>
                    <p>
                        ${step.text}
                    </p>
                </div>

            </div>


            <div class="wizardButtons">

                <button
                    id="wizardPrev"
                    ${index === 0 ? "disabled" : ""}
                >
                    ⬅️ Orqaga
                </button>


                <button
                    id="wizardNext"
                >
                    ${
                        index === total - 1
                        ? "Tugatish ✓"
                        : "Keyingi ➡️"
                    }
                </button>

            </div>
        `;


        document
            .getElementById("wizardPrev")
            .onclick = () => {

                if (index > 0) {

                    render(
                        box,
                        plan,
                        index - 1
                    );

                }

            };


        document
            .getElementById("wizardNext")
            .onclick = () => {

                render(
                    box,
                    plan,
                    index + 1
                );

            };

    }


    return {
        create
    };

})();
