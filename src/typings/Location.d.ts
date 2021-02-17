export interface LocationType {
  [prop: string]: string;
}

export interface DataType {
  index: any;
  data: LocationType[];
  meta: {
    [prop: string]: string;
  };
}

export interface PlaceIdType {
  data: {
      predictions: {
          place_id: string
      }[]
  }
}