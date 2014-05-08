ASSETS_BOT_CARD_DEFINITIONS = 'card_definitions';
ASSETS_BOT_SKILL_DEFINITIONS = 'skill_definitions';
ASSETS_BOT_RUNE_DEFINITIONS = 'rune_definitions';

fmk.factory('AssetsBot', function(CardApi, RuneApi, $cookies) {

  var cardDefs = $cookies[ASSETS_BOT_CARD_DEFINITIONS];
  var skillDefs = $cookies[ASSETS_BOT_SKILL_DEFINITIONS];
  var runeDefs = $cookies[ASSETS_BOT_RUNE_DEFINITIONS];

  function saveCardListAsCardDefs(cardList) {
    cardDefs = {};
    $.each(cardList.Cards, function(index, card) {
      cardDefs[card.CardId] = card;
    });
    $cookies[ASSETS_BOT_CARD_DEFINITIONS] = cardDefs;
  }

  function saveSkillListAsSkillDefs(skillList) {
    skillDefs = {};
    $.each(skillList.Skills, function(index, skill) {
      skillDefs[skill.SkillId] = skill;
    });
    $cookies[ASSETS_BOT_SKILL_DEFINITIONS] = skillDefs;
  }

  function saveRuneListAsRuneDefs(runeList) {
    runeDefs = {};
    $.each(runeList.Runes, function(index, rune) {
      runeDefs[rune.RuneId] = rune;
    });
    $cookies[ASSETS_BOT_RUNE_DEFINITIONS] = runeDefs;
  }

  return {

    getCardDefs: function(callback, ensure) {
      if(!cardDefs || ensure && !cardDefs[ensure]) {
        CardApi.getAllCard(function(cardList) {
          saveCardListAsCardDefs(cardList);
          callback(cardDefs);
        });
      } else
        callback(cardDefs);
    },

    getSkillDefs: function(callback, ensure) {
      if(!skillDefs || ensure && !skillDefs[ensure]) {
        CardApi.getAllSkill(function(skillList) {
          saveSkillListAsSkillDefs(skillList);
          callback(skillDefs);
        });
      } else
        callback(skillDefs);
    },

    getRuneDefs: function(callback, ensure) {
      if(!runeDefs || ensure && !runeDefs[ensure]) {
        RuneApi.getAllRune(function(runeList) {
          saveRuneListAsRuneDefs(runeList);
          callback(runeDefs);
        });
      } else
        callback(runeDefs);
    },

    getMapStageDefs: function(callback, ensure) {

    }

  };

});