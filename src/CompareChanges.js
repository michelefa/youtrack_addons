var config = require("./config.js");
var loki = require('lokijs');
var db = require('lokijs');

changesArr = [];

module.exports = {
    processChanges: function(cb) {
        var db = new loki(config.DB_path)
        db.loadDatabase({}, function() {
            var ticketsCollection = db.getCollection()

            if (ticketsCollection === null) {
                //start new database
                var ticketsCollection = db.addCollection();
                db.saveDatabase();

            }

            var tickets = ticketsArr.slice();
            for (var i = 0; i < tickets.length; i++) {
                //traverse through stories just downloaded

                if (ticketsCollection.find({
                        '$and': [{
                            'Ticket': tickets[i][0]
                        }, {
                            'sprint': config.sprint_number
                        }]
                    }).length <= 0) {
                    //tickets needs to be printed and added to DB
                    changesArr.push(tickets[i]);
                    ticketsCollection.insert([{
                        sprint: config.sprint_number,
                        Ticket: tickets[i][0]
                    }]);

                }
            } //end for
            db.saveDatabase();
            cb(changesArr);

        });

    }
}
