declare global {
    interface Window { catex: Catex; }
}

export interface CatexCompanionDataTransformer {
    name: string;
    extensions: string;
    transform: (content: string | ArrayBuffer, contentType?: string) => string;
    validate?: (options: CatexCompanionDataTransformerCheck) => boolean;
    type?: "Text" | "DataUrl" | "BinaryString" | "ArrayBuffer";
    target?: string;
 }
 
 interface CatexCompanionDataTransformerCheck {
     filename: string;
     content?: string;
     contentType?: string;
     contentLength?: number;
 }

 export interface CustomServiceQueryOptions {
    search: string;
    pageSize: number;
    pageNumber: number;
    order?: "ASC" | "DESC",
    sortBy?: string;
}

export interface CustomServiceQueryResult {
    rows: any;
    matches: number;
    total: number;
}

export interface NavBarEntryWebservice {
    label: string;
    title: string;
    id: string;
    action: (o: CustomServiceQueryOptions, callback: any)=>void;
}

export interface NavBarEntryCustomActions {
    label: string;
    title: string;
    id: string;
    action: (o: any, callback: any)=>void;
}

interface MenuEntryFeatureSelect {
    label: string;
    title: string;
    action: (parameters: {feature: any; model: any; layer: any;}, callback: (properties: {[key: string]: any})=>void) => void;
}

export interface Catex {
    app?: {
        getUserInfo?:() => Promise<any>;
        onAppReady?: () => void;
        navbarActions?: NavBarEntryCustomActions[];
        webservices?: NavBarEntryWebservice[];
    };
    workspace?: {
        emitCommand?: (command: any) => void;
    };
    featureLayer?: {
        onFeatureSelect?: MenuEntryFeatureSelect[];
        onRender?: (layer: any, feature: any, style: any, map: any, paintState: any) => void;
    };
    ogc3dtiles?: {
        onFeatureSelect?: MenuEntryFeatureSelect[]
    };
    data?: {
        transformers?: CatexCompanionDataTransformer[]
    };
    map?: {
       deleteLayerByID?: (id:string) => void;
       getMainMap?: () => any;
       onMouseClick?: onMouseClickEvent[],
       onMapMove?: onMapMoveEvent[],
       onMousePoint?: onMousePointEvent[]
    };
    utils?: {
        boundingBox: (shape: any) => number[];
        pointToArray: (point: any) => number[];
        shapeToGeoJSON: (shape: any) => any;
        featureToGeoJSON: (feature: any) => any;
    }
}

interface onMouseClickEvent {
    action: (o: {
        point: any;
        feature?: any;
        layer?: any;
        map: any;
    }, callback: any) => void;
}

interface onMapMoveEvent {
    action: (o: {bounds: any; map: any}, callback: any) => void;
}

interface onMousePointEvent {
    action: (o: {point: any; map: any}, callback: any) => void;
}