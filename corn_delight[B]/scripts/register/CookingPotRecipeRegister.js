var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WorldLoadAfterEvent, system, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { cookingPotRecipes } from "../data/CookingPotRecipes";
let register = true;
export class CookingPotRecipeRegister {
    register(args) {
        system.runInterval(() => {
            if (register) {
                for (let i = 0; i < cookingPotRecipes.length; i++) {
                    cookingPotRecipes[i];
                    const recipe = JSON.stringify(cookingPotRecipes[i]);
                    system.sendScriptEvent("farmersdelight:cooking_pot_recipe", `${recipe}`);
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
], CookingPotRecipeRegister.prototype, "register", null);
//# sourceMappingURL=CookingPotRecipeRegister.js.map