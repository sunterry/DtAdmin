## Using DtIcon
```
	import DtIcon from '@/components/dt-icon/dt-icon'
```
```
	Vue.use(DtIcon)
	组件内：
		export default {
          components: {
             DtIcon
          }
		}
```

## Props

| 属性  | 说明                  | 类型           | 说明                        |
| ----- | --------------------- | -------------- | --------------------------- |
| type  | 图标的名称            | String         | 如果是自定义图标在图标前加_ |
| size  | 图标的大小， 默认为px | Number, String | 16px                        |
| color | 图标的颜色            | String         | -                           |

## desc

```
1. DtIcon 的 Icon 支持使用第三方自定义图标，你可以引入任意的字体文件库来使用。使用前加下划线前缀
2. 同时，支持iview 内置图标，但不再支持custom 参数
```

