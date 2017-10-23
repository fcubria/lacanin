
let instance = null;

class StringMatch  {

    constructor (testString) {
        if(!instance){
              instance = this;
        }
        return instance;
    }

}

export default StringMatch;


