{
  "errors": {
    "port": {
      "keywords": [
        "port",
        "address already in use",
        "failed to bind",
        "cannot assign requested address"
      ],
      "cause": "Server ishlatmoqchi bo‘lgan port band bo‘lishi mumkin.",
      "solution": [
        "Boshqa server ishlayotganini tekshir.",
        "server.properties ichidagi server-port qiymatini tekshir.",
        "Serverni qayta ishga tushir."
      ]
    },

    "plugin": {
      "keywords": [
        "could not load plugin",
        "invalid plugin",
        "plugin failed",
        "failed to load plugin"
      ],
      "cause": "Plugin Minecraft server versiyasiga mos kelmasligi yoki fayl noto‘g‘ri bo‘lishi mumkin.",
      "solution": [
        "Plugin versiyasini tekshir.",
        "Server yadrosini tekshir.",
        "Plugin fayli .jar ekanini tekshir.",
        "Console'dagi to‘liq xatoni ko‘rib chiq."
      ]
    },

    "java": {
      "keywords": [
        "unsupportedclassversion",
        "unsupported class version",
        "java version",
        "java.lang"
      ],
      "cause": "Java versiyasi server yoki plugin talab qilayotgan versiyaga mos kelmasligi mumkin.",
      "solution": [
        "Minecraft versiyasiga mos Java versiyasini tekshir.",
        "Server ishga tushirish komandasidagi Java executable'ni tekshir.",
        "Java versiyasini terminalda tekshir."
      ]
    },

    "connection": {
      "keywords": [
        "connection refused",
        "connection timed out",
        "can't connect",
        "cannot connect",
        "timeout"
      ],
      "cause": "Server ishlamayotgan, port yopiq yoki ulanish manzili noto‘g‘ri bo‘lishi mumkin.",
      "solution": [
        "Server console'ni tekshir.",
        "Server ishga tushganini tekshir.",
        "IP va portni tekshir.",
        "Firewall yoki hosting sozlamalarini tekshir."
      ]
    }
  }
}
