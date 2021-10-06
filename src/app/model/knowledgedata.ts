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
    descriptionId;
    shortDescription;
    longDescription;
  }


export class VarDescription {
    descriptionId;
    s_varname;
    s_start;
    s_length;
    d_varname;
    d_start;
    d_length;
    d_shortdescription;
    d_longdescription;
    mappings;
  }

export class Module {
    key;
    name;
  }
