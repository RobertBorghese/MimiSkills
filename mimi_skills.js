// ** Skills **
// The skills that users can use.
const Skills = {};

function MakeSkill(name, type, finable, frequency, priority, color, title, desc, code, conditionCode) {
	return {
		Name: name,
		Type: type,
		Findable: finable,
		Frequency: frequency,
		Priority: priority,
		Color: color,
		Title: title,
		Desc: desc,
		Code: code,
		Condition: conditionCode
	}
}

function RemoveSkill(Skills, SkillName) {
	for(let i = 0; i < Skills.length; i++) {
		if(Skills[i] === SkillName) {
			Skills.splice(i, 1);
			break;
		}
	}
	return Skills;
};

Skills["attack"] = MakeSkill("🔘", 0, false, 100, 0, 0xb0b0b0,
	"Attack", "Deals 1 heart of damage to the opponent.",
	function(User, Target) {
		const Damage = 2;
		return {
			Message: User.Name + " attacked.",
			Damage: Damage
		};
	});

Skills["dummywait"] = MakeSkill("🔘", 0, false, 100, 0, 0xb0b0b0,
	"Dummy Wait", "Does nothing.",
	function(User, Target) {
		const Messages = ["did nothing.", "is just vibin.", "is still standing.", "is happy for you.", "loves you unconditionally.", "cares for you.", "wants you to do your best.", "is happy you're trying your best.", "is having a good time."];
		return {
			Message: User.Name + " " + Messages[Math.floor(Math.random() * Messages.length)],
			Damage: 0
		};
	});

Skills["spell"] = MakeSkill("🧹", 0, true, 50, 0, 0xb0b0b0,
	"Elemental Spell", "Deals 1 heart of elemental damage to the opponent.\nThe element used is the user's Combat Element.",
	function(User, Target) {
		const Damage = 2;
		return {
			Message: User.Name + " cast a " + User.Element.Name + " spell.",
			Damage: Damage,
			Element: User.Element
		};
	});

Skills["slash"] = MakeSkill("✂️", 0, true, 30, 0, 0x8f6868,
	"Slash", "Deals 1.5 hearts of neutral damage to the opponent.",
	function(User, Target) {
		const Damage = 3;
		return {
			Message: User.Name + " slashed.",
			Damage: Damage,
			Element: Elements["neutral"]
		};
	});

Skills["charge"] = MakeSkill("💨", 0, true, 50, 0, 0x8f6868,
	"Charge", "Deals 2 hearts of neutral damage to the opponent. However, there is a 30% it will miss and the user will take 1 heart of neutral damage to the user.",
	function(User, Target) {
		const Damage = 3;
		if(Math.random() < 0.3) {
			return {
				Message: User.Name + " charged! They missed " + Target.Name + " and crashed!",
				UserDamage: 2
			}
		}
		return {
			Message: User.Name + " charged! They hit " + Target.Name + "!",
			Damage: 4,
			Element: Elements["neutral"]
		};
	});

Skills["criticalstrike"] = MakeSkill("🪓", 0, true, 20, 0, 0xbdbdbd,
	"Critical Strike", "Deals 2 hearts of neutral damage to the opponent.",
	function(User, Target) {
		const Damage = 4;
		return {
			Message: User.Name + " struck a critical blow!",
			Damage: Damage,
			Element: Elements["neutral"]
		};
	});

Skills["rarepunch"] = MakeSkill("✊", 0, true, 5, 0, 0xad851d,
	"Rare Punch", "Deals 3 hearts of neutral damage to the opponent, but rarely happens.",
	function(User, Target) {
		const Damage = 6;
		return {
			Message: User.Name + " unleashed the rarest of punches!",
			Damage: Damage,
			Element: Elements["neutral"]
		};
	});

