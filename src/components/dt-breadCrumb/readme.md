#### props attr

|       属性 | 说明                     | 类型                    | 默认值 |
| ---------: | ------------------------ | ----------------------- | ------ |
|  separator | 自定义分隔符             | String / Element String | /      |
|   iconSize | 面包屑名称前icon图标大小 | String                  | 14     |
| dataSource | 面包屑数据源             | Array                   | -      |

#### dataSources可用属性值

| 属性    | 说明                           | 类型    | 默认值 |
| ------- | ------------------------------ | ------- | ------ |
| name    | 唯一标识符key的值              | String  | -      |
| to      | 用于链接跳转的name值           | String  | -      |
| icon    | 面包屑前icon图标               | String  | -      |
| meta    | 面包屑名称meta:{title: '首页'} | Object  | -      |
| replace | 相当于vue-router 中的replace   | Boolean | false  |

