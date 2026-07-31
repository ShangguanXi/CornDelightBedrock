var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect == "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect == "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WorldLoadAfterEvent, system, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { cuttingBoardRecipes } from "../data/CuttingBoardRecipes";
let register = true;
export class CuttingBoardRecipeRegister {
    register(args) {
        system.runInterval(() => {
            if (register) {
                for (let i = 0; i < cuttingBoardRecipes.length; i++) {
                    cuttingBoardRecipes[i];
                    const recipe = JSON.stringify(cuttingBoardRecipes[i]);
                    system.sendScriptEvent("farmersdelight:cutting_board_recipe", `${recipe}`);
                }
                register = false;
            }
        });
    }
}
__decorate([
    EventAPI.register(world.afterEvents.worldLoad),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldLoadAfterEvent]),
    __metadata("design:returntype", void 0)
], CuttingBoardRecipeRegister.prototype, "register", null);
//# sourceMappingURL=CuttingBoardRecipeRegister.js.map