Skills["randomsmack"] = MakeSkill("🎲", 0, true, 70, 0, 0x42e9f5,
	"Random Smack", "Randomly deals between 0 to 2 hearts of neutral damage to the opponent.",
	function(User, Target) {
		const Damage = Math.floor(Math.random() * 5);
		return {
			Message: User.Name + " smacked out some random damage." + (Damage === 0 ? " Unfortunately, no damage was dealt." : ""),
			Damage: Damage,
			Element: Elements["neutral"]
		};
	});

Skills["superioritycomplex"] = MakeSkill("⬆️", 0, true, 75, 0, 0x26d17e,
	"Superiority Complex", "Deals 1.5 hearts of neutral damage if the user's HP is greater than the target's. Otherwise, the damage dealt will be 0.5 hearts.",
	function(User, Target) {
		const HpGreater = User.HP > Target.HP;
		const Damage = HpGreater ? 3 : 1;
		return {
			Message: HpGreater ? (User.Name + "'s superiority inflicted 1.5 hearts of damage.") : (User.Name + "'s superiority was questioned, inflicting only half a heart of damage."),
			Damage: Damage,
			Element: Elements["neutral"]
		};
	});

Skills["inferioritycomplex"] = MakeSkill("⤵️", 0, true, 75, 0, 0xd12659,
	"Inferiority Complex", "Deals 1.5 hearts of neutral damage if the user's HP is less than the target's. Otherwise, the damage dealt will be 0.5 hearts.",
	function(User, Target) {
		const HpLess = User.HP < Target.HP;
		const Damage = HpLess ? 3 : 1;
		return {
			Message: HpLess ? (User.Name + "'s inferiority inflicted 1.5 hearts of damage.") : (User.Name + "'s inferiority was questioned, inflicting only half a heart of damage."),
			Damage: Damage,
			Element: Elements["neutral"]
		};
	});

Skills["equalitykiller"] = MakeSkill("🍄", 0, true, 50, 0, 0x8082ff,
	"Equality Killer", "Deals 3 hearts of damage if the user's HP is the same as the target's. Otherwise, the damage dealt will be 0.5 hearts.",
	function(User, Target) {
		const HpEqual = User.HP === Target.HP;
		const Damage = HpEqual ? 6 : 1;
		return {
			Message: HpEqual ? (User.Name + "'s broke the HP equality and eliminated 3 of " + Target.Name + "'s hearts.") : (User.Name + "'s HP was not equal; only half a heart of damage was inflicted."),
			Damage: Damage,
			Element: Elements["neutral"]
		};
	});

Skills["instantsnap"] = MakeSkill("👌", 0, true, 2, 0, 0xffffff,
	"Instant Snap", "Deals 10 hearts of neutral damage to the opponent. It will be used as frequently as one may win the lottery.",
	function(User, Target) {
		const Damage = 20;
		return {
			Message: User.Name + " snapped their fingers!",
			Damage: Damage,
			Element: Elements["neutral"]
		};
	});

const CommonElementalDesc = "Deals either 1 heart of [element] damage to the opponent. If the user's element is [element], the skill will be powered up and do 2 hearts of damage.";

Skills["firebolt"] = MakeSkill("🔥", 0, true, 50, 0, 0xf56642,
	"Fire Bolt", CommonElementalDesc.replaceAll("[element]", "fire"),
	function(User, Target) {
		const IsFire = User.Element.Name === "Fire";
		const Damage = IsFire ? 4 : 2;
		return {
			Message: User.Name + " blasted a fire-bolt!" + (IsFire ? " It was powered up!" : ""),
			Damage: Damage,
			Element: Elements["fire"]
		};
	});

Skills["waterfall"] = MakeSkill("💧", 0, true, 50, 0, 0x4290f5,
	"Water Fall", CommonElementalDesc.replaceAll("[element]", "water"),
	function(User, Target) {
		const IsWater = User.Element.Name === "Water";
		const Damage = IsWater ? 4 : 2;
		return {
			Message: User.Name + " summoned a water fall!" + (IsWater ? " It was powered up!" : ""),
			Damage: Damage,
			Element: Elements["water"]
		};
	});

