import { Block, Entity, EntityComponentTypes, EntityInventoryComponent, GameMode, ItemComponentTypes, ItemDurabilityComponent, ItemStack, Player, Vector3, world } from "@minecraft/server";
import { RandomAPI } from "./RandomAPI";
export class ItemAPI {
    /**
     * 
     * @param player 要减少物品耐久的玩家。
     * @param slot 要减少耐久的格子。
     * @param damage 要减少的耐久。
     * @returns 
     */
    public static damage(player: Player, slot: number, damage: number = 1) {
        const inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        const container = inventory.container
        if (!container) return;
        const itemStack = container?.getItem(slot)
        if (!itemStack) return;
        const durability = itemStack?.getComponent('minecraft:durability') as ItemDurabilityComponent;
        if (!durability) return;
        const maxDurability = durability.maxDurability;
        const currentDamage = durability.damage
        if (player.getGameMode() == GameMode.creative) return;
        if (maxDurability > currentDamage) {
            durability.damage += damage;
            container.setItem(slot, itemStack);
            return damage;
        }
        else {
            world.playSound('random.break',player.location);
            container.setItem(slot, undefined);
        }
    }
    /**
     * 
     * @param player 要替换物品的玩家。
     * @param slot 要替换的格子。
     * @param newItemStack 新的物品堆栈。
     * @returns 
     */
    public static replace(player: Player, slot: number, newItemStack: ItemStack) {
        
        const inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        const container = inventory.container
        if (!container) return;
        const itemStack = container?.getItem(slot)
        if (!itemStack) return;
        container.addItem(newItemStack)
        if (player.getGameMode() == GameMode.creative) return;
        const itemAmount = itemStack.amount;
        if (itemStack.amount==1){
            container.setItem(slot, undefined);
        }
        else{
            itemStack.amount = itemAmount - 1;
            container.setItem(slot, itemStack);
        }
       
    }
    /**
     * 
     * @param player 要清除物品的玩家。
     * @param slot 要清除的物品格子。
     * @param number 要清除的物品的数量。
     * @returns 
     */
    public static clear(player: Player, slot: number, number: number = 1) {
        
        const inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        const container = inventory.container
        if (!container) return;
        const itemStack = container?.getItem(slot)
        if (!itemStack) return;
        if (player.getGameMode() == GameMode.creative) return;
        const itemAmount = itemStack.amount;
        itemStack.amount = itemAmount - number;
        if (itemAmount==1){
            container.setItem(slot, undefined);
        }
        else{
            itemStack.amount = itemAmount - 1;
            container.setItem(slot, itemStack);
        }
        container.setItem(slot, itemStack);
    }
    /**
     * 
     * @param target 生成物品的目标。
     * @param item  要生成物品的标识符或者物品堆栈。
     * @param number 要生成物品的数量，默认为1。当item类型为ItemStack时，无意义。
     * @param location 生成物品的坐标，默认为目标的坐标。
     */
    public static spawn(target: Block | Entity, item: string | ItemStack, number: number = 1, location: Vector3|undefined= undefined) {
        if (!location){
            if (item instanceof ItemStack) {
                if (target instanceof Block) {
                    if (RandomAPI.probability(50)){
                        target.dimension.spawnItem(item, target.center());
                    }
                    else{
                        target.dimension.spawnItem(item, target.bottomCenter());
                    };
                    
                };
                if (target instanceof Entity) {
                    target.dimension.spawnItem(item, target.location);
                };
            }
            else {
                if (target instanceof Block) {
                    if (RandomAPI.probability(50)){
                        target.dimension.spawnItem(new ItemStack(item, number), target.center());
                    }
                    else{
                        target.dimension.spawnItem(new ItemStack(item, number), target.bottomCenter());
                    };
                }
                if (target instanceof Entity) {
                    target.dimension.spawnItem(new ItemStack(item, number), target.location);
                };
            }
        }
        else{
            if (item instanceof ItemStack) {
                target.dimension.spawnItem(item, location);
            }
            else {
                target.dimension.spawnItem(new ItemStack(item, number), location);
            };
        };
        
    }
    /**
     * 
     * @param player 要添加物品的玩家。
     * @param item  要生成物品的标识符或者物品堆栈。
     * @param number 要生成物品的数量，默认为1。当item类型为ItemStack时，无意义。
     * @returns 
     */
    public static add(player: Player, item: string | ItemStack, number: number = 1) {
        
        const inventory = player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent;
        const container = inventory.container
        if (!container) return;
        if (item instanceof ItemStack) {
            container.addItem(item)
        }
        else {
            container.addItem(new ItemStack(item, number))
        }

    }
}