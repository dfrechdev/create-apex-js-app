export default (function module1() {
    const version = '0.0.1';
    function getVersion() {
        return version;
    }
    function doSomething(task) {
        console.log(`will do ${task}`);
    }
    function wait(msToWait) {
        return new Promise(resolve => setTimeout(() => resolve('done with waiting'), msToWait));
    }
    return {
        getVersion,
        doSomething,
        wait,
    };
})();
