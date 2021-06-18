const bcrypt = require('bcrypt');
const saltRounds = 10;

let password = 'Long';
let hash1 = '$2b$10$DYXfUC50c.69v5ccdP69E.2vkc9MpRBpNTPHmkOuyNGBTWIII75v.';
let hash2 = '$2b$10$fm41V3g250RmAIb3lTEq.OL.we3CtY731XdnZ2m.RShkuu.x0mrUi';

bcrypt.hash(password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});


bcrypt.compare(password , hash2, function(err, result) {
    // result == true
    console.log(result);
});

