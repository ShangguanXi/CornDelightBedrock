import { ItemComponentTypes, PlayerBreakBlockBeforeEvent, system, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemAPI } from "../lib/ItemAPI";

export class PopCornBox{
    @EventAPI.register(world.beforeEvents.playerBreakBlock)
    break(args: PlayerBreakBlockBeforeEvent){
        const typeId = args.block.typeId;
        const player = args.player;
        const dimension = args.dimension;
        const location = args.block.location;
        if (typeId != "corn_delight:popcorn_box") return;  
        if (player.getGameMode() == "creative") return;
        const selectedItem = player?.getComponent("inventory")?.container?.getSlot(player.selectedSlotIndex).getItem();
        if (!selectedItem) return
        const silkTouch = selectedItem.getComponent(ItemComponentTypes.Enchantable)?.hasEnchantment("silk_touch");
        if (!silkTouch) return;
        args.cancel = true;
        dimension.runCommandAsync(`/fill ${location.x} ${location.y} ${location.z} ${location.x} ${location.y} ${location.z} air destroy`)
        system.runTimeout(() => {
            ItemAPI.damage(player, player.selectedSlotIndex, 1);
        })
        
    }
}