const ItemManager = artifacts.require("./ItemManager.sol");
const utils = require("./helpers/utils");


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
	});


	it("Non-owners should not be able to create an item", async () => {
		const ItemManagerInstance = await ItemManager.deployed();

		const itemName = "asd";
		const itemPrice = "500";


		await utils.shouldThrow( 
				ItemManagerInstance.createItem(itemName, itemPrice, {from: accounts[1]}),
				"Ownable: caller is not the owner"
				);
	});

	// State of the smart contract is persisted across test cases within a contract()? 
	describe("Testing triggerPayments", () => {

		before( async () => {
			this.ItemManagerInstance = await ItemManager.deployed();
		});

		it("Should not allow an incorrect price to be accepted", async () => {

			await utils.shouldThrow(
						this.ItemManagerInstance.triggerPayment(0, {from: accounts[1], value: 300}),
						"Only exact payment accepted!"
						);
			
		});

		it("Should be able to pay for an item", async () => {
			let result = await this.ItemManagerInstance.triggerPayment(0, {from: accounts[0], value: 500}); 
			assert.equal(result.logs[0].args.newState, 1);
		});

		it("Should throw when attempting to pay for a paid item", async () => {
			await utils.shouldThrow(
					this.ItemManagerInstance.triggerPayment(0, {from: accounts[1], value: 500}),
					"Only applicable for unpaid items!"
					);
		});
	});

	describe("Testing triggerDelivery", () => {
		it("Should not allow items in other states like Created or Delivered to be triggered", async () => {

		});

		it("Should only allow owners to call the function", async () => {


		});

		it("Should disallow non-owners to call the function", async () => {
			await utils.shouldThrow(
					this.ItemManagerInstance.triggerDelivery(0, {from: accounts[1]}), 
					"Ownable: caller is not the owner"
					);
		});
	});

});