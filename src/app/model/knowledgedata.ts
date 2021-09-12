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

  export class Descriptions_request {
    id: string;
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
    attr_id;
    orig_id;
    direction;
    start;
    length;
    name;
    variabileName;
    shortDescription;
    longDescription;
  }


export class VarDescription {
    orig_id;
    attr_id;
    start;
    length;
    name;
    variabileName;
    direction;
    shortDescription;
    longDescription;
  }

export class Module {
    key;
    name;
  }