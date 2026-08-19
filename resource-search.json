const MineAIResourceSearch = (() => {

    function detectType(question) {

        const q = question.toLowerCase();

        if (
            q.includes("map") ||
            q.includes("karta") ||
            q.includes("world") ||
            q.includes("zip") ||
            q.includes("lobby") ||
            q.includes("hub")
        ) {
            return "map";
        }

        if (
            q.includes("plugin") ||
            q.includes("plagin")
        ) {
            return "plugin";
        }

        if (
            q.includes("mod") ||
            q.includes("modlar")
        ) {
            return "mod";
        }

        if (
            q.includes("shader") ||
            q.includes("shaders")
        ) {
            return "shader";
        }

        return "unknown";
    }


    function buildQuery(question, analysis) {

        let query = "Minecraft";

        if (analysis.version) {
            query += " " + analysis.version;
        }

        if (analysis.mode) {
            query += " " + analysis.mode;
        }

        query += " " + question;

        return query;
    }


    function search(question, analysis) {

        const type =
            detectType(question);

        const query =
            buildQuery(
                question,
                analysis
            );

        const encoded =
            encodeURIComponent(query);


        const results = [];


        if (type === "map") {

            results.push({
                name: "Planet Minecraft",
                description: "Minecraft map va worldlar",
                url:
                    "https://www.planetminecraft.com/projects/"
            });

            results.push({
                name: "Modrinth",
                description: "Minecraft projectlar",
                url:
                    "https://modrinth.com/"
            });

        }


        else if (type === "plugin") {

            results.push({
                name: "Modrinth",
                description: "Minecraft pluginlar",
                url:
                    "https://modrinth.com/plugins"
            });

        }


        else if (type === "mod") {

            results.push({
                name: "Modrinth",
                description: "Minecraft modlar",
                url:
                    "https://modrinth.com/mods"
            });

        }


        else if (type === "shader") {

            results.push({
                name: "Modrinth",
                description: "Minecraft shaderlar",
                url:
                    "https://modrinth.com/shaders"
            });

        }


        results.push({
            name: "Google qidiruvi",
            description: "Internet orqali qo'shimcha qidiruv",
            url:
                "https://www.google.com/search?q=" +
                encoded
        });


        return {
            type,
            query,
            results
        };
    }


    return {
        search
    };

})();
