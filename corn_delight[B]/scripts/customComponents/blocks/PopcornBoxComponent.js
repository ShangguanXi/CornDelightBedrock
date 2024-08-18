var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WorldInitializeBeforeEvent, world } from "@minecraft/server";
import { ItemAPI } from "../../lib/ItemAPI";
import { EventAPI } from "../../lib/EventAPI";
class PopCornBoxComponent {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }
    onPlayerInteract(args) {
        const block = args.block;
        const dimension = args.dimension;
        const stage = Number(block.permutation.getState("corn_delight:popcorn_box"));
        if (stage < 3) {
            block.setPermutation(block.permutation.withState("corn_delight:popcorn_box", stage + 1));
            ItemAPI.spawn(block, "corn_delight:caramel_popcorn", 1);
        }
        else {
            dimension.setBlockType(block.location, "minecraft:air");
            ItemAPI.spawn(block, "corn_delight:caramel_popcorn", 1);
            ItemAPI.spawn(block, "minecraft:paper", 1);
        }
    }
}
export class PopCornBoxComponentRegister {
    register(args) {
        args.blockComponentRegistry.registerCustomComponent('corn_delight:popcorn_box', new PopCornBoxComponent());
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.worldInitialize),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldInitializeBeforeEvent]),
    __metadata("design:returntype", void 0)
], PopCornBoxComponentRegister.prototype, "register", null);
//# sourceMappingURL=PopcornBoxComponent.js.map