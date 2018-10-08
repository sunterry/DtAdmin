#### props attr

|          属性 | 说明                                                         | 类型           | 默认值   |
| ------------: | ------------------------------------------------------------ | -------------- | -------- |
| isCollapsible | 菜单是否收缩                                                 | Boolean        | false    |
|         width | menu的宽度                                                   | String         | auto     |
|         theme | 主题，可选值为 `light`、`dark`、`primary`，其中 primary 只适用于 `mode="horizontal"` | String         | dark     |
|     accordion | 是否开启手风琴模式，开启后每次至多展开一个子菜单             | Boolean        | Boolean  |
|          mode | 菜单类型，可选值为 `horizontal`（水平） 和 `vertical`（垂直） | String         | vertical |
|    activeName | 激活菜单的 name 值                                           | String\|Number | -        |
|       visible | 手动控制下拉框的显示，在 trigger = 'custom' 时使用           | Boolean        | false    |
|     openNames | 展开的 Submenu 的 name 集合                                  | Array          | []       |
|      menuList | 菜单的列表                                                   | Array          | []       |

#### dropSource methods

| 方法名         | 说明                     | 类型 | 默认值                 |
| -------------- | ------------------------ | ---- | ---------------------- |
| on-select      | 用户点击侧边栏导航       | Func | 用户的name             |
| on-open-change | 用户打开的二级菜单栏数组 | Func | 用户打开的二级菜单数组 |

