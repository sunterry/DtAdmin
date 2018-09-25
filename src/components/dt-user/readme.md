#### props attr

|       属性 | 说明                                                         | 类型          | 默认值            |
| ---------: | ------------------------------------------------------------ | ------------- | ----------------- |
|      shape | 指定头像的形状，可选值为circle, square                       | String        | circle            |
|       size | 指定头像的大小, 可选值large， small, default                 | String        | default           |
|        src | 图片类头像的资源地址                                         | String        | -                 |
|       icon | 图片类型的Icon                                               | String        | -                 |
| customIcon | 自定义类型的图标                                             | String        | -                 |
|    trigger | 触发方式可选值为 `hover`（悬停）`click`（点击）`contextMenu`（右键）`custom`（自定义），使用 custom 时，需配合 visible 一起使用 | String        | click             |
|    visible | 手动控制下拉框的显示，在 trigger = 'custom' 时使用           | Boolean       | false             |
|  placement | 下拉菜单出现的位置，可选值为`top``top-start``top-end``bottom``bottom-start``bottom-end``left``left-start``left-end``right``right-start``right-end`, 2.12.0 版本开始支持自动识别 | String        | bottom            |
|   transfer | 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果 | Boolean       | false             |
|   iconType | 名称后的箭头图标                                             | String        | md-arrow-dropdown |
|  iconColor | 名称后的箭头图标颜色                                         | String        | #464c5b           |
|   iconSize | 名称后的箭头大小                                             | Number        | 20                |
| dropSource | 下拉菜单的数据源                                             | Array[Object] | []                |
|  user-name | 用户名名称                                                   | String        | Admin             |

#### dropSource props

| 属性     | 说明                                 | 类型    | 默认值 |
| -------- | ------------------------------------ | ------- | ------ |
| type     | dropItem点击返回的类型,也用于标识key | String  | -      |
| name     | 下拉菜单每项的名称                   | String  | -      |
| icon     | 下拉菜单每项的icon                   | String  | -      |
| disabled | 禁用该项                             | Boolean | false  |
| divided  | 显示分割线                           | Boolean | false  |
| selected | 标记该项为选中状态                   | Boolean | false  |

