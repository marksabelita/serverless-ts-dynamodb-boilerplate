

export default interface BasesModelInterface {
    setId: (id: string) => void;
    getId: () => string;
    setName: (name: string) => void;
    getName: () => string;
    getEntityMappings: () => any;
}

// export default interface DynamoDBModel {
//     protected _id: string;
//     protected _name: string;

//     // constructor({ id = UUID(), name = ''}: IProps) {
//     //     this._id = id;
//     //     this._name = name;
//     // }

//     /**
//      * Set Id
//      * @param value
//      */
//     setId(value: string) {
//         this._id = value !== '' ? value : null;
//     }

//     /**
//      * Get Id
//      * @return {string|*}
//      */
//     getId() {
//         return this._id;
//     }

//     /**
//      * Set Name
//      * @param value
//      */
//     setName(value: string) {
//         this._name = value !== '' ? value : null;
//     }

//     /**
//      * Get Name
//      * @return {string|*}
//      */
//     getName() {
//         return this._name;
//     }

//     /**
//      * Get Base entity mappings
//      * @return {IListInterface}
//      */
//     getEntityMappings(): IListInterface {
//         return {
//             id: this.getId(),
//             name: this.getName(),
//             timestamp: new Date().getTime(),
//         };
//     }

// }