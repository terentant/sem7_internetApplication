function Warrior(name, hp=100){ 
  let warrior = {
    name, 
    hp,
    attack : () => Math.ceil(Math.random()*20), 
    takeDamage : (dmg) => warrior.hp -= dmg,
    isAlive : () => warrior.hp > 0

  }
  return warrior
}


function Knight(name, hp){
  let knight = {
    __proto__ : Warrior(name, hp),
    takeDamage : (dmg) => knight.hp -= Math.floor(dmg*0.7)
  } 
  return knight;
}


function Archer(name, hp){
  let archer = {
    __proto__ : Warrior(name, hp),
    attack : () => 
      Math.random() > 0.3 ? Math.ceil(Math.random()*20) : 2 * Math.ceil(Math.random()*20)
  } 
  return archer;
}


function Arena(){
  let battleId;
  function battle(){
    if (arena.warriors.length == 1){
        console.log(`The winner is ${arena.warriors[0].name}`);
        arena.stopBattle();
    }
    else if(arena.warriors.length == 0){
        console.log(`Arena is empty!!`);
        arena.stopBattle();
    }
    else{
        let atackInd = Math.floor(Math.random() * arena.warriors.length);
        let defenInd = (atackInd + Math.ceil(Math.random() * (arena.warriors.length - 1))) % arena.warriors.length;
        console.log(`${arena.warriors[atackInd].name} attacking ${arena.warriors[defenInd].name}`);
        let damag = arena.warriors[atackInd].attack();
        arena.warriors[defenInd].takeDamage(damag);
        console.log(`dealt ${damag} damage\n`)

        if(!arena.warriors[defenInd].isAlive()){
            console.log(`${arena.warriors[defenInd].name} died\n`);
            arena.warriors.splice(defenInd, 1);
        }
    }
  
  }
  let arena = {
    warriors : [],
    addWarrior : (w) => arena.warriors.push(w),
    startBattle : () => battleId = setInterval(battle, 3000),
    stopBattle : () => clearInterval(battleId) 
  };
  return arena;
}



let arena = new Arena();
arena.addWarrior(new Knight("Гром"));
arena.addWarrior(new Archer("Тень"));
arena.addWarrior(new Warrior("Вихрь"));

arena.startBattle();

// setTimeout(() => arena.stopBattle(), 300000);
