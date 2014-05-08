ASSETS_BOT_CARD_DEFINITIONS = 'card_definitions';
ASSETS_BOT_SKILL_DEFINITIONS = 'skill_definitions';
ASSETS_BOT_RUNE_DEFINITIONS = 'rune_definitions';
ASSETS_BOT_MAPSTAGE_DEFINITIONS = 'mapstage_definitions';

fmk.factory('AssetsBot', function(CardApi, MapstageApi, RuneApi, StorageService) {

  var cardDefs = StorageService.getObject(ASSETS_BOT_CARD_DEFINITIONS);
  var skillDefs = StorageService.getObject(ASSETS_BOT_SKILL_DEFINITIONS);
  var runeDefs = StorageService.getObject(ASSETS_BOT_RUNE_DEFINITIONS);
  var mapstageDefs = StorageService.getObject(ASSETS_BOT_MAPSTAGE_DEFINITIONS);

  function saveCardDefs(cardList) {
    cardDefs = {};
    $.each(cardList.Cards, function(index, card) {
      cardDefs[card.CardId] = card;
    });
    StorageService.setObject(ASSETS_BOT_CARD_DEFINITIONS, cardDefs);
  }

  function saveSkillDefs(skillList) {
    skillDefs = {};
    $.each(skillList.Skills, function(index, skill) {
      skillDefs[skill.SkillId] = skill;
    });
    StorageService.setObject(ASSETS_BOT_SKILL_DEFINITIONS, skillDefs);
  }

  function saveRuneDefs(runeList) {
    runeDefs = {};
    $.each(runeList.Runes, function(index, rune) {
      runeDefs[rune.RuneId] = rune;
    });
    StorageService.setObject(ASSETS_BOT_RUNE_DEFINITIONS, runeDefs);
  }

  function saveMapstageDefs(mapstageList) {
    mapstageDefs = {};
    $.each(mapstageList, function(index, mapstage) {
      mapstageDefs[mapstage.MapStageId] = mapstage;
    });
    StorageService.setObject(ASSETS_BOT_RUNE_DEFINITIONS, mapstageDefs);
  }

  return {

    getCardDefs: function(callback, ensure) {
      if(!cardDefs || ensure && !cardDefs[ensure]) {
        CardApi.getAllCard(function(cardList) {
          saveCardDefs(cardList);
          if(callback)
            callback(cardDefs);
        });
      } else
        callback(cardDefs);
    },

    getSkillDefs: function(callback, ensure) {
      if(!skillDefs || ensure && !skillDefs[ensure]) {
        CardApi.getAllSkill(function(skillList) {
          saveSkillDefs(skillList);
          if(callback)
            callback(skillDefs);
        });
      } else if(callback)
        callback(skillDefs);
    },

    getRuneDefs: function(callback, ensure) {
      if(!runeDefs || ensure && !runeDefs[ensure]) {
        RuneApi.getAllRune(function(runeList) {
          saveRuneDefs(runeList);
          if(callback)
            callback(runeDefs);
        });
      } else if(callback)
        callback(runeDefs);
    },

    getMapstageDefs: function(callback) {
      if(!mapstageDefs) {
        MapstageApi.getMapStageALL(function(mapstageList) {
          saveMapstageDefs(mapstageList);
          if(callback)
            callback(mapstageDefs);
        });
      } else if(callback)
        callback(mapstageDefs);
    }

  };

});