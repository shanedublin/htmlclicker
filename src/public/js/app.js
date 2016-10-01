//(function(){
	'use-strict';
	let money = 0;
	let moneyElement = document.getElementById('money');
	let ammountPerClick = 0.0001;
	let tickAmount = 0;
	
	let numberFormat = new Intl.NumberFormat(undefined,{maximumFractionDigits:6});
	moneyElement.innerHTML = '$'+ numberFormat.format( money);
	
	
	
	let items = {};
	items.raise = {cost: 0.01,raise: 0.0001};
	items.mouse= {cost: 0.1,raise: 0.001};
	items.keyboard = {cost: 1.0,raise: 0.01};
	items.hour  =  {cost: 10,raise: 0.0, tick: 0.001 };
	
	// blogger
	// server
	//dom elements
	
	function incrementMoney(){
		
		money += ammountPerClick;
		//console.log(numberFormat.format( money));
		refreshMoney();
	}
	
	function purchase(item){
		console.log('purchase');
		//ammountPerClick += 0.0001;
		if(money >= items[item].cost){
			money -= items[item].cost;
			ammountPerClick += items[item].raise;
			
			if(items[item].tick !== undefined){
				tickAmount += items[item].tick;
			}
			
		}
		refreshMoney();
	}
	function refreshMoney(){
		moneyElement.innerHTML = '$'+ numberFormat.format( money);
	}
	
	
	function startTick(){
//		let i = 0;
//		for(var v of tick()){
//			console.log(i);
//			i++;
//			if(i > 10)
//				break;
//		}
		tick2();
	}
	
	function tick2(){
		var promise = new Promise(function(resolve){
			setTimeout(function(){
				//console.log('resolve');
				resolve('ticked');
			},100);
		});
		
		promise.then(function(res){
			//console.log(res);
			money+=tickAmount;
			refreshMoney();
			tick2();
		});
		
	};
	function *tick(){
		while(true){
			//console.log('tick');
			setTimeout(function(){
				console.log('hate');
			},1000);
			yield;	
			
		}
	}
	
	startTick();
//})();