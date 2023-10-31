const util = require('util');
export const inspectify = (data) => {
    console.log(util.inspect(data, false, null, true /* enable colors */))
}