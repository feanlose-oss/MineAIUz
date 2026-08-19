/* =========================================================
   MineAI CORE v2
   API YO'Q
   Minecraft Server Assistant
   ========================================================= */

const MineAICore = (() => {

    const STOP_WORDS = new Set([
        "menga",
        "kerak",
        "qanday",
        "qanaqa",
        "qilaman",
        "qilsam",
        "uchun",
        "bilan",
        "ber",
        "top",
        "qilib",
        "ochmoqchiman",
        "ochmoqchi",
        "men",
        "bu",
        "shu",
        "ham",
        "va",
        "da",
        "ga",
        "ni"
    ]);

    const MODES = {
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
            "prison",
            "qamoqxona"
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

    const CATEGORIES = {

        map: [
            "map",
            "karta",
            "world",
            "zip",
            "world.zip",
            "lobby map",
            "karta kerak"
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

        server: [
            "server",
            "server och",
            "server yarat"
        ],

        rank: [
            "rank",
            "prefix",
            "permission",
            "huquq"
        ],

        error: [
            "error",
            "xato",
            "ishlamayapti",
            "crash",
            "ochilmayapti",
            "kirmayapti"
        ],

        rtp: [
            "rtp",
            "random teleport",
            "tasodifiy teleport"
        ],

        config: [
            "sozlash",
            "setting",
            "config",
            "server.properties"
        ]
    };

    function normalize(text) {

        return String(text || "")
            .toLowerCase()
            .replace(/[ʻʼ’`]/g, "'")
            .replace(/[.,!?;:()[\]{}]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function tokenize(text) {

        return normalize(text)
            .split(" ")
            .filter(word =>
                word.length >= 2 &&
                !STOP_WORDS.has(word)
            );
    }

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

    function detectMode(text) {

        const q = normalize(text);

        for (const mode in MODES) {

            for (const keyword of MODES[mode]) {

                if (q.includes(keyword)) {
                    return mode;
                }
            }
        }

        return null;
    }

    function detectCategory(text) {

        const q = normalize(text);

        let bestCategory = null;
        let bestScore = 0;

        for (const category in CATEGORIES) {

            let score = 0;

            for (const keyword of CATEGORIES[category]) {

                if (q.includes(keyword)) {
                    score += keyword.length + 2;
                }
            }

            if (score > bestScore) {

                bestScore = score;
                bestCategory = category;
            }
        }

        return bestCategory;
    }

    function detectIntent(text) {

        const q = normalize(text);

        if (
            q.includes("top") ||
            q.includes("qidir") ||
            q.includes("topib ber") ||
            q.includes("yuklab olish") ||
            q.includes("download")
        ) {
            return "search";
        }

        if (
            q.includes("qanday") ||
            q.includes("qanaqa") ||
            q.includes("qilib") ||
            q.includes("sozlash")
        ) {
            return "howto";
        }

        if (
            q.includes("xato") ||
            q.includes("error") ||
            q.includes("ishlamayapti") ||
            q.includes("crash")
        ) {
            return "troubleshoot";
        }

        return "question";
    }

    function extractEntities(text) {

        const q = normalize(text);

        return {
            version: detectVersion(q),
            mode: detectMode(q),
            category: detectCategory(q),
            intent: detectIntent(q),
            tokens: tokenize(q)
        };
    }

    function analyze(text) {

        if (!text || !String(text).trim()) {

            return {
                ok: false,
                message: "Savol bo‘sh."
            };
        }

        const entities = extractEntities(text);

        let confidence = 0;

        if (entities.version) {
            confidence += 25;
        }

        if (entities.mode) {
            confidence += 25;
        }

        if (entities.category) {
            confidence += 25;
        }

        if (entities.intent !== "question") {
            confidence += 15;
        }

        if (entities.tokens.length >= 2) {
            confidence += 10;
        }

        confidence = Math.min(confidence, 100);

        return {
            ok: true,
            question: String(text).trim(),
            confidence,
            ...entities
        };
    }

    function createContext(analysis) {

        const context = [];

        if (analysis.version) {
            context.push(`Minecraft versiyasi: ${analysis.version}`);
        }

        if (analysis.mode) {
            context.push(`Server rejimi: ${analysis.mode}`);
        }

        if (analysis.category) {
            context.push(`Mavzu: ${analysis.category}`);
        }

        if (analysis.intent) {
            context.push(`Maqsad: ${analysis.intent}`);
        }

        return context;
    }

    function response(analysis) {

        if (!analysis.ok) {
            return "Savolingni yoz.";
        }

        const context = createContext(analysis);

        if (analysis.category === "map") {

            let result =
                "🗺️ MAP QIDIRISH SO‘ROVI ANIQLANDI.\n\n";

            if (analysis.version) {
                result +=
                    `🎮 Versiya: ${analysis.version}\n`;
            } else {
                result +=
                    "🎮 Versiya: aniqlanmadi\n";
            }

            if (analysis.mode) {
                result +=
                    `⚔️ Rejim: ${analysis.mode}\n`;
            } else {
                result +=
                    "⚔️ Rejim: aniqlanmadi\n";
            }

            result +=
                "\nKeyingi bosqichda MineAI shu ma'lumotlar asosida internetdan mos maplarni qidiradi.";

            return result;
        }

        if (analysis.category === "plugin") {

            return (
                "🔌 PLUGIN SO‘ROVI ANIQLANDI.\n\n" +
                "MineAI server versiyasi va rejimiga qarab " +
                "kerakli pluginlarni tanlash tizimiga ega bo‘ladi.\n\n" +
                (context.length
                    ? context.join("\n")
                    : "Versiya yoki server rejimini ham yozsang, aniqroq tavsiya beraman.")
            );
        }

        if (analysis.category === "error") {

            return (
                "🐛 SERVER XATOSI ANIQLANDI.\n\n" +
                "Xatoni to‘liq nusxalab yubor. MineAI xatodagi " +
                "muhim qismlarni ajratib, ehtimoliy sabab va yechimni topadi."
            );
        }

        if (analysis.category === "rank") {

            return (
                "👑 RANK / PERMISSION SO‘ROVI.\n\n" +
                "LuckPerms orqali rank, prefix va permissionlarni " +
                "sozlash mumkin.\n\n" +
                "Masalan: Askar → Sarkarda → Qahramon → Afsona."
            );
        }

        if (analysis.category === "server") {

            return (
                "🖥️ SERVER YARATISH SO‘ROVI.\n\n" +
                "Avval Minecraft versiyasi va server rejimini aniqlaymiz.\n\n" +
                "Masalan:\n" +
                "1.21.1 + Anarchy\n" +
                "1.21.1 + Survival\n" +
                "1.21.1 + BoxPvP"
            );
        }

        if (analysis.mode) {

            return (
                `⚔️ ${analysis.mode.toUpperCase()} REJIMI ANIQLANDI.\n\n` +
                "Server uchun kerakli tizimlarni bosqichma-bosqich " +
                "tanlashimiz mumkin.\n\n" +
                "Versiyani ham yozsang, tavsiya aniqroq bo‘ladi."
            );
        }

        return (
            "🤖 MineAI savolingni Minecraft mavzusi sifatida tahlil qildi.\n\n" +
            `Ishonchlilik: ${analysis.confidence}%\n\n` +
            "Minecraft versiyasi, server rejimi yoki kerakli narsani " +
            "aniqroq yozib ko‘r."
        );
    }

    return {
        analyze,
        response,
        extractEntities,
        detectVersion,
        detectMode,
        detectCategory,
        detectIntent
    };

})();
