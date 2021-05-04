addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent  
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
            description: "Point generation go brrrr",
            cost: new Decimal(1),
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?0.75:0.5)) 
                if (ret.gte("1e10")) ret = ret.sqrt().times("100")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        12: {
            description: "points go even zoomer",
            cost: new Decimal(10),
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?0.75:0.5)) 
                if (ret.gte("1e10")) ret = ret.sqrt().times("10")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        15: {
            description: "boner pill",
            cost: new Decimal(69),
            effect() { return (42)
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        16: {
            description: "a second pill",
            cost: new Decimal(420),
            effect() { return (6.9)
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        13: {
            description: "boner pill",
            cost: new Decimal(69),
            effect() { return (42)
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        14: {
            description: "a second pill",
            cost: new Decimal(420),
            effect() { return (6.9)
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
         21: {
            description: "THE FIRST UPGRADE!!!",
            cost: new Decimal(1),
            effect() { return (1)
            },
            effectDisplay() { return format(this.effect())+"+" }, // Add formatting to the effect
        },
    },
    buyables: {
        11: {
            title: "Exhancers", // Optional, displayed at the top in a larger font
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(25)) x = x.pow(2).div(25)
                let cost = Decimal.pow(2, x.pow(1.5))
                return cost.floor()
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                if (x.gte(0)) eff.first = x.pow(0.8)
                else eff.first = x.times(-1).pow(0.8).times(-1)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Multiplies Points by " + format(data.effect.first)
            },
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() {
                return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
            },
            style: {'height':'222px'},
        },
         12: {
            title: "Exhancers 2", // Optional, displayed at the top in a larger font
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                if (x.gte(25)) x = x.pow(2).div(25)
                let cost = Decimal.pow(2, x.pow(1.75))
                return cost.floor()
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
                let eff = {}
                if (x.gte(0)) eff.first = x.pow(1.1)
                else eff.first = x.times(-1).pow(1.1).times(-1)
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " points\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Bigger and Better Also Multiplies Points by " + format(data.effect.first)
            },
            unlocked() { return player[this.layer].unlocked }, 
            canAfford() {
                return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                player[this.layer].points = player[this.layer].points.sub(cost)	
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
            },
            style: {'height':'222px'},
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
addLayer("g", {
    name: "gamerpoint", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "gamer bucks", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    milestones: {
        0: {
            requirementDescription: "3 gamer",
            done() {return player[this.layer].best.gte(10)}, // Used to determine when to give the milestone
            effectDescription: "keep presitge upgrades on reset",
        },
    },
    upgrades: {
        11: {
            description: "Point generation go brrrr",
            cost: new Decimal(1),
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?0.75:0.5)) 
                if (ret.gte("1e10")) ret = ret.sqrt().times("100")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        12: {
            description: "points go even zoomer",
            cost: new Decimal(10),
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?0.75:0.5)) 
                if (ret.gte("1e10")) ret = ret.sqrt().times("100")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        13: {
            description: "boner pill",
            cost: new Decimal(69),
            effect() { return (42)
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        14: {
            description: "a second pill",
            cost: new Decimal(420),
            effect() { return (6.9)
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for gamer! points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
addLayer("d", {
    name: "dartmonke", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFC0CB",
    requires: new Decimal(1e50), // Can be a function that takes requirement increases into account
    resource: "Pops", // Name of prestige currency
    baseResource: "gamer bucks", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.125, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    milestones: {
        0: {
            requirementDescription: "3 gamer",
            done() {return player[this.layer].best.gte(10)}, // Used to determine when to give the milestone
            effectDescription: "keep presitge upgrades on reset",
        },
    },
    upgrades: {
        14: {
            description: "Point generation go brrrr",
            cost: new Decimal(1000),
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?0.75:0.5)) 
                if (ret.gte("1e10")) ret = ret.sqrt().times("10")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        12: {
            description: "points go even zoomer",
            cost: new Decimal(10),
            effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                let ret = player[this.layer].points.add(1).pow(player[this.layer].upgrades.includes(24)?1.1:(player[this.layer].upgrades.includes(14)?0.075:0.5)) 
                if (ret.gte("1e10")) ret = ret.sqrt().times("10")
                return ret;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        13: {
            description: "boner pill",
            cost: new Decimal(69),
            effect() { return (42)
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        11: {
            description: "a second pill",
            cost: new Decimal(1),
            effect() { return (6.9)
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for Dart monke pops", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})