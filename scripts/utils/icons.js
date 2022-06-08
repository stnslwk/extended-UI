exports.getAll = function() {
    return Object.assign({}, allIcons, allSprites);
}

exports.getIcons = function() {
    if (Object.keys(allIcons).length == 0) {
        Icon.icons.each((name, icon) => {
            allIcons[name] = new TextureRegionDrawable(icon);
        });
    }
    return allIcons;
}

exports.getSprites = function() {
    if (Object.keys(allSprites).length == 0) {
        setupSprites();
    }
    return allSprites;
}

exports.getUnitSprites = function() {
    if (spriteStorage.length == 0) setupSprites();
    return spriteStorage[2]; 
}

exports.getByName = function(name) {
    return exports.getIcons()[name] || exports.getSprites()[name] || new TextureRegionDrawable(Icon.pencil);
}

const spriteClasses = [Items, Liquids, UnitTypes, StatusEffects, Blocks]
const spriteStorage = [];
let allIcons = {};
let allSprites = {};

function setupSprites() {
    for (let spriteClass of spriteClasses) {
        let sprites = [];
        for (let key in spriteClass) {
            let item = spriteClass[key];
            if (!item || !(typeof item.icon === 'function')) continue;
            try {
                sprites[item.name] = new TextureRegionDrawable(item.icon(Cicon.medium));
                allSprites[item.name] = new TextureRegionDrawable(item.icon(Cicon.medium));
            } catch (e) {}
        }
        spriteStorage.push(sprites);
    }
}
