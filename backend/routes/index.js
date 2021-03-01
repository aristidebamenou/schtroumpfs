const schtrompfController = require('../controllers/schtrompf-controller');
const userController = require('../controllers/user-controller');

module.exports = (server) => {


    server.get('/schtrompfs', userController.authentication, schtrompfController.readAll);
    server.get('/schtrompf/:id', userController.authentication, schtrompfController.read);
    server.post('/schtrompf', userController.authentication, schtrompfController.create);
    server.put('/schtrompf/:id', userController.authentication, schtrompfController.put);
    server.delete('/schtrompf', userController.authentication, schtrompfController.delete);

    server.get('/schtrompf/:id/friends', userController.authentication, schtrompfController.retrieveFriends)
    server.post('/schtrompf/:id/friend', userController.authentication, schtrompfController.addFriend);
    server.delete('/schtrompf/:id/friend', userController.authentication, schtrompfController.removeFriend);

    server.post('/signup', userController.signup);
    server.post('/login', userController.login);
}