Skills["icecube"] = MakeSkill("🧊", 0, true, 50, 0, 0x42e9f5,
	"Ice Cube", CommonElementalDesc.replaceAll("[element]", "ice"),
	function(User, Target) {
		const IsIce = User.Element.Name === "Ice";
		const Damage = IsIce ? 4 : 2;
		return {
			Message: User.Name + " chucked an ice cube!" + (IsIce ? " It was powered up!" : ""),
			Damage: Damage,
			Element: Elements["ice"]
		};
	});

Skills["triblast"] = MakeSkill("🚦", 0, true, 40, 0, 0x42e9f5,
	"Tri-Blast", "Deals 1 heart of damage to the opponent. The element is randomly chosen between fire, water, or ice.",
	function(User, Target) {
		const Val = Math.floor(Math.random() * 3);
		const ElementName = Val === 0 ? "fire" : (Val === 1 ? "water" : "ice");
		const Element = Elements[ElementName];
		const Damage = 2;
		return {
			Message: User.Name + " used tri-attack; it's " + (Val === 2 ? "an" : "a") + " " + ElementName + " attack!",
			Damage: Damage,
			Element: Element
		};
	});

Skills["explosion"] = MakeSkill("💥", 0, true, 35, 0, 0xf56642,
	"Explosion", "Blows up the opponent and deals 2 hearts of fire damage to them. The user will be forced to skip their next turn, however.",
	function(User, Target) {
		const Damage = 4;
		User.Skills.push("explosioncooldown");
		return {
			Message: User.Name + " exploded!",
			Damage: Damage,
			Element: Elements["fire"]
		};
	});

Skills["explosioncooldown"] = MakeSkill("💥", 0, false, 1000, 0, 0xf56642,
	"Explosion Cooldown", "Forces the user to do nothing in order to recover from using the explosion skill.",
	function(User, Target) {
		const Damage = 4;
		User.Skills = RemoveSkill(User.Skills, "explosioncooldown");
		return {
			Message: User.Name + " took a rest after using Explosion.",
			Damage: 0,
			Element: Elements["neutral"]
		};
	});

Skills["tsunami"] = MakeSkill("🌊", 0, true, 50, 0, 0x4c7ab5,
	"Tsunami", "Calls upon increasingly powerful waves. Deals 1 heart of water damage to the opponent; however, the damage is increased by 0.5 hearts each time the skill is used (resets each battle).",
	function(User, Target) {
		if(!User._TsunamiPower) User._TsunamiPower = 0;
		const Damage = 2 + User._TsunamiPower;
		User._TsunamiPower++;
		const Messages = ["It's normal size.", "It's pretty big.", "It's massive!", "It's destructively huge!", "It's unstoppable!!"];
		return {
			Message: User.Name + " manifested a tsunami! " + Messages[Math.min(User._TsunamiPower - 1, Messages.length - 1)],
			Damage: Damage,
			Element: Elements["water"]
		};
	});

Skills["snowball"] = MakeSkill("❄️", 0, true, 95, 0, 0xb4ecf0,
	"Snow Ball", "Throws a snowball with a surprise inside. Deals 1 heart of ice damage to the opponent. Happens more frequently than most active skills.",
	function(User, Target) {
		const Damage = 2;
		const PossibleMessages = ["There was a rock in it!", "It had a knife inside!", "It was rock hard!", "It contained boiling hot soup!", "Well... it was more like an icicle."]
		return {
			Message: User.Name + " threw a snowball. " + PossibleMessages[Math.floor(Math.random() * PossibleMessages.length)],
			Damage: Damage,
			Element: Elements["ice"]
		};
	});

