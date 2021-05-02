async function shouldThrow(promise, errorMsg) {
    try {
		await promise;
		assert(true);
    }
    catch (err) {
    	if (errorMsg) {
    		assert.equal(err.reason, errorMsg, "Error message wrong");	
    	}
		
		return;
    }
    assert(false, "The contract did not throw.");

}

module.exports = {
    shouldThrow,
};
