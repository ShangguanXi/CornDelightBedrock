import { BlockCustomComponent, BlockComponentPlayerInteractEvent, system, StartupEvent, EntityComponentTypes, EntityInventoryComponent, GameMode, ItemComponentTypes, ItemEnchantableComponent, PlayerBreakBlockBeforeEvent, world } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";

export class PopCornBoxComponent implements BlockCustomComponent {

    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }

    onPlayerInteract(args: BlockComponentPlayerInteractEvent): void { 
        const block = args.block;
        const dimension = args.dimension
        const stage = Number(block.permutation.getState("corn_delight:popcorn_box"))
        if (stage < 3) {
            block.setPermutation(block.permutation.withState("corn_delight:popcorn_box", stage + 1));
            ItemAPI.spawn(block, "corn_delight:caramel_popcorn", 1)
           
        }
        else{
            dimension.setBlockType(block.location,"minecraft:air")
            ItemAPI.spawn(block, "corn_delight:caramel_popcorn", 1)
            ItemAPI.spawn(block, "minecraft:paper", 1)
        }
       

    }
    @EventAPI.register(system.beforeEvents.startup)
    register(args: StartupEvent) {
        args.blockComponentRegistry.registerCustomComponent('corn_delight:popcorn_box', new PopCornBoxComponent());
    }
    @EventAPI.register(world.beforeEvents.playerBreakBlock)
    break(args: PlayerBreakBlockBeforeEvent) {
        const typeId = args.block.typeId;
        const player = args.player;
        const dimension = args.dimension;
        const location = args.block.location;
        if (typeId == "corn_delight:popcorn_box") {
            if (player.getGameMode() == GameMode.Creative) return;
            const selectedItem = (player?.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent)?.container?.getSlot(player.selectedSlotIndex).getItem();
            if (!selectedItem) return
            const silkTouch = (selectedItem?.getComponent(ItemComponentTypes.Enchantable) as ItemEnchantableComponent)?.hasEnchantment("silk_touch");
            if (!silkTouch) return;
            args.cancel = true;
            dimension.runCommand(`/fill ${location.x} ${location.y} ${location.z} ${location.x} ${location.y} ${location.z} air destroy`)
            system.runTimeout(() => {
                ItemAPI.damage(player, player.selectedSlotIndex, 1);
            })
        };


    }
}