Skills["moltenlipstick"] = MakeSkill("💄", 0, true, 50, 0, 0xeb8338,
	"Molten Lipstick", "Splashes melted lip-stick as hot as magma. Deals 2.5 hearts of fire damage to the opponent; however, the damage is decreased by 0.5 hearts each time the skill is used (resets each battle).",
	function(User, Target) {
		if(!User._LipstickPower) User._LipstickPower = 0;
		const Damage = 5 - User._LipstickPower;
		if(User._LipstickPower < 5) User._LipstickPower++;
		const Messages = ["It's boiling hot!", "It's burning!", "It's firery!", "It's moderately hot.", "It's a little warm."];
		return {
			Message: User.Name + " flug flaming lipstick! " + Messages[Math.min(User._LipstickPower - 1, Messages.length - 1)],
			Damage: Damage,
			Element: Elements["fire"]
		};
	});

// Non-Offensive Active Skills

const MindStealCode = function(SkillName, User, Target) {
	const PossibleSkills = [];
	for(let i = 0; i < Target.Skills.length; i++) {
		const SkillId = Target.Skills[i];
		if(SkillId && User.Skills.indexOf(SkillId) === -1) {
			const Skill = Skills[SkillId];
			if(Skill && Skill.Findable) {
				PossibleSkills.push(SkillId);
			}
		}
	}

	let Msg = User.Name + " used Mind Steal!";
	if(PossibleSkills.length > 0) {
		const SkillId = PossibleSkills[Math.floor(Math.random() * PossibleSkills.length)];
		if(SkillId && Skills[SkillId]) {
			User.Skills.push(SkillId);
			Msg += " They successfully copied " + Skills[SkillId].Title + "!";
		}
	} else {
		Msg += " They were unable to copy any of " + Target.Name + "'s skills.";
	}

	User.Skills = RemoveSkill(User.Skills, SkillName);

	return {
		Message: Msg,
		Damage: 0,
		Element: Elements["neutral"]
	};
};

Skills["mindsteal"] = MakeSkill("👁️", 0, true, 50, 0, 0x841c9c,
	"Mind Steal", "When this skill is used, the user copies a skill the target has. It can only be used once per battle, and only skills that are obtainable by players can be copied.",
	MindStealCode.bind(null, "mindsteal"));

Skills["perfectmindsteal"] = MakeSkill("👁‍🗨", 0, true, 100, 0, 0xd02ff5,
	"Perfect Mind Steal", "When this skill is used, the user copies a skill the target has. It can only be used once per battle, and only skills that are obtainable by players can be copied.",
	MindStealCode.bind(null, "perfectmindsteal"));

Skills["simplerecovery"] = MakeSkill("💗", 0, true, 30, 0, 0x62ff59,
	"Simple Recovery", "Heals the user by 1 heart.",
	function(User, Target) {
		return {
			Message: User.Name + " used some simple recovery.",
			UserDamage: -2
		};
	});

Skills["greaterrecovery"] = MakeSkill("💗", 0, true, 40, 0, 0x62ff59,
	"Greater Recovery", "Heals the user by 2 hearts.",
	function(User, Target) {
		return {
			Message: User.Name + " used greater recovery.",
			UserDamage: -4
		};
	});

// Defensive Skills

Skills["movingillusion"] = MakeSkill("🧿", 1, true, 12, 0, 0x682b80,
	"Moving Illusion", "If this skill triggers when the opponent attacks, the user will dodge and will take no damage.",
	function(User, Target, DefenseData) {
		return {
			Message: Target.Name + " was an illusion and managed to dodge it!",
			Damage: 0
		};
	}, function(DefenseData) {
		return DefenseData.FinalDamage > 0
	});

Skills["bettermovingillusion"] = MakeSkill("🧿", 1, true, 25, 0, 0x682b80,
	"Better Moving Illusion", "If this skill triggers when the opponent attacks, the user will dodge and will take no damage.",
	function(User, Target, DefenseData) {
		return {
			Message: Target.Name + " was an illusion and managed to dodge it!",
			Damage: 0
		};
	}, function(DefenseData) {
		return DefenseData.FinalDamage > 0
	});

