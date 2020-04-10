// 数据类型
// src\part1.base\1-datatype.ts
// 类型注解 相当于强类型语言中的类型声明
// 语法 (变量/函数): type
// 新增类型 void any 元组 枚举 高级类型

// 原始类型
let str: string = "abc";
let num: number | undefined | null = 1;
let bool: boolean = true;

// 数组
let arr1: number[] = [1, 2];
let arr2: Array<number | string> = [1, "2"];

// 元组
let tuple: [number, string] = [0, "1"];
//tuple.push(2);
// console.log(tuple);
// tuple[2] 提示当前索引没有值

// 函数
let add = (x: number, y: number) => x + y;
let compute: (x: number, y: number) => number;
compute = (a, b) => a + b;

// 对象
let obj: { x: number; y: number } = { x: 1, y: 1 };
// obj:object 将导致obj.x报错，因为object没有属性x
obj.x = 1;

// symbol
let s1: symbol = Symbol();
let s2 = Symbol();
console.log(s1 === s2);

// undefined null
let un: undefined = undefined;
let nu: null = null;

// void
let noReturn = () => {};

// any
let x;
x = 1;
x = [];
x = {};
x = () => {};

// never 永远没有返回值
let error = () => {
  throw new Error("error");
};
let endless = () => {
  while (true) {}
};
