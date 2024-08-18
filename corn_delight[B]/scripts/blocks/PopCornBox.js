var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ItemComponentTypes, PlayerBreakBlockBeforeEvent, system, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemAPI } from "../lib/ItemAPI";
export class PopCornBox {
    break(args) {
        const typeId = args.block.typeId;
        const player = args.player;
        const dimension = args.dimension;
        const location = args.block.location;
        if (typeId != "corn_delight:popcorn_box")
            return;
        if (player.getGameMode() == "creative")
            return;
        const selectedItem = player?.getComponent("inventory")?.container?.getSlot(player.selectedSlotIndex).getItem();
        if (!selectedItem)
            return;
        const silkTouch = selectedItem.getComponent(ItemComponentTypes.Enchantable)?.hasEnchantment("silk_touch");
        if (!silkTouch)
            return;
        args.cancel = true;
        dimension.runCommandAsync(`/fill ${location.x} ${location.y} ${location.z} ${location.x} ${location.y} ${location.z} air destroy`);
        system.runTimeout(() => {
            ItemAPI.damage(player, player.selectedSlotIndex, 1);
        });
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.playerBreakBlock),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlayerBreakBlockBeforeEvent]),
    __metadata("design:returntype", void 0)
], PopCornBox.prototype, "break", null);
//# sourceMappingURL=PopCornBox.js.map