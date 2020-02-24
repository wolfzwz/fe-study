### 简单回顾

antd-pro

umi+dva

### 今日内容

核心三个api实现

setState原理

diff



1. 什么是JSX？为什么需要JSX? 怎么用？原理？

JSX是对js语法扩展，使我们可以用类似xml方式描述视图

执行快、类型安全、简单快速

原理：babel-loader会预编译JSX为React.createElement(type,props,...chilrden)





### 总结：

1.webpack+babel-loader编译时，替换JSX为React.createElement(...)

2.所有React.createElement(...)执行结束会得到一个JS对象树，他能完整描述dom结构，称之为虚拟DOM

3.React-DOM.render(vdom,container)可以将vdom转换为dom追加至container中

  通过遍历vdom树，根据vtype不同，执行不同逻辑：vtype为1生成原生标签，vtype为2实例化class组件并将其render返回的vdom初始化，vtype为3直接执行函数将结果初始化

