Skills["resistant"] = MakeSkill("💎", 1, true, 25, 0, 0x2b3c80,
	"Resistant", "If this skill triggers when the opponent attacks, the amount of damage taken will be reduced by 50%.",
	function(User, Target, DefenseData) {
		return {
			Message: Target.Name + " blocked it using Resistant!",
			Damage: Math.ceil(DefenseData.FinalDamage / 2)
		};
	}, function(DefenseData) {
		return DefenseData.FinalDamage > 0
	});

Skills["bulkyboy"] = MakeSkill("👤", 1, true, 80, 0, 0x2b3c80,
	"Bulky Boy", "If this skill triggers when the opponent attacks, the amount of damage taken will be reduced by 25% (rounded up to nearest half-heart).",
	function(User, Target, DefenseData) {
		return {
			Message: Target.Name + " resisted it using Bulky Boy!",
			Damage: Math.ceil(DefenseData.FinalDamage * 0.75)
		};
	}, function(DefenseData) {
		return DefenseData.FinalDamage > 0
	});

Skills["goldenplating"] = MakeSkill("💎", 1, true, 50, 0, 0x2b3c80,
	"Golden Plating", "If this skill triggers when the opponent attacks, the amount of damage taken will be reduced by 50%. However, the frequency of the skill is reduced by half every time it's used.",
	function(User, Target, DefenseData) {
		if(!Target._GoldenPlatingUses) Target._GoldenPlatingUses = 0;
		Target._GoldenPlatingUses++;
		Target.ExtraFrequency.goldenplating = -(50 - Math.round(50 / Math.pow(2, Target._GoldenPlatingUses)));
		return {
			Message: Target.Name + " blocked it using Golden Plating!",
			Damage: Math.ceil(DefenseData.FinalDamage / 2)
		};
	}, function(DefenseData) {
		return DefenseData.FinalDamage > 0
	});

Skills["petcactus"] = MakeSkill("🌵", 1, true, 20, 0, 0x06c23b,
	"Pet Cactus", "If this skill triggers when the opponent attacks, the opponent will take 0.5 hearts of life damage.",
	function(User, Target, DefenseData) {
		return {
			Message: Target.Name + "'s Pet Cactus fought back!",
			UserDamage: 1,
			UserDamageElement: Elements["life"]
		};
	}, function(DefenseData) {
		return DefenseData.FinalDamage > 0
	});

Skills["wholesomepet"] = MakeSkill("🐶", 1, true, 24, 0, 0x452e03,
	"Wholesome Pet", "If this skill triggers when the opponent attacks, the user's pet will take 1 hearts of neutral damage from the opponent.",
	function(User, Target, DefenseData) {
		return {
			Message: Target.Name + "'s Pet Dog fought back!",
			UserDamage: 2,
			UserDamageElement: Elements["neutral"]
		};
	}, function(DefenseData) {
		return DefenseData.FinalDamage > 0
	});

Skills["darkbeckon"] = MakeSkill("🌑", 1, true, 23, 0, 0x06c23b,
	"Dark Beckon", "If this skill triggers when the opponent attacks, the opponent will take 0.5 hearts of gravity damage.",
	function(User, Target, DefenseData) {
		return {
			Message: Target.Name + "'s gravitational force dealt damage in response!",
			UserDamage: 1,
			UserDamageElement: Elements["gravity"]
		};
	}, function(DefenseData) {
		return DefenseData.FinalDamage > 0
	});

Skills["perfecttiming"] = MakeSkill("🕛", 1, true, 21, 0, 0xfcfbf0,
	"Perfect Timing", "If this skill triggers when the opponent attacks, the opponent will take 1 heart of time damage. However, it can only trigger on even-numbered turns.",
	function(User, Target, DefenseData) {
		return {
			Message: "The perfect timing allowed " + Target.Name + " to deal damage in response!",
			UserDamage: 2,
			UserDamageElement: Elements["time"]
		};
	}, function(DefenseData) {
		return (DefenseData.Turn % 2 === 0) && DefenseData.FinalDamage > 0
	});

