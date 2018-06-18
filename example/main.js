AutoM.module('Header', function() {

	// vars

    var exp = {
        start: function(_el) {
            this.initEvents();
        },
        initEvents: function() {
            // events
        },
        expandHeader: function(){
        	// change height
            console.log('changeheight');
        },
        end: function() {
        	// it will be called on AutoM.end();
        }
    };

    return exp;

});




AutoM.module('Menu', function() {

    // vars
    var header = AutoM.module('Header');

    var exp = {
        start: function(_el) {
            this.initEvents();
        },
        initEvents: function() {
            // attach on expand button
            header.expandHeader();
        },
        end: function() {
            // it will be called on AutoM.end();
        }
    };

    return exp;

});



AutoM.module('Footer', function() {

    var exp = {
        start: function() {
            console.log('it will auto start without registering attribute');


        },
        end: function() {

        }

    };

    return exp;

}, { autorun: true });







AutoM.run();
