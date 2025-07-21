import { world, PlayerInteractWithBlockAfterEvent, PlayerBreakBlockBeforeEvent, system, BlockVolume, ItemStack, GameMode } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemAPI } from "../lib/ItemAPI";

export class BlockFood {
    @EventAPI.register(world.beforeEvents.playerBreakBlock)
    break(args: PlayerBreakBlockBeforeEvent) {
        const player = args.player;
        if (player.getGameMode() == GameMode.Creative) return;
        const block = args.block;
        if (block.typeId!="corn_delight:nachos_block") return;
        const stage = block.permutation.getState("farmersdelight:food_block_stage") as number
        if (stage != 0) {
            system.runTimeout(() => {
                block.dimension.setBlockType(block.location, "minecraft:air")
                ItemAPI.damage(player, player.selectedSlotIndex)
                block.dimension.playSound("dig.stone", block.location)
            })
            args.cancel = true
        }
    }

}