Skills["offbeat"] = MakeSkill("🕘", 1, true, 20, 0, 0xfcfbf0,
	"Off Beat", "If this skill triggers when the opponent attacks, the opponent will take 2 hearts of time damage. However, it can only trigger on odd-numbered turns.",
	function(User, Target, DefenseData) {
		return {
			Message: "The perfect timing allowed " + Target.Name + " to deal damage in response!",
			UserDamage: 2,
			UserDamageElement: Elements["time"]
		};
	}, function(DefenseData) {
		return (DefenseData.Turn % 2 === 1) && DefenseData.FinalDamage > 0
	});

Skills["phantomsensation"] = MakeSkill("👻", 1, true, 50, 0, 0xededed,
	"Phantom Sensation", "If this skill triggers when the opponent attacks, the user will dodge and will take no damage. This skill can only be used once per battle.",
	function(User, Target, DefenseData) {
		Target.Skills = RemoveSkill(Target.Skills, "phantomsensation");
		return {
			Message: Target.Name + " used sensed the attack and dodged it!",
			Damage: 0
		};
	}, function(DefenseData) {
		return DefenseData.FinalDamage > 0
	});

Skills["lifecling"] = MakeSkill("🦋", 1, true, 50, 0, 0x8deba7,
	"Life Cling", "If this skill triggers on an attack that would defeat the user, the user will survive with half a heart remaining. This skill can only be used once per battle.",
	function(User, Target, DefenseData) {
		Target.Skills = RemoveSkill(Target.Skills, "lifecling");
		return {
			Message: Target.Name + " was about to be defeated, but held on!",
			Damage: DefenseData.Target.HP - 1
		};
	}, function(DefenseData) {
		return (DefenseData.Target.HP - DefenseData.FinalDamage) <= 0
	});

// Intro Skills

Skills["dummystare"] = MakeSkill("🔘", 2, false, 100, 0, 0xb0b0b0,
	"Dummy Stare", "Sets the user's Max HP to the opponent's HP at the start of the battle.",
	function(User, Target) {
		User.HP = Target.HP;
		User.MaxHP = Target.HP;
		return {
			Message: null
		};
	});

Skills["mechacopy"] = MakeSkill("🔘", 2, false, 100, 10000, 0xb0b0b0,
	"Mecha Copy", "Deletes all the user's skills, then copies the all of the opponent's skills.",
	function(User, Target) {
		if(Target.Skills) User.Skills = [...Target.Skills];
		return {
			Message: User.Name + " used Mecha Copy to copy all of " + Target.Name + "'s skills."
		};
	});

Skills["mimiccopy"] = MakeSkill("🔘", 2, false, 100, 10000, 0xb0b0b0,
	"Mimic Copy", "Deletes all the user's skills, then copies the all of the opponent's skills.",
	function(User, Target) {
		if(Target.Skills) User.Skills = [...Target.Skills];
		return {
			Message: User.Name + " mimicked all of " + Target.Name + "'s skills."
		};
	});

Skills["heartpound"] = MakeSkill("💕", 2, true, 50, 0, 0xff8080,
	"Heart Pound", "The user's heart is filled with love and happiness. Adds an extra heart to the user.",
	function(User, Target) {
		User.HP += 2;
		User.MaxHP += 2;
		return {
			Message: User.Name + "'s heart started pounding. They got an extra heart of HP!"
		};
	});

