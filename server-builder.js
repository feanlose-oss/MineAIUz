const MineAIServerBuilder = (() => {

    const plans = {

        anarchy: {
            name: "⚔️ Anarchy Server",

            steps: [
                {
                    title: "Server yadrosi",
                    text: "Paper yoki boshqa mos server yadrosini tanlash."
                },
                {
                    title: "Asosiy sozlamalar",
                    text: "server.properties faylini sozlash."
                },
                {
                    title: "Spawn",
                    text: "Lobby yoki spawn hududini yaratish."
                },
                {
                    title: "Protection",
                    text: "Spawn hududini WorldGuard orqali himoyalash."
                },
                {
                    title: "Permissions",
                    text: "LuckPerms orqali rank va permissionlarni sozlash."
                },
                {
                    title: "Economy",
                    text: "Kerak bo‘lsa economy va shop tizimini qo‘shish."
                },
                {
                    title: "Anti-cheat",
                    text: "Server uchun mos anti-cheat tanlash."
                },
                {
                    title: "Testing",
                    text: "Serverni ishga tushirib, plugin va commandlarni tekshirish."
                }
            ]
        },


        survival: {
            name: "🌲 Survival Server",

            steps: [
                {
                    title: "Server yadrosi",
                    text: "Paper kabi server yadrosini tanlash."
                },
                {
                    title: "World",
                    text: "Survival world yaratish yoki tayyor world qo‘shish."
                },
                {
                    title: "Spawn",
                    text: "Spawn hududini yaratish."
                },
                {
                    title: "Protection",
                    text: "Spawn va kerakli hududlarni himoyalash."
                },
                {
                    title: "Permissions",
                    text: "LuckPerms bilan ranklarni sozlash."
                },
                {
                    title: "Economy",
                    text: "Pul, shop va economy tizimini sozlash."
                },
                {
                    title: "Testing",
                    text: "Serverni test qilish."
                }
            ]
        },


        boxpvp: {
            name: "💥 BoxPvP Server",

            steps: [
                {
                    title: "Server yadrosi",
                    text: "Paper serverni sozlash."
                },
                {
                    title: "Arena",
                    text: "BoxPvP arena mapini qo‘shish."
                },
                {
                    title: "Protection",
                    text: "Arena hududlarini WorldGuard bilan sozlash."
                },
                {
                    title: "Kits",
                    text: "Kitlar va boshlang‘ich itemlarni yaratish."
                },
                {
                    title: "Ranks",
                    text: "LuckPerms orqali rank tizimini yaratish."
                },
                {
                    title: "Crates",
                    text: "Reward yoki crate tizimini qo‘shish."
                },
                {
                    title: "Testing",
                    text: "PvP, kitlar va commandlarni tekshirish."
                }
            ]
        },


        skyblock: {
            name: "☁️ SkyBlock Server",

            steps: [
                {
                    title: "Server yadrosi",
                    text: "Paper serverni sozlash."
                },
                {
                    title: "SkyBlock plugin",
                    text: "Mos SkyBlock tizimini o‘rnatish."
                },
                {
                    title: "Spawn",
                    text: "SkyBlock spawn hududini yaratish."
                },
                {
                    title: "Permissions",
                    text: "Rank va permissionlarni sozlash."
                },
                {
                    title: "Economy",
                    text: "Economy va shop tizimini qo‘shish."
                },
                {
                    title: "Testing",
                    text: "Island, economy va commandlarni test qilish."
                }
            ]
        }

    };


    function getPlan(mode) {

        if (!mode) {
            return null;
        }

        return plans[mode] || null;
    }


    function createPlan(analysis) {

        if (!analysis || !analysis.mode) {
            return null;
        }

        const plan =
            getPlan(
                analysis.mode
            );

        if (!plan) {
            return null;
        }


        return {
            mode: analysis.mode,
            name: plan.name,
            steps: plan.steps,
            total: plan.steps.length
        };
    }


    function formatPlan(plan) {

        if (!plan) {

            return (
                "Server rejimini ayt.\n\n" +
                "Masalan:\n" +
                "⚔️ Anarchy\n" +
                "🌲 Survival\n" +
                "💥 BoxPvP\n" +
                "☁️ SkyBlock"
            );
        }


        let text =
            `${plan.name}\n\n`;

        text +=
            "🛠️ SERVER QURISH REJASI\n\n";


        plan.steps.forEach(
            (step, index) => {

                text +=
                    `${index + 1}. ${step.title}\n`;

                text +=
                    `   ${step.text}\n\n`;
            }
        );


        text +=
            `📊 Jami: ${plan.total} bosqich`;


        return text;
    }


    return {
        getPlan,
        createPlan,
        formatPlan
    };

})();
