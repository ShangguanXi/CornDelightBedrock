import { BlockCustomComponent, BlockComponentPlayerInteractEvent, WorldInitializeBeforeEvent, world, Dimension, Vector3, BlockComponentRandomTickEvent, EntityInventoryComponent, Container, Direction, BlockComponentTickEvent, system } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";
function spawnLoot(path: string, dimenion: Dimension, location: Vector3) {
    return dimenion.runCommand(`loot spawn ${location.x} ${location.y} ${location.z} loot "${path}"`)
}

class CropsComponent implements BlockCustomComponent {

    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
        this.onRandomTick = this.onRandomTick.bind(this);
    }

    onPlayerInteract(args: BlockComponentPlayerInteractEvent): void {
        const block = args.block;
        const player = args.player;
        const dimension = args.dimension
        const itemId = player?.getComponent("inventory")?.container?.getSlot(player.selectedSlotIndex).typeId
        const age = Number(block.permutation.getState("corn_delight:growth"))
        const upper = Boolean(block.permutation.getState("corn_delight:upper"))
        const topLocation = { x: block.location.x, y: block.location.y + 1, z: block.location.z };
        const random = Math.floor(Math.random() * 101)
        if (!player) return;
        const container: Container | undefined = player.getComponent(EntityInventoryComponent.componentId)?.container;
        const lootTable = this.getLootTable();
        try {
            if (itemId == "minecraft:bone_meal" && age < 7 && upper == false) {
                world.playSound("item.bone_meal.use", block.location)
                if (player?.getGameMode() == "creative") {
                    block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                    block.setPermutation(block.permutation.withState("corn_delight:growth", 7))
                    if (dimension.getBlock(topLocation)?.typeId=="minecraft:air"){
                        dimension.setBlockType(topLocation, "corn_delight:corn_crop")
                        system.run(() => {
                            const growthBlock = dimension.getBlock(topLocation)
                            growthBlock?.setPermutation(growthBlock.permutation.withState("corn_delight:growth", 7))
                            growthBlock?.setPermutation(growthBlock.permutation.withState("corn_delight:upper", true))
                        })
                    }
                   
                }
                else {
                    if (random <= 60) {
                        block.setPermutation(block.permutation.withState("corn_delight:growth", age + 1))
                    }
                    block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                    if (!container) return;
                    ItemAPI.clear(player, player?.selectedSlotIndex)
                }
            }
            if (itemId == "minecraft:bone_meal" && age < 7 && upper == true) {
                world.playSound("item.bone_meal.use", block.location)
                if (player?.getGameMode() == "creative") {
                    block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                    block.setPermutation(block.permutation.withState("corn_delight:growth", 7))
                }
                else {
                    if (random <= 60) {
                        block.setPermutation(block.permutation.withState("corn_delight:growth", age + 1))
                    }
                    block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                    if (!container) return;
                    ItemAPI.clear(player, player?.selectedSlotIndex)
                }
            }
            if (itemId == "minecraft:bone_meal" && age == 7 && upper == false) {
                world.playSound("item.bone_meal.use", block.location)
                if (player?.getGameMode() == "creative") {
                    block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                    if (dimension.getBlock(topLocation)?.typeId=="minecraft:air"){
                        dimension.setBlockType(topLocation, "corn_delight:corn_crop")
                        system.run(() => {
                            const growthBlock = dimension.getBlock(topLocation)
                            growthBlock?.setPermutation(growthBlock.permutation.withState("corn_delight:growth", 7))
                            growthBlock?.setPermutation(growthBlock.permutation.withState("corn_delight:upper", true))
                        })
                    }
                }
                else {
                    if (random <= 60) {
                        dimension.setBlockType(topLocation, "corn_delight:corn_crop")
                    }
                    block.dimension.spawnParticle("minecraft:crop_growth_emitter", { x: block.location.x + 0.5, y: block.location.y + 0.5, z: block.location.z + 0.5 });
                    if (!container) return;
                    ItemAPI.clear(player, player?.selectedSlotIndex)
                }
            }

            if (itemId != "minecraft:bone_meal" && age == 7) {
                block.setPermutation(block.permutation.withState("corn_delight:growth", 4))
                spawnLoot(lootTable, dimension, { x: block.location.x, y: block.location.y, z: block.location.z })
            }
        } catch (error) {

        }


    }
    onRandomTick(args: BlockComponentRandomTickEvent): void {
        const block = args.block;
        
        const dimension = args.dimension
        const topLocation = { x: block.location.x, y: block.location.y + 1, z: block.location.z };
        const upper = Boolean(block.permutation.getState("corn_delight:upper"))
        const age = Number(block.permutation.getState("corn_delight:growth"))
        if (age < 7) {
            block.setPermutation(block.permutation.withState("corn_delight:growth", age + 1))
        }
        if (age == 7&&(upper==false)) {
            if (dimension.getBlock(topLocation)?.typeId=="minecraft:air"){
                dimension.setBlockType(topLocation, "corn_delight:corn_crop")
                system.run(() => {
                    const growthBlock = dimension.getBlock(topLocation)
                    growthBlock?.setPermutation(growthBlock.permutation.withState("corn_delight:growth", 7))
                    growthBlock?.setPermutation(growthBlock.permutation.withState("corn_delight:upper", true))
                })
            }
        }
    }
    getLootTable(): string {
        return "corn_delight/corn_crop_full";

    }

}
export class CornComponentRegister {
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args: WorldInitializeBeforeEvent) {
        args.blockComponentRegistry.registerCustomComponent('corn_delight:corn', new CropsComponent());
    }

}