Skills["randommushrooms"] = MakeSkill("🍄", 2, true, 100, 0, 0xff8080,
	"Random Mushrooms", "The user's consumes a bunch of questionable fungi at the start of the battle. May add or remove a random number of hearts to the user.",
	function(User, Target) {
		const Hearts = (Math.random() * 8) - 4;
		User.HP += Hearts;
		User.MaxHP += Hearts;
		return {
			Message: User.Name + "'s chomped down a ton of mushrooms. They " + (Hearts > 0 ? ("gained " + (Hearts / 2).toString() + " hearts!") : (Hearts < 0 ? ("lost " + (Hearts / -2).toString() + " hearts!") : (" did not feel any different.")))
		};
	});

Skills["surpriseattack"] = MakeSkill("🐁", 2, true, 50, 1000, 0x525252,
	"Surprise Attack", "The user quickly attacks before the battle begins. Deals 0.5 hearts of damage if successful.",
	function(User, Target) {
		Target.HP -= 1;
		return {
			Message: User.Name + " snuck in a surprise attack and dealt 0.5 damage to " + Target.Name + "!"
		};
	});

Skills["sneakylick"] = MakeSkill("👅", 2, true, 30, 1000, 0xe673ae,
	"Sneaky Lick", "The user quickly licks the target before the battle begins. Deals 1 heart of damage if successful.",
	function(User, Target) {
		Target.HP -= 2;
		return {
			Message: User.Name + " licked " + Target.Name + " and dealt 1 damage!"
		};
	});

Skills["outerlayer"] = MakeSkill("🧥", 2, true, 100, 10000, 0xaed4b6,
	"Outer Layer", "An outer layer of protection that exists only at the beginning of a battle. Guarantees the user's HP will be at its maximum when the battle begins.",
	function(User, Target) {
		if(User.HP < User.MaxHP) {
			User.HP = User.MaxHP;
			return {
				Message: User.Name + "'s outer layer ensured their HP was maximized!"
			};
		} else {
			return { Message: null };
		}
	});

// Passive Skills

Skills["kingsintimidation"] = MakeSkill("👑", 3, true, 100, 0, 0xedff26,
	"King's Intimidation", "Prevents all damage from being \"not very effective\". This applies to everything given and received by both the user and the opponent.",
	function(NameText) {
		return {
			Message: NameText + "'s intimidation prevented the effectiveness from being reduced!"
		};
	});

Skills["queensmercy"] = MakeSkill("🌺", 3, true, 100, 0, 0xff87f9,
	"Queen's Mercy", "Prevents all damage from being \"super effective\". This applies to everything given and received by both the user and the opponent.",
	function(NameText) {
		return {
			Message: NameText + "'s mercy prevented the effectiveness from being increased!"
		};
	});

Skills["jokerschaos"] = MakeSkill("🃏", 3, true, 100, 0, 0xd9d9d9,
	"Joker's Chaos", "Inverses the effectiveness of all elemental damage. This applies to everything given and received by both the user and the opponent.",
	function(NameText) {
		return {
			Message: NameText + "'s chaos inverted the effectiveness!"
		};
	});

Skills["trickcycle"] = MakeSkill("♻️", 3, true, 100, 0, 0x7cd9c3,
	"Trick Cycle", "Inverses the order of the turns in battle. Faster combatants will move second, and slower ones will move first.",
	function(NameText) {
		return {
			Message: NameText + "'s tricks will invert the turns!"
		};
	});

Skills["triumphantrythm"] = MakeSkill("💫", 3, true, 100, 0, 0xf3a2f5,
	"Triumphant Rythm", "A powerful rythm fills the battlefield. The frequency of both the user and opponent's skills are increased by 10% for the entire battle.",
	function(NameText) {
		return {
			Message: NameText + "'s rythm increased the frequency of all skills!"
		};
	});

Skills["menacecaution"] = MakeSkill("🚧", 3, true, 100, 0, 0xf7fc5d,
	"Menace Caution", "An intimidating caution emanates from the user. The frequency of both the user and opponent's skills are decreased by 10% for the entire battle.",
	function(NameText) {
		return {
			Message: NameText + "'s caution decreased the frequency of all skills!"
		};
	});

