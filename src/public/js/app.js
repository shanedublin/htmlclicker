//(function(){
	'use-strict';
	let money = 50;
	let moneyElement = document.getElementById('money');
	let employeeElement = document.getElementById('employees');
	let ammountPerClick = 0.0001;
	let tickAmount = 0;
	let numEmployees = 0;
	let employeeProfit = 10;
	let numManager = 0;
	let managerCost = 30;
	
	let numberFormat = new Intl.NumberFormat(undefined,{maximumFractionDigits:3});
	moneyElement.innerHTML = '$'+ numberFormat.format( money);
	
	
	
	let items = {};
	items.employee = {cost: 5.00 };
	
	// blogger
	// server
	//dom elements
	
	function incrementMoney(){
		
		money += ammountPerClick;
		//console.log(numberFormat.format( money));
		refreshMoney();
	}
	
	
	function buyEmployee(item){
		if(money >= items[item].cost){
			money -= items[item].cost;			
			numEmployees ++;			
			refreshMoney();
			refresheEmployeeCount();
		}
	}
	

	function refreshMoney(){
		moneyElement.innerHTML = '$'+ numberFormat.format( money);
	}
	function refresheEmployeeCount(){
		employeeElement.innerHTML = numEmployees;
	}
	
	
	function startTick(){
		var promise = new Promise(function(resolve){
			setTimeout(function(){
//				console.log('resolve');
				resolve('ticked');
			},1000);
		});
		
		promise.then(function(res){
//			console.log(res);
			//console.log(calculateRate());
			money+=calculateRate();
			refreshMoney();
			refresheEmployeeCount();
			startTick();
		});
	}
	
	function calculateRate(){
		console.log(numEmployees);
		var managerCost = numManager * managerCost;
		var ep = numEmployees * employeeProfit;
		ep *= 1 + numManager;
		return numEmployees * employeeProfit / 60;
	}
	
	
	
	startTick();
//})();