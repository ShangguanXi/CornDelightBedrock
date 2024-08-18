import { Dimension, Vector3, BlockCustomComponent, BlockComponentPlayerInteractEvent, Container, EntityInventoryComponent, world, BlockComponentRandomTickEvent, WorldInitializeBeforeEvent, BlockComponentPlayerDestroyEvent, ItemComponentTypes } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";



function spawnLoot(path: string, dimenion: Dimension, location: Vector3) {
    return dimenion.runCommand(`loot spawn ${location.x} ${location.y} ${location.z} loot "${path}"`)
}

class WildCropComponent implements BlockCustomComponent {

    constructor() {
        this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
    }

    onPlayerDestroy(args: BlockComponentPlayerDestroyEvent): void {
        const player = args.player;
        const block = args.block;
        const dimension = args.dimension;
        const container = player?.getComponent("inventory")?.container;
        const lootTable = this.getLootTable();
        const lootItem = this.lootItem();
        if (!player) return;
        if (!container) return;
        try {
            const selectedSlot = container?.getSlot(player.selectedSlotIndex)
            const itemId = selectedSlot.typeId;
            const silkTouch = container?.getItem(player.selectedSlotIndex)?.getComponent(ItemComponentTypes.Enchantable)?.hasEnchantment("silk_touch");
            if (itemId == "minecraft:shears") {
                ItemAPI.damage(player, player.selectedSlotIndex, 1)
                ItemAPI.spawn(block, lootItem)

            };
            if ((itemId != "minecraft:shears") && (!silkTouch)) {
                spawnLoot(lootTable, dimension, block.location)
            };
        } catch (error) {
            spawnLoot(lootTable, dimension, block.location)
        }

    };
    getLootTable(): string {
        return "corn_delight/crops/wild_corn";

    }
    lootItem(): string {
        return "corn_delight:wild_corn";

    }



}
export class WildCornComponentRegister {
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args: WorldInitializeBeforeEvent) {
        args.blockComponentRegistry.registerCustomComponent('corn_delight:wild_corn', new WildCropComponent());
    }

}
