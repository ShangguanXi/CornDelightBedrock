import { BlockCustomComponent, BlockComponentPlayerInteractEvent, WorldInitializeBeforeEvent, world, Dimension, Vector3, BlockComponentRandomTickEvent, EntityInventoryComponent, Container, Direction, BlockComponentTickEvent, system } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";

class PopCornBoxComponent implements BlockCustomComponent {

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
}
export class PopCornBoxComponentRegister {
    @EventAPI.register(world.beforeEvents.worldInitialize)
    register(args: WorldInitializeBeforeEvent) {
        args.blockComponentRegistry.registerCustomComponent('corn_delight:popcorn_box', new PopCornBoxComponent());
    }

}
