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
		{low: 20,  high: 20,  result: "Inferno!", damage: "Deal twice the maximum result of your damage dice. Additionally, the creature is on fire. While the creature is on fire it takes 2d8 fire damage at the start of each of its turns. The creature can end this condition by dropping prone and using 5 feet of movement to roll on the ground.", majorInjury: true}
	];
	
	const forceCritTable =
	[
		{low: 1,  high: 1,  result: "You call that a crit?", damage: "Roll damage as normal."},
		{low: 2,  high: 3,  result: "Spellstruck!", damage: "Roll damage as normal and the creature has disadvantage on saving throws against spells until the end of its next turn."},
		{low: 4,  high: 6,  result: "Good hit!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice."},
		{low: 7,  high: 8,  result: "Eldritch incandescence!", damage: "Roll your damage as normal and spell attack rolls against the creature have advantage until the end of its next turn."},
		{low: 9,  high: 11,  result: "Great hit!", damage: "Roll your damage dice twice and add them together."},
		{low: 12,  high: 13,  result: "Bewitching blow!", damage: "Roll twice as many damage dice as normal and the creature is spellbound until the end of its next turn. While spellbound it makes saving throws against spells with disadvantage and spell attack rolls against it have advantage."},
		{low: 14,  high: 16,  result: "Mystic magnet!", damage: "Roll twice as many damage dice as normal and the creature is spellbound for the next minute. While spellbound it makes saving throws against spells with disadvantage and spell attack rolls against it have advantage. At the end of each of the creature’s turns it can make an Intelligence saving throw (DC 14) to end this effect."},
		{low: 17,  high: 18,  result: "Ensorcelled!", damage: "Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add that result. Additionally, the creature is spellbound for the next minute. While spellbound it makes saving throws against spells with disadvantage and spell attack rolls against it have advantage. At the end of each of the creature’s turns it can make an Intelligence saving throw (DC 16) to end this effect.", minorInjury: true},
		{low: 19,  high: 19,  result: "Arcane injury!", damage: "Deal the twice maximum result of your damage dice.", majorInjury: true},
		{low: 20,  high: 20,  result: "Magically mauled!", damage: "Deal twice the maximum result of your damage dice. Additionally, the creature is spellbound for the next minute. While spellbound it makes saving throws against spells with disadvantage and spell attack rolls against it have advantage. At the end of each of the creature’s turns it can make an Intelligence saving throw (DC 18) to end this effect.", majorInjury: true}
	];
	
	const lightningCritTable =
	[
		{low: 1,  high: 1,  result: "You call that a crit?", damage: "Roll damage as normal."},
		{low: 2,  high: 3,  result: "Shocking!", damage: "Roll damage as normal and the creature cannot use reactions until the end of its next turn."},
		{low: 4,  high: 6,  result: "Good hit!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice."},
		{low: 7,  high: 8,  result: "Sparks fly!", damage: "Roll your damage as normal and you may choose one other creature within 15 ft. of the victim. That creature must succeed on a Dexterity saving throw (DC 14) or take half as much damage."},
		{low: 9,  high: 11,  result: "Great hit!", damage: "Roll your damage dice twice and add them together."},
		{low: 12,  high: 13,  result: "Electric arc!", damage: "Roll twice as many damage dice as normal and you may choose one other creature within 15 ft. of the victim. That creature must succeed on a Dexterity saving throw (DC 18) or take half as much damage."},
		{low: 14,  high: 16,  result: "Fulminate!", damage: "Roll twice as many damage dice as normal. If the creature is wearing metal armor roll it receives a Major Injury. Otherwise, it receives a Minor Injury.", minorInjury: true, majorInjury: true},
		{low: 17,  high: 18,  result: "Lit up!", damage: " Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add that result. The creature and each creature you choose within 15 ft. of it cannot take reactions until the end of their next turn.", minorInjury: true},
		{low: 19,  high: 19,  result: "Electrocuted!", damage: "Deal the twice maximum result of your damage dice.", majorInjury: true},
		{low: 20,  high: 20,  result: "Lightning rod!", damage: "Deal twice the maximum result of your damage dice and you may choose one other creature within 15 ft. of the victim. That creature must succeed on a Dexterity saving throw (DC 20) or take half as much damage.", majorInjury: true}
	];
	
	const necroticCritTable =
	[
		{low: 1,  high: 1,  result: "You call that a crit?", damage: "Roll damage as normal."},
		{low: 2,  high: 3,  result: "Spoil!", damage: "Roll damage as normal and the creature cannot regain hit points until the end of its next turn."},
		{low: 4,  high: 6,  result: "Good hit!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice."},
		{low: 7,  high: 8,  result: "Fester!", damage: "Roll your damage as normal and the creature’s maximum hit points are reduced by the same amount."},
		{low: 9,  high: 11,  result: "Great hit!", damage: "Roll your damage dice twice and add them together."},
		{low: 12,  high: 13,  result: "Decay!", damage: "Roll twice as many damage dice as normal and the creature’s maximum hit points are reduced by the same amount."},
		{low: 14,  high: 16,  result: "Rot!", damage: "Roll twice as many damage dice as normal and the creature cannot regain hit points for the next minute. It may make a saving throw (DC 16) at the end of each of its turns to end this effect."},
		{low: 17,  high: 18,  result: "Blight!", damage: "Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add that result. The creature’s maximum hit points are reduced by the same amount.", minorInjury: true},
		{low: 19,  high: 19,  result: "Atrophy!", damage: "Deal the twice maximum result of your damage dice.", majorInjury: true},
		{low: 20,  high: 20,  result: "Putrefy!", damage: "Deal twice the maximum result of your damage dice, the creature’s maximum hit points are reduced by the same amount, and the creature cannot regain hit points until the end of its next turn.", majorInjury: true}
	];
	
	const poisonCritTable =
	[
		{low: 1,  high: 1,  result: "You call that a crit?", damage: "Roll damage as normal."},
		{low: 2,  high: 3,  result: "Nauseous!", damage: "Roll damage as normal and the creature has disadvantage on its next ability check, attack roll, or saving throw."},
		{low: 4,  high: 6,  result: "Good hit!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice."},
		{low: 7,  high: 8,  result: "Sickened!", damage: "Roll your damage as normal and the creature has disadvantage on all ability checks, attack rolls, and saving throws until the end of its next turn."},
		{low: 9,  high: 11,  result: "Great hit!", damage: "Roll your damage dice twice and add them together."},
		{low: 12,  high: 13,  result: "Poisoned!", damage: "Roll twice as many damage dice as normal and the creature is poisoned for the next minute. The creature may attempt a saving throw at the end of each of its turns (DC 12) to end this effect."},
		{low: 14,  high: 16,  result: "Contaminated!", damage: "Roll twice as many damage dice as normal and the creature is poisoned for the next minute. The creature may attempt a saving throw at the end of each of its turns (DC 16) to end this effect."},
		{low: 17,  high: 18,  result: "Toxic shock!", damage: "Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add that result. The creature is poisoned for the next minute. The creature may attempt a saving throw at the end of each of its turns (DC 12) to end this effect.", minorInjury: true},
		{low: 19,  high: 19,  result: "System failure!", damage: "Deal the twice maximum result of your damage dice.", majorInjury: true},
		{low: 20,  high: 20,  result: "Biological breakdown!", damage: "Deal twice the maximum result of your damage dice and the creature is poisoned for the next minute. The creature may attempt a saving throw at the end of each of its turns (DC 16) to end this effect.", majorInjury: true}
	];
	
	const psychicCritTable =
	[
		{low: 1,  high: 1,  result: "You call that a crit?", damage: "Roll damage as normal."},
		{low: 2,  high: 3,  result: "Disoriented!", damage: " Roll your damage dice as normal and you control the creature’s movement on its next turn."},
		{low: 4,  high: 6,  result: "Good hit!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice."},
		{low: 7,  high: 8,  result: "Confused!", damage: "Roll your damage dice as normal and the creature cannot differentiate friend from foe until the end of its next turn."},
		{low: 9,  high: 11,  result: "Great hit!", damage: "Roll your damage dice twice and add them together."},
		{low: 12,  high: 13,  result: "Dominated!", damage: "Roll twice as many damage dice as normal and you control the creature’s action on its next turn."},
		{low: 14,  high: 16,  result: "Psychological fracture!", damage: "Roll twice as many damage dice as normal and the creature gains a level of madness."},
		{low: 17,  high: 18,  result: "Psychological break!", damage: "Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add that result. Then the creature gains a level of madness. "},
		{low: 19,  high: 19,  result: "Madness!", damage: "Deal the twice maximum result of your damage dice and gain a level of madness."},
		{low: 20,  high: 20,  result: "Mind melt!", damage: "Deal twice the maximum result of your damage dice and gain two levels of madness."}
	];
	
	const radiantCritTable =
	[
		{low: 1,  high: 1,  result: "You call that a crit?", damage: "Roll damage as normal."},
		{low: 2,  high: 3,  result: "Dazzled!", damage: "Roll damage as normal and the creature cannot willingly move closer to you until the end of its next turn."},
		{low: 4,  high: 6,  result: "Good hit!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice."},
		{low: 7,  high: 8,  result: "Disheartening blast!", damage: "Roll your damage as normal and the creature is frightened until the end of its next turn."},
		{low: 9,  high: 11,  result: "Great hit!", damage: "Roll your damage dice twice and add them together."},
		{low: 12,  high: 13,  result: "Awed!", damage: "Roll twice as many damage dice as normal and the creature is frightened until the end of its next turn."},
		{low: 14,  high: 16,  result: "Holy terror!", damage: "Roll twice as many damage dice as normal. Additionally, the creature is frightened for the next minute. It can make a Wisdom saving throw (DC 16) at the end of each of its turns to end this effect.", minorInjury: true},
		{low: 17,  high: 18,  result: "Righteous mark!", damage: " Deal the maximum amount of damage for your normal damage dice then roll your damage dice and add that result, then roll on the minor injury chart. Additionally, the creature glows for the next minute. While glowing it produces bright light up 10 feet and dim light up to 30 feet and all successful attacks against the creature deal an additional 1d4 radiant damage."},
		{low: 19,  high: 19,  result: "Wrath of the gods!", damage: "Deal the twice maximum result of your damage dice.", majorInjury: true},
		{low: 20,  high: 20,  result: "Smote!", damage: "Deal twice the maximum result of your damage dice and the creature glows for the next minute. While glowing it produces bright light up 10 feet and dim light up to 30 feet and all successful attacks against the creature deal an additional 1d6 radiant damage.", majorInjury: true}
	];
	
	const thunderCritTable =
	[
		{low: 1,  high: 1,  result: "You call that a crit?", damage: "Roll damage as normal."},
		{low: 2,  high: 3,  result: "Boom!", damage: "Roll damage as normal and the creature is deafened until the end of its next turn."},
		{low: 4,  high: 6,  result: "Good hit!", damage: "Do not roll your damage dice, instead deal the maximum result possible with those dice."},
		{low: 7,  high: 8,  result: "Ka-boom!", damage: "Roll your damage as normal and the creature is deafened for one minute."},
		{low: 9,  high: 11,  result: "Great hit!", damage: "Roll your damage dice twice and add them together."},
		{low: 12,  high: 13,  result: "Thunder clap!", damage: "Roll twice as many damage dice as normal and the creature is stunned until the start of its next turn and deafened for one minute."},
		{low: 14,  high: 16,  result: "Burst ear drums!", damage: "Roll twice as many damage dice as normal and the creature is deafened permanently.", minorInjury: true},
		{low: 17,  high: 18,  result: "Concussive blast!", damage: "Deal the maximum amount of damage from your normal damage dice then roll your damage dice and add that result. The creature stunned until the end of its next turn and deafened permanently.", minorInjury: true},
		{low: 19,  high: 19,  result: "Wall of sound!", damage: "Deal the twice maximum result of your damage dice.", majorInjury: true},
		{low: 20,  high: 20,  result: "Sonic salvo!", damage: "Deal twice the maximum result of your damage dice, the creature is deafened permanently, and stunned until the end of its next round.", majorInjury: true}
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
				        case 'force':
				            crit = _determineCritical(roll, forceCritTable);
				            break;   
				        case 'lightning':
				            crit = _determineCritical(roll, lightningCritTable);
				            break;
				        case 'necrotic':
				            crit = _determineCritical(roll, necroticCritTable);
				            break;   
			            case 'poison':
				            crit = _determineCritical(roll, poisonCritTable);
				            break;
			            case 'psychic':
				            crit = _determineCritical(roll, psychicCritTable);
				            break;
			            case 'radiant':
				            crit = _determineCritical(roll, radiantCritTable);
				            break;
			            case 'thunder':
				            crit = _determineCritical(roll, thunderCritTable);
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
						sendChat("Critical Hits", "Try !critical followed by bludgeoning, piercing, slashing, acid, cold, fire, force, lightning, necrotic, poison, psychic, radiant, or thunder.");

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
