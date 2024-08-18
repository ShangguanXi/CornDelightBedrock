var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { world, WorldInitializeBeforeEvent, ItemComponentTypes } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";
function spawnLoot(path, dimenion, location) {
    return dimenion.runCommand(`loot spawn ${location.x} ${location.y} ${location.z} loot "${path}"`);
}
class WildCropComponent {
    constructor() {
        this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
    }
    onPlayerDestroy(args) {
        const player = args.player;
        const block = args.block;
        const dimension = args.dimension;
        const container = player?.getComponent("inventory")?.container;
        const lootTable = this.getLootTable();
        const lootItem = this.lootItem();
        if (!player)
            return;
        if (!container)
            return;
        try {
            const selectedSlot = container?.getSlot(player.selectedSlotIndex);
            const itemId = selectedSlot.typeId;
            const silkTouch = container?.getItem(player.selectedSlotIndex)?.getComponent(ItemComponentTypes.Enchantable)?.hasEnchantment("silk_touch");
            if (itemId == "minecraft:shears") {
                ItemAPI.damage(player, player.selectedSlotIndex, 1);
                ItemAPI.spawn(block, lootItem);
            }
            ;
            if ((itemId != "minecraft:shears") && (!silkTouch)) {
                spawnLoot(lootTable, dimension, block.location);
            }
            ;
        }
        catch (error) {
            spawnLoot(lootTable, dimension, block.location);
        }
    }
    ;
    getLootTable() {
        return "corn_delight/crops/wild_corn";
    }
    lootItem() {
        return "corn_delight:wild_corn";
    }
}
export class WildCornComponentRegister {
    register(args) {
        args.blockComponentRegistry.registerCustomComponent('corn_delight:wild_corn', new WildCropComponent());
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.worldInitialize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldInitializeBeforeEvent]),
    __metadata("design:returntype", void 0)
], WildCornComponentRegister.prototype, "register", null);
//# sourceMappingURL=WildCornComponent.js.map