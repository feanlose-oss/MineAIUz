const MineAIKnowledge = {

    data: {},

    async load() {

        const files = [
            "server",
            "plugins",
            "modes",
            "mods",
            "commands",
            "errors"
        ];


        for (const file of files) {

            try {

                const response =
                    await fetch(
                        `knowledge/${file}.json`
                    );


                if (!response.ok) {

                    console.warn(
                        `⚠️ ${file}.json topilmadi`
                    );

                    continue;
                }


                this.data[file] =
                    await response.json();

            } catch (error) {

                console.error(
                    `❌ ${file}.json xatosi`,
                    error
                );
            }
        }


        /*
           JSON ma'lumotlarini
           AI Core'ga beramiz.
        */

        if (
            typeof MineAICore !==
            "undefined"
        ) {

            MineAICore.setKnowledge(
                this.data
            );

        }


        console.log(
            "🧠 MineAI Knowledge Base tayyor!",
            this.data
        );


        return this.data;
    }

};
