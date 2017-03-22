var Critical = (function()
{
	'use strict';

	const bludgeoningCritTable =
	[
		{low: 1,  high: 1,  result: "You call that a crit?", damage: "Roll damage as normal."},
		{low: 2,  high: 3,  result: "Smashed off balance!", damage: "Roll damage as normal and the next attack against the creature has advantage."},
		{low: 4,  high: 6,  result: "Good hit!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice."},
		{low: 7,  high: 8,  result: "Sent reeling!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice and push the creature up to 15 feet in any direction."},
		{low: 9,  high: 11,  result: "Great hit!", damage: "Roll your damage dice twice and add them together."},
		{low: 12,  high: 13,  result: "Take a seat!", damage: "Roll damage dice twice and add them together and the creature is knocked prone."},
		{low: 14,  high: 16,  result: "Rocked and rolled!", damage: "Roll damage dice twice and add them together, push the creature up to 15 feet away, and the creature is knocked prone."},
		{low: 17,  high: 18,  result: "Grievous injury!", damage: "Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add the result. If the creature is wearing heavy armor they take a Major Injury. Otherwise they take a Minor Injury.", minorInjury: true, majorInjury: true},
		{low: 19,  high: 19,  result: "Crushed!", damage: "Deal the twice maximum result of your damage dice and roll.", majorInjury: true},
		{low: 20,  high: 20,  result: "Splat!", damage: " Deal the maximum result of your damage dice twice, the creature is stunned until the end ofyour next turn.", majorInjury: true}

	];
	
	const minorInjuryTable = 
	[
	    {low: 1,  high: 3,  result: "Injured leg!", damage: "The creature’s movement speed is reduced by 10 ft until it completes the recuperate downtime activity."},
	    {low: 4,  high: 8,  result: "Injured arm!", damage: "The creature's " + randomInteger(2) === 1 ? "right" : "left" + " arm cannot be used to hold a shield and the creature has disadvantage on any rolls involving the use of that arm until it completes the recuperate downtime activity."},
	    {low: 9,  high: 11,  result: "Multiple injuries!", damage: "The creature’s maximum hit points are reduced by an amount equivalent to half of the damage dealt by the attack until it completes the recuperate downtime activity."},
	    {low: 12,  high: 16,  result: "Badly beaten!", damage: "The creature has disadvantage on Constitution saving throws until it completes the recuperate downtime activity."},
	    {low: 17,  high: 19,  result: "Ringing blow!", damage: "The creature is stunned turn and deafened until it completes the recuperate downtime activity."},
	    {low: 20,  high: 20,  result: "Blow to the head!", damage: "The creature is unconscious for " + randomInteger(24) + " hours."},
	]
	
	const majorInjuryTable = 
	[
	    {low: 1,  high: 3,  result: "Crippled leg!", damage: " The creature’s movement speed is reduced by 10 feet and it has disadvantage on Dexterity saving throws until it completes the recuperate downtime activity."},
	    {low: 4,  high: 8,  result: "Crippled arm!", damage: "The creature's " + randomInteger(2) === 1 ? "right" : "left" + " arm cannot be used to hold a shield and the creature has disadvantage on any rolls involving the use of that arm."},
	    {low: 9,  high: 11,  result: "Severely wounded!", damage: " The creature’s maximum hit points are reduced by an amount equivalent to the damage dealt by the attack until it completes the recuperate downtime activity."},
	    {low: 12,  high: 16,  result: "Edge of death!", damage: "The creature has disadvantage on Constitution and death saving throws."},
	    {low: 17,  high: 19,  result: "My eyes!", damage: "The creature is blinded."},
	    {low: 20,  high: 20,  result: "Decapitated!", damage: "The creature is dead."},
	]
	
	function getMinorInjury() {
	    // Use _.find to figure out what happened.
		return _.find(criticalTable, function (hit)
		{
			return (roll >= hit.low && roll <= hit.high);
		});
	}
	
	function getMajorInjury() {
	    
	}

	function registerEventHandlers()
	{
		on('chat:message', Critical.handleChatMessage);
	}

	/**
	 * Grab chat message objects
	 *
	 * @param {object} msg
	 */
	function handleChatMessage(msg)
	{

		// Check if we are dealing with a !critical command.
		if (msg.type === "api" && msg.content.indexOf("!critical") !== -1)
		{
			var content = msg.content;
			var words = content.split(' ');

			if (words.length > 0 && words[0] === '!critical')
			{
			    var roll = randomInteger(20),
			        crit = null;
				// Was a roll amount given? If so parse the second "word" as an int, otherwise create a randomInteger.
				if (words.length === 2)
				{
				    switch(words[1].toLowerCase()) {
				        case 'bludgeoning':
				            crit = _determineCritical(roll, bludgeoningCritTable);
				            break;
				    }
				    
				    if (crit) {
				        var damageType = words[1].charAt(0).toUpperCase() + words[1].slice(1);
				        sendCritMessage(damageType, crit);
				    } else {
				        sendChat("Critical Hits", "That is not a valid damage type. Try bludgeoning, piercing, slashing, acid, cold, fire, force, lightning, necrotic, poison, psychic, radiant, or thunder.");
				    }
				}
				else
				{
					//dropdown of damage types
				}
			}
		}
	}

	/**
	 * Internal function given the roll value returns the object indicating the result and effect.
	 *
	 * @param {int} roll
	 * @return {object} smack
	 * @private
	 */
	function _determineCritical(roll, criticalTable)
	{
		// Use _.find to figure out what happened.
		return _.find(criticalTable, function (hit)
		{
			return (roll >= hit.low && roll <= hit.high);
		});
	}


    function sendCritMessage(damageType, crit) {
        var message = "&{template:5e-shaped} {{title=Critical Hit!}} {{subheader=" + damageType + "}} {{emote=" + crit.result + "}} {{text=" + crit.damage + "}}";
        var injuryRoll = randomInteger(20);
        
        if (crit.minorInjury) {
            var minorInjury = _determineCritical(injuryRoll, minorInjuryTable)
            message = message.concat("{{Minor Injury = " + minorInjury.result + " " + minorInjury.damage + "}}");
        }
        
        if (crit.majorInjury) {
            var majorInjury = _determineCritical(injuryRoll, majorInjuryTable)
            message = message.concat("{{Major Injury =" + majorInjury.result + " " + majorInjury.damage  + "}}");
        }
        
        sendChat("", message);
    }
	return {
		registerEventHandlers: registerEventHandlers,
		handleChatMessage: handleChatMessage,
		_determineCritical: _determineCritical
		}
}());

/**
 * Fires when the page has loaded.
 */
on("ready", function()
{
	Critical.registerEventHandlers();
});
