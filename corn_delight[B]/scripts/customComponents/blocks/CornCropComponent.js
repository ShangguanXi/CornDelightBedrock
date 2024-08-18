var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WorldInitializeBeforeEvent, world, EntityInventoryComponent, system } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";
function spawnLoot(path, dimenion, location) {
    return dimenion.runCommand(`loot spawn ${location.x} ${location.y} ${location.z} loot "${path}"`);
}
class CropsComponent {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
        this.onRandomTick = this.onRandomTick.bind(this);
    }
    onPlayerInteract(args) {
        const block = args.block;
        const player = args.player;
        const dimension = args.dimension;
        const itemId = player?.getComponent("inventory")?.container?.getSlot(player.selectedSlotIndex).typeId;
        const age = Number(block.permutation.getState("corn_delight:growth"));
        const upper = Boolean(block.permutation.getState("corn_delight:upper"));
        const topLocation = { x: block.location.x, y: block.location.y + 1, z: block.location.z };
        const random = Math.floor(Math.random() * 101);
        if (!player)
            return;
        const container = player.getComponent(EntityInventoryComponent.componentId)?.container;
        const lootTable = this.getLootTable();
        try {
            if (itemId == "minecraft:bone_meal" && age < 7 && upper == false) {
                world.playSound("item.bone_meal.use", block.location);
                if (player?.getGameMode() == "creative") {
                    block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                    block.setPermutation(block.permutation.withState("corn_delight:growth", 7));
                    if (dimension.getBlock(topLocation)?.typeId == "minecraft:air") {
                        dimension.setBlockType(topLocation, "corn_delight:corn_crop");
                        system.run(() => {
                            const growthBlock = dimension.getBlock(topLocation);
                            growthBlock?.setPermutation(growthBlock.permutation.withState("corn_delight:growth", 7));
                            growthBlock?.setPermutation(growthBlock.permutation.withState("corn_delight:upper", true));
                        });
                    }
                }
                else {
                    if (random <= 60) {
                        block.setPermutation(block.permutation.withState("corn_delight:growth", age + 1));
                    }
                    block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                    if (!container)
                        return;
                    ItemAPI.clear(player, player?.selectedSlotIndex);
                }
            }
            if (itemId == "minecraft:bone_meal" && age < 7 && upper == true) {
                world.playSound("item.bone_meal.use", block.location);
                if (player?.getGameMode() == "creative") {
                    block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                    block.setPermutation(block.permutation.withState("corn_delight:growth", 7));
                }
                else {
                    if (random <= 60) {
                        block.setPermutation(block.permutation.withState("corn_delight:growth", age + 1));
                    }
                    block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                    if (!container)
                        return;
                    ItemAPI.clear(player, player?.selectedSlotIndex);
                }
            }
            if (itemId == "minecraft:bone_meal" && age == 7 && upper == false) {
                world.playSound("item.bone_meal.use", block.location);
                if (player?.getGameMode() == "creative") {
                    block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                    if (dimension.getBlock(topLocation)?.typeId == "minecraft:air") {
                        dimension.setBlockType(topLocation, "corn_delight:corn_crop");
                        system.run(() => {
                            const growthBlock = dimension.getBlock(topLocation);
                            growthBlock?.setPermutation(growthBlock.permutation.withState("corn_delight:growth", 7));
                            growthBlock?.setPermutation(growthBlock.permutation.withState("corn_delight:upper", true));
                        });
                    }
                }
                else {
                    if (random <= 60) {
                        dimension.setBlockType(topLocation, "corn_delight:corn_crop");
                    }
                    block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                    if (!container)
                        return;
                    ItemAPI.clear(player, player?.selectedSlotIndex);
                }
            }
            if (itemId != "minecraft:bone_meal" && age == 7) {
                block.setPermutation(block.permutation.withState("corn_delight:growth", 4));
                spawnLoot(lootTable, dimension, { x: block.location.x, y: block.location.y, z: block.location.z });
            }
        }
        catch (error) {
        }
    }
    onRandomTick(args) {
        const block = args.block;
        const dimension = args.dimension;
        const topLocation = { x: block.location.x, y: block.location.y + 1, z: block.location.z };
        const upper = Boolean(block.permutation.getState("corn_delight:upper"));
        const age = Number(block.permutation.getState("corn_delight:growth"));
        if (age < 7) {
            block.setPermutation(block.permutation.withState("corn_delight:growth", age + 1));
        }
        if (age == 7 && (upper == false)) {
            if (dimension.getBlock(topLocation)?.typeId == "minecraft:air") {
                dimension.setBlockType(topLocation, "corn_delight:corn_crop");
                system.run(() => {
                    const growthBlock = dimension.getBlock(topLocation);
                    growthBlock?.setPermutation(growthBlock.permutation.withState("corn_delight:growth", 7));
                    growthBlock?.setPermutation(growthBlock.permutation.withState("corn_delight:upper", true));
                });
            }
        }
    }
    getLootTable() {
        return "corn_delight/corn_crop_full";
    }
}
export class CornComponentRegister {
    register(args) {
        args.blockComponentRegistry.registerCustomComponent('corn_delight:corn', new CropsComponent());
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.worldInitialize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldInitializeBeforeEvent]),
    __metadata("design:returntype", void 0)
], CornComponentRegister.prototype, "register", null);
//# sourceMappingURL=CornCropComponent.js.map