Skills["mainactmonopoly"] = MakeSkill("🪐", 3, true, 100, 0, 0xffc35c,
	"Main Act Monopoly", "The presence of this skill completely disables all intro skills from activating. This applies to both the user and opponent's skills.",
	function(NameText) {
		return {
			Message: NameText + "'s focus on the battle prevented all intro skills from activating!"
		};
	});

// Debug Skills

Skills["instantkill"] = MakeSkill("😚", 0, false, 100, 0, 0xffffff,
	"Instant Kill", "Deals 999 hearts of neutral damage to the opponent.",
	function(User, Target) {
		const Damage = 999 * 2;
		return {
			Message: User.Name + " instantly killed their opponent.",
			Damage: Damage,
			Element: Elements["neutral"]
		};
	});

// Monster Exclusive Skills

// WOLF

Skills["wolfhowl"] = MakeSkill("🐺", 0, false, 40, 0, 0xababab,
	"Howl", "Howls intensely in order to prepare for a big attack.",
	function(User, Target) {
		User.Skills.push("wolfleap");
		return {
			Message: User.Name + " howled intensely!",
			Damage: 0
		};
	});

Skills["wolfleap"] = MakeSkill("🐺", 0, false, 200, 0, 0xababab,
	"Leap", "Leaps directly at the opponent. Deals 2 hearts of neutral damage. There is a 20% chance this skill will miss.",
	function(User, Target) {
		User.Skills = RemoveSkill(User.Skills, "wolfleap");
		if(Math.random() < 0.2) {
			return {
				Message: User.Name + " leapt forward, but completely missed " + Target.Name + "!",
				Damage: 0
			};
		}
		return {
			Message: User.Name + " leapt directly on " + Target.Name + "!",
			Damage: 4,
			Element: Elements["neutral"]
		};
	});

// HORNET

Skills["sting"] = MakeSkill("🐝", 0, false, 80, 0, 0xb8bd24,
	"Sting", "Deals 2 hearts of neutral damage to the opponent.",
	function(User, Target) {
		return {
			Message: User.Name + " stung " + Target.Name + ".",
			Damage: 4,
			Element: Elements["neutral"]
		};
	});

// GIANT WORM

Skills["dig"] = MakeSkill("🧱", 0, false, 50, 0, 0x785530,
	"Dig", "The user digs into the ground. On the next turn, they deal 3 hearts of neutral damage to the opponent.",
	function(User, Target) {
		User.Skills.push("digattack");
		return {
			Message: User.Name + " dug into the ground!",
			Damage: 0
		};
	});

Skills["digattack"] = MakeSkill("🧱", 0, false, 500, 0, 0x785530,
	"Dig Attack", "The user exits the ground and deals 3 hearts of neutral damage to the opponent.",
	function(User, Target) {
		const Damage = 6;
		User.Skills = RemoveSkill(User.Skills, "digattack");
		return {
			Message: User.Name + " jumped out of the ground and attacked!",
			Damage: Damage,
			Element: Elements["neutral"]
		};
	});

// OTHER SKILLS THAT CANNOT BE LEARNED NORMALLY

Skills["fly"] = MakeSkill("💸", 0, false, 30, 0, 0x785530,
	"Fly", "The user flies into the air. On the next turn, they heal 2 hearts.",
	function(User, Target) {
		User.Skills.push("flyheal");
		return {
			Message: User.Name + " flew into the air!",
			Damage: 0
		};
	});

Skills["flyheal"] = MakeSkill("💸", 0, false, 500, 0, 0x785530,
	"Fly Restoration", "The user returns to the ground and heals 2 hearts to themselves.",
	function(User, Target) {
		User.Skills = RemoveSkill(User.Skills, "flyheal");
		return {
			Message: User.Name + " restored 2 hearts of HP!",
			UserDamage: -4
		};
	});
