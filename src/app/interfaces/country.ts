export interface country {
  name: string;
  population: number;
  languages: {name: string}[];
  flags: {png: string, svg: string};
  numericCode: string;
  location: string;
  coatOfArms: {png: string};
}
