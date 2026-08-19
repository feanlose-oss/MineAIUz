/* =========================================================
   MineAI CORE v3
   JSON Knowledge Base bilan ishlaydi
   API YO'Q
   ========================================================= */

const MineAICore = (() => {

    let knowledge = {
        server: {},
        plugins: {},
        modes: {},
        mods: {},
        commands: {},
        errors: {}
    };


    /* =====================================================
       KNOWLEDGE ULASH
    ===================================================== */

    function setKnowledge(data) {

        knowledge = {
            ...knowledge,
            ...(data || {})
        };

        console.log(
            "🧠 MineAI Core Knowledge qabul qildi."
        );
    }


    /* =====================================================
       TEXT NORMALIZE
    ===================================================== */

    function normalize(text) {

        return String(text || "")
            .toLowerCase()
            .replace(/[ʻʼ’`]/g, "'")
            .replace(/[.,!?;:()[\]{}]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }


    /* =====================================================
       VERSION
    ===================================================== */

    function detectVersion(text) {

        const match = normalize(text).match(
            /\b(?:mc\s*)?1\.(\d+)(?:\.(\d+))?(?:\.(\d+))?\b/i
        );

        if (!match) {
            return null;
        }

        return match[0]
            .replace(/^mc\s*/i, "")
            .trim();
    }


    /* =====================================================
       SERVER MODE
    ===================================================== */

    function detectMode(text) {

        const q = normalize(text);

        const modes = {
            anarchy: [
                "anarchy",
                "anarxiya",
                "anarx"
            ],

            survival: [
                "survival",
                "surv"
            ],

            boxpvp: [
                "boxpvp",
                "box pvp",
                "box-pvp"
            ],

            skyblock: [
                "skyblock",
                "sky block"
            ],

            prison: [
                "prison"
            ],

            kitpvp: [
                "kitpvp",
                "kit pvp"
            ],

            lifesteal: [
                "lifesteal",
                "life steal"
            ],

            hub: [
                "hub",
                "lobby",
                "spawn"
            ]
        };


        for (const mode in modes) {

            for (const keyword of modes[mode]) {

                if (q.includes(keyword)) {
                    return mode;
                }
            }
        }

        return null;
    }


    /* =====================================================
       CATEGORY
    ===================================================== */

    function detectCategory(text) {

        const q = normalize(text);

        const categories = {

            map: [
                "map",
                "karta",
                "world",
                "zip",
                "hub map",
                "lobby map"
            ],

            plugin: [
                "plugin",
                "plugins",
                "plagin"
            ],

            mod: [
                "mod",
                "mods",
                "modlar"
            ],

            command: [
                "command",
                "komanda",
                "buyruq"
            ],

            error: [
                "error",
                "xato",
                "ishlamayapti",
                "crash",
                "ochilmayapti",
                "kirmayapti"
            ],

            server: [
                "server",
                "server och",
                "server yarat"
            ],

            rank: [
                "rank",
                "prefix",
                "permission"
            ]
        };


        let best = null;
        let score = 0;


        for (const category in categories) {

            let current = 0;

            for (const keyword of categories[category]) {

                if (q.includes(keyword)) {
                    current += keyword.length + 2;
                }
            }


            if (current > score) {

                score = current;
                best = category;
            }
        }


        return best;
    }


    /* =====================================================
       INTENT
    ===================================================== */

    function detectIntent(text) {

        const q = normalize(text);


        if (
            q.includes("top") ||
            q.includes("qidir") ||
            q.includes("topib ber") ||
            q.includes("kerak") ||
            q.includes("download")
        ) {
            return "search";
        }


        if (
            q.includes("qanday") ||
            q.includes("qanaqa") ||
            q.includes("qilib") ||
            q.includes("qanday qilib")
        ) {
            return "howto";
        }


        if (
            q.includes("error") ||
            q.includes("xato") ||
            q.includes("crash") ||
            q.includes("ishlamayapti")
        ) {
            return "troubleshoot";
        }


        return "question";
    }


    /* =====================================================
       TOKEN
    ===================================================== */

    function getTokens(text) {

        const stopWords = new Set([
            "menga",
            "kerak",
            "qanday",
            "qanaqa",
            "qilib",
            "qilaman",
            "uchun",
            "bilan",
            "ber",
            "top",
            "men",
            "bu",
            "shu",
            "ham",
            "va",
            "da",
            "ga",
            "ni",
            "bir",
            "chi"
        ]);


        return normalize(text)
            .split(" ")
            .filter(word =>
                word.length >= 3 &&
                !stopWords.has(word)
            );
    }


    /* =====================================================
       PLUGIN QIDIRISH
    ===================================================== */

    function findPlugin(question) {

        const q = normalize(question);

        const plugins =
            knowledge.plugins?.plugins || {};


        for (const name in plugins) {

            if (
                q.includes(
                    normalize(name)
                )
            ) {

                return {
                    name,
                    data: plugins[name]
                };
            }
        }


        return null;
    }


    /* =====================================================
       MOD QIDIRISH
    ===================================================== */

    function findMod(question) {

        const q = normalize(question);

        const mods =
            knowledge.mods?.mods || {};


        for (const name in mods) {

            if (
                q.includes(
                    normalize(name)
                )
            ) {

                return {
                    name,
                    data: mods[name]
                };
            }
        }


        return null;
    }


    /* =====================================================
       COMMAND QIDIRISH
    ===================================================== */

    function findCommand(question) {

        const q = normalize(question);

        const commands =
            knowledge.commands?.commands || {};


        for (const key in commands) {

            const data =
                commands[key];


            if (
                q.includes(key) ||
                q.includes(
                    normalize(
                        data.description || ""
                    )
                )
            ) {

                return {
                    name: key,
                    data
                };
            }
        }


        return null;
    }


    /* =====================================================
       ERROR QIDIRISH
    ===================================================== */

    function findError(question) {

        const q = normalize(question);

        const errors =
            knowledge.errors?.errors || {};


        let best = null;
        let score = 0;


        for (const key in errors) {

            const data =
                errors[key];


            let current = 0;


            for (
                const keyword
                of data.keywords || []
            ) {

                if (
                    q.includes(
                        normalize(keyword)
                    )
                ) {

                    current +=
                        keyword.length + 3;
                }
            }


            if (current > score) {

                score = current;

                best = {
                    name: key,
                    data,
                    score
                };
            }
        }


        return best;
    }


    /* =====================================================
       ANALYZE
    ===================================================== */

    function analyze(question) {

        if (
            !question ||
            !String(question).trim()
        ) {

            return {
                ok: false
            };
        }


        const version =
            detectVersion(question);

        const mode =
            detectMode(question);

        const category =
            detectCategory(question);

        const intent =
            detectIntent(question);

        const tokens =
            getTokens(question);


        const plugin =
            findPlugin(question);

        const mod =
            findMod(question);

        const command =
            findCommand(question);

        const error =
            findError(question);


        let confidence = 20;


        if (version) {
            confidence += 15;
        }

        if (mode) {
            confidence += 15;
        }

        if (category) {
            confidence += 15;
        }

        if (plugin) {
            confidence += 15;
        }

        if (mod) {
            confidence += 10;
        }

        if (error) {
            confidence += 15;
        }

        if (tokens.length >= 3) {
            confidence += 5;
        }


        confidence =
            Math.min(
                confidence,
                100
            );


        return {

            ok: true,

            question:
                String(question).trim(),

            version,

            mode,

            category,

            intent,

            tokens,

            plugin,

            mod,

            command,

            error,

            confidence
        };
    }


    /* =====================================================
       RESPONSE
    ===================================================== */

    function response(analysis) {

        if (!analysis?.ok) {

            return "Savolingni yoz.";
        }


        /* ================= ERROR ================= */

        if (analysis.error) {

            const error =
                analysis.error.data;


            let text =
                "🐛 SERVER XATOSI ANIQLANDI\n\n";


            text +=
                `🔎 Xato turi: ${analysis.error.name}\n\n`;


            if (error.cause) {

                text +=
                    `📌 Sabab:\n${error.cause}\n\n`;
            }


            if (
                Array.isArray(
                    error.solution
                )
            ) {

                text +=
                    "🛠️ Yechim:\n";


                error.solution.forEach(
                    (step, index) => {

                        text +=
                            `${index + 1}. ${step}\n`;
                    }
                );
            }


            return text;
        }


        /* ================= PLUGIN ================= */

        if (analysis.plugin) {

            const plugin =
                analysis.plugin;


            let text =
                `🔌 ${plugin.name}\n\n`;


            text +=
                `${plugin.data.description || ""}\n`;


            if (
                Array.isArray(
                    plugin.data.commands
                )
            ) {

                text +=
                    "\n📋 Asosiy command:\n";


                plugin.data.commands.forEach(
                    command => {

                        text +=
                            `• ${command}\n`;
                    }
                );
            }


            return text;
        }


        /* ================= MOD ================= */

        if (analysis.mod) {

            const mod =
                analysis.mod;


            let text =
                `🧩 ${mod.name}\n\n`;


            text +=
                `${mod.data.description || ""}\n`;


            if (mod.data.loader) {

                text +=
                    `\nLoader: ${mod.data.loader}`;
            }


            if (mod.data.type) {

                text +=
                    `\nTuri: ${mod.data.type}`;
            }


            return text;
        }


        /* ================= COMMAND ================= */

        if (analysis.command) {

            const command =
                analysis.command;


            let text =
                `⌨️ ${command.name}\n\n`;


            text +=
                `${command.data.description || ""}\n\n`;


            if (
                Array.isArray(
                    command.data.commands
                )
            ) {

                text +=
                    "📋 Commandlar:\n";


                command.data.commands.forEach(
                    cmd => {

                        text +=
                            `• ${cmd}\n`;
                    }
                );
            }


            return text;
        }


        /* ================= MAP ================= */

        if (
            analysis.category ===
            "map"
        ) {

            return (
                "🗺️ MAP QIDIRISH SO‘ROVI\n\n" +

                (
                    analysis.version
                        ? `🎮 Versiya: ${analysis.version}\n`
                        : "🎮 Versiya: aniqlanmadi\n"
                ) +

                (
                    analysis.mode
                        ? `⚔️ Rejim: ${analysis.mode}\n`
                        : "⚔️ Rejim: aniqlanmadi\n"
                ) +

                "\n🌐 Real internet qidiruvi hali ulanmagan.\n" +
                "Keyingi bosqichda MineAI mos maplarni " +
                "qidirib, natijalarni chiqaradi."
            );
        }


        /* ================= SERVER ================= */

        if (
            analysis.category ===
            "server"
        ) {

            return (
                "🖥️ SERVER YARATISH\n\n" +

                (
                    analysis.version
                        ? `🎮 Versiya: ${analysis.version}\n`
                        : "🎮 Versiya: versiya aniqlanmadi\n"
                ) +

                (
                    analysis.mode
                        ? `⚔️ Rejim: ${analysis.mode}\n`
                        : "⚔️ Rejim: rejim aniqlanmadi\n"
                ) +

                "\nAvval server yadrosini tanlaymiz: " +
                "Paper, Spigot yoki Fabric."
            );
        }


        /* ================= RANK ================= */

        if (
            analysis.category ===
            "rank"
        ) {

            return (
                "👑 RANK / PERMISSION\n\n" +

                "Ranklarni boshqarish uchun LuckPerms " +
                "ishlatish mumkin.\n\n" +

                "Masalan:\n" +

                "/lp creategroup Askar\n" +

                "/lp user Player parent set Askar"
            );
        }


        /* ================= MODE ================= */

        if (analysis.mode) {

            const mode =
                knowledge.modes?.modes?.[
                    analysis.mode
                ];


            if (mode) {

                let text =
                    `⚔️ ${mode.name}\n\n`;


                text +=
                    `${mode.description}\n\n`;


                if (
                    Array.isArray(
                        mode.recommended
                    )
                ) {

                    text +=
                        "📦 Tavsiya:\n";


                    mode.recommended.forEach(
                        item => {

                            text +=
                                `• ${item}\n`;
                        }
                    );
                }


                return text;
            }
        }


        /* ================= DEFAULT ================= */

        return (
            "🤖 MineAI savolingni tahlil qildi.\n\n" +

            `🧠 Ishonchlilik: ${analysis.confidence}%\n\n` +

            "Aniqroq javob olish uchun Minecraft " +
            "versiyasi, server rejimi yoki plugin/mod " +
            "nomini yoz."
        );
    }


    return {

        setKnowledge,
        analyze,
        response,

        findPlugin,
        findMod,
        findCommand,
        findError

    };

})();
