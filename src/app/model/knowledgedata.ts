export class Knowledgedata {
    constructor(
        public items: ComponentTreeInfo[]) {}

}

export class ComponentTreeInfo {

    constructor(public isTop: boolean,
                public model: string,
                public unit: string,
                public procName: string) {}
}


export class Attributes_request {
    UnitName: string;
    ProcName: string;
  }

export class Variables_request {
    type: string;
  }

export class Table {
    key;
    tableName;
    columnName;
    shortDescription;
    longDescription;
  }

export class PropagateStructure {
    key;
    name;
    variabile;
    type;
    id;
    programId;
    idCall;
    shortDescription;
    longDescription;
  }


export class VarDescription {
    key;
    name;
    variableName;
    programId;
    idCall;
    id;
    type;
    direction;
    shortDescription;
    longDescription;
  }

export class Module {
    key;
    name;
  }