import { PatientMessage } from 'Plugins/PatientAPI/PatientMessage';

export class PatientQueryNameMessage extends PatientMessage {
    constructor() {
        super();
        Object.defineProperty(this, 'type', {
            value: 'PatientQueryNameMessage',
            writable: false
        });
    }
}

