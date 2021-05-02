const ItemManager = artifacts.require("./ItemManager.sol");

// Before each contract() function is run, 
// your contracts are redeployed to the running Ethereum client 
// so the tests within it run with a clean contract state.
// So, between each test case within the contract, the state persists

contract("ItemManager", accounts => {
	it("Should be able to create an item", async () => {
		const ItemManagerInstance = await ItemManager.deployed();

		this.asdasdasd = this.address;
		const itemName = "asd";
		const itemPrice = "500";

		let result = await ItemManagerInstance.createItem(itemName, itemPrice, {from: accounts[0]});
		assert.equal(result.logs[0].args.itemIndex, 0, "It is not zero");

		result = await ItemManagerInstance.items(0);
	});


	it("Non-owners should not be able to create an item", async () => {
		const ItemManagerInstance = await ItemManager.deployed();

		const itemName = "asd";
		const itemPrice = "500";

		try {
			let result = await ItemManagerInstance.createItem(itemName, itemPrice, {from: accounts[1]});	
		} catch (err) {
			assert.equal(err.reason, "Ownable: caller is not the owner", "Error message wrong");
			return;
		}
		assert.fail();
	});

	// State of the smart contract is persisted across test cases within a contract()? 
	describe("Testing Trigger Payments", () => {

		before( async () => {
			this.ItemManagerInstance = await ItemManager.deployed();
		});

		it("Should not allow an incorrect price to be accepted", async () => {
			try {
				let result = await this.ItemManagerInstance.triggerPayment(0, {from: accounts[1], value: 300});
			} catch (err) {
				console.log(err);
				assert.equal(err.reason, "Only exact payment accepted!", "Error message wrong");
				return;
			}
			assert.fail()
		
		});

		it("Should be able to pay for an item", async () => {
			let result = await this.ItemManagerInstance.triggerPayment(0, {from: accounts[0], value: 500}); 
			// console.log(result.logs[0].args);
		});
	});
});