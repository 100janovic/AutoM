var AutoM = (function() {

    /* VARS */
    var modules = {};
    var autorun = [];



    /* HELPERS */
    function _forEach(arr, fn) {
        var i = 0;
        var total = arr.length;
        for (i = 0; i < total; i++) {
            fn(i, arr[i]);
        }
    }



    /* SETTERS */
    function getModule(name) {
        return modules[name];
    }

    function module(name, fn, options) {
        if (!fn) {
            return getModule(name);
        }

        if(options && options.autorun){
            autorun.push(name);
        }

        modules[name] = fn();

    }




    /* RUN FUNCS */
    function run() {


        // run autorun modules
        var autorunmodule = null;

        _forEach(autorun, function(i, module) {
            
            autorunmodule = getModule(module);

            if(autorunmodule && autorunmodule.start){
                autorunmodule.start(module);
            }else{
                console.error('Module: ' + module + ' is not registered or there is no start method.');
            }
        });



        // run modules detected in the page

        var elms = document.querySelectorAll('*[data-module]');
        var module = null;
        var attr = '';

        _forEach(elms, function(i, el) {

            attr = el.getAttribute('data-module');
            module = getModule(attr);

            if (module && module.start) {
                module.start(el);
            } else {
                console.error('Module: ' + attr + ' is not registered or there is no start method.');
            }
        });
    }

    function end() {

        var elms = document.querySelectorAll('*[data-module]');
        var module = null;
        var attr = '';

        _forEach(elms, function(i, el) {

            attr = el.getAttribute('data-module');
            module = getModule(attr);

            if (module && module.end) {
                module.end(el);
            } else {
                console.error('Module: ' + attr + ' is not registered or there is no start method.');
            }
        });

    }

    /* API */
    return {
        run: run,
        end: end,
        module: module
    };

})();