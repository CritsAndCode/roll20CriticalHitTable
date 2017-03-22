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
		{low: 19,  high: 19,  result: "Crushed!", damage: "Deal the twice maximum result of your damage dice.", majorInjury: true},
		{low: 20,  high: 20,  result: "Splat!", damage: " Deal the maximum result of your damage dice twice, the creature is stunned until the end ofyour next turn.", majorInjury: true}

	];
	
	const piercingCritTable =
	[
		{low: 1,  high: 1,  result: "You call that a crit?", damage: "Roll damage as normal."},
		{low: 2,  high: 3,  result: "Lunge and thrust!", damage: "Roll damage dice twice and use the higher result."},
		{low: 4,  high: 6,  result: "Good hit!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice."},
		{low: 7,  high: 8,  result: "Stabbed!", damage: "Roll your damage dice twice and add them together."},
		{low: 9,  high: 11,  result: "Great hit!", damage: "Roll your damage dice twice and add them together."},
		{low: 12,  high: 13,  result: "Swiss cheese!", damage: "Roll twice as many damage dice as normal.", minorInjury: true},
		{low: 14,  high: 16,  result: "Punctured!", damage: "Roll twice as many damage dice as normal.", minorInjury: true},
		{low: 17,  high: 18,  result: "Cruel prick!", damage: "Roll your damage dice twice and add them together and roll on the major injury chart.", majorInjury: true},
		{low: 19,  high: 19,  result: "Run through!", damage: "Deal the twice maximum result of your damage dice.", majorInjury: true},
		{low: 20,  high: 20,  result: "Splat!", damage: "Deal the twice maximum result of your damage dice.", minorInjury: true, majorInjury: true}
	];
	
	const slashingCritTable =
	[
		{low: 1,  high: 1,  result: "You call that a crit?", damage: "Roll damage as normal."},
		{low: 2,  high: 3,  result: "Sliced and diced!", damage: "Roll damage as normal and the creature loses 1d6 hit points at the start of its next turn."},
		{low: 4,  high: 6,  result: "Good hit!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice."},
		{low: 7,  high: 8,  result: "Open gash!", damage: "Roll your damage dice as normal and the creature is bleeding. For the next minute the creature loses 1d4 damage at the start of each of its turns until it uses an action to staunch this wound."},
		{low: 9,  high: 11,  result: "Great hit!", damage: "Roll your damage dice twice and add them together."},
		{low: 12,  high: 13,  result: "Deep slice!", damage: "Roll your damage dice twice and add them together and the creature is bleeding. For the next minute the creature loses 1d8 hit points at the start of each of its turns until it uses an action to staunch this wound."},
		{low: 14,  high: 16,  result: "Lacerated!", damage: "Roll your damage dice twice and add them together and the creature is bleeding. For the next minute the creature loses 1d12 hit points at the start of each of its turns until it uses an action to staunch this wound."},
		{low: 17,  high: 18,  result: "Severed!", damage: "Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add the result. If the creature is wearing light or no armor they take a Major Injury. Otherwise they take a Minor Injury.", minorInjury: true, majorInjury: true},
		{low: 19,  high: 19,  result: "Dissected!", damage: "Deal the twice maximum result of your damage dice.", majorInjury: true},
		{low: 20,  high: 20,  result: "Slash!", damage: "Deal the twice maximum result of your damage dice. For the next minute the creature loses 2d8 hit points at the start of each of its turns until it uses an action to staunch this wound.", majorInjury: true}
	];
	
	const acidCritTable =
	[
		{low: 1,  high: 1,  result: "You call that a crit?", damage: "Roll damage as normal."},
		{low: 2,  high: 3,  result: "Scalding bile!", damage: " Roll damage as normal and the creature is scarred. While scarred the creature has disadvantage on all Charisma ability checks except Charisma (Intimidation). Being scarred can be removed with the spell lesser restoration."},
		{low: 4,  high: 6,  result: "Good hit!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice."},
		{low: 7,  high: 8,  result: "Melted flesh!", damage: " Roll your damage as normal and the creature is disfigured. While disfigured the creature has disadvantage on all Charisma ability checks except Charisma (Intimidation). Being disfigured can be removed with the spell greater restoration."},
		{low: 9,  high: 11,  result: "Great hit!", damage: "Roll your damage dice twice and add them together."},
		{low: 12,  high: 13,  result: "Boiling flesh!", damage: " Roll twice as many damage dice as normal and if the creature is wearing armor its AC modifier is reduced by 1 until it can be repaired (for 1/4th the price of new armor of the same type) or cleaned (if the armor is magical). If the creature is not wearing armor, it receives a Minor Injury.", minorInjury: true},
		{low: 14,  high: 16,  result: "Horrific mutilation!", damage: "Roll twice as many damage dice as normal and roll on the minor injury chart. Additionally, the creature is disfigured. While disfigured the creature has disadvantage on all Charisma ability checks except Charisma (Intimidation). Being disfigured can be removed with the spell greater restoration."},
		{low: 17,  high: 18,  result: "Caustic trauma!", damage: " Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add that result. If the creature is wearing armor, it receives a minor injury and its AC modifier is reduced by 2 until it can be repaired (for half the price of new armor of the same type) or cleaned (if the armor is magical). If the creature is not wearing armor, it receives a major injury.", minorInjury: true, majorInjury: true},
		{low: 19,  high: 19,  result: "Vitriolic!", damage: "Deal the twice maximum result of your damage dice.", majorInjury: true},
		{low: 20,  high: 20,  result: "Acid bath!", damage: " Deal twice the maximum result of your damage dice. If the creature is wearing armor, the armor is destroyed (if non-magical) or rendered useless until cleaned during a long rest (if magical). If the creature is not wearing armor, the creature is disfigured. While disfigured the creature has disadvantage on all Charisma ability checks except Charisma (Intimidation). Being disfigured can be removed with the spell greater restoration.", majorInjury: true}
	];
	
	const coldCritTable =
	[
		{low: 1,  high: 1,  result: "You call that a crit?", damage: "Roll damage as normal."},
		{low: 2,  high: 3,  result: "Chills!", damage: "Roll damage as normal and the creature may only move half its movement speed on its next turn."},
		{low: 4,  high: 6,  result: "Good hit!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice."},
		{low: 7,  high: 8,  result: "Frosty!", damage: "Roll your damage as normal and the creature’s movement speed is 0 until the end of its next turn"},
		{low: 9,  high: 11,  result: "Great hit!", damage: "Roll your damage dice twice and add them together."},
		{low: 12,  high: 13,  result: "Freezing!", damage: "Roll twice as many damage dice as normal and the creature is paralyzed until the end of its next turn."},
		{low: 14,  high: 16,  result: "Frozen!", damage: " Roll twice as many damage dice as normal and the creature is paralyzed until the end of its next turn. If the creature takes damage before the end of its next turn, it receives a Minor Injury.", minorInjury: true},
		{low: 17,  high: 18,  result: "Ice block!", damage: "Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add that result. The creature is paralyzed until the end of its next turn.", minorInjury: true},
		{low: 19,  high: 19,  result: "Glacial!", damage: "Deal the twice maximum result of your damage dice.", majorInjury: true},
		{low: 20,  high: 20,  result: "Subzero!", damage: "Deal twice the maximum result of your damage dice and the creature is paralyzed for the next minute. The creature may attempt a saving throw at the end of each of its turns (DC 16) to end this effect. If it fails this saving throw three times it is frozen solid and becomes a petrified but frozen solid in a block of ice rather than turned to stone.", majorInjury: true}
	];
	
	const fireCritTable =
	[
		{low: 1,  high: 1,  result: "You call that a crit?", damage: "Roll damage as normal."},
		{low: 2,  high: 3,  result: "Heat wave!", damage: "Roll damage as normal and attack rolls for attacks that deal fire damage have advantage when made against the creature until the end of its next turn."},
		{low: 4,  high: 6,  result: "Good hit!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice."},
		{low: 7,  high: 8,  result: "Hot flash!", damage: "Roll your damage as normal and the creature is on fire. While the creature is on fire it takes 2d4 fire damage at the start of each of its turns. The creature can end this condition by dropping prone and using 5 feet of movement to roll on the ground."},
		{low: 9,  high: 11,  result: "Great hit!", damage: "Roll your damage dice twice and add them together."},
		{low: 12,  high: 13,  result: "Ablaze!", damage: "Roll twice as many damage dice as normal and the creature is on fire. While the creature is on fire it takes 2d6 fire damage at the start of each of its turns. The creature can end this condition by dropping prone and using 5 feet of movement to roll on the ground."},
		{low: 14,  high: 16,  result: "Burnt to a crisp!", damage: "Roll twice as many damage dice as normal and the creature is charred. If the creature has resistance to fire, it loses that resistance. If the creature does not have resistance to fire, it gains vulnerability to fire. Both of these effects can be ended by lesser restoration or it completes the recuperate downtime activity."},
		{low: 17,  high: 18,  result: "Hellfire!", damage: "Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add that result then roll on the minor injury chart. Additionally, the creature is on fire. While the creature is on fire it takes 2d6 fire damage at the start of each of its turns. The creature can end this condition by dropping prone and using 5 feet of movement to roll on the ground."},
		{low: 19,  high: 19,  result: "Combustion!", damage: "Deal the twice maximum result of your damage dice.", majorInjury: true},
		{low: 20,  high: 20,  result: "Inferno!", damage: "Deal twice the maximum result of your damage dice and roll on the major injury chart. Additionally, the creature is on fire. While the creature is on fire it takes 2d8 fire damage at the start of each of its turns. The creature can end this condition by dropping prone and using 5 feet of movement to roll on the ground."}
	];
	
	const minorInjuryTable = 
	[
	    {low: 1,  high: 3,  result: "Injured leg!", damage: "The creature’s movement speed is reduced by 10 ft until healed by lesser restoration or it completes the recuperate downtime activity."},
	    {low: 4,  high: 8,  result: "Injured arm!", damage: "One of the creature's arms cannot be used to hold a shield and the creature has disadvantage on any rolls involving the use of that arm until healed by lesser restoration or it completes the recuperate downtime activity."},
	    {low: 9,  high: 11,  result: "Multiple injuries!", damage: "The creature’s maximum hit points are reduced by an amount equivalent to half of the damage dealt by the attack until healed by lesser restoration or it completes the recuperate downtime activity."},
	    {low: 12,  high: 16,  result: "Badly beaten!", damage: "The creature has disadvantage on Constitution saving throws until healed by lesser restoration or it completes the recuperate downtime activity."},
	    {low: 17,  high: 19,  result: "Ringing blow!", damage: "The creature is stunned turn and deafened until healed by lesser restoration or it completes the recuperate downtime activity."},
	    {low: 20,  high: 20,  result: "Blow to the head!", damage: "The creature is unconscious for " + randomInteger(24) + " hours."},
	]
	
	const majorInjuryTable = 
	[
	    {low: 1,  high: 3,  result: "Crippled leg!", damage: "The creature’s movement speed is reduced by 10 feet and it has disadvantage on Dexterity saving throws until healed by greater restoration."},
	    {low: 4,  high: 8,  result: "Crippled arm!", damage: "One of the creature's arms cannot be used to hold a shield and the creature has disadvantage on any rolls involving the use of that arm until healed by greater restoration."},
	    {low: 9,  high: 11,  result: "Severely wounded!", damage: "The creature’s maximum hit points are reduced by an amount equivalent to the damage dealt by the attack until healed by greater restoration."},
	    {low: 12,  high: 16,  result: "Edge of death!", damage: "The creature has disadvantage on Constitution and death saving throws until healed by greater restoration."},
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
			            case 'piercing':
				            crit = _determineCritical(roll, piercingCritTable);
				            break;
			            case 'slashing':
				            crit = _determineCritical(roll, slashingCritTable);
				            break;
			            case 'acid':
				            crit = _determineCritical(roll, acidCritTable);
				            break;
			            case 'cold':
				            crit = _determineCritical(roll, coldCritTable);
				            break;
			            case 'fire':
				            crit = _determineCritical(roll, fireCritTable);
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
