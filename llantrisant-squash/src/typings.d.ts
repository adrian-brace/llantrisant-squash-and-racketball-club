/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface String {
  capitalize() : string;
  replaceAll(search, replacement) : string;
}

interface Number {
  ordinalSuffixOf() : string;
}

interface Array<T> {
  move(from: number, to: number) : Array<T>